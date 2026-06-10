import LabControls from '../components/LabControls.jsx';
import PreviewFrame from '../components/PreviewFrame.jsx';
import { previewSpecs } from '../data/labData.js';
import { useLayoutAnalysis } from '../hooks/useLayoutAnalysis.js';

export default function ModalPreview({ language, languageId, onLanguageChange, onTextChange, text }) {
  const spec = previewSpecs.modal;
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
        description="Tests whether localized copy stays clear inside a compact modal body."
        title="Modal Preview"
      >
        <div className="sim-modal" role="presentation">
          <h3>Confirm Action</h3>
          <p>{text}</p>
          <div className="modal-actions">
            <button type="button">Cancel</button>
            <button type="button">Continue</button>
          </div>
        </div>
      </PreviewFrame>
    </article>
  );
}
