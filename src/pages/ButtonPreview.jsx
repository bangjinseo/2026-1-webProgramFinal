import LabControls from '../components/LabControls.jsx';
import PreviewFrame from '../components/PreviewFrame.jsx';
import { buttonSizes } from '../data/labData.js';
import { useLayoutAnalysis } from '../hooks/useLayoutAnalysis.js';

export default function ButtonPreview({
  buttonSize,
  language,
  languageId,
  onButtonSizeChange,
  onLanguageChange,
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
        onTextChange={onTextChange}
        showButtonSize
        text={text}
      />
      <PreviewFrame
        analysis={analysis}
        description="Checks whether a localized button label fits a single-line Apple-style control."
        title="Button Preview"
      >
        <button className={`sim-button sim-button-${buttonSize}`} style={{ width: spec.width }} type="button">
          {text}
        </button>
      </PreviewFrame>
    </article>
  );
}
