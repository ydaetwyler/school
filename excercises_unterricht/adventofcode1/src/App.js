import './App.css'
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import PartOne from './components/PartOne'
import PartTwo from './components/PartTwo'

const Title = () => (
  <div>
    <h1>AdventOfCode 1</h1>
  </div>
)

const App = () => {
  const [numbers, setNumbers] = useState([])

  const inputRef = useRef();

  useEffect(() => {
    axios
      .get('http://localhost:3001/allnumbers')
      .then(response => {
        setNumbers(response.data)
      })
  }, [inputRef])  

  return (
    <div>
      <Title />
      <PartOne allnumbers={numbers} />
      <PartTwo allnumbers={numbers} />
    </div>
  )

}

export default App
