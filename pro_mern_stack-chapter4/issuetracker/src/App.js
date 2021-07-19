import React, {useState, useEffect} from 'react'

import UserSelect from './components/UserSelect'
import IssueFilter from './components/IssueFilter'
import IssueTable from './components/IssueTable'
import IssueAdd from './components/IssueAdd'

import createIssue from './components/functions/createIssue'

const App = ({ initialIssues, operators }) => {
  const [issues, setIssues] = useState([])
  const [newIssueTitle, setNewIssueTitle] = useState('')
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState('')

  useEffect(() => {
      loadData()
  }, [])
  
  const loadData = () => {
      setTimeout(() => {
          setIssues(initialIssues)
          setUsers(operators)
      }, 500)
  }

  useEffect(() => {
    setCurrentUser(users[0])
  }, [users])

  const handleUserChange = event => {
    setCurrentUser(event.target.value)
  }

  const handleIssueTitleChange = event => {
      setNewIssueTitle(event.target.value)
  }
  
  const addIssue = event => {
      event.preventDefault()
      const issueToAdd = createIssue(issues, newIssueTitle, currentUser)
      setIssues(issues.concat(issueToAdd))
      setNewIssueTitle('')
  }

  return(
    <div>
      <h1>Issue Tracker</h1>
      <UserSelect 
        users={users}
        currentUser={currentUser}
        userChangeHandler={handleUserChange}
      />
      <IssueFilter />
      <hr />
      <IssueTable issues={issues} />
      <hr />
      <h2>Add new issue</h2>
      <IssueAdd 
        submitHandler={addIssue}
        newIssueTitle={newIssueTitle}
        newIssueTitleChangeHandler={handleIssueTitleChange}
      />
    </div>
  )
}

export default App;
