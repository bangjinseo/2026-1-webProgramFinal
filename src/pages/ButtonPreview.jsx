import LanguageComparison from '../components/LanguageComparison.jsx';
import LabControls from '../components/LabControls.jsx';
import LayoutFeedback from '../components/LayoutFeedback.jsx';
import PreviewFrame from '../components/PreviewFrame.jsx';
import { buttonSizes } from '../data/labData.js';
import { useLayoutAnalysis } from '../hooks/useLayoutAnalysis.js';

export default function ButtonPreview({
  buttonSize,
  language,
  languageId,
  onButtonSizeChange,
  onLanguageChange,
  onRandomExample,
  onTextChange,
  text,
}) {
  const spec = buttonSizes[buttonSize];
  const analysis = useLayoutAnalysis({ text, language, spec });

  return (
    <article className="page-stack">
      <LabControls
        buttonSize={buttonSize}
        languageId={languageId}
        onButtonSizeChange={onButtonSizeChange}
        onLanguageChange={onLanguageChange}
        onRandomExample={onRandomExample}
        onTextChange={onTextChange}
        randomCategories="button"
        showButtonSize
        text={text}
      />
      <PreviewFrame
        analysis={analysis}
        description="다른 언어로 바뀐 버튼 문구가 한 줄 버튼 안에 자연스럽게 들어가는지 확인합니다."
        feedback={
          <LayoutFeedback
            analysis={analysis}
            componentType="button"
            containerLabel="버튼"
            paddingX={buttonSize === 'small' ? 28 : buttonSize === 'large' ? 44 : 36}
          />
        }
        title="Button Preview"
      >
        <button className={`sim-button sim-button-${buttonSize}`} style={{ width: spec.width }} type="button">
          {text}
        </button>
      </PreviewFrame>
      <LanguageComparison
        activeLanguageId={languageId}
        baseText={text}
        componentType="button"
        renderSample={(sampleText) => (
          <button className={`sim-button sim-button-${buttonSize}`} style={{ width: spec.width }} type="button">
            {sampleText}
          </button>
        )}
        spec={spec}
      />
    </article>
  );
}
