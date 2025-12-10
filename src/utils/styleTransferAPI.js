// PicoArt v30 - Style Transfer API (첫 응답에서 AI 정보 저장)
import { MODEL_CONFIG } from './modelConfig';

const fileToBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

const resizeImage = async (file, maxWidth = 1024) => {
  return new Promise((resolve) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    img.onload = () => {
      let width = img.width;
      let height = img.height;
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob((blob) => {
        resolve(new File([blob], file.name, { type: 'image/jpeg' }));
      }, 'image/jpeg', 0.95);
    };
    
    img.src = URL.createObjectURL(file);
  });
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getModelForStyle = (style) => {
  const model = style.model || 'SDXL';
  return MODEL_CONFIG[model];
};

const callFluxAPI = async (photoBase64, stylePrompt, onProgress) => {
  if (onProgress) onProgress('FLUX 고품질 변환 시작...');

  const response = await fetch('/api/flux-transfer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image: photoBase64,
      prompt: stylePrompt,
      control_type: 'depth',
      control_strength: 0.5,
      num_inference_steps: 28,
      guidance_scale: 3.5
    })
  });

  if (!response.ok) {
    throw new Error(`FLUX API error: ${response.status}`);
  }

  return response.json();
};

const callFluxWithAI = async (photoBase64, selectedStyle, onProgress) => {
  if (onProgress) onProgress('AI 자동 화가 선택 시작...');

  const response = await fetch('/api/flux-transfer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image: photoBase64,
      selectedStyle: selectedStyle
    })
  });

  if (!response.ok) {
    throw new Error(`FLUX API error: ${response.status}`);
  }

  return response.json();
};

const pollPrediction = async (predictionId, modelConfig, onProgress) => {
  let attempts = 0;
  const maxAttempts = 90;
  
  while (attempts < maxAttempts) {
    await sleep(2000);
    attempts++;

    const checkResponse = await fetch(`/api/check-prediction?id=${predictionId}`);
    
    if (!checkResponse.ok) {
      throw new Error('Failed to check status');
    }

    const result = await checkResponse.json();

    if (result.status === 'succeeded') {
      return result;
    }

    if (result.status === 'failed') {
      throw new Error('Processing failed');
    }

    if (onProgress) {
      const progress = Math.min(95, 10 + (attempts * 1.0));
      onProgress(`변환 중... ${Math.floor(progress)}%`);
    }
  }

  throw new Error('Processing timeout');
};

export const processStyleTransfer = async (photoFile, selectedStyle, apiKey, onProgress) => {
  try {
    const resizedPhoto = await resizeImage(photoFile, 1024);
    const photoBase64 = await fileToBase64(resizedPhoto);
    const modelConfig = getModelForStyle(selectedStyle);
    
    if (onProgress) {
      onProgress(`${modelConfig.label} 모델 준비 중...`);
    }

    let prediction;
    if (modelConfig.model.includes('flux')) {
      prediction = await callFluxAPI(photoBase64, selectedStyle.prompt, onProgress);
    } else {
      prediction = await callFluxWithAI(photoBase64, selectedStyle, onProgress);
    }

    // ========== v30: 첫 응답에서 AI 선택 정보 저장 ==========
    console.log('');
    console.log('========================================');
    console.log('🎯 FIRST RESPONSE (AI SELECTION INFO)');
    console.log('========================================');
    console.log('📦 prediction:', prediction);
    console.log('🎨 selected_artist:', prediction.selected_artist);
    console.log('🎨 selected_work:', prediction.selected_work);
    console.log('🎨 selection_method:', prediction.selection_method);
    console.log('========================================');
    console.log('');

    const aiSelectionInfo = {
      artist: prediction.selected_artist || null,
      work: prediction.selected_work || null,  // 거장 모드: 선택된 대표작
      method: prediction.selection_method || null,
      details: prediction.selection_details || null
    };

    const result = await pollPrediction(prediction.id, modelConfig, onProgress);

    console.log('');
    console.log('========================================');
    console.log('🔍 POLLING RESPONSE (for comparison)');
    console.log('========================================');
    console.log('📦 result keys:', Object.keys(result));
    console.log('🎨 selected_artist:', result.selected_artist);
    console.log('========================================');
    console.log('');

    if (result.status !== 'succeeded') {
      throw new Error('Processing did not succeed');
    }

    const resultUrl = Array.isArray(result.output) ? result.output[0] : result.output;

    if (!resultUrl) {
      throw new Error('No result image');
    }

    if (onProgress) onProgress('이미지 다운로드 중...');
    
    const imageResponse = await fetch(resultUrl);
    const blob = await imageResponse.blob();
    const localUrl = URL.createObjectURL(blob);

    console.log('✅ Using AI info from FIRST response:', aiSelectionInfo.artist, aiSelectionInfo.work);

    return {
      success: true,
      resultUrl: localUrl,
      blob,
      remoteUrl: resultUrl,
      model: modelConfig.model,
      cost: modelConfig.cost,
      time: modelConfig.time,
      aiSelectedArtist: aiSelectionInfo.artist,
      selected_work: aiSelectionInfo.work,  // 거장 모드: 선택된 대표작
      selectionMethod: aiSelectionInfo.method,
      selectionDetails: aiSelectionInfo.details
    };

  } catch (error) {
    console.error('Style transfer error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

export const mockStyleTransfer = async (photoFile, selectedStyle, onProgress) => {
  return new Promise((resolve) => {
    let progress = 0;
    const modelConfig = getModelForStyle(selectedStyle);
    
    const interval = setInterval(() => {
      progress += 10;
      if (onProgress) {
        onProgress(`${modelConfig.label} 변환 중... ${progress}%`);
      }
      
      if (progress >= 100) {
        clearInterval(interval);
        const url = URL.createObjectURL(photoFile);
        resolve({
          success: true,
          resultUrl: url,
          blob: photoFile,
          model: modelConfig.model,
          isMock: true
        });
      }
    }, 200);
  });
};

export const applyStyleTransfer = processStyleTransfer;
