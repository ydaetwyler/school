import React, { useState, useEffect } from 'react'

import IssueRow from './IssueRow'
import Form from './Form'

import createIssue from './functions/createIssue'

const IssueTable = ({ initialIssues, user }) => {
    const [issues, setIssues] = useState([])
    const [newIssueTitle, setNewIssueTitle] = useState('')
    const [currentUser, setCurrentUser] = useState('')

    useEffect(() => {
        loadData()
    }, [])
    
    const loadData = () => {
        setTimeout(() => {
            setIssues(initialIssues)
            setCurrentUser(user)
        }, 500)
    }

    const handleIssueTitleChange = (event) => {
        setNewIssueTitle(event.target.value)
    }
    
    const addIssue = (event) => {
        event.preventDefault()
        const issueToAdd = createIssue(issues, newIssueTitle, currentUser)
        setIssues(issues.concat(issueToAdd))
        setNewIssueTitle('')
    }

    return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Status</th>
                    <th>Owner</th>
                    <th>Created</th>
                    <th>Effort</th>
                    <th>Due Date</th>
                    <th>Title</th>
                </tr>
            </thead>
            <tbody>
                {issues.map(issue => 
                    <IssueRow key={issue.id} issue={issue} />
                )}
            </tbody>
        </table>
        <Form 
            submitHandler={addIssue}
            newIssueTitle={newIssueTitle}
            newIssueTitleChangeHandler={handleIssueTitleChange}
        />
    </div>
    )
}

export default IssueTable