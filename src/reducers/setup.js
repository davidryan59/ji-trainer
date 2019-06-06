import { combineReducers } from 'redux'

import { NOTES_IN_CHORD, PLAYBACK_SPEED } from '../constants'
import picklist from './picklist'


const setupObj = {}
setupObj[NOTES_IN_CHORD] = picklist(NOTES_IN_CHORD)
setupObj[PLAYBACK_SPEED] = picklist(PLAYBACK_SPEED)
const setup = combineReducers(setupObj)

export default setup
