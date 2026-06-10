import { buttonSizes, languageOptions } from '../data/labData.js';

export default function LabControls({
  buttonSize,
  languageId,
  onButtonSizeChange,
  onLanguageChange,
  onTextChange,
  showButtonSize = false,
  text,
}) {
  return (
    <section className="lab-controls" aria-label="Text layout controls">
      <label className="field-group">
        <span>Input Text</span>
        <textarea
          value={text}
          onChange={(event) => onTextChange(event.target.value)}
          rows={3}
          spellCheck="false"
        />
      </label>

      <div className="control-row">
        <label className="field-group">
          <span>Language</span>
          <select value={languageId} onChange={(event) => onLanguageChange(event.target.value)}>
            {languageOptions.map((language) => (
              <option key={language.id} value={language.id}>
                {language.label}
              </option>
            ))}
          </select>
        </label>

        {showButtonSize && (
          <label className="field-group">
            <span>Button Size</span>
            <select value={buttonSize} onChange={(event) => onButtonSizeChange(event.target.value)}>
              {Object.entries(buttonSizes).map(([id, size]) => (
                <option key={id} value={id}>
                  {size.label}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>
    </section>
  );
}
