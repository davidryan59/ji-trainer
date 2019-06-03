import setupContexts from './task/setupContexts'
import setupMixer from './task/setupMixer'

const setupObjectStore = (objStore, reduxStore) => {
  // Initialise Redux store before initialising object store
  setupContexts(objStore, reduxStore)
  setupMixer(objStore, reduxStore)
  objStore.setup = true
  console.log('Object store:')
  console.log(objStore)
}

export default setupObjectStore
