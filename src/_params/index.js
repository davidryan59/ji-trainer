import { last, getFloatFromFractionString } from '../maths'

// Show the state viewer? (Developer option)
export const showStateViewer = false

// Minimum number of pixels change in window size (vertically or horizontally)
// that causes a window change size action to be dispatched
export const windowSizeChangeMinDiff = 20

// Test setup parameters
export const defaultMaxChords = 10000
export const defaultMaxLoops = 500000        // Should take only a fraction of a second to run.

// Picklist setups
export const notesInChordArray = [2, 3, 4, 5, 6].reverse()
export const defaultNumberOfNotes = last(notesInChordArray)

export const maxComplexityArray = [
  30, 60, 120, 240, 360, 504, 720, 1080, 1680,
  2520, 3360, 5040, 7560, 10080, 20160, 55440
].reverse()
export const defaultMaxComplexity = 1080   // 1080 = 27 * 40. Will include normal and wolf intervals.

// Minimum interval humans can discern is around 1 cent, or roughly 1701 Hz / 1700 Hz
// however most useful chords will contain intervals much larger than this.
// Maximum interval humans can discern is around 22,000 Hz / 30 Hz, factor of 733,
// however most useful chords will be less than 6 octaves.
export const intervalValArray = [
  '1',
  '81/80', '36/35', '25/24', '16/15', '10/9', '8/7',
  '23/20', '15/13', '7/6', '13/11', '6/5', '11/9', '5/4', '9/7', '13/10', '30/23',
  '17/13', '4/3', '11/8', '7/5', '3/2', '8/5', '5/3', '7/4',
  '2', '5/2', '3', '4', '5', '6', '7',
  '8', '16', '32', '64'
].reverse()  // Want bigger intervals at top of picklist
export const intervalNumArray = intervalValArray.map( elt => getFloatFromFractionString(elt) )
const minInterval = last(intervalNumArray)
const maxInterval = intervalNumArray[0]
export const defaultMinInterval = minInterval
export const defaultMaxInterval = maxInterval
export const defaultMinChordInterval = minInterval
export const defaultMaxChordInterval = maxInterval

// Test parameters
export const testMaxQuestionsToDisplay = 12
export const defaultNumberOfAnswers = 6

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
