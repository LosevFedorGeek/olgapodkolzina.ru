export function formatTypo(text: string): string {
  if (!text) return '';
  return text
    .replace(/(^|[\s(\[«"'>])([а-яА-ЯёЁa-zA-Z]{1,2})\s+/g, '$1$2\u00A0')
    .replace(/(\d+)\s+([а-яА-ЯёЁ₽%]+)/g, '$1\u00A0$2')
    .replace(/(\d+)\s+(\d+)\s*₽/g, '$1\u00A0$2\u00A0₽')
    .replace(/\s+([—–])\s+/g, '\u00A0— ');
}
