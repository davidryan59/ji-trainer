import * as cts from '../constants'

import * as prm from '../_params'


// Each type of control will have a different type of object.
// Values must be provided for: type, id, value.
// If 'values' are not numeric, can provide a map to numbers using 'nums',
// which must have same length.

export const controlSetupArray = [
  {
    type: cts.CHECKBOX,
    id: cts.UTONAL_DISPLAY,
    label: 'Utonal?',
    value: true
  },
  {
    type: cts.PICKLIST,
    id: cts.NOTES_IN_CHORD,
    label: 'Notes in chord',
    value: prm.defaultNotesInChord,
    values: [...prm.notesInChordArray],
    data: {
      regenChords: true
    }
  },
  {
    type: cts.PICKLIST,
    id: cts.MAX_COMPLEXITY,
    label: 'Maximum chord complexity',
    value: prm.defaultMaxComplexity,
    values: [...prm.maxComplexityArray],
    data: {
      regenChords: true
    }
  },
  {
    type: cts.PICKLIST,
    id: cts.PLAYBACK_SPEED,
    label: 'Note speed',
    value: 'Normal',
    values: ['Very Slow', 'Slow', 'Normal', 'Fast', 'Very Fast'],
    nums: [4.0, 2.5, 1.5, 1.0, 0.6],
    unit: 's'
  },
  {
    type: cts.PICKLIST,
    id: cts.MIN_INTERVAL,
    label: 'Minimum interval',
    value: prm.defaultMinInterval,
    values: [...prm.intervalValArray],
    nums: [...prm.intervalNumArray],
    data: {
      regenChords: true
    }
  },
  {
    type: cts.PICKLIST,
    id: cts.MAX_INTERVAL,
    label: 'Maximum interval',
    value: prm.defaultMaxInterval,
    values: [...prm.intervalValArray],
    nums: [...prm.intervalNumArray],
    data: {
      regenChords: true
    }
  },
  {
    type: cts.PICKLIST,
    id: cts.MIN_CHORD_INTERVAL,
    label: 'Minimum chord interval',
    value: prm.defaultMinChordInterval,
    values: [...prm.intervalValArray],
    nums: [...prm.intervalNumArray],
    data: {
      regenChords: true
    }
  },
  {
    type: cts.PICKLIST,
    id: cts.MAX_CHORD_INTERVAL,
    label: 'Maximum chord interval',
    value: prm.defaultMaxChordInterval,
    values: [...prm.intervalValArray],
    nums: [...prm.intervalNumArray],
    data: {
      regenChords: true
    }
  }
]

export const getPicklistNumericValue = picklist =>
  Number.parseFloat((picklist.nums || picklist.values)[picklist.values.findIndex( val => val == picklist.value )]) // eslint-disable-line eqeqeq
  // e.g. '2' == 2 when looking up picklist values

export const getControlsSummary = controlsState => {
  const result = {}
  Object.entries(controlsState).forEach( ([controlId, controlObj]) => {
    result[controlId] = controlObj.type === cts.PICKLIST ? getPicklistNumericValue(controlObj) : controlObj.value
  })
  return result
}
