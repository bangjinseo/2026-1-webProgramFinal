export const menuItems = [
  { id: 'about', label: 'About Service', path: 'Localization Lab/About Service' },
  { id: 'button', label: 'Button Preview', path: 'Localization Lab/Button Preview' },
  { id: 'card', label: 'Card Preview', path: 'Localization Lab/Card Preview' },
  { id: 'modal', label: 'Modal Preview', path: 'Localization Lab/Modal Preview' },
  { id: 'navigation', label: 'Navigation Preview', path: 'Localization Lab/Navigation Preview' },
  { id: 'sidebar', label: 'Sidebar Preview', path: 'Localization Lab/Sidebar Preview' },
  { id: 'search', label: 'Search Preview', path: 'Localization Lab/Search Preview' },
];

export const languageOptions = [
  { id: 'en', label: 'English', locale: 'en-US', sample: 'Continue' },
  { id: 'ko', label: 'Korean', locale: 'ko-KR', sample: '계속하기' },
  { id: 'ja', label: 'Japanese', locale: 'ja-JP', sample: '続ける' },
  { id: 'de', label: 'German', locale: 'de-DE', sample: 'Fortfahren' },
  { id: 'fr', label: 'French', locale: 'fr-FR', sample: 'Continuer' },
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
