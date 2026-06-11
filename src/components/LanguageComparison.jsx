import StatusBadge from './StatusBadge.jsx';
import { languageOptions } from '../data/labData.js';
import { analyzeTextLayout } from '../lib/pretextLayout.js';
import { findLocalizationEntryByText, getEntryText } from '../services/translationService.js';

export default function LanguageComparison({
  activeLanguageId,
  baseText,
  componentType,
  renderSample,
  spec,
}) {
  const entry = findLocalizationEntryByText(baseText);

  return (
    <section className="language-comparison" aria-label="Multi-language comparison">
      <div className="comparison-heading">
        <p className="eyebrow">Multi-Language Comparison</p>
        <h3>Language Length Check</h3>
      </div>
      <div className="comparison-grid">
        {languageOptions.map((language) => {
          const sampleText = entry ? getEntryText(entry, language.id) : activeLanguageId === language.id ? baseText : baseText;
          const analysis = analyzeTextLayout({
            text: sampleText,
            locale: language.locale,
            font: spec.font,
            lineHeight: spec.lineHeight,
            width: spec.width,
            maxHeight: spec.maxHeight,
            maxLines: spec.maxLines,
          });

          return (
            <article className="comparison-card" key={language.id}>
              <div className="comparison-card-header">
                <strong>{language.label}</strong>
                <StatusBadge status={analysis.status} />
              </div>
              <div className={`comparison-sample comparison-sample-${componentType}`}>
                {renderSample(sampleText, language.id)}
              </div>
              <dl>
                <div>
                  <dt>Width</dt>
                  <dd>{analysis.formatted.naturalWidth}px</dd>
                </div>
                <div>
                  <dt>Lines</dt>
                  <dd>{analysis.lineCount}</dd>
                </div>
              </dl>
            </article>
          );
        })}
      </div>
    </section>
  );
}

