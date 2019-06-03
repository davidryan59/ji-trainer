const playAudioForQuestion = (data, getState, objStore) => {
  const state = getState()
  // Obtain the correct question and answer to play
  const qNum = data.qNum
  console.log(`Playing audio for Q${qNum}`)
  const question = state.test.questions.find(question => question.qNum === qNum)
  const aNumCorrect = question.correctAnswer
  const answer = question.answers.find(answer => answer.aNum === aNumCorrect)
  // Set up the chord frequencies
  const chord = answer.chord
  const baseFreqHz = (400 + 200 * Math.random()) / chord[0]
  const chordHz = chord.map( num => baseFreqHz * num)
  // Set up audio context variables
  const aCtx = objStore.ctx.audio
  const aCtxTime = aCtx.currentTime
  // Set gain on mixer to be 1/N, where N is number of notes in chord
  const mixerGain = objStore.mixer.gain
  mixerGain.gain.cancelScheduledValues(aCtxTime)
  mixerGain.gain.setTargetAtTime(1 / chordHz.length, aCtxTime, 0.01)  // Short time constant - gain moves quickly to the right value
  // Iterate over chord, create nodes for each note in chord
  const nodes = []
  const diffS = 0.10 + 0.05 * Math.random()
  let startS = -diffS
  chordHz.forEach( freq => {
    // Offset start of each note in chord by a short time
    startS += Math.floor(1 + 1.2 * Math.random()) * diffS
    // Main oscillator (sine)
    const oscNode = aCtx.createOscillator()
    const gainNode = aCtx.createGain()
    oscNode.connect(gainNode)
    gainNode.connect(objStore.mixer.input)
    // Frequency modulation (sine)
    const modOscNode = aCtx.createOscillator()
    const modGainNode = aCtx.createGain()
    const freqMult = 1
    modOscNode.frequency.value = freq * freqMult
    modGainNode.gain.value = 50 + 500 * Math.random()
    modOscNode.connect(modGainNode)
    modGainNode.connect(oscNode.frequency)    
    // Control main gain node to give an ADSR envelope
    const sustainHeight = 0.8
    oscNode.frequency.value = freq
    gainNode.gain.setValueAtTime(0, 0)
    gainNode.gain.setValueAtTime(0, aCtxTime + startS + 0.05)
    gainNode.gain.linearRampToValueAtTime(1, aCtxTime + startS + 0.10)
    gainNode.gain.linearRampToValueAtTime(sustainHeight, aCtxTime + startS + 0.30)
    gainNode.gain.linearRampToValueAtTime(sustainHeight, aCtxTime + 1.70)
    gainNode.gain.linearRampToValueAtTime(0, aCtxTime + 2.00)
    // Start all source nodes before ADSR starts
    oscNode.start(aCtxTime + 0.03)
    modOscNode.start(aCtxTime + 0.03)
    // Stop all source nodes after ADSR finishes
    oscNode.stop(aCtxTime + 2.10)
    modOscNode.stop(aCtxTime + 2.10)
    // Keep a list of nodes that will need teardown (disconnecting)
    nodes.push(oscNode)
    nodes.push(modOscNode)
    nodes.push(gainNode)
    nodes.push(modGainNode)
  })  
  // Construct a teardown function to run after audio has stopped playing
  const totalPlayTimeS = 2.20
  const teardownFn = () => {
    console.log(`Running teardown on Q${qNum}`)
    for (let i=0; i<nodes.length; i++) {
      nodes[i].disconnect()
      nodes[i] = null
    }    
  }
  // Return teardown to user
  return [totalPlayTimeS, teardownFn]
}

export default playAudioForQuestion
