// Minimum number of pixels change in window size (vertically or horizontally)
// that causes a window change size action to be dispatched
export const windowSizeChangeMinDiff = 20

// Test parameters
export const testMaxQuestionsToDisplay = 12

// Setup of note playback
// Very short delay for spacing out parameter control on audio nodes
export const deltaS = 0.01
// Note frequencies - range for Hz
export const playNoteMinHz = 100
export const playNoteMaxHz = 1000
// Frequency modulation - range for index (in Hz)
export const modulationMinIndex = 500
export const modulationMaxIndex = 1000
// Range of ratios of total note length to arpeggiate starts of notes
export const maxArpegg = 0.40
export const minArpegg = 0.25
// Control the envelope (ADSR) of notes playing
export const attackS = 0.02
export const decayS = 0.1
export const sustainAmp = 0.8  // attack amplitude is 1.0
export const releaseS = 0.2

// Control the number of delay channels on mixer, and what they do.
// Resonant frequencies - mutually irrational
const mixerDelay1Hz = 314.159265
const mixerDelay2Mult = 3 ** 0.5 - 1            // Sqrt(3) - 1  = 0.732...
const mixerDelay3Mult = (5 ** 0.5 - 1) * 0.5    // Golden ratio = 0.618...
// Gains for each delay channel
const mixerGain1 = 0.45
const mixerGain2 = 0.35
const mixerGain3 = 1 - mixerGain1 - mixerGain2  // When sum of gains is 1, DC on signal will be eliminated.
// Arrays to export final delay setup
export const mixerDelayResHzArray = [mixerDelay1Hz, mixerDelay1Hz * mixerDelay2Mult, mixerDelay1Hz * mixerDelay3Mult]
export const mixerDelayGainArray = [-mixerGain1, -mixerGain2, -mixerGain3]
// These two arrays must have the same length.
