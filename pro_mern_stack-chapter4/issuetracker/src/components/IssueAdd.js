import React from 'react'

const IssueAdd = ({ submitHandler, newIssueTitle, newIssueTitleChangeHandler }) => (
    <div>
        <form onSubmit={submitHandler}>
            <input 
                value={newIssueTitle}
                onChange={newIssueTitleChangeHandler}
            />
            <button type="submit">save</button>
        </form>
    </div>
)

export default IssueAdd