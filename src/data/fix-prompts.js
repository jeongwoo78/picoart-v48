// 프롬프트 수정 - 원본 유지 + 화풍 적용
const fs = require('fs');

const file = fs.readFileSync('artStyles.js', 'utf8');

// 프롬프트 패턴 찾기 및 수정
let modified = file;

// 각 prompt를 찾아서 앞에 지시문 추가
modified = modified.replace(
  /prompt: '([^']+)'/g,
  (match, p1) => {
    // 이미 "Transform" 또는 "Keep the original"이 있으면 스킵
    if (p1.includes('Transform') || p1.includes('Keep the original')) {
      return match;
    }
    
    // 새로운 프롬프트: 원본 유지 지시 + 기존 스타일 설명
    const newPrompt = `Transform this image into ${p1}, preserving the original subject, composition, and main elements while applying the artistic style`;
    
    return `prompt: '${newPrompt}'`;
  }
);

fs.writeFileSync('artStyles-modified.js', modified);
console.log('✅ 프롬프트 수정 완료: artStyles-modified.js');
