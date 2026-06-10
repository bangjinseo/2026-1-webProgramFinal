import LabControls from '../components/LabControls.jsx';
import PreviewFrame from '../components/PreviewFrame.jsx';
import { previewSpecs } from '../data/labData.js';
import { useLayoutAnalysis } from '../hooks/useLayoutAnalysis.js';

export default function NavigationPreview({ language, languageId, onLanguageChange, onTextChange, text }) {
  const spec = previewSpecs.navigation;
  const analysis = useLayoutAnalysis({ text, language, spec });

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
        description="Checks compact tab and navigation labels where wrapping usually creates layout risk."
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
    </article>
  );
}
