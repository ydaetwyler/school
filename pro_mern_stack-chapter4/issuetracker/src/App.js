import React, {useState, useEffect} from 'react'

import IssueFilter from './components/IssueFilter'
import IssueTable from './components/IssueTable'
import IssueAdd from './components/IssueAdd'

import createIssue from './components/functions/createIssue'

const App = ({ initialIssues, user }) => {
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

  return(
    <div>
      <h1>Issue Tracker</h1>
      <IssueFilter />
      <hr />
      <IssueTable issues={issues} />
      <hr />
      <IssueAdd 
        submitHandler={addIssue}
        newIssueTitle={newIssueTitle}
        newIssueTitleChangeHandler={handleIssueTitleChange}
      />
    </div>
  )
}

export default App;
