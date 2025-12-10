// PicoArt v61 - ResultScreen
// 거장 교육자료 통합본 사용 (1차+2차 = 42개)
// 갤러리 자동 저장 기능 추가
// 2025-12-09 업데이트

import React, { useState, useEffect, useRef } from 'react';
import BeforeAfter from './BeforeAfter';
import { orientalEducation } from '../data/educationContent';
import { movementsEducation, movementsOverview } from '../data/movementsEducation';
import { mastersEducation } from '../data/mastersEducation';
import { saveToGallery } from './GalleryScreen';


const ResultScreen = ({ 
  originalPhoto, 
  resultImage, 
  selectedStyle, 
  aiSelectedArtist,
  aiSelectedWork,
  onReset,
  onGallery
}) => {
  
  // ========== State ==========
  const [showInfo, setShowInfo] = useState(true);
  const [educationText, setEducationText] = useState('');
  const [isLoadingEducation, setIsLoadingEducation] = useState(true);
  const [savedToGallery, setSavedToGallery] = useState(false);
  const hasSavedRef = useRef(false);


  // ========== 갤러리 자동 저장 ==========
  useEffect(() => {
    // 이미 저장했으면 스킵
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
  }, [resultImage, selectedStyle, aiSelectedArtist]);


  // ========== Effects ==========
  // aiSelectedArtist가 변경될 때마다 2차 교육 재생성
  useEffect(() => {
    console.log('🎨 ResultScreen mounted or aiSelectedArtist changed');
    generate2ndEducation();
  }, [aiSelectedArtist]);


  // ========== 2차 교육 로드 (v55 - 디버깅 강화) ==========
  const generate2ndEducation = () => {
    console.log('');
    console.log('🔥🔥🔥 LOAD EDUCATION START (v55) 🔥🔥🔥');
    console.log('   - category:', selectedStyle.category);
    console.log('   - aiSelectedArtist:', aiSelectedArtist);
    console.log('   - current educationText:', educationText);
    console.log('   - current isLoadingEducation:', isLoadingEducation);
    console.log('');
    
    setIsLoadingEducation(true);
    
    let content = null;
    
    // 1. 동양화 (oriental)
    if (selectedStyle.category === 'oriental') {
      console.log('📜 Loading oriental education...');
      content = getOrientalEducation();
    }
    
    // 2. 미술사조 (movements)
    else if (selectedStyle.category !== 'masters') {
      console.log('📜 Loading movements education...');
      content = getMovementsEducation();
    }
    
    // 3. 거장 (masters)
    else {
      console.log('📜 Loading masters education...');
      content = getMastersEducation();
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
  const getMovementsEducation = () => {
    const category = selectedStyle.category;
    
    console.log('');
    console.log('========================================');
    console.log('🎨 MOVEMENTS EDUCATION (v52):');
    console.log('========================================');
    console.log('   - category:', category);
    console.log('   - aiSelectedArtist (raw):', aiSelectedArtist);
    console.log('   - aiSelectedArtist type:', typeof aiSelectedArtist);
    console.log('========================================');
    console.log('');
    
    // 화가 이름 정규화
    let artistName = (aiSelectedArtist || '')
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
  const getMastersEducation = () => {
    const artistRaw = aiSelectedArtist || selectedStyle.name || '';
    const artist = artistRaw.replace(/\s*\([^)]*\)/g, '').trim();
    
    console.log('');
    console.log('========================================');
    console.log('🎨 MASTERS EDUCATION (v60 통합본):');
    console.log('========================================');
    console.log('   - selectedStyle.name:', selectedStyle.name);
    console.log('   - aiSelectedArtist:', aiSelectedArtist);
    console.log('   - aiSelectedWork:', aiSelectedWork);
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
      // v59: 루벤스 삭제 (API에 프롬프트 없음)
      
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
  const getOrientalEducation = () => {
    const styleId = selectedStyle.id;
    
    console.log('');
    console.log('========================================');
    console.log('🔍 ORIENTAL EDUCATION DEBUG (v30)');
    console.log('========================================');
    console.log('📌 selectedStyle.id:', styleId);
    console.log('📌 aiSelectedArtist:', aiSelectedArtist);
    console.log('📌 aiSelectedArtist type:', typeof aiSelectedArtist);
    console.log('========================================');
    console.log('');
    
    
    // ========== 한국 전통 회화 (3가지) ==========
    if (styleId === 'korean') {
      const genre = aiSelectedArtist?.toLowerCase() || '';
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


  // ========== Render ==========
  return (
    <div className="result-screen">
      <div className="result-container">
        
        {/* Header */}
        <div className="result-header">
          <h1>✨ 완성!</h1>
          <p className="result-subtitle">
            {selectedStyle.name} 스타일로 변환되었습니다
          </p>
        </div>

        {/* Before/After Slider */}
        <div className="comparison-wrapper">
          <BeforeAfter 
            beforeImage={URL.createObjectURL(originalPhoto)}
            afterImage={resultImage}
          />
        </div>

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
                {selectedStyle.icon || '🎨'}
              </div>
              <div>
                <h2>{selectedStyle.name}</h2>
                <p className="technique-subtitle">
                  <span className="artist-name">
                    {formatArtistName(aiSelectedArtist)}
                  </span>
                  {selectedStyle.category === 'neoclassicism_vs_romanticism_vs_realism' && aiSelectedArtist && (() => {
                    const movement = getSpecificMovement(aiSelectedArtist);
                    return movement ? (
                      <span className={`style-badge ${movement.color}`}>
                        {movement.text}
                      </span>
                    ) : null;
                  })()}
                  {selectedStyle.category === 'modernism' && aiSelectedArtist && (() => {
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
      `}</style>
    </div>
  );
};

export default ResultScreen;
