import LabControls from '../components/LabControls.jsx';
import PreviewFrame from '../components/PreviewFrame.jsx';
import { previewSpecs } from '../data/labData.js';
import { useLayoutAnalysis } from '../hooks/useLayoutAnalysis.js';

export default function CardPreview({ language, languageId, onLanguageChange, onTextChange, text }) {
  const spec = previewSpecs.card;
  const analysis = useLayoutAnalysis({ text, language, spec });
  const cardHeight = Math.min(188, Math.max(104, analysis.textHeight + 72));

  return (
    <article className="page-stack">
      <LabControls
        languageId={languageId}
        onLanguageChange={onLanguageChange}
        onTextChange={onTextChange}
        text={text}
      />
      <PreviewFrame
        analysis={analysis}
        description="Shows how the same text changes a card height and whether the content remains readable."
        title="Card Preview"
      >
        <div className="sim-card" style={{ minHeight: cardHeight, width: spec.width }}>
          <span>Localized Card</span>
          <h3>{text}</h3>
          <p>Content height adapts until it reaches the safe reading boundary.</p>
        </div>
      </PreviewFrame>
    </article>
  );
}
