export const randomIntegerUpTo = limit => 1 + Math.floor(Math.random() * limit)

export const chordArrayToCompoundRatio = chordArray => chordArray.toString().replace(/,/g,':')

export const chordPairToCents = chordArray => {
  const cents = 1200 * Math.log(chordArray[1] / chordArray[0]) / Math.log(2)
  return ('' + cents).slice(0, 6) + " cents"
}

export const gcd = (a, b) => (!b) ? a : gcd(b, a%b)

export const resHzToDelayS = resonantFreqHz => 1 / (2 * resonantFreqHz)
