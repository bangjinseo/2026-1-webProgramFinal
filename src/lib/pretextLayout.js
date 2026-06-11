import {
  layoutNextLineRange,
  materializeLineRange,
  measureNaturalWidth,
  prepareWithSegments,
  setLocale,
} from '@chenglou/pretext';

const formatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 1,
});

function createDynamicLineLayout(prepared, maxWidth, lineHeight) {
  const lines = [];
  let cursor = { segmentIndex: 0, graphemeIndex: 0 };

  while (true) {
    const lineRange = layoutNextLineRange(prepared, cursor, maxWidth);
    if (lineRange === null) break;

    const line = materializeLineRange(prepared, lineRange);
    lines.push({
      text: line.text,
      width: line.width,
      x: 0,
      y: lines.length * lineHeight,
      height: lineHeight,
      start: line.start,
      end: line.end,
    });
    cursor = lineRange.end;
  }

  const lineCount = lines.length;
  const maxLineWidth = lines.reduce((maxWidthSoFar, line) => Math.max(maxWidthSoFar, line.width), 0);

  return {
    lineCount,
    lines,
    maxLineWidth,
    height: lineCount * lineHeight,
  };
}

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

  const prepared = prepareWithSegments(normalizedText, font, { wordBreak });
  const result = createDynamicLineLayout(prepared, width, lineHeight);
  const naturalWidth = measureNaturalWidth(prepared);
  const widthOverflow = naturalWidth > width;
  const isWrapped = result.lineCount > 1;
  const isOverflowing = result.height > maxHeight || result.lineCount > maxLines || (maxLines === 1 && widthOverflow);
  const status = isOverflowing ? 'Overflow Risk' : isWrapped ? 'Wrap' : 'Safe';

  return {
    status,
    lineCount: result.lineCount,
    lines: result.lines,
    maxLineWidth: result.maxLineWidth,
    textHeight: result.height,
    measuredHeight: result.height,
    naturalWidth,
    measuredWidth: naturalWidth,
    overflow: isOverflowing,
    wraps: isWrapped,
    widthOverflow,
    heightOverflow: result.height > maxHeight,
    lineOverflow: result.lineCount > maxLines,
    width,
    containerWidth: width,
    maxHeight,
    containerHeight: maxHeight,
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
