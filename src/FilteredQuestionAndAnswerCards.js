import React from 'react'
import { Accordion } from 'semantic-ui-react'

const FilteredQuestionAnswerCards = ({ data }) => {

      const mappedPanels = data.map((topic, key) => {
          return {
              key,
              title: topic.category,
              content: {
                  content: (<div>
                        <Accordion.Accordion panels={topic.questionsAndAnswers.map((qandA,key2) => ({
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
  <Accordion defaultActiveIndex={data.map((qns,index) => index)} fluid exclusive={false} panels={mappedPanels} styled />
    )}

export default FilteredQuestionAnswerCards
