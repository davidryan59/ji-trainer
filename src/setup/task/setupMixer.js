import { resHzToDelayS } from '../../maths'

const setupMixer = (objStore, reduxStore) => {
  // Object store will contain a mixer and all its nodes
  //
  // The mixer contains:
  // - Pre-delay gain node - set to 0.5, to prevent clipping due to resonant delays potentially doubling amplitude
  // - Delay setup - this removes DC, and allows every other frequency through
  // - Post-delay gain node - set to 1/N for an N note chord, to prevent clipping
  //
  // The delay setup:
  // - No-delay connection with gain 1.0
  // - Multiple delay connections with gains adding to -1.0, resonant frequencies out of phase
  // Since the gains add up to 0, this will eliminate DC
  // Since the frequencies are out of phase (mutually irrational ratios),
  // every non-zero frequency will be allowed through to some extent
  //
  // In FM synthesis for periodic waveforms, a DC component is normally present,
  // and delay setups such as this allow the DC to be eliminated.
  
  // Store all mixer values here
  const mixer = objStore.mixer = {}
  const aCtx = objStore.ctx.audio
  // Setup the no-delay component
  mixer.preDelayGain = aCtx.createGain()
  mixer.postDelayGain = aCtx.createGain()
  mixer.preDelayGain.gain.value = 0.5
  mixer.postDelayGain.gain.value = 1  // Will update to 1/N with each chord
  mixer.preDelayGain.connect(mixer.postDelayGain)
  mixer.postDelayGain.connect(aCtx.destination)
  // Control incoming connections, and overall volume from elsewhere
  mixer.input = mixer.preDelayGain
  mixer.gain = mixer.postDelayGain  
  
  // Create delay network
  // Setup parameters
  const val1 = 314.159265
  const mult1 = 3 ** 0.5 - 1            // Sqrt(3) - 1  = 0.732...
  const mult2 = (5 ** 0.5 - 1) * 0.5    // Golden ratio = 0.618...
  const delayResHzArray = [val1, val1 * mult1, val1 * mult2]  // Resonant frequencies - mutually irrational
  const delayGainArray = [-0.45, -0.35, -0.2]                  // Gains - must sum to -1
  const lowestResHz = delayResHzArray.reduce((acc, curr) => Math.min(acc, curr), 1e15)
  const maxDelayS = resHzToDelayS(lowestResHz) + 0.05
  // Create channels
  mixer.delayNodes = []
  mixer.delayGains = []
  for (let i=0; i<delayResHzArray.length; i++) {
    const delayResHz = delayResHzArray[i]
    const delayGain = delayGainArray[i]
    // Create the delay channel
    mixer.delayNodes[i] = aCtx.createDelay(maxDelayS)
    mixer.delayGains[i] = aCtx.createGain()
    mixer.delayNodes[i].delayTime.value = resHzToDelayS(delayResHz)
    mixer.delayGains[i].gain.value = delayGain
    // Connect this delay channel
    mixer.preDelayGain.connect(mixer.delayNodes[i])
    mixer.delayNodes[i].connect(mixer.delayGains[i])
    mixer.delayGains[i].connect(mixer.postDelayGain);  
  }
}

export default setupMixer
