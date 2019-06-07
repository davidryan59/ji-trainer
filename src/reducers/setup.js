import { combineReducers } from 'redux'

import picklist from './picklist'
import { controlIdArray } from '../constants'


const setupObj = {}
controlIdArray.forEach( id => setupObj[id] = picklist(id) )
const setup = combineReducers(setupObj)

export default setup
