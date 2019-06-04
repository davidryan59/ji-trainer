import { PLAYBACK_SPEED } from '../constants/actionTypes'

export const picklistSetupArray = [
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
  
