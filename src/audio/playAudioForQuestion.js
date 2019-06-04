import { playNoteMinHz, playNoteMaxHz } from '../constants/general'

import { PLAYBACK_SPEED } from '../constants/actionTypes'
import { getPicklistNumericValue } from '../setup/setupPicklists'


const playAudioForQuestion = (data, getState, objStore) => {
  const state = getState()
  // Get control parameters from state
  const totalPlayTimeS = getPicklistNumericValue(state.test.controls[PLAYBACK_SPEED])
  // Obtain the correct question and answer to play
  const qNum = data.qNum
  console.log(`Playing audio for Q${qNum}`)
  const question = state.test.questions.find(question => question.qNum === qNum)
  const aNumCorrect = question.correctAnswer
  const answer = question.answers.find(answer => answer.aNum === aNumCorrect)
  // Set up the chord frequencies
  const chord = answer.chord
  const chordTotalRatio = chord[chord.length - 1] / chord[0]
  const chordLimitRatio = playNoteMaxHz / playNoteMinHz
  const baseRatio = Math.max(1, chordLimitRatio / chordTotalRatio)   // Specifies maximum random shift in frequency ratio
  const baseFreqHz = playNoteMinHz * (baseRatio ** Math.random()) / chord[0]
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
  const maxTotalDiffS = 0.40 * totalPlayTimeS
  const minTotalDiffS = 0.25 * totalPlayTimeS
  const noteDiffS = (minTotalDiffS + (maxTotalDiffS - minTotalDiffS) * Math.random()) / Math.max(1, chordHz.length - 1)
  let startS = -noteDiffS
  chordHz.forEach( freq => {
    // Arpeggiate chord using a short time lapse between notes
    startS += noteDiffS
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
    modGainNode.gain.value = 500 + 500 * Math.random()
    modOscNode.connect(modGainNode)
    modGainNode.connect(oscNode.frequency)    
    // Start all source nodes before ADSR starts
    // Control main gain node to give an ADSR envelope
    // Stop all source nodes after ADSR finishes
    const sustainHeight = 0.8
    oscNode.frequency.value = freq
    gainNode.gain.setValueAtTime(0, 0)
    oscNode.start(aCtxTime + 0.01)
    modOscNode.start(aCtxTime + 0.01)
    gainNode.gain.setValueAtTime(0, aCtxTime + startS + 0.02)
    gainNode.gain.linearRampToValueAtTime(1, aCtxTime + startS + 0.05)
    gainNode.gain.linearRampToValueAtTime(sustainHeight, aCtxTime + startS + 0.15)
    gainNode.gain.cancelScheduledValues(aCtxTime + totalPlayTimeS - 0.21)
    gainNode.gain.linearRampToValueAtTime(sustainHeight, aCtxTime + totalPlayTimeS - 0.2)
    gainNode.gain.linearRampToValueAtTime(0, aCtxTime + totalPlayTimeS - 0.01)
    oscNode.stop(aCtxTime + totalPlayTimeS - 0.005)
    modOscNode.stop(aCtxTime + totalPlayTimeS - 0.005)
    // Keep a list of nodes that will need teardown (disconnecting)
    nodes.push(oscNode)
    nodes.push(modOscNode)
    nodes.push(gainNode)
    nodes.push(modGainNode)
  })  
  // Construct a teardown function to run after audio has stopped playing
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
