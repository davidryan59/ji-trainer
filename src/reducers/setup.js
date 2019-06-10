import { combineReducersWithOuterState } from '../redux-extensions'

import picklist from './picklist'
import { controlIdArray } from '../constants'


const setupObj = {}
controlIdArray.forEach( id => setupObj[id] = picklist(id) )
const setup = combineReducersWithOuterState(setupObj)

export default setup
