export const menuItems = [
  { id: 'about', label: 'About Service', path: 'Apple Localization Lab/About Service' },
  { id: 'button', label: 'Button Preview', path: 'Apple Localization Lab/Button Preview' },
  { id: 'card', label: 'Card Preview', path: 'Apple Localization Lab/Card Preview' },
  { id: 'modal', label: 'Modal Preview', path: 'Apple Localization Lab/Modal Preview' },
  { id: 'navigation', label: 'Navigation Preview', path: 'Apple Localization Lab/Navigation Preview' },
  { id: 'sidebar', label: 'Sidebar Preview', path: 'Apple Localization Lab/Sidebar Preview' },
  { id: 'search', label: 'Search Preview', path: 'Apple Localization Lab/Search Preview' },
];

export const languageOptions = [
  { id: 'en', label: 'English', locale: 'en-US', sample: 'Continue with Apple' },
  { id: 'ko', label: 'Korean', locale: 'ko-KR', sample: 'Apple로 계속하기' },
  { id: 'ja', label: 'Japanese', locale: 'ja-JP', sample: 'Appleで続ける' },
  { id: 'de', label: 'German', locale: 'de-DE', sample: 'Mit Apple fortfahren' },
  { id: 'fr', label: 'French', locale: 'fr-FR', sample: 'Continuer avec Apple' },
];

export const buttonSizes = {
  small: {
    label: 'Small',
    width: 144,
    maxHeight: 34,
    maxLines: 1,
    font: '600 13px -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial',
    lineHeight: 18,
  },
  medium: {
    label: 'Medium',
    width: 188,
    maxHeight: 42,
    maxLines: 1,
    font: '600 15px -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial',
    lineHeight: 20,
  },
  large: {
    label: 'Large',
    width: 236,
    maxHeight: 50,
    maxLines: 1,
    font: '600 17px -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial',
    lineHeight: 22,
  },
};

export const previewSpecs = {
  button: {
    title: 'Button',
    width: 188,
    maxHeight: 42,
    maxLines: 1,
    font: buttonSizes.medium.font,
    lineHeight: buttonSizes.medium.lineHeight,
  },
  card: {
    title: 'Card',
    width: 276,
    maxHeight: 132,
    maxLines: 4,
    font: '500 17px -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial',
    lineHeight: 24,
  },
  modal: {
    title: 'Modal',
    width: 320,
    maxHeight: 72,
    maxLines: 3,
    font: '500 16px -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial',
    lineHeight: 23,
  },
  navigation: {
    title: 'Navigation',
    width: 132,
    maxHeight: 34,
    maxLines: 1,
    font: '600 14px -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial',
    lineHeight: 18,
  },
  sidebar: {
    title: 'Sidebar',
    width: 172,
    maxHeight: 34,
    maxLines: 1,
    font: '500 14px -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial',
    lineHeight: 18,
  },
  searchInput: {
    title: 'Search Input',
    width: 260,
    maxHeight: 36,
    maxLines: 1,
    font: '400 15px -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial',
    lineHeight: 20,
  },
  searchResult: {
    title: 'Search Result',
    width: 320,
    maxHeight: 58,
    maxLines: 2,
    font: '600 16px -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial',
    lineHeight: 22,
  },
};

export const sidebarLabelSets = {
  en: [
    'Localization',
    'Accessibility',
    'Navigation Preview',
    'Human Interface',
    'Apple Design Principles',
    'Project Configuration',
  ],
  ko: [
    '로컬라이제이션',
    '접근성',
    '네비게이션 미리보기',
    '휴먼 인터페이스',
    'Apple 디자인 원칙',
    '프로젝트 구성',
  ],
  ja: [
    'ローカリゼーション',
    'アクセシビリティ',
    'ナビゲーションプレビュー',
    'ヒューマンインターフェイス',
    'Appleデザイン原則',
    'プロジェクト設定',
  ],
  de: [
    'Lokalisierung',
    'Barrierefreiheit',
    'Navigationsvorschau',
    'Human Interface',
    'Apple Designprinzipien',
    'Projektkonfiguration',
  ],
  fr: [
    'Localisation',
    'Accessibilite',
    'Apercu de navigation',
    'Interface humaine',
    'Principes de design Apple',
    'Configuration du projet',
  ],
};

export const searchSampleSets = {
  en: [
    'Search',
    'Search projects',
    'Search files, projects and settings',
    'Search localization validation results',
  ],
  ko: [
    '검색',
    '프로젝트 검색',
    '파일, 프로젝트 및 설정 검색',
    '로컬라이제이션 검증 결과 검색',
  ],
  ja: [
    '検索',
    'プロジェクトを検索',
    'ファイル、プロジェクト、設定を検索',
    'ローカリゼーション検証結果を検索',
  ],
  de: [
    'Suchen',
    'Projekte suchen',
    'Dateien, Projekte und Einstellungen suchen',
    'Lokalisierungspruefergebnisse suchen',
  ],
  fr: [
    'Rechercher',
    'Rechercher des projets',
    'Rechercher fichiers, projets et reglages',
    'Rechercher les resultats de validation',
  ],
};
