// PicoArt v63 - Main App (새 흐름: 대카테고리 → 사진+세부선택 → 변환)
import React, { useState } from 'react';
import CategorySelection from './components/CategorySelection';
import PhotoStyleScreen from './components/PhotoStyleScreen';
import ProcessingScreen from './components/ProcessingScreen';
import ResultScreen from './components/ResultScreen';
import GalleryScreen from './components/GalleryScreen';
import './styles/App.css';

const App = () => {
  // 화면 상태: 'category' | 'photoStyle' | 'processing' | 'result'
  const [currentScreen, setCurrentScreen] = useState('category');
  const [showGallery, setShowGallery] = useState(false);
  
  // 데이터 상태
  const [mainCategory, setMainCategory] = useState(null); // 'movements' | 'masters' | 'oriental'
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [aiSelectedArtist, setAiSelectedArtist] = useState(null);
  const [aiSelectedWork, setAiSelectedWork] = useState(null);

  // 1단계: 대카테고리 선택
  const handleCategorySelect = (categoryId) => {
    setMainCategory(categoryId);
    setCurrentScreen('photoStyle');
  };

  // 2단계: 사진 + 스타일 선택 완료 → 변환 시작
  const handlePhotoStyleSelect = (photo, style) => {
    setUploadedPhoto(photo);
    setSelectedStyle(style);
    setCurrentScreen('processing');
  };

  // 변환 완료
  const handleProcessingComplete = (style, resultImageUrl, result) => {
    setResultImage(resultImageUrl);
    
    if (result && result.aiSelectedArtist) {
      setAiSelectedArtist(result.aiSelectedArtist);
      console.log('✅ App.jsx received aiSelectedArtist:', result.aiSelectedArtist);
    } else {
      console.log('⚠️ No aiSelectedArtist in result:', result);
    }
    
    if (result && result.selected_work) {
      setAiSelectedWork(result.selected_work);
      console.log('✅ App.jsx received selected_work:', result.selected_work);
    } else {
      setAiSelectedWork(null);
    }
    
    setCurrentScreen('result');
  };

  // 처음으로
  const handleReset = () => {
    setCurrentScreen('category');
    setMainCategory(null);
    setUploadedPhoto(null);
    setSelectedStyle(null);
    setResultImage(null);
    setAiSelectedArtist(null);
    setAiSelectedWork(null);
  };

  // 뒤로가기 (photoStyle → category)
  const handleBackToCategory = () => {
    setCurrentScreen('category');
    setMainCategory(null);
    setUploadedPhoto(null);
  };

  return (
    <div className="app">
      {/* 갤러리 화면 */}
      {showGallery && (
        <GalleryScreen onBack={() => setShowGallery(false)} />
      )}

      {/* 메인 앱 */}
      {!showGallery && (
        <>
          {/* 1단계: 대카테고리 선택 */}
          {currentScreen === 'category' && (
            <CategorySelection 
              onSelect={handleCategorySelect}
              onGallery={() => setShowGallery(true)}
            />
          )}

          {/* 2단계: 사진 + 세부선택 통합 화면 */}
          {currentScreen === 'photoStyle' && (
            <PhotoStyleScreen
              mainCategory={mainCategory}
              onBack={handleBackToCategory}
              onSelect={handlePhotoStyleSelect}
            />
          )}

          {/* 3단계: 변환 중 */}
          {currentScreen === 'processing' && (
            <ProcessingScreen
              photo={uploadedPhoto}
              selectedStyle={selectedStyle}
              onComplete={handleProcessingComplete}
            />
          )}

          {/* 4단계: 결과 */}
          {currentScreen === 'result' && (
            <ResultScreen
              originalPhoto={uploadedPhoto}
              resultImage={resultImage}
              selectedStyle={selectedStyle}
              aiSelectedArtist={aiSelectedArtist}
              aiSelectedWork={aiSelectedWork}
              onReset={handleReset}
              onGallery={() => {
                handleReset();
                setShowGallery(true);
              }}
            />
          )}
        </>
      )}

      <style>{`
        .app {
          min-height: 100vh;
        }
      `}</style>
    </div>
  );
};

export default App;
