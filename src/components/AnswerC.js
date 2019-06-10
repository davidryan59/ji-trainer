import { connect } from 'react-redux'

import Answer from './Answer'

import * as chd from '../models/chord'
import { toIntegerPercentText } from '../maths'


const mapStateToProps = (state, ownProps) => {
  const answer = ownProps.answer
  const chord = answer.chord
  const [displayRatios, isUtonal] = chd.displayChordArrayRatios(chord)
  return {
    displayRatios,
    isUtonal,
    noteCount: chord.length,
    displayCents: chd.chordArrayToCents(chord),
    cy: chd.complexity(chord),
    otc: toIntegerPercentText(chd.otonality(chord)),
    utc: toIntegerPercentText(chd.utonality(chord)),
    data: {
      qNum:answer.qNum,
      aNum:answer.aNum
    }
  }  
}

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Answer)
 
