import React from 'react'

import IssueRow from './IssueRow'

const tableStyle = {borderCollapse: "collapse"}
const rowStyle = {border: "1px solid silver", padding: 4}

const issues = [
    {
        issueId: 1,
        issueTitle: "Error in console when clicking Add"
    },
    {
        issueId: 2,
        issueTitle: "Missing bottom border on panel"
    }
]

const IssueTable = () => (
    <table style={tableStyle}>
        <thead>
            <tr>
                <th style={rowStyle}>ID</th>
                <th style={rowStyle}>Title</th>
            </tr>
        </thead>
        <tbody>
            <IssueRow 
                rowStyle={rowStyle}
                issueId={issues[0].issueId}
                issueTitle={issues[0].issueTitle}
            />
            <IssueRow 
                rowStyle={rowStyle}
                issueId={issues[1].issueId}
                issueTitle={issues[1].issueTitle}
            />
        </tbody>
    </table>
)

export default IssueTable