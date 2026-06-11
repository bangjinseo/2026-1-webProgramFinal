import { localizationDictionary } from '../data/localizationDictionary.js';

const supportedLanguageIds = ['en', 'ko', 'ja', 'de', 'fr'];

function normalizeText(value) {
  return String(value ?? '').trim().toLocaleLowerCase();
}

export function findLocalizationEntryByText(text) {
  const normalizedText = normalizeText(text);
  if (!normalizedText) return null;

  return localizationDictionary.find((entry) =>
    supportedLanguageIds.some((languageId) => normalizeText(entry[languageId]) === normalizedText),
  ) ?? null;
}

export function translateMockText(text, targetLanguageId) {
  const entry = findLocalizationEntryByText(text);
  return entry?.[targetLanguageId] ?? text;
}

export function getDictionaryByCategory(category) {
  return localizationDictionary.filter((entry) => entry.category === category);
}

export function getRandomDictionaryEntry(categories) {
  const categoryList = Array.isArray(categories) ? categories : [categories];
  const candidates = categoryList.filter(Boolean).length
    ? localizationDictionary.filter((entry) => categoryList.includes(entry.category))
    : localizationDictionary;

  return candidates[Math.floor(Math.random() * candidates.length)] ?? localizationDictionary[0];
}

export function getEntryText(entry, languageId) {
  return entry?.[languageId] ?? entry?.en ?? '';
}
