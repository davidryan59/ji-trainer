import React from 'react'

import { nbsp } from '../constants'


const QuestionInfo = obj => (
  <span>
    {
      obj.question.userAnswer
      ?
      `Diff ${Math.round(obj.question.minDist)}${nbsp}c`
      :
      `Diff${nbsp}> ${Math.round(obj.question.minDistAll)}${nbsp}c`
    }
  </span>
)

export default QuestionInfo
