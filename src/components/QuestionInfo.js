import React from 'react'

import { nbsp } from '../constants'


const QuestionInfo = ({ question }) => (
  <span>
    {
      question.userAnswer
      ?
      `Diff ${Math.round(question.minDist)}${nbsp}c`
      :
      `Diff${nbsp}> ${Math.round(question.minDistAll)}${nbsp}c`
    }
  </span>
)

export default QuestionInfo
