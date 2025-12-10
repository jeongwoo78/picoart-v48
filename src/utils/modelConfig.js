// PicoArt v22 - 하이브리드 모델 설정
// FLUX: 고품질 (화가별 차이 중요)
// SDXL: 표준 (일반 화풍)

export const MODEL_CONFIG = {
  FLUX: {
    model: "xlabs-ai/flux-dev-controlnet",
    version: "f2c31c31d81278a91b2447a304dae654c64a5d5a70340fba811bb1cbd41019a2",
    cost: 0.014,
    time: 54,
    label: "FLUX (최고 품질)"
  },
  SDXL: {
    model: "stability-ai/sdxl",
    version: "39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
    cost: 0.003,
    time: 30,
    label: "SDXL (표준)"
  }
};

// 화가 데이터로 모델 가져오기
export function getModelForArtist(artistData) {
  const modelType = artistData.model || 'FLUX'; // 기본값 FLUX
  return MODEL_CONFIG[modelType];
}

// 비용 및 시간 정보 포맷팅
export function formatModelInfo(modelType) {
  const model = MODEL_CONFIG[modelType];
  return {
    cost: `$${model.cost.toFixed(3)}`,
    time: `약 ${model.time}초`,
    label: model.label
  };
}
