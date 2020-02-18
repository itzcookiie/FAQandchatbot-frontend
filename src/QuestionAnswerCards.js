import React from 'react'
import { Accordion } from 'semantic-ui-react'

const QuestionAnswerCards = ({ data }) => {

      const mappedPanels = data.map((topic, key) => {
          return {
              key,
              title: {
                  content: topic.category,
                  id: topic.category
              },
              content: {
                  content: (<div>
                        <Accordion.Accordion id={key} panels={topic.questionsAndAnswers.map((qandA,key2) => ({
                                key: key2, 
                                title: qandA.question, 
                                content: {
                                    content: qandA.answer,
                                    id: qandA.question.split(' ').join('-')
                                },
                                index: key2 
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

// import React from 'react'
// import { Accordion, Segment, Label, Message } from 'semantic-ui-react'

// const QuestionAnswerCards = ({ data }) => {

//       const mappedPanels = data.map((topic, key) => {
//           return {
//               key,
//               title: <Label content={topic.category} id={topic.category} color="green" />,
//               content: {
//                   content: <Message content={<Accordion.Accordion id={key} panels={topic.questionsAndAnswers.map((qandA,key2) => ({
//                     key: key2, 
//                     title: {
//                         content: <Label content={qandA.question} />
//                     }, 
//                     content: {
//                         content: <Message content={qandA.answer} />,
//                         id: qandA.question.split(' ').join('-')
//                     },
//                     index: key2 
//                 })
//                     )} />} />
//               }
//           }
//       })

//     return (
//         <Segment>
//             <Accordion defaultActiveIndex={[0,1,2,3]} fluid exclusive={false} panels={mappedPanels} />
//         </Segment>
//     )}

// export default QuestionAnswerCards
