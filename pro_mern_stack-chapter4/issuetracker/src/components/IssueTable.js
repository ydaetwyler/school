import React, { useState, useEffect } from 'react'

import IssueRow from './IssueRow'

const IssueTable = ({ initialIssues }) => {
    const [issues, setIssues] = useState([])

    useEffect(() => {
        loadData()
    }, [])
    
    const loadData = () => {
        setTimeout(() => {
            setIssues(initialIssues)
        }, 500)
    }

    return (
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
    )
}

export default IssueTable