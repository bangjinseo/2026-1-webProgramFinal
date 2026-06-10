import { useMemo } from 'react';
import { analyzeTextLayout } from '../lib/pretextLayout.js';

export function useLayoutAnalysis({ text, language, spec }) {
  return useMemo(
    () =>
      analyzeTextLayout({
        text,
        locale: language.locale,
        font: spec.font,
        lineHeight: spec.lineHeight,
        width: spec.width,
        maxHeight: spec.maxHeight,
        maxLines: spec.maxLines,
      }),
    [language.locale, spec, text],
  );
}
