const formatter = new Intl.NumberFormat('ko-KR', {
  maximumFractionDigits: 0,
});

function px(value) {
  return `${formatter.format(Math.max(0, Math.ceil(value)))}px`;
}

export function getRiskReason(analysis, label = '컴포넌트') {
  if (!analysis) return '';

  const widthOverflowAmount = analysis.measuredWidth - analysis.containerWidth;
  const heightOverflowAmount = analysis.measuredHeight - analysis.containerHeight;

  if (analysis.status === 'Safe') {
    return '현재 폭과 줄 수 안에서 정상 표시됩니다.';
  }

  if (analysis.maxLines === 1 && analysis.lineCount > 1) {
    return `한 줄 ${label}에서 허용 줄 수(1줄)를 초과하여 ${analysis.lineCount}줄로 표시됩니다.`;
  }

  if (analysis.widthOverflow) {
    return `텍스트 폭이 ${label} 너비를 ${px(widthOverflowAmount)} 초과합니다.`;
  }

  if (analysis.lineOverflow) {
    return `허용 줄 수(${analysis.maxLines}줄)를 초과하여 ${analysis.lineCount}줄로 표시됩니다.`;
  }

  if (analysis.heightOverflow) {
    return `텍스트 높이가 ${label} 높이를 ${px(heightOverflowAmount)} 초과합니다.`;
  }

  if (analysis.wraps) {
    return `텍스트가 ${analysis.lineCount}줄로 줄바꿈되어 레이아웃 확인이 필요합니다.`;
  }

  return '일부 텍스트가 잘릴 가능성이 있어 레이아웃 확인이 필요합니다.';
}

export function getRecommendations(analysis, options = {}) {
  if (!analysis || analysis.status === 'Safe') return [];

  const {
    componentType = 'component',
    containerLabel = '컴포넌트',
    paddingX = 24,
  } = options;
  const requiredWidth = Math.ceil(analysis.measuredWidth + paddingX);
  const recommendations = [];

  if (analysis.widthOverflow) {
    recommendations.push(`${containerLabel} 폭 ${px(analysis.containerWidth)} → ${px(requiredWidth)} 이상으로 확장`);
  }

  if (analysis.lineOverflow || (analysis.maxLines === 1 && analysis.wraps)) {
    recommendations.push(`maxLines ${analysis.maxLines} → ${Math.max(analysis.lineCount, analysis.maxLines + 1)}로 허용`);
    recommendations.push('텍스트 길이 축약 고려');
  }

  if (analysis.heightOverflow) {
    recommendations.push(`${containerLabel} 높이를 ${px(analysis.measuredHeight)} 이상으로 증가`);
  }

  if (componentType === 'navigation') {
    recommendations.push('Navigation Label은 더 짧은 라벨 사용');
  }

  if (componentType === 'button') {
    recommendations.push('Button은 터치 영역을 유지하면서 폭 증가');
  }

  if (componentType === 'search') {
    recommendations.push('Search placeholder 문구 축약');
  }

  return [...new Set(recommendations)];
}

