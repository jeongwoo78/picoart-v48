// PicoArt v76 - ProcessingScreen (단일변환 반복 = 원클릭)
// 원칙: 단일 변환 로직만 있고, 원클릭은 그걸 N번 반복
import React, { useEffect, useState } from 'react';
import { processStyleTransfer } from '../utils/styleTransferAPI';
import { educationContent } from '../data/educationContent';
// 원클릭 교육자료 (분리된 파일)
import { oneclickMovementsPrimary, oneclickMovementsSecondary } from '../data/oneclickMovementsEducation';
import { oneclickMastersPrimary, oneclickMastersSecondary } from '../data/oneclickMastersEducation';
import { oneclickOrientalPrimary, oneclickOrientalSecondary } from '../data/oneclickOrientalEducation';

const ProcessingScreen = ({ photo, selectedStyle, onComplete }) => {
  const [statusText, setStatusText] = useState('준비 중...');
  const [showEducation, setShowEducation] = useState(false);
  
  // 원클릭 상태
  const [completedResults, setCompletedResults] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [viewIndex, setViewIndex] = useState(-1);
  const [touchStartX, setTouchStartX] = useState(0);
  
  // 원클릭 여부
  const isFullTransform = selectedStyle?.isFullTransform === true;
  const category = selectedStyle?.category;
  
  // 원클릭 시 전달받은 스타일 배열 사용 (styleData import 불필요!)
  const styles = isFullTransform ? (selectedStyle?.styles || []) : [];
  const totalCount = styles.length;

  useEffect(() => {
    startProcess();
  }, []);

  // ========== 메인 프로세스 ==========
  const startProcess = async () => {
    if (isFullTransform) {
      // 원클릭: 1차 교육 표시 후 순차 변환 (단일 변환 반복!)
      setShowEducation(true);
      setStatusText(`${totalCount}개 스타일 변환을 시작합니다...`);
      await sleep(1500);
      
      const results = [];
      for (let i = 0; i < styles.length; i++) {
        const style = styles[i]; // 공통 데이터에서 가져온 스타일 (category 포함)
        setStatusText(`[${i + 1}/${totalCount}] ${style.name} 변환 중...`);
        
        // 단일 변환과 동일하게 호출!
        const result = await processSingleStyle(style, i, totalCount);
        results.push(result);
        setCompletedCount(i + 1);
        setCompletedResults([...results]);
      }
      
      const successCount = results.filter(r => r.success).length;
      setStatusText(`완료! ${successCount}/${totalCount}개 변환 성공`);
      await sleep(1000);
      
      onComplete(selectedStyle, results, { isFullTransform: true, category, results });
    } else {
      // 단일 변환
      setShowEducation(true);
      const eduContent = getEducationContent(selectedStyle);
      if (eduContent) {
        setStatusText(`${eduContent.title} 스타일 분석 중...`);
      }
      await sleep(1000);
      
      const result = await processSingleStyle(selectedStyle);
      
      if (result.success) {
        setStatusText(`${result.aiSelectedArtist || selectedStyle.name} 화풍으로 변환 완료!`);
        await sleep(1000);
        onComplete(selectedStyle, result.resultUrl, result);
      } else {
        setStatusText(`오류: ${result.error}`);
      }
    }
  };

  // ========== 단일 스타일 변환 (핵심 함수 - 원클릭도 이거 사용) ==========
  const processSingleStyle = async (style, index = 0, total = 1) => {
    try {
      const result = await processStyleTransfer(
        photo,
        style, // category 포함된 스타일 객체 그대로 전달
        null,
        (progressText) => {
          if (total > 1) {
            setStatusText(`[${index + 1}/${total}] ${progressText}`);
          } else {
            setStatusText(progressText);
          }
        }
      );

      if (result.success) {
        return {
          style,
          resultUrl: result.resultUrl,
          aiSelectedArtist: result.aiSelectedArtist,
          selected_work: result.selected_work,  // 거장 모드: 선택된 작품
          success: true
        };
      } else {
        return { style, error: result.error, success: false };
      }
    } catch (err) {
      return { style, error: err.message, success: false };
    }
  };

  // ========== 교육자료 ==========
  
  // 단일 변환용 1차 교육
  const getEducationContent = (style) => {
    const cat = style.category;
    if (cat === 'movements') return educationContent.movements[style.id];
    if (cat === 'masters') return educationContent.masters[style.id];
    if (cat === 'oriental') return educationContent.oriental[style.id];
    return null;
  };

  // 원클릭 1차 교육 (분리된 파일에서 가져오기)
  const getPrimaryEducation = () => {
    console.log('🎓 getPrimaryEducation called, category:', category);
    
    if (category === 'movements') {
      console.log('🎓 Using oneclickMovementsPrimary');
      return oneclickMovementsPrimary;
    } else if (category === 'masters') {
      console.log('🎓 Using oneclickMastersPrimary');
      return oneclickMastersPrimary;
    } else if (category === 'oriental') {
      console.log('🎓 Using oneclickOrientalPrimary');
      return oneclickOrientalPrimary;
    }
    return null;
  };

  // 원클릭 2차 교육 (결과별) - 카테고리에 따라 분리된 파일 사용
  const getSecondaryEducation = (result) => {
    if (!result) return null;
    
    const artistName = result.aiSelectedArtist || '';
    const workName = result.selected_work || '';
    const resultCategory = result.style?.category;
    const styleId = result.style?.id;
    
    // 카테고리별 교육자료 선택
    let educationData = null;
    if (resultCategory === 'masters') {
      educationData = oneclickMastersSecondary;
    } else if (resultCategory === 'movements') {
      educationData = oneclickMovementsSecondary;
    } else if (resultCategory === 'oriental') {
      educationData = oneclickOrientalSecondary;
    }
    
    if (!educationData) return null;
    
    // 1. 화가명/작품명으로 찾기
    const key = artistNameToKey(artistName, workName, resultCategory, educationData);
    if (key && educationData[key]) {
      const edu = educationData[key];
      return { name: edu.name || artistName, content: edu.content };
    }
    
    // 2. styleId로 찾기
    if (styleId && educationData[styleId]) {
      const edu = educationData[styleId];
      return { name: edu.name || result.style.name, content: edu.content };
    }
    
    return null;
  };

  // 화가명/작품명 → 교육자료 키 변환
  const artistNameToKey = (artistName, workName, resultCategory, educationData) => {
    if (!artistName && !workName) return null;
    
    // 거장: 작품명 기반 매칭
    if (resultCategory === 'masters' && workName) {
      const mastersWorkKeyMap = {
        'The Starry Night': 'gogh-starrynight',
        'Starry Night': 'gogh-starrynight',
        'Sunflowers': 'gogh-sunflowers',
        'Self-Portrait': 'gogh-selfportrait',
        'The Kiss': 'klimt-kiss',
        'The Tree of Life': 'klimt-treeoflife',
        'Judith': 'klimt-judith',
        'Judith I': 'klimt-judith',
        'The Scream': 'munch-scream',
        'Madonna': 'munch-madonna',
        'The Dance': 'matisse-dance',
        'The Red Room': 'matisse-redroom',
        'Woman with a Hat': 'matisse-womanwithhat',
        'Guernica': 'picasso-guernica',
        'Weeping Woman': 'picasso-weepingwoman',
        'Les Demoiselles d\'Avignon': 'picasso-demoiselles',
        'Me and My Parrots': 'frida-parrots',
        'The Broken Column': 'frida-brokencolumn',
        'Self-Portrait with Thorn Necklace': 'frida-thornnecklace',
        'Self-Portrait with Monkeys': 'frida-monkeys',
        'Marilyn Monroe': 'warhol-marilyn',
        'Marilyn': 'warhol-marilyn',
        'Campbell\'s Soup Cans': 'warhol-soup',
      };
      if (mastersWorkKeyMap[workName]) {
        return mastersWorkKeyMap[workName];
      }
    }
    
    // 동양화: API 반환값 → 교육자료 키 매핑
    if (resultCategory === 'oriental' && artistName) {
      const orientalKeyMap = {
        // 한국
        '한국 전통화': 'korean-genre',  // fallback 기본값
        'Korean Minhwa': 'korean-minhwa',
        'Korean Pungsokdo': 'korean-genre',
        'Korean Jingyeong Landscape': 'korean-jingyeong',
        'Korean Jingyeong': 'korean-jingyeong',
        '한국 민화': 'korean-minhwa',
        '한국 풍속화': 'korean-genre',
        '한국 진경산수': 'korean-jingyeong',
        // 중국
        'Chinese Ink Wash': 'chinese-ink',
        'Chinese Gongbi': 'chinese-gongbi',
        'Chinese Huaniao': 'chinese-gongbi',
        '중국 수묵산수': 'chinese-ink',
        '중국 공필화': 'chinese-gongbi',
        // 일본
        '일본 우키요에': 'japanese-ukiyoe',
        'Japanese Ukiyo-e': 'japanese-ukiyoe',
        'Ukiyo-e': 'japanese-ukiyoe',
      };
      if (orientalKeyMap[artistName]) {
        return orientalKeyMap[artistName];
      }
    }
    
    // 미술사조: API 반환값 → 교육자료 키 매핑
    if (resultCategory === 'movements' && artistName) {
      const movementsKeyMap = {
        // 고대
        'Classical Sculpture': 'ancient-greek-sculpture',
        'Greek Sculpture': 'ancient-greek-sculpture',
        'Roman Mosaic': 'roman-mosaic',
        // 중세
        'Byzantine': 'byzantine',
        'Byzantine Mosaic': 'byzantine',
        'Gothic': 'gothic',
        'Gothic Stained Glass': 'gothic',
        'Islamic Miniature': 'islamic-miniature',
        'Islamic Geometry': 'islamic-miniature',
        // 르네상스
        'Leonardo da Vinci': 'leonardo',
        'LEONARDO': 'leonardo',
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
      if (movementsKeyMap[artistName]) {
        return movementsKeyMap[artistName];
      }
    }
    
    // Fallback: 성(lastName)으로 매칭
    if (artistName) {
      const words = artistName.split(/[\s-]+/);
      const lastName = words[words.length - 1]?.toLowerCase();
      if (lastName && educationData[lastName]) {
        return lastName;
      }
    }
    
    return null;
  };

  // ========== UI 핸들러 ==========
  const handleDotClick = (idx) => {
    if (idx < completedCount) setViewIndex(idx);
  };
  
  const handleBackToEducation = () => setViewIndex(-1);

  const handleTouchStart = (e) => {
    if (!isFullTransform) return;
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!isFullTransform || !touchStartX) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && viewIndex < completedCount - 1) setViewIndex(v => v + 1);
      if (diff < 0 && viewIndex > -1) setViewIndex(v => v - 1);
    }
    setTouchStartX(0);
  };

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  // 현재 보여줄 결과
  const previewResult = viewIndex >= 0 ? completedResults[viewIndex] : null;
  const previewEdu = previewResult ? getSecondaryEducation(previewResult) : null;

  return (
    <div className="processing-screen">
      <div 
        className="processing-content"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* 헤더 */}
        <div className="header">
          <h2>{isFullTransform ? '✨ 전체 변환' : '🎨 변환 중'}</h2>
          {isFullTransform && viewIndex >= 0 && (
            <button className="back-btn" onClick={handleBackToEducation}>← 교육자료</button>
          )}
        </div>

        {/* 상태 */}
        <div className="status">
          <div className="spinner"></div>
          <p>{statusText}</p>
        </div>

        {/* ===== 원클릭 모드 ===== */}
        {isFullTransform && (
          <>
            {/* 1차 교육 */}
            {viewIndex === -1 && showEducation && getPrimaryEducation() && (
              <div className="edu-card primary">
                <p>{getPrimaryEducation().content}</p>
                {completedCount > 0 && <p className="hint">👆 완료된 결과를 확인하세요</p>}
              </div>
            )}

            {/* 결과 미리보기 */}
            {viewIndex >= 0 && previewResult && (
              <div className="preview">
                <div className="preview-header">{previewResult.style.name}</div>
                <img src={previewResult.resultUrl} alt="" />
                {previewResult.aiSelectedArtist && (
                  <div className="ai-info">🤖 {previewResult.aiSelectedArtist}</div>
                )}
                {previewEdu && (
                  <div className="edu-card secondary">
                    <h4>{previewEdu.name}</h4>
                    <p>{previewEdu.content}</p>
                  </div>
                )}
              </div>
            )}

            {/* 점 네비게이션 + 이전/다음 버튼 */}
            <div className="dots-nav">
              <button 
                className="nav-btn"
                onClick={() => {
                  if (viewIndex === -1 && completedCount > 0) {
                    setViewIndex(completedCount - 1);
                  } else if (viewIndex > 0) {
                    setViewIndex(viewIndex - 1);
                  } else if (viewIndex === 0) {
                    setViewIndex(-1);
                  }
                }}
                disabled={viewIndex === -1 && completedCount === 0}
              >
                ◀ 이전
              </button>
              
              <div className="dots">
                <button className={`dot edu ${viewIndex === -1 ? 'active' : ''}`} onClick={handleBackToEducation}>📚</button>
                {styles.map((_, idx) => (
                  <button 
                    key={idx}
                    className={`dot ${idx < completedCount ? 'done' : ''} ${viewIndex === idx ? 'active' : ''}`}
                    onClick={() => handleDotClick(idx)}
                    disabled={idx >= completedCount}
                  />
                ))}
                <span className="count">{completedCount}/{totalCount}</span>
              </div>
              
              <button 
                className="nav-btn"
                onClick={() => {
                  if (viewIndex === -1 && completedCount > 0) {
                    setViewIndex(0);
                  } else if (viewIndex >= 0 && viewIndex < completedCount - 1) {
                    setViewIndex(viewIndex + 1);
                  }
                }}
                disabled={viewIndex >= completedCount - 1 || completedCount === 0}
              >
                다음 ▶
              </button>
            </div>
          </>
        )}

        {/* ===== 단일 변환 모드 ===== */}
        {!isFullTransform && showEducation && getEducationContent(selectedStyle) && (
          <div className="edu-card primary">
            <h3>{getEducationContent(selectedStyle).title}</h3>
            <p>{getEducationContent(selectedStyle).desc}</p>
          </div>
        )}
      </div>

      <style>{`
        .processing-screen {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .processing-content {
          background: white;
          padding: 24px;
          border-radius: 16px;
          max-width: 500px;
          width: 100%;
          max-height: 85vh;
          overflow-y: auto;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .header h2 { margin: 0; font-size: 18px; color: #333; }
        .back-btn {
          padding: 6px 12px;
          background: #f0f0f0;
          border: none;
          border-radius: 6px;
          font-size: 13px;
          cursor: pointer;
        }
        .status {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin: 16px 0;
        }
        .status p { margin: 0; color: #666; font-size: 14px; }
        .spinner {
          width: 20px; height: 20px;
          border: 2px solid #f3f3f3;
          border-top: 2px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        
        .edu-card {
          padding: 16px;
          border-radius: 10px;
          margin: 16px 0;
        }
        .edu-card.primary {
          background: linear-gradient(135deg, #fff5f5, #ffe5e5);
          border-left: 3px solid #667eea;
        }
        .edu-card.secondary {
          background: linear-gradient(135deg, #f0fff0, #e5ffe5);
          border-left: 3px solid #4CAF50;
        }
        .edu-card h3 { color: #667eea; margin: 0 0 10px; font-size: 15px; }
        .edu-card h4 { color: #4CAF50; margin: 0 0 8px; font-size: 14px; }
        .edu-card p { color: #333; line-height: 1.6; font-size: 13px; margin: 0; white-space: pre-line; }
        .hint { color: #999; font-size: 12px; text-align: center; margin-top: 12px !important; }
        
        .preview { background: #f8f9fa; border-radius: 10px; overflow: hidden; margin: 16px 0; }
        .preview-header { background: #667eea; color: white; padding: 10px; font-size: 14px; font-weight: 600; }
        .preview img { width: 100%; display: block; }
        .ai-info { padding: 8px 12px; background: #e9ecef; font-size: 12px; color: #666; }
        
        .dots-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-top: 16px;
        }
        .dots-nav .nav-btn {
          padding: 8px 14px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 13px;
          cursor: pointer;
        }
        .dots-nav .nav-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        .dots {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          flex-wrap: wrap;
        }
        .dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          border: none;
          background: #ddd;
          cursor: pointer;
          padding: 0;
        }
        .dot.done { background: #4CAF50; }
        .dot.active { transform: scale(1.4); box-shadow: 0 0 0 2px rgba(102,126,234,0.4); }
        .dot:disabled { opacity: 0.4; cursor: default; }
        .dot.edu {
          width: auto; padding: 4px 8px;
          border-radius: 10px;
          font-size: 12px;
          background: #667eea;
        }
        .count { font-size: 12px; color: #999; margin-left: 8px; }
      `}</style>
    </div>
  );
};

export default ProcessingScreen;
