import LanguageComparison from '../components/LanguageComparison.jsx';
import LabControls from '../components/LabControls.jsx';
import LayoutFeedback from '../components/LayoutFeedback.jsx';
import PreviewFrame from '../components/PreviewFrame.jsx';
import { previewSpecs } from '../data/labData.js';
import { useLayoutAnalysis } from '../hooks/useLayoutAnalysis.js';

export default function NavigationPreview({ language, languageId, onLanguageChange, onRandomExample, onTextChange, text }) {
  const spec = previewSpecs.navigation;
  const analysis = useLayoutAnalysis({ text, language, spec });

  return (
    <article className="page-stack">
      <LabControls
        languageId={languageId}
        onLanguageChange={onLanguageChange}
        onRandomExample={onRandomExample}
        onTextChange={onTextChange}
        randomCategories="navigation"
        text={text}
      />
      <PreviewFrame
        analysis={analysis}
        description="탭이나 네비게이션처럼 폭이 좁은 영역에서 문구가 잘리거나 줄바꿈되는지 확인합니다."
        feedback={
          <LayoutFeedback
            analysis={analysis}
            componentType="navigation"
            containerLabel="네비게이션 라벨"
            paddingX={24}
          />
        }
        title="Navigation Preview"
      >
        <nav className="sim-nav" aria-label="Navigation simulation">
          <button type="button">Home</button>
          <button className="is-active" style={{ width: spec.width }} type="button">
            {text}
          </button>
          <button type="button">Search</button>
        </nav>
      </PreviewFrame>
      <LanguageComparison
        activeLanguageId={languageId}
        baseText={text}
        componentType="navigation"
        renderSample={(sampleText) => (
          <nav className="sim-nav sim-nav-compact" aria-label="Navigation comparison">
            <button className="is-active" style={{ width: spec.width }} type="button">
              {sampleText}
            </button>
          </nav>
        )}
        spec={spec}
      />
    </article>
  );
}
