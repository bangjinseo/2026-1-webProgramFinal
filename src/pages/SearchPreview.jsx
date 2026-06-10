import { useMemo, useState } from 'react';
import MetricsGrid from '../components/MetricsGrid.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { previewSpecs, searchSampleSets } from '../data/labData.js';
import { analyzeTextLayout } from '../lib/pretextLayout.js';

function getWorstStatus(inputAnalysis, resultAnalysis) {
  if (inputAnalysis.status === 'Overflow Risk' || resultAnalysis.status === 'Overflow Risk') return 'Overflow Risk';
  if (inputAnalysis.status === 'Wrap' || resultAnalysis.status === 'Wrap') return 'Wrap';
  return 'Safe';
}

export default function SearchPreview({ language, languageId, onLanguageChange }) {
  const samples = searchSampleSets[languageId] ?? searchSampleSets.en;
  const [sampleIndex, setSampleIndex] = useState(0);
  const text = samples[Math.min(sampleIndex, samples.length - 1)];
  const inputSpec = previewSpecs.searchInput;
  const resultSpec = previewSpecs.searchResult;
  const inputAnalysis = useMemo(
    () =>
      analyzeTextLayout({
        text,
        locale: language.locale,
        font: inputSpec.font,
        lineHeight: inputSpec.lineHeight,
        width: inputSpec.width,
        maxHeight: inputSpec.maxHeight,
        maxLines: inputSpec.maxLines,
      }),
    [inputSpec, language.locale, text],
  );
  const resultAnalysis = useMemo(
    () =>
      analyzeTextLayout({
        text,
        locale: language.locale,
        font: resultSpec.font,
        lineHeight: resultSpec.lineHeight,
        width: resultSpec.width,
        maxHeight: resultSpec.maxHeight,
        maxLines: resultSpec.maxLines,
      }),
    [resultSpec, language.locale, text],
  );
  const status = getWorstStatus(inputAnalysis, resultAnalysis);

  return (
    <article className="page-stack">
      <section className="lab-controls" aria-label="Search preview controls">
        <div className="control-row">
          <label className="field-group">
            <span>Language</span>
            <select value={languageId} onChange={(event) => onLanguageChange(event.target.value)}>
              <option value="en">English</option>
              <option value="ko">Korean</option>
              <option value="ja">Japanese</option>
              <option value="de">German</option>
              <option value="fr">French</option>
            </select>
          </label>
          <label className="field-group">
            <span>Search Text</span>
            <select value={sampleIndex} onChange={(event) => setSampleIndex(Number(event.target.value))}>
              {samples.map((sample, index) => (
                <option key={sample} value={index}>
                  {sample}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="preview-frame">
        <div className="preview-header">
          <div>
            <p className="eyebrow">Pretext Layout Check</p>
            <h2>Search Preview</h2>
          </div>
          <StatusBadge status={status} />
        </div>
        <p className="preview-description">
          Search placeholder and result title are checked for input overflow and result card height changes.
        </p>

        <div className="preview-stage">
          <div className="sim-search">
            <div className="sim-search-input" style={{ width: inputSpec.width }}>
              <span aria-hidden="true" />
              <em>{text}</em>
            </div>
            <div className="sim-search-card" style={{ width: resultSpec.width }}>
              <small>Search Result</small>
              <h3>{text}</h3>
              <p>Localization validation result preview</p>
            </div>
          </div>
        </div>

        <div className="dual-metrics">
          <MetricsGrid analysis={inputAnalysis} />
          <MetricsGrid analysis={resultAnalysis} />
        </div>
      </section>
    </article>
  );
}
