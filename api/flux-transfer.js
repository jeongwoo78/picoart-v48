// PicoArt v59 - 모더니즘 7명 + 사진 유형별 비중
// v59: 20세기 모더니즘 7명으로 축소 + 사진 유형별 비중 시스템
//      - 7명: 피카소, 마그리트, 미로, 샤갈, 워홀, 리히텐슈타인, 키스해링
//      - 제외: 브라크(피카소 중복), 달리(완전 삭제)
//      - 사진 유형별 비중:
//        🧑 단독 인물: 피카소35%, 마그리트25%, 워홀25%, 리히텐슈타인10%, 해링5%
//        💑 커플: 피카소30%, 샤갈25%, 마그리트20%, 워홀15%, 리히텐슈타인10%
//        👥 그룹3+: 피카소35%, 해링35%, 샤갈15%, 리히텐슈타인15%
//        🏞️ 풍경: 피카소25%, 마그리트25%, 샤갈20%, 미로15%
//        🍎 정물: 피카소35%, 마그리트25%, 미로20%, 워홀20%
//      - 미로: 풍경/정물 전용 (인물 제외)
//
// v58: 20세기 모더니즘 가이드라인 단순화 (네가티브 원칙)
//      - 거장 11명 강화 프롬프트 한글 감지 추가
//        (샤갈, 반 고흐, 모네, 클림트, 뭉크, 마티스, 피카소, 워홀, 프리다, 마그리트)
//
// v51: 20세기 모더니즘 추가 (11번째 사조)
//      - 입체주의: 피카소
//      - 초현실주의: 마그리트, 미로, 샤갈
//      - 팝아트: 워홀, 리히텐슈타인, 키스해링
//      ⛔ 제외: 만 레이(사진작가), 프리다(마스터 전용), 뒤샹(개념미술), 폴록/로스코(완전추상), 달리(삭제), 브라크(중복)
//
// v57: 중세 미술 회화 느낌 방지 강화
//      
//      고딕 (Gothic):
//        "FLAT TWO-DIMENSIONAL medieval style"
//        "NOT realistic smooth oil painting"
//        "angular linear forms with hard edges"
//        "like stained glass panels + manuscripts"
//      
//      로마네스크 (Romanesque):
//        "FLAT MURAL FRESCO style like church walls"
//        "NOT smooth realistic painting"
//        "solid block-like forms with heavy outlines"
//        "simple colors and bold shapes like stone carvings"
//      
//      목표: 스테인드글라스/필사본/프레스코 느낌
//      금지: 사실적 유화, 부드러운 회화
//
// v56: 40% 구성 기준 + 순백 대리석
//
// v47: 고대 그리스 대리석 조각 + 생동감 있는 눈동자
//
// v46: 르네상스 남성 초상화 최적화
//      남성 상반신 → 티치아노 70% (베네치아 초상화 전통)
//      여성 상반신 → 다 빈치 80% (모나리자 스푸마토)
//      남성 전신 → 미켈란젤로 (다비드 영웅성)
//
// v45: 중세 미술에 이슬람 미술 추가 (로마네스크 제거)
//      인물 사진: 비잔틴 55% / 고딕 25% / 이슬람 세밀화 20%
//      풍경 사진: 비잔틴 / 고딕 / 이슬람 기하학 (AI 선택, 세밀화 금지)
//
// 미술사조 11개 (시간순):
//   1. 고대 그리스-로마 (BC 800~AD 500) - 유지
//   2. 중세 미술 (4~15세기) - 비잔틴·고딕·로마네스크·이슬람
//      → Islamic Miniature: 인물 전용 (페르시아 세밀화, 궁정 우아함)
//      → Islamic Geometric: 풍경 전용 (기하학 패턴, 아라베스크)
//   3. 르네상스 (1400~1600) - 5명 화가 선택 ⭐ 남성 초상화 최적화
//   4. 바로크 (1600~1750) - 5명 화가 선택
//   5. 로코코 (1720~1780) - 2명 화가 선택
//   6. 신고전주의 vs 낭만주의 vs 사실주의 (1770~1870) - 7명 화가 선택 (AI가 3개 중 선택)
//      → David, Ingres (신고전주의)
//      → Turner, Goya, Delacroix (낭만주의)
//      → Millet, Manet (사실주의)
//   7. 인상주의 (1860~1890) - 4명 화가 선택
//   8. 후기인상주의 (1880~1910) - 4명 화가 선택
//   9. 야수파 (1905~1908) - 3명 화가 선택
//  10. 표현주의 (1905~1920) - 4명 화가 선택
//  11. 20세기 모더니즘 (1907~1970) - 7명 화가 선택 ⭐ v59 업데이트
//      → 입체주의: 피카소
//      → 초현실주의: 마그리트, 미로(풍경/정물전용), 샤갈
//      → 팝아트: 워홀, 리히텐슈타인, 키스해링
//      ⛔ 제외: 브라크(피카소중복), 달리(삭제), 만 레이(사진작가), 프리다(마스터전용)
//
// 거장 7명 (시간순 + 생사연도):
//   1. 반 고흐 (1853-1890, 후기인상주의)
//   2. 클림트 (1862-1918, 아르누보)
//   3. 뭉크 (1863-1944, 표현주의)
//   4. 마티스 (1869-1954, 야수파)
//   5. 피카소 (1881-1973, 입체주의)
//   6. 프리다 칼로 (1907-1954, 멕시코)
//   7. 앤디 워홀 (1928-1987, 팝아트)


// ========================================
// 사조별 화가 가이드라인 함수
// ========================================

// ========================================
// 🎯 대전제: 가중치 기반 랜덤 화가 선택 시스템
// ========================================
// 비중이 설정된 사조에서는 AI에게 맡기지 않고
// 코드에서 비율대로 랜덤 선택 → AI에게 지정
// ========================================

// 가중치 기반 랜덤 선택 함수
function weightedRandomSelect(weightedOptions) {
  const totalWeight = weightedOptions.reduce((sum, opt) => sum + opt.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const option of weightedOptions) {
    random -= option.weight;
    if (random <= 0) {
      return option.name;
    }
  }
  return weightedOptions[0].name; // fallback
}

// 사진 유형 감지 함수
function detectPhotoType(photoAnalysis) {
  const { count, subject } = photoAnalysis;
  
  // 풍경 감지
  const isLandscape = subject && (
    subject.includes('landscape') || subject.includes('nature') || 
    subject.includes('mountain') || subject.includes('sea') || 
    subject.includes('sky') || subject.includes('scenery') ||
    subject.includes('building') || subject.includes('city')
  ) && (!count || count === 0);
  
  // 정물 감지
  const isStillLife = subject && (
    subject.includes('food') || subject.includes('flower') || 
    subject.includes('object') || subject.includes('still') ||
    subject.includes('fruit') || subject.includes('bottle') ||
    subject.includes('table')
  ) && (!count || count === 0);
  
  // 동물 감지
  const isAnimal = subject && (
    subject.includes('animal') || subject.includes('pet') || 
    subject.includes('dog') || subject.includes('cat') || 
    subject.includes('bird') || subject.includes('horse')
  ) && (!count || count === 0);
  
  if (isLandscape) return 'landscape';
  if (isStillLife) return 'stillLife';
  if (isAnimal) return 'animal';
  if (count >= 3) return 'group';
  if (count === 2) return 'couple';
  if (count === 1) return 'portrait';
  
  return 'default';
}

// ========================================
// 사조별 가중치 테이블
// ========================================

const ARTIST_WEIGHTS = {
  // 모더니즘 (7명)
  modernism: {
    portrait: [
      { name: 'PICASSO', weight: 35 },
      { name: 'MAGRITTE', weight: 25 },
      { name: 'WARHOL', weight: 25 },
      { name: 'LICHTENSTEIN', weight: 10 },
      { name: 'KEITH HARING', weight: 5 }
    ],
    couple: [
      { name: 'PICASSO', weight: 30 },
      { name: 'CHAGALL', weight: 25 },
      { name: 'MAGRITTE', weight: 20 },
      { name: 'WARHOL', weight: 15 },
      { name: 'LICHTENSTEIN', weight: 10 }
    ],
    group: [
      { name: 'PICASSO', weight: 35 },
      { name: 'KEITH HARING', weight: 35 },
      { name: 'CHAGALL', weight: 15 },
      { name: 'LICHTENSTEIN', weight: 15 }
    ],
    landscape: [
      { name: 'PICASSO', weight: 25 },
      { name: 'MAGRITTE', weight: 25 },
      { name: 'CHAGALL', weight: 20 },
      { name: 'MIRÓ', weight: 15 },
      { name: 'PICASSO', weight: 15 } // 나머지
    ],
    stillLife: [
      { name: 'PICASSO', weight: 35 },
      { name: 'MAGRITTE', weight: 25 },
      { name: 'MIRÓ', weight: 20 },
      { name: 'WARHOL', weight: 20 }
    ],
    default: [
      { name: 'PICASSO', weight: 30 },
      { name: 'MAGRITTE', weight: 20 },
      { name: 'WARHOL', weight: 20 },
      { name: 'LICHTENSTEIN', weight: 15 },
      { name: 'CHAGALL', weight: 10 },
      { name: 'KEITH HARING', weight: 5 }
    ]
  },
  
  // 르네상스
  renaissance: {
    portrait: [
      { name: 'LEONARDO DA VINCI', weight: 40 },
      { name: 'TITIAN', weight: 30 },
      { name: 'RAPHAEL', weight: 20 },
      { name: 'BOTTICELLI', weight: 10 }
    ],
    femaleFace: [
      { name: 'LEONARDO DA VINCI', weight: 80 },
      { name: 'BOTTICELLI', weight: 15 },
      { name: 'RAPHAEL', weight: 5 }
    ],
    maleFace: [
      { name: 'TITIAN', weight: 70 },
      { name: 'RAPHAEL', weight: 20 },
      { name: 'LEONARDO DA VINCI', weight: 10 }
    ],
    landscape: [
      { name: 'TITIAN', weight: 50 },
      { name: 'LEONARDO DA VINCI', weight: 30 },
      { name: 'RAPHAEL', weight: 20 }
    ],
    default: [
      { name: 'LEONARDO DA VINCI', weight: 35 },
      { name: 'TITIAN', weight: 30 },
      { name: 'RAPHAEL', weight: 20 },
      { name: 'BOTTICELLI', weight: 15 }
    ]
  },
  
  // 바로크
  baroque: {
    portrait: [
      { name: 'CARAVAGGIO', weight: 40 },
      { name: 'REMBRANDT', weight: 35 },
      { name: 'VERMEER', weight: 15 },
      { name: 'VELÁZQUEZ', weight: 10 }
    ],
    elderly: [
      { name: 'REMBRANDT', weight: 70 },
      { name: 'CARAVAGGIO', weight: 20 },
      { name: 'VELÁZQUEZ', weight: 10 }
    ],
    femaleWindow: [
      { name: 'VERMEER', weight: 65 },
      { name: 'REMBRANDT', weight: 20 },
      { name: 'CARAVAGGIO', weight: 15 }
    ],
    formal: [
      { name: 'VELÁZQUEZ', weight: 60 },
      { name: 'REMBRANDT', weight: 25 },
      { name: 'CARAVAGGIO', weight: 15 }
    ],
    default: [
      { name: 'CARAVAGGIO', weight: 35 },
      { name: 'REMBRANDT', weight: 30 },
      { name: 'VERMEER', weight: 20 },
      { name: 'VELÁZQUEZ', weight: 15 }
    ]
  },
  
  // 로코코
  rococo: {
    outdoor: [
      { name: 'WATTEAU', weight: 70 },
      { name: 'BOUCHER', weight: 30 }
    ],
    default: [
      { name: 'BOUCHER', weight: 70 },
      { name: 'WATTEAU', weight: 30 }
    ]
  },
  
  // 중세
  medieval: {
    default: [
      { name: 'BYZANTINE', weight: 40 },
      { name: 'GOTHIC', weight: 35 },
      { name: 'ISLAMIC MINIATURE', weight: 25 }
    ]
  },
  
  // 신고전주의
  neoclassicism: {
    formal: [
      { name: 'JACQUES-LOUIS DAVID', weight: 70 },
      { name: 'INGRES', weight: 30 }
    ],
    femaleFace: [
      { name: 'INGRES', weight: 65 },
      { name: 'JACQUES-LOUIS DAVID', weight: 35 }
    ],
    landscape: [
      { name: 'JACQUES-LOUIS DAVID', weight: 50 },
      { name: 'INGRES', weight: 30 },
      { name: 'GOYA', weight: 20 }
      // Claude Lorrain 제거 (바로크 시대 화가)
    ],
    default: [
      { name: 'JACQUES-LOUIS DAVID', weight: 55 },
      { name: 'INGRES', weight: 30 },
      { name: 'GOYA', weight: 15 }
      // Claude Lorrain 제거
    ]
  },
  
  // 신고전주의 vs 낭만주의 vs 사실주의 (프론트엔드 카테고리명)
  neoclassicism_vs_romanticism_vs_realism: {
    portrait: [
      { name: 'INGRES', weight: 30 },
      { name: 'GOYA', weight: 25 },
      { name: 'MANET', weight: 25 },
      { name: 'JACQUES-LOUIS DAVID', weight: 20 }
    ],
    movement: [  // 스포츠/액션
      { name: 'DELACROIX', weight: 50 },       // 역동적 군중, 격렬한 동작
      { name: 'GOYA', weight: 35 },            // 투우, 격렬한 표현
      { name: 'JACQUES-LOUIS DAVID', weight: 15 }  // 영웅적 포즈
    ],
    landscape: [
      { name: 'TURNER', weight: 50 },        // 낭만주의 풍경 대표
      { name: 'DELACROIX', weight: 30 },     // 낭만주의
      { name: 'MILLET', weight: 20 }         // 사실주의 농촌 풍경
      // Claude Lorrain 제거 (바로크 시대 화가)
    ],
    dramatic: [
      { name: 'DELACROIX', weight: 40 },
      { name: 'GOYA', weight: 35 },
      { name: 'TURNER', weight: 25 }
    ],
    default: [
      { name: 'JACQUES-LOUIS DAVID', weight: 25 },
      { name: 'GOYA', weight: 20 },
      { name: 'DELACROIX', weight: 20 },
      { name: 'MANET', weight: 15 },
      { name: 'INGRES', weight: 10 },
      { name: 'MILLET', weight: 10 }
    ]
  },
  
  // 고대 그리스-로마 (스타일 선택)
  ancient: {
    indoor: [
      { name: 'CLASSICAL SCULPTURE', weight: 80 },
      { name: 'ROMAN MOSAIC', weight: 20 }
    ],
    outdoor: [
      { name: 'ROMAN MOSAIC', weight: 80 },
      { name: 'CLASSICAL SCULPTURE', weight: 20 }
    ],
    sports: [
      { name: 'CLASSICAL SCULPTURE', weight: 90 },
      { name: 'ROMAN MOSAIC', weight: 10 }
    ],
    animal: [
      { name: 'ROMAN MOSAIC', weight: 95 },
      { name: 'CLASSICAL SCULPTURE', weight: 5 }
    ],
    default: [
      { name: 'CLASSICAL SCULPTURE', weight: 50 },
      { name: 'ROMAN MOSAIC', weight: 50 }
    ]
  },
  
  // 인상주의 (4명) - 피사로→칼리보트 교체 (도시풍경/남성인물 차별화)
  impressionism: {
    portrait: [
      { name: 'RENOIR', weight: 35 },      // 여성/아이 인물 (AI힌트로 분기)
      { name: 'MONET', weight: 30 },
      { name: 'CAILLEBOTTE', weight: 35 }  // 남성 인물 (AI힌트로 분기)
    ],
    movement: [
      { name: 'DEGAS', weight: 50 },
      { name: 'RENOIR', weight: 30 },
      { name: 'MONET', weight: 15 },
      { name: 'CAILLEBOTTE', weight: 5 }
    ],
    landscape_nature: [  // 자연 풍경 (산, 숲, 바다, 정원)
      { name: 'MONET', weight: 85 },       // 자연 풍경 전문
      { name: 'RENOIR', weight: 15 }       // 야외 장면
      // 드가/칼리보트 제외
    ],
    landscape_urban: [   // 도시 풍경 (건물, 거리)
      { name: 'CAILLEBOTTE', weight: 70 }, // 도시 풍경 전문
      { name: 'MONET', weight: 30 }
    ],
    landscape: [  // 기본 풍경 (분류 불가 시)
      { name: 'MONET', weight: 70 },
      { name: 'RENOIR', weight: 20 },
      { name: 'CAILLEBOTTE', weight: 10 }
      // 드가 제외 (발레/실내 전문)
    ],
    default: [
      { name: 'RENOIR', weight: 35 },
      { name: 'MONET', weight: 35 },
      { name: 'CAILLEBOTTE', weight: 20 },
      { name: 'DEGAS', weight: 10 }
    ]
  },
  
  // 후기인상주의 (4명)
  postImpressionism: {
    portrait: [
      { name: 'VAN GOGH', weight: 40 },
      { name: 'GAUGUIN', weight: 30 },
      { name: 'CÉZANNE', weight: 20 },
      { name: 'SIGNAC', weight: 10 }
    ],
    landscape: [
      { name: 'VAN GOGH', weight: 35 },
      { name: 'CÉZANNE', weight: 30 },
      { name: 'GAUGUIN', weight: 20 },
      { name: 'SIGNAC', weight: 15 }
    ],
    stillLife: [
      { name: 'CÉZANNE', weight: 50 },
      { name: 'VAN GOGH', weight: 30 },
      { name: 'GAUGUIN', weight: 15 },
      { name: 'SIGNAC', weight: 5 }
    ],
    default: [
      { name: 'VAN GOGH', weight: 35 },
      { name: 'GAUGUIN', weight: 30 },
      { name: 'CÉZANNE', weight: 20 },
      { name: 'SIGNAC', weight: 15 }
    ]
  },
  
  // 야수파 (3명)
  fauvism: {
    portrait: [
      { name: 'MATISSE', weight: 45 },
      { name: 'DERAIN', weight: 30 },
      { name: 'VLAMINCK', weight: 25 }
    ],
    landscape: [
      { name: 'DERAIN', weight: 45 },
      { name: 'VLAMINCK', weight: 35 },
      { name: 'MATISSE', weight: 20 }
    ],
    default: [
      { name: 'MATISSE', weight: 35 },
      { name: 'DERAIN', weight: 35 },
      { name: 'VLAMINCK', weight: 30 }
    ]
  },
  
  // 표현주의 (4명)
  expressionism: {
    portrait: [
      { name: 'MUNCH', weight: 30 },
      { name: 'KOKOSCHKA', weight: 30 },
      { name: 'KIRCHNER', weight: 25 },
      { name: 'KANDINSKY', weight: 15 }
    ],
    urban: [
      { name: 'KIRCHNER', weight: 45 },
      { name: 'KOKOSCHKA', weight: 25 },
      { name: 'MUNCH', weight: 20 },
      { name: 'KANDINSKY', weight: 10 }
    ],
    abstract: [
      { name: 'KANDINSKY', weight: 60 },
      { name: 'KIRCHNER', weight: 20 },
      { name: 'MUNCH', weight: 10 },
      { name: 'KOKOSCHKA', weight: 10 }
    ],
    default: [
      { name: 'MUNCH', weight: 30 },
      { name: 'KOKOSCHKA', weight: 30 },
      { name: 'KIRCHNER', weight: 25 },
      { name: 'KANDINSKY', weight: 15 }
    ]
  }
};

// 사조별 가중치 선택 함수
function selectArtistByWeight(category, photoAnalysis) {
  const weights = ARTIST_WEIGHTS[category];
  if (!weights) return null; // 가중치 없으면 AI 자유 선택
  
  const photoType = detectPhotoType(photoAnalysis);
  
  // 특수 케이스 처리 (성별 등)
  if (category === 'renaissance') {
    if (photoAnalysis.gender === 'female' && photoType === 'portrait') {
      return weightedRandomSelect(weights.femaleFace);
    }
    if (photoAnalysis.gender === 'male' && photoType === 'portrait') {
      return weightedRandomSelect(weights.maleFace);
    }
  }
  
  if (category === 'baroque') {
    if (photoAnalysis.age === 'elderly') {
      return weightedRandomSelect(weights.elderly);
    }
  }
  
  if (category === 'rococo') {
    if (photoAnalysis.background?.includes('outdoor') || photoAnalysis.background?.includes('garden')) {
      return weightedRandomSelect(weights.outdoor);
    }
  }
  
  // 고대 그리스-로마 특수 처리
  if (category === 'ancient') {
    const subject = (photoAnalysis.subject || '').toLowerCase();
    const background = (photoAnalysis.background || '').toLowerCase();
    
    // 동물 → 모자이크
    if (subject.includes('animal') || subject.includes('pet') || subject.includes('dog') || subject.includes('cat')) {
      return weightedRandomSelect(weights.animal);
    }
    // 스포츠/액션 → 조각
    if (subject.includes('sport') || subject.includes('action') || subject.includes('running') || subject.includes('athletic')) {
      return weightedRandomSelect(weights.sports);
    }
    // 야외 → 모자이크
    if (background.includes('outdoor') || background.includes('nature') || background.includes('landscape')) {
      return weightedRandomSelect(weights.outdoor);
    }
    // 실내 → 조각
    if (background.includes('indoor') || background.includes('studio') || background.includes('room')) {
      return weightedRandomSelect(weights.indoor);
    }
  }
  
  // 인상주의 특수 처리
  if (category === 'impressionism') {
    const subject = (photoAnalysis.subject || '').toLowerCase();
    const background = (photoAnalysis.background || '').toLowerCase();
    
    // 움직임/액션 → 드가
    if (subject.includes('dance') || subject.includes('movement') || subject.includes('action') || subject.includes('sport')) {
      return weightedRandomSelect(weights.movement);
    }
    
    // 풍경 분기: 자연 vs 도시
    // 'landscape' 또는 ('object'인데 outdoor 배경)이면 풍경으로 처리
    const isOutdoorBackground = background.includes('outdoor') || background.includes('nature') || 
                                 background.includes('park') || background.includes('garden') ||
                                 background.includes('tree') || background.includes('sky') ||
                                 background.includes('path') || background.includes('road') ||
                                 background.includes('forest') || background.includes('mountain');
    
    const isLandscapeScene = subject.includes('landscape') || subject === 'landscape' ||
                             (subject === 'object' && isOutdoorBackground);
    
    if (isLandscapeScene) {
      // 도시/건물/거리 → 칼리보트
      if (background.includes('city') || background.includes('urban') || background.includes('building') || 
          background.includes('street') || subject.includes('city') || subject.includes('urban') || subject.includes('building')) {
        return weightedRandomSelect(weights.landscape_urban);
      }
      // 자연 풍경 (산, 숲, 바다, 정원 등) → 모네
      return weightedRandomSelect(weights.landscape_nature);
    }
  }
  
  // 신고전주의 vs 낭만주의 vs 사실주의 특수 처리
  if (category === 'neoclassicism_vs_romanticism_vs_realism') {
    const subject = (photoAnalysis.subject || '').toLowerCase();
    
    // 스포츠/액션/움직임 → 들라크루아, 고야
    if (subject.includes('sport') || subject.includes('action') || subject.includes('movement') || 
        subject.includes('running') || subject.includes('dance') || subject.includes('athletic')) {
      return weightedRandomSelect(weights.movement);
    }
  }
  
  // 표현주의 특수 처리
  if (category === 'expressionism') {
    const subject = (photoAnalysis.subject || '').toLowerCase();
    const background = (photoAnalysis.background || '').toLowerCase();
    // 도시/도심 → 키르히너
    if (background.includes('city') || background.includes('urban') || background.includes('street')) {
      return weightedRandomSelect(weights.urban);
    }
    // 추상적 → 칸딘스키
    if (subject.includes('abstract') || subject.includes('spiritual')) {
      return weightedRandomSelect(weights.abstract);
    }
  }
  
  // 일반 사진 유형별 선택
  const typeWeights = weights[photoType] || weights.default;
  return weightedRandomSelect(typeWeights);
}

// ========================================
// 끝: 가중치 기반 랜덤 화가 선택 시스템
// ========================================

// 고대 그리스-로마 (2가지 스타일)
function getAncientGreekRomanGuidelines() {
  return `
Available Ancient Greek-Roman Styles (2가지):

⭐ STYLE 1: CLASSICAL SCULPTURE (고대 그리스-로마 조각)
   - For: INDOOR PORTRAITS or SPORTS/ACTION PHOTOS ONLY
   - PRIORITY: Sports/athletic action OR indoor portrait settings
   - Examples: Sports action shots (running, jumping, throwing)
              Indoor portraits (studio, home, office settings)
              Athletic poses, gym photos
              Indoor group photos
   - NOT for: Outdoor portraits, casual outdoor photos, landscapes with people
   - Material: Pure white marble only (classical aesthetic)
   - Technique: Dynamic poses for sports, classical poses for indoor portraits
   - Polychromy: Marble includes subtle painted details (eyes, lips, clothing)
   - Background: Simple plain neutral background (museum-like)
   - Aesthetic: Classical Greek/Roman white marble sculpture

⭐ STYLE 2: ROMAN MOSAIC (로마 모자이크)
   - For: ALL OTHER PHOTOS (outdoor portraits, landscapes, nature, etc.)
   - Examples: Outdoor portraits (any setting)
              All landscape shots (with or without people)
              Nature scenes, flowers, plants
              City scenes, buildings
              Beach photos, mountain photos
              ANY outdoor photos with people
   - Technique: LARGE VISIBLE tesserae tiles (15-25mm each), THICK DARK GROUT LINES between tiles
   - CRITICAL: Each tile must be CLEARLY DISTINGUISHABLE as individual square/rectangular pieces
   - Aesthetic: Roman floor/wall mosaic with chunky stone tiles, jewel-tone colors

🎯 KEY DECISION RULE - SIMPLIFIED:
1. SPORTS/ATHLETIC ACTION? → SCULPTURE (highest priority!)
2. INDOOR PORTRAIT/GROUP? → SCULPTURE
3. OUTDOOR PORTRAIT? → MOSAIC
4. LANDSCAPE/NATURE? → MOSAIC
5. ANY OTHER OUTDOOR SCENE? → MOSAIC

Examples:
- Volleyball game = SCULPTURE (sports action)
- Indoor portrait at home = SCULPTURE (indoor setting)
- Gym workout = SCULPTURE (athletic/indoor)
- Office team photo = SCULPTURE (indoor group)
- Couple at beach = MOSAIC (outdoor portrait)
- Person in garden = MOSAIC (outdoor setting)
- Mountain hiking = MOSAIC (outdoor landscape)
- Street portrait = MOSAIC (outdoor)
- Sunflower = MOSAIC (nature)
`;
}

function getAncientGreekRomanHints(photoAnalysis) {
  const { count, subject, shot_type, background, activity } = photoAnalysis;
  
  // 동물 → 모자이크 (역사적으로 로마가 동물 모자이크 전성기)
  if (subject === 'animal' || subject === 'pet' || subject === 'dog' || subject === 'cat' || 
      subject === 'horse' || subject === 'bird' || subject === 'fish' || 
      subject.includes('animal') || subject.includes('pet') || subject.includes('dog') || 
      subject.includes('cat') || subject.includes('horse') || subject.includes('bird')) {
    return `
🎯 HIGHEST PRIORITY: ROMAN MOSAIC (로마 모자이크)
This photo has ANIMALS - perfect for Roman mosaic!
Historical accuracy: Romans excelled at animal mosaics (Pompeii Cave Canem, Orpheus mosaics).
Roman mosaic with LARGE CHUNKY tesserae tiles (20-30mm), THICK BLACK GROUT between every tile.
`;
  }
  
  // 스포츠/운동 → 조각 (최우선)
  if (subject.includes('sport') || subject.includes('athletic') || 
      activity === 'sports' || activity === 'exercise' || activity === 'athletic' ||
      subject.includes('running') || subject.includes('jumping') || subject.includes('throwing') ||
      subject.includes('soccer') || subject.includes('football') || subject.includes('ball') ||
      subject.includes('kick') || subject.includes('catch') || subject.includes('play')) {
    return `
🎯 HIGHEST PRIORITY: CLASSICAL SCULPTURE (고대 조각)
SPORTS/ATHLETIC ACTION detected - MUST be Greek sculpture!
⚠️ CRITICAL: Ball games, soccer, football = ALWAYS SCULPTURE
Think: Discobolus, Olympic athletes in marble
Dynamic athletic pose frozen in white marble.
NEVER mosaic for sports, even if outdoor!
`;
  }
  
  // 실내 인물 → 조각
  if (background === 'indoor' || background === 'studio' || background === 'home' || 
      background === 'office' || background.includes('indoor')) {
    return `
🎯 RECOMMENDATION: CLASSICAL SCULPTURE (고대 조각)
INDOOR PORTRAIT setting - suitable for classical sculpture.
White marble portrait with museum-like presentation.
`;
  }
  
  // 야외 인물 → 모자이크
  if (background === 'outdoor' || background === 'nature' || background === 'street' ||
      background === 'beach' || background === 'park' || background.includes('outdoor')) {
    return `
🎯 RECOMMENDATION: ROMAN MOSAIC (로마 모자이크)
OUTDOOR setting detected - Roman mosaic style.
LARGE VISIBLE tesserae tiles (20-30mm each) with THICK BLACK GROUT LINES.
`;
  }
  
  // 풍경/정물 → 모자이크
  if (subject === 'landscape' || subject === 'flowers' || subject === 'plants' || 
      subject === 'cityscape' || subject === 'objects' || subject === 'still_life') {
    return `
🎯 RECOMMENDATION: ROMAN MOSAIC (로마 모자이크)
Landscape/still life detected - Roman mosaic style.
BIG CHUNKY tesserae (20-30mm) creating mosaic with VISIBLE GROUT LINES.
`;
  }
  
  // 기본값: 실내면 조각, 야외면 모자이크
  return `
🎯 DECISION GUIDE:
1. SPORTS/ATHLETIC? → SCULPTURE (highest priority)
2. INDOOR SETTING? → SCULPTURE  
3. OUTDOOR SETTING? → MOSAIC
4. LANDSCAPE/NATURE? → MOSAIC
Default: Check if indoor (sculpture) or outdoor (mosaic)
`;
}

// 르네상스 (5명)
function getRenaissanceGuidelines() {
  return `
Available Renaissance Artists (5명):

1. LEONARDO DA VINCI (레오나르도 다 빈치) ⭐ STRONGEST for female portraits
   - Specialty: Sfumato technique, mysterious smile, soft transitions, psychological depth
   - Best for: Female upper body portraits, mysterious/serene expressions
   - Signature: Sfumato soft atmosphere, gentle beauty, enigmatic quality
   - Masterpiece: Various portraits with sfumato technique
   - When to prioritize: Female face/upper body portrait (STRONG RECOMMENDATION 80%)

2. TITIAN (티치아노) ⭐⭐ STRONG for male portraits & landscapes (70%)
   - Specialty: Venetian golden color, luminous flesh tones, ARISTOCRATIC MALE PORTRAITS
   - Best for: MALE upper body portraits, landscapes with sky/sunset, noble dignified men
   - Signature: Rich Titian red, glowing golden atmosphere, Venetian warmth and power
   - Masterpieces: Portrait of a Man, Venetian nobleman portraits
   - When to prioritize: Male face/upper body portrait (STRONG 70%) OR landscapes with sky

3. RAPHAEL (라파엘로) - Best for mother+baby, peaceful scenes
   - Specialty: Harmonious balanced composition, graceful figures, serene beauty
   - Best for: Mother with child, peaceful family scenes, gentle relationships
   - Signature: Madonna-like grace, perfect harmony
   - When to prioritize: Clear mother+baby or peaceful multi-person scene

4. MICHELANGELO (미켈란젤로) - Best for ADULT male, dynamic/heroic
   - Specialty: Sculptural powerful anatomy, heroic masculine figures
   - Best for: ADULT male (age 18+) with full body, athletic, dynamic, heroic poses
   - Signature: David-like muscular strength, monumental dignity
   - When to prioritize: Adult male with masculine energy, sports, action, heroic subject
   - CRITICAL: NEVER for children, teenagers, women, or elderly - ONLY adult men

5. BOTTICELLI (보티첼리) - Best for young female full body, graceful
   - Specialty: Flowing elegant lines, ethereal beauty, graceful movement
   - Best for: Young female full body, dance-like poses, gentle movement
   - Signature: Birth of Venus-like flowing grace, lyrical beauty
   - When to prioritize: Young female full body with graceful pose
`;
}

function getRenaissanceHints(photoAnalysis) {
  const { count, gender, shot_type, subject, age_range } = photoAnalysis;
  
  // 아동/청소년 → 라파엘로 또는 보티첼리 (미켈란젤로 절대 금지)
  if (age_range === 'child' || age_range === 'teen' || subject.includes('child') || subject.includes('boy') || subject.includes('girl')) {
    if (gender === 'female' || subject.includes('girl')) {
      return `
🎯 RECOMMENDATION: BOTTICELLI
Young person detected - Botticelli's graceful style suitable.
NEVER Michelangelo for children!
`;
    } else {
      return `
🎯 RECOMMENDATION: RAPHAEL or TITIAN
Young person detected - Raphael's gentle style or Titian's warmth.
CRITICAL: NEVER Michelangelo for children or teens!
`;
    }
  }
  
  // 여성 상반신 → 다 빈치 (80%)
  if (count === 1 && gender === 'female' && (shot_type === 'portrait' || shot_type === 'upper_body')) {
    return `
🎯 STRONG RECOMMENDATION: LEONARDO DA VINCI (80% priority)
This is a female portrait - perfect for Da Vinci's sfumato technique!
His sfumato technique creates mysterious atmosphere and gentle beauty 
will create the most iconic Renaissance portrait.
Unless this is clearly:
- Landscape/sunset (→ Titian)
- Young female full body with graceful pose (→ Botticelli)
`;
  }
  
  // 남성 상반신 → 티치아노 (70%) ⭐ NEW
  if (count === 1 && gender === 'male' && (shot_type === 'portrait' || shot_type === 'upper_body')) {
    return `
🎯 STRONG RECOMMENDATION: TITIAN (70% priority)
This is a male portrait - perfect for Titian's Venetian portrait tradition!
His rich golden colors, luminous flesh tones, and aristocratic dignity
create powerful Renaissance male portraits.
Unless this is clearly:
- Male full body heroic pose (→ Michelangelo)
`;
  }
  
  // 풍경/하늘 → 티치아노
  if (subject === 'landscape' || subject.includes('sky')) {
    return `
🎯 STRONG RECOMMENDATION: TITIAN
This landscape/sky scene is perfect for Titian's golden Venetian atmosphere!
`;
  }
  
  // 엄마+아기 → 라파엘로
  if (count >= 2 && subject.includes('baby')) {
    return `
🎯 STRONG RECOMMENDATION: RAPHAEL
This scene with baby is perfect for Raphael's Madonna-like grace!
`;
  }
  
  // 성인 남성 + (전신 OR 역동적/스포츠/액션) → 미켈란젤로 (아동/청소년/노인 제외)
  // v59: 남성 전신뿐 아니라 남성적+역동적 사진에도 적용
  if (count === 1 && gender === 'male' && 
      age_range !== 'child' && age_range !== 'teen' && age_range !== 'elderly' &&
      (shot_type === 'full_body' || 
       subject.includes('sport') || subject.includes('athletic') || 
       subject.includes('action') || subject.includes('dynamic') ||
       subject.includes('heroic') || subject.includes('muscular'))) {
    return `
🎯 STRONG RECOMMENDATION: MICHELANGELO
ADULT male with dynamic/heroic qualities - perfect for Michelangelo's David-like heroic strength!
His sculptural anatomy and monumental power suit masculine energy.
CRITICAL: Only for adult men (18-60), never for children/teens/elderly.
`;
  }
  
  // 기본값 → 다 빈치
  return `
🎯 Default: LEONARDO DA VINCI is the most versatile Renaissance master.
Consider the subject carefully and choose the best match.
`;
}

// 바로크 (5명)
function getBaroqueGuidelines() {
  return `
Available Baroque Artists (5명):

1. CARAVAGGIO (카라바조) ⭐⭐⭐ STRONGEST for single portraits
   - Specialty: Dramatic chiaroscuro, tenebrism, theatrical spotlight effect
   - Best for: Single person portraits, dramatic mood, strong expressions
   - Signature: Dark background with spotlight, intense dramatic lighting
   - Masterpiece: The Calling of Saint Matthew
   - When to prioritize: Most 1-person portraits (STRONG RECOMMENDATION 70-80%)

2. REMBRANDT (렘브란트) - Best for elderly subjects
   - Specialty: Warm golden light, psychological depth, intimate atmosphere
   - Best for: Elderly subjects (60+), contemplative mood, wise expressions
   - Signature: Rembrandt glow, soft warm transitions, soul-revealing depth
   - Masterpiece: Self-portraits
   - When to prioritize: Clear elderly subject (70%+)

4. VELÁZQUEZ (벨라스케스) - Best for formal/official portraits
   - Specialty: Courtly dignity, Spanish formality, spatial mastery
   - Best for: Formal clothing, aristocratic mood, official portraits
   - Signature: Las Meninas-like sophisticated composition
   - When to prioritize: Clear formal/official context, elegant dress

5. VERMEER (베르메르) - Best for window light, peaceful women
   - Specialty: Soft window light, domestic tranquility, pearl-like luminosity
   - Best for: Female subject with natural side lighting, peaceful indoor scenes
   - Signature: Pearl Earring-like gentle light and peace
   - When to prioritize: Clear window/natural side light + female subject
`;
}

function getBaroqueHints(photoAnalysis) {
  const { count, age_range, gender, lighting, background } = photoAnalysis;
  
  // 1명 독사진 → 카라바조 (70-80%)
  if (count === 1) {
    // 노인 → 렘브란트
    if (age_range === 'elderly') {
      return `
🎯 STRONG RECOMMENDATION: REMBRANDT (70%+)
This elderly subject is PERFECT for Rembrandt's warm golden light!
His soul-revealing depth captures the wisdom of age beautifully.
`;
    }
    
    // 여성 + 창가 → 베르메르
    if (gender === 'female' && (lighting === 'window' || lighting === 'natural_side')) {
      return `
🎯 STRONG RECOMMENDATION: VERMEER (65%+)
Female subject with natural window light - Vermeer's specialty!
Consider: Pearl Earring atmosphere vs Caravaggio drama
Vermeer for gentle peace, Caravaggio for dramatic impact.
`;
    }
    
    // 격식있는 복장 → 벨라스케스
    if (background === 'formal' || lighting === 'formal') {
      return `
🎯 STRONG RECOMMENDATION: VELÁZQUEZ (60%+)
This formal portrait matches Velázquez's courtly dignity.
But Caravaggio's drama is also powerful - choose based on mood.
`;
    }
    
    // 기본 1명 → 카라바조
    return `
🎯 STRONG RECOMMENDATION: CARAVAGGIO (70-80%)
Single person portrait - Caravaggio's STRONGEST specialty!
His dramatic chiaroscuro creates the most distinctive Baroque impact.
Unless:
- Elderly subject (→ Rembrandt 70%+)
- Female + window light (→ Vermeer 65%+)
- Formal portrait (→ Velázquez 60%+)
`;
  }
  
  // 2명 이상 → 카라바조
  return `
🎯 STRONG RECOMMENDATION: CARAVAGGIO for dramatic group scene
Caravaggio's chiaroscuro creates powerful intimate drama for any group size.
`;
}

// 로코코 (2명)
function getRococoGuidelines() {
  return `
Available Rococo Artists (2명):

1. BOUCHER (부셰) ⭐⭐ STRONGEST for Rococo (70%)
   - Specialty: Playful sensual charm, soft pink and blue pastels, ornate decoration
   - Best for: Most photos - quintessential Rococo style
   - Signature: Whimsical charm, light pastel palette, cherubs and cupids
   - When to prioritize: Most cases (DEFAULT 70%)

2. WATTEAU (와토) - Best for romantic outdoor scenes (30%)
   - Specialty: Fêtes galantes (elegant outdoor parties), romantic gardens
   - Best for: Outdoor scenes specifically, romantic atmosphere, leisure activities
   - Signature: Dreamy pastoral elegance, soft romantic mood, melancholic charm
   - When to prioritize: Clear outdoor/garden/romantic settings (30%)

Note: Boucher is the quintessential Rococo artist.
`;
}

function getRococoHints(photoAnalysis) {
  const { background, subject } = photoAnalysis;
  
  // 야외 정원만 → 와토
  if (background === 'outdoor' || background === 'garden' || subject.includes('garden')) {
    return `
🎯 RECOMMENDATION: WATTEAU (30%)
Outdoor garden setting matches Watteau's fêtes galantes!
Romantic garden atmosphere is his specialty.
`;
  }
  
  // 기본값 → 부셰 (70%)
  return `
🎯 STRONG: BOUCHER (70%) - DEFAULT for Rococo
Quintessential Rococo playful charm and pastel colors.
Unless clear outdoor garden → Watteau (30%)
`;
}

// 중세 미술 (비잔틴·고딕·이슬람) ⭐ v59 로마네스크 삭제
function getMedievalGuidelines() {
  return `
Available Medieval Art Styles:

⚠️ CRITICAL ISLAMIC ART RULES:
- Islamic MINIATURE → ONLY for PEOPLE (forbidden for landscapes - boring!)
- Islamic GEOMETRIC → ONLY for LANDSCAPES (excellent for patterns/nature)

📍 FOR PORTRAITS/PEOPLE (인물화) - 3 styles available:

1. BYZANTINE (비잔틴) ⭐⭐⭐⭐ (35%)
   - Specialty: SACRED GOLDEN MOSAIC backgrounds, flat iconic forms, divine transcendence
   - Best for: Formal dignified portraits - Byzantine spirituality and eternal presence
   - Signature: GOLDEN HALO behind head, Gold leaf backgrounds, hieratic frontal poses
   - CRITICAL: Must have CIRCULAR GOLDEN NIMBUS (halo) behind subject's head

2. GOTHIC (고딕) ⭐⭐⭐⭐ (35%)
   - Specialty: CATHEDRAL STAINED GLASS with thick BLACK LEAD LINES dividing colored glass sections
   - Reference: Chartres Cathedral stained glass windows style
   - Best for: Religious atmosphere with jewel-tone translucent colors
   - Signature: ENTIRE IMAGE composed of colored glass pieces separated by BLACK LEAD CAMES
   - CRITICAL: Must show THICK BLACK LINES between EVERY color section like real stained glass
   - Glass colors: Deep ruby red, sapphire blue, emerald green, amber yellow, purple
   - Key features: Flat 2D figures, no perspective, translucent glass effect, light passing through
   - NOT a painting - must look like actual STAINED GLASS WINDOW with lead dividers

3. ISLAMIC MINIATURE (이슬람 세밀화) ⭐⭐⭐ (30%)
   - Specialty: Persian/Ottoman COURT MINIATURE painting, intricate delicate details, vibrant jewel colors
   - Best for: PEOPLE ONLY - courtly elegant portraits, delicate graceful figures, ornamental backgrounds
   - Signature: Persian manuscript illumination style, flat decorative composition, rich jewel tones, intricate patterns
   - ⚠️ CRITICAL: ONLY for PEOPLE photos, NEVER for landscapes!

📍 FOR LANDSCAPES/NON-PORTRAITS (풍경/사물):

Choose best style among: Byzantine, Gothic, Islamic GEOMETRIC
⚠️ NEVER use Islamic MINIATURE for landscapes (boring!)
✅ Islamic GEOMETRIC patterns excellent for landscape/nature scenes

4. ISLAMIC GEOMETRIC (이슬람 기하학) - For landscapes only
   - Specialty: CLEARLY VISIBLE intricate geometric patterns and arabesque motifs forming the artwork
   - Technique: Islamic geometric tessellation, star patterns, interlocking shapes, ornamental arabesques
   - Visual style: Decorative geometric mosaic-like composition, symmetrical patterns, sacred geometry
   - Colors: Rich jewel tones (deep blues, golds, emerald greens, ruby reds) in geometric arrangements
   - Best for: LANDSCAPES, nature, architecture, objects (NO people!)
   - Key features: Geometric precision, flowing arabesque decorations, Islamic art aesthetic
   - IMPORTANT: The entire image should be composed of visible geometric patterns and decorative motifs
   - ⚠️ CRITICAL: ONLY for NON-PEOPLE photos, excellent for transforming landscapes into geometric art!

🎯 CRITICAL DECISION LOGIC:
IF photo has PEOPLE:
  → Choose from: Byzantine (35%), Gothic (35%), Islamic MINIATURE (30%)
  → NEVER Islamic GEOMETRIC (it prohibits human figures)
  
IF photo has NO people (landscape/objects):
  → Choose from: Byzantine, Gothic, Islamic GEOMETRIC
  → AI decides best fit based on scene characteristics
  → NEVER Islamic MINIATURE (boring for landscapes!)
`;
}

function getMedievalHints(photoAnalysis) {
  const { count, subject } = photoAnalysis;
  
  // 동물 있으면 → 무조건 이슬람 세밀화 (신성모독 방지!)
  if (subject === 'animal' || subject === 'pet' || subject === 'dog' || subject === 'cat' || 
      subject === 'horse' || subject === 'bird' || subject === 'fish' || 
      subject.includes('animal') || subject.includes('pet') || subject.includes('dog') || 
      subject.includes('cat') || subject.includes('horse') || subject.includes('bird')) {
    return `
🚨 CRITICAL: This photo has ANIMALS

🎯 MUST use Islamic Miniature (ONLY safe option for animals):
- Persian/Ottoman court painting style
- Garden or hunting scenes with animals
- Vibrant jewel colors, ornamental patterns
- NO Christian religious imagery (avoids sacred context)
- Secular courtly art aesthetic

⚠️ NEVER Byzantine/Gothic/Romanesque for animals (religious context inappropriate!)
`;
  }
  
  // 인물 있으면 → 비잔틴 35%, 고딕 35%, 이슬람 세밀화 30%
  if (count >= 1 || subject.includes('person') || subject.includes('people') || subject.includes('portrait')) {
    return `
⚠️ CRITICAL: This photo has PEOPLE

🎯 Choose from 3 portrait styles:
- Byzantine (35%) - Sacred golden mosaic, GOLDEN HALO, divine transcendence
- Gothic (35%) - Cathedral stained glass, BLACK LEAD LINES, holy atmosphere
- Islamic MINIATURE (30%) - Persian court elegance, ornamental beauty

⚠️ NEVER use Islamic GEOMETRIC for people (prohibits human figures)
`;
  }
  
  // 인물 없으면 → 비잔틴, 고딕, 이슬람 기하학 (세밀화 금지!)
  return `
⚠️ CRITICAL: This photo has NO people (landscape/objects)

🎯 Choose from 3 landscape styles:
- Byzantine - Golden mosaic atmosphere
- Gothic - Cathedral heavenly light
- Islamic GEOMETRIC - Arabesque patterns (EXCELLENT for landscapes!)

⚠️ NEVER use Islamic MINIATURE for landscapes (boring!)
`;
}

// 신고전주의 vs 낭만주의 vs 사실주의 (7명) ⭐ v42 통합
function getNeoclassicismVsRomanticismVsRealismGuidelines() {
  return `
Available Artists (7명) - AI will choose BEST style (Neoclassicism vs Romanticism vs Realism):

⚖️ NEOCLASSICISM (신고전주의) - Reason and Order:

1. DAVID (다비드) ⭐ BEST for formal/heroic portraits
   - Specialty: Classical heroic compositions, clear lines, dignified formality
   - Best for: Formal portraits, static balanced poses, heroic subjects
   - Signature: Napoleon's Coronation - cold perfection, clear structure
   - When to prioritize: Formal/static/balanced photos (70%)

2. INGRES (앵그르) - BEST for elegant female portraits
   - Specialty: Perfect smooth contours, classical beauty, refined elegance
   - Best for: Female portraits, graceful poses, elegant beauty
   - Signature: La Grande Odalisque - idealized smooth perfection
   - When to prioritize: Elegant female subjects (65%)

⚡ ROMANTICISM (낭만주의) - Emotion and Passion:

3. TURNER (터너) ⭐⭐ STRONGEST for landscapes
   - Specialty: Atmospheric light effects, misty dreamlike landscapes, sublime nature
   - Best for: Landscapes, fog/mist, atmospheric effects, natural scenery
   - Signature: Golden luminous atmosphere, dissolving forms in light
   - When to prioritize: Landscape photos (STRONG 75%)

4. GOYA (고야) - BEST for portraits, dark mood, war/conflict scenes
   - Specialty: Dark psychological depth, dramatic contrasts, human truth
   - Best for: Elegant portraits, dark/moody atmosphere, conflict/tension scenes
   - Signature: "La Maja Vestida" elegance, "May 3, 1808" dramatic lighting
   - When to prioritize: Portraits (especially female), war/conflict themes, night scenes (70%)

5. DELACROIX (들라크루아) - BEST for dramatic action, intense emotions
   - Specialty: Vivid passionate colors, dynamic movement, revolutionary energy
   - Best for: Action scenes, dramatic expressions, multiple people in motion
   - Signature: Liberty Leading the People - passionate drama
   - When to prioritize: Action/drama/multiple people in motion (70%)

🎨 REALISM (사실주의) - Honest Truth:

6. MILLET (밀레) ⭐ STRONGEST for rural/peaceful scenes
   - Specialty: Peasant life, rural landscapes, dignified labor, poetic serenity
   - Best for: Rural settings, peaceful countryside, farming/labor themes
   - Signature: The Gleaners, The Angelus - serene rural dignity
   - When to prioritize: Rural/peaceful/countryside settings (STRONG 80%)

7. MANET (마네) - BEST for urban/modern scenes
   - Specialty: Modern Paris life, café scenes, urban sophistication
   - Best for: Urban settings, modern atmosphere, café/city backgrounds
   - Signature: Olympia, A Bar at the Folies-Bergère - modern realism
   - When to prioritize: Clear urban/modern/city context (70%)

🎯 CRITICAL DECISION LOGIC:
- Photo is STATIC, BALANCED, FORMAL → Choose Neoclassicism (David or Ingres)
- Photo is DYNAMIC, EMOTIONAL, DRAMATIC → Choose Romanticism (Turner/Friedrich/Delacroix)
- Photo is RURAL, PEACEFUL → Choose Realism - Millet (80%)
- Photo is URBAN, MODERN → Choose Realism - Manet (70%)
- Landscape → ALWAYS Romanticism (Turner 75% or Friedrich 70%)
`;
}

function getNeoclassicismVsRomanticismVsRealismHints(photoAnalysis) {
  const { subject, count, mood, composition, shot_type, gender } = photoAnalysis;
  
  // 초상화 → 고야 최우선 (낭만주의)
  if (count === 1 && (shot_type === 'portrait' || shot_type === 'upper_body')) {
    // 여성 초상화 → 고야 강력 추천
    if (gender === 'female') {
      return `
🎯 STRONG RECOMMENDATION: ROMANTICISM - GOYA (75%)
Female portrait - Goya's "La Maja Vestida" elegant style!
Spanish romantic elegance with psychological depth.
Alternative: Ingres (Neoclassicism) for pure beauty, but Goya preferred.
`;
    }
    // 남성 초상화도 고야 우선
    return `
🎯 STRONG RECOMMENDATION: ROMANTICISM - GOYA (70%)
Portrait detected - Goya's psychological portrait mastery!
Deep character study with dramatic Spanish lighting.
Alternative: David (Neoclassicism) for formal/heroic, but Goya preferred.
`;
  }
  
  // 시골/농촌 → 사실주의 (밀레)
  if (subject.includes('rural') || subject.includes('countryside') || subject.includes('farm')) {
    return `
🎯 STRONG: REALISM - MILLET (80%)
Rural/countryside = Realism territory!
Millet's serene rural dignity is supreme.
NEVER use Neoclassicism or Romanticism for rural scenes.
`;
  }
  
  // 도시/현대 → 사실주의 (마네)
  if (subject.includes('urban') || subject.includes('city') || subject.includes('café')) {
    return `
🎯 STRONG: REALISM - MANET (70%)
Urban/modern = Realism!
Manet's modern Paris sophistication perfect.
`;
  }
  
  // 풍경 → 낭만주의 (터너)
  if (subject === 'landscape') {
    return `
🎯 STRONG: ROMANTICISM - TURNER (75%)
Landscape = Romanticism territory!
Turner's atmospheric sublime light is supreme.
NEVER use Neoclassicism for landscapes.
`;
  }
  
  // 어둡고 심리적인 장면 → 낭만주의 (고야)
  if (mood === 'dark' || mood === 'psychological' || subject.includes('night')) {
    return `
🎯 STRONG: ROMANTICISM - GOYA (70%)
Dark/psychological mood = Goya territory!
Spanish romantic darkness and human truth.
Perfect for portraits with psychological depth.
`;
  }
  
  // 여러 명 + 역동적 → 낭만주의 (들라크루아)
  if (count >= 2 && (mood === 'dramatic' || mood === 'energetic')) {
    return `
🎯 ROMANTICISM - DELACROIX (70%)
Dramatic multi-person action = Romanticism!
Revolutionary energy and passion.
`;
  }
  
  // 격식 있는 정적인 초상화 → 신고전주의 (다비드)
  if ((shot_type === 'portrait' || shot_type === 'upper_body') && 
      (composition === 'balanced' || mood === 'formal')) {
    return `
🎯 NEOCLASSICISM - DAVID (70%)
Formal balanced portrait = Neoclassicism!
Cold perfection and heroic dignity.
Unless dynamic/emotional → then Romanticism.
`;
  }
  
  // 우아한 여성 초상화 → 고야 우선, 앵그르 대안
  if (subject === 'female' && (mood === 'elegant' || mood === 'graceful')) {
    return `
🎯 PRIMARY: ROMANTICISM - GOYA (La Maja style) OR
ALTERNATIVE: NEOCLASSICISM - INGRES (smooth perfection)
Goya offers Spanish romantic elegance with depth.
Ingres offers idealized classical beauty.
`;
  }
  
  return `
🎯 DECISION GUIDE:
- Rural/Countryside → REALISM (Millet 80%)
- Urban/Modern → REALISM (Manet 70%)
- Static/Balanced/Formal → NEOCLASSICISM (David/Ingres)
- Dynamic/Emotional/Dramatic → ROMANTICISM (Turner/Friedrich/Delacroix)
- Landscape → ALWAYS Romanticism (Turner 75%)
`;
}

// 인상주의 (4명)
function getImpressionismGuidelines() {
  return `
Available Impressionism Artists (4명):

1. RENOIR (르누아르) ⭐⭐⭐⭐ STRONGEST - Best for portraits (35%)
   - Specialty: SOFT WARM figures in dappled sunlight, joyful atmosphere, peachy skin tones
   - Best for: ALL portraits (indoor/outdoor), happy people, sunlit gatherings, festive scenes
   - Signature: "Luncheon of the Boating Party", "Dance at Le Moulin de la Galette"
   - When to prioritize: Most portrait cases (35%)
   - CRITICAL: Soft feathery brushstrokes, warm peachy skin tones work BEST in AI

2. DEGAS (드가) ⭐⭐⭐ Best for movement AND composition (30%)
   - Specialty: Movement capture, unusual angles, dynamic compositions, ballet dancers
   - Best for: Action shots, dance, sports, movement, diagonal compositions, interesting angles
   - Signature: Ballet rehearsals - movement frozen in time, asymmetric cropping
   - When to prioritize: Movement/action/dance OR unique compositional angles (30%)
   - CRITICAL: Degas excels at both MOVEMENT and COMPOSITION

3. MONET (모네) ⭐⭐ Good for landscapes (25%)
   - Specialty: Light effects, outdoor atmosphere, water reflections
   - Best for: Landscapes, gardens, water scenes (NOT portraits)
   - Signature landscapes: "Water Lilies", "Impression, Sunrise"
   - When to prioritize: Pure landscapes without people (25%)
   - Note: Impressionist hazy effects can be challenging for AI

4. CAILLEBOTTE (칼리보트) ⭐ Urban specialist (20%)
   - Specialty: Modern urban scenes, dramatic perspective, city life
   - Best for: City backgrounds, male portraits, geometric compositions
   - Signature works: "Paris Street, Rainy Day", "The Floor Scrapers"
   - When to prioritize: Urban/city scenes (80%), male portraits (35%)

🎯 CRITICAL DECISION LOGIC:
- Female/child portraits → RENOIR (35%) ⭐⭐⭐⭐ PRIMARY
- Male portraits → CAILLEBOTTE (35%) ⭐⭐⭐ (modern urban men)
- Movement/action/interesting angles → DEGAS (30%) ⭐⭐⭐
- Natural landscapes (no people) → MONET (50%) ⭐⭐
- Urban/city scenes → CAILLEBOTTE (80%) ⭐⭐⭐⭐
`;
}

function getImpressionismHints(photoAnalysis) {
  const { subject, count, mood, shot_type } = photoAnalysis;
  
  // 인물 사진 → 르누아르 (35%) 우선!
  if (count >= 1 && (shot_type === 'portrait' || shot_type === 'upper_body' || shot_type === 'full_body')) {
    return `
🎯 STRONG RECOMMENDATION: RENOIR (35%)
Portrait detected - RENOIR's soft warm style works BEST in AI!
Soft feathery brushstrokes, warm peachy skin tones.
"Luncheon of the Boating Party" style for all portraits.
Alternative: Degas (30%) for interesting angles/movement.
`;
  }
  
  // 움직임/춤/액션 → 드가 (30%)
  if (subject.includes('movement') || subject.includes('dance') || subject.includes('action') || 
      subject.includes('sport') || shot_type === 'action') {
    return `
🎯 STRONG RECOMMENDATION: DEGAS (30%)
Movement/dance/action is Degas's unique strength!
His ballet-like capture of motion is distinctive.
Also excellent for diagonal compositions and unusual angles.
`;
  }
  
  // 풍경 (인물 없음) → 모네 (25%)
  if (count === 0 && (subject === 'landscape' || subject.includes('water') || subject.includes('garden'))) {
    return `
🎯 RECOMMENDATION: MONET (25%)
Pure landscape (no people) - Monet specialty.
Water lilies, garden scenes, light on water.
Note: Impressionist hazy effects may vary in AI.
`;
  }
  
  // 행복한 사교 장면 → 르누아르 (35%)
  if (count >= 2 && (mood === 'happy' || mood === 'joyful')) {
    return `
🎯 STRONG RECOMMENDATION: RENOIR (35%)
Happy social gathering - Renoir's joyful atmosphere!
Warm sunlit people, festive scenes.
"Dance at Le Moulin de la Galette" style.
`;
  }
  
  return `
🎯 Priority order:
- Female/child portraits → RENOIR (35%) - warm soft style
- Male portraits → CAILLEBOTTE (35%) - modern urban men
- Movement/angles → DEGAS (30%)
- Natural landscapes → MONET (50%)
- Urban/city scenes → CAILLEBOTTE (80%)
`;
}

// 후기인상주의 (5명) - v48 간소화
function getPostImpressionismGuidelines() {
  return `
Available Post-Impressionism Artists (4명):

1. VAN GOGH (35%) - Swirling impasto brushstrokes, intense emotional colors, turbulent energy (Starry Night, Self-Portraits, Bedroom in Arles)
2. GAUGUIN (30%) - Flat bold colors, primitive exotic Tahitian style, decorative patterns (Where Do We Come From?, Tahitian Women)
3. CÉZANNE (20%) - Geometric structured forms, analytical approach, solid volumes (Still Life with Apples, Mont Sainte-Victoire)
4. SIGNAC (15%) - POINTILLIST tiny dots, bright Mediterranean sunlight, vibrant colors (The Port of Saint-Tropez, Portrait of Félix Fénéon)

Choose the BEST artist based on photo analysis.
Respect approximate percentages for variety.
`;
}

function getPostImpressionismHints(photoAnalysis) {
  return `
Use the guidelines above. Consider:
- Photo type (portrait, landscape, still life)
- Mood and atmosphere
- Respect approximate percentages for variety
AI decides freely based on overall photo analysis.
`;
}

// 야수파 (3명) ⭐ v42 NEW
function getFauvismGuidelines() {
  return `
Available Fauvism Artists (3명):

1. MATISSE (마티스) ⭐⭐⭐ STRONG for portraits and interiors (35%)
   - Specialty: Pure bold colors, decorative flat patterns, joyful harmonious compositions
   - Best for: Most photos, especially people, interiors, calm atmosphere
   - Signature: The Dance, La Desserte - flat decorative color harmony
   - When to prioritize: Most Fauvism cases (35%)
   - Note: Also available in Masters collection

2. DERAIN (드랭) ⭐⭐⭐ STRONG for landscapes (35%)
   - Specialty: Bold landscape colors, vivid natural scenery, strong contrasts
   - Best for: Landscapes, trees, outdoor nature, bright scenery
   - Signature: Charing Cross Bridge - bold landscape colors
   - When to prioritize: Clear landscape/outdoor scene (35%)

3. VLAMINCK (블라맹크) ⭐⭐⭐ STRONG for dramatic colors (30%)
   - Specialty: Violent expressive colors, turbulent brushwork, emotional intensity
   - Best for: Dramatic mood, intense emotions, stormy atmosphere
   - Signature: Most violent Fauvist colors - emotional explosions
   - When to prioritize: Dramatic/intense emotional mood (30%)

🎯 CRITICAL DECISION LOGIC - BALANCED DISTRIBUTION:
- Most photos/portraits → MATISSE (35%) - versatile, harmonious
- Landscape/outdoor → DERAIN (35%) - landscape specialist
- Dramatic/intense mood → VLAMINCK (30%) - most emotional
All three artists equally represent Fauvism's bold colors!
`;
}

function getFauvismHints(photoAnalysis) {
  const { subject, mood, shot_type } = photoAnalysis;
  
  // 풍경 → 드랭 (35%)
  if (subject === 'landscape' || subject.includes('outdoor') || subject.includes('nature')) {
    return `
🎯 STRONG: DERAIN (35%)
Landscape/outdoor = Derain specialty!
Bold landscape colors and vivid natural scenery.
Matisse also excellent (35%) for decorative approach.
`;
  }
  
  // 극적/강렬한 분위기 → 블라맹크 (30%)
  if (mood === 'dramatic' || mood === 'intense' || mood === 'stormy') {
    return `
🎯 RECOMMENDATION: VLAMINCK (30%)
Dramatic/intense mood = Vlaminck!
Most violent and emotional Fauvist colors.
`;
  }
  
  // 기본값 → 마티스 (35%)
  return `
🎯 BALANCED DISTRIBUTION:
- Most photos/portraits → MATISSE (35%)
- Landscape/outdoor → DERAIN (35%)
- Dramatic mood → VLAMINCK (30%)

Matisse is versatile and harmonious for people/interiors.
The Dance and La Desserte style - pure color harmony.
Note: Matisse also available in Masters collection.
All three artists equally powerful for Fauvism!
`;
}

// 표현주의 (5명)
function getExpressionismGuidelines() {
  return `
Available Expressionism Artists (4명):

1. MUNCH (뭉크) ⭐⭐⭐ STRONG for emotional portraits (30%)
   - Specialty: Existential anxiety, psychological tension, swirling distorted forms
   - Best for: Emotional portraits with depth, anxious expressions, dramatic scenes
   - Signature: "The Scream" - iconic anxiety and modern alienation
   - When to prioritize: Emotional/dramatic portraits (30%)
   - Note: Also available in Masters collection

2. KOKOSCHKA (코코슈카) ⭐⭐⭐ STRONG for psychological portraits (30%)
   - Specialty: Intense psychological portraits, violent brushstrokes, inner turmoil
   - Best for: Deep character portraits, emotional intensity, raw expression
   - Signature: "The Bride of the Wind" - turbulent emotional portraits
   - When to prioritize: Portraits needing psychological depth (30%)
   - CRITICAL: Rough expressive brushwork reveals inner psyche

3. KIRCHNER (키르히너) ⭐⭐⭐ STRONG for urban expressionism (25%)
   - Specialty: JAGGED ANGULAR FORMS, urban anxiety, street energy
   - Best for: Urban settings, bold color contrasts, city scenes, angular compositions
   - Signature: "Street Scenes" - angular urban life
   - When to prioritize: Urban/city backgrounds or angular aesthetic (25%)

4. KANDINSKY (칸딘스키) ⭐⭐ (15%)
   - Specialty: Abstract expressionism, spiritual compositions, pure color emotion
   - Best for: Abstract interpretation, spiritual atmosphere, emotional abstraction
   - Signature: "Compositions" - non-representational emotional color
   - When to prioritize: Abstract/spiritual desired (15%)

🎯 CRITICAL DECISION LOGIC - 4 ARTISTS:
- Emotional portraits → MUNCH (30%, also in Masters)
- Psychological depth → KOKOSCHKA (30%)
- Urban/city/angular → KIRCHNER (25%)
- Abstract/spiritual → KANDINSKY (15%)
Strong core of 4 Expressionist artists!
`;
}

function getExpressionismHints(photoAnalysis) {
  const { count, shot_type, expression, background, subject, mood } = photoAnalysis;
  
  // 초상화 → 뭉크 (30%) 또는 코코슈카 (30%)
  if (count === 1 && (shot_type === 'portrait' || shot_type === 'upper_body')) {
    // 심리적 깊이 필요 → 코코슈카 고려
    if (mood === 'intense' || mood === 'psychological' || mood === 'turbulent') {
      return `
🎯 STRONG RECOMMENDATION: KOKOSCHKA (30%)
Deep psychological portrait - Kokoschka's violent brushwork!
Equally strong as Munch for psychological portraits.
`;
    }
    
    // 감정적/불안 → 뭉크
    return `
🎯 STRONG RECOMMENDATION: MUNCH (30%)
Emotional portrait - Munch's existential anxiety!
The Scream-like intensity even in calm subjects.
Alternative: Kokoschka (30%) equally strong for portraits.
`;
  }
  
  // 도시 배경 또는 각진 구도 → 키르히너 (25%)
  if (background === 'urban' || background === 'city' || subject.includes('street') ||
      subject.includes('angular') || subject.includes('geometric')) {
    return `
🎯 STRONG RECOMMENDATION: KIRCHNER (25%)
Urban/city/angular setting matches Kirchner's jagged forms!
Street scenes and angular expressionism specialty.
`;
  }
  
  // 추상적 → 칸딘스키 (15%)
  if (subject === 'abstract' || subject === 'unclear' || mood === 'spiritual') {
    return `
🎯 RECOMMENDATION: KANDINSKY (15%)
Abstract/spiritual mood suits Kandinsky's non-representational approach.
Pure emotional color without representational forms.
`;
  }
  
  return `
🎯 BALANCED DISTRIBUTION - Choose based on photo type:
- Emotional/anxious portraits → MUNCH (30%)
- Deep psychological portraits → KOKOSCHKA (30%)
- Urban/angular scenes → KIRCHNER (25%)
- Abstract/spiritual → KANDINSKY (15%)
Strong core of 4 Expressionist masters!
`;
}

// 20세기 모더니즘 (7명 - 3개 세부 사조)
// 제외: 뒤샹(개념미술), 폴록/로스코(완전추상), 만 레이(사진작가), 프리다/달리(마스터 전용), 브라크(피카소 중복)
function getModernismGuidelines() {
  return `
⚠️ CRITICAL: You MUST select ONLY from the 7 artists listed below!
DO NOT select any other artist (like Boccioni, Kandinsky, Mondrian, Man Ray, Dalí, Frida Kahlo, Braque, etc.)

Available 20th Century Modernism Artists (7명):

=== CUBISM 입체주의 ===
1. PICASSO (피카소) - Geometric fragmented forms, multiple perspectives

=== SURREALISM 초현실주의 ===
2. MAGRITTE (마그리트) - Philosophical paradox, multiplication of figures
3. MIRÓ (미로) - Playful biomorphic forms, childlike symbols, primary colors (LANDSCAPE/STILL LIFE ONLY)
4. CHAGALL (샤갈) - Soft dreamy floating figures, muted pastel colors

=== POP ART 팝아트 ===
5. WARHOL (워홀) - Silkscreen 4-panel grid, bold flat colors
6. LICHTENSTEIN (리히텐슈타인) - Ben-Day dots, comic book style
7. KEITH HARING (키스 해링) - Bold black outlines, dancing figures

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 PHOTO TYPE WEIGHT GUIDE (사진 유형별 비중)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🧑 SINGLE PORTRAIT (단독 인물):
   PICASSO 35%, MAGRITTE 25%, WARHOL 25%, LICHTENSTEIN 10%, HARING 5%
   ❌ CHAGALL, MIRÓ 제외

💑 COUPLE (커플 2인):
   PICASSO 30%, CHAGALL 25%, MAGRITTE 20%, WARHOL 15%, LICHTENSTEIN 10%
   ❌ HARING, MIRÓ 제외

👥 GROUP 3+ (단체 3명 이상):
   PICASSO 35%, HARING 35%, CHAGALL 15%, LICHTENSTEIN 15%
   ❌ WARHOL, MAGRITTE, MIRÓ 제외

🏞️ LANDSCAPE (풍경):
   PICASSO 25%, MAGRITTE 25%, CHAGALL 20%, MIRÓ 15%
   ❌ WARHOL, LICHTENSTEIN, HARING 제외

🍎 STILL LIFE (정물):
   PICASSO 35%, MAGRITTE 25%, MIRÓ 20%, WARHOL 20%
   ❌ CHAGALL, LICHTENSTEIN, HARING 제외

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ FINAL REMINDER: ONLY these 7 artists are valid:
PICASSO, MAGRITTE, MIRÓ, CHAGALL, WARHOL, LICHTENSTEIN, KEITH HARING
`;
}

function getModernismHints(photoAnalysis) {
  const { count, subject } = photoAnalysis;
  
  // ========================================
  // 네가티브 원칙 기반 힌트 (단순화)
  // ========================================
  
  let negativeWarnings = '';
  
  // 3명 이상 단체 사진
  if (count >= 3) {
    negativeWarnings = `
⚠️ GROUP PHOTO DETECTED (${count} people):
❌ DO NOT select WARHOL (4-grid doesn't work with groups)
❌ DO NOT select MAGRITTE (multiplication effect confusing with groups)
❌ DO NOT select MIRÓ (abstract symbols, not suitable for portraits)

✅ VALID OPTIONS for groups:
- PICASSO: Cubist fragmentation of multiple figures
- KEITH HARING: Bold outlines, dynamic dancing figures (best for energetic/fun groups)
- CHAGALL: Dreamy floating figures (best for romantic/family groups)
- LICHTENSTEIN: Comic book style (best for dramatic/action groups)

Choose based on the GROUP'S MOOD and ENERGY!
`;
  }
  
  // 커플 사진
  if (count === 2) {
    negativeWarnings = `
💑 COUPLE PHOTO DETECTED:
❌ DO NOT select HARING (too energetic for romantic couples)
❌ DO NOT select MIRÓ (abstract symbols, not suitable for portraits)

✅ VALID OPTIONS for couples:
- CHAGALL: Dreamy floating lovers (best for romantic mood)
- PICASSO: Merged/overlapping faces (best for passionate/artistic)
- MAGRITTE: Philosophical mystery (best for elegant/formal)
- WARHOL: Pop art repetition (best for modern/fun)
- LICHTENSTEIN: Comic romance (best for playful)

Choose based on the COUPLE'S MOOD!
`;
  }
  
  // 단독 인물
  if (count === 1) {
    negativeWarnings = `
🧑 SINGLE PORTRAIT DETECTED:
❌ DO NOT select CHAGALL (romantic style needs couple)
❌ DO NOT select MIRÓ (abstract symbols, not suitable for portraits)

✅ VALID OPTIONS for single portrait:
- PICASSO: Cubist face fragmentation (best for artistic/bold)
- MAGRITTE: Apple mystery or multiplication (best for philosophical)
- WARHOL: 4-panel pop art grid (best for iconic/colorful)
- LICHTENSTEIN: Comic book dots (best for dramatic expression)
- HARING: Bold outline figure (best for dynamic pose)

Choose based on the PERSON'S EXPRESSION and POSE!
`;
  }
  
  // 동물만 있는 사진
  const isAnimalOnly = (subject && (subject.includes('animal') || subject.includes('pet') || 
                        subject.includes('dog') || subject.includes('cat') || 
                        subject.includes('bird'))) && (!count || count === 0);
  if (isAnimalOnly) {
    negativeWarnings += `
⚠️ ANIMAL-ONLY PHOTO DETECTED:
❌ DO NOT select CHAGALL (romantic/human-focused style, not suitable for animals alone)
`;
  }
  
  // 풍경 사진
  const isLandscape = subject && (subject.includes('landscape') || subject.includes('nature') || 
                      subject.includes('mountain') || subject.includes('sea') || 
                      subject.includes('sky')) && (!count || count === 0);
  if (isLandscape) {
    negativeWarnings = `
🏞️ LANDSCAPE DETECTED:
❌ DO NOT select WARHOL (portrait-focused 4-grid)
❌ DO NOT select LICHTENSTEIN (comic style for people)
❌ DO NOT select HARING (figure-focused)

✅ VALID OPTIONS for landscape:
- PICASSO: Cubist geometric landscape
- MAGRITTE: Surreal dreamscape
- CHAGALL: Floating village scene
- MIRÓ: Playful biomorphic symbols

Choose based on the LANDSCAPE'S MOOD!
`;
  }
  
  return `
${negativeWarnings}

🎯 Choose the BEST artist based on photo type!

Each artist has unique strengths:
- PICASSO: Geometric fragmentation, multiple viewpoints, cubist deconstruction
- MAGRITTE: Philosophical paradox, multiplication, apple-over-face mystery
- MIRÓ: Playful biomorphic shapes, stars/moons, primary colors (LANDSCAPE/STILL LIFE ONLY)
- CHAGALL: Soft dreamy floating figures, muted pastels, romantic nostalgia
- WARHOL: 4-panel grid, bold flat pop colors, silkscreen repetition
- LICHTENSTEIN: Ben-Day dots, comic book style, thick black outlines
- KEITH HARING: Bold black outlines, dancing figures, radiant energy lines

Return the artist that will create the most compelling transformation!
`;
}

// ========================================
// 모더니즘 화가별 개별 프롬프트 (다른 화가 언급 없음!)
// ========================================
function getModernismArtistPrompt(artistName) {
  const genderRule = 'ABSOLUTE GENDER AND ETHNICITY REQUIREMENT: If photo shows MALE - MUST have MASCULINE face with STRONG JAW, male bone structure, NO feminine features, DO NOT feminize, DO NOT soften, DO NOT make delicate, KEEP AS MAN. If photo shows FEMALE - MUST have FEMININE face with SOFT features, female bone structure, NO masculine features, DO NOT masculinize, DO NOT make rough, KEEP AS WOMAN. PRESERVE ORIGINAL ETHNICITY AND SKIN COLOR EXACTLY - DO NOT change race, DO NOT lighten or darken skin, Asian must stay Asian, Caucasian must stay Caucasian, African must stay African. ';
  const paintTexture = ' MUST look like HAND-PAINTED artwork with VISIBLE PAINT TEXTURE, NOT photorealistic, NOT smooth digital, NOT AI-generated photo.';
  const prompts = {
    'PICASSO': genderRule + 'Cubist painting by Pablo Picasso: SINGLE UNIFIED IMAGE not divided into panels, GEOMETRIC FRAGMENTED forms broken into angular planes, MULTIPLE SIMULTANEOUS PERSPECTIVES showing different angles at once, show NOSE from SIDE PROFILE while BOTH EYES visible from FRONT VIEW, Les Demoiselles d\'Avignon style, earth tone palette (ochre sienna brown olive grey), analytical cubist dissection, VISIBLE BRUSHSTROKES with rough paint texture, painterly NOT illustrative, Picasso Cubist masterpiece quality' + paintTexture,
    
    'MAGRITTE': genderRule + 'Surrealist painting by René Magritte: philosophical visual paradox, The Son of Man style with mysterious object partially obscuring face, or Golconda style MULTIPLICATION of same figure repeated in grid pattern floating/falling through sky, bowler hat gentleman aesthetic, smooth but VISIBLE oil painting technique with subtle brushwork, dreamlike impossible scenarios, thought-provoking conceptual art, Belgian Surrealist masterpiece quality' + paintTexture,
    
    'MIRÓ': genderRule + 'Abstract painting by Joan Miró: playful BIOMORPHIC SHAPES floating on canvas, childlike symbols (stars moons eyes birds), PRIMARY COLORS (red blue yellow) on white or neutral background, spontaneous automatic drawing style, whimsical dreamlike universe, black calligraphic lines, Catalan Surrealist fantasy, joyful cosmic abstraction, VISIBLE BRUSHSTROKES and paint texture, Miró masterpiece quality' + paintTexture,
    
    'CHAGALL': genderRule + 'Dreamlike painting by Marc Chagall: FLOATING FIGURES defying gravity in romantic nocturnal sky, soft MUTED PASTEL colors (lavender pale blue rose), nostalgic village scenes with tilted houses, lovers embracing mid-air, symbolic imagery (violins roosters flowers), poetic lyrical atmosphere, Jewish folklore dreamscape, VISIBLE BRUSHWORK with soft feathery strokes, Chagall romantic masterpiece quality' + paintTexture,
    
    'WARHOL': genderRule + 'Pop Art by Andy Warhol: MUST create 2x2 FOUR-PANEL GRID layout, the EXACT SAME PERSON or OBJECT from the ORIGINAL PHOTO repeated 4 times - once in each quadrant, each of the 4 panels with DIFFERENT BOLD COLOR scheme (hot pink cyan yellow orange electric blue lime green), HIGH CONTRAST silkscreen printing effect, FLAT graphic colors with NO gradients, DO NOT draw Marilyn Monroe - draw only the person from the original photo, visible ink texture and print imperfections, Warhol Pop Art masterpiece quality',
    
    'LICHTENSTEIN': genderRule + 'Pop Art by Roy Lichtenstein: comic book style with VISIBLE BEN-DAY DOTS pattern throughout entire image, THICK BLACK OUTLINES around all forms, PRIMARY COLORS (red yellow blue) with white, speech bubble aesthetic, dramatic comic panel composition, halftone printing effect, bold graphic simplification, visible paint texture on dots, Lichtenstein Pop Art masterpiece quality',
    
    'KEITH HARING': genderRule + 'Street art by Keith Haring: BOLD CONTINUOUS BLACK OUTLINES, simplified dancing human figures with RADIANT ENERGY LINES emanating from bodies, flat bright colors (red yellow blue green), dynamic movement and rhythm, subway graffiti aesthetic, joyful kinetic energy, interlocking figures, visible spray paint or marker texture, Keith Haring street art masterpiece quality'
  };
  
  // 아티스트 이름 정규화
  const normalizedName = artistName.toUpperCase().trim();
  
  // 매칭
  if (normalizedName.includes('PICASSO') || normalizedName.includes('피카소')) return prompts['PICASSO'];
  if (normalizedName.includes('MAGRITTE') || normalizedName.includes('마그리트')) return prompts['MAGRITTE'];
  if (normalizedName.includes('MIRÓ') || normalizedName.includes('MIRO') || normalizedName.includes('미로')) return prompts['MIRÓ'];
  if (normalizedName.includes('CHAGALL') || normalizedName.includes('샤갈')) return prompts['CHAGALL'];
  if (normalizedName.includes('WARHOL') || normalizedName.includes('워홀')) return prompts['WARHOL'];
  if (normalizedName.includes('LICHTENSTEIN') || normalizedName.includes('리히텐슈타인')) return prompts['LICHTENSTEIN'];
  if (normalizedName.includes('HARING') || normalizedName.includes('해링') || normalizedName.includes('키스')) return prompts['KEITH HARING'];
  
  // 기본값 (피카소)
  return prompts['PICASSO'];
}


// ========================================
// 🎯 사조별 화가 개별 프롬프트 함수들
// 다른 화가 언급 없이 선택된 화가만 포함!
// ========================================

// 고대 그리스-로마 스타일별 프롬프트
function getAncientArtistPrompt(styleName) {
  const prompts = {
    'CLASSICAL SCULPTURE': 'Ancient Greek-Roman MARBLE SCULPTURE: PURE WHITE CARRARA MARBLE throughout entire image, ALL skin becomes smooth polished marble with subtle veining, ALL clothing transformed to carved marble drapery with realistic stone fabric folds, MONOCHROMATIC white/cream/grey tones ONLY, heroic classical proportions like Discobolus or Augustus of Prima Porta, MUSEUM PEDESTAL DISPLAY with neutral grey background, dramatic sculptural lighting, frozen dynamic moment in eternal marble, NOT colorful NOT mosaic, NOT photorealistic NOT AI-generated, ancient sculpture masterpiece quality',
    
    'ROMAN MOSAIC': 'Ancient Roman floor MOSAIC: LARGE VISIBLE TESSERAE TILES (20-30mm each square stone pieces), THICK DARK GROUT LINES clearly visible between EVERY tile creating grid pattern, LIMITED ANCIENT COLOR PALETTE (terracotta orange, ochre yellow, umber brown, ivory white, slate blue, olive green), Pompeii villa floor style like Alexander Mosaic, each tile INDIVIDUALLY DISTINGUISHABLE, NOT smooth painting NOT marble sculpture, NOT photorealistic NOT AI-generated, authentic Roman mosaic craftsmanship'
  };
  
  const normalized = styleName.toUpperCase().trim();
  if (normalized.includes('SCULPTURE') || normalized.includes('CLASSICAL')) return prompts['CLASSICAL SCULPTURE'];
  if (normalized.includes('MOSAIC') || normalized.includes('ROMAN')) return prompts['ROMAN MOSAIC'];
  return prompts['CLASSICAL SCULPTURE'];
}

// 중세 스타일별 프롬프트
function getMedievalArtistPrompt(styleName) {
  const prompts = {
    'BYZANTINE': 'Byzantine sacred icon painting: CIRCULAR GOLDEN HALO (nimbus) behind head as bright radiating disc, ENTIRE BACKGROUND must be SHIMMERING GOLD LEAF mosaic with visible tiny square tesserae tiles, flat hieratic frontal pose with LARGE SOLEMN EYES gazing directly at viewer, rich jewel colors (deep red, royal blue, purple) for robes, gold decorative patterns on clothing, Eastern Orthodox icon style like Christ Pantocrator, NOT Gothic NOT Islamic, NOT photorealistic NOT AI-generated, Byzantine masterpiece quality',
    
    'GOTHIC': 'Gothic cathedral STAINED GLASS window style: THICK BLACK LEAD LINES (cames) dividing image into segments like actual stained glass, JEWEL-TONE TRANSLUCENT COLORS (ruby red, sapphire blue, emerald green, amber gold) as if light shining through colored glass, FLAT TWO-DIMENSIONAL medieval aesthetic, elongated vertical figures, Gothic pointed arch frame, divine holy light streaming through, NOT Byzantine gold NOT mosaic, NOT photorealistic NOT AI-generated, Gothic stained glass masterpiece quality',
    
    'ISLAMIC MINIATURE': 'Persian/Ottoman COURT MINIATURE painting: intricate delicate details with fine brushwork VISIBLE, vibrant jewel colors (ruby red, sapphire blue, emerald green, gold), flat decorative composition, ornamental floral patterns and arabesques, courtly elegant aesthetic, richly decorated background, luxurious manuscript illumination quality, NOT Byzantine NOT Gothic NOT geometric pattern, NOT photorealistic NOT AI-generated, Islamic miniature masterpiece quality'
  };
  
  const normalized = styleName.toUpperCase().trim();
  if (normalized.includes('BYZANTINE') || normalized.includes('비잔틴')) return prompts['BYZANTINE'];
  if (normalized.includes('GOTHIC') || normalized.includes('고딕')) return prompts['GOTHIC'];
  if (normalized.includes('ISLAMIC') || normalized.includes('MINIATURE') || normalized.includes('이슬람')) return prompts['ISLAMIC MINIATURE'];
  return prompts['BYZANTINE'];
}

// 르네상스 화가별 프롬프트
function getRenaissanceArtistPrompt(artistName, subjectType = 'person') {
  const genderRule = 'ABSOLUTE GENDER AND ETHNICITY REQUIREMENT: If photo shows MALE - MUST have MASCULINE face with STRONG JAW, male bone structure, NO feminine features, DO NOT feminize, DO NOT soften, DO NOT make delicate, KEEP AS MAN. If photo shows FEMALE - MUST have FEMININE face with SOFT features, female bone structure, NO masculine features, DO NOT masculinize, DO NOT make rough, KEEP AS WOMAN. PRESERVE ORIGINAL ETHNICITY AND SKIN COLOR EXACTLY - DO NOT change race, DO NOT lighten or darken skin, Asian must stay Asian, Caucasian must stay Caucasian, African must stay African. ';
  const paintTexture = ' MUST look like HAND-PAINTED oil painting with VISIBLE PAINT TEXTURE and brushwork, NOT photorealistic, NOT smooth digital, NOT AI-generated photo.';
  const prompts = {
    'LEONARDO DA VINCI': genderRule + 'painting by Leonardo da Vinci: EXTREME SFUMATO technique with ALL EDGES completely SOFT AND BLURRED like smoke or fog, ZERO SHARP LINES anywhere, every boundary DISSOLVED into hazy atmospheric mist, faces emerging from smoky darkness, Mona Lisa and Virgin of the Rocks style MYSTERIOUS HAZE, warm golden-brown Renaissance palette, SOFT FOCUS throughout like looking through gauze, oil painting with subtle glazing layers and visible brushwork in background, NOT sharp NOT digital, sfumato masterpiece quality' + paintTexture,
    
    'TITIAN': genderRule + 'painting by Titian Venetian Renaissance: RICH WARM COLORS with glowing golden flesh tones, loose expressive brushwork visible especially in fabrics, dramatic atmospheric backgrounds, sensuous rendering of silk velvet and skin textures, Venetian colorito tradition with color over line, Portrait of a Man style dignified poses, deep reds golds and earth tones, luminous glazing technique, Titian masterpiece quality' + paintTexture,
    
    'MICHELANGELO': genderRule + 'painting by Michelangelo: HEROIC SCULPTURAL FIGURES with powerful muscular anatomy, Sistine Chapel style monumental grandeur, dramatic foreshortening and dynamic poses, strong modeling with clear light and shadow, idealized human form with classical proportions, rich saturated colors, architectural sense of space, VISIBLE BRUSHSTROKES with fresco-like texture, Michelangelo masterpiece quality' + paintTexture,
    
    'RAPHAEL': genderRule + 'painting by Raphael: PERFECT HARMONIOUS BEAUTY with idealized graceful figures, serene balanced compositions, sweet gentle expressions, clear luminous colors, elegant flowing drapery, School of Athens style classical perfection, soft modeling with gentle transitions, VISIBLE soft brushwork, divine serenity and grace, Raphael masterpiece quality' + paintTexture,
    
    'BOTTICELLI': genderRule + 'painting by Sandro Botticelli: GRACEFUL FLOWING LINES with elegant elongated figures, Birth of Venus and Primavera style ethereal beauty, delicate pale skin with soft rose tints, FLOWING GOLDEN HAIR with intricate wavy patterns, sheer diaphanous fabrics billowing in gentle breeze, sweet melancholic expressions, decorative floral backgrounds, VISIBLE tempera brushwork, Early Renaissance Florentine grace, mythological poetic atmosphere, Botticelli masterpiece quality' + paintTexture
  };
  
  const normalized = artistName.toUpperCase().trim();
  if (normalized.includes('LEONARDO') || normalized.includes('DA VINCI') || normalized.includes('다빈치') || normalized.includes('레오나르도')) return prompts['LEONARDO DA VINCI'];
  if (normalized.includes('TITIAN') || normalized.includes('티치아노')) return prompts['TITIAN'];
  if (normalized.includes('MICHELANGELO') || normalized.includes('미켈란젤로')) return prompts['MICHELANGELO'];
  if (normalized.includes('RAPHAEL') || normalized.includes('라파엘로')) return prompts['RAPHAEL'];
  if (normalized.includes('BOTTICELLI') || normalized.includes('보티첼리')) return prompts['BOTTICELLI'];
  return prompts['LEONARDO DA VINCI'];
}

// 바로크 화가별 프롬프트
function getBaroqueArtistPrompt(artistName, subjectType = 'person') {
  const genderRule = 'ABSOLUTE GENDER AND ETHNICITY REQUIREMENT: If photo shows MALE - MUST have MASCULINE face with STRONG JAW, male bone structure, NO feminine features, DO NOT feminize, DO NOT soften, DO NOT make delicate, KEEP AS MAN. If photo shows FEMALE - MUST have FEMININE face with SOFT features, female bone structure, NO masculine features, DO NOT masculinize, DO NOT make rough, KEEP AS WOMAN. PRESERVE ORIGINAL ETHNICITY AND SKIN COLOR EXACTLY - DO NOT change race, DO NOT lighten or darken skin, Asian must stay Asian, Caucasian must stay Caucasian, African must stay African. ';
  const paintTexture = ' MUST look like HAND-PAINTED oil painting with VISIBLE PAINT TEXTURE and brushwork, NOT photorealistic, NOT smooth digital, NOT AI-generated photo.';
  const prompts = {
    'CARAVAGGIO': genderRule + 'painting by Caravaggio: DRAMATIC TENEBRISM with extreme light-dark contrast, single theatrical spotlight illuminating figures from darkness, deep BLACK SHADOWS engulfing most of scene, intense emotional realism, rich saturated colors emerging from darkness, dramatic diagonal composition, VISIBLE BRUSHWORK with oil paint texture, raw powerful naturalism, Caravaggio masterpiece quality' + paintTexture,
    
    'REMBRANDT': genderRule + 'painting by Rembrandt: GOLDEN LUMINOUS LIGHT with warm glowing illumination, subtle light gradations revealing form from shadow, rich impasto brushwork visible in highlights, deep psychological introspection, intimate emotional depth, warm brown and gold palette, The Night Watch style dramatic lighting, THICK VISIBLE BRUSHSTROKES especially in light areas, Rembrandt masterpiece quality' + paintTexture,
    
    'VERMEER': genderRule + 'painting by Johannes Vermeer: SOFT DIFFUSED DAYLIGHT from window illuminating interior scene, quiet contemplative domestic moment, luminous pearl-like quality to skin and fabrics, intimate poetry of light, cool blue and warm yellow color harmony, exquisite rendering of light on surfaces, VISIBLE oil paint texture with soft brushwork, Vermeer masterpiece quality' + paintTexture,
    
    'VELÁZQUEZ': genderRule + 'painting by Diego Velázquez: SOPHISTICATED COURT ELEGANCE with dignified formal poses, loose confident brushwork visible up close, subtle silver-grey palette with rich blacks, atmospheric perspective creating depth, Las Meninas style complex spatial arrangement, aristocratic refinement, VISIBLE EXPRESSIVE BRUSHSTROKES, Velázquez masterpiece quality' + paintTexture
  };
  
  const normalized = artistName.toUpperCase().trim();
  if (normalized.includes('CARAVAGGIO') || normalized.includes('카라바조')) return prompts['CARAVAGGIO'];
  if (normalized.includes('REMBRANDT') || normalized.includes('렘브란트')) return prompts['REMBRANDT'];
  if (normalized.includes('VERMEER') || normalized.includes('베르메르')) return prompts['VERMEER'];
  if (normalized.includes('VELÁZQUEZ') || normalized.includes('VELAZQUEZ') || normalized.includes('벨라스케스')) return prompts['VELÁZQUEZ'];
  return prompts['CARAVAGGIO'];
}

// 로코코 화가별 프롬프트
// 로코코 화가별 프롬프트
function getRococoArtistPrompt(artistName) {
  const genderRule = 'ABSOLUTE GENDER AND ETHNICITY REQUIREMENT: If photo shows MALE - MUST have MASCULINE face with STRONG JAW, male bone structure, NO feminine features, DO NOT feminize, DO NOT soften, DO NOT make delicate, KEEP AS MAN. If photo shows FEMALE - MUST have FEMININE face with SOFT features, female bone structure, NO masculine features, DO NOT masculinize, DO NOT make rough, KEEP AS WOMAN. PRESERVE ORIGINAL ETHNICITY AND SKIN COLOR EXACTLY - DO NOT change race, DO NOT lighten or darken skin, Asian must stay Asian, Caucasian must stay Caucasian, African must stay African. ';
  const paintTexture = ' MUST look like HAND-PAINTED oil painting with VISIBLE PAINT TEXTURE and brushwork, NOT photorealistic, NOT smooth digital, NOT AI-generated photo.';
  const prompts = {
    'WATTEAU': genderRule + 'painting by Antoine Watteau: FÊTE GALANTE outdoor aristocratic gathering, elegant figures in shimmering silk costumes, soft dreamy pastoral landscape, delicate feathery brushwork VISIBLE throughout, romantic melancholic atmosphere, Pilgrimage to Cythera style poetic reverie, pale pastel colors with touches of rose and gold, theatrical graceful poses, Watteau masterpiece quality' + paintTexture,
    
    'BOUCHER': genderRule + 'painting by François Boucher: DECORATIVE BEAUTY with soft rosy flesh tones, playful mythological or pastoral scenes, light pastel palette of pink blue and cream, fluffy clouds and lush foliage, ornate Rococo decoration, sweet idealized figures, VISIBLE SOFT BRUSHWORK with delicate paint texture, Boucher masterpiece quality' + paintTexture
  };
  
  const normalized = artistName.toUpperCase().trim();
  if (normalized.includes('WATTEAU') || normalized.includes('와토')) return prompts['WATTEAU'];
  if (normalized.includes('BOUCHER') || normalized.includes('부셰')) return prompts['BOUCHER'];
  return prompts['WATTEAU'];
}

// 신고전주의/낭만주의/사실주의 화가별 프롬프트
// v59: 고야, 들라크루아, 마네 추가
function getNeoclassicismArtistPrompt(artistName) {
  const genderRule = 'ABSOLUTE GENDER AND ETHNICITY REQUIREMENT: If photo shows MALE - MUST have MASCULINE face with STRONG JAW, male bone structure, NO feminine features, DO NOT feminize, DO NOT soften, DO NOT make delicate, KEEP AS MAN. If photo shows FEMALE - MUST have FEMININE face with SOFT features, female bone structure, NO masculine features, DO NOT masculinize, DO NOT make rough, KEEP AS WOMAN. PRESERVE ORIGINAL ETHNICITY AND SKIN COLOR EXACTLY - DO NOT change race, DO NOT lighten or darken skin, Asian must stay Asian, Caucasian must stay Caucasian, African must stay African. ';
  const paintTexture = ' MUST look like HAND-PAINTED oil painting with VISIBLE PAINT TEXTURE and brushwork, NOT photorealistic, NOT smooth digital, NOT AI-generated photo.';
  const prompts = {
    // 신고전주의
    'JACQUES-LOUIS DAVID': genderRule + 'painting by Jacques-Louis David: NEOCLASSICAL PERFECTION with clear crisp outlines, heroic idealized figures in classical poses, cool restrained color palette, dramatic moral narratives, Oath of the Horatii style civic virtue, sculptural modeling, balanced symmetrical compositions, VISIBLE BRUSHWORK with oil paint texture, David Neoclassical masterpiece quality' + paintTexture,
    
    'INGRES': genderRule + 'painting by Jean-Auguste-Dominique Ingres: PERFECTLY SMOOTH FLOWING CONTOURS, porcelain-smooth skin with subtle brushwork visible in background, elegant sinuous curves and graceful elongated forms, idealized beauty, cool serene color palette, meticulous precise detail, VISIBLE oil paint texture despite smooth finish, Ingres masterpiece quality' + paintTexture,
    
    // 낭만주의
    'TURNER': genderRule + 'painting by J.M.W. Turner: ATMOSPHERIC SUBLIME with swirling mist light and color, dramatic natural phenomena, luminous golden light dissolving forms, romantic awe-inspiring landscapes, The Fighting Temeraire style emotional power, LOOSE EXPRESSIVE BRUSHWORK with thick impasto, VISIBLE PAINT TEXTURE, Turner masterpiece quality' + paintTexture,
    
    'GOYA': genderRule + 'painting by Francisco Goya: PSYCHOLOGICAL INTENSITY with penetrating gaze and inner truth revealed, dramatic chiaroscuro with deep shadows and stark contrasts, La Maja Vestida style Spanish elegance for portraits, dark romantic palette with rich blacks and warm flesh tones, unflinching honesty capturing human nature, VISIBLE ROUGH BRUSHSTROKES with expressive paint texture, court painter sophistication with underlying tension, Goya masterpiece quality' + paintTexture,
    
    'DELACROIX': genderRule + 'painting by Eugène Delacroix: PASSIONATE REVOLUTIONARY ENERGY with Liberty Leading the People style dramatic action, vivid intense colors with bold reds blues and warm golden tones, dynamic diagonal compositions with turbulent swirling movement, LOOSE EXPRESSIVE BRUSHSTROKES full of emotion with VISIBLE PAINT TEXTURE, dramatic gestures and heroic romantic intensity, Delacroix Romantic masterpiece quality' + paintTexture,
    
    // 사실주의
    'MILLET': genderRule + 'painting by Jean-François Millet: DIGNIFIED RURAL LABOR with monumental peasant figures, warm earthy palette of browns and ochres, The Gleaners style quiet nobility, soft diffused light, serene contemplative mood, VISIBLE BRUSHWORK with textured paint surface, honest depiction of agricultural life, Millet Realist masterpiece quality' + paintTexture,
    
    'MANET': genderRule + 'painting by Édouard Manet: MODERN PARIS REALISM with Olympia-style bold flat composition and striking contrasts, dramatic blacks and pure whites with minimal mid-tones, sophisticated urban café society atmosphere, frank direct confrontational gaze, LOOSE CONFIDENT BRUSHWORK with VISIBLE ENERGETIC STROKES, metropolitan elegance and modern audacity, Manet masterpiece quality' + paintTexture
  };
  
  const normalized = artistName.toUpperCase().trim();
  if (normalized.includes('DAVID') || normalized.includes('다비드')) return prompts['JACQUES-LOUIS DAVID'];
  if (normalized.includes('INGRES') || normalized.includes('앵그르')) return prompts['INGRES'];
  if (normalized.includes('TURNER') || normalized.includes('터너')) return prompts['TURNER'];
  if (normalized.includes('GOYA') || normalized.includes('고야')) return prompts['GOYA'];
  if (normalized.includes('DELACROIX') || normalized.includes('들라크루아')) return prompts['DELACROIX'];
  if (normalized.includes('MILLET') || normalized.includes('밀레')) return prompts['MILLET'];
  if (normalized.includes('MANET') || normalized.includes('마네')) return prompts['MANET'];
  return prompts['JACQUES-LOUIS DAVID'];
}

// 인상주의 화가별 프롬프트
function getImpressionismArtistPrompt(artistName, subjectType = 'person') {
  const genderRule = 'ABSOLUTE GENDER AND ETHNICITY REQUIREMENT: If photo shows MALE - MUST have MASCULINE face with STRONG JAW, male bone structure, NO feminine features, DO NOT feminize, DO NOT soften, DO NOT make delicate, KEEP AS MAN. If photo shows FEMALE - MUST have FEMININE face with SOFT features, female bone structure, NO masculine features, DO NOT masculinize, DO NOT make rough, KEEP AS WOMAN. PRESERVE ORIGINAL ETHNICITY AND SKIN COLOR EXACTLY - DO NOT change race, DO NOT lighten or darken skin, Asian must stay Asian, Caucasian must stay Caucasian, African must stay African. ';
  const prompts = {
    'RENOIR': genderRule + 'painting by Pierre-Auguste Renoir: SOFT FEATHERY BRUSHSTROKES with warm luminous glow, rosy pink flesh tones with pearly highlights, DAPPLED SUNLIGHT filtering through creating shimmering atmosphere, joyful intimate mood, loose impressionist brushwork NOT smooth NOT digital, warm harmonious colors (peach pink coral gold), VISIBLE OIL PAINT TEXTURE, Renoir masterpiece quality',
    
    'MONET': genderRule + 'painting by Claude Monet: BROKEN COLOR BRUSHSTROKES capturing fleeting light effects, SOFT HAZY ATMOSPHERIC effects like morning mist, colors BLENDED and DISSOLVED into each other, NO sharp edges, dreamy blurred boundaries, Water Lilies style light dissolution, cool blue-green palette with warm accents, everything slightly out of focus, VISIBLE PAINT TEXTURE, NOT photorealistic NOT AI-generated, Monet Impressionist masterpiece quality',
    
    'DEGAS': genderRule + 'painting by Edgar Degas: UNUSUAL CROPPED ANGLES and asymmetric compositions, capturing movement and gesture, SOFT PASTEL and oil texture with VISIBLE CHALKY STROKES, pale muted colors (soft pink peach powder blue), intimate indoor scenes, delicate precise drawing, VISIBLE PAINT TEXTURE, NOT photorealistic NOT AI-generated, Degas masterpiece quality',
    
    'CAILLEBOTTE': genderRule + 'painting by Gustave Caillebotte: MODERN URBAN REALISM with dramatic bird\'s-eye perspective, SHARP PERSPECTIVE LINES converging dramatically, Paris Street Rainy Day style city scenes, photographic clarity with impressionist color palette, elegant bourgeois figures in urban settings, wet pavement reflections, muted gray-blue urban tones with warm accents, GEOMETRIC COMPOSITION with strong diagonal lines, Floor Scrapers style working figures, VISIBLE BRUSHWORK with oil paint texture, NOT photorealistic NOT AI-generated, Caillebotte masterpiece quality'
  };
  
  const normalized = artistName.toUpperCase().trim();
  if (normalized.includes('RENOIR') || normalized.includes('르누아르')) return prompts['RENOIR'];
  if (normalized.includes('MONET') || normalized.includes('모네')) return prompts['MONET'];
  if (normalized.includes('DEGAS') || normalized.includes('드가')) return prompts['DEGAS'];
  if (normalized.includes('CAILLEBOTTE') || normalized.includes('칼리보트') || normalized.includes('카유보트')) return prompts['CAILLEBOTTE'];
  return prompts['RENOIR'];
}

// 후기인상주의 화가별 프롬프트
function getPostImpressionismArtistPrompt(artistName) {
  const paintTexture = ' MUST look like HAND-PAINTED oil painting with VISIBLE PAINT TEXTURE, NOT photorealistic, NOT smooth digital, NOT AI-generated photo.';
  const prompts = {
    'VAN GOGH': 'CRITICAL: PRESERVE the EXACT FACE IDENTITY from original photo but APPLY thick brushstroke texture to the face - do NOT draw Van Gogh himself. ABSOLUTE GENDER REQUIREMENT: If photo shows MALE - MUST have MASCULINE face with STRONG JAW, male bone structure, NO feminine features, DO NOT feminize, DO NOT soften, KEEP AS MAN. painting in Vincent van Gogh style: EXTREMELY THICK IMPASTO brushstrokes with HEAVY 3D PAINT TEXTURE like squeezed directly from tube, VISIBLE RIDGES AND GROOVES of thick oil paint, SWIRLING TURBULENT brushwork in EVERY area including face and background, CHUNKY BOLD brush marks NOT smooth NOT blended, intense saturated colors (cobalt blue cadmium yellow chrome orange), ENERGETIC EXPRESSIVE strokes throughout, canvas weave visible through paint, NOT photorealistic NOT AI-generated, Van Gogh masterpiece quality',
    
    'GAUGUIN': 'ABSOLUTE GENDER AND ETHNICITY REQUIREMENT: If photo shows MALE - MUST have MASCULINE face with STRONG JAW, male bone structure, NO feminine features, DO NOT feminize, DO NOT soften, DO NOT make delicate, KEEP AS MAN. If photo shows FEMALE - MUST have FEMININE face with SOFT features, female bone structure, NO masculine features, DO NOT masculinize, DO NOT make rough, KEEP AS WOMAN. PRESERVE ORIGINAL ETHNICITY AND SKIN COLOR EXACTLY - DO NOT change race, DO NOT lighten or darken skin, Asian must stay Asian, Caucasian must stay Caucasian, African must stay African. painting by Paul Gauguin: FLAT BOLD AREAS of pure unmixed saturated color, simplified forms with smooth FLAT COLOR SURFACES, exotic tropical palette (deep orange ochre yellow turquoise rich purple vibrant green), warm golden skin tones, lush tropical background, SMOOTH FLAT oil paint application with visible paint texture, ABSOLUTELY NO mosaic effect, NO tiles, NO geometric grid, NO stained glass look, NO cell pattern, pure FLAT COLOR AREAS only, NOT photorealistic NOT AI-generated, Gauguin Tahitian masterpiece quality',
    
    'CÉZANNE': 'ABSOLUTE GENDER AND ETHNICITY REQUIREMENT: If photo shows MALE - MUST have MASCULINE face with STRONG JAW, male bone structure, NO feminine features, DO NOT feminize, DO NOT soften, DO NOT make delicate, KEEP AS MAN. If photo shows FEMALE - MUST have FEMININE face with SOFT features, female bone structure, NO masculine features, DO NOT masculinize, DO NOT make rough, KEEP AS WOMAN. PRESERVE ORIGINAL ETHNICITY AND SKIN COLOR EXACTLY - DO NOT change race, DO NOT lighten or darken skin, Asian must stay Asian, Caucasian must stay Caucasian, African must stay African. painting by Paul Cézanne: GEOMETRIC STRUCTURED FORMS built with parallel brushstrokes, analytical approach to underlying shapes, Mont Sainte-Victoire style constructive vision, muted earth tones with blues and greens, solid volumes emerging from color planes, VISIBLE DIRECTIONAL BRUSHWORK with paint texture, contemplative balanced compositions, NOT photorealistic NOT AI-generated, Cézanne masterpiece quality',
    
    'SIGNAC': 'ABSOLUTE GENDER AND ETHNICITY REQUIREMENT: If photo shows MALE - MUST have MASCULINE face with STRONG JAW, male bone structure, NO feminine features, DO NOT feminize, DO NOT soften, DO NOT make delicate, KEEP AS MAN. If photo shows FEMALE - MUST have FEMININE face with SOFT features, female bone structure, NO masculine features, DO NOT masculinize, DO NOT make rough, KEEP AS WOMAN. PRESERVE ORIGINAL ETHNICITY AND SKIN COLOR EXACTLY - DO NOT change race, DO NOT lighten or darken skin, Asian must stay Asian, Caucasian must stay Caucasian, African must stay African. painting by Paul Signac: POINTILLIST technique with TINY DOTS of pure color placed side by side, bright Mediterranean sunlight and vibrant harbor scenes, dots blend optically when viewed from distance, luminous color vibration, The Port of Saint-Tropez style, scientific color division, VISIBLE paint dots texture, NOT photorealistic NOT AI-generated, Signac Neo-Impressionist masterpiece quality'
  };
  
  const normalized = artistName.toUpperCase().trim();
  if (normalized.includes('VAN GOGH') || normalized.includes('GOGH') || normalized.includes('고흐') || normalized.includes('빈센트')) return prompts['VAN GOGH'];
  if (normalized.includes('GAUGUIN') || normalized.includes('고갱')) return prompts['GAUGUIN'];
  if (normalized.includes('CÉZANNE') || normalized.includes('CEZANNE') || normalized.includes('세잔')) return prompts['CÉZANNE'];
  if (normalized.includes('SIGNAC') || normalized.includes('시냐크')) return prompts['SIGNAC'];
  return prompts['VAN GOGH'];
}

// 야수파 화가별 프롬프트
function getFauvismArtistPrompt(artistName) {
  const genderRule = 'ABSOLUTE GENDER AND ETHNICITY REQUIREMENT: If photo shows MALE - MUST have MASCULINE face with STRONG JAW, male bone structure, NO feminine features, DO NOT feminize, DO NOT soften, DO NOT make delicate, KEEP AS MAN. If photo shows FEMALE - MUST have FEMININE face with SOFT features, female bone structure, NO masculine features, DO NOT masculinize, DO NOT make rough, KEEP AS WOMAN. PRESERVE ORIGINAL ETHNICITY AND SKIN COLOR EXACTLY - DO NOT change race, DO NOT lighten or darken skin, Asian must stay Asian, Caucasian must stay Caucasian, African must stay African. ';
  const paintTexture = ' MUST look like HAND-PAINTED oil painting with VISIBLE PAINT TEXTURE, NOT photorealistic, NOT smooth digital, NOT AI-generated photo.';
  const prompts = {
    'MATISSE': genderRule + 'painting by Henri Matisse Fauvist period: PURE BOLD UNMIXED COLORS in flat decorative areas, The Dance style simplified joyful forms, complete liberation of color from reality, saturated intense primary colors (red blue green), rhythmic flowing harmonious lines, VISIBLE BRUSHSTROKES with paint texture, life-affirming energetic atmosphere, Matisse Fauvist masterpiece quality' + paintTexture,
    
    'DERAIN': genderRule + 'painting by André Derain: BOLD FAUVIST LANDSCAPE colors with vivid unnatural hues, Charing Cross Bridge style vibrant scenery, strong color contrasts, energetic expressive brushwork VISIBLE, liberated pure colors, dynamic compositions, Derain Fauvist masterpiece quality' + paintTexture,
    
    'VLAMINCK': genderRule + 'painting by Maurice de Vlaminck: VIOLENT EXPRESSIVE COLORS with turbulent emotional intensity, most aggressive Fauvist palette, THICK IMPULSIVE BRUSHWORK visible, raw powerful energy, dramatic color explosions, Van Gogh-influenced passion, Vlaminck Fauvist masterpiece quality' + paintTexture
  };
  
  const normalized = artistName.toUpperCase().trim();
  if (normalized.includes('MATISSE') || normalized.includes('마티스')) return prompts['MATISSE'];
  if (normalized.includes('DERAIN') || normalized.includes('드랭')) return prompts['DERAIN'];
  if (normalized.includes('VLAMINCK') || normalized.includes('블라맹크')) return prompts['VLAMINCK'];
  return prompts['MATISSE'];
}

// 표현주의 화가별 프롬프트
function getExpressionismArtistPrompt(artistName) {
  const genderRule = 'ABSOLUTE GENDER AND ETHNICITY REQUIREMENT: If photo shows MALE - MUST have MASCULINE face with STRONG JAW, male bone structure, NO feminine features, DO NOT feminize, DO NOT soften, DO NOT make delicate, KEEP AS MAN. If photo shows FEMALE - MUST have FEMININE face with SOFT features, female bone structure, NO masculine features, DO NOT masculinize, DO NOT make rough, KEEP AS WOMAN. PRESERVE ORIGINAL ETHNICITY AND SKIN COLOR EXACTLY - DO NOT change race, DO NOT lighten or darken skin, Asian must stay Asian, Caucasian must stay Caucasian, African must stay African. ';
  const paintTexture = ' MUST look like HAND-PAINTED oil painting with VISIBLE PAINT TEXTURE, NOT photorealistic, NOT smooth digital, NOT AI-generated photo.';
  const prompts = {
    'MUNCH': genderRule + 'painting by Edvard Munch: INTENSE PSYCHOLOGICAL emotional depth, The Scream style existential anxiety atmosphere, WAVY DISTORTED flowing lines in background, haunting symbolic colors (blood red sky, sickly yellows, deep blues), raw emotional vulnerability, swirling anxious energy, VISIBLE BRUSHWORK with paint texture, Munch Expressionist masterpiece quality' + paintTexture,
    
    'KIRCHNER': genderRule + 'painting by Ernst Ludwig Kirchner: ANGULAR JAGGED FORMS with sharp geometric simplification, Berlin street scene style urban tension, bold clashing colors (acid green, hot pink, electric blue), nervous energetic VISIBLE brushwork, Die Brücke Expressionist intensity, Kirchner masterpiece quality' + paintTexture,
    
    'KOKOSCHKA': genderRule + 'painting by Oskar Kokoschka: VIOLENT PSYCHOLOGICAL PORTRAITS with turbulent VISIBLE brushwork revealing inner turmoil, intense probing character study, THICK EXPRESSIVE paint application, agitated nervous energy, deep emotional excavation, Kokoschka Expressionist masterpiece quality' + paintTexture,
    
    'KANDINSKY': genderRule + 'painting by Wassily Kandinsky: ABSTRACT SPIRITUAL FORMS with floating geometric shapes, Composition series style non-representational expression, pure emotional color and form, musical visual harmonies, dynamic abstract energy, VISIBLE PAINT TEXTURE, Kandinsky Expressionist masterpiece quality' + paintTexture
  };
  
  const normalized = artistName.toUpperCase().trim();
  if (normalized.includes('MUNCH') || normalized.includes('뭉크')) return prompts['MUNCH'];
  if (normalized.includes('KIRCHNER') || normalized.includes('키르히너')) return prompts['KIRCHNER'];
  if (normalized.includes('KOKOSCHKA') || normalized.includes('코코슈카')) return prompts['KOKOSCHKA'];
  if (normalized.includes('KANDINSKY') || normalized.includes('칸딘스키')) return prompts['KANDINSKY'];
  return prompts['MUNCH'];
}


// ========================================
// Fallback 프롬프트 (AI 실패시 사용)
// ========================================
const fallbackPrompts = {
  ancient: {
    name: '그리스·로마',
    prompt: 'Transform this image into ancient Greek-Roman art. STRICT RULES: 1) ANY SPORTS/ATHLETIC ACTION (soccer, football, running, jumping, throwing, catching ball, ANY physical activity) → ALWAYS Greek/Roman MARBLE SCULPTURE in style of Discobolus or ancient Olympic athletes, pure white Carrara marble with visible carved muscles and dynamic frozen movement, classical athletic proportions, museum display style. CRITICAL: Ball games = SCULPTURE, NOT mosaic. 2) INDOOR PORTRAITS (no sports) → Greek/Roman marble sculpture with classical poses. 3) OUTDOOR SCENES WITHOUT SPORTS → Roman mosaic with LARGE CHUNKY TESSERAE TILES (20-30mm each), THICK BLACK GROUT LINES clearly visible between EVERY tile, LIMITED COLORS (terracotta, ochre, umber, ivory, slate blue), Pompeii villa floor style. PRIORITY: Sports/athletic = ALWAYS SCULPTURE regardless of indoor/outdoor. Ancient masterpiece quality'
  },
  
  medieval: {
    name: '중세 미술',
    prompt: 'Medieval sacred art with dynamic style selection: IF ANIMALS in photo → ALWAYS use Islamic Miniature style: Persian/Ottoman COURT MINIATURE painting with intricate delicate details, vibrant jewel colors (ruby red, sapphire blue, emerald green, gold), flat decorative composition, ornamental floral patterns, courtly elegant aesthetic, richly decorated background, animals depicted in garden or hunting scenes, luxurious manuscript illumination quality, NO religious Christian imagery for animals to avoid inappropriate context. IF PEOPLE in photo choose from BYZANTINE (35%): GOLDEN MOSAIC sacred backgrounds with shimmering gold leaf, CIRCULAR GOLDEN HALO behind head, flat hieratic frontal iconic figures, divine transcendent spiritual atmosphere; OR GOTHIC (35%): CATHEDRAL STAINED GLASS jewel tones with THICK BLACK LEAD LINES dividing colored segments, vertical elongated figures, DIVINE HOLY LIGHT streaming through Gothic arches, FLAT TWO-DIMENSIONAL medieval aesthetic NOT realistic smooth painting; OR ISLAMIC MINIATURE (30%): Persian/Ottoman COURT MINIATURE for people. IF NO PEOPLE AND NO ANIMALS (landscape only) → ISLAMIC GEOMETRIC: intricate arabesque patterns, sacred geometry, decorative motifs, flowing ornamental designs. ANIMALS = ISLAMIC MINIATURE ALWAYS (safe secular art). Medieval masterpiece quality'
  },
  
  renaissance: {
    name: '르네상스',
    prompt: 'Renaissance painting by Leonardo da Vinci EXTREME sfumato technique: PRESERVE original person\'s face and features, DO NOT paint actual Mona Lisa, only apply Leonardo\'s painting technique, apply very strong soft atmospheric haze throughout, all edges must be completely blurred, no sharp outlines anywhere in entire painting, mysterious smoky depth with sfumato technique, every boundary softly dissolved into atmosphere, warm golden Renaissance colors, harmonious balanced composition, unified composition all figures together NOT separated, NOT photographic preserve facial identity, Renaissance masterpiece quality'
  },
  
  baroque: {
    name: '바로크',
    prompt: 'Baroque painting style by Caravaggio, DRAMATIC chiaroscuro lighting with extreme light-dark contrast, theatrical spotlight effect, deep black shadows, tenebrism technique, rich deep colors, dynamic diagonal composition, theatrical emotional atmosphere, single unified composition with all figures together in one cohesive continuous scene NOT separated into multiple groups, painted in Baroque masterpiece quality'
  },
  
  rococo: {
    name: '로코코',
    prompt: 'Rococo oil painting style, VISIBLE BRUSHSTROKES with oil paint texture throughout, light pastel colors, playful ornate decoration, soft delicate brushwork, romantic elegant atmosphere, graceful curved lines, whimsical charm, single unified composition with all figures together in one cohesive scene NOT separated into multiple groups, painted on canvas with VISIBLE PAINT TEXTURE, NOT photographic, painted in Rococo masterpiece quality by Watteau or Boucher'
  },
  
  neoclassicism_vs_romanticism_vs_realism: {
    name: '신고전주의 vs 낭만주의 vs 사실주의',
    prompt: 'Choose best style based on photo: if static/balanced/formal use Neoclassical style by Jacques-Louis David with cold perfection and clear lines, if dynamic/emotional/landscape use Romantic style by J.M.W. Turner with atmospheric sublime effects, if rural/peaceful use Realist style by Jean-François Millet with serene rural dignity, if urban/modern use Realist style by Édouard Manet with sophisticated Paris realism, painted in masterpiece quality with single unified composition NOT separated'
  },
  
  impressionism: {
    name: '인상주의',
    prompt: 'Impressionist painting style by Claude Monet, ROUGH VISIBLE BROKEN brushstrokes, SOFT HAZY atmospheric effects like morning mist, colors BLENDED and DISSOLVED into each other, NO sharp edges, dreamy blurred boundaries, dappled light filtering through atmosphere, Woman with a Parasol style atmospheric haze, everything slightly out of focus and impressionistic, NOT photographic clarity, painted in Impressionist masterpiece quality'
  },
  
  postImpressionism: {
    name: '후기인상주의',
    prompt: 'Post-Impressionist painting style, bold expressive colors, personal artistic vision, emotional depth and symbolic meaning, visible distinctive brushwork, painted in Post-Impressionist masterpiece quality'
  },
  
  fauvism: {
    name: '야수파',
    prompt: 'Fauvist painting style by Henri Matisse, pure bold unmixed colors, flat decorative patterns, intense color contrasts, liberation of color from reality, simplified forms, joyful energetic atmosphere, painted in Fauvist masterpiece quality with The Dance-like pure color harmony'
  },
  
  expressionism: {
    name: '표현주의',
    prompt: 'MUNCH_EXPRESSIONISM',  // 기본값 - 실제로는 getExpressionismArtistPrompt()에서 동적 생성
    dynamicPrompt: true
  },
  
  modernism: {
    name: '20세기 모더니즘',
    prompt: 'PICASSO_CUBIST',  // 기본값 - 실제로는 getModernismArtistPrompt()에서 동적 생성
    dynamicPrompt: true  // 동적 프롬프트 플래그
  },
  
  // ========================================
  // 거장 11명 (시간순 정렬 + 생사연도 + 사조)
  // ========================================
  // 원칙: 사용자가 거장 선택 → 어떤 사진이든 그 거장의 화풍으로 변환
  // ========================================
  
  vangogh: {
    name: '반 고흐',
    artist: 'Vincent van Gogh (1853-1890)',
    movement: '후기인상주의 (Post-Impressionism)',
    prompt: 'painting by Vincent van Gogh: THICK SWIRLING IMPASTO brushstrokes visible throughout, VIBRANT INTENSE emotional colors (cobalt blue, chrome yellow, emerald green), dynamic energetic turbulent sky and background, Starry Night style spiraling movement, passionate expressive emotional power, NOT photographic preserve subject identity, Van Gogh masterpiece quality'
  },
  
  klimt: {
    name: '클림트',
    artist: 'Gustav Klimt (1862-1918)',
    movement: '아르누보 (Art Nouveau)',
    prompt: 'painting by Gustav Klimt Golden Phase: GOLD LEAF decorative patterns throughout background, Byzantine mosaic geometric ornaments, The Kiss style intimate sensuous atmosphere, jewel-like rich colors (gold, bronze, deep reds), flowing organic Art Nouveau lines, symbolic decorative elements, NOT photographic preserve subject identity, Klimt masterpiece quality'
  },
  
  munch: {
    name: '뭉크',
    artist: 'Edvard Munch (1863-1944)',
    movement: '표현주의 (Expressionism)',
    prompt: 'painting by Edvard Munch: INTENSE PSYCHOLOGICAL emotional depth, The Scream style existential anxiety atmosphere, WAVY DISTORTED flowing lines in background, haunting symbolic colors (blood red sky, sickly yellows, deep blues), raw emotional vulnerability exposed, NOT photographic preserve subject identity, Munch Expressionist masterpiece quality'
  },
  
  matisse: {
    name: '마티스',
    artist: 'Henri Matisse (1869-1954)',
    movement: '야수파 (Fauvism)',
    prompt: 'painting by Henri Matisse Fauvist period: PURE BOLD UNMIXED COLORS in flat decorative areas, The Dance style simplified joyful forms, complete liberation of color from reality, saturated intense primary colors (red blue green), rhythmic flowing harmonious lines, life-affirming energetic atmosphere, NOT photographic preserve subject identity, Matisse Fauvist masterpiece quality'
  },
  
  picasso: {
    name: '피카소',
    artist: 'Pablo Picasso (1881-1973)',
    movement: '입체주의 (Cubism)',
    prompt: 'Cubist painting by Pablo Picasso: GEOMETRIC FRAGMENTED forms broken into angular planes, MULTIPLE SIMULTANEOUS PERSPECTIVES showing different angles at once, Les Demoiselles d Avignon style revolutionary deconstruction, monochromatic or limited earth palette, analytical cubist dissection of form, NOT photographic preserve subject identity, Picasso Cubist masterpiece quality'
  },
  
  frida: {
    name: '프리다 칼로',
    artist: 'Frida Kahlo (1907-1954)',
    movement: '멕시코 초현실주의 (Mexican Surrealism)',
    prompt: 'painting by Frida Kahlo: INTENSE DIRECT GAZE portrait style, vibrant Mexican folk art colors, symbolic personal imagery (flowers, animals, vines, hearts), unibrow and distinctive bold features, emotional raw vulnerability, Tehuana traditional Mexican dress and floral headpiece, lush tropical foliage background, autobiographical symbolic elements, rich saturated colors, NOT photographic, Frida Kahlo masterpiece quality'
  },
  
  warhol: {
    name: '앤디 워홀',
    artist: 'Andy Warhol (1928-1987)',
    movement: '팝아트 (Pop Art)',
    prompt: 'Pop Art by Andy Warhol: MUST create 2x2 FOUR-PANEL GRID layout, the EXACT SAME PERSON or OBJECT from the ORIGINAL PHOTO repeated 4 times - once in each quadrant, each of the 4 panels with DIFFERENT BOLD COLOR scheme (hot pink cyan yellow orange electric blue lime green), HIGH CONTRAST silkscreen printing effect, FLAT graphic colors with NO gradients, DO NOT draw Marilyn Monroe - draw only the person from the original photo, Warhol Pop Art masterpiece quality'
  },
  
  // ========================================
  // 동양화 - AI가 스타일 자동 선택
  // ========================================
  korean: {
    name: '한국 전통화',
    prompt: 'Korean traditional painting in authentic Joseon Dynasty style. CRITICAL INSTRUCTIONS: 1) GENDER PRESERVATION - carefully preserve exact gender and facial features from original photo (male stays male with masculine face, female stays female with feminine features), 3) Choose appropriate Korean style: [Minhwa folk art for animals/flowers: light subtle Obangsaek colors NOT overly saturated, soft gentle pigments, cheerful but restrained palette] [Pungsokdo genre painting for people/daily life: LIGHT INK WASH technique (damchae), subtle delicate colors over ink lines, refined elegant brushwork, realistic but understated, Kim Hong-do and Shin Yun-bok style NOT animation NOT cartoon, restrained muted tones] [Jingyeong landscape for nature/mountains: expressive ink with minimal color], 4) SINGLE UNIFIED COMPOSITION - all figures together in one cohesive scene. 🚨 CRITICAL: ABSOLUTELY NO Japanese hiragana (ひらがな) katakana (カタカナ) or ANY Japanese text whatsoever, NO vertical Japanese writing, NO Japanese ukiyo-e style elements, REMOVE ALL Japanese visual elements, NO text NO characters on painting, this is 100% PURE KOREAN TRADITIONAL ART not Japanese ukiyo-e at all.'
  },
  
  chinese: {
    name: '중국 전통화',
    prompt: 'Chinese traditional painting in authentic classical style. CRITICAL INSTRUCTIONS: 1) GENDER PRESERVATION - carefully preserve exact gender and facial features from original photo (male stays male with masculine face, female stays female with feminine features), 2) Choose appropriate Chinese style based on photo subject (Shuimohua ink wash for landscapes/nature with monochrome gradations, Gongbi meticulous painting for people/portraits with fine detailed brushwork and rich colors, Huaniao bird-and-flower for animals/plants with precise naturalistic rendering), 3) Use Chinese aesthetic principles, 4) SINGLE UNIFIED COMPOSITION - all figures and elements together in one cohesive continuous scene, NOT fragmented into separate layers or groups. 🚨 CRITICAL: ABSOLUTELY NO Japanese hiragana (ひらがな) katakana (カタカナ) or ANY Japanese text whatsoever, NO vertical Japanese writing, NO Japanese ukiyo-e style elements, REMOVE ALL Japanese visual elements, NO text NO characters on painting, this is 100% PURE CHINESE TRADITIONAL ART not Japanese at all.'
  },
  
  japanese: {
    name: '일본 우키요에',
    prompt: 'Japanese Ukiyo-e woodblock print style with flat areas of bold solid colors, strong clear black outlines, completely flat two-dimensional composition, decorative patterns, stylized simplified forms, elegant refined Japanese aesthetic, painted in authentic Japanese ukiyo-e masterpiece quality, single unified composition with all figures together in one cohesive scene NOT separated into multiple distinct groups, Japanese kana allowed, NO Chinese characters, pure Japanese style only'
  },
  
  masters: {
    name: '거장 화풍',
    prompt: 'Master artist painting style, exceptional technical skill, distinctive artistic vision, profound emotional depth, timeless masterpiece quality'
  },
  
  oriental: {
    name: '동양화',
    prompt: 'Traditional East Asian painting style, ink wash brushwork, minimalist composition, harmony with nature, philosophical contemplation, painted in classical Oriental masterpiece quality'
  }
};

// ========================================
// 간단한 사진 분석 함수
// ========================================
function analyzePhoto() {
  // 실제로는 이미지를 보고 AI가 분석하지만,
  // 프롬프트에서 AI가 직접 분석하도록 함
  // 이 함수는 필요시 확장 가능
  return {
    analyzed: false,
    note: 'AI will analyze photo directly in prompt'
  };
}

// ========================================
// AI 화가 자동 선택 (타임아웃 포함)
// ========================================
async function selectArtistWithAI(imageBase64, selectedStyle, timeoutMs = 15000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  
  // 변수 선언을 함수 최상단으로 이동 (스코프 문제 해결)
  const categoryName = selectedStyle.name;
  const categoryType = selectedStyle.category;
  
  try {
    let promptText;
    
    if (categoryType === 'masters') {
      // 거장: 대표작 5개 중 사진에 가장 맞는 것 선택
      const masterId = selectedStyle.id.replace('-master', '');
      
      // 거장별 대표작 목록
      const masterWorksDB = {
        'vangogh': `
VINCENT VAN GOGH - SELECT ONE:
1. "The Starry Night" (별이 빛나는 밤) → night scene, sky, landscape, evening | Style: SWIRLING SPIRAL brushstrokes, COBALT BLUE and YELLOW, cypress trees
2. "Sunflowers" (해바라기) → flowers, still life, bouquet | Style: THICK IMPASTO, CHROME YELLOW dominates, expressive petal strokes
3. "Self-Portrait" (자화상, 1889 Saint-Rémy) → single portrait, face, upper body | Style: TURQUOISE SWIRLING BACKGROUND, red-orange beard, blue-green coat, intense gaze`,

        'klimt': `
GUSTAV KLIMT - SELECT ONE:
1. "The Kiss" (키스) → couple, romantic, embracing | Style: GOLD LEAF patterns, geometric robes, floral meadow, Byzantine mosaic
2. "The Tree of Life" (생명의 나무) → tree, nature, landscape | Style: SPIRAL BRANCHES, gold and bronze, decorative swirls
3. "Judith I" (유디트) → woman portrait, powerful female | Style: GOLD CHOKER, bare shoulders, fierce expression`,

        'munch': `
EDVARD MUNCH - SELECT ONE:
1. "The Scream" (절규) → single figure, emotional, anxious | Style: WAVY DISTORTED lines, BLOOD RED sky, agonized figure, existential terror
2. "Madonna" (마돈나) → woman portrait, sensual, mysterious | Style: FLOWING DARK HAIR like halo, closed eyes, red lips
3. "The Sick Child" (병든 아이) → intimate portrait, emotional, tender | Style: PALE sickly colors, scratched texture, melancholic`,

        'matisse': `
HENRI MATISSE - SELECT ONE:
1. "The Dance" (댄스) → group, people in motion, dancing | Style: FLAT BOLD colors (red figures, blue sky, green ground), rhythmic circular
2. "The Red Room" (붉은 방) → interior, room, dining | Style: DOMINANT RED with blue patterns, flat decorative surface
3. "Woman with a Hat" (모자를 쓴 여인) → woman portrait, colorful | Style: WILD FAUVE colors on face (green, purple, red), bold brushwork`,

        'picasso': `
PABLO PICASSO - SELECT ONE:
1. "Les Demoiselles d'Avignon" (아비뇽의 처녀들) → group of figures, women | Style: ANGULAR FRAGMENTED faces, African mask influence, geometric planes
2. "Guernica" (게르니카) → dramatic scene, chaos, large group | Style: BLACK WHITE GREY only, anguished figures, fragmented bodies
3. "Weeping Woman" (우는 여인) → emotional portrait, woman | Style: SHARP ANGULAR tears, fractured face, yellow-green-purple`,

        'frida': `
FRIDA KAHLO - SELECT ONE:
1. "Me and My Parrots" (나와 앵무새들) → person with birds/pets | Style: COLORFUL PARROTS on shoulders, lush green foliage, direct gaze, vibrant colors
2. "The Broken Column" (부러진 기둥) → single figure, frontal pose | Style: Cracked torso with IONIC COLUMN spine, nails piercing skin, tears streaming
3. "Self-Portrait with Thorn Necklace" (가시 목걸이 자화상) → portrait with nature/insects | Style: THORNS around neck with hummingbird, black cat, jungle foliage
4. "Self-Portrait with Monkeys" (원숭이와 자화상) → person with pets/animals, warm mood | Style: MONKEYS EMBRACING from behind, lush green leaves, intimate warm atmosphere`,

        'warhol': `
ANDY WARHOL - USE THIS STYLE:
1. "Marilyn Monroe" (마릴린 먼로) → any portrait, glamorous | Style: 2x2 FOUR-PANEL GRID, DIFFERENT BOLD COLORS each panel, silkscreen`
      };

      const masterWorks = masterWorksDB[masterId] || '';
      
      promptText = `You are selecting the BEST masterwork from ${categoryName}'s collection for this photo.

AVAILABLE MASTERWORKS:
${masterWorks}

INSTRUCTIONS:
1. Analyze the photo THOROUGHLY:
   - Subject type (person/landscape/animal/object)
   - If PERSON: gender (male/female), age, physical features (jaw shape, hair, build)
   - PERSON COUNT: How many people are in the photo? (1, 2, 3+)
   - BACKGROUND: What's in the background? (simple/complex/outdoor/indoor)
   - Mood, composition
2. Match to the MOST SUITABLE masterwork from the list above
3. Generate a FLUX prompt that STARTS with detailed subject description
4. IMPORTANT: Preserve the original subject - if it's a baby, keep it as a baby; if elderly, keep elderly
5. CRITICAL: If only 1 person in photo, add "DO NOT add extra people in background"

Return ONLY valid JSON (no markdown):
{
  "analysis": "brief photo analysis",
  "subject_type": "person" or "landscape" or "animal" or "object",
  "gender": "male" or "female" or "both" or null,
  "age_range": "baby/child/teen/young_adult/adult/middle_aged/elderly" or null,
  "ethnicity": "asian" or "caucasian" or "african" or "hispanic" or "middle_eastern" or "mixed" or null,
  "physical_description": "for MALE: strong jaw, angular face, short hair, broad shoulders etc. For FEMALE: soft features, delicate face etc. ALWAYS include skin tone and ethnic features." or null,
  "person_count": 1 or 2 or 3 (number of people in photo),
  "background_type": "simple" or "complex" or "outdoor" or "indoor" or "studio",
  "selected_artist": "${categoryName}",
  "selected_work": "exact title of the masterwork you selected",
  "reason": "why this masterwork matches this photo",
  "prompt": "Start with 'MALE/FEMALE SUBJECT with [physical features]' if person, then 'painting by ${categoryName} in the style of [selected work title], [that work's distinctive techniques]'. If person_count=1, END with 'DO NOT add extra people, NO hallucinated figures in background'"
}`;
      
    } else if (categoryType === 'oriental') {
      // 동양화: 한국/중국/일본 스타일 선택 (기존 로직 유지)
      const styleId = selectedStyle.id;
      
      if (styleId === 'korean') {
        // 한국 - Claude가 3가지 스타일 중 선택
        promptText = `Analyze this photo and select the BEST Korean traditional painting style.

You must choose ONE of these THREE styles:

Style 1: Korean Minhwa Folk Painting (민화)
- Best for: animals (tiger, magpie, fish), flowers (peony), birds, simple subjects
- Characteristics: Folk painting on ROUGH THICK HANJI PAPER with PROMINENT FIBER TEXTURE visible throughout, UNEVEN PIGMENT ABSORPTION creating patchy color areas, genuinely FADED OLD colors (like 200-year museum piece), TREMBLING UNSTEADY brushlines (amateur folk artist quality), thick black outlines but IRREGULAR and wobbly, colors pooling in paper fibers, authentic Joseon folk artifact NOT illustration
- When: Photo has animals, flowers, or needs folk art treatment

Style 2: Korean Pungsokdo Genre Painting (풍속도)
- Best for: people, portraits, daily life, couples, festivals, human activities  
- Characteristics: KOREAN INK PAINTING on ROUGH TEXTURED HANJI, BLACK INK BRUSHWORK dominates (70-80%), then EXTREMELY MINIMAL pale color washes (20-30% only), visible hanji fiber texture throughout, spontaneous confident ink strokes, Kim Hong-do's elegant restraint, earth-tone washes ONLY (pale brown, grey-green, faint ochre), NOT colorful NOT bright, distinctly different from Chinese gongbi's detailed colors
- When: Photo has people, faces, human subjects

Style 3: Korean Jingyeong Landscape (진경산수)
- Best for: mountains, nature, rocks, landscapes, scenery
- Characteristics: Bold expressive brushwork, dramatic angular forms, monochrome ink with strong contrasts, REAL Korean scenery (not idealized Chinese mountains)
- When: Photo has natural landscapes, mountains, rocks

Analyze the photo and choose the MOST suitable style.

CRITICAL INSTRUCTIONS FOR PROMPT GENERATION:
1. KOREAN VS CHINESE DISTINCTION:
   - Korean Pungsokdo: ROUGH hanji paper, spontaneous loose brushwork, 90% ink 10% color
   - NOT Chinese Gongbi: Chinese is meticulous/tight, Korean is loose/spontaneous
   - Korean uses MORE INK LESS COLOR than Chinese

2. GENDER PRESERVATION (MANDATORY IN PROMPT):
   - FIRST identify if photo has person(s) and their gender
   - If MALE in photo → prompt MUST start with "CRITICAL GENDER RULE: This photo shows MALE person, ABSOLUTELY PRESERVE MASCULINE FEATURES - strong jaw, masculine face, male body structure, DO NOT feminize, DO NOT make female-looking face, KEEP MALE GENDER EXACTLY."
   - If FEMALE in photo → prompt MUST start with "CRITICAL GENDER RULE: This photo shows FEMALE person, ABSOLUTELY PRESERVE FEMININE FEATURES - soft face, feminine features, female body structure, DO NOT masculinize, KEEP FEMALE GENDER EXACTLY."
   - This gender instruction MUST be the FIRST thing in your generated prompt before any style description

2. JAPANESE TEXT PROHIBITION (CRITICAL - HIGHEST PRIORITY):
   - 🚨 ABSOLUTELY NO Japanese hiragana (ひらがな) - NEVER EVER ALLOWED
   - 🚨 ABSOLUTELY NO Japanese katakana (カタカナ) - NEVER EVER ALLOWED
   - 🚨 NO Japanese characters whatsoever
   - 🚨 NO vertical Japanese text
   - 🚨 NO Japanese ukiyo-e style elements
   - 🚨 REMOVE ALL Japanese visual elements
   - Any Japanese text or style = COMPLETE TOTAL FAILURE
   - This is 100% PURE KOREAN ART, NOT Japanese art AT ALL

3. TEXT PROHIBITION (ADDITIONAL):
   - NO text, NO characters, NO writing on the painting
   - If text is absolutely necessary, use ONLY Korean Hangul or Chinese characters
   - NEVER use Japanese writing system

Return ONLY valid JSON (no markdown):
{
  "analysis": "brief photo description including gender if person present (1 sentence)",
  "subject_type": "person" or "landscape" or "animal" or "object",
  "gender": "male" or "female" or null,
  "age_range": "baby/child/teen/young_adult/adult/middle_aged/elderly" or null,
  "physical_description": "for MALE: strong jaw, angular face, short hair, broad shoulders etc. For FEMALE: soft features, delicate face etc." or null,
  "selected_artist": "Korean Minhwa" or "Korean Pungsokdo" or "Korean Jingyeong Landscape",
  "selected_style": "minhwa" or "pungsokdo" or "landscape",
  "reason": "why this style fits (1 sentence)",
  "prompt": "Start with 'MALE/FEMALE SUBJECT with [physical features]' if person, then 'Authentic Korean [style name] from Joseon Dynasty...' including: [for Minhwa: painted on ROUGH THICK HANJI PAPER with PROMINENT FIBER TEXTURE visible throughout, UNEVEN PATCHY pigment absorption, genuinely FADED WEATHERED colors like 200-year museum artifact, TREMBLING WOBBLY folk brushlines, primitive naive quality, NOT digital NOT smooth NOT bright] [for Pungsokdo: KOREAN INK PAINTING on ROUGH HANJI with visible texture, BLACK INK BRUSHWORK dominates 70-80%, then MINIMAL PALE washes 20-30% only, earth tones ONLY (pale brown grey-green faint ochre), spontaneous confident strokes, Kim Hong-do elegance, NOT colorful Chinese gongbi, simple everyday hanbok] [for Jingyeong: bold expressive monochrome ink]. CRITICAL ENDING: 'ABSOLUTELY NO Japanese hiragana (ひらがな) katakana (カタカナ) or any Japanese text, NO vertical Japanese writing, NO Japanese ukiyo-e elements, REMOVE all Japanese style, this is 100% PURE KOREAN TRADITIONAL ART not Japanese, NO text NO characters on painting unless Korean Hangul or Chinese only'."
}

Keep it concise and accurate.`;
      }
      
      if (styleId === 'chinese') {
        // 중국 - Claude가 3가지 스타일 중 선택
        promptText = `Analyze this photo and select the BEST Chinese traditional painting style.

You must choose ONE of these THREE styles:

Style 1: Chinese Ink Wash Painting (水墨畫 Shuimohua)
- Best for: landscapes, mountains, nature, trees, contemplative subjects, simple compositions
- Characteristics: Monochrome black ink with gradations (deep black to light grey), soft flowing brushstrokes, minimalist composition with elegant empty space, misty atmosphere
- When: Photo has landscapes, nature, or needs meditative serene treatment

Style 2: Chinese Gongbi Meticulous Painting (工筆畫)
- Best for: portraits, people, detailed subjects, colorful compositions
- Characteristics: Extremely fine detailed brushwork, delicate precise lines, rich mineral pigments and brilliant colors, ornate decorative patterns, imperial court quality
- When: Photo has people, faces, or needs detailed colorful treatment

Style 3: Chinese Huaniao Bird-and-Flower Painting (花鳥畫)
- Best for: birds, flowers, animals (dogs, cats, rabbits), fish, insects, any natural creatures
- Characteristics: Traditional genre includes "flowers, birds, fish, insects" (花鳥魚蟲) PLUS animals, detailed naturalistic rendering, precise brushwork for fur/feathers/petals, delicate colors, symbolic meanings
- When: Photo has birds, flowers, animals, or plants

Analyze the photo and choose the MOST suitable style.

CRITICAL INSTRUCTIONS FOR PROMPT GENERATION:
1. GENDER PRESERVATION (MANDATORY IN PROMPT):
   - FIRST identify if photo has person(s) and their gender
   - If MALE in photo → prompt MUST start with "CRITICAL GENDER RULE: This photo shows MALE person, ABSOLUTELY PRESERVE MASCULINE FEATURES - strong jaw, masculine face, male body structure, DO NOT feminize, DO NOT make female-looking face, KEEP MALE GENDER EXACTLY."
   - If FEMALE in photo → prompt MUST start with "CRITICAL GENDER RULE: This photo shows FEMALE person, ABSOLUTELY PRESERVE FEMININE FEATURES - soft face, feminine features, female body structure, DO NOT masculinize, KEEP FEMALE GENDER EXACTLY."
   - This gender instruction MUST be the FIRST thing in your generated prompt before any style description

2. JAPANESE TEXT PROHIBITION (CRITICAL - HIGHEST PRIORITY):
   - 🚨 ABSOLUTELY NO Japanese hiragana (ひらがな) - NEVER EVER ALLOWED
   - 🚨 ABSOLUTELY NO Japanese katakana (カタカナ) - NEVER EVER ALLOWED
   - 🚨 NO Japanese characters whatsoever
   - 🚨 NO vertical Japanese text
   - 🚨 NO Japanese ukiyo-e style elements
   - 🚨 REMOVE ALL Japanese visual elements
   - Any Japanese text or style = COMPLETE TOTAL FAILURE
   - This is 100% PURE CHINESE ART, NOT Japanese art AT ALL

3. TEXT PROHIBITION (ADDITIONAL):
   - NO text, NO characters, NO writing on the painting
   - If text is absolutely necessary, use ONLY Chinese characters
   - NEVER use Japanese writing system

Return ONLY valid JSON (no markdown):
{
  "analysis": "brief photo description including gender if person present (1 sentence)",
  "subject_type": "person" or "landscape" or "animal" or "object",
  "gender": "male" or "female" or null,
  "age_range": "baby/child/teen/young_adult/adult/middle_aged/elderly" or null,
  "physical_description": "for MALE: strong jaw, angular face, short hair, broad shoulders etc. For FEMALE: soft features, delicate face etc." or null,
  "selected_artist": "Chinese Ink Wash" or "Chinese Gongbi" or "Chinese Huaniao",
  "selected_style": "ink_wash" or "gongbi" or "huaniao",
  "reason": "why this style fits (1 sentence)",
  "prompt": "Start with 'MALE/FEMALE SUBJECT with [physical features]' if person, then 'Chinese [style name]...' with all characteristics. CRITICAL ENDING: 'ABSOLUTELY NO Japanese hiragana (ひらがな) katakana (カタカナ) or any Japanese text, NO vertical Japanese writing, NO Japanese ukiyo-e elements, REMOVE all Japanese style, this is 100% PURE CHINESE TRADITIONAL ART not Japanese, NO text NO characters on painting unless Chinese characters only'."
}

Keep it concise and accurate.`;
      }
      
      if (styleId === 'japanese') {
        // 일본 - 우키요에 고정
        return {
          success: true,
          artist: '일본 우키요에',
          reason: 'Japanese traditional ukiyo-e style',
          prompt: fallbackPrompts.japanese.prompt,
          analysis: 'Japanese ukiyo-e style applied'
        };
      }
      
    } else {
      // ========================================
      // 미술사조: v33 업그레이드된 화가 선택
      // ========================================
      
      // 사조별 가이드라인 가져오기
      let guidelines = '';
      let hints = '';
      
      // 간단한 사진 분석 (AI가 직접 하지만 힌트용)
      const photoAnalysis = {
        count: 1,  // AI가 실제 분석
        gender: 'unknown',
        shot_type: 'portrait',
        subject: 'person',
        background: 'neutral',
        mood: 'neutral',
        age_range: 'adult',
        lighting: 'normal',
        expression: 'neutral',
        composition: 'normal'
      };
      
      if (categoryType === 'ancient') {
        guidelines = getAncientGreekRomanGuidelines();
        hints = getAncientGreekRomanHints(photoAnalysis);
      } else if (categoryType === 'renaissance') {
        guidelines = getRenaissanceGuidelines();
        hints = getRenaissanceHints(photoAnalysis);
      } else if (categoryType === 'baroque') {
        guidelines = getBaroqueGuidelines();
        hints = getBaroqueHints(photoAnalysis);
      } else if (categoryType === 'rococo') {
        guidelines = getRococoGuidelines();
        hints = getRococoHints(photoAnalysis);
      } else if (categoryType === 'medieval') {
        guidelines = getMedievalGuidelines();
        hints = getMedievalHints(photoAnalysis);
      } else if (categoryType === 'neoclassicism_vs_romanticism_vs_realism') {
        guidelines = getNeoclassicismVsRomanticismVsRealismGuidelines();
        hints = getNeoclassicismVsRomanticismVsRealismHints(photoAnalysis);
      } else if (categoryType === 'impressionism') {
        guidelines = getImpressionismGuidelines();
        hints = getImpressionismHints(photoAnalysis);
      } else if (categoryType === 'postImpressionism') {
        guidelines = getPostImpressionismGuidelines();
        hints = getPostImpressionismHints(photoAnalysis);
      } else if (categoryType === 'fauvism') {
        guidelines = getFauvismGuidelines();
        hints = getFauvismHints(photoAnalysis);
      } else if (categoryType === 'expressionism') {
        guidelines = getExpressionismGuidelines();
        hints = getExpressionismHints(photoAnalysis);
      } else if (categoryType === 'modernism') {
        guidelines = getModernismGuidelines();
        hints = getModernismHints(photoAnalysis);
      } else {
        // 고대 그리스-로마, 중세 미술 등 - 기본 로직
        promptText = `Analyze this photo and select the BEST artist from ${categoryName} period/style to transform it.

Instructions:
1. Analyze: subject, age, mood, composition, lighting
2. Select the MOST SUITABLE ${categoryName} artist for THIS specific photo
3. Generate a detailed prompt for FLUX Depth in that artist's style
4. IMPORTANT: Preserve the original subject - if it's a baby, keep it as a baby; if elderly, keep elderly

Return ONLY valid JSON (no markdown):
{
  "analysis": "brief photo description",
  "selected_artist": "Artist Full Name",
  "reason": "why this artist fits this photo",
  "prompt": "painting by [Artist], [artist's technique], [artist's characteristics], depicting the subject while preserving original features and age"
}

Keep it concise and accurate.`;
      }
      
      // 상세 가이드라인이 있는 사조
      if (guidelines) {
        // 고대 그리스-로마는 스타일 선택 (화가 아님)
        if (categoryType === 'ancient') {
          promptText = `Select the BEST ${categoryName} STYLE for this photo.

${guidelines}

${hints}

Instructions - PRIORITY ORDER:
1. FIRST check: Are there ANIMALS in this photo?
   - Dogs, cats, horses, birds, fish, any animals → ROMAN MOSAIC
   - Historical accuracy: Romans excelled at animal mosaics (Pompeii Cave Canem)
   - Animals = MOSAIC priority!
2. SECOND check: Is there DYNAMIC MOVEMENT/ACTION/SPORTS in this photo?
   - If YES → CLASSICAL SCULPTURE (even if landscape/stadium visible!)
   - Sports, jumping, running, athletic action = SCULPTURE priority!
3. THIRD check: Is it a STATIC photo WITH landscape/nature elements?
   - If YES → ROMAN MOSAIC
4. FOURTH: Portrait without landscape → CLASSICAL SCULPTURE
5. Follow RECOMMENDATIONS (80% weight)
6. Preserve subject identity

Return JSON only:
{
  "analysis": "brief - note if animals/dynamic/static (1 sentence)",
  "selected_artist": "Classical Sculpture" or "Roman Mosaic",
  "reason": "why this style fits, mention animals/dynamic/static (1 sentence)",
  "prompt": "Ancient Greek-Roman art in [chosen style], [style characteristics - for Sculpture mention material choice, for Mosaic mention tesserae tiles], depicting subject while preserving original facial features"
}`;
        } else if (categoryType === 'medieval') {
          // 중세 미술만 동물 체크 (Islamic Miniature)
          promptText = `Select the BEST ${categoryName} artist for this photo.

${guidelines}

${hints}

Instructions:
1. 🚨 FIRST CHECK: Does this photo have ANIMALS?
   - If YES → MUST choose Islamic Miniature (ONLY safe option)
   - NEVER Byzantine/Gothic/Romanesque for animals (religious context!)
2. Analyze photo: people count, subject, mood, age
3. Follow RECOMMENDATIONS (70-80% weight)
4. Choose most DISTINCTIVE artist/style
5. Preserve facial identity
6. IMPORTANT: Include DETAILED style characteristics in your prompt
   - For Islamic Miniature with animals: mention "Persian/Ottoman court painting, garden or hunting scenes with animals, vibrant jewel colors, ornamental floral patterns, secular courtly aesthetic"
   - For Islamic Geometric: mention "CLEARLY VISIBLE geometric patterns, Islamic tessellation, star patterns, interlocking shapes, arabesque motifs, symmetrical geometric composition, decorative Islamic mosaic aesthetic" AND CRITICAL: "ABSOLUTELY NO HUMAN FIGURES OR FACES, pure geometric and floral patterns only, Islamic aniconism tradition"
   - For Byzantine: mention "golden mosaic backgrounds with shimmering gold leaf, flat hieratic frontal figures, divine sacred atmosphere"
   - For Gothic: mention "cathedral stained glass jewel tones, vertical elongated figures, divine holy light streaming through Gothic arches" AND "FLAT TWO-DIMENSIONAL medieval style NOT realistic smooth painting, angular linear forms with hard edges like stained glass panels"
   - For Romanesque: mention "church fresco flat solid forms, biblical narrative simplicity, stone relief aesthetic" AND "FLAT MURAL FRESCO style NOT smooth realistic painting, solid block-like forms with heavy outlines like stone carvings"
   - For other styles: include their signature techniques and visual characteristics

Return JSON only:
{
  "analysis": "brief (1 sentence)",
  "selected_artist": "Artist Name or Style Name",
  "reason": "why (1 sentence)",
  "prompt": "Medieval art in [style name], [DETAILED style characteristics including techniques and visual features], depicting subject while preserving original features"
}`;
        } else {
          // 다른 사조들 (표현주의, 르네상스, 바로크 등)
          promptText = `Select the BEST ${categoryName} artist for this photo.

${guidelines}

${hints}

Instructions:
1. FIRST analyze the photo THOROUGHLY:
   - Subject type (person/landscape/animal/object)
   - If PERSON: gender (male/female), age, physical features (jaw shape, hair, build)
   - PERSON COUNT: How many people are in the photo? (1, 2, 3+)
   - BACKGROUND: What's in the background? (simple/complex/outdoor/indoor)
   - Mood, composition
2. Follow RECOMMENDATIONS (70-80% weight)
3. Choose most DISTINCTIVE artist for THIS specific photo
4. Preserve facial identity and original features
5. Include DETAILED style characteristics in your prompt
6. IMPORTANT: Start prompt with subject description if person
7. CRITICAL: If only 1 person in photo, add "DO NOT add extra people in background, keep background clean"

Return JSON only:
{
  "analysis": "brief (1 sentence)",
  "subject_type": "person" or "landscape" or "animal" or "object",
  "gender": "male" or "female" or "both" or null,
  "age_range": "baby/child/teen/young_adult/adult/middle_aged/elderly" or null,
  "ethnicity": "asian" or "caucasian" or "african" or "hispanic" or "middle_eastern" or "mixed" or null,
  "physical_description": "for MALE: strong jaw, angular face, short hair, broad shoulders etc. For FEMALE: soft features, delicate face etc. ALWAYS include skin tone and ethnic features." or null,
  "person_count": 1 or 2 or 3 (number of people in photo),
  "background_type": "simple" or "complex" or "outdoor" or "indoor" or "studio",
  "selected_artist": "Artist Full Name",
  "reason": "why this artist fits (1 sentence)",
  "prompt": "Start with 'MALE/FEMALE SUBJECT with [physical features]' if person, then 'painting by [Artist], [artist's signature technique], [detailed visual characteristics]'. If person_count=1, END with 'DO NOT add extra people, NO hallucinated figures in background, keep background CLEAN'"
}`;
        }
      }
    }
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',  // Claude Sonnet 4.5 (최신)
        max_tokens: 500,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/jpeg',
                data: imageBase64.split(',')[1]
              }
            },
            {
              type: 'text',
              text: promptText
            }
          ]
        }]
      })
    });
    
    clearTimeout(timeout);
    
    if (!response.ok) {
      throw new Error(`AI API error: ${response.status}`);
    }
    
    const data = await response.json();
    const text = data.content[0].text
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();
    
    const result = JSON.parse(text);
    
    // 검증
    if (!result.prompt || !result.selected_artist) {
      throw new Error('Invalid AI response format');
    }
    
    return {
      success: true,
      artist: result.selected_artist,
      work: result.selected_work,  // 거장 모드: 선택된 대표작
      reason: result.reason,
      prompt: result.prompt,
      analysis: result.analysis,
      // Vision 분석 결과 (통합됨)
      visionData: {
        subject_type: result.subject_type || null,
        gender: result.gender || null,
        age_range: result.age_range || null,
        physical_description: result.physical_description || null,
        person_count: result.person_count || null,
        background_type: result.background_type || null
      }
    };
    
  } catch (error) {
    clearTimeout(timeout);
    console.error('AI selection failed:', error.message);
    return { success: false, error: error.message };
  }
}

// ========================================
// A 방안: 상세 분석 결과를 프롬프트로 변환
// ========================================
function buildIdentityPrompt(visionAnalysis) {
  if (!visionAnalysis || visionAnalysis.subject_type !== 'person') {
    return '';
  }
  
  const parts = [];
  
  // 성별 강조 (가장 중요)
  if (visionAnalysis.gender === 'male') {
    parts.push('MALE SUBJECT with MASCULINE features');
    if (visionAnalysis.physical_description) {
      parts.push(visionAnalysis.physical_description);
    } else {
      parts.push('strong angular jaw, male bone structure, masculine build');
    }
    parts.push('DO NOT feminize, DO NOT soften features, KEEP AS MAN');
  } else if (visionAnalysis.gender === 'female') {
    parts.push('FEMALE SUBJECT with FEMININE features');
    if (visionAnalysis.physical_description) {
      parts.push(visionAnalysis.physical_description);
    } else {
      parts.push('soft delicate features, female bone structure, feminine build');
    }
    parts.push('DO NOT masculinize, KEEP AS WOMAN');
  } else if (visionAnalysis.gender === 'both') {
    // 남녀 혼합 (커플, 그룹 등)
    parts.push('MIXED GENDER GROUP - PRESERVE BOTH GENDERS EXACTLY');
    if (visionAnalysis.physical_description) {
      parts.push(visionAnalysis.physical_description);
    }
    parts.push('MALE figures MUST remain MASCULINE with strong jaw and male bone structure');
    parts.push('FEMALE figures MUST remain FEMININE with soft features and female bone structure');
    parts.push('DO NOT swap genders, DO NOT feminize males, DO NOT masculinize females');
  }
  
  // 나이
  if (visionAnalysis.age_range) {
    const ageMap = {
      'baby': 'BABY infant',
      'child': 'CHILD young kid',
      'teen': 'TEENAGER adolescent',
      'young_adult': 'young adult in 20s',
      'adult': 'adult in 30s-40s',
      'middle_aged': 'middle-aged person in 50s',
      'elderly': 'ELDERLY senior person'
    };
    parts.push(ageMap[visionAnalysis.age_range] || visionAnalysis.age_range);
  }
  
  // 머리
  if (visionAnalysis.hair) {
    parts.push(visionAnalysis.hair);
  }
  
  // 민족성 (매우 중요!)
  if (visionAnalysis.ethnicity) {
    const ethnicityMap = {
      'asian': 'ASIAN ethnicity with East Asian facial features, monolid or double eyelid eyes, warm golden-brown skin tone',
      'caucasian': 'CAUCASIAN ethnicity with European facial features, light skin tone',
      'african': 'AFRICAN ethnicity with African facial features, dark brown skin tone',
      'hispanic': 'HISPANIC/LATINO ethnicity with Latin American features, warm tan skin tone',
      'middle_eastern': 'MIDDLE EASTERN ethnicity with Middle Eastern features, olive skin tone',
      'mixed': 'MIXED ethnicity preserving original mixed heritage features'
    };
    const ethnicDesc = ethnicityMap[visionAnalysis.ethnicity] || `${visionAnalysis.ethnicity} ethnicity`;
    parts.push(ethnicDesc);
    parts.push('DO NOT change race, DO NOT alter skin color, PRESERVE original ethnicity EXACTLY');
  }
  
  return parts.join(', ');
}

// ========================================
// B 방안: 성별에 맞지 않는 화가 필터링
// ========================================
const FEMALE_BIASED_ARTISTS = [
  'VERMEER', 'BOUCHER', 'WATTEAU', 'BOTTICELLI', 'RENOIR'
];

const MALE_BIASED_ARTISTS = [
  'REMBRANDT', 'CARAVAGGIO', 'TITIAN', 'VELÁZQUEZ', 'VELAZQUEZ'
];

// 사조별 남성 적합 화가 목록 (여성 편향 화가 제외)
// 여성 편향: VERMEER, BOUCHER, WATTEAU, BOTTICELLI, RENOIR
const MALE_SUITABLE_ARTISTS_BY_CATEGORY = {
  'impressionism': [
    // RENOIR 제외
    { name: 'CAILLEBOTTE', weight: 50 },  // 도시 남성 전문
    { name: 'MONET', weight: 30 },
    { name: 'DEGAS', weight: 20 }
  ],
  'postImpressionism': [
    // 여성 편향 없음
    { name: 'VAN GOGH', weight: 40 },
    { name: 'CÉZANNE', weight: 25 },
    { name: 'GAUGUIN', weight: 25 },
    { name: 'SIGNAC', weight: 10 }
  ],
  'baroque': [
    // VERMEER 제외
    { name: 'CARAVAGGIO', weight: 45 },
    { name: 'REMBRANDT', weight: 40 },
    { name: 'VELÁZQUEZ', weight: 15 }
  ],
  'renaissance': [
    // BOTTICELLI 제외
    { name: 'LEONARDO DA VINCI', weight: 45 },
    { name: 'TITIAN', weight: 30 },
    { name: 'MICHELANGELO', weight: 15 },
    { name: 'RAPHAEL', weight: 10 }
  ],
  'rococo': [
    // WATTEAU, BOUCHER 둘 다 여성 편향 - 로코코는 원래 여성적 사조
    // 남성 사진엔 로코코 자체가 부적합하지만, 그래도 와토가 그나마 나음
    { name: 'WATTEAU', weight: 70 },
    { name: 'BOUCHER', weight: 30 }
  ],
  'fauvism': [
    // 여성 편향 없음
    { name: 'MATISSE', weight: 40 },
    { name: 'DERAIN', weight: 35 },
    { name: 'VLAMINCK', weight: 25 }
  ],
  'expressionism': [
    // 여성 편향 없음
    { name: 'MUNCH', weight: 30 },
    { name: 'KIRCHNER', weight: 30 },
    { name: 'KOKOSCHKA', weight: 25 },
    { name: 'KANDINSKY', weight: 15 }
  ],
  'modernism': [
    // 여성 편향 없음
    { name: 'PICASSO', weight: 35 },
    { name: 'WARHOL', weight: 25 },
    { name: 'MAGRITTE', weight: 20 },
    { name: 'LICHTENSTEIN', weight: 15 },
    { name: 'KEITH HARING', weight: 5 }
  ],
  'neoclassicism': [
    // 여성 편향 없음 (INGRES는 여성 인물 잘 그리지만 남성도 잘 그림)
    { name: 'JACQUES-LOUIS DAVID', weight: 45 },
    { name: 'INGRES', weight: 25 },
    { name: 'GOYA', weight: 20 },
    { name: 'DELACROIX', weight: 10 }
  ],
  'neoclassicism_vs_romanticism_vs_realism': [
    // neoclassicism과 동일 (별칭)
    { name: 'JACQUES-LOUIS DAVID', weight: 35 },
    { name: 'GOYA', weight: 25 },
    { name: 'DELACROIX', weight: 20 },
    { name: 'MANET', weight: 10 },
    { name: 'MILLET', weight: 10 }
  ]
};

function filterArtistByGender(artistName, gender, category = null) {
  const upperArtist = artistName.toUpperCase();
  
  if (gender === 'male') {
    // 남자 사진인데 여성 편향 화가 선택됨
    for (const femaleArtist of FEMALE_BIASED_ARTISTS) {
      if (upperArtist.includes(femaleArtist)) {
        console.log(`⚠️ Gender filter: ${artistName} is female-biased, but subject is MALE`);
        
        // 사조에 맞는 남성 적합 화가 중 가중치 랜덤 선택
        const maleSuitable = MALE_SUITABLE_ARTISTS_BY_CATEGORY[category];
        if (maleSuitable) {
          const suggestion = weightedRandomSelect(maleSuitable);
          console.log(`🔄 [GENDER-FILTER] Category: ${category}, weight-selected: ${suggestion}`);
          return {
            filtered: true,
            reason: `${artistName} specializes in female subjects`,
            suggestion: suggestion
          };
        }
        
        // fallback
        return {
          filtered: true,
          reason: `${artistName} specializes in female subjects`,
          suggestion: 'REMBRANDT'
        };
      }
    }
  } else if (gender === 'female') {
    // 여자 사진인데 남성 편향 화가는 괜찮음 (여성도 잘 그림)
    // 필터링 안 함
  }
  
  return { filtered: false };
}

// ========================================
// 메인 핸들러
// ========================================
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { image, selectedStyle } = req.body;

    // 디버깅 로그
    console.log('=== FLUX Transfer v33 Debug ===');
    console.log('Has REPLICATE_API_KEY:', !!process.env.REPLICATE_API_KEY);
    console.log('Has ANTHROPIC_API_KEY:', !!process.env.ANTHROPIC_API_KEY);
    console.log('Has image:', !!image);
    console.log('Image length:', image ? image.length : 0);
    console.log('Image starts with:', image ? image.substring(0, 50) : 'N/A');
    console.log('Has selectedStyle:', !!selectedStyle);
    console.log('selectedStyle:', selectedStyle);

    if (!process.env.REPLICATE_API_KEY) {
      console.error('ERROR: REPLICATE_API_KEY not configured');
      return res.status(500).json({ error: 'Replicate API key not configured' });
    }

    if (!image || !selectedStyle) {
      console.error('ERROR: Missing image or selectedStyle');
      console.error('image exists:', !!image);
      console.error('selectedStyle:', JSON.stringify(selectedStyle, null, 2));
      return res.status(400).json({ error: 'Missing image or style' });
    }

    // selectedStyle 구조 검증
    if (!selectedStyle.name || !selectedStyle.category) {
      console.error('ERROR: Invalid selectedStyle structure');
      console.error('selectedStyle:', JSON.stringify(selectedStyle, null, 2));
      return res.status(400).json({ 
        error: 'Invalid style structure',
        details: 'Missing name or category'
      });
    }

    let finalPrompt;
    let selectedArtist;
    let selectedWork;  // 거장 모드: 선택된 대표작
    let selectionMethod;
    let selectionDetails = {};
    let controlStrength = 0.80; // 기본값
    const categoryType = selectedStyle.category; // categoryType 변수 추가
    
    // ========================================
    // 사조별 기본 control_strength 설정
    // 미술사 흐름: 형태 유지 → 변형 → 해체
    // ========================================
    const movementStrengthMap = {
      // 형태 충실 유지 (0.80)
      'ancient-greek-sculpture': 0.80,
      'roman-mosaic': 0.80,
      'byzantine': 0.80,
      'islamic-miniature': 0.80,
      'gothic': 0.80,
      'renaissance': 0.80,
      'baroque': 0.80,
      'rococo': 0.70,  // 로코코: 회화적 붓터치 강조
      'neoclassicism': 0.80,
      'neoclassicism_vs_romanticism_vs_realism': 0.80,
      'romanticism': 0.80,
      
      // 빛으로 형태 흐릿 (0.70)
      'impressionism': 0.70,
      
      // 붓터치/기하학 변형 시작 (0.65)
      'post-impressionism': 0.65,
      
      // 점묘법 (0.60 - 점으로 형태 구성)
      'pointillism': 0.60,
      
      // 색채/감정 폭발 (0.55~0.60)
      'fauvism': 0.60,
      'expressionism': 0.55,
      
      // 동양화 (0.75 - 형태 유지하되 화풍 적용)
      'korean': 0.75,
      'chinese': 0.75,
      'japanese': 0.75,
      
      // 20세기 모더니즘 (화가별 개별 설정 - 여기선 기본값만)
      'modernism': 0.50
    };
    
    // 사조별 기본값 적용
    if (selectedStyle.id && movementStrengthMap[selectedStyle.id]) {
      controlStrength = movementStrengthMap[selectedStyle.id];
      console.log(`📊 Movement-based control_strength: ${selectedStyle.id} → ${controlStrength}`);
    } else if (categoryType === 'oriental') {
      controlStrength = 0.75;
      console.log(`📊 Oriental category control_strength: ${controlStrength}`);
    } else if (categoryType === 'modernism') {
      controlStrength = 0.50; // 모더니즘 기본값 (화가별로 개별 재설정됨)
      console.log(`📊 Modernism category control_strength: ${controlStrength} (will be overridden per artist)`);
    }
    
    // 🎨 풍경/정물/동물일 때 control_strength 높여서 원본 구도 유지
    // (나중에 visionAnalysis 확인 후 조정됨)
    let landscapeStrengthBoost = false;
    
    if (selectedStyle.category === 'oriental' && selectedStyle.id === 'japanese') {
      // 일본 우키요에 (고정)
      console.log('Japanese Ukiyo-e - using fixed style');
      
      const fallback = fallbackPrompts.japanese;
      finalPrompt = fallback.prompt;
      selectedArtist = fallback.name;
      selectionMethod = 'oriental_fixed';
      selectionDetails = {
        style: 'japanese_ukiyoe'
      };
      
    } else if (process.env.ANTHROPIC_API_KEY) {
      console.log(`Trying AI artist selection for ${selectedStyle.name}...`);
      
      // ========================================
      // 🎯 통합된 AI 호출 (화가 선택 + Vision 분석)
      // ========================================
      const aiResult = await selectArtistWithAI(
        image, 
        selectedStyle,
        15000 // 15초 타임아웃 (성공률 98%)
      );
      
      // Vision 분석 결과 추출 (통합됨)
      let visionAnalysis = null;
      let identityPrompt = '';
      
      if (aiResult.success && aiResult.visionData) {
        visionAnalysis = aiResult.visionData;
        identityPrompt = buildIdentityPrompt(visionAnalysis);
        console.log('📸 Vision data (integrated):', visionAnalysis);
        console.log('📸 Identity prompt:', identityPrompt);
      }
      
      // ========================================
      // 🎯 대전제: 가중치 기반 화가 사전 선택
      // ========================================
      let preSelectedArtist = null;
      const photoAnalysis = {}; // AI가 분석하기 전 기본 분석
      
      // Vision 분석 결과를 photoAnalysis에 반영
      if (visionAnalysis) {
        photoAnalysis.gender = visionAnalysis.gender;
        photoAnalysis.age_range = visionAnalysis.age_range;
        photoAnalysis.count = visionAnalysis.person_count || 0;
      }
      
      // 이미지에서 기본 정보 추출 시도 (카테고리별 가중치 테이블이 있는 경우)
      const categoryForWeight = selectedStyle.category;
      if (ARTIST_WEIGHTS[categoryForWeight]) {
        preSelectedArtist = selectArtistByWeight(categoryForWeight, photoAnalysis);
        if (preSelectedArtist) {
          console.log(`🎲 [WEIGHT-BASED] Pre-selected artist: ${preSelectedArtist} (category: ${categoryForWeight})`);
          
          // ========================================
          // 🔴 B 방안: 성별에 맞지 않는 화가 필터링
          // ========================================
          if (visionAnalysis && visionAnalysis.gender) {
            const filterResult = filterArtistByGender(preSelectedArtist, visionAnalysis.gender, categoryForWeight);
            if (filterResult.filtered) {
              console.log(`🚫 [GENDER-FILTER] ${filterResult.reason}`);
              console.log(`🔄 [GENDER-FILTER] Suggesting: ${filterResult.suggestion}`);
              preSelectedArtist = filterResult.suggestion;
            }
          }
        }
      }
      
      if (aiResult.success) {
        // AI 성공!
        finalPrompt = aiResult.prompt;
        selectedArtist = aiResult.artist;
        selectedWork = aiResult.work;  // 거장 모드: 선택된 대표작
        selectionMethod = 'ai_auto';
        selectionDetails = {
          analysis: aiResult.analysis,
          reason: aiResult.reason
        };
        console.log('✅✅✅ [V41-TEST-SUCCESS] AI selected:', selectedArtist);
        console.log('✅✅✅ [V48] Selected work:', selectedWork);
        
        // ========================================
        // 🎯 대전제: AI 분석 후 가중치 기반 화가 재선택
        // ========================================
        const categoryForWeight = selectedStyle.category;
        if (ARTIST_WEIGHTS[categoryForWeight]) {
          // AI 분석 결과에서 사진 정보 추출
          const analysisText = (aiResult.analysis || '').toLowerCase();
          const photoAnalysisFromAI = {
            count: 0,
            subject: analysisText,
            gender: null,
            age: null,
            background: analysisText
          };
          
          // 🚨 Vision이 landscape/animal/object로 판단했으면 count=0 유지
          if (visionAnalysis && (visionAnalysis.subject_type === 'landscape' || 
                                  visionAnalysis.subject_type === 'animal' || 
                                  visionAnalysis.subject_type === 'object')) {
            photoAnalysisFromAI.count = 0;
            photoAnalysisFromAI.subject = visionAnalysis.subject_type;
            console.log(`📸 [VISION-OVERRIDE] Subject is ${visionAnalysis.subject_type}, keeping count=0`);
          } else {
            // 인원수 추출 (인물 사진일 때만)
            if (analysisText.includes('group') || analysisText.includes('people') || analysisText.includes('family')) {
              photoAnalysisFromAI.count = 3;
            } else if (analysisText.includes('couple') || analysisText.includes('two') || analysisText.includes('pair')) {
              photoAnalysisFromAI.count = 2;
            } else if (analysisText.includes('person') || analysisText.includes('portrait') || analysisText.includes('face') || 
                       analysisText.includes('man') || analysisText.includes('woman') || analysisText.includes('child')) {
              photoAnalysisFromAI.count = 1;
            }
          }
          
          // 성별 추출
          if (analysisText.includes('woman') || analysisText.includes('female') || analysisText.includes('girl')) {
            photoAnalysisFromAI.gender = 'female';
          } else if (analysisText.includes('man') || analysisText.includes('male') || analysisText.includes('boy')) {
            photoAnalysisFromAI.gender = 'male';
          }
          
          // 나이 추출
          if (analysisText.includes('elderly') || analysisText.includes('old') || analysisText.includes('aged')) {
            photoAnalysisFromAI.age = 'elderly';
          }
          
          // 가중치 기반 화가 선택
          let weightSelectedArtist = selectArtistByWeight(categoryForWeight, photoAnalysisFromAI);
          
          // ========================================
          // 🔴 B 방안: 성별에 맞지 않는 화가 필터링 (가중치 선택 후)
          // ========================================
          if (weightSelectedArtist && visionAnalysis && visionAnalysis.gender) {
            const filterResult = filterArtistByGender(weightSelectedArtist, visionAnalysis.gender, categoryForWeight);
            if (filterResult.filtered) {
              console.log(`🚫 [GENDER-FILTER] ${weightSelectedArtist} filtered: ${filterResult.reason}`);
              console.log(`🔄 [GENDER-FILTER] Replacing with: ${filterResult.suggestion}`);
              weightSelectedArtist = filterResult.suggestion;
            }
          }
          
          if (weightSelectedArtist) {
            console.log(`🎲 [WEIGHT-OVERRIDE] Changing from "${selectedArtist}" to "${weightSelectedArtist}"`);
            console.log(`   Photo analysis: count=${photoAnalysisFromAI.count}, gender=${photoAnalysisFromAI.gender}, age=${photoAnalysisFromAI.age}`);
            
            // 화가 교체
            const oldArtist = selectedArtist;
            selectedArtist = weightSelectedArtist;
            selectionMethod = 'weight_random';
            selectionDetails.weightOverride = {
              original: oldArtist,
              selected: weightSelectedArtist,
              photoType: detectPhotoType(photoAnalysisFromAI)
            };
            
            // 🎯 모든 사조: 화가별 개별 프롬프트로 완전 교체 (다른 화가 언급 제거!)
            const artistPromptMap = {
              'ancient': getAncientArtistPrompt,
              'medieval': getMedievalArtistPrompt,
              'renaissance': getRenaissanceArtistPrompt,
              'baroque': getBaroqueArtistPrompt,
              'rococo': getRococoArtistPrompt,
              'neoclassicism': getNeoclassicismArtistPrompt,
              'neoclassicism_vs_romanticism_vs_realism': getNeoclassicismArtistPrompt,  // 별칭
              'impressionism': getImpressionismArtistPrompt,
              'postImpressionism': getPostImpressionismArtistPrompt,
              'fauvism': getFauvismArtistPrompt,
              'expressionism': getExpressionismArtistPrompt,
              'modernism': getModernismArtistPrompt
            };
            
            if (artistPromptMap[categoryForWeight]) {
              // subjectType 전달 (풍경/정물/동물일 때 인물 관련 프롬프트 제거)
              const subjectType = visionAnalysis ? visionAnalysis.subject_type : 'person';
              finalPrompt = artistPromptMap[categoryForWeight](weightSelectedArtist, subjectType);
              console.log(`🎨 [${categoryForWeight.toUpperCase()}] Replaced prompt with ${weightSelectedArtist}-only prompt (subjectType: ${subjectType})`);
            } else {
              // 프롬프트 함수 없는 사조: 기존 방식 (화가 이름만 교체)
              finalPrompt = finalPrompt.replace(new RegExp(oldArtist, 'gi'), weightSelectedArtist);
            }
            
            // 🚨 성별 감지 기반 강력한 프롬프트 삽입 (맨 앞)
            // E 방안: Vision 분석 결과가 있으면 더 상세한 프롬프트 사용
            let genderPrefix = '';
            
            // 풍경/정물/동물일 때는 성별 프롬프트 건너뛰기
            const isNonPerson = visionAnalysis && (
              visionAnalysis.subject_type === 'landscape' || 
              visionAnalysis.subject_type === 'animal' || 
              visionAnalysis.subject_type === 'object'
            );
            
            if (isNonPerson) {
              console.log(`📸 [NON-PERSON] Subject is ${visionAnalysis.subject_type}, skipping gender prefix`);
              // 풍경/정물용 프롬프트
              genderPrefix = `CRITICAL: This is a ${visionAnalysis.subject_type.toUpperCase()} photo - DO NOT add any people or human figures. Keep as pure ${visionAnalysis.subject_type}. `;
              
              // 🎨 풍경/정물일 때 control_strength 높여서 원본 구도 유지
              const originalStrength = controlStrength;
              controlStrength = Math.min(controlStrength + 0.15, 0.90);  // +0.15, 최대 0.90
              console.log(`📊 [LANDSCAPE-BOOST] control_strength: ${originalStrength} → ${controlStrength} (원본 구도 유지 강화)`);
              
              // 🎨 [방법 C] 풍경일 때 프롬프트에서 사람 관련 표현 제거
              const originalPromptLength = finalPrompt.length;
              finalPrompt = finalPrompt
                // 들라크루아 - 사람/액션 관련
                .replace(/Liberty Leading the People style dramatic action,?\s*/gi, '')
                .replace(/dramatic gestures and heroic romantic intensity,?\s*/gi, 'dramatic romantic intensity, ')
                .replace(/heroic idealized figures in classical poses,?\s*/gi, '')
                .replace(/heroic idealized figures,?\s*/gi, '')
                // 다비드 - 영웅적 인물
                .replace(/heroic idealized figures in classical poses,?\s*/gi, '')
                // 밀레 - 농민
                .replace(/monumental peasant figures,?\s*/gi, '')
                .replace(/DIGNIFIED RURAL LABOR with monumental peasant figures,?\s*/gi, 'DIGNIFIED RURAL SCENE, ')
                // 마네 - 도시인물
                .replace(/sophisticated urban café society atmosphere,?\s*/gi, 'sophisticated urban atmosphere, ')
                .replace(/frank direct confrontational gaze,?\s*/gi, '')
                // 고야 - 시선/인물
                .replace(/penetrating gaze and inner truth revealed,?\s*/gi, '')
                .replace(/La Maja Vestida style Spanish elegance for portraits,?\s*/gi, '')
                .replace(/court painter sophistication with underlying tension,?\s*/gi, 'sophisticated composition with underlying tension, ')
                // 르누아르 - 살결
                .replace(/rosy pink flesh tones with pearly highlights,?\s*/gi, 'rosy pink tones with pearly highlights, ')
                .replace(/warm flesh tones,?\s*/gi, 'warm tones, ')
                // 로코코 - 귀족/인물
                .replace(/aristocratic.*?gathering,?\s*/gi, 'elegant gathering, ')
                .replace(/elegant figures in shimmering silk costumes,?\s*/gi, '')
                .replace(/theatrical graceful poses,?\s*/gi, 'theatrical graceful composition, ')
                // 인상주의 - 인물
                .replace(/elegant bourgeois figures in urban settings,?\s*/gi, 'elegant urban settings, ')
                .replace(/capturing movement and gesture,?\s*/gi, 'capturing movement, ')
                // 바로크 - 인물
                .replace(/intense emotional realism,?\s*/gi, 'intense emotional atmosphere, ')
                // 르네상스 - 인물
                .replace(/faces emerging from smoky darkness,?\s*/gi, 'forms emerging from smoky darkness, ')
                .replace(/idealized graceful figures,?\s*/gi, 'idealized graceful forms, ')
                .replace(/HEROIC SCULPTURAL FIGURES with powerful muscular anatomy,?\s*/gi, 'HEROIC SCULPTURAL FORMS, ')
                .replace(/elegant elongated figures,?\s*/gi, 'elegant elongated forms, ')
                // 야수파/표현주의 - 인물
                .replace(/simplified joyful forms,?\s*/gi, 'joyful forms, ')
                // 연속 쉼표/공백 정리
                .replace(/,\s*,/g, ',')
                .replace(/,\s*\./g, '.')
                .replace(/\s{2,}/g, ' ')
                .trim();
              
              console.log(`🎨 [LANDSCAPE-FILTER] Removed human-related expressions: ${originalPromptLength} → ${finalPrompt.length} chars`);
            } else if (identityPrompt && identityPrompt.length > 0) {
              // Vision 분석 결과 사용 (더 상세함)
              genderPrefix = `ABSOLUTE REQUIREMENT: ${identityPrompt}. `;
              console.log('🚨 Using Vision-based identity prompt');
            } else if (photoAnalysisFromAI.gender === 'male') {
              genderPrefix = 'ABSOLUTE REQUIREMENT: This is a MALE person - subject MUST have MASCULINE face with strong jaw, male bone structure, NO feminine features, DO NOT make female, DO NOT add makeup or feminine traits, DO NOT soften features, KEEP AS MAN. ';
              console.log('🚨 Detected MALE - Added MASCULINE enforcement');
            } else if (photoAnalysisFromAI.gender === 'female') {
              genderPrefix = 'ABSOLUTE REQUIREMENT: This is a FEMALE person - subject MUST have FEMININE face with soft features, female bone structure, KEEP AS WOMAN. ';
              console.log('🚨 Detected FEMALE - Added FEMININE enforcement');
            } else if (photoAnalysisFromAI.gender === 'both' || (visionAnalysis && visionAnalysis.gender === 'both')) {
              genderPrefix = 'ABSOLUTE REQUIREMENT: MIXED GENDER GROUP - MALE figures MUST remain MASCULINE with strong jaw and male bone structure, FEMALE figures MUST remain FEMININE with soft features, DO NOT swap genders, DO NOT feminize males, DO NOT masculinize females, PRESERVE EACH PERSON\'S ORIGINAL GENDER EXACTLY. ';
              console.log('🚨 Detected BOTH genders - Added MIXED preservation rule');
            } else {
              // 성별 미감지 시에도 강력한 보존 규칙 적용
              genderPrefix = 'ABSOLUTE REQUIREMENT: STRICTLY PRESERVE ORIGINAL GENDER from photo - if subject appears MALE keep MASCULINE features with strong jaw and male bone structure DO NOT feminize DO NOT soften DO NOT add feminine traits, if subject appears FEMALE keep FEMININE features. ';
              console.log('🚨 Gender unknown - Added STRONG preservation rule');
            }
            finalPrompt = genderPrefix + finalPrompt;
            
            // ========================================
            // 🚫 환각 방지: 원본에 없는 요소 추가 금지
            // ========================================
            let antiHallucinationRule = ' STRICT ANTI-HALLUCINATION: DO NOT add ANY elements not present in the original photo. ';
            
            if (visionAnalysis) {
              const count = visionAnalysis.person_count;
              const subjectType = visionAnalysis.subject_type;
              
              if (subjectType === 'person' && count) {
                if (count === 1) {
                  antiHallucinationRule += 'Original has EXACTLY 1 PERSON - DO NOT add extra people or faces in background. ';
                } else if (count === 2) {
                  antiHallucinationRule += 'Original has EXACTLY 2 PEOPLE - DO NOT add extra people. ';
                } else {
                  antiHallucinationRule += `Original has EXACTLY ${count} PEOPLE - maintain same count. `;
                }
              } else if (subjectType === 'landscape') {
                antiHallucinationRule += 'This is LANDSCAPE - DO NOT add people or figures not in original. ';
              } else if (subjectType === 'animal') {
                antiHallucinationRule += 'This is ANIMAL photo - DO NOT add humans or extra animals not in original. ';
              } else if (subjectType === 'object') {
                antiHallucinationRule += 'This is OBJECT/STILL LIFE - DO NOT add people or extra objects not in original. ';
              }
              
              antiHallucinationRule += 'Keep composition faithful to original photo. NO hallucinated elements.';
            }
            
            finalPrompt = finalPrompt + antiHallucinationRule;
            console.log('🚫 Anti-hallucination rule added:', antiHallucinationRule);
            
            console.log(`✅ [WEIGHT-BASED] Final artist: ${selectedArtist}`);
          }
        }
        // ========================================
        // 끝: 가중치 기반 화가 재선택
        // ========================================
        
        // ===== 디버그 시작 =====
        console.log('DEBUG: selectedArtist raw value:', selectedArtist);
        console.log('DEBUG: selectedArtist type:', typeof selectedArtist);
        console.log('DEBUG: selectedArtist JSON:', JSON.stringify(selectedArtist));
        console.log('DEBUG: toUpperCase:', selectedArtist.toUpperCase());
        console.log('DEBUG: toUpperCase + trim:', selectedArtist.toUpperCase().trim());
        console.log('DEBUG: includes LEONARDO?', selectedArtist.toUpperCase().trim().includes('LEONARDO'));
        console.log('DEBUG: includes DA VINCI?', selectedArtist.toUpperCase().trim().includes('DA VINCI'));
        // ===== 디버그 끝 =====
        
        // ========================================
        // 고대 그리스-로마 강화 프롬프트
        // ========================================
        
        // 고대 조각 선택시 대리석 강화
        if (selectedArtist.toUpperCase().trim().includes('SCULPTURE') || 
            selectedArtist.toUpperCase().trim().includes('CLASSICAL') ||
            selectedArtist.includes('조각')) {
          console.log('🎯 Classical Sculpture detected');
          if (!finalPrompt.includes('CARRARA MARBLE')) {
            finalPrompt = finalPrompt + ', PURE WHITE CARRARA MARBLE ancient Greek-Roman sculpture: CRITICAL - ENTIRE IMAGE must be COMPLETELY STONE including ALL clothing transformed to carved marble drapery with realistic fabric folds in stone, ALL skin becomes smooth polished marble with subtle veining, MONOCHROMATIC white/cream/grey tones ONLY with NO other colors, heroic classical proportions like Discobolus or Augustus of Prima Porta, MUSEUM PEDESTAL DISPLAY with neutral grey background, dramatic sculptural lighting with soft shadows emphasizing carved forms, frozen dynamic moment captured in eternal marble, authentic ancient masterpiece quality, render subject ATTRACTIVELY and BEAUTIFULLY';
            controlStrength = 0.55;
            console.log('✅ Enhanced Classical Sculpture marble effect (control_strength 0.55)');
          } else {
            console.log('ℹ️ Marble effect already in prompt');
          }
        }
        
        // 로마 모자이크 선택시 테세라 강화
        if (selectedArtist.toUpperCase().trim().includes('MOSAIC') || 
            selectedArtist.toUpperCase().trim().includes('ROMAN') ||
            selectedArtist.includes('모자이크')) {
          console.log('🎯 Roman Mosaic detected');
          if (!finalPrompt.includes('TESSERAE')) {
            finalPrompt = finalPrompt + ', Ancient Roman floor mosaic: CRITICAL - LARGE VISIBLE TESSERAE TILES (20-30mm each square/rectangular stone pieces), THICK DARK GROUT LINES clearly visible between EVERY tile creating grid pattern, LIMITED ANCIENT COLOR PALETTE (terracotta orange, ochre yellow, umber brown, ivory white, slate blue, olive green), Pompeii villa floor style like Alexander Mosaic or Cave Canem, each tile must be INDIVIDUALLY DISTINGUISHABLE as separate stone piece, authentic ancient Roman craftsmanship, render subject ATTRACTIVELY';
            controlStrength = 0.60;
            console.log('✅ Enhanced Roman Mosaic tesserae effect (control_strength 0.60)');
          } else {
            console.log('ℹ️ Mosaic effect already in prompt');
          }
        }
        
        // ========================================
        // 중세 미술 강화 프롬프트
        // ========================================
        
        // 비잔틴 선택시 금박 후광 강화
        if (selectedArtist.toUpperCase().trim().includes('BYZANTINE') || 
            selectedArtist.includes('비잔틴')) {
          console.log('🎯 Byzantine detected');
          if (!finalPrompt.includes('HALO')) {
            finalPrompt = finalPrompt + ', Byzantine sacred icon painting: CRITICAL - CIRCULAR GOLDEN HALO (nimbus) behind head as bright radiating disc of divine light, ENTIRE BACKGROUND must be SHIMMERING GOLD LEAF mosaic with visible tiny square tesserae tiles, flat hieratic frontal pose with LARGE SOLEMN EYES gazing directly at viewer, simplified iconic facial features with spiritual transcendence, rich jewel colors (deep red, royal blue, purple) for robes, gold decorative patterns on clothing, sacred ethereal atmosphere, Eastern Orthodox icon style like Christ Pantocrator or Theotokos, PRESERVE subject face identity and age, divine holy masterpiece quality';
            controlStrength = 0.55;
            console.log('✅ Enhanced Byzantine GOLDEN HALO + gold background (control_strength 0.55)');
          } else {
            console.log('ℹ️ Byzantine halo already in prompt');
          }
        }
        
        // 고딕 선택시 스테인드글라스 강화
        if (selectedArtist.toUpperCase().trim().includes('GOTHIC') || 
            selectedArtist.includes('고딕')) {
          console.log('🎯 Gothic detected');
          if (!finalPrompt.includes('STAINED GLASS')) {
            finalPrompt = finalPrompt + ', Gothic cathedral STAINED GLASS window style: CRITICAL - THICK BLACK LEAD LINES (cames) dividing image into segments like actual stained glass, JEWEL-TONE TRANSLUCENT COLORS (ruby red, sapphire blue, emerald green, amber gold) as if light shining through colored glass, FLAT TWO-DIMENSIONAL medieval aesthetic NOT realistic, elongated vertical figures with elegant poses, Gothic pointed arch frame, divine holy light streaming through, PRESERVE subject face identity and age, sacred cathedral masterpiece quality';
            controlStrength = 0.55;
            console.log('✅ Enhanced Gothic STAINED GLASS effect (control_strength 0.55)');
          } else {
            console.log('ℹ️ Gothic stained glass already in prompt');
          }
        }
        
        // ========================================
        // 르네상스 ~ 바로크 강화 프롬프트
        // ========================================
        
        // 레오나르도 다 빈치 선택시 스푸마토 초강화 + control_strength 0.65
        if (selectedArtist.toUpperCase().trim().includes('LEONARDO') || selectedArtist.toUpperCase().trim().includes('DA VINCI')) {
          console.log('🎯 Leonardo da Vinci detected');
          if (!finalPrompt.includes('Mona Lisa-style')) {
            finalPrompt = finalPrompt + ', painting by Leonardo da Vinci: CRITICAL SFUMATO - ALL EDGES must be EXTREMELY SOFT AND BLURRED like smoke or fog, ZERO SHARP LINES anywhere in entire image, every boundary DISSOLVED into hazy atmospheric mist, faces and figures emerging from smoky darkness, Mona Lisa and Virgin of the Rocks style MYSTERIOUS HAZE, colors blending seamlessly with NO hard transitions, warm golden-brown Renaissance palette, SOFT FOCUS throughout like looking through gauze, oil painting texture with subtle glazing layers, NOT sharp NOT clear NOT digital, PRESERVE original subject identity age and ethnicity exactly, child must remain child, DO NOT add elements not in original photo, sfumato masterpiece quality';
            controlStrength = 0.55;
            console.log('✅ Enhanced Leonardo EXTREME sfumato (control_strength 0.55)');
          } else {
            console.log('ℹ️ Leonardo sfumato already in prompt (AI included it)');
          }
        }
        
        // 카라바조 선택시 키아로스쿠로 강화
        if (selectedArtist.toUpperCase().trim().includes('CARAVAGGIO')) {
          console.log('🎯 Caravaggio detected');
          if (!finalPrompt.includes('DRAMATIC chiaroscuro')) {
            finalPrompt = finalPrompt + ', DRAMATIC chiaroscuro with extreme light-dark contrast, theatrical spotlight effect, deep black shadows, tenebrism technique';
            console.log('✅ Enhanced Caravaggio chiaroscuro added');
          } else {
            console.log('ℹ️ Caravaggio chiaroscuro already in prompt (AI included it)');
          }
        }
        
        // 렘브란트 선택시 빛 강화
        if (selectedArtist.toUpperCase().trim().includes('REMBRANDT')) {
          console.log('🎯 Rembrandt detected');
          if (!finalPrompt.includes('golden luminous light')) {
            finalPrompt = finalPrompt + ', MASTERFUL use of golden luminous light, warm glowing illumination, subtle light gradations, Rembrandt lighting technique with soft transitions between light and shadow';
            console.log('✅ Enhanced Rembrandt lighting added');
          } else {
            console.log('ℹ️ Rembrandt lighting already in prompt (AI included it)');
          }
        }
        
        // 티치아노 선택시 베네치아 색채와 티치아노 레드 강화
        if (selectedArtist.toUpperCase().trim().includes('TITIAN')) {
          console.log('🎯 Titian detected');
          if (!finalPrompt.includes('Titian red')) {
            finalPrompt = finalPrompt + ', painting by Titian, Venetian painting-style with rich luminous colors and signature Titian red tones, thick layered glazing technique creating depth and luminosity, warm golden-amber atmosphere, sensuous fluid brushwork, sumptuous color harmonies with radiant warm palette, glowing flesh tones and rich drapery';
            console.log('✅ Enhanced Titian colors added');
          } else {
            console.log('ℹ️ Titian colors already in prompt (AI included it)');
          }
        }
        
        // 보티첼리 선택시 흐르는 우아함 강화
        if (selectedArtist.toUpperCase().trim().includes('BOTTICELLI')) {
          console.log('🎯 Botticelli detected');
          if (!finalPrompt.includes('Birth of Venus')) {
            finalPrompt = finalPrompt + ', painting by Sandro Botticelli, Birth of Venus-style flowing graceful lines with wind-blown hair streaming elegantly, delicate drapery flowing in gentle curves, soft pastel colors of pale pinks seafoam greens and golden highlights, lyrical elegant movement and ethereal beauty, tender linear grace with elongated elegant figures';
            console.log('✅ Enhanced Botticelli flowing grace added');
          } else {
            console.log('ℹ️ Botticelli grace already in prompt (AI included it)');
          }
        }
        
        // 베르메르 선택시 진주귀걸이 소녀 빛 강화
        if (selectedArtist.toUpperCase().trim().includes('VERMEER')) {
          console.log('🎯 Vermeer detected');
          if (!finalPrompt.includes('pearl-like luminosity')) {
            finalPrompt = finalPrompt + ', painting by Johannes Vermeer, soft window light with pearl-like luminosity, cool blue and warm yellow color harmonies, precise delicate brushwork with photographic clarity, intimate domestic tranquility and serene peaceful atmosphere, subtle side lighting creating gentle shadows';
            console.log('✅ Enhanced Vermeer pearl light added');
          } else {
            console.log('ℹ️ Vermeer pearl light already in prompt (AI included it)');
          }
        }
        
        // 터너 선택시 안개 용해 강화
        if (selectedArtist.toUpperCase().trim().includes('TURNER')) {
          console.log('🎯 Turner detected');
          if (!finalPrompt.includes('dissolving into mist')) {
            finalPrompt = finalPrompt + ', painting by J.M.W. Turner, atmospheric sublime landscape-style with all forms dissolving into golden luminous mist and haze, swirling turbulent skies with dramatic light effects, warm golden yellows fiery oranges and ethereal blues, forms barely visible through fog and melting into atmosphere, loose fluid brushstrokes creating dreamlike transcendent beauty';
            console.log('✅ Enhanced Turner mist added');
          } else {
            console.log('ℹ️ Turner mist already in prompt (AI included it)');
          }
        }
        
        // v59: 고야 선택시 심리적 깊이 강화
        if (selectedArtist.toUpperCase().trim().includes('GOYA')) {
          console.log('🎯 Goya detected');
          if (!finalPrompt.includes('La Maja')) {
            finalPrompt = finalPrompt + ', painting by Francisco Goya, La Maja Vestida-style Spanish romantic elegance with psychological intensity and penetrating gaze, dramatic chiaroscuro with deep rich shadows and stark contrasts, dark romantic palette with sumptuous blacks warm flesh tones and muted earth colors, unflinching honesty capturing inner truth and human nature, court painter sophistication with underlying tension';
            console.log('✅ Enhanced Goya psychological depth added');
          } else {
            console.log('ℹ️ Goya depth already in prompt (AI included it)');
          }
        }
        
        // 들라크루아 선택시 혁명적 역동성 강화
        if (selectedArtist.toUpperCase().trim().includes('DELACROIX')) {
          console.log('🎯 Delacroix detected');
          if (!finalPrompt.includes('Liberty Leading')) {
            finalPrompt = finalPrompt + ', painting by Eugène Delacroix, Liberty Leading the People-style passionate revolutionary energy, vivid dramatic colors with bold reds blues and warm golden tones at intense saturation, dynamic diagonal composition with turbulent movement, loose expressive brushstrokes full of emotion and action, dramatic gestures and heroic romantic intensity';
            console.log('✅ Enhanced Delacroix energy added');
          } else {
            console.log('ℹ️ Delacroix energy already in prompt (AI included it)');
          }
        }
        
        // 모네 선택시 수련/빛 포착 강화
        if (selectedArtist.toUpperCase().trim().includes('MONET')) {
          console.log('🎯 Monet detected');
          if (!finalPrompt.includes('Water Lilies')) {
            finalPrompt = finalPrompt + ', painting by Claude Monet, Water Lilies-style capturing fleeting light effects with visible short impressionist brushstrokes, pure unmixed colors dabbed side by side, broken color technique with small distinct touches, shimmering luminous atmosphere with light reflecting on water, plein-air freshness with loose fluid brushwork';
            console.log('✅ Enhanced Monet Water Lilies added');
          } else {
            console.log('ℹ️ Monet Water Lilies already in prompt (AI included it)');
          }
        }
        
        // 드가 선택시 발레리나 움직임 강화
        if (selectedArtist.toUpperCase().trim().includes('DEGAS')) {
          console.log('🎯 Degas detected');
          if (!finalPrompt.includes('Degas')) {
            finalPrompt = finalPrompt + ', painting by Edgar Degas: SOFT PASTEL and oil paint texture with VISIBLE CHALKY STROKES, pale muted colors (soft pink peach powder blue sage green), diagonal asymmetric composition with unusual cropped viewpoints, delicate precise drawing with gentle sfumato edges, warm intimate indoor lighting, VISIBLE CANVAS TEXTURE through thin paint layers, impressionist brushwork NOT smooth NOT digital, CRITICAL IDENTITY: PRESERVE original subject face identity age and ethnicity exactly - child must remain child Asian must remain Asian, DO NOT change clothing from original photo, DO NOT add ballet dancers or people not in original photo, apply Degas artistic style to EXISTING scene only, masterpiece quality';
            controlStrength = 0.60;
            console.log('✅ Enhanced Degas pastel + identity preserve (control_strength 0.60)');
          } else {
            console.log('ℹ️ Degas style already in prompt (AI included it)');
          }
        }
        
        // 세잔 선택시 기하학적 구조 강화
        if (selectedArtist.toUpperCase().trim().includes('CÉZANNE') || selectedArtist.toUpperCase().trim().includes('CEZANNE')) {
          console.log('🎯 Cézanne detected');
          if (!finalPrompt.includes('Still Life with Apples')) {
            finalPrompt = finalPrompt + ', painting by Paul Cézanne, Still Life with Apples-style geometric analysis of forms into cylinders spheres and cones, multiple simultaneous viewpoints (proto-Cubism), constructive brushstrokes building architectural volumes, modulated colors creating solid sculptural forms, visible parallel brushstrokes creating structure and depth, geometric precision';
            console.log('✅ Enhanced Cézanne geometry added');
          } else {
            console.log('ℹ️ Cézanne geometry already in prompt (AI included it)');
          }
        }
        
        // 고갱 선택시 평면적 원시주의 강화
        if (selectedArtist.toUpperCase().trim().includes('GAUGUIN')) {
          console.log('🎯 Gauguin detected');
          if (!finalPrompt.includes('Gauguin')) {
            finalPrompt = finalPrompt + ', painting by Paul Gauguin Tahitian period: FLAT BOLD AREAS of pure unmixed saturated color WITHOUT shading or modeling, simplified forms with smooth flat surfaces, exotic tropical palette (deep orange, ochre yellow, turquoise, rich purple, vibrant green), Tahitian Women style with decorative simplified figures, warm golden skin tones, lush tropical background, Post-Impressionist flat color planes, VISIBLE BRUSHSTROKES with oil paint texture, NOT mosaic NOT stained glass NOT geometric tiles, PRESERVE original subject face identity age and ethnicity, Gauguin masterpiece quality';
            controlStrength = 0.60;
            console.log('✅ Enhanced Gauguin flat colors + identity preserve (control_strength 0.60)');
          } else {
            console.log('ℹ️ Gauguin style already in prompt (AI included it)');
          }
        }
        
        // 시냐크 선택시 점묘법 강화 (v48 추가)
        if (selectedArtist.toUpperCase().trim().includes('SIGNAC') ||
            selectedArtist.includes('시냐크')) {
          console.log('🎯 Signac detected');
          if (!finalPrompt.includes('pointillist') && !finalPrompt.includes('dots')) {
            finalPrompt = finalPrompt + ', painting by Paul Signac, POINTILLIST Neo-Impressionist style with TINY DISTINCT DOTS of pure unmixed color placed side by side, VISIBLE DOTS throughout entire image including sky water and all surfaces, The Port of Saint-Tropez and Portrait of Félix Fénéon style, vibrant luminous harbor and coastal scenes, brilliant Mediterranean sunlight effect, small color DOTS NOT tiles NOT mosaic, NO blended brushstrokes only separate dots, optical color mixing creates shimmering radiant atmosphere, vivid blues greens oranges pinks';
            controlStrength = 0.55;
            console.log('✅ Enhanced Signac pointillism added (control_strength 0.55)');
          } else {
            console.log('ℹ️ Signac pointillism already in prompt (AI included it)');
          }
        }
        
        // 칸딘스키 선택시 추상 색채 강화
        if (selectedArtist.toUpperCase().trim().includes('KANDINSKY')) {
          console.log('🎯 Kandinsky detected');
          if (!finalPrompt.includes('abstract color explosion')) {
            finalPrompt = finalPrompt + ', painting by Wassily Kandinsky, Composition VII-style pure abstract color explosion with NO recognizable objects, vibrant spiritual color harmonies of intense reds blues yellows and greens, dynamic geometric and organic shapes flowing like visual music, bold lines circles and triangles in rhythmic composition, completely non-representational pure color form and movement';
            console.log('✅ Enhanced Kandinsky abstract added');
          } else {
            console.log('ℹ️ Kandinsky abstract already in prompt (AI included it)');
          }
        }
        
        // 실레 선택시 왜곡된 신체 강화
        if (selectedArtist.toUpperCase().trim().includes('SCHIELE')) {
          console.log('🎯 Schiele detected');
          if (!finalPrompt.includes('distorted angular')) {
            finalPrompt = finalPrompt + ', painting by Egon Schiele, expressive figure-style distorted angular body forms with twisted contorted poses, sharp angular lines and exaggerated elongated limbs, raw psychological tension and erotic stark linearity, thin wiry contour lines with intense expressive distortion, earthy muted colors with areas of bare canvas showing, body feeling tortured and psychologically intense with extreme angular distortion';
            console.log('✅ Enhanced Schiele distortion added');
          } else {
            console.log('ℹ️ Schiele distortion already in prompt (AI included it)');
          }
        }
        
        // ========================================
        // v35 추가: 21명 화가 FLUX 최적화
        // ========================================
        
        // 다비드 선택시 신고전주의 명확성 강화
        if (selectedArtist.toUpperCase().trim().includes('DAVID') || 
            selectedArtist.toUpperCase().trim().includes('JACQUES-LOUIS')) {
          console.log('🎯 David detected');
          if (!finalPrompt.includes('Neoclassical grandeur')) {
            finalPrompt = finalPrompt + ', painting by Jacques-Louis David, Oath of the Horatii-style Neoclassical grandeur with SHARP CLEAR OUTLINES and precise linear definition throughout every form, perfect symmetrical classical composition with strong geometric structure, cool refined color palette dominated by stone grays slate blues and muted earth tones, heroic dignified poses with noble gestures frozen in timeless moment, meticulous detailed rendering of drapery and anatomy, cold rational perfection with dramatic theatrical lighting, severe architectural clarity and moral grandeur';
            console.log('✅ Enhanced David Neoclassical clarity added');
          } else {
            console.log('ℹ️ David clarity already in prompt (AI included it)');
          }
        }
        
        // 앵그르 선택시 완벽한 윤곽선 강화
        if (selectedArtist.toUpperCase().trim().includes('INGRES')) {
          console.log('🎯 Ingres detected');
          if (!finalPrompt.includes('La Grande Odalisque')) {
            finalPrompt = finalPrompt + ', painting by Jean-Auguste-Dominique Ingres, La Grande Odalisque-style with PERFECTLY SMOOTH FLOWING CONTOURS like polished marble surface, porcelain-smooth skin with not a single visible brushstroke anywhere, elegant sinuous curves and graceful elongated forms, idealized classical beauty with refined aristocratic elegance, meticulous precise detail in every element, cool serene color palette with subtle flesh tones, flawless enamel-like finish with absolute technical perfection, linear purity and smooth transitions';
            console.log('✅ Enhanced Ingres smooth perfection added');
          } else {
            console.log('ℹ️ Ingres perfection already in prompt (AI included it)');
          }
        }
        
        // 프리드리히 선택시 숭고한 풍경 강화
        if (selectedArtist.toUpperCase().trim().includes('FRIEDRICH') || 
            selectedArtist.toUpperCase().trim().includes('CASPAR DAVID')) {
          console.log('🎯 Friedrich detected');
          if (!finalPrompt.includes('Wanderer above')) {
            finalPrompt = finalPrompt + ', painting by Caspar David Friedrich, Wanderer above the Sea of Fog-style with SUBLIME VAST LANDSCAPE stretching to infinite horizon, mysterious atmospheric mist enveloping mountains and valleys, solitary contemplative figure viewed from behind gazing into immensity with back to viewer, spiritual sense of awe and insignificance before nature, cool somber palette of grays blues and muted greens, dramatic lighting breaking through clouds creating transcendent atmosphere, profound melancholic loneliness and romantic yearning, metaphysical depth and eternal silence';
            console.log('✅ Enhanced Friedrich sublime landscape added');
          } else {
            console.log('ℹ️ Friedrich sublime already in prompt (AI included it)');
          }
        }
        
        // 밀레 선택시 전원의 존엄성 강화
        if (selectedArtist.toUpperCase().trim().includes('MILLET') || 
            selectedArtist.toUpperCase().trim().includes('JEAN-FRANCOIS') ||
            selectedArtist.toUpperCase().trim().includes('JEAN-FRANÇOIS')) {
          console.log('🎯 Millet detected');
          if (!finalPrompt.includes('The Angelus')) {
            finalPrompt = finalPrompt + ', painting by Jean-François Millet, The Angelus-style depicting DIGNIFIED PEASANT LABOR in golden rural landscape, warm earthy palette of rich browns deep ochres and muted golden yellows, solid monumental figures bent in humble toil with sculptural weight, peaceful countryside bathed in soft evening light with horizontal calm, poetic serenity and quiet reverence for simple rural life, robust painterly brushwork with thick impasto, timeless pastoral dignity with profound humanity and spiritual grace';
            console.log('✅ Enhanced Millet pastoral dignity added');
          } else {
            console.log('ℹ️ Millet dignity already in prompt (AI included it)');
          }
        }
        
        // 마네 선택시 현대 파리 사실주의 강화
        if (selectedArtist.toUpperCase().trim().includes('MANET') || 
            selectedArtist.toUpperCase().trim().includes('EDOUARD') ||
            selectedArtist.toUpperCase().trim().includes('ÉDOUARD')) {
          console.log('🎯 Manet detected');
          if (!finalPrompt.includes('Olympia-style')) {
            finalPrompt = finalPrompt + ', painting by Édouard Manet, Olympia-style MODERN PARIS REALISM with bold flat composition and striking contrasts, dramatic blacks and pure whites with minimal mid-tones creating graphic impact, sophisticated urban atmosphere of café society and contemporary life, frank direct confrontational gaze meeting viewer, loose confident brushwork with visible energetic strokes, elimination of traditional modeling through strong light-dark opposition, metropolitan elegance and modern audacity';
            console.log('✅ Enhanced Manet modern realism added');
          } else {
            console.log('ℹ️ Manet realism already in prompt (AI included it)');
          }
        }
        
        // 라파엘로 선택시 조화로운 우아함 강화
        if (selectedArtist.toUpperCase().trim().includes('RAPHAEL') || 
            selectedArtist.toUpperCase().trim().includes('RAFFAELLO')) {
          console.log('🎯 Raphael detected');
          if (!finalPrompt.includes('Madonna')) {
            finalPrompt = finalPrompt + ', painting by Raphael, Madonna-style with PERFECT HARMONIOUS COMPOSITION and graceful balanced arrangement, serene gentle beauty with sweet tender expressions, soft rounded forms with fluid elegant contours, warm glowing colors with delicate flesh tones and rich drapery, classical Renaissance perfection with ideal proportions, peaceful tranquil atmosphere radiating divine grace, smooth refined brushwork with seamless transitions, sublime unity and lyrical beauty';
            console.log('✅ Enhanced Raphael harmony added');
          } else {
            console.log('ℹ️ Raphael harmony already in prompt (AI included it)');
          }
        }
        
        // 미켈란젤로 선택시 조각적 힘 강화
        if (selectedArtist.toUpperCase().trim().includes('MICHELANGELO') || 
            selectedArtist.toUpperCase().trim().includes('BUONARROTI')) {
          console.log('🎯 Michelangelo detected');
          if (!finalPrompt.includes('Sistine')) {
            finalPrompt = finalPrompt + ', painting by Michelangelo, Sistine Chapel-style with SCULPTURAL MUSCULAR ANATOMY and heroic monumental figures, powerful athletic bodies with exaggerated musculature and anatomical perfection, dynamic twisting poses (contrapposto) with dramatic foreshortening, intense physical energy and spiritual tension, bold confident modeling with strong chiaroscuro, terribilità with awesome grandeur and sublime power, every form carved from living stone';
            console.log('✅ Enhanced Michelangelo sculptural power added');
          } else {
            console.log('ℹ️ Michelangelo power already in prompt (AI included it)');
          }
        }
        
        // 벨라스케스 선택시 궁정 품격 강화
        if (selectedArtist.toUpperCase().trim().includes('VELAZQUEZ') || 
            selectedArtist.toUpperCase().trim().includes('VELÁZQUEZ') ||
            selectedArtist.toUpperCase().trim().includes('DIEGO')) {
          console.log('🎯 Velázquez detected');
          if (!finalPrompt.includes('Las Meninas')) {
            finalPrompt = finalPrompt + ', painting by Diego Velázquez, Las Meninas-style with MASTERFUL SPATIAL DEPTH and atmospheric perspective, courtly dignity and aristocratic refinement, subtle silvery-gray tonalities with sophisticated neutral palette, loose virtuoso brushwork with alla prima technique, mysterious ambiguous composition with multiple layers of reality, regal elegant bearing and Spanish formality, penetrating psychological insight with restrained nobility';
            console.log('✅ Enhanced Velázquez courtly mastery added');
          } else {
            console.log('ℹ️ Velázquez mastery already in prompt (AI included it)');
          }
        }
        
        // 와토 선택시 로코코 우아함 강화
        if (selectedArtist.toUpperCase().trim().includes('WATTEAU') || 
            selectedArtist.toUpperCase().trim().includes('JEAN-ANTOINE')) {
          console.log('🎯 Watteau detected');
          if (!finalPrompt.includes('fêtes galantes')) {
            finalPrompt = finalPrompt + ', painting by Jean-Antoine Watteau, fêtes galantes-style with ELEGANT OUTDOOR LEISURE in dreamy romantic garden settings, aristocratic figures in graceful refined poses and delicate gestures, soft shimmering colors with pearly iridescent quality and silvery atmospheric haze, wistful melancholic mood beneath surface gaiety, feathery delicate brushwork with gossamer lightness, poetic nostalgia and fleeting beauty, enchanted parkland with theatrical artifice, VISIBLE OIL PAINT BRUSHSTROKES throughout, painted canvas texture NOT photographic';
            controlStrength = 0.70;
            console.log('✅ Enhanced Watteau elegance added (control_strength 0.70)');
          } else {
            console.log('ℹ️ Watteau elegance already in prompt (AI included it)');
          }
        }
        
        // 부셰 선택시 로코코 관능미 강화
        if (selectedArtist.toUpperCase().trim().includes('BOUCHER') || 
            selectedArtist.toUpperCase().trim().includes('FRANÇOIS') ||
            selectedArtist.toUpperCase().trim().includes('FRANCOIS')) {
          console.log('🎯 Boucher detected');
          if (!finalPrompt.includes('Rococo charm')) {
            finalPrompt = finalPrompt + ', painting by François Boucher, ROCOCO SENSUAL CHARM with playful frivolous eroticism and decorative prettiness, pastel colors of soft pinks delicate blues and creamy whites, voluptuous curvaceous forms with porcelain-like skin, whimsical ornamental details and elaborate accessories, frothy confectionery atmosphere with sugary sweetness, seductive coquettish mood and courtly flirtation, luxurious textures and sumptuous fabrics, VISIBLE OIL PAINT BRUSHSTROKES throughout, painted canvas texture NOT photographic';
            controlStrength = 0.70;
            console.log('✅ Enhanced Boucher Rococo charm added (control_strength 0.70)');
          } else {
            console.log('ℹ️ Boucher charm already in prompt (AI included it)');
          }
        }
        
        // 르누아르 선택시 따뜻한 인물화 강화
        if (selectedArtist.toUpperCase().trim().includes('RENOIR') || 
            selectedArtist.toUpperCase().trim().includes('PIERRE-AUGUSTE')) {
          console.log('🎯 Renoir detected');
          if (!finalPrompt.includes('Renoir')) {
            finalPrompt = finalPrompt + ', painting by Pierre-Auguste Renoir: SOFT FEATHERY BRUSHSTROKES with VISIBLE oil paint texture, warm glowing skin tones with rosy pink cheeks, DAPPLED SUNLIGHT filtering through creating luminous atmosphere, warm harmonious colors (peach pink golden coral), loose impressionist brushwork NOT smooth NOT digital, figures bathed in soft radiant light, VISIBLE CANVAS WEAVE through paint layers, joyful warm intimate mood, CRITICAL IDENTITY: PRESERVE original subject face identity age and ethnicity exactly - Asian features must remain Asian, child must remain child, DO NOT change hair color or skin tone to Western appearance, keep original clothing, Renoir masterpiece quality';
            controlStrength = 0.60;
            console.log('✅ Enhanced Renoir + identity preserve (control_strength 0.60)');
          } else {
            console.log('ℹ️ Renoir warmth already in prompt (AI included it)');
          }
        }
        
        // 칼리보트 선택시 도시 풍경/원근법 강화
        if (selectedArtist.toUpperCase().trim().includes('CAILLEBOTTE') || 
            selectedArtist.toUpperCase().trim().includes('GUSTAVE')) {
          console.log('🎯 Caillebotte detected');
          if (!finalPrompt.includes('urban perspective')) {
            finalPrompt = finalPrompt + ', painting by Gustave Caillebotte, MODERN URBAN REALISM with dramatic bird\'s-eye perspective, Paris Street Rainy Day style city scenes, SHARP PERSPECTIVE LINES converging dramatically, photographic clarity with impressionist color palette, elegant bourgeois figures in urban settings, wet pavement reflections, muted gray-blue urban tones with warm accents, GEOMETRIC COMPOSITION with strong diagonal lines, Floor Scrapers style working figures, Caillebotte masterpiece quality';
            console.log('✅ Enhanced Caillebotte urban perspective added');
          } else {
            console.log('ℹ️ Caillebotte perspective already in prompt (AI included it)');
          }
        }
        
        // 드랭 선택시 야수파 강렬함 강화
        if (selectedArtist.toUpperCase().trim().includes('DERAIN') || 
            selectedArtist.toUpperCase().trim().includes('ANDRÉ') ||
            selectedArtist.toUpperCase().trim().includes('ANDRE')) {
          console.log('🎯 Derain detected');
          if (!finalPrompt.includes('Fauvist intensity')) {
            finalPrompt = finalPrompt + ', painting by André Derain, FAUVIST INTENSITY with vivid unmixed pure colors at maximum saturation, bold arbitrary color choices liberated from reality with reds greens blues oranges, flat decorative areas of color with simplified forms, strong graphic contours outlining color zones, elimination of subtle modeling for pure chromatic impact, vibrant energetic brushwork with spontaneous directness, landscape transformed into explosive color symphony';
            console.log('✅ Enhanced Derain Fauvist intensity added');
          } else {
            console.log('ℹ️ Derain intensity already in prompt (AI included it)');
          }
        }
        
        // 블라맹크 선택시 폭발적 색채 강화
        if (selectedArtist.toUpperCase().trim().includes('VLAMINCK') || 
            selectedArtist.toUpperCase().trim().includes('MAURICE')) {
          console.log('🎯 Vlaminck detected');
          if (!finalPrompt.includes('explosive colors')) {
            finalPrompt = finalPrompt + ', painting by Maurice de Vlaminck, EXPLOSIVE VIOLENT COLORS with most intense Fauvist palette, thick aggressive brushstrokes applied with passionate fury, pure unmixed pigments squeezed directly from tube, turbulent swirling compositions with dramatic movement, raw primitive energy and instinctive expression, volcanic eruption of reds blues greens yellows, landscape convulsed with emotional intensity';
            console.log('✅ Enhanced Vlaminck explosive colors added');
          } else {
            console.log('ℹ️ Vlaminck colors already in prompt (AI included it)');
          }
        }
        
        // 키르히너 선택시 도시 표현주의 강화
        if (selectedArtist.toUpperCase().trim().includes('KIRCHNER') || 
            selectedArtist.toUpperCase().trim().includes('ERNST LUDWIG')) {
          console.log('🎯 Kirchner detected');
          if (!finalPrompt.includes('Street Scene')) {
            finalPrompt = finalPrompt + ', painting by Ernst Ludwig Kirchner, Street Scene-style with ANGULAR JAGGED FORMS and sharp splintered shapes, harsh acidic colors of strident greens poisonous pinks and electric blues, elongated distorted figures with mask-like faces, urban anxiety and metropolitan alienation, aggressive slashing brushstrokes with nervous energy, psychological tension and modern neurosis, fragmented space with Cubist influence, raw primitive power meets city chaos';
            console.log('✅ Enhanced Kirchner urban angst added');
          } else {
            console.log('ℹ️ Kirchner angst already in prompt (AI included it)');
          }
        }
        
        // 반 고흐 선택시 소용돌이 강화 (거장 + 후기인상주의)
        if (selectedArtist.toUpperCase().trim().includes('VAN GOGH') || 
            selectedArtist.toUpperCase().trim().includes('VINCENT') ||
            selectedArtist.toUpperCase().trim().includes('GOGH') ||
            selectedArtist.includes('반 고흐') ||
            selectedArtist.includes('고흐') ||
            selectedArtist.includes('빈센트')) {
          console.log('🎯 Van Gogh detected');
          if (!finalPrompt.includes('SWIRLING') && !finalPrompt.includes('IMPASTO')) {
            finalPrompt = finalPrompt + ', painting by Vincent van Gogh: CRITICAL - EXTREMELY THICK IMPASTO brushstrokes with HEAVY 3D PAINT TEXTURE like squeezed directly from tube, VISIBLE RIDGES AND GROOVES of thick oil paint creating sculptural surface, SWIRLING TURBULENT brushwork in EVERY area including face skin clothes background, CHUNKY BOLD brush marks 5-10mm wide NOT smooth NOT blended, face must show VISIBLE BRUSHSTROKES not smooth skin, intense saturated colors (cobalt blue cadmium yellow chrome orange), Self-Portrait style ENERGETIC EXPRESSIVE strokes, painterly NOT illustrative NOT digital, canvas weave texture visible through thick paint, CRITICAL IDENTITY: PRESERVE original person FACE IDENTITY and AGE exactly - child must remain child adult must remain adult, keep original ethnicity and facial features, render subject ATTRACTIVELY and BEAUTIFULLY';
            controlStrength = 0.60;
            console.log('✅ Enhanced Van Gogh THICK IMPASTO + identity preserve (control_strength 0.60)');
          } else {
            console.log('ℹ️ Van Gogh swirls already in prompt (AI included it)');
          }
        }
        
        // 뭉크 선택시 실존적 불안 강화 (거장 + 표현주의)
        if (selectedArtist.toUpperCase().trim().includes('MUNCH') || 
            selectedArtist.toUpperCase().trim().includes('EDVARD') ||
            selectedArtist.includes('뭉크') ||
            selectedArtist.includes('에드바르')) {
          console.log('🎯 Munch detected');
          if (!finalPrompt.includes('The Scream')) {
            finalPrompt = finalPrompt + ', painting by Edvard Munch, The Scream-style with DISTORTED ANGUISHED FORMS expressing existential dread and psychological horror, wavy undulating backgrounds radiating outward with oppressive tension, lurid unnatural colors of blood reds sickly yellows and ominous blues, elongated screaming figures with hands clutching face in terror, swirling sky and landscape pulsating with anxiety and cosmic despair, every line trembling with inner torment and profound isolation, raw emotional nakedness';
            console.log('✅ Enhanced Munch anguish added');
          } else {
            console.log('ℹ️ Munch anguish already in prompt (AI included it)');
          }
        }
        
        // 마티스 선택시 순수 색채 강화 (거장 + 야수파)
        if (selectedArtist.toUpperCase().trim().includes('MATISSE') || 
            selectedArtist.includes('마티스')) {
          console.log('🎯 Matisse detected');
          if (!finalPrompt.includes('The Dance')) {
            finalPrompt = finalPrompt + ', painting by Henri Matisse, The Dance-style with PURE UNMIXED VIBRANT COLORS at maximum intensity and saturation, flat decorative patterns with bold arabesques and flowing curves, elimination of all modeling and shading for pure color planes, joyful rhythmic compositions celebrating life movement and vitality, daring color combinations of brilliant reds blues greens, complete liberation of color from reality, every area a pure saturated hue singing with chromatic joy';
            console.log('✅ Enhanced Matisse pure color added');
          } else {
            console.log('ℹ️ Matisse color already in prompt (AI included it)');
          }
        }
        
        // 클림트 선택시 황금 장식 강화 (거장)
        if (selectedArtist.toUpperCase().trim().includes('KLIMT') || 
            selectedArtist.toUpperCase().trim().includes('GUSTAV') ||
            selectedArtist.includes('클림트') ||
            selectedArtist.includes('구스타프')) {
          console.log('🎯 Klimt detected');
          if (!finalPrompt.includes('The Kiss')) {
            finalPrompt = finalPrompt + ', painting by Gustav Klimt, The Kiss-style with ELABORATE GOLDEN PATTERNS and Byzantine mosaic decorative elements, flat ornamental backgrounds covered with geometric spirals circles and rectangular motifs in shimmering gold leaf, sensuous organic forms emerging from abstract decorative fields, Art Nouveau flowing curves combined with geometric precision, rich textures of gold silver and precious jewel-like colors, erotic intimate mood within sacred ornamental splendor';
            controlStrength = 0.65;
            console.log('✅ Enhanced Klimt golden patterns added (control_strength 0.65)');
          } else {
            console.log('ℹ️ Klimt patterns already in prompt (AI included it)');
          }
        }
        
        // 모네 선택시 인상주의 강화 (거장 + 인상주의)
        if (selectedArtist.toUpperCase().trim().includes('MONET') || 
            selectedArtist.toUpperCase().trim().includes('CLAUDE') ||
            selectedArtist.includes('모네') ||
            selectedArtist.includes('클로드')) {
          console.log('🎯 Monet detected');
          if (!finalPrompt.includes('Water Lilies') && !finalPrompt.includes('Impressionist')) {
            finalPrompt = finalPrompt + ', painting by Claude Monet, IMPRESSIONIST style with VISIBLE BROKEN BRUSHSTROKES throughout entire composition, SOFT HAZY atmospheric effects like morning mist or fog, colors DISSOLVED and BLENDED into each other with NO sharp edges anywhere, capture fleeting moment of LIGHT and ATMOSPHERE, dappled sunlight filtering through air, Water Lilies and Impression Sunrise style dreamy blur, everything slightly out of focus and impressionistic, luminous color harmonies of blues purples pinks greens';
            controlStrength = 0.50;
            console.log('✅ Enhanced Monet Impressionist brushstrokes added (control_strength 0.50 for hazy effect)');
          } else {
            console.log('ℹ️ Monet Impressionism already in prompt (AI included it)');
          }
        }
        
        // 샤갈 선택시 몽환적 부유 강화 (거장 + 모더니즘)
        if (selectedArtist.toUpperCase().trim().includes('CHAGALL') || 
            selectedArtist.toUpperCase().trim().includes('MARC') ||
            selectedArtist.includes('샤갈') ||
            selectedArtist.includes('마르크')) {
          console.log('🎯 Chagall detected');
          if (!finalPrompt.includes('floating') && !finalPrompt.includes('FLOATING')) {
            finalPrompt = finalPrompt + ', painting by Marc Chagall, DREAMY FLOATING figures defying gravity, SOFT BLURRED EDGES with gentle transitions NO harsh outlines, MUTED PASTEL colors (dusty violet, faded rose pink, soft blue, sage green), I and the Village style OVERLAPPING DREAMLIKE images, whimsical tilted houses of Vitebsk village in background, symbolic animals and flowers floating softly, HAZY ATMOSPHERIC quality like looking through gauze, nostalgic poetic dreamscape, WATERCOLOR-LIKE transparency and softness';
            controlStrength = 0.40;
            console.log('✅ Enhanced Chagall with SOFT dreamy atmosphere (control_strength 0.40 for softer effect)');
          } else {
            console.log('ℹ️ Chagall dreaminess already in prompt (AI included it)');
          }
        }
        
        // 프리다 칼로 선택시 멕시코 상징 강화 (거장 전용)
        if (selectedArtist.toUpperCase().trim().includes('FRIDA') || 
            selectedArtist.toUpperCase().trim().includes('KAHLO') ||
            selectedArtist.includes('프리다') ||
            selectedArtist.includes('칼로')) {
          console.log('🎯 Frida Kahlo detected');
          if (!finalPrompt.includes('Frida') && !finalPrompt.includes('unibrow')) {
            finalPrompt = finalPrompt + ', painting by Frida Kahlo, INTENSE DIRECT GAZE portrait style, vibrant MEXICAN FOLK ART colors (bright red, yellow, green, blue), symbolic personal imagery with THORNS, FLOWERS, ANIMALS (monkeys, hummingbirds, black cats), distinctive UNIBROW and bold features, Tehuana traditional Mexican dress with floral headpiece, lush tropical JUNGLE FOLIAGE background, autobiographical symbolic elements, exposed HEARTS or VEINS if emotional, raw vulnerability and strength';
            console.log('✅ Enhanced Frida Kahlo Mexican symbolism added');
          } else {
            console.log('ℹ️ Frida Kahlo style already in prompt (AI included it)');
          }
        }
        
        // 워홀 선택시 팝아트 그리드 강화 (거장 + 모더니즘)
        if (selectedArtist.toUpperCase().trim().includes('WARHOL') || 
            selectedArtist.toUpperCase().trim().includes('ANDY') ||
            selectedArtist.includes('워홀') ||
            selectedArtist.includes('앤디')) {
          console.log('🎯 Warhol detected');
          // 항상 강화 프롬프트로 교체 (4분할 보장)
          const warholEnhancement = 'ABSOLUTE REQUIREMENT: CREATE EXACTLY 4 SEPARATE IMAGES arranged in 2x2 GRID with VISIBLE DIVIDING LINES between panels, TOP-LEFT panel + TOP-RIGHT panel + BOTTOM-LEFT panel + BOTTOM-RIGHT panel, the EXACT SAME FACE from the ORIGINAL PHOTO must appear in ALL 4 panels, EACH panel must have COMPLETELY DIFFERENT bold color scheme (panel 1: hot pink, panel 2: cyan blue, panel 3: yellow, panel 4: orange), Andy Warhol silkscreen style, FLAT graphic colors NO gradients, DO NOT draw Marilyn Monroe, MUST be 4 SEPARATE PANELS not single image, ';
          finalPrompt = warholEnhancement + finalPrompt;
          controlStrength = 0.30;
          console.log('✅ Enhanced Warhol 4-panel grid (FRONT position, control_strength 0.30)');
        }
        
        // 피카소 선택시 입체주의 강화 (거장 + 모더니즘)
        if (selectedArtist.toUpperCase().trim().includes('PICASSO') || 
            selectedArtist.toUpperCase().trim().includes('PABLO') ||
            selectedArtist.includes('피카소') ||
            selectedArtist.includes('파블로')) {
          console.log('🎯 Picasso detected');
          if (!finalPrompt.includes('Cubist')) {
            finalPrompt = finalPrompt + ', Cubist painting by Pablo Picasso: CRITICAL - SINGLE UNIFIED IMAGE not divided into panels NOT 4-panel grid NOT multiple frames, MULTI-PERSPECTIVE FACE showing NOSE from SIDE PROFILE angle while BOTH EYES visible from FRONT VIEW in same face, GEOMETRIC PLANES dividing face into angular flat colored sections, VISIBLE BRUSHSTROKES with thick oil paint texture throughout, earth tone palette (ochre sienna brown olive grey), face broken into overlapping angular planes like faceted crystal, Analytical Cubism style with intersecting geometric shapes, painterly NOT illustrative NOT smooth, Les Demoiselles d\'Avignon and Portrait of Dora Maar style, PRESERVE subject age and identity while applying Cubist fragmentation, render subject ATTRACTIVELY';
            controlStrength = 0.45;
            console.log('✅ Enhanced Picasso Cubism (control_strength 0.45 for balanced fragmentation)');
          } else {
            console.log('ℹ️ Picasso Cubism already in prompt (AI included it)');
          }
          // 20세기 모더니즘에서 피카소 선택시
          if (categoryType === 'modernism') {
            controlStrength = 0.40;
            console.log('✅ Modernism Picasso: control_strength 0.40 (balanced Cubist effect)');
          }
        }
        
        // ========================================
        // v52 추가: 20세기 모더니즘 10명 화가 강화
        // ========================================
        
        // 브라크 - v59에서 제거됨 (피카소와 중복)
        
        // 만 레이 선택시 실험적 사진 기법 강화
        if (selectedArtist.toUpperCase().trim().includes('MAN RAY') || 
            selectedArtist.toUpperCase().trim().includes('MANRAY')) {
          console.log('🎯 Man Ray detected');
          if (!finalPrompt.includes('solarization')) {
            finalPrompt = finalPrompt + ', experimental photography by Man Ray, SOLARIZATION EFFECT with inverted tones and glowing haloed edges, rayograph shadow silhouettes, dramatic high contrast black and white, surreal darkroom manipulation, Le Violon d\'Ingres style transformation of body, dreamlike photographic distortion with reversed light and shadow, avant-garde Dada experimentation';
            controlStrength = 0.60;
            console.log('✅ Enhanced Man Ray solarization added (control_strength 0.60)');
          } else {
            console.log('ℹ️ Man Ray effects already in prompt (AI included it)');
          }
        }
        
        // 마그리트 선택시 - 작품별 분기 (모더니즘 전용)
        if (selectedArtist.toUpperCase().trim().includes('MAGRITTE') || 
            selectedArtist.toUpperCase().trim().includes('RENÉ') ||
            selectedArtist.toUpperCase().trim().includes('RENE') ||
            selectedArtist.includes('마그리트') ||
            selectedArtist.includes('르네')) {
          console.log('🎯 Magritte detected');
          
          // AI가 골콩드를 선택했는지 확인
          if (finalPrompt.toUpperCase().includes('GOLCONDA') || finalPrompt.toUpperCase().includes('MULTIPLY') || finalPrompt.toUpperCase().includes('FLOATING') || finalPrompt.toUpperCase().includes('FALLING')) {
            // 골콩드 스타일 - 메인 인물 포멀 변환 + 배경 그림화 + 무한 반복
            finalPrompt = finalPrompt + ', Transform like René Magritte "Golconda" (1953) - CRITICAL: Transform main subject into FORMAL STIFF RIGID pose wearing dark suit with bowler hat, CONVERT original photo background into PAINTED Belgian townscape with buildings and cloudy sky, then FILL this painted background with DOZENS of small identical copies of the same formally-dressed figure floating/falling in RIGID STIFF upright posture like mannequins, hyperrealistic Belgian surrealist oil painting, DO NOT add floating people if close-up portrait, NOT realistic photo';
            controlStrength = 0.60;
            console.log('✅ Enhanced Magritte GOLCONDA style (control_strength 0.60)');
          } else if (finalPrompt.toUpperCase().includes('DOVE') || finalPrompt.toUpperCase().includes('BIRD') || finalPrompt.includes('비둘기') || finalPrompt.toUpperCase().includes('MAN IN A BOWLER')) {
            // 중절모를 쓴 남자 스타일 - 비둘기가 얼굴 가림
            finalPrompt = finalPrompt + ', Transform like René Magritte "Man in a Bowler Hat" (1964) - CRITICAL: place ONE WHITE DOVE bird flying in front of face, dove wings spread covering most of face, subject wearing dark formal suit with BLACK BOWLER HAT, background is overcast cloudy grey sky, hyperrealistic precise Belgian surrealist oil painting style, NOT realistic photo';
            controlStrength = 0.50;
            console.log('✅ Enhanced Magritte MAN IN BOWLER HAT style - dove covering face (control_strength 0.50)');
          } else if (finalPrompt.toUpperCase().includes('HUMAN CONDITION') || finalPrompt.toUpperCase().includes('EASEL') || finalPrompt.toUpperCase().includes('CANVAS') || finalPrompt.includes('인간의 조건')) {
            // 인간의 조건 스타일 - 캔버스가 창문 풍경과 일치
            finalPrompt = finalPrompt + ', Transform like René Magritte "The Human Condition" (1933) - CRITICAL: show EASEL with CANVAS in foreground, the painting on canvas shows EXACT SAME VIEW as the scene behind it creating seamless illusion, window frame or curtains on sides, landscape or scene continues perfectly from canvas to reality, philosophical painting-within-painting illusion, hyperrealistic Belgian surrealist oil painting, NOT realistic photo';
            controlStrength = 0.50;
            console.log('✅ Enhanced Magritte HUMAN CONDITION style - canvas illusion (control_strength 0.50)');
          } else if (finalPrompt.toUpperCase().includes('EMPIRE OF LIGHT') || finalPrompt.toUpperCase().includes('DAYTIME SKY') || finalPrompt.toUpperCase().includes('NIGHTTIME STREET') || finalPrompt.includes('빛의 제국')) {
            // 빛의 제국 스타일 - 낮 하늘 + 밤 거리 역설
            finalPrompt = finalPrompt + ', Transform like René Magritte "The Empire of Light" (1954) - CRITICAL PARADOX: bright BLUE DAYTIME SKY with white fluffy clouds ABOVE, but DARK NIGHTTIME street scene BELOW with glowing yellow lamplight and dark silhouetted trees and buildings, impossible coexistence of day and night in same image, mysterious twilight atmosphere, hyperrealistic Belgian surrealist oil painting, NOT realistic photo';
            controlStrength = 0.50;
            console.log('✅ Enhanced Magritte EMPIRE OF LIGHT style - day/night paradox (control_strength 0.50)');
          } else {
            // 사람의 아들 스타일 - 정면 응시 + 정장 + 사과 (코만 가림)
            finalPrompt = finalPrompt + ', Transform like René Magritte "The Son of Man" (1964) - CRITICAL APPLE PLACEMENT: place ONE small GREEN APPLE floating at NOSE LEVEL, apple size must be SMALL (covers ONLY the nose area about 25-30% of face height), EYES must be CLEARLY VISIBLE above apple, MOUTH and CHIN must be CLEARLY VISIBLE below apple, subject wearing dark formal suit with white collar and BLACK BOWLER HAT, background is overcast cloudy grey sky with stone wall, hyperrealistic precise Belgian surrealist oil painting style, IMPORTANT: apple must NOT cover eyes or mouth - only nose area, NOT realistic photo';
            controlStrength = 0.50;
            console.log('✅ Enhanced Magritte SON OF MAN style - small apple at nose only, eyes and mouth visible (control_strength 0.50)');
          }
        }
        
        // 미로 선택시 유기적 상징 강화 (모더니즘)
        if (selectedArtist.toUpperCase().trim().includes('MIRÓ') || 
            selectedArtist.toUpperCase().trim().includes('MIRO') ||
            selectedArtist.toUpperCase().trim().includes('JOAN') ||
            selectedArtist.includes('미로') ||
            selectedArtist.includes('호안')) {
          console.log('🎯 Miró detected');
          if (!finalPrompt.includes('biomorphic')) {
            finalPrompt = finalPrompt + ', painting by Joan Miró, BIOMORPHIC PLAYFUL FORMS floating in space, automatic drawing spontaneous symbols, bright primary colors (red yellow blue black) on light background, constellation of stars eyes crescents and organic shapes surrounding subject, childlike joyful energy, calligraphic black lines, poetic surrealist abstraction with whimsical floating elements';
            controlStrength = 0.60;
            console.log('✅ Enhanced Miró biomorphic symbols added (control_strength 0.60)');
          } else {
            console.log('ℹ️ Miró symbolism already in prompt (AI included it)');
          }
        }
        
        // 키스 해링 선택시 그래피티 아트 스타일 강화 (모더니즘)
        if (selectedArtist.toUpperCase().trim().includes('KEITH') || 
            selectedArtist.toUpperCase().trim().includes('HARING') ||
            selectedArtist.includes('키스') ||
            selectedArtist.includes('해링')) {
          console.log('🎯 Keith Haring detected');
          if (!finalPrompt.includes('radiant')) {
            finalPrompt = finalPrompt + ', Transform like Keith Haring street art - CRITICAL: BOLD THICK BLACK OUTLINES around all figures, figures SIMPLIFIED into iconic dancing silhouettes, bright PRIMARY COLORS filling shapes (red, yellow, blue, green, orange, pink), RADIANT LINES emanating from bodies showing energy and movement, flat graphic subway graffiti style, figures in DYNAMIC DANCING POSES with movement lines, barking dogs and crawling babies as motifs, NO shading NO gradients just flat bold colors, joyful energetic street art aesthetic';
            controlStrength = 0.40;
            console.log('✅ Enhanced Keith Haring with bold outlines and radiant lines (control_strength 0.40)');
          } else {
            console.log('ℹ️ Keith Haring style already in prompt (AI included it)');
          }
        }
        
        // 리히텐슈타인 선택시 벤데이 도트/만화 강화 (모더니즘)
        if (selectedArtist.toUpperCase().trim().includes('LICHTENSTEIN') || 
            selectedArtist.toUpperCase().trim().includes('ROY') ||
            selectedArtist.includes('리히텐슈타인') ||
            selectedArtist.includes('로이')) {
          console.log('🎯 Lichtenstein detected');
          if (!finalPrompt.includes('Ben-Day dots')) {
            finalPrompt = finalPrompt + ', Transform like Roy Lichtenstein "Drowning Girl" and "Whaam!" - CRITICAL: cover ENTIRE image with visible BEN-DAY DOTS pattern (small colored circles), THICK BOLD BLACK OUTLINES around ALL forms, LIMITED flat colors ONLY (primary red yellow blue plus black white), comic book dramatic emotional style, optional speech bubble or thought balloon with text, halftone printing aesthetic blown up to fine art scale, NOT realistic NOT photographic';
            controlStrength = 0.60;
            console.log('✅ Enhanced Lichtenstein with Drowning Girl reference (control_strength 0.60)');
          } else {
            console.log('ℹ️ Lichtenstein dots already in prompt (AI included it)');
          }
        }
        
      } else {
        // AI 실패 → Fallback
        console.log('⚠️ AI failed, using fallback');
        
        let fallbackKey = selectedStyle.category;
        
        if (selectedStyle.category === 'masters') {
          fallbackKey = selectedStyle.id.replace('-master', '');
        } else if (selectedStyle.category === 'oriental') {
          fallbackKey = selectedStyle.id;
        }
        
        console.log('Using fallback key:', fallbackKey);
        const fallback = fallbackPrompts[fallbackKey];
        
        if (!fallback) {
          console.error('ERROR: No fallback found for key:', fallbackKey);
          console.error('Available categories:', Object.keys(fallbackPrompts));
          throw new Error(`No fallback prompt for: ${fallbackKey}`);
        }
        
        finalPrompt = fallback.prompt;
        selectedArtist = fallback.name;
        selectionMethod = 'fallback';
        selectionDetails = {
          ai_error: aiResult.error
        };
        
        // Renaissance fallback도 control_strength 0.65
        if (fallbackKey === 'renaissance') {
          controlStrength = 0.65;
          console.log('✅ Renaissance fallback: control_strength 0.65');
        }
      }
    } else {
      // ANTHROPIC_API_KEY 없음 → Fallback
      console.log('ℹ️ No AI key, using fallback');
      
      let fallbackKey = selectedStyle.category;
      
      if (selectedStyle.category === 'masters') {
        fallbackKey = selectedStyle.id.replace('-master', '');
      } else if (selectedStyle.category === 'oriental') {
        fallbackKey = selectedStyle.id;
      }
      
      console.log('Using fallback key:', fallbackKey);
      const fallback = fallbackPrompts[fallbackKey];
      
      if (!fallback) {
        console.error('ERROR: No fallback found for key:', fallbackKey);
        console.error('Available categories:', Object.keys(fallbackPrompts));
        throw new Error(`No fallback prompt for: ${fallbackKey}`);
      }
      
      finalPrompt = fallback.prompt;
      selectedArtist = fallback.name;
      selectionMethod = 'fallback_no_key';
      
      // Renaissance fallback (no key)도 control_strength 0.65
      if (fallbackKey === 'renaissance') {
        controlStrength = 0.65;
        console.log('✅ Renaissance fallback (no key): control_strength 0.65');
      }
    }

    console.log('Final prompt:', finalPrompt);
    
    // ========================================
    // PicoArt 핵심 원칙: Level 3 회화 강조 + 다시 그리기 + 얼굴 보존
    // ========================================
    
    // 동양 미술 체크 (한국/중국)
    const isOrientalArt = finalPrompt.toLowerCase().includes('korean') || 
                          finalPrompt.toLowerCase().includes('chinese') ||
                          categoryType === 'oriental';
    
    // 모자이크는 타일(tesserae)로 만드는 것이므로 brushstrokes 제외
    const isMosaic = finalPrompt.toLowerCase().includes('mosaic') || 
                     finalPrompt.toLowerCase().includes('tesserae');
    
    // 점묘법은 점(dots)으로 만드는 것이므로 brushstrokes 완전 금지
    const isPointillism = finalPrompt.toLowerCase().includes('signac') || 
                          finalPrompt.toLowerCase().includes('pointillist') ||
                          finalPrompt.toLowerCase().includes('pointillism');
    
    let paintingEnforcement;
    
    // 한국 민화 특별 처리
    const isKoreanMinhwa = finalPrompt.includes('Korean Minhwa') || finalPrompt.includes('Korean folk painting');
    const isKoreanPungsokdo = finalPrompt.includes('Korean Pungsokdo') || finalPrompt.includes('Kim Hong-do');
    
    if (isKoreanMinhwa) {
      // 한국 민화: 두꺼운 한지 질감과 투박한 민속화
      paintingEnforcement = ', CRITICAL: NOT photographic, Authentic Joseon folk painting on THICK ROUGH HANJI PAPER with PROMINENT FIBER TEXTURE throughout, UNEVEN PATCHY pigment absorption creating irregular color areas, genuinely FADED WEATHERED colors like 200-year museum piece, TREMBLING WOBBLY folk brushlines (amateur quality), thick black outlines but IRREGULAR, colors pooling in paper fibers, PRESERVE faces, PRESERVE GENDER, primitive naive artifact NOT digital NOT smooth, 🚨 NO Japanese';
      console.log('ℹ️ Korean Minhwa mode: thick hanji texture + wobbly folk brushwork');
    } else if (isKoreanPungsokdo) {
      // 한국 풍속도: 수묵 위주 + 극소량 담채
      paintingEnforcement = ', CRITICAL: NOT photographic, Authentic Korean Pungsokdo on ROUGH TEXTURED HANJI with visible fibers, BLACK INK DOMINATES 70-80% (confident spontaneous brushwork), then MINIMAL PALE washes 20-30% ONLY, earth tones EXCLUSIVELY (pale brown grey-green faint ochre), NO bright NO saturated colors, Kim Hong-do elegant restraint, distinctly different from colorful Chinese gongbi, PRESERVE faces, PRESERVE GENDER, simple everyday hanbok, historical painting NOT illustration, 🚨 NO Japanese';
      console.log('ℹ️ Korean Pungsokdo mode: 70% ink 30% pale color on textured hanji');
    } else if (isMosaic) {
      // 모자이크: brushstrokes 제외, 타일 느낌 강조, 인물도 스타일 적용
      paintingEnforcement = ', CRITICAL: NOT photographic NOT photo-realistic, MOSAIC ART made of small stone or glass TESSERAE tiles, visible grid pattern of square tiles, NO brushstrokes NO oil painting texture, APPLY MOSAIC STYLE TO ENTIRE IMAGE INCLUDING THE PERSON (person must also look like mosaic tiles NOT photographic), preserve facial IDENTITY but render in mosaic tile style, PRESERVE GENDER accurately, unified composition all figures together';
      console.log('ℹ️ Mosaic mode: tesserae tiles WITHOUT brushstrokes, style applied to person too');
    } else if (isPointillism) {
      // 점묘법: brushstrokes 완전 금지, 작은 점들로만 구성
      paintingEnforcement = ', CRITICAL: NOT photographic NOT photo-realistic, POINTILLIST painting style with TINY COLORED DOTS only, ABSOLUTELY NO brushstrokes NO brush texture NO oil painting strokes, entire image composed of small distinct points of pure unmixed color placed side by side, visible dot pattern throughout like Signac or Seurat, APPLY POINTILLIST DOT STYLE TO ENTIRE IMAGE INCLUDING ALL PEOPLE (people must also be rendered in dots NOT photographic), preserve facial IDENTITY but render entirely in colored dots, PRESERVE GENDER accurately, unified composition all figures together';
      console.log('ℹ️ Pointillism mode: tiny dots only, NO brushstrokes');
    } else if (isOrientalArt) {
      // 동양 미술: brushstrokes 포함 + 일본어 금지 극강화
      paintingEnforcement = ', CRITICAL: NOT photographic NOT photo-realistic, APPLY PAINTING STYLE TO ENTIRE IMAGE INCLUDING ALL PEOPLE (people must look painted NOT photographic), fully oil painting with thick visible brushstrokes and canvas texture, preserve facial IDENTITY but render in painting style, PRESERVE GENDER accurately (male stays male with masculine features, female stays female with feminine features), unified composition all figures together, 🚨 ABSOLUTELY NO Japanese hiragana (ひらがな) katakana (カタカナ) or ANY Japanese text, NO vertical Japanese writing, NO Japanese ukiyo-e style elements, REMOVE ALL Japanese visual elements, NO text NO characters on painting, this is 100% PURE KOREAN or CHINESE TRADITIONAL ART not Japanese';
      console.log('ℹ️ Oriental art mode: paintingEnforcement WITH STRONG Japanese prohibition');
    } else {
      // 일반: brushstrokes 포함
      paintingEnforcement = ', CRITICAL: NOT photographic NOT photo-realistic, APPLY PAINTING STYLE TO ENTIRE IMAGE INCLUDING ALL PEOPLE (people must look painted NOT photographic), fully oil painting with thick visible brushstrokes and canvas texture, preserve facial IDENTITY but render in painting style, PRESERVE GENDER accurately (male stays male with masculine features, female stays female with feminine features), unified composition all figures together';
    }
    
    // ========================================
    // 20세기 모더니즘: 대전제 적용 제외!
    // (얼굴 분해, 복제, 녹아내림 등 허용 위해)
    // ========================================
    
    // ========================================
    // 매력적 표현 대전제 (Attractive Enhancement)
    // 고통/왜곡이 핵심인 작품은 제외
    // ========================================
    const excludeAttractive = [
      'munch-scream',      // 절규 - 공포/불안 왜곡
      'munch-sickchild',   // 병든 아이 - 창백함/고통
      'picasso-guernica',  // 게르니카 - 전쟁 참상
      'picasso-weepingwoman', // 우는 여인 - 슬픔 왜곡
      'frida-brokencolumn' // 부러진 기둥 - 고통 시각화
    ];
    
    const shouldApplyAttractive = !excludeAttractive.includes(selectedWork);
    
    // 🎯 Identity 보존 대전제 (항상 적용)
    const identityPreservation = ', ABSOLUTE IDENTITY PRESERVATION: PRESERVE original subject FACE IDENTITY AGE GENDER and ETHNICITY exactly - Asian must remain Asian, Western must remain Western, child must remain child, adult must remain adult, CRITICAL GENDER: male MUST remain male with MASCULINE features STRONG JAW male bone structure DO NOT feminize DO NOT soften DO NOT make pretty or delicate, female must remain female with feminine features, DO NOT change hair color or skin tone, DO NOT Westernize Asian faces, DO NOT Asianize Western faces, keep original facial features and bone structure';
    finalPrompt = finalPrompt + identityPreservation;
    console.log('🎯 Applied identity preservation rule (including gender)');
    
    if (shouldApplyAttractive && selectedWork) {
      const attractiveEnhancement = ', render all people ATTRACTIVELY BEAUTIFULLY and YOUTHFULLY with appealing refined features, CRITICAL: while strictly preserving original GENDER - if MALE make him look HANDSOME MASCULINE and DIGNIFIED, if FEMALE make her look PRETTY FEMININE and ELEGANT, idealized flattering portrayal that enhances visual appeal';
      finalPrompt = finalPrompt + attractiveEnhancement;
      console.log('✨ Applied attractive enhancement for:', selectedWork);
    } else if (selectedWork) {
      console.log('🎭 Skipped attractive enhancement (expressive distortion allowed):', selectedWork);
    }
    
    if (categoryType === 'modernism') {
      console.log('🎨 Modernism: Skipping paintingEnforcement (allows face distortion/fragmentation/multiplication)');
      // 대전제 적용 안 함 - 모더니즘은 프롬프트에서 직접 제어
    }
    // 이미 회화 강조가 없는 경우에만 추가 (소문자도 체크)
    else if (!finalPrompt.toLowerCase().includes('preserve facial') && 
        !finalPrompt.includes('brushstrokes') &&
        !finalPrompt.toLowerCase().includes('not photographic')) {
      finalPrompt = finalPrompt + paintingEnforcement;
      console.log('✅ Added Level 3+ painting enforcement (re-drawn with brush) + facial preservation');
    } else {
      console.log('ℹ️ Skipped paintingEnforcement (already in fallback prompt)');
    }
    
    // FLUX Depth 변환 (최신 API 버전)
    const response = await fetch(
      'https://api.replicate.com/v1/models/black-forest-labs/flux-depth-dev/predictions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Token ${process.env.REPLICATE_API_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'wait'
        },
        body: JSON.stringify({
          input: {
            control_image: image,
            prompt: finalPrompt,
            num_inference_steps: 24,
            guidance: 12,
            control_strength: controlStrength,  // 기본 0.80, 레오나르도 0.65
            output_format: 'jpg',
            output_quality: 90
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('FLUX Depth error:', response.status, errorText);
      return res.status(response.status).json({ 
        error: `FLUX API error: ${response.status}`,
        details: errorText
      });
    }

    const data = await response.json();
    console.log('✅ FLUX Depth completed');
    
    // 결과에 선택 정보 포함
    res.status(200).json({
      ...data,
      selected_artist: selectedArtist,
      selected_work: selectedWork,  // 거장 모드: 선택된 대표작
      selection_method: selectionMethod,
      selection_details: selectionDetails
    });
    
  } catch (error) {
    console.error('Handler error:', error);
    res.status(500).json({ 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
