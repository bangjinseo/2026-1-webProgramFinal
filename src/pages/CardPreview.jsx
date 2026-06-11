import LabControls from '../components/LabControls.jsx';
import PreviewFrame from '../components/PreviewFrame.jsx';
import { previewSpecs } from '../data/labData.js';
import { useLayoutAnalysis } from '../hooks/useLayoutAnalysis.js';

export default function CardPreview({ language, languageId, onLanguageChange, onRandomExample, onTextChange, text }) {
  const spec = previewSpecs.card;
  const analysis = useLayoutAnalysis({ text, language, spec });
  const cardHeight = Math.min(188, Math.max(104, analysis.textHeight + 72));

  return (
    <article className="page-stack">
      <LabControls
        languageId={languageId}
        onLanguageChange={onLanguageChange}
        onRandomExample={onRandomExample}
        onTextChange={onTextChange}
        randomCategories="card"
        text={text}
      />
      <PreviewFrame
        analysis={analysis}
        description="같은 문장이 카드 높이를 어떻게 변화시키는지, 콘텐츠가 계속 읽기 쉬운 상태인지 확인합니다."
        title="Card Preview"
      >
        <div className="sim-card" style={{ minHeight: cardHeight, width: spec.width }}>
          <span>Localized Card</span>
          <h3>{text}</h3>
          <p>콘텐츠 높이는 안전하게 읽을 수 있는 범위에 도달할 때까지 조정됩니다.</p>
        </div>
      </PreviewFrame>
    </article>
  );
}
