import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getChatbot, messageInput, callChatbot, getQuestions, captureAction } from './actions'

const Chatbot = ({ getChatbot, chatbot, messageInput, convoHistory, callChatbot, getQuestions, captureAction }) => {

    useEffect(() => {
        getQuestions().
        then(data => {
            getChatbot()
        })
    }, [])

    return (
        <div>
            <h2>Chatbot</h2>
            <h3>Display</h3>
            <div className="display">
                <ul className="display__convo">
                    {convoHistory.map(convo => {
                        if(convo.person === 'user') {
                            return <div>
                            {convo.message.map(msg => (
                                <li className="account account--user">
                                    <div className="user-message">
                                        <p>{msg}</p>    
                                    </div>
                                </li>
                            ))}
                        </div>
                        }
                        return <div>
                            {convo.message.map(msg => (
                                <li className="account">
                                    <div className="image-container">
                                        <img src="data:image/jpeg;base64,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"/>
                                    </div>
                                    <div className="bot-message">
                                    <p>{msg}</p>
                                    <ul className="options-list">
                                {convo.options.map(option => (
                                    <li>
                                        <button onClick={captureAction}>{option}</button>
                                    </li>
                                ))}
                            </ul>
                            </div>
                                </li>
                            ))}

                        </div>
                    })}
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return state
}

export default connect(
    mapStateToProps,
    { getChatbot, messageInput, callChatbot, getQuestions, captureAction }
)(Chatbot)