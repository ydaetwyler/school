import React from 'react'

const Form = ({ submitHandler, newIssueTitle, newIssueTitleChangeHandler }) => (
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

export default Form