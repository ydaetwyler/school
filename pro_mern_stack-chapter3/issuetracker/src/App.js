import React from 'react'

import IssueFilter from './components/IssueFilter'
import IssueTable from './components/IssueTable'
import IssueAdd from './components/IssueAdd'

const App = ({ issues }) => (
  <div>
    <h1>Issue Tracker</h1>
    <IssueFilter />
    <hr />
    <IssueTable issues={issues} />
    <hr />
    <IssueAdd />
  </div>
)

export default App;
