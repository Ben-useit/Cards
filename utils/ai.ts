'use server';
import { CardFormData } from '@/lib/types';
import OpenAI from 'openai';
import { extractJsonSafely } from './json';

export const getAIResponse = async (
  word: string,
  lang: [string, string],
  selLanguage: string
): Promise<CardFormData> => {
  const prompt = `${selLanguage} word: ${word} \
    give back json:\
    {  frontItem: ${lang[0]} word,\
        frontExample: ${lang[0]} example,\
        backItem: ${lang[1]} translation of ${lang[0]} word,\
        backPronunciation: Pronunciation of backItem,\
        backExample: ${lang[1]} translation of ${lang[0]} example,}`;
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    store: true,
    messages: [{ role: 'user', content: prompt }],
  });
  const responseText = completion.choices[0].message.content;
  if (responseText) {
    const parsedObject = extractJsonSafely(responseText);
    return parsedObject;
  }
  return {
    frontItem: '',
    frontExample: '',
    backItem: '',
    backPronunciation: '',
    backExample: '',
  };
};
