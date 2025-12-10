// PicoArt v51 - StyleSelection (미술사조 11개, 작은 카드 디자인)
import React, { useState } from 'react';
import { educationContent } from '../data/educationContent';

const StyleSelection = ({ onSelect }) => {
  const [mainCategory, setMainCategory] = useState('movements'); // movements, masters, oriental
  const [subCategory, setSubCategory] = useState(null);

  // 스타일 카테고리 정의 (v51: 11개 사조)
  const styleCategories = {
    // 미술사조 11개
    ancient: { name: '그리스·로마', period: 'BC 800 - AD 500' },
    medieval: { name: '중세 미술', period: '4-14세기' },
    renaissance: { name: '르네상스', period: '14-16세기' },
    baroque: { name: '바로크', period: '17세기' },
    rococo: { name: '로코코', period: '18세기' },
    neoclassicism_vs_romanticism_vs_realism: { name: '신고전주의 vs 낭만주의 vs 사실주의', period: '1770-1870' },
    impressionism: { name: '인상주의', period: '1860-1890' },
    postImpressionism: { name: '후기인상주의', period: '1880-1910' },
    fauvism: { name: '야수파', period: '1905-1908' },
    expressionism: { name: '표현주의', period: '1905-1920' },
    modernism: { name: '20세기 모더니즘', period: '1907-1970' },
    
    // 거장 (대 카테고리와 소 카테고리 이름 통일)
    masters: { name: '거장', period: '시대를 초월한 거장들' },
    
    // 동양화 (대 카테고리와 소 카테고리 이름 통일)
    oriental: { name: '동양화', period: '한·중·일 전통' }
  };

  // 스타일 데이터 (AI가 자동 선택하므로 최소 정보만) - v51: 11개 사조
  const artStyles = [
    // 미술사조 11개 (시간순)
    { id: 'ancient', name: '그리스·로마', category: 'ancient', icon: '🏛️', description: '완벽한 비례와 균형미' },
    { id: 'medieval', name: '중세 미술', category: 'medieval', icon: '⛪', description: '비잔틴·고딕·이슬람의 신성함' },
    { id: 'renaissance', name: '르네상스', category: 'renaissance', icon: '🎭', description: '인간 중심의 이상적 아름다움' },
    { id: 'baroque', name: '바로크', category: 'baroque', icon: '👑', description: '극적이고 웅장한 표현' },
    { id: 'rococo', name: '로코코', category: 'rococo', icon: '🌸', description: '우아하고 장식적인 취향' },
    { id: 'neoclassicism_vs_romanticism_vs_realism', name: '신고전주의 vs 낭만주의 vs 사실주의', category: 'neoclassicism_vs_romanticism_vs_realism', icon: '⚖️', description: '이성 vs 감성 vs 현실' },
    { id: 'impressionism', name: '인상주의', category: 'impressionism', icon: '🌅', description: '빛의 순간을 포착' },
    { id: 'postImpressionism', name: '후기인상주의', category: 'postImpressionism', icon: '🌻', description: '감정과 구조의 탐구' },
    { id: 'fauvism', name: '야수파', category: 'fauvism', icon: '🎨', description: '순수 색채의 해방' },
    { id: 'expressionism', name: '표현주의', category: 'expressionism', icon: '😱', description: '내면의 불안과 고독' },
    { id: 'modernism', name: '20세기 모더니즘', category: 'modernism', icon: '🔮', description: '입체·초현실·팝아트' },
    
    // 거장 7명 (시간순: 출생연도)
    { id: 'vangogh-master', name: '빈센트 반 고흐', nameEn: 'Vincent van Gogh', category: 'masters', icon: '🌻', description: '1853-1890 | 후기인상주의' },
    { id: 'klimt-master', name: '구스타프 클림트', nameEn: 'Gustav Klimt', category: 'masters', icon: '✨', description: '1862-1918 | 아르누보' },
    { id: 'munch-master', name: '에드바르 뭉크', nameEn: 'Edvard Munch', category: 'masters', icon: '😱', description: '1863-1944 | 표현주의' },
    { id: 'matisse-master', name: '앙리 마티스', nameEn: 'Henri Matisse', category: 'masters', icon: '🎭', description: '1869-1954 | 야수파' },
    { id: 'picasso-master', name: '파블로 피카소', nameEn: 'Pablo Picasso', category: 'masters', icon: '🎨', description: '1881-1973 | 입체주의' },
    { id: 'frida-master', name: '프리다 칼로', nameEn: 'Frida Kahlo', category: 'masters', icon: '🌺', description: '1907-1954 | 초현실주의' },
    { id: 'warhol-master', name: '앤디 워홀', nameEn: 'Andy Warhol', category: 'masters', icon: '🥫', description: '1928-1987 | 팝아트' },
    
    // 동양화
    { id: 'korean', name: '한국 전통 회화', nameEn: 'Korean Art', category: 'oriental', icon: '🎎', description: '여백의 미와 절제미' },
    { id: 'chinese', name: '중국 전통 회화', nameEn: 'Chinese Art', category: 'oriental', icon: '🐉', description: '기운생동의 수묵화' },
    { id: 'japanese', name: '일본 전통 회화', nameEn: 'Japanese Art', category: 'oriental', icon: '🗾', description: '섬세한 관찰과 대담한 생략' }
  ];

  // 대 카테고리 정의 (v51: 11개 사조)
  const mainCategories = {
    movements: {
      name: '미술사조',
      icon: '🎨',
      description: '서양 미술의 흐름',
      subcategories: ['ancient', 'medieval', 'renaissance', 'baroque', 'rococo', 'neoclassicism_vs_romanticism_vs_realism', 'impressionism', 'postImpressionism', 'fauvism', 'expressionism', 'modernism']
    },
    masters: {
      name: '거장 컬렉션',
      icon: '⭐',
      description: '시대를 대표하는 거장들',
      subcategories: ['masters']
    },
    oriental: {
      name: '동양화',
      icon: '🎎',
      description: '한·중·일 전통 미술',
      subcategories: ['oriental']
    }
  };

  // 카테고리별로 스타일 그룹화
  const groupedStyles = {};
  Object.keys(styleCategories).forEach(key => {
    groupedStyles[key] = {
      category: styleCategories[key],
      styles: artStyles.filter(style => style.category === key)
    };
  });

  // 현재 대 카테고리의 소 카테고리들
  const currentSubcategories = mainCategories[mainCategory].subcategories;

  // 소 카테고리별 스타일 수 계산
  const getCategoryCount = (categoryKey) => {
    return groupedStyles[categoryKey]?.styles.length || 0;
  };

  // 대 카테고리 변경 시 첫 번째 소 카테고리로 설정
  const handleMainCategoryChange = (newMainCategory) => {
    setMainCategory(newMainCategory);
    setSubCategory(mainCategories[newMainCategory].subcategories[0]);
  };

  // 미술사조 탭 클릭 시 바로 선택 처리
  const handleSubCategoryClick = (categoryKey) => {
    setSubCategory(categoryKey);
    
    // 미술사조(movements)인 경우 바로 선택
    if (mainCategory === 'movements') {
      const categoryStyles = groupedStyles[categoryKey]?.styles || [];
      if (categoryStyles.length > 0) {
        // 해당 카테고리의 첫 번째 스타일을 대표로 선택
        onSelect(categoryStyles[0]);
      }
    }
  };

  return (
    <div className="style-selection">
      <div className="selection-container">
        <div className="selection-header">
          <h1>🎨 화풍 선택</h1>
          <p className="header-subtitle">
            총 {artStyles.length}개의 화가와 스타일
          </p>
        </div>

        {/* 1단계: 대 카테고리 선택 */}
        <div className="main-category-nav">
          <div className="main-category-tabs">
            {Object.entries(mainCategories).map(([key, category]) => (
              <button
                key={key}
                className={`main-category-tab ${mainCategory === key ? 'active' : ''}`}
                onClick={() => handleMainCategoryChange(key)}
              >
                <span className="tab-icon">{category.icon}</span>
                <span className="tab-name">{category.name}</span>
                <span className="tab-desc">{category.description}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2단계: 소 카테고리 선택 (탭) - 미술사조만 표시 */}
        {mainCategory === 'movements' && (
        <>
          <div className="styles-section">
            <div className="section-header">
              <h2>미술사조</h2>
              <p className="section-period">서양 미술의 흐름</p>
            </div>
            
            {/* 전체 변환 버튼 */}
            <button 
              className="full-transform-btn"
              onClick={() => onSelect({ 
                id: 'movements-all', 
                name: '미술사조 전체 변환',
                category: 'movements',
                isFullTransform: true,
                count: 11
              })}
            >
              <span className="full-transform-icon">✨</span>
              <div className="full-transform-content">
                <span className="full-transform-title">전체 변환</span>
                <span className="full-transform-desc">당신의 사진 한 장이 2,500년 서양 미술을 관통합니다</span>
              </div>
            </button>
            
            <div className="sub-category-tabs">
              {currentSubcategories.map(key => {
                const category = styleCategories[key];
                const styleData = artStyles.find(s => s.id === key || s.category === key);
                if (!category) {
                  console.error(`Category not found: ${key}`);
                  return null;
                }
                return (
                  <button
                    key={key}
                    className={`sub-category-tab ${subCategory === key ? 'active' : ''}`}
                    onClick={() => handleSubCategoryClick(key)}
                  >
                    {styleData?.icon && <span className="tab-icon">{styleData.icon}</span>}
                    <span className="tab-name">{category.name}</span>
                    <span className="tab-period">{category.period}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
        )}

        {/* 3단계: 개별 화가/스타일 선택 (거장과 동양화만 표시) */}
        {mainCategory !== 'movements' && (
          <div className="styles-section">
            {groupedStyles[subCategory] && (
              <>
                <div className="section-header">
                  <h2>{groupedStyles[subCategory].category.name}</h2>
                  <p className="section-period">
                    {groupedStyles[subCategory].category.period}
                  </p>
                </div>

                {/* 전체 변환 버튼 - 거장 */}
                {mainCategory === 'masters' && (
                  <button 
                    className="full-transform-btn"
                    onClick={() => onSelect({ 
                      id: 'masters-all', 
                      name: '거장 전체 변환',
                      category: 'masters',
                      isFullTransform: true,
                      count: 7
                    })}
                  >
                    <span className="full-transform-icon">✨</span>
                    <div className="full-transform-content">
                      <span className="full-transform-title">전체 변환</span>
                      <span className="full-transform-desc">당신의 사진 한 장이 일곱 거장의 세계를 만납니다</span>
                    </div>
                  </button>
                )}

                {/* 전체 변환 버튼 - 동양화 */}
                {mainCategory === 'oriental' && (
                  <button 
                    className="full-transform-btn"
                    onClick={() => onSelect({ 
                      id: 'oriental-all', 
                      name: '동양화 전체 변환',
                      category: 'oriental',
                      isFullTransform: true,
                      count: 6
                    })}
                  >
                    <span className="full-transform-icon">✨</span>
                    <div className="full-transform-content">
                      <span className="full-transform-title">전체 변환</span>
                      <span className="full-transform-desc">당신의 사진 한 장이 천 년의 동양 미학을 만납니다</span>
                    </div>
                  </button>
                )}

                <div className="styles-grid">
                  {groupedStyles[subCategory].styles.map(style => (
                    <button
                      key={style.id}
                      className="style-card"
                      onClick={() => onSelect(style)}
                    >
                    <div className="card-icon">{style.icon}</div>
                    
                    <div className="card-content">
                      <div className="card-header">
                        <h3>{style.name}</h3>
                        <p className="card-english">{style.nameEn}</p>
                      </div>

                      {style.artist && (
                        <div className="artist-info">
                          <span className="artist-name">
                            {style.artist.name}
                          </span>
                          {style.artist.lifespan && (
                            <span className="artist-lifespan">
                              {style.artist.lifespan}
                            </span>
                          )}
                        </div>
                      )}

                      <p className="card-description">{style.description}</p>

                      {style.model && (
                        <div className="model-badge">
                          {style.model === 'FLUX' ? '⚡ FLUX' : '🚀 SDXL'}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        )}
      </div>

      <style>{`
        .style-selection {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 2rem;
        }

        .selection-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .selection-header {
          text-align: center;
          color: white;
          margin-bottom: 2rem;
        }

        .selection-header h1 {
          font-size: 2.5rem;
          margin: 0 0 0.5rem 0;
        }

        .header-subtitle {
          font-size: 1.1rem;
          opacity: 0.95;
          margin: 0;
        }

        /* 1단계: 대 카테고리 */
        .main-category-nav {
          margin-bottom: 1.5rem;
        }

        .main-category-tabs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        .main-category-tab {
          background: rgba(255, 255, 255, 0.15);
          border: 3px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 1.5rem 1rem;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          backdrop-filter: blur(10px);
        }

        .main-category-tab:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
        }

        .main-category-tab.active {
          background: rgba(255, 255, 255, 0.35);
          border-color: rgba(255, 255, 255, 0.8);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }

        .main-category-tab .tab-icon {
          font-size: 2.5rem;
        }

        .main-category-tab .tab-name {
          font-size: 1.3rem;
          font-weight: 700;
        }

        .main-category-tab .tab-desc {
          font-size: 0.9rem;
          opacity: 0.9;
        }

        /* 2단계: 소 카테고리 (미술사조) - 거장과 동일한 스타일 */
        .sub-category-tabs {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1rem;
        }

        .sub-category-tab {
          background: white;
          border: 2px solid #e2e8f0;
          color: #2d3748;
          padding: 1.25rem 1rem;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .sub-category-tab:hover {
          border-color: #667eea;
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.2);
          transform: translateY(-4px);
        }

        .sub-category-tab.active {
          border-color: #667eea;
          border-width: 3px;
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
          transform: translateY(-2px);
        }

        .sub-category-tab .tab-icon {
          font-size: 2.5rem;
        }

        .sub-category-tab .tab-name {
          font-size: 1.05rem;
          font-weight: 700;
        }

        .sub-category-tab.active .tab-name {
          color: #667eea;
        }

        .sub-category-tab .tab-period {
          font-size: 0.8rem;
          opacity: 0.75;
        }

        .sub-category-tab.active .tab-period {
          color: #667eea;
          opacity: 0.8;
        }

        .sub-category-tab .tab-count {
          font-size: 0.75rem;
          padding: 0.25rem 0.6rem;
          background: rgba(102, 126, 234, 0.1);
          border-radius: 12px;
          margin-top: 0.25rem;
          font-weight: 600;
        }

        .sub-category-tab.active .tab-count {
          background: rgba(102, 126, 234, 0.15);
          color: #667eea;
        }

        /* 3단계: 화가 선택 */
        .styles-section {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        }

        .section-header {
          text-align: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #eee;
        }

        .section-header h2 {
          font-size: 1.8rem;
          color: #2d3748;
          margin: 0 0 0.5rem 0;
        }

        .section-period {
          font-size: 1rem;
          color: #718096;
          margin: 0;
        }

        /* 전체 변환 버튼 */
        .full-transform-btn {
          width: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 16px;
          padding: 1.25rem 1.5rem;
          margin-bottom: 1.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.3s;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .full-transform-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .full-transform-icon {
          font-size: 2rem;
        }

        .full-transform-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.25rem;
        }

        .full-transform-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: white;
        }

        .full-transform-desc {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.9);
          text-align: left;
        }

        .styles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 0.75rem;
        }

        .style-card {
          background: white;
          border: 2px solid #e2e8f0;
          padding: 1rem;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          text-align: center;
          min-height: 120px;
        }

        .style-card:hover {
          border-color: #667eea;
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
          transform: translateY(-4px);
        }

        .card-icon {
          font-size: 2rem;
          text-align: center;
        }

        .card-content {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          width: 100%;
        }

        .card-header h3 {
          font-size: 0.95rem;
          color: #2d3748;
          margin: 0;
          font-weight: 600;
        }

        .card-english {
          font-size: 0.7rem;
          color: #718096;
          margin: 0;
        }

        .artist-info {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          font-size: 0.7rem;
          color: #718096;
        }

        .artist-name {
          font-size: 0.7rem;
          font-weight: 600;
          color: #4a5568;
        }

        .artist-lifespan {
          font-size: 0.65rem;
          color: #a0aec0;
        }

        .card-description {
          font-size: 0.7rem;
          color: #4a5568;
          line-height: 1.4;
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .model-badge {
          display: none;
        }

        /* 모바일 반응형 */
        @media (max-width: 768px) {
          .style-selection {
            padding: 1rem;
          }

          .selection-header h1 {
            font-size: 2rem;
          }

          .header-subtitle {
            font-size: 1rem;
          }

          .main-category-tabs {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }

          .main-category-tab {
            padding: 1.25rem;
          }

          .main-category-tab .tab-icon {
            font-size: 2rem;
          }

          .main-category-tab .tab-name {
            font-size: 1.1rem;
          }

          .sub-category-tabs {
            grid-template-columns: repeat(2, 1fr);
          }

          .styles-section {
            padding: 1.5rem;
          }

          .section-header h2 {
            font-size: 1.5rem;
          }

          .styles-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
          }

          .style-card {
            padding: 0.75rem;
            min-height: 100px;
          }

          .card-icon {
            font-size: 1.5rem;
          }

          .card-header h3 {
            font-size: 0.85rem;
          }

          .card-description {
            font-size: 0.65rem;
          }

          .full-transform-btn {
            padding: 1rem;
          }

          .full-transform-icon {
            font-size: 1.5rem;
          }

          .full-transform-title {
            font-size: 1rem;
          }

          .full-transform-desc {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default StyleSelection;
