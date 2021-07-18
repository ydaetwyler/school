import React from 'react'

const IssueRow = ({ issue }) => (
    <tr>
        <td>{issue.id}</td>
        <td>{issue.status}</td>
        <td>{issue.owner}</td>
        <td>{issue.created.toDateString()}</td>
        <td>{issue.effort}</td>
        <td>{issue.due ? issue.due.toDateString() : 'N/A'}</td>
        <td>{issue.title}</td>
    </tr>
)

export default IssueRow