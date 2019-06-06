export const ratioToCents = ratio => 1200 * Math.log(ratio) / Math.log(2)

export const randomIntegerBetween = (start, end) => start + Math.floor(Math.random() * (end - start + 1))

export const resHzToDelayS = resonantFreqHz => 1 / (2 * resonantFreqHz)

const reduceArrayWithBinaryFn = fn => arr => arr.reduce( (acc, curr) => fn(acc, curr) )
export const gcd = (a, b) => (!b) ? a : gcd(b, a%b)
export const lcm = (a, b) => a * b / gcd(a, b)
export const arrayGcd = reduceArrayWithBinaryFn(gcd)
export const arrayLcm = reduceArrayWithBinaryFn(lcm)

export const factorArray = n => {
  const result = []
  if (!Number.isInteger(n) || n < 1) return result
  const nsqr = n ** 0.5
  const nsqri = Math.floor(nsqr)
  for (let i=0; i<=nsqri; i++) if (n % i === 0) result.push(i)
  const len = result.length
  const extras = (nsqr === nsqri) ? len - 1 : len
  for (let j=0; j<extras; j++) result.push(n / result[extras - j - 1])
  return result
}
