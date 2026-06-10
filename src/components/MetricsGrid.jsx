export default function MetricsGrid({ analysis }) {
  const metrics = [
    ['Lines', analysis.lineCount],
    ['Text Height', `${analysis.formatted.textHeight}px`],
    ['Natural Width', `${analysis.formatted.naturalWidth}px`],
    ['Max Box', `${analysis.formatted.width}px x ${analysis.formatted.maxHeight}px`],
  ];

  return (
    <dl className="metrics-grid">
      {metrics.map(([label, value]) => (
        <div className="metric-item" key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
