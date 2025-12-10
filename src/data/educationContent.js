// PicoArt v60 - 교육 콘텐츠 통합
// 4개 파일로 분리:
// 1. movementsEducation.js - 서양 미술 10개 사조 (1차+2차 통합)
// 2. mastersEducation.js - 서양 거장 7명 (1차 교육 - 개요)
// 3. mastersEducation2nd.js - 서양 거장 35개 작품 (2차 교육 - 개별 작품) [향후 사용]
// 4. orientalEducation.js - 동양화 7개 장르

import { movementsOverview } from './movementsEducation';
import { mastersEducation } from './mastersEducation';
// import { mastersEducation2nd } from './mastersEducation2nd'; // 향후 개별 작품 교육 시 사용
import { orientalOverview, orientalEducation } from './orientalEducation';

// 기존 구조 유지 (하위 호환성)
export const educationContent = {
  movements: movementsOverview,  // 1차 교육 (사조 overview)
  masters: mastersEducation,     // 1차 교육 (거장 overview)
  // masters2nd: mastersEducation2nd, // 2차 교육 (거장 개별 작품) - 향후 활성화
  oriental: orientalOverview
};

// 동양화는 별도 export
export { orientalEducation };

// 개별 export (필요시)
export { movementsOverview, mastersEducation, orientalOverview };
