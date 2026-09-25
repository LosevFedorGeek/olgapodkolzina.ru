export function formatTypo(text: string): string {
  if (!text) return '';
  return text
    .replace(/(^|[\s(\[«"'>])([а-яА-ЯёЁ]{1,2})\s+/g, '$1$2 ')
    .replace(/(\d+)\s+(\d+)\s*₽/g, '$1 $2 ₽')
    .replace(/&nbsp;—/g, ' –')
    .replace(/&nbsp;—&nbsp;/g, ' – ')
    .replace(/\u00A0—\s*/g, ' – ')
    .replace(/\s*—\s*/g, ' – ');
}
