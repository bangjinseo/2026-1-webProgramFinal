import MetricsGrid from './MetricsGrid.jsx';
import StatusBadge from './StatusBadge.jsx';

export default function PreviewFrame({ analysis, children, description, title }) {
  return (
    <section className="preview-frame">
      <div className="preview-header">
        <div>
          <p className="eyebrow">Pretext Layout Check</p>
          <h2>{title}</h2>
        </div>
        <StatusBadge status={analysis.status} />
      </div>
      <p className="preview-description">{description}</p>
      <div className="preview-stage">{children}</div>
      <MetricsGrid analysis={analysis} />
    </section>
  );
}
