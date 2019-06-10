import { controlSetupArray } from '../controls'


export const getInitialWindowState = () => ({
  width: window.innerWidth,
  height: window.innerHeight  
})

export const initialisePicklistFromId = id => controlSetupArray.find( picklist => picklist.id === id )
