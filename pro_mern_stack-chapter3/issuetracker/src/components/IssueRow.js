import React from 'react'

const IssueRow = ({ rowStyle, issueId, issueTitle }) => (
    <tr>
        <td style={rowStyle}>{issueId}</td>
        <td style={rowStyle}>{issueTitle}</td>
    </tr>
)

export default IssueRow