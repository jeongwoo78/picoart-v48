// PicoArt v25 - BeforeAfter Vertical Layout
import React from 'react';

const BeforeAfter = ({ beforeImage, afterImage, className = '' }) => {
  return (
    <div className={`before-after-vertical ${className}`}>
      {/* Before Image (위) */}
      <div className="image-section before-section">
        <div className="image-label-top">원본</div>
        <img src={beforeImage} alt="원본" className="comparison-image-vertical" />
      </div>

      {/* After Image (아래) */}
      <div className="image-section after-section">
        <div className="image-label-top">변환 후</div>
        <img src={afterImage} alt="변환 후" className="comparison-image-vertical" />
      </div>

      <style>{`
        .before-after-vertical {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .image-section {
          position: relative;
          width: 100%;
          background: #f5f5f5;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }

        .image-label-top {
          position: absolute;
          top: 1rem;
          left: 1rem;
          padding: 0.5rem 1rem;
          background: rgba(0,0,0,0.7);
          color: white;
          font-size: 0.875rem;
          font-weight: 600;
          border-radius: 20px;
          backdrop-filter: blur(10px);
          z-index: 10;
        }

        .comparison-image-vertical {
          width: 100%;
          height: auto;
          display: block;
          object-fit: contain;
          max-height: 600px;
        }

        @media (max-width: 640px) {
          .before-after-vertical {
            gap: 1rem;
          }

          .image-label-top {
            font-size: 0.75rem;
            padding: 0.375rem 0.75rem;
            top: 0.75rem;
            left: 0.75rem;
          }

          .comparison-image-vertical {
            max-height: 400px;
          }
        }
      `}</style>
    </div>
  );
};

export default BeforeAfter;
