import { useMemo, useState } from 'react';
import AppShell from './layouts/AppShell.jsx';
import AboutService from './pages/AboutService.jsx';
import ButtonPreview from './pages/ButtonPreview.jsx';
import CardPreview from './pages/CardPreview.jsx';
import ModalPreview from './pages/ModalPreview.jsx';
import NavigationPreview from './pages/NavigationPreview.jsx';
import SidebarPreview from './pages/SidebarPreview.jsx';
import SearchPreview from './pages/SearchPreview.jsx';
import { languageOptions } from './data/labData.js';
import { getEntryText, getRandomDictionaryEntry, translateMockText } from './services/translationService.js';
import './styles/global.css';

export default function App() {
  const [activePage, setActivePage] = useState('about');
  const [languageId, setLanguageId] = useState('en');
  const [buttonSize, setButtonSize] = useState('medium');
  const [text, setText] = useState(languageOptions[0].sample);
  const language = useMemo(
    () => languageOptions.find((option) => option.id === languageId) ?? languageOptions[0],
    [languageId],
  );

  const handleLanguageChange = (nextLanguageId) => {
    setLanguageId(nextLanguageId);
    setText((currentText) => translateMockText(currentText, nextLanguageId));
  };

  const handleRandomExample = (categories) => {
    const entry = getRandomDictionaryEntry(categories);
    setText(getEntryText(entry, languageId));
  };

  const sharedProps = {
    buttonSize,
    language,
    languageId,
    onButtonSizeChange: setButtonSize,
    onLanguageChange: handleLanguageChange,
    onRandomExample: handleRandomExample,
    onTextChange: setText,
    text,
  };

  return (
    <AppShell activePage={activePage} onSelectPage={setActivePage}>
      {activePage === 'about' && <AboutService />}
      {activePage === 'button' && <ButtonPreview {...sharedProps} />}
      {activePage === 'card' && <CardPreview {...sharedProps} />}
      {activePage === 'modal' && <ModalPreview {...sharedProps} />}
      {activePage === 'navigation' && <NavigationPreview {...sharedProps} />}
      {activePage === 'sidebar' && <SidebarPreview language={language} languageId={languageId} onLanguageChange={handleLanguageChange} />}
      {activePage === 'search' && <SearchPreview language={language} languageId={languageId} onLanguageChange={handleLanguageChange} />}
    </AppShell>
  );
}
