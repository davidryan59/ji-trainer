const setupContexts = (objStore, reduxStore) => {
  objStore.ctx = {}
  objStore.ctx.audio = new (window.AudioContext || window.webkitAudioContext)()
}

export default setupContexts
