import JSON5 from 'json5';

/**
 * Extracts and parses the first valid JSON object or array from a string.
 * Handles markdown fences, extra text, and malformed formatting using JSON5.
 */
export function extractJsonSafely(responseText: string) {
  // Remove markdown code fences and trim whitespace
  const cleanedText = responseText.replace(/```json|```/gi, '').trim();

  // Match the first JSON object or array
  const jsonMatch = cleanedText.match(/({[\s\S]*})|(\[[\s\S]*\])/);
  if (!jsonMatch) {
    console.warn('No valid JSON structure found in response.');
    return null;
  }

  try {
    return JSON5.parse(jsonMatch[0]);
  } catch (err) {
    console.error('Failed to parse JSON5:', err);
    return null;
  }
}
