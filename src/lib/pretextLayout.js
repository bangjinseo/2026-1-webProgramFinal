import {
  layout,
  measureNaturalWidth,
  prepare,
  prepareWithSegments,
  setLocale,
} from '@chenglou/pretext';

const formatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 1,
});

export function analyzeTextLayout({
  text,
  locale,
  font,
  lineHeight,
  width,
  maxHeight,
  maxLines,
  wordBreak = 'normal',
}) {
  const normalizedText = text.trim() || ' ';
  setLocale(locale);

  const prepared = prepare(normalizedText, font, { wordBreak });
  const segmented = prepareWithSegments(normalizedText, font, { wordBreak });
  const result = layout(prepared, width, lineHeight);
  const naturalWidth = measureNaturalWidth(segmented);
  const isWrapped = result.lineCount > 1;
  const isOverflowing = result.height > maxHeight || result.lineCount > maxLines;
  const status = isOverflowing ? 'Overflow Risk' : isWrapped ? 'Wrap' : 'Safe';

  return {
    status,
    lineCount: result.lineCount,
    textHeight: result.height,
    naturalWidth,
    overflow: isOverflowing,
    wraps: isWrapped,
    width,
    maxHeight,
    maxLines,
    formatted: {
      textHeight: formatter.format(result.height),
      naturalWidth: formatter.format(naturalWidth),
      width: formatter.format(width),
      maxHeight: formatter.format(maxHeight),
    },
  };
}

export function getStatusTone(status) {
  if (status === 'Safe') return 'safe';
  if (status === 'Wrap') return 'wrap';
  return 'risk';
}
