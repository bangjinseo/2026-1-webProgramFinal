import { useEffect, useMemo, useState } from 'react';
import LanguageComparison from '../components/LanguageComparison.jsx';
import LayoutFeedback from '../components/LayoutFeedback.jsx';
import MetricsGrid from '../components/MetricsGrid.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { previewSpecs } from '../data/labData.js';
import { analyzeTextLayout } from '../lib/pretextLayout.js';
import {
  getDictionaryByCategory,
  getEntryText,
  getRandomDictionaryEntry,
  translateMockText,
} from '../services/translationService.js';

function getWorstStatus(inputAnalysis, resultAnalysis) {
  if (inputAnalysis.status === 'Overflow Risk' || resultAnalysis.status === 'Overflow Risk') return 'Overflow Risk';
  if (inputAnalysis.status === 'Wrap' || resultAnalysis.status === 'Wrap') return 'Wrap';
  return 'Safe';
}

export default function SearchPreview({ language, languageId, onLanguageChange }) {
  const searchEntries = useMemo(() => getDictionaryByCategory('search'), []);
  const samples = useMemo(() => searchEntries.map((entry) => getEntryText(entry, languageId)), [languageId, searchEntries]);
  const [text, setText] = useState(samples[0]);
  const inputSpec = previewSpecs.searchInput;
  const resultSpec = previewSpecs.searchResult;

  useEffect(() => {
    setText((currentText) => translateMockText(currentText, languageId));
  }, [languageId]);

  const handleRandomExample = () => {
    setText(getEntryText(getRandomDictionaryEntry('search'), languageId));
  };

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
            <input
              list="search-preview-samples"
              type="text"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder={samples[0]}
            />
            <datalist id="search-preview-samples">
              {samples.map((sample) => (
                <option key={sample} value={sample} />
              ))}
            </datalist>
          </label>
          <div className="field-group">
            <span>Example</span>
            <button className="secondary-control-button" type="button" onClick={handleRandomExample}>
              Random Example
            </button>
          </div>
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
          검색창 placeholder와 검색 결과 제목이 입력 영역을 넘치는지, 결과 카드 높이를 어떻게 바꾸는지 확인합니다.
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
        <div className="dual-feedback">
          <LayoutFeedback
            analysis={inputAnalysis}
            componentType="search"
            containerLabel="검색창"
            paddingX={34}
          />
          <LayoutFeedback
            analysis={resultAnalysis}
            componentType="search"
            containerLabel="검색 결과 카드"
            paddingX={32}
          />
        </div>
      </section>
      <LanguageComparison
        activeLanguageId={languageId}
        baseText={text}
        componentType="search"
        renderSample={(sampleText) => (
          <div className="sim-search-input" style={{ width: inputSpec.width }}>
            <span aria-hidden="true" />
            <em>{sampleText}</em>
          </div>
        )}
        spec={inputSpec}
      />
    </article>
  );
}
