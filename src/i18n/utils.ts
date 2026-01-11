import 'server-only'
import { en } from './en'
import { es } from './es'

const dictionaries = {
  en,
  es,
}

export type Locale = keyof typeof dictionaries
export type Dictionary = typeof en

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale] ?? dictionaries.en
}
