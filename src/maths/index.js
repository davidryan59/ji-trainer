export const randomIntegerUpTo = limit => 1 + Math.floor(Math.random() * limit)

export const chordArrayToCompoundRatio = chordArray => chordArray.toString().replace(/,/g,':')

export const gcd = (a, b) => (!b) ? a : gcd(b, a%b)
