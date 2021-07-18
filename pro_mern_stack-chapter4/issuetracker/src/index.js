import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const initialIssues = [
  {
      id: 1,
      status: 'New',
      owner: 'Ravan',
      effort: 5,
      created: new Date(Date.now()),
      due: 0,
      title: "Error in console when clicking Add"
  },
  {
      id: 2,
      status: 'Assigned',
      owner: 'Eddie',
      effort: 14,
      created: new Date(Date.now()),
      due: new Date('2021-08-18'),
      title: "Missing bottom border on panel"
  }
]

const user = 'james'

ReactDOM.render(
  <React.StrictMode>
    <App initialIssues={initialIssues} user={user} />
  </React.StrictMode>,
  document.getElementById('root')
);
