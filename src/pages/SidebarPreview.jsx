import { useEffect, useMemo, useState } from 'react';
import MetricsGrid from '../components/MetricsGrid.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { previewSpecs } from '../data/labData.js';
import { analyzeTextLayout } from '../lib/pretextLayout.js';
import {
  getDictionaryByCategory,
  getEntryText,
  getRandomDictionaryEntry,
} from '../services/translationService.js';

function getWorstStatus(items) {
  if (items.some((item) => item.analysis.status === 'Overflow Risk')) return 'Overflow Risk';
  if (items.some((item) => item.analysis.status === 'Wrap')) return 'Wrap';
  return 'Safe';
}

export default function SidebarPreview({ language, languageId, onLanguageChange }) {
  const spec = previewSpecs.sidebar;
  const sidebarEntries = useMemo(() => getDictionaryByCategory('sidebar'), []);
  const defaultLabels = useMemo(
    () => sidebarEntries.map((entry) => getEntryText(entry, languageId)),
    [languageId, sidebarEntries],
  );
  const [menuText, setMenuText] = useState(defaultLabels.join('\n'));
  const labels = useMemo(
    () => menuText.split('\n').map((label) => label.trim()).filter(Boolean),
    [menuText],
  );

  useEffect(() => {
    setMenuText(defaultLabels.join('\n'));
  }, [defaultLabels]);

  const analyzedItems = useMemo(
    () =>
      labels.map((label) => ({
        label,
        analysis: analyzeTextLayout({
          text: label,
          locale: language.locale,
          font: spec.font,
          lineHeight: spec.lineHeight,
          width: spec.width,
          maxHeight: spec.maxHeight,
          maxLines: spec.maxLines,
        }),
      })),
    [labels, language.locale, spec],
  );
  const worstStatus = getWorstStatus(analyzedItems);
  const longestItem = analyzedItems.reduce(
    (current, item) => (item.analysis.naturalWidth > current.analysis.naturalWidth ? item : current),
    analyzedItems[0],
  );

  const handleAddItem = () => {
    const entry = getRandomDictionaryEntry('sidebar');
    setMenuText((current) => `${current.trimEnd()}\n${getEntryText(entry, languageId)}`);
  };

  return (
    <article className="page-stack">
      <section className="lab-controls" aria-label="Sidebar language controls">
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
          <div className="field-group">
            <span>Menu Count</span>
            <button className="secondary-control-button" type="button" onClick={handleAddItem}>
              Add Menu Item
            </button>
          </div>
        </div>
        <label className="field-group">
          <span>Sidebar Menu Items</span>
          <textarea
            value={menuText}
            onChange={(event) => setMenuText(event.target.value)}
            rows={Math.max(6, labels.length + 1)}
            spellCheck="false"
          />
        </label>
      </section>

      <section className="preview-frame">
        <div className="preview-header">
          <div>
            <p className="eyebrow">Pretext Layout Check</p>
            <h2>Sidebar Preview</h2>
          </div>
          <StatusBadge status={worstStatus} />
        </div>
        <p className="preview-description">
          사이드바 메뉴 문구의 줄바꿈, 잘림, 행 높이 증가, 폭 초과 위험을 확인합니다.
        </p>

        <div className="preview-stage">
          <aside className="sim-sidebar" aria-label="Sidebar simulation">
            <p>Components</p>
            {analyzedItems.map((item, index) => (
              <button className={item.analysis.overflow ? 'has-risk' : ''} key={`${item.label}-${index}`} type="button">
                <span>{item.label}</span>
              </button>
            ))}
          </aside>
        </div>

        {longestItem && <MetricsGrid analysis={longestItem.analysis} />}
      </section>
    </article>
  );
}
