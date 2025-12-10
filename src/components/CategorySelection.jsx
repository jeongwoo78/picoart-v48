// CategorySelection.jsx - 대카테고리 선택 (첫 화면)
import React from 'react';

const CategorySelection = ({ onSelect, onGallery }) => {
  const categories = [
    {
      id: 'movements',
      name: '미술사조',
      icon: '🎨',
      description: '서양 미술의 흐름',
      subtext: '그리스·로마부터 모더니즘까지'
    },
    {
      id: 'masters',
      name: '거장 컬렉션',
      icon: '⭐',
      description: '시대를 대표하는 거장들',
      subtext: '고흐, 피카소, 클림트 외 4인'
    },
    {
      id: 'oriental',
      name: '동양화',
      icon: '🎎',
      description: '한·중·일 전통 미술',
      subtext: '수묵화, 민화, 우키요에'
    }
  ];

  return (
    <div className="category-selection">
      {/* 헤더 */}
      <header className="category-header">
        <h1 className="app-title">🎨 PicoArt</h1>
        <p className="app-tagline">AI가 당신의 사진을 거장의 그림으로</p>
        <button className="gallery-btn" onClick={onGallery}>
          🖼️ 나의 갤러리
        </button>
      </header>

      {/* 카테고리 선택 */}
      <div className="category-container">
        <h2 className="section-title">어떤 스타일로 변환할까요?</h2>
        
        <div className="category-grid">
          {categories.map(cat => (
            <button
              key={cat.id}
              className="category-card"
              onClick={() => onSelect(cat.id)}
            >
              <span className="category-icon">{cat.icon}</span>
              <span className="category-name">{cat.name}</span>
              <span className="category-desc">{cat.description}</span>
              <span className="category-subtext">{cat.subtext}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 푸터 */}
      <footer className="category-footer">
        <p className="footer-info">
          특허: 10-2018-0016297 (사진 분석 자동 작품 선정), 10-2018-0122600 (사진 드로잉 변환)
        </p>
        <p className="footer-copyright">© 2025 PicoArt. All rights reserved.</p>
      </footer>

      <style>{`
        .category-selection {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .category-header {
          text-align: center;
          padding: 2rem;
          color: white;
        }

        .app-title {
          font-size: 3rem;
          margin: 0 0 0.5rem;
          font-weight: 800;
        }

        .app-tagline {
          font-size: 1.2rem;
          margin: 0 0 1rem;
          opacity: 0.95;
        }

        .gallery-btn {
          padding: 10px 24px;
          background: rgba(255,255,255,0.2);
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 25px;
          color: white;
          cursor: pointer;
          font-size: 0.95rem;
          font-weight: 600;
          transition: all 0.2s;
        }

        .gallery-btn:hover {
          background: rgba(255,255,255,0.3);
        }

        .category-container {
          flex: 1;
          padding: 2rem;
          max-width: 900px;
          margin: 0 auto;
          width: 100%;
        }

        .section-title {
          text-align: center;
          color: white;
          font-size: 1.5rem;
          margin: 0 0 2rem;
          font-weight: 600;
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .category-card {
          background: white;
          border: none;
          border-radius: 20px;
          padding: 2rem 1.5rem;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          box-shadow: 0 10px 40px rgba(0,0,0,0.15);
        }

        .category-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.25);
        }

        .category-icon {
          font-size: 3.5rem;
        }

        .category-name {
          font-size: 1.4rem;
          font-weight: 700;
          color: #2d3748;
        }

        .category-desc {
          font-size: 1rem;
          color: #667eea;
          font-weight: 500;
        }

        .category-subtext {
          font-size: 0.85rem;
          color: #718096;
          text-align: center;
        }

        .category-footer {
          background: #2d3748;
          color: white;
          padding: 1.5rem;
          text-align: center;
        }

        .footer-info {
          font-size: 0.85rem;
          margin: 0 0 0.5rem;
          opacity: 0.9;
        }

        .footer-copyright {
          font-size: 0.75rem;
          margin: 0;
          opacity: 0.7;
        }

        @media (max-width: 768px) {
          .category-header {
            padding: 1.5rem 1rem;
          }

          .app-title {
            font-size: 2rem;
          }

          .app-tagline {
            font-size: 1rem;
          }

          .category-container {
            padding: 1rem;
          }

          .section-title {
            font-size: 1.2rem;
          }

          .category-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .category-card {
            padding: 1.5rem;
            flex-direction: row;
            gap: 1rem;
            text-align: left;
          }

          .category-icon {
            font-size: 2.5rem;
          }

          .category-name {
            font-size: 1.2rem;
          }

          .category-card > span:not(.category-icon) {
            flex: 1;
          }

          .category-card {
            flex-wrap: wrap;
          }

          .category-subtext {
            width: 100%;
            text-align: left;
            padding-left: calc(2.5rem + 1rem);
          }

          .category-footer {
            padding: 1rem;
          }

          .footer-info {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CategorySelection;
