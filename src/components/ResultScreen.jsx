// PicoArt v80 - ResultScreen
// 원클릭 교육자료 매칭: 단일변환과 동일한 workKeyMap 로직 사용
// 교육자료 파일만 분리된 원클릭 전용 파일 사용
// 2025-12-11 업데이트: 재시도 기능 추가

import React, { useState, useEffect, useRef } from 'react';
import BeforeAfter from './BeforeAfter';
import { orientalEducation } from '../data/educationContent';
import { movementsEducation, movementsOverview } from '../data/movementsEducation';
import { mastersEducation } from '../data/mastersEducation';
// 원클릭 전용 교육자료 (분리된 파일)
import { oneclickMovementsSecondary } from '../data/oneclickMovementsEducation';
import { oneclickMastersSecondary } from '../data/oneclickMastersEducation';
import { oneclickOrientalSecondary } from '../data/oneclickOrientalEducation';
import { saveToGallery } from './GalleryScreen';
import { processStyleTransfer } from '../utils/styleTransferAPI';


const ResultScreen = ({ 
  originalPhoto, 
  resultImage, 
  selectedStyle, 
  aiSelectedArtist,
  aiSelectedWork,
  fullTransformResults,
  onReset,
  onGallery
}) => {
  
  // ========== 원클릭 결과 처리 ==========
  const isFullTransform = fullTransformResults && fullTransformResults.length > 0;
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // ========== 스와이프 ==========
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  
  // ========== 재시도 관련 ==========
  const [results, setResults] = useState(fullTransformResults || []);
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryProgress, setRetryProgress] = useState('');
  
  // fullTransformResults가 변경되면 results도 업데이트
  useEffect(() => {
    if (fullTransformResults) {
      setResults(fullTransformResults);
    }
  }, [fullTransformResults]);
  
  // 실패한 결과 개수
  const failedCount = results.filter(r => !r.success).length;
  
  // 현재 보여줄 결과
  const currentResult = isFullTransform ? results[currentIndex] : null;
  const displayImage = isFullTransform ? currentResult?.resultUrl : resultImage;
  const displayArtist = isFullTransform ? currentResult?.aiSelectedArtist : aiSelectedArtist;
  const displayWork = isFullTransform ? currentResult?.selected_work : aiSelectedWork;
  const displayCategory = isFullTransform ? currentResult?.style?.category : selectedStyle?.category;
  
  // ========== State ==========
  const [showInfo, setShowInfo] = useState(true);
  const [educationText, setEducationText] = useState('');
  const [isLoadingEducation, setIsLoadingEducation] = useState(true);
  const [savedToGallery, setSavedToGallery] = useState(false);
  const hasSavedRef = useRef(false);


  // ========== 갤러리 자동 저장 ==========
  useEffect(() => {
    // 원클릭은 별도 저장 로직
    if (isFullTransform) {
      // 모든 결과 저장
      const saveAllResults = async () => {
        for (const result of fullTransformResults) {
          if (result.success && result.resultUrl) {
            const styleName = result.aiSelectedArtist || result.style?.name || '변환 이미지';
            const categoryName = selectedStyle?.category === 'movements' ? '미술사조' 
              : selectedStyle?.category === 'masters' ? '거장' 
              : selectedStyle?.category === 'oriental' ? '동양화' 
              : '';
            await saveToGallery(result.resultUrl, styleName, categoryName);
          }
        }
        console.log('✅ 원클릭 결과 모두 갤러리에 저장됨');
      };
      if (!hasSavedRef.current) {
        hasSavedRef.current = true;
        saveAllResults();
      }
      return;
    }
    
    // 단일 변환: 기존 로직
    if (hasSavedRef.current || !resultImage) return;
    
    const saveToGalleryAsync = async () => {
      // 스타일 이름 결정
      let styleName = selectedStyle?.name || '변환 이미지';
      if (aiSelectedArtist) {
        styleName = aiSelectedArtist;
      }
      
      // 카테고리 이름
      const categoryName = selectedStyle?.category === 'movements' ? '미술사조' 
        : selectedStyle?.category === 'masters' ? '거장' 
        : selectedStyle?.category === 'oriental' ? '동양화' 
        : '';
      
      // 갤러리에 저장 (async)
      const saved = await saveToGallery(resultImage, styleName, categoryName);
      if (saved) {
        hasSavedRef.current = true;
        setSavedToGallery(true);
        console.log('✅ 갤러리에 자동 저장 완료 (IndexedDB):', styleName);
      }
    };
    
    saveToGalleryAsync();
  }, [resultImage, selectedStyle, aiSelectedArtist, fullTransformResults, isFullTransform]);


  // ========== 재시도 함수 ==========
  const handleRetry = async () => {
    if (!originalPhoto || isRetrying) return;
    
    const failedResults = results.filter(r => !r.success);
    if (failedResults.length === 0) return;
    
    setIsRetrying(true);
    console.log(`🔄 재시도 시작: ${failedResults.length}개 실패한 변환`);
    
    let successCount = 0;
    
    for (let i = 0; i < failedResults.length; i++) {
      const failed = failedResults[i];
      const failedIndex = results.findIndex(r => r.style?.id === failed.style?.id);
      
      setRetryProgress(`재시도 중... (${i + 1}/${failedResults.length}) ${failed.style?.name || ''}`);
      
      try {
        const result = await processStyleTransfer(
          originalPhoto,
          failed.style,
          null,
          (progress) => setRetryProgress(`${failed.style?.name}: ${progress}`)
        );
        
        if (result.success) {
          // 성공하면 해당 인덱스 결과 업데이트
          setResults(prev => {
            const newResults = [...prev];
            newResults[failedIndex] = {
              style: failed.style,
              resultUrl: result.resultUrl,
              aiSelectedArtist: result.aiSelectedArtist,
              selected_work: result.selected_work,
              success: true
            };
            return newResults;
          });
          successCount++;
          console.log(`✅ 재시도 성공: ${failed.style?.name}`);
          
          // 갤러리에 저장
          const styleName = result.aiSelectedArtist || failed.style?.name || '변환 이미지';
          const categoryName = failed.style?.category === 'movements' ? '미술사조' 
            : failed.style?.category === 'masters' ? '거장' 
            : failed.style?.category === 'oriental' ? '동양화' 
            : '';
          await saveToGallery(result.resultUrl, styleName, categoryName);
        } else {
          console.log(`❌ 재시도 실패: ${failed.style?.name} - ${result.error}`);
        }
      } catch (error) {
        console.error(`❌ 재시도 에러: ${failed.style?.name}`, error);
      }
    }
    
    setIsRetrying(false);
    setRetryProgress('');
    
    if (successCount > 0) {
      alert(`재시도 완료! ${successCount}개 성공`);
    } else {
      alert('재시도했지만 모두 실패했습니다. 나중에 다시 시도해주세요.');
    }
  };

  // ========== 단일 스타일 재시도 함수 ==========
  const handleRetrySingle = async (index) => {
    if (!originalPhoto || isRetrying) return;
    
    const failed = results[index];
    if (!failed || failed.success) return;
    
    setIsRetrying(true);
    setRetryProgress(`${failed.style?.name} 재시도 중...`);
    console.log(`🔄 단일 재시도: ${failed.style?.name}`);
    
    try {
      const result = await processStyleTransfer(
        originalPhoto,
        failed.style,
        null,
        (progress) => setRetryProgress(`${failed.style?.name}: ${progress}`)
      );
      
      if (result.success) {
        // 성공하면 해당 인덱스 결과 업데이트
        setResults(prev => {
          const newResults = [...prev];
          newResults[index] = {
            style: failed.style,
            resultUrl: result.resultUrl,
            aiSelectedArtist: result.aiSelectedArtist,
            selected_work: result.selected_work,
            success: true
          };
          return newResults;
        });
        console.log(`✅ 재시도 성공: ${failed.style?.name}`);
        
        // 갤러리에 저장
        const styleName = result.aiSelectedArtist || failed.style?.name || '변환 이미지';
        const categoryName = failed.style?.category === 'movements' ? '미술사조' 
          : failed.style?.category === 'masters' ? '거장' 
          : failed.style?.category === 'oriental' ? '동양화' 
          : '';
        await saveToGallery(result.resultUrl, styleName, categoryName);
        
        // 교육자료 다시 로드 (재시도 성공 후)
        console.log('🔄 재시도 성공 - 교육자료 다시 로드');
        const workName = result.selected_work;
        const artistName = result.aiSelectedArtist;
        const category = failed.style?.category;
        
        if (workName && artistName && category) {
          const key = getOneclickEducationKey(workName, artistName, category);
          if (key) {
            const educationData = category === 'movements' 
              ? oneclickMovementsEducation[key]
              : category === 'masters'
              ? oneclickMastersEducation[key]
              : oneclickOrientalEducation[key];
            
            if (educationData) {
              console.log(`✅ 재시도 후 교육자료 로드: ${key}`);
              setEducationText(educationData);
            }
          }
        }
        
        alert('재시도 성공!');
      } else {
        console.log(`❌ 재시도 실패: ${failed.style?.name} - ${result.error}`);
        alert('재시도 실패. 나중에 다시 시도해주세요.');
      }
    } catch (error) {
      console.error(`❌ 재시도 에러: ${failed.style?.name}`, error);
      alert('재시도 중 오류가 발생했습니다.');
    }
    
    setIsRetrying(false);
    setRetryProgress('');
  };


  // ========== Effects ==========
  // aiSelectedArtist가 변경될 때마다 2차 교육 재생성
  // 원클릭: currentIndex 변경 또는 currentResult 업데이트 시 재생성
  useEffect(() => {
    console.log('🎨 ResultScreen mounted or aiSelectedArtist changed');
    generate2ndEducation();
  }, [aiSelectedArtist, currentIndex, currentResult?.aiSelectedArtist, currentResult?.selected_work]);

  // 원클릭: 화면 이동 시 현재 결과 로그
  useEffect(() => {
    if (isFullTransform && currentResult) {
      console.log('========================================');
      console.log(`📍 현재 화면: ${currentIndex + 1}/${results.length}`);
      console.log(`   - 스타일: ${currentResult.style?.name}`);
      console.log(`   - 성공 여부: ${currentResult.success ? '✅ 성공' : '❌ 실패'}`);
      console.log(`   - aiSelectedArtist: ${currentResult.aiSelectedArtist}`);
      console.log(`   - selected_work: ${currentResult.selected_work}`);
      if (!currentResult.success) {
        console.log(`   - 에러: ${currentResult.error}`);
      }
      console.log('========================================');
    }
  }, [currentIndex, isFullTransform, currentResult, results.length]);


  // ========== 원클릭용 키 매칭 (단일변환과 동일한 workKeyMap 사용) ==========
  const getOneclickEducationKey = (workName, artistName, category) => {
    console.log('🔍 getOneclickEducationKey called:');
    console.log('   - workName:', workName);
    console.log('   - artistName:', artistName);
    console.log('   - category:', category);
    
    // ========== 거장: workKeyMap으로 매칭 ==========
    if (category === 'masters' && workName) {
      const mastersWorkKeyMap = {
        // 반 고흐
        'The Starry Night': 'gogh-starrynight',
        '별이 빛나는 밤': 'gogh-starrynight',
        'Starry Night': 'gogh-starrynight',
        'Sunflowers': 'gogh-sunflowers',
        '해바라기': 'gogh-sunflowers',
        'Self-Portrait': 'gogh-selfportrait',
        '자화상': 'gogh-selfportrait',
        
        // 클림트
        'The Kiss': 'klimt-kiss',
        '키스': 'klimt-kiss',
        'The Tree of Life': 'klimt-treeoflife',
        '생명의 나무': 'klimt-treeoflife',
        'Tree of Life': 'klimt-treeoflife',
        'Judith I': 'klimt-judith',
        'Judith': 'klimt-judith',
        '유디트': 'klimt-judith',
        
        // 뭉크
        'The Scream': 'munch-scream',
        '절규': 'munch-scream',
        'Scream': 'munch-scream',
        'Madonna': 'munch-madonna',
        '마돈나': 'munch-madonna',
        
        // 마티스
        'The Dance': 'matisse-dance',
        '춤': 'matisse-dance',
        'Dance': 'matisse-dance',
        'The Red Room': 'matisse-redroom',
        '붉은 방': 'matisse-redroom',
        'Red Room': 'matisse-redroom',
        'Woman with a Hat': 'matisse-womanwithhat',
        '모자를 쓴 여인': 'matisse-womanwithhat',
        
        // 피카소
        'Les Demoiselles d\'Avignon': 'picasso-demoiselles',
        '아비뇽의 처녀들': 'picasso-demoiselles',
        'Demoiselles': 'picasso-demoiselles',
        'Guernica': 'picasso-guernica',
        '게르니카': 'picasso-guernica',
        'Weeping Woman': 'picasso-weepingwoman',
        '우는 여인': 'picasso-weepingwoman',
        
        // 프리다 칼로
        'Me and My Parrots': 'frida-parrots',
        '나와 앵무새들': 'frida-parrots',
        'The Broken Column': 'frida-brokencolumn',
        '부러진 기둥': 'frida-brokencolumn',
        'Broken Column': 'frida-brokencolumn',
        'Self-Portrait with Thorn Necklace': 'frida-thornnecklace',
        '가시 목걸이와 벌새': 'frida-thornnecklace',
        'Thorn Necklace': 'frida-thornnecklace',
        'Self-Portrait with Monkeys': 'frida-monkeys',
        '원숭이와 자화상': 'frida-monkeys',
        
        // 워홀
        'Marilyn Monroe': 'warhol-marilyn',
        'Marilyn Monroe (마릴린 먼로)': 'warhol-marilyn',
        '마릴린 먼로': 'warhol-marilyn',
        'Marilyn': 'warhol-marilyn',
        'Campbell\'s Soup Cans': 'warhol-soup',
        '캠벨 수프 캔': 'warhol-soup',
        'Soup Cans': 'warhol-soup',
      };
      
      const key = mastersWorkKeyMap[workName];
      if (key) {
        console.log('✅ Masters workKeyMap matched:', key);
        return key;
      }
    }
    
    // ========== 미술사조: artistName으로 매칭 ==========
    if (category === 'movements' && artistName) {
      const movementsArtistKeyMap = {
        // 고대
        'Greek Sculpture': 'ancient-greek-sculpture',
        'Ancient Greek Sculpture': 'ancient-greek-sculpture',
        'Roman Mosaic': 'roman-mosaic',
        // 중세
        'Byzantine': 'byzantine',
        'Byzantine Mosaic': 'byzantine',
        'Gothic': 'gothic',
        'Gothic Stained Glass': 'gothic',  // API 반환값
        'Islamic Miniature': 'islamic-miniature',
        'Islamic Geometry': 'islamic-miniature',
        // 르네상스
        'Leonardo da Vinci': 'leonardo',
        'LEONARDO': 'leonardo',
        'LEONARDO DA VINCI': 'leonardo',
        'Michelangelo': 'michelangelo',
        'MICHELANGELO': 'michelangelo',
        'Raphael': 'raphael',
        'RAPHAEL': 'raphael',
        'Botticelli': 'botticelli',
        'BOTTICELLI': 'botticelli',
        'Titian': 'titian',
        'TITIAN': 'titian',
        // 바로크
        'Caravaggio': 'caravaggio',
        'CARAVAGGIO': 'caravaggio',
        'Rembrandt': 'rembrandt',
        'REMBRANDT': 'rembrandt',
        'Vermeer': 'vermeer',
        'VERMEER': 'vermeer',
        'Velázquez': 'velazquez',
        'VELÁZQUEZ': 'velazquez',
        'Velazquez': 'velazquez',
        'VELAZQUEZ': 'velazquez',
        // 로코코
        'Watteau': 'watteau',
        'WATTEAU': 'watteau',
        'Boucher': 'boucher',
        'BOUCHER': 'boucher',
        // 19세기
        'Jacques-Louis David': 'jacques-louis-david',
        'DAVID': 'jacques-louis-david',
        'Ingres': 'ingres',
        'INGRES': 'ingres',
        'Jean-Auguste-Dominique Ingres': 'ingres',
        'Turner': 'turner',
        'TURNER': 'turner',
        'Goya': 'goya',
        'GOYA': 'goya',
        'Delacroix': 'delacroix',
        'DELACROIX': 'delacroix',
        'Millet': 'millet',
        'MILLET': 'millet',
        'Manet': 'manet',
        'MANET': 'manet',
        // 인상주의
        'Monet': 'monet',
        'MONET': 'monet',
        'Claude Monet': 'monet',
        'Renoir': 'renoir',
        'RENOIR': 'renoir',
        'Pierre-Auguste Renoir': 'renoir',
        'Degas': 'degas',
        'DEGAS': 'degas',
        'Edgar Degas': 'degas',
        'Caillebotte': 'caillebotte',
        'CAILLEBOTTE': 'caillebotte',
        'Gustave Caillebotte': 'caillebotte',
        // 후기인상주의
        'Van Gogh': 'gogh',
        'GOGH': 'gogh',
        'Vincent van Gogh': 'gogh',
        'Cézanne': 'cezanne',
        'CÉZANNE': 'cezanne',  // 악센트 버전
        'CEZANNE': 'cezanne',
        'Paul Cézanne': 'cezanne',
        'Gauguin': 'gauguin',
        'GAUGUIN': 'gauguin',
        'Paul Gauguin': 'gauguin',
        'Signac': 'signac',
        'SIGNAC': 'signac',
        'Paul Signac': 'signac',
        // 야수파
        'Matisse': 'matisse',
        'MATISSE': 'matisse',
        'Henri Matisse': 'matisse',
        'Derain': 'derain',
        'DERAIN': 'derain',
        'André Derain': 'derain',
        'Vlaminck': 'vlaminck',
        'VLAMINCK': 'vlaminck',
        'Maurice de Vlaminck': 'vlaminck',
        // 표현주의
        'Munch': 'munch',
        'MUNCH': 'munch',
        'Edvard Munch': 'munch',
        'Kokoschka': 'kokoschka',
        'KOKOSCHKA': 'kokoschka',
        'Oskar Kokoschka': 'kokoschka',
        'Kirchner': 'kirchner',
        'KIRCHNER': 'kirchner',
        'Ernst Ludwig Kirchner': 'kirchner',
        'Kandinsky': 'kandinsky',
        'KANDINSKY': 'kandinsky',
        'Wassily Kandinsky': 'kandinsky',
        // 모더니즘
        'Picasso': 'picasso',
        'PICASSO': 'picasso',
        'Pablo Picasso': 'picasso',
        'Magritte': 'magritte',
        'MAGRITTE': 'magritte',
        'René Magritte': 'magritte',
        'Miró': 'miro',
        'MIRO': 'miro',
        'Joan Miró': 'miro',
        'Chagall': 'chagall',
        'CHAGALL': 'chagall',
        'Marc Chagall': 'chagall',
        'Warhol': 'warhol',
        'WARHOL': 'warhol',
        'Andy Warhol': 'warhol',
        'Lichtenstein': 'lichtenstein',
        'LICHTENSTEIN': 'lichtenstein',
        'Roy Lichtenstein': 'lichtenstein',
        'Keith Haring': 'keith-haring',
        'KEITH HARING': 'keith-haring',
        // 한글 fallback (AI 타임아웃 시)
        '르네상스': 'leonardo',
        '바로크': 'caravaggio',
        '로코코': 'watteau',
        '신고전주의': 'jacques-louis-david',
        '낭만주의': 'delacroix',
        '사실주의': 'millet',
        '인상주의': 'monet',
        '후기인상주의': 'gogh',
        '야수파': 'matisse',
        '표현주의': 'munch',
        '모더니즘': 'picasso',
      };
      
      const key = movementsArtistKeyMap[artistName];
      if (key) {
        console.log('✅ Movements artistKeyMap matched:', key);
        return key;
      }
      
      // 부분 매칭 시도 (성만으로)
      const lastName = artistName.split(/[\s-]+/).pop()?.toLowerCase();
      if (lastName && oneclickMovementsSecondary[lastName]) {
        console.log('✅ Movements lastName matched:', lastName);
        return lastName;
      }
    }
    
    // ========== 동양화: artistName으로 매칭 ==========
    if (category === 'oriental' && artistName) {
      const orientalKeyMap = {
        '한국 전통화': 'korean-genre',  // fallback 기본값
        'Korean Minhwa': 'korean-minhwa',
        '민화': 'korean-minhwa',
        'Korean Pungsokdo': 'korean-genre',
        '풍속화': 'korean-genre',
        'Korean Jingyeong': 'korean-jingyeong',
        '진경산수': 'korean-jingyeong',
        'Chinese Ink Wash': 'chinese-ink',
        '수묵산수': 'chinese-ink',
        'Chinese Gongbi': 'chinese-gongbi',
        '공필화': 'chinese-gongbi',
        'Japanese Ukiyo-e': 'japanese-ukiyoe',
        '우키요에': 'japanese-ukiyoe',
      };
      
      const key = orientalKeyMap[artistName];
      if (key) {
        console.log('✅ Oriental keyMap matched:', key);
        return key;
      }
      
      // styleId 기반 fallback
      const styleId = currentResult?.style?.id;
      if (styleId === 'korean') return 'korean-minhwa';
      if (styleId === 'chinese') return 'chinese-ink';
      if (styleId === 'japanese') return 'japanese-ukiyoe';
    }
    
    console.log('❌ No key found');
    return null;
  };


  // ========== 2차 교육 로드 ==========
  const generate2ndEducation = () => {
    console.log('');
    console.log('🔥🔥🔥 LOAD EDUCATION START 🔥🔥🔥');
    console.log('   - category:', selectedStyle.category);
    console.log('   - isFullTransform:', isFullTransform);
    console.log('   - displayArtist:', displayArtist);
    console.log('   - aiSelectedArtist:', aiSelectedArtist);
    console.log('');
    
    setIsLoadingEducation(true);
    
    let content = null;
    
    // ========== 원클릭: 분리된 원클릭 교육자료 파일 사용 ==========
    if (isFullTransform) {
      console.log('📜 ONECLICK MODE - using separated education files');
      console.log('   - displayWork:', displayWork);
      console.log('   - displayArtist:', displayArtist);
      console.log('   - displayCategory:', displayCategory);
      
      const key = getOneclickEducationKey(displayWork, displayArtist, displayCategory);
      console.log('   - matched key:', key);
      
      if (key) {
        // 카테고리별 분리된 파일에서 교육자료 가져오기
        let educationData = null;
        
        if (displayCategory === 'masters') {
          educationData = oneclickMastersSecondary[key];
        } else if (displayCategory === 'movements') {
          educationData = oneclickMovementsSecondary[key];
        } else if (displayCategory === 'oriental') {
          educationData = oneclickOrientalSecondary[key];
        }
        
        if (educationData) {
          content = educationData.content;
          console.log('✅ Found oneclick education for:', key);
          console.log('   - content preview:', content?.substring(0, 50));
        } else {
          console.log('❌ No education data found for key:', key);
        }
      } else {
        console.log('❌ No key matched');
      }
    }
    
    // ========== 단일 변환: 기존 교육자료 사용 ==========
    if (!content && !isFullTransform) {
      const category = selectedStyle.category;
      
      // 1. 동양화 (oriental)
      if (category === 'oriental') {
        console.log('📜 Loading oriental education...');
        content = getOrientalEducation();
      }
      
      // 2. 미술사조 (movements)
      else if (category !== 'masters') {
        console.log('📜 Loading movements education...');
        content = getMovementsEducation();
      }
      
      // 3. 거장 (masters)
      else {
        console.log('📜 Loading masters education...');
        content = getMastersEducation();
      }
    }
    
    // 결과 설정
    if (content) {
      console.log('✅ Education loaded successfully!');
      console.log('   Content type:', typeof content);
      console.log('   Content length:', content.length);
      console.log('   Preview:', content.substring(0, 80) + '...');
      console.log('   Setting educationText to:', content);
      setEducationText(content);
      console.log('   ✅ setEducationText called');
    } else {
      console.error('❌ No education content found!');
      const fallback = getFallbackMessage();
      console.log('   Using fallback:', fallback);
      setEducationText(fallback);
    }
    
    console.log('   Setting isLoadingEducation to false');
    setIsLoadingEducation(false);
    console.log('🏁 Loading complete');
    console.log('');
  };


  // ========== 미술사조 교육 콘텐츠 (v49 - 동양화 방식) ==========
  const getMovementsEducation = (overrideArtist = null) => {
    const category = selectedStyle.category;
    const artistSource = overrideArtist || aiSelectedArtist;
    
    console.log('');
    console.log('========================================');
    console.log('🎨 MOVEMENTS EDUCATION (v52):');
    console.log('========================================');
    console.log('   - category:', category);
    console.log('   - artistSource:', artistSource);
    console.log('========================================');
    console.log('');
    
    // 화가 이름 정규화
    let artistName = (artistSource || '')
      .replace(/\s*\([^)]*\)/g, '')  // 괄호 제거
      .trim();
    
    if (!artistName) {
      console.log('⚠️ No artist name provided');
      return null;
    }
    
    // 여러 매칭 패턴 시도
    const words = artistName.split(/\s+/);
    const patterns = [];
    
    // 특수문자 변환 함수 (é → e 등)
    const normalize = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    
    // 패턴 1: 전체 이름 (소문자, 공백 제거)
    patterns.push(artistName.toLowerCase().replace(/\s+/g, ''));
    
    // 패턴 2: 전체 이름 (소문자, 하이픈)
    patterns.push(artistName.toLowerCase().replace(/\s+/g, '-'));
    
    // 패턴 3: 마지막 단어 (성)
    if (words.length > 1) {
      patterns.push(words[words.length - 1].toLowerCase());
    }
    
    // 패턴 4: 첫 단어 (이름)
    patterns.push(words[0].toLowerCase());
    
    // 패턴 5: 전체 소문자
    patterns.push(artistName.toLowerCase());
    
    // 패턴 6-10: 특수문자 제거 버전 (é → e 등)
    patterns.push(normalize(artistName.toLowerCase().replace(/\s+/g, '')));
    patterns.push(normalize(artistName.toLowerCase().replace(/\s+/g, '-')));
    if (words.length > 1) {
      patterns.push(normalize(words[words.length - 1].toLowerCase()));
    }
    patterns.push(normalize(words[0].toLowerCase()));
    patterns.push(normalize(artistName.toLowerCase()));
    
    console.log('   - trying patterns:', patterns);
    console.log('');
    
    // 각 패턴으로 매칭 시도
    let education = null;
    let matchedPattern = null;
    
    for (const pattern of patterns) {
      if (movementsEducation[pattern]) {
        education = movementsEducation[pattern];
        matchedPattern = pattern;
        break;
      }
    }
    
    if (education && education.description) {
      console.log('✅ Found artist education with pattern:', matchedPattern);
      console.log('✅ Original name:', artistName);
      console.log('✅ Matched key:', matchedPattern);
      console.log('✅ description length:', education.description.length);
      console.log('========================================');
      console.log('');
      return education.description;
    }
    
    console.log('⚠️ No artist education found for:', artistName);
    console.log('⚠️ Tried patterns:', patterns);
    console.log('⚠️ Available keys (first 15):', Object.keys(movementsEducation).slice(0, 15));
    console.log('========================================');
    console.log('');
    
    // Fallback: 1차 교육 사용
    if (movementsOverview && movementsOverview[category]) {
      console.log('📚 Using 1st education as fallback for category:', category);
      return movementsOverview[category].desc;
    }
    
    return null;
  };


  // ========== 거장 교육 콘텐츠 (v60 - 통합본 사용) ==========
  const getMastersEducation = (overrideArtist = null) => {
    const artistSource = overrideArtist || aiSelectedArtist || selectedStyle.name || '';
    const artist = artistSource.replace(/\s*\([^)]*\)/g, '').trim();
    
    console.log('');
    console.log('========================================');
    console.log('🎨 MASTERS EDUCATION (v60 통합본):');
    console.log('========================================');
    console.log('   - artistSource:', artistSource);
    console.log('   - normalized artist:', artist);
    console.log('========================================');
    console.log('');
    
    // ========== 2차 교육자료 (개별 작품) ==========
    // aiSelectedWork가 있으면 해당 작품 키로 검색
    if (aiSelectedWork) {
      console.log('🎯 Trying 2nd education with selected_work:', aiSelectedWork);
      
      // 작품명 → mastersEducation 키 매핑
      const workKeyMap = {
        // 반 고흐
        'The Starry Night': 'vangogh-starrynight',
        '별이 빛나는 밤': 'vangogh-starrynight',
        'Starry Night': 'vangogh-starrynight',
        'Sunflowers': 'vangogh-sunflowers',
        '해바라기': 'vangogh-sunflowers',
        'Bedroom in Arles': 'vangogh-bedroom',
        '아를의 침실': 'vangogh-bedroom',
        'The Potato Eaters': 'vangogh-potatoeaters',
        '감자 먹는 사람들': 'vangogh-potatoeaters',
        'Self-Portrait': 'vangogh-selfportrait',
        '자화상': 'vangogh-selfportrait',
        
        // 클림트
        'The Kiss': 'klimt-kiss',
        '키스': 'klimt-kiss',
        'Portrait of Adele Bloch-Bauer I': 'klimt-adele',
        '아델레 블로흐-바우어의 초상': 'klimt-adele',
        'Adele Bloch-Bauer': 'klimt-adele',
        'The Tree of Life': 'klimt-treeoflife',
        '생명의 나무': 'klimt-treeoflife',
        'Tree of Life': 'klimt-treeoflife',
        'Danae': 'klimt-danae',
        '다나에': 'klimt-danae',
        'Judith I': 'klimt-judith',
        'Judith': 'klimt-judith',
        '유디트': 'klimt-judith',
        
        // 뭉크
        'The Scream': 'munch-scream',
        '절규': 'munch-scream',
        'Scream': 'munch-scream',
        'Madonna': 'munch-madonna',
        '마돈나': 'munch-madonna',
        'The Sick Child': 'munch-sickchild',
        '병든 아이': 'munch-sickchild',
        'Sick Child': 'munch-sickchild',
        'The Dance of Life': 'munch-vampire',
        'Puberty': 'munch-puberty',
        '사춘기': 'munch-puberty',
        'Vampire': 'munch-vampire',
        '뱀파이어': 'munch-vampire',
        
        // 마티스
        'The Dance': 'matisse-dance',
        '춤': 'matisse-dance',
        'Dance': 'matisse-dance',
        'The Red Room': 'matisse-redroom',
        '붉은 방': 'matisse-redroom',
        'Red Room': 'matisse-redroom',
        'Woman with a Hat': 'matisse-womanhat',
        '모자를 쓴 여인': 'matisse-womanhat',
        'Goldfish': 'matisse-goldfish',
        '금붕어': 'matisse-goldfish',
        'The Snail': 'matisse-snail',
        '달팽이': 'matisse-snail',
        'Snail': 'matisse-snail',
        
        // 피카소
        'Les Demoiselles d\'Avignon': 'picasso-demoiselles',
        '아비뇽의 처녀들': 'picasso-demoiselles',
        'Demoiselles': 'picasso-demoiselles',
        'Guernica': 'picasso-guernica',
        '게르니카': 'picasso-guernica',
        'Weeping Woman': 'picasso-weepingwoman',
        '우는 여인': 'picasso-weepingwoman',
        'Guitar': 'picasso-dream',
        'The Dream': 'picasso-dream',
        '꿈': 'picasso-dream',
        'Dream': 'picasso-dream',
        'Bull\'s Head': 'picasso-bullhead',
        '황소 머리': 'picasso-bullhead',
        
        // 프리다 칼로
        'Me and My Parrots': 'frida-parrots',
        '나와 앵무새들': 'frida-parrots',
        '나와 내 앵무새들': 'frida-parrots',
        'My Parrots': 'frida-parrots',
        'The Broken Column': 'frida-brokencolumn',
        '부러진 기둥': 'frida-brokencolumn',
        'Broken Column': 'frida-brokencolumn',
        'Self-Portrait with Thorn Necklace': 'frida-thornnecklace',
        '가시 목걸이와 벌새': 'frida-thornnecklace',
        'Thorn Necklace': 'frida-thornnecklace',
        'Self-Portrait with Monkeys': 'frida-monkeys',
        '원숭이와 자화상': 'frida-monkeys',

        
        // 워홀
        'Marilyn Monroe': 'warhol-marilyn',
        '마릴린 먼로': 'warhol-marilyn',
        'Marilyn': 'warhol-marilyn',
        'Campbell\'s Soup Cans': 'warhol-soup',
        '캠벨 수프 캔': 'warhol-soup',
        'Soup Cans': 'warhol-soup',
        'Banana': 'warhol-banana',
        '바나나': 'warhol-banana',
        'Endangered Species': 'warhol-endangered',
        '멸종 위기 종': 'warhol-endangered',
        'Elvis': 'warhol-elvis',
        '엘비스': 'warhol-elvis'
      };
      
      // 직접 매칭 시도
      let workKey = workKeyMap[aiSelectedWork];
      
      // 부분 매칭 시도
      if (!workKey) {
        const workLower = aiSelectedWork.toLowerCase();
        for (const [name, key] of Object.entries(workKeyMap)) {
          if (workLower.includes(name.toLowerCase()) || name.toLowerCase().includes(workLower)) {
            workKey = key;
            break;
          }
        }
      }
      
      console.log('   - workKey:', workKey);
      
      if (workKey && mastersEducation[workKey]) {
        const education = mastersEducation[workKey];
        console.log('✅ Found 2nd education (개별 작품)!');
        console.log('   - title:', education.title);
        console.log('   - desc length:', education.desc?.length);
        return education.desc;
      }
      
      console.log('⚠️ 2nd education not found, falling back to 1st');
    }
    
    // ========== 1차 교육자료 (거장 개요) ==========
    // 한글 이름 → mastersEducation 키 매핑
    const artistKeyMap = {
      '빈센트 반 고흐': 'vangogh-master',
      '반 고흐': 'vangogh-master',
      'van gogh': 'vangogh-master',
      'vincent van gogh': 'vangogh-master',
      '구스타프 클림트': 'klimt-master',
      '클림트': 'klimt-master',
      'klimt': 'klimt-master',
      'gustav klimt': 'klimt-master',
      '에드바르 뭉크': 'munch-master',
      '뭉크': 'munch-master',
      'munch': 'munch-master',
      'edvard munch': 'munch-master',
      '앙리 마티스': 'matisse-master',
      '마티스': 'matisse-master',
      'matisse': 'matisse-master',
      'henri matisse': 'matisse-master',
      '파블로 피카소': 'picasso-master',
      '피카소': 'picasso-master',
      'picasso': 'picasso-master',
      'pablo picasso': 'picasso-master',
      '프리다 칼로': 'frida-master',
      '프리다': 'frida-master',
      'frida': 'frida-master',
      'frida kahlo': 'frida-master',
      '앤디 워홀': 'warhol-master',
      '워홀': 'warhol-master',
      'warhol': 'warhol-master',
      'andy warhol': 'warhol-master'
    };
    
    // 키 매칭 시도
    const normalizedArtist = artist.toLowerCase();
    let masterKey = artistKeyMap[artist] || artistKeyMap[normalizedArtist];
    
    // 부분 매칭 시도
    if (!masterKey) {
      for (const [name, key] of Object.entries(artistKeyMap)) {
        if (normalizedArtist.includes(name.toLowerCase()) || name.toLowerCase().includes(normalizedArtist)) {
          masterKey = key;
          break;
        }
      }
    }
    
    console.log('   - masterKey:', masterKey);
    
    if (masterKey && mastersEducation[masterKey]) {
      const education = mastersEducation[masterKey];
      console.log('✅ Found 1st education (거장 개요)!');
      console.log('   - title:', education.title);
      console.log('   - desc length:', education.desc?.length);
      return education.desc;
    }
    
    console.log('⚠️ Masters education not found for:', artist);
    console.log('');
    
    return null;
  };


  // ========== 거장 작품명 포맷 ==========
  const formatWorkName = (workName) => {
    if (!workName) return '대표작';
    
    // 이미 한글(영문) 형식이면 그대로 반환
    if (workName.includes('(') && workName.includes(')') && !/^[A-Za-z]/.test(workName)) {
      return workName;
    }
    
    // 작품명 매핑 - 거장 전체 작품: 한글명(영문명) 형식
    const workMap = {
      // 반 고흐
      'The Starry Night': '별이 빛나는 밤(The Starry Night)',
      'Starry Night': '별이 빛나는 밤(Starry Night)',
      'Sunflowers': '해바라기(Sunflowers)',
      'Self-Portrait': '자화상(Self-Portrait)',
      
      // 클림트
      'The Kiss': '키스(The Kiss)',
      'The Tree of Life': '생명의 나무(The Tree of Life)',
      'Judith': '유디트(Judith)',
      'Judith I': '유디트 I(Judith I)',
      
      // 뭉크
      'The Scream': '절규(The Scream)',
      'Madonna': '마돈나(Madonna)',
      
      // 마티스
      'The Dance': '춤(The Dance)',
      'The Red Room': '붉은 방(The Red Room)',
      'Woman with a Hat': '모자를 쓴 여인(Woman with a Hat)',
      
      // 피카소
      'Guernica': '게르니카(Guernica)',
      'Weeping Woman': '우는 여인(Weeping Woman)',
      "Les Demoiselles d'Avignon": '아비뇽의 처녀들(Les Demoiselles d\'Avignon)',
      
      // 프리다 칼로
      'Me and My Parrots': '나와 앵무새(Me and My Parrots)',
      'Self-Portrait with Parrots': '앵무새와 자화상(Self-Portrait with Parrots)',
      'The Broken Column': '부러진 기둥(The Broken Column)',
      'Self-Portrait with Thorn Necklace': '가시 목걸이 자화상(Self-Portrait with Thorn Necklace)',
      'Self-Portrait with Monkeys': '원숭이와 자화상(Self-Portrait with Monkeys)',
      'The Two Fridas': '두 명의 프리다(The Two Fridas)',
      
      // 워홀
      'Marilyn Monroe': '마릴린 먼로(Marilyn Monroe)',
      'Marilyn': '마릴린(Marilyn)',
      "Campbell's Soup Cans": '캠벨 수프 캔(Campbell\'s Soup Cans)'
    };
    
    if (workMap[workName]) {
      return workMap[workName];
    }
    
    // 매핑에 없으면 원본 반환
    return workName;
  };


  // ========== 동양화 스타일명 포맷 통일 ==========
  const formatOrientalStyle = (styleName) => {
    if (!styleName) return '동양화 기법';
    
    const normalized = styleName.toLowerCase().trim();
    
    // 동양화 스타일 통일 매핑: 한글명(영문명)
    const orientalMap = {
      // 한국
      '한국 전통화': '한국 민화(Korean Minhwa)',
      'korean-genre': '한국 풍속화(Korean Genre)',
      'korean-minhwa': '한국 민화(Korean Minhwa)',
      'korean-jingyeong': '한국 진경산수(Korean Jingyeong)',
      
      // 중국
      'chinese gongbi': '중국 공필화(Chinese Gongbi)',
      'chinese-gongbi': '중국 공필화(Chinese Gongbi)',
      'gongbi': '중국 공필화(Chinese Gongbi)',
      'chinese-ink': '중국 수묵화(Chinese Ink)',
      'chinese-huaniao': '중국 화조화(Chinese Huaniao)',
      
      // 일본
      '일본 우키요에': '일본 우키요에(Japanese Ukiyo-e)',
      'japanese-ukiyoe': '일본 우키요에(Japanese Ukiyo-e)',
      'ukiyoe': '일본 우키요에(Japanese Ukiyo-e)',
      'ukiyo-e': '일본 우키요에(Japanese Ukiyo-e)'
    };
    
    // 정확한 매칭
    if (orientalMap[styleName]) {
      return orientalMap[styleName];
    }
    if (orientalMap[normalized]) {
      return orientalMap[normalized];
    }
    
    // 부분 매칭
    if (normalized.includes('korean') || normalized.includes('한국')) {
      return '한국 민화(Korean Minhwa)';
    }
    if (normalized.includes('chinese') || normalized.includes('gongbi') || normalized.includes('중국')) {
      return '중국 공필화(Chinese Gongbi)';
    }
    if (normalized.includes('japanese') || normalized.includes('ukiyo') || normalized.includes('일본')) {
      return '일본 우키요에(Japanese Ukiyo-e)';
    }
    
    // 매핑에 없으면 원본 반환
    return styleName;
  };


  // ========== 화가 이름 한글(Full Name) 변환 ==========
  const formatArtistName = (artistName) => {
    if (!artistName) return '예술 스타일';
    
    const normalized = artistName.toLowerCase().trim();
    
    // 영문 이름 → 한글(Full Name) 매핑
    const nameMap = {
      // 고대 미술
      'ancient-greek-sculpture': '고대 조각(Ancient Sculpture)',
      'ancient-sculpture': '고대 조각(Ancient Sculpture)',
      'classical-sculpture': '고대 조각(Ancient Sculpture)',
      'classical sculpture': '고대 조각(Classical Sculpture)',
      'greek-sculpture': '고대 조각(Ancient Sculpture)',
      'roman-mosaic': '로마 모자이크(Roman Mosaic)',
      'ancient-mosaic': '로마 모자이크(Roman Mosaic)',
      'mosaic': '로마 모자이크(Roman Mosaic)',
      
      // 중세 미술
      'byzantine': '비잔틴(Byzantine)',
      'gothic': '고딕(Gothic)',
      'romanesque': '로마네스크(Romanesque)',
      'islamic miniature': '이슬람 세밀화(Islamic Miniature)',
      'islamic geometry': '이슬람 기하학(Islamic Geometry)',
      
      // 르네상스
      'leonardo': '레오나르도 다 빈치(Leonardo da Vinci)',
      'leonardo da vinci': '레오나르도 다 빈치(Leonardo da Vinci)',
      'michelangelo': '미켈란젤로(Michelangelo Buonarroti)',
      'raphael': '라파엘로(Raffaello Sanzio)',
      'botticelli': '보티첼리(Sandro Botticelli)',
      'titian': '티치아노(Tiziano Vecellio)',
      
      // 바로크
      'caravaggio': '카라바조(Caravaggio)',
      'rembrandt': '렘브란트(Rembrandt van Rijn)',
      'vermeer': '베르메르(Johannes Vermeer)',
      'velazquez': '벨라스케스(Diego Velázquez)',
      'rubens': '루벤스(Peter Paul Rubens)',
      'peter paul rubens': '루벤스(Peter Paul Rubens)',
      
      // 로코코
      'watteau': '와토(Jean-Antoine Watteau)',
      'jean-antoine watteau': '와토(Jean-Antoine Watteau)',
      'fragonard': '프라고나르(Jean-Honoré Fragonard)',
      
      // 신고전주의
      'jacques-louis-david': '다비드(Jacques-Louis David)',
      'david': '다비드(Jacques-Louis David)',
      'ingres': '앵그르(Jean-Auguste-Dominique Ingres)',
      'jean-auguste-dominique ingres': '앵그르(Jean-Auguste-Dominique Ingres)',
      
      // 낭만주의
      'turner': '터너(J.M.W. Turner)',
      'j.m.w. turner': '터너(J.M.W. Turner)',
      'william turner': '터너(J.M.W. Turner)',
      'friedrich': '프리드리히(Caspar David Friedrich)',
      'caspar david friedrich': '프리드리히(Caspar David Friedrich)',
      'delacroix': '들라크루아(Eugène Delacroix)',
      'eugène delacroix': '들라크루아(Eugène Delacroix)',
      'eugene delacroix': '들라크루아(Eugène Delacroix)',
      'goya': '고야(Francisco Goya)',
      'francisco goya': '고야(Francisco Goya)',
      
      // 사실주의
      'millet': '밀레(Jean-François Millet)',
      'jean-françois millet': '밀레(Jean-François Millet)',
      'jean-francois millet': '밀레(Jean-François Millet)',
      'manet': '마네(Édouard Manet)',
      'édouard manet': '마네(Édouard Manet)',
      'edouard manet': '마네(Édouard Manet)',
      
      // 인상주의
      'monet': '모네(Claude Monet)',
      'claude monet': '모네(Claude Monet)',
      'renoir': '르누아르(Pierre-Auguste Renoir)',
      'pierre-auguste renoir': '르누아르(Pierre-Auguste Renoir)',
      'degas': '드가(Edgar Degas)',
      'edgar degas': '드가(Edgar Degas)',
      'caillebotte': '칼리보트(Gustave Caillebotte)',
      'gustave caillebotte': '칼리보트(Gustave Caillebotte)',
      // v60: 피사로/시슬리 삭제 → 칼리보트 추가
      
      // 후기인상주의
      'van gogh': '반 고흐(Vincent van Gogh)',
      'vincent van gogh': '반 고흐(Vincent van Gogh)',
      'cézanne': '세잔(Paul Cézanne)',
      'cezanne': '세잔(Paul Cézanne)',
      'paul cézanne': '세잔(Paul Cézanne)',
      'paul cezanne': '세잔(Paul Cézanne)',
      'gauguin': '고갱(Paul Gauguin)',
      'paul gauguin': '고갱(Paul Gauguin)',
      'seurat': '쇠라(Georges Seurat)',
      'georges seurat': '쇠라(Georges Seurat)',
      'signac': '시냐크(Paul Signac)',
      'paul signac': '시냐크(Paul Signac)',
      
      // 야수파
      'matisse': '마티스(Henri Matisse)',
      'henri matisse': '마티스(Henri Matisse)',
      'derain': '드랭(André Derain)',
      'andré derain': '드랭(André Derain)',
      'andre derain': '드랭(André Derain)',
      'vlaminck': '블라맹크(Maurice de Vlaminck)',
      'maurice de vlaminck': '블라맹크(Maurice de Vlaminck)',
      
      // 표현주의
      'munch': '뭉크(Edvard Munch)',
      'edvard munch': '뭉크(Edvard Munch)',
      'kirchner': '키르히너(Ernst Ludwig Kirchner)',
      'ernst ludwig kirchner': '키르히너(Ernst Ludwig Kirchner)',
      'schiele': '에곤 실레(Egon Schiele)',
      'egon schiele': '에곤 실레(Egon Schiele)',
      'kandinsky': '칸딘스키(Wassily Kandinsky)',
      'wassily kandinsky': '칸딘스키(Wassily Kandinsky)',
      'kokoschka': '코코슈카(Oskar Kokoschka)',
      'oskar kokoschka': '코코슈카(Oskar Kokoschka)',
      
      // 입체주의
      'picasso': '피카소(Pablo Picasso)',
      'pablo picasso': '피카소(Pablo Picasso)',
      
      // 초현실주의
      'magritte': '마그리트(René Magritte)',
      'rené magritte': '마그리트(René Magritte)',
      'rene magritte': '마그리트(René Magritte)',
      'miro': '미로(Joan Miró)',
      'miró': '미로(Joan Miró)',
      'joan miro': '미로(Joan Miró)',
      'joan miró': '미로(Joan Miró)',
      'chagall': '샤갈(Marc Chagall)',
      'marc chagall': '샤갈(Marc Chagall)',
      
      // 팝아트
      'warhol': '워홀(Andy Warhol)',
      'andy warhol': '워홀(Andy Warhol)',
      'lichtenstein': '리히텐슈타인(Roy Lichtenstein)',
      'roy lichtenstein': '리히텐슈타인(Roy Lichtenstein)',
      'haring': '키스 해링(Keith Haring)',
      'keith haring': '키스 해링(Keith Haring)',
      'keith-haring': '키스 해링(Keith Haring)',
      
      // 동양화 - 한국
      'korean-jingyeong': '진경산수화(Korean True-View Landscape)',
      'korean_jingyeong': '진경산수화(Korean True-View Landscape)',
      'jingyeong': '진경산수화(True-View Landscape)',
      'true-view': '진경산수화(True-View Landscape)',
      'true-view-landscape': '진경산수화(True-View Landscape)',
      'korean-landscape': '진경산수화(Korean Landscape)',
      
      'korean-minhwa': '민화(Korean Folk Painting)',
      'korean_minhwa': '민화(Korean Folk Painting)',
      'minhwa': '민화(Folk Painting)',
      'folk-painting': '민화(Folk Painting)',
      'korean-folk': '민화(Korean Folk)',
      
      'korean-genre': '풍속화(Korean Genre Painting)',
      'korean_genre': '풍속화(Korean Genre Painting)',
      'genre-painting': '풍속화(Genre Painting)',
      'korean-genre-painting': '풍속화(Korean Genre Painting)',
      'pungsokdo': '풍속화(Pungsokdo)',
      
      // 동양화 - 중국
      'chinese-ink': '수묵산수화(Chinese Ink Landscape)',
      'chinese_ink': '수묵산수화(Chinese Ink Landscape)',
      'ink-landscape': '수묵산수화(Ink Landscape)',
      'ink-painting': '수묵산수화(Ink Painting)',
      'shanshui': '수묵산수화(Shanshui)',
      'chinese-landscape': '수묵산수화(Chinese Landscape)',
      
      'chinese-gongbi': '공필화(Chinese Gongbi)',
      'chinese_gongbi': '공필화(Chinese Gongbi)',
      'gongbi': '공필화(Gongbi)',
      'gongbi-painting': '공필화(Gongbi Painting)',
      
      'chinese-huaniao': '화조화(Chinese Bird-and-Flower)',
      'chinese_huaniao': '화조화(Chinese Bird-and-Flower)',
      'huaniao': '화조화(Bird-and-Flower)',
      'bird-and-flower': '화조화(Bird-and-Flower)',
      'flower-and-bird': '화조화(Flower-and-Bird)',
      
      // 동양화 - 일본
      'japanese-ukiyoe': '우키요에(Japanese Ukiyo-e)',
      'japanese_ukiyoe': '우키요에(Japanese Ukiyo-e)',
      'ukiyoe': '우키요에(Ukiyo-e)',
      'ukiyo-e': '우키요에(Ukiyo-e)',
      'japanese-woodblock': '우키요에(Japanese Woodblock)',
      'woodblock-print': '우키요에(Woodblock Print)'
    };
    
    // 매핑에서 찾기
    if (nameMap[normalized]) {
      return nameMap[normalized];
    }
    
    // 매핑에 없으면 원본 반환
    return artistName;
  };


  // ========== 신고전 vs 낭만 vs 사실: 구체적 사조 매핑 ==========
  const getSpecificMovement = (artistName) => {
    const artist = artistName.toLowerCase();
    
    // 신고전주의
    const neoclassical = ['jacques-louis-david', 'david', 'ingres', 'jean-auguste-dominique ingres'];
    
    // 낭만주의
    const romantic = ['turner', 'j.m.w. turner', 'william turner', 
                      'friedrich', 'caspar david friedrich', 
                      'delacroix', 'eugène delacroix', 'eugene delacroix'];
    
    // 사실주의
    const realist = ['millet', 'jean-françois millet', 'jean-francois millet',
                     'manet', 'édouard manet', 'edouard manet'];
    
    if (neoclassical.some(name => artist.includes(name))) {
      return { text: '신고전주의', color: 'neoclassical' };
    }
    if (romantic.some(name => artist.includes(name))) {
      return { text: '낭만주의', color: 'romantic' };
    }
    if (realist.some(name => artist.includes(name))) {
      return { text: '사실주의', color: 'realist' };
    }
    
    return null; // 매칭 안 되면 null
  };

  // ========== 20세기 모더니즘: 세부 사조 매핑 ==========
  const getModernismMovement = (artistName) => {
    const artist = artistName.toLowerCase();
    
    // 입체주의 - v59: 브라크 제거 (피카소와 중복)
    const cubism = ['picasso', 'pablo picasso'];
    
    // 초현실주의 - v59: 달리 완전 삭제
    const surrealism = ['magritte', 'rené magritte', 'rene magritte',
                        'miro', 'miró', 'joan miro', 'joan miró',
                        'chagall', 'marc chagall'];
    
    // 팝아트
    const popart = ['warhol', 'andy warhol',
                    'lichtenstein', 'roy lichtenstein',
                    'keith haring', 'keith-haring', 'haring'];
    
    if (cubism.some(name => artist.includes(name))) {
      return { text: '입체주의', color: 'cubism' };
    }
    if (surrealism.some(name => artist.includes(name))) {
      return { text: '초현실주의', color: 'surrealism' };
    }
    if (popart.some(name => artist.includes(name))) {
      return { text: '팝아트', color: 'popart' };
    }
    
    return null; // 매칭 안 되면 null
  };


  // ========== 동양화 교육 콘텐츠 (v30) ==========
  const getOrientalEducation = (overrideArtist = null) => {
    const styleId = selectedStyle.id;
    const artistSource = overrideArtist || aiSelectedArtist;
    
    console.log('');
    console.log('========================================');
    console.log('🔍 ORIENTAL EDUCATION DEBUG (v30)');
    console.log('========================================');
    console.log('📌 selectedStyle.id:', styleId);
    console.log('📌 artistSource:', artistSource);
    console.log('========================================');
    console.log('');
    
    
    // ========== 한국 전통 회화 (3가지) ==========
    if (styleId === 'korean') {
      const genre = artistSource?.toLowerCase() || '';
      console.log('🇰🇷 KOREAN ART DETECTION:');
      console.log('   - genre string:', genre);
      console.log('');
      
      // 민화
      if (genre.includes('minhwa') || genre.includes('민화')) {
        console.log('✅ MATCH: Korean Minhwa (민화)');
        console.log('========================================');
        console.log('');
        return orientalEducation.korean_minhwa?.description 
            || orientalEducation.korean?.description;
      } 
      
      // 풍속화
      else if (genre.includes('genre') || genre.includes('풍속') || genre.includes('pungsokdo') || genre.includes('풍속도')) {
        console.log('✅ MATCH: Korean Genre Painting (풍속화)');
        console.log('========================================');
        console.log('');
        return orientalEducation.korean_genre?.description 
            || orientalEducation.korean?.description;
      } 
      
      // 진경산수화
      else if (genre.includes('jingyeong') || genre.includes('진경') || genre.includes('landscape')) {
        console.log('✅ MATCH: Korean True-View Landscape (진경산수화)');
        console.log('========================================');
        console.log('');
        return orientalEducation.korean_jingyeong?.description 
            || orientalEducation.korean_default?.description;
      }
      
      // 기본값 (매칭 실패시)
      else {
        console.log('⚠️ DEFAULT: Korean Traditional Painting (한국 전통 회화)');
        console.log('========================================');
        console.log('');
        return orientalEducation.korean_default?.description;
      }
    }
    
    
    // ========== 중국 전통 회화 (3가지) ==========
    if (styleId === 'chinese') {
      const artist = aiSelectedArtist?.toLowerCase() || '';
      console.log('🇨🇳 CHINESE ART DETECTION:');
      console.log('   - artist string:', artist);
      console.log('');
      
      // 공필화
      if (artist.includes('gongbi') || artist.includes('공필')) {
        console.log('✅ MATCH: Chinese Gongbi (工筆畫)');
        console.log('========================================');
        console.log('');
        return orientalEducation.chinese_gongbi?.description 
            || orientalEducation.chinese_ink?.description;
      } 
      
      // 화조화
      else if (artist.includes('huaniao') || artist.includes('화조') || artist.includes('flower') || artist.includes('bird')) {
        console.log('✅ MATCH: Chinese Huaniao (花鳥畫)');
        console.log('========================================');
        console.log('');
        return orientalEducation.chinese_huaniao?.description 
            || orientalEducation.chinese_default?.description;
      }
      
      // 수묵화
      else if (artist.includes('ink') || artist.includes('수묵') || artist.includes('wash')) {
        console.log('✅ MATCH: Chinese Ink Wash (水墨畫)');
        console.log('========================================');
        console.log('');
        return orientalEducation.chinese_ink?.description 
            || orientalEducation.chinese_default?.description;
      }
      
      // 기본값 (매칭 실패시)
      else {
        console.log('⚠️ DEFAULT: Chinese Traditional Painting (중국 전통 회화)');
        console.log('========================================');
        console.log('');
        return orientalEducation.chinese_default?.description;
      }
    }
    
    
    // ========== 일본 전통 회화 (1가지) ==========
    if (styleId === 'japanese') {
      console.log('🇯🇵 JAPANESE ART DETECTION:');
      console.log('✅ MATCH: Japanese Ukiyo-e (浮世繪)');
      console.log('========================================');
      console.log('');
      return orientalEducation.japanese_ukiyoe?.description 
          || orientalEducation.japanese_default?.description;
    }
    
    
    console.log('⚠️ NO MATCH - Returning null');
    console.log('========================================');
    console.log('');
    return null;
  };


  // ========== Fallback 메시지 ==========
  const getFallbackMessage = () => {
    return `이 작품은 ${selectedStyle.name} 스타일로 변환되었습니다.`;
  };


  // ========== 저장 ==========
  const handleDownload = async () => {
    try {
      const response = await fetch(resultImage);
      const blob = await response.blob();
      const fileName = `picoart-${selectedStyle.id}-${Date.now()}.jpg`;
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('저장에 실패했습니다.');
    }
  };


  // ========== 공유 (이미지 파일) ==========
  const handleShare = async () => {
    try {
      const response = await fetch(resultImage);
      const blob = await response.blob();
      const fileName = `picoart-${selectedStyle.id}-${Date.now()}.jpg`;
      const file = new File([blob], fileName, { type: 'image/jpeg' });
      
      // 이미지 파일 공유 시도
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'PicoArt 작품',
          text: `${selectedStyle.name} 스타일로 변환한 작품`,
        });
      } else if (navigator.share) {
        // 파일 공유 미지원 시 URL 공유
        await navigator.share({
          title: 'PicoArt - AI 예술 변환',
          text: `${selectedStyle.name}로 변환한 작품`,
          url: window.location.href
        });
      } else {
        navigator.clipboard.writeText(window.location.href);
        alert('링크가 클립보드에 복사되었습니다!');
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.log('Share failed:', error);
      }
    }
  };


  // ========== 스와이프 핸들러 (원클릭) ==========
  const handleTouchStart = (e) => {
    if (!isFullTransform || isRetrying) return;
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e) => {
    if (!isFullTransform || isRetrying || !touchStartX) return;
    const diffX = touchStartX - e.changedTouches[0].clientX;
    const diffY = touchStartY - e.changedTouches[0].clientY;
    
    // 수평 스와이프만 인식 (X축 이동이 Y축보다 커야 함)
    if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0 && currentIndex < results.length - 1) {
        setCurrentIndex(i => i + 1);  // 왼쪽 스와이프 → 다음
      }
      if (diffX < 0 && currentIndex > 0) {
        setCurrentIndex(i => i - 1);  // 오른쪽 스와이프 → 이전
      }
    }
    setTouchStartX(0);
    setTouchStartY(0);
  };


  // ========== Render ==========
  return (
    <div className="result-screen">
      <div 
        className="result-container"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        
        {/* Header */}
        <div className="result-header">
          <h1>✨ 완성!</h1>
          <p className="result-subtitle">
            {isFullTransform 
              ? `${selectedStyle.name} (${currentIndex + 1}/${fullTransformResults.length})`
              : `${selectedStyle.name} 스타일로 변환되었습니다`
            }
          </p>
        </div>

        {/* 원클릭: 이미지만 표시 */}
        {isFullTransform && (
          <div className="result-image-wrapper">
            <img src={displayImage} alt="변환 결과" className="result-image" />
          </div>
        )}

        {/* 단일 변환: Before/After Slider */}
        {!isFullTransform && (
          <div className="comparison-wrapper">
            <BeforeAfter 
              beforeImage={URL.createObjectURL(originalPhoto)}
              afterImage={displayImage}
            />
          </div>
        )}

        {/* Toggle Button */}
        <div className="info-toggle">
          <button 
            className="toggle-button"
            onClick={() => setShowInfo(!showInfo)}
          >
            {showInfo ? '🔽 작품 설명 숨기기' : '🔼 작품 설명 보기'}
          </button>
        </div>

        {/* Education Card */}
        {showInfo && (
          <div className="technique-card">
            
            {/* Card Header */}
            <div className="card-header">
              <div className="technique-icon">
                {isFullTransform ? (currentResult?.style?.icon || '🎨') : (selectedStyle.icon || '🎨')}
              </div>
              <div>
                <h2>{isFullTransform ? (currentResult?.style?.name || selectedStyle.name) : selectedStyle.name}</h2>
                <p className="technique-subtitle">
                  <span className="artist-name">
                    {/* 거장: 작품명 표시, 동양화: 기법명 통일, 그 외: 화가명 */}
                    {selectedStyle.category === 'masters' && displayWork
                      ? formatWorkName(displayWork)
                      : selectedStyle.category === 'oriental'
                        ? formatOrientalStyle(displayArtist)
                        : formatArtistName(displayArtist)
                    }
                  </span>
                  {selectedStyle.id === 'neoclassicism_vs_romanticism_vs_realism' && aiSelectedArtist && (() => {
                    const movement = getSpecificMovement(aiSelectedArtist);
                    return movement ? (
                      <span className={`style-badge ${movement.color}`}>
                        {movement.text}
                      </span>
                    ) : null;
                  })()}
                  {selectedStyle.id === 'modernism' && aiSelectedArtist && (() => {
                    const movement = getModernismMovement(aiSelectedArtist);
                    return movement ? (
                      <span className={`style-badge ${movement.color}`}>
                        {movement.text}
                      </span>
                    ) : null;
                  })()}
                </p>
              </div>
            </div>

            {/* Card Content */}
            <div className="card-content">
              {(() => {
                console.log('');
                console.log('🖼️ RENDERING EDUCATION CONTENT:');
                console.log('   - isLoadingEducation:', isLoadingEducation);
                console.log('   - educationText:', educationText);
                console.log('   - educationText length:', educationText?.length);
                console.log('');
                return null;
              })()}
              {isLoadingEducation ? (
                <div className="loading-education">
                  <div className="spinner"></div>
                  <p>작품 설명을 생성하고 있습니다...</p>
                </div>
              ) : (
                <div className="technique-explanation">
                  <h3>🖌️ 적용된 예술 기법</h3>
                  {educationText.split('\n\n').map((paragraph, index) => (
                    paragraph.trim() && (
                      <p key={index}>
                        {paragraph.trim().split('\n').map((line, lineIndex) => (
                          <React.Fragment key={lineIndex}>
                            {line}
                            {lineIndex < paragraph.trim().split('\n').length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </p>
                    )
                  ))}
                </div>
              )}
            </div>
            
          </div>
        )}

        {/* 원클릭 네비게이션 (교육자료 하단) */}
        {isFullTransform && (
          <div className="fullTransform-nav">
            <button 
              onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
              disabled={currentIndex === 0 || isRetrying}
              className="nav-btn"
            >
              ◀ 이전
            </button>
            <div className="nav-dots">
              {fullTransformResults.map((_, idx) => (
                <button
                  key={idx}
                  className={`nav-dot ${idx === currentIndex ? 'active' : ''} ${isRetrying ? 'disabled' : ''}`}
                  onClick={() => !isRetrying && setCurrentIndex(idx)}
                  disabled={isRetrying}
                />
              ))}
            </div>
            <button 
              onClick={() => setCurrentIndex(i => Math.min(fullTransformResults.length - 1, i + 1))}
              disabled={currentIndex === fullTransformResults.length - 1 || isRetrying}
              className="nav-btn"
            >
              다음 ▶
            </button>
          </div>
        )}

        {/* 재시도 버튼 (현재 보고 있는 결과가 실패한 경우 또는 재시도 중일 때 표시) */}
        {isFullTransform && (isRetrying || (currentResult && !currentResult.success)) && (
          <div className="retry-section">
            {isRetrying ? (
              <div className="retry-in-progress">
                <div className="retry-status">
                  <div className="spinner-medium"></div>
                  <p className="retry-text">{retryProgress}</p>
                </div>
                <div className="retry-education">
                  <p>🎨 잠시만 기다려주세요. AI가 다시 변환 중입니다...</p>
                </div>
              </div>
            ) : (
              <div className="retry-prompt">
                <p className="fail-message">변환에 실패하였습니다. 재시도 하세요.</p>
                <button 
                  className="btn btn-retry"
                  onClick={() => handleRetrySingle(currentIndex)}
                >
                  <span className="btn-icon">🔄</span>
                  재시도
                </button>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="action-buttons">
          <button 
            className="btn btn-gallery" 
            onClick={onGallery}
          >
            <span className="btn-icon">🖼️</span>
            갤러리
          </button>
          
          <button 
            className="btn btn-share" 
            onClick={handleShare}
          >
            <span className="btn-icon">📤</span>
            공유
          </button>
          
          <button 
            className="btn btn-reset" 
            onClick={onReset}
          >
            <span className="btn-icon">🔄</span>
            다시 만들기
          </button>
        </div>
        
      </div>

      {/* Styles */}
      <style>{`
        .result-screen {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .result-container {
          max-width: 900px;
          width: 100%;
        }

        .result-header {
          text-align: center;
          color: white;
          margin-bottom: 2rem;
        }

        .result-header h1 {
          font-size: 2.5rem;
          margin: 0 0 0.5rem 0;
        }

        .result-subtitle {
          font-size: 1.1rem;
          opacity: 0.95;
          margin: 0;
        }

        .comparison-wrapper {
          background: white;
          padding: 1.5rem;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          margin-bottom: 1.5rem;
        }

        .info-toggle {
          text-align: center;
          margin-bottom: 1rem;
        }

        .toggle-button {
          background: rgba(255,255,255,0.2);
          border: 2px solid white;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          backdrop-filter: blur(10px);
        }

        .toggle-button:hover {
          background: white;
          color: #667eea;
        }

        .technique-card {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          margin-bottom: 1.5rem;
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .card-header {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding-bottom: 1.5rem;
          border-bottom: 2px solid #e0e0e0;
          margin-bottom: 1.5rem;
        }

        .technique-icon {
          font-size: 3.5rem;
          min-width: 3.5rem;
          flex-shrink: 0;
          filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.2));
        }

        .card-header h2 {
          margin: 0;
          color: #333;
          font-size: 1.75rem;
          line-height: 1.2;
        }

        .technique-subtitle {
          color: #666;
          font-size: 1.05rem;
          margin: 0.25rem 0 0 0;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .artist-name {
          font-weight: 600;
          color: #222;
          font-size: 1.1rem;
        }

        .style-badge {
          display: inline-block;
          padding: 0.4rem 1rem;
          color: white;
          border-radius: 6px;
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          vertical-align: middle;
          transform: translateY(-1px);
        }

        .style-badge.neoclassical {
          background: #2E86AB;
        }

        .style-badge.romantic {
          background: #A23B72;
        }

        .style-badge.realist {
          background: #C77B58;
        }

        .style-badge.cubism {
          background: #5D5D5D;
        }

        .style-badge.surrealism {
          background: #9B59B6;
        }

        .style-badge.popart {
          background: #E74C3C;
        }

        .movement-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          box-shadow: 0 2px 4px rgba(102, 126, 234, 0.3);
        }

        .loading-education {
          text-align: center;
          padding: 3rem 2rem;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem auto;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .loading-education p {
          color: #666;
          font-size: 1rem;
        }

        .technique-explanation {
          background: linear-gradient(135deg, #fff5f5 0%, #ffe5e5 100%);
          padding: 1.5rem;
          border-radius: 12px;
          border-left: 4px solid #667eea;
        }

        .technique-explanation h3 {
          color: #667eea;
          font-size: 1.1rem;
          margin: 0 0 1rem 0;
        }

        .technique-explanation p {
          color: #333;
          line-height: 1.8;
          font-size: 1rem;
          margin: 0 0 1.26em 0;  /* 0.7줄 간격 = line-height(1.8) × 0.7 */
        }
        
        .technique-explanation p:last-child {
          margin-bottom: 0;
        }

        .action-buttons {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
        }

        .btn {
          padding: 1rem 1.5rem;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .btn-icon {
          font-size: 1.2rem;
        }

        .btn-gallery {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-gallery:hover {
          background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(118, 75, 162, 0.4);
        }

        .btn-share {
          background: #3b82f6;
          color: white;
        }

        .btn-share:hover {
          background: #2563eb;
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);
        }

        .btn-reset {
          background: white;
          color: #667eea;
          border: 2px solid #667eea;
        }

        .btn-reset:hover {
          background: #667eea;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
        }

        /* 재시도 섹션 */
        .retry-section {
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .retry-prompt {
          background: rgba(239, 68, 68, 0.1);
          border: 2px solid rgba(239, 68, 68, 0.3);
          border-radius: 16px;
          padding: 1.5rem;
        }

        .fail-message {
          color: #fca5a5;
          font-size: 1rem;
          margin-bottom: 1rem;
        }

        .btn-retry {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .btn-retry:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(245, 158, 11, 0.3);
        }

        .retry-in-progress {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 2rem;
        }

        .retry-status {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .retry-text {
          color: white;
          font-size: 1.1rem;
          font-weight: 500;
        }

        .retry-education {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 1rem;
        }

        .retry-education p {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.95rem;
          margin: 0;
        }

        .spinner-medium {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .spinner-small {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .result-screen {
            padding: 1rem;
          }

          .result-header h1 {
            font-size: 2rem;
          }

          .result-subtitle {
            font-size: 0.95rem;
          }

          .comparison-wrapper {
            padding: 1rem;
          }

          .technique-card {
            padding: 1.5rem;
          }

          .technique-icon {
            font-size: 2.5rem;
            min-width: 2.5rem;
          }

          .card-header h2 {
            font-size: 1.5rem;
          }

          .action-buttons {
            grid-template-columns: 1fr;
          }
        }

        /* 원클릭 네비게이션 */
        .fullTransform-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 16px;
        }
        .nav-btn {
          padding: 8px 16px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          cursor: pointer;
        }
        .nav-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        .nav-dots {
          display: flex;
          gap: 6px;
        }
        .nav-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: none;
          background: #ddd;
          cursor: pointer;
          padding: 0;
        }
        .nav-dot.active {
          background: #667eea;
          transform: scale(1.3);
        }
        
        /* 원클릭 이미지 */
        .result-image-wrapper {
          margin-bottom: 16px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .result-image {
          width: 100%;
          display: block;
        }
      `}</style>
    </div>
  );
};

export default ResultScreen;
