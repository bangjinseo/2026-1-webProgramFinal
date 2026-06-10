import { useMemo } from 'react';
import MetricsGrid from '../components/MetricsGrid.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { previewSpecs, sidebarLabelSets } from '../data/labData.js';
import { analyzeTextLayout } from '../lib/pretextLayout.js';

function getWorstStatus(items) {
  if (items.some((item) => item.analysis.status === 'Overflow Risk')) return 'Overflow Risk';
  if (items.some((item) => item.analysis.status === 'Wrap')) return 'Wrap';
  return 'Safe';
}

export default function SidebarPreview({ language, languageId, onLanguageChange }) {
  const spec = previewSpecs.sidebar;
  const labels = sidebarLabelSets[languageId] ?? sidebarLabelSets.en;
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
  const longestItem = analyzedItems.reduce((current, item) =>
    item.analysis.naturalWidth > current.analysis.naturalWidth ? item : current,
  );

  return (
    <article className="page-stack">
      <section className="lab-controls" aria-label="Sidebar language controls">
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
          Finder-style sidebar labels are checked for wrapping, clipping, row height growth, and width risk.
        </p>

        <div className="preview-stage">
          <aside className="sim-sidebar" aria-label="Sidebar simulation">
            <p>Components</p>
            {analyzedItems.map((item) => (
              <button className={item.analysis.overflow ? 'has-risk' : ''} key={item.label} type="button">
                <span className="sidebar-icon" aria-hidden="true" />
                <span>{item.label}</span>
              </button>
            ))}
          </aside>
        </div>

        <MetricsGrid analysis={longestItem.analysis} />
      </section>
    </article>
  );
}
