// todo: implement true random API
export function Random({ qty, from = 0, to }) {
  if (!qty || qty <= 0) {
    let rnd = Math.random()
    if (to) rnd = Math.floor(rnd * (to - from)) + from
    return rnd
  }

  const arrayRandom = []
  for (let i = 0; i < qty; i++) {
    let rnd = Math.random()
    if (to) rnd = Math.floor(rnd * (to - from)) + from
    arrayRandom.push(rnd)
  }
  return arrayRandom
}
