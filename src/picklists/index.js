import { NOTES_IN_CHORD, PLAYBACK_SPEED } from '../constants'

import { defaultNumberOfNotes } from '../_params'


export const picklistSetupArray = [
  {
    id: NOTES_IN_CHORD,
    label: 'Notes in chord',
    value: defaultNumberOfNotes,
    values: ['2 (Interval)', '3', '4', '5', '6'],
    nums: [2, 3, 4, 5, 6]
  },
  {
    id: PLAYBACK_SPEED,
    label: 'Note speed',
    value: 'Normal',
    values: ['Very Slow', 'Slow', 'Normal', 'Fast', 'Very Fast'],
    nums: [4.0, 2.5, 1.5, 1.0, 0.6],
    unit: 's'
  }
]

export const getPicklistNumericValue = picklist =>
  picklist.nums[picklist.values.findIndex( val => val === picklist.value )]
  
export const getSummary = picklistsObj => {
  const result = {}
  Object.entries(picklistsObj).forEach( ([key, value]) => result[key] = getPicklistNumericValue(value) )
  return result
}
  
