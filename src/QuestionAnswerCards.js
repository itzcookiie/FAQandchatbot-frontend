import React from 'react'
import { Accordion } from 'semantic-ui-react'

const QuestionAnswerCards = (props) => {

    const {q} = props

      const mappedPanels = q.map((qns, key) => {
          return {
              key,
              title: qns.category,
              content: {
                  content: (<div>
                        <Accordion.Accordion panels={qns.questionsAndAnswers.map((qandA,key2) => ({
                                key: key2, 
                                title: qandA.question, 
                                content: qandA.answer 
                            })
                                )} />
                      </div>)
              }
          }
      })

    return (
  <Accordion defaultActiveIndex={[0,1,2,3]} fluid exclusive={false} panels={mappedPanels} styled />
    )}

export default QuestionAnswerCards
