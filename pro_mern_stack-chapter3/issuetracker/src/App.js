import React from 'react'
import './App.css'

import IssueFilter from './components/IssueFilter'
import IssueTable from './components/IssueTable'
import IssueAdd from './components/IssueAdd'

const App = () => (
  <div>
    <h1>Issue Tracker</h1>
    <IssueFilter />
    <hr />
    <IssueTable />
    <hr />
    <IssueAdd />
  </div>
)

export default App;
