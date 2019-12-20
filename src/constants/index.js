// Modes
export const SETUP_TEST = 'SETUP_TEST'
export const TEST_VALID = 'TEST_VALID'
export const TAKE_TEST = 'TAKE_TEST'
export const MARK_TEST = 'MARK_TEST'

// Action types
export const WINDOW_RESIZE = 'WINDOW_RESIZE'
export const SET_PICKLIST = 'SET_PICKLIST'
export const SET_CHECKBOX = 'SET_CHECKBOX'
export const BUTTON_PRESS = 'BUTTON_PRESS'
export const AUDIO_ENDED = 'AUDIO_ENDED'

// Button ids
export const VALIDATE_TEST = 'VALIDATE_TEST'
export const START_TEST = 'START_TEST'
export const PLAY_AUDIO = 'PLAY_AUDIO'
export const SELECT_ANSWER = 'SELECT_ANSWER'
export const FINISH_TEST = 'FINISH_TEST'
export const FINISH_REVIEW = 'FINISH_REVIEW'

// Control types
export const CHECKBOX = 'CHECKBOX'
export const PICKLIST = 'PICKLIST'

// Control ids
export const MAX_COMPLEXITY = 'MAX_COMPLEXITY'
export const NOTES_IN_CHORD = 'NOTES_IN_CHORD'
export const PLAYBACK_SPEED = 'PLAYBACK_SPEED'
export const UTONAL_DISPLAY = 'UTONAL_DISPLAY'
export const MIN_INTERVAL = 'MIN_INTERVAL'
export const MAX_INTERVAL = 'MAX_INTERVAL'
export const MIN_CHORD_INTERVAL = 'MIN_CHORD_INTERVAL'
export const MAX_CHORD_INTERVAL = 'MAX_CHORD_INTERVAL'

export const controlIdArray = [
  MAX_COMPLEXITY, NOTES_IN_CHORD, PLAYBACK_SPEED, UTONAL_DISPLAY,
  MIN_INTERVAL, MAX_INTERVAL, MIN_CHORD_INTERVAL, MAX_CHORD_INTERVAL
]

export const nbsp = String.fromCharCode(8239)
