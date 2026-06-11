import LabControls from '../components/LabControls.jsx';
import PreviewFrame from '../components/PreviewFrame.jsx';
import { previewSpecs } from '../data/labData.js';
import { useLayoutAnalysis } from '../hooks/useLayoutAnalysis.js';

export default function ModalPreview({ language, languageId, onLanguageChange, onRandomExample, onTextChange, text }) {
  const spec = previewSpecs.modal;
  const analysis = useLayoutAnalysis({ text, language, spec });

  return (
    <article className="page-stack">
      <LabControls
        languageId={languageId}
        onLanguageChange={onLanguageChange}
        onRandomExample={onRandomExample}
        onTextChange={onTextChange}
        randomCategories="modal"
        text={text}
      />
      <PreviewFrame
        analysis={analysis}
        description="다른 언어로 바뀐 문장이 작은 모달 안에서도 명확하게 읽히는지 확인합니다."
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
