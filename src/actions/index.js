import { playAudioForQuestion } from '../audio'

import { PLAY_AUDIO, AUDIO_ENDED } from '../constants'


let nextActionId = 0

export const getActionObject = (type, data) => ({
  type,
  actionId: nextActionId++,
  ...data
})

export const getThunk = (type, data) => (dispatch, getState, objStore) => {
  dispatch(getActionObject(type, data))
  if (data.id === PLAY_AUDIO) {
    const [totalPlayTimeS, teardownFn] = playAudioForQuestion(data, getState, objStore)
    if (totalPlayTimeS && teardownFn) {
      setTimeout( () => {
        teardownFn()
        dispatch(getActionObject(AUDIO_ENDED))
      }, 1000 * totalPlayTimeS)      
    }
  }
}
