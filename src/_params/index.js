import { last, getFloatFromFractionString } from '../maths'   // eslint-disable-line no-unused-vars

// Show the state viewer? (Developer option)
export const showStateViewer = false
// export const showStateViewer = true

// Minimum number of pixels change in window size (vertically or horizontally)
// that causes a window change size action to be dispatched
export const windowSizeChangeMinDiff = 20

// Test setup parameters
export const randomFilterPercentage = 10   // Remove some chords at random for each question
export const surfaceLayerProportion = 2.00 // 0.25 means surface layer has 1/4 the volume of interior
export const maxCentsTarget = 100          // per degree freedom. 3:4 has 1 degree, 4:5:6 has 2 degrees, etc.
export const initialCentsTarget = 50
export const correctFactor = 0.8
export const incorrectFactor = 1.15
export const minChordsForTest = 50
export const defaultMaxChords = 10000
export const defaultMaxLoops = 500000   // Should take only a fraction of a second to run.

// Picklist setups
export const notesInChordArray = [2, 3, 4, 5, 6].reverse()
// export const defaultNotesInChord = last(notesInChordArray)
export const defaultNotesInChord = 4

export const maxComplexityArray = [
  30, 60, 120, 240, 360, 504, 720, 1080, 1680,
  2520, 3360, 5040, 7560, 10080, 20160, 55440
].reverse()
// export const defaultMaxComplexity = 1080   // 1080 = 27 * 40. Will include normal and wolf intervals.
export const defaultMaxComplexity = 360

// Minimum interval humans can discern is around 1 cent, or roughly 1701 Hz / 1700 Hz
// however most useful chords will contain intervals much larger than this.
// Maximum interval humans can discern is around 22,000 Hz / 30 Hz, factor of 733,
// however most useful chords will be less than 6 octaves.
export const intervalValArray = [
  '1/1',
  '25/24', '16/15', '10/9', '9/8', '8/7',
  '23/20', '15/13', '7/6', '13/11', '6/5', '11/9', '5/4', '9/7', '13/10', '30/23',
  '4/3', '11/8', '7/5', '3/2', '8/5', '5/3', '7/4',
  '2/1', '5/2', '3/1', '4/1', '5/1', '6/1', '7/1',
  '8/1', '16/1', '32/1', '64/1'
].reverse()  // Want bigger intervals at top of picklist
export const intervalNumArray = intervalValArray.map( elt => getFloatFromFractionString(elt) )
// Manual defaults
export const defaultMinInterval = '10/9'
export const defaultMaxInterval = '3/2'
export const defaultMinChordInterval = '2/1'
export const defaultMaxChordInterval = '4/1'
// // Automatic defaults
// const minInterval = last(intervalValArray)
// const maxInterval = intervalValArray[0]
// export const defaultMinInterval = minInterval
// export const defaultMaxInterval = maxInterval
// export const defaultMinChordInterval = minInterval
// export const defaultMaxChordInterval = maxInterval

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

// MIXER CONTROL - Control the number of delay channels on mixer, and their parameters
// mixerDelayArray is nested array. Each element is of form [gain, resonantFreqHz]
// Each delay of a certain length reinforces (resonates) some frequencies, and cancels others
// The resonant frequency is the lowest frequency reinforced, it doubles in amplitude.
//
// Resonant frequencies - ought to be mutually irrational
// so as to let every frequency through to some extent
const pi = 3.14159265
const baseResonantFreqHz = pi * 15      // 47.123... 
const sqrt2 = 2 ** 0.5                  //  1.414...
const goldenRatio = (5 ** 0.5 + 1) / 2  //  1.618...
const sqrt3 = 3 ** 0.5                  //  1.732...

export const mixerDelayArray = [
  [-0.25, baseResonantFreqHz],
  [-0.25, baseResonantFreqHz * sqrt2],
  [-0.25, baseResonantFreqHz * goldenRatio],
  [-0.25, baseResonantFreqHz * sqrt3]
]
// When the gains add up to -1, the DC component is eliminated,
// which is highly desirable since FM synthesis usually produces some DC component.
