import { getRecommendations, getRiskReason } from '../lib/layoutFeedback.js';

export default function LayoutFeedback({ analysis, containerLabel, componentType, paddingX }) {
  const reason = getRiskReason(analysis, containerLabel);
  const recommendations = getRecommendations(analysis, {
    componentType,
    containerLabel,
    paddingX,
  });

  return (
    <section className="layout-feedback" aria-label="Layout feedback">
      <p className="risk-reason">
        <strong>Reason:</strong> {reason}
      </p>
      {recommendations.length > 0 && (
        <div className="recommendation-panel">
          <h3>Recommendation</h3>
          <ul>
            {recommendations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

