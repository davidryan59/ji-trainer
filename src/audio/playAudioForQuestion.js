const playAudioForQuestion = (data, getState, objStore) => {
  console.log('Dummy play audio function - put some code here')
  const totalPlayTimeS = 2
  const teardownFn = () => console.log('Dummy teardownFn')
  return [totalPlayTimeS, teardownFn]
}

export default playAudioForQuestion
