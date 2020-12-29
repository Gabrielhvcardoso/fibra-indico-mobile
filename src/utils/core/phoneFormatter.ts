export function phoneFormatter (value: string) {
  return value
    .replace(/\D/g, '')
    .padStart(10, '0')
    .replace(/^(\d{2})+(\d{5}|\d{4})+(\d{4})$/, '($1) $2-$3');
}
