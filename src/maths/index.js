const nbsp = String.fromCharCode(8239)

const ratioToCents = ratio => 1200 * Math.log(ratio) / Math.log(2)

export const randomIntegerBetween = (start, end) => start + Math.floor(Math.random() * (end - start + 1))

export const chordArrayToCompoundRatio = chordArray => chordArray.toString().replace(/,/g,':')

export const chordArrayToCents = chordArray => {
  let result = ''
  for (let i=1; i<chordArray.length; i++) {
    const integerCents = Math.round(ratioToCents(chordArray[i] / chordArray[i-1]))
    result += integerCents + ',' + nbsp
  }
  return result.slice(0, result.length - 2) + nbsp + 'c'
}

export const gcd = (a, b) => (!b) ? a : gcd(b, a%b)

export const resHzToDelayS = resonantFreqHz => 1 / (2 * resonantFreqHz)
