import './App.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [numbers, setNumbers] = useState([])
  const [result, setResult] = useState([])


  useEffect(() => {
    axios
      .get('http://localhost:3001/allnumbers')
      .then(response => {
        setNumbers(response.data)
        console.log(numbers);
      })
  }, [])

  useEffect(() => {
    const result = numbers.filter(el => (el.number / 2020) = 0)
    setResult(result)
  }, numbers)

  return (
    <div>
      <h1>AdventOfCode 1</h1>

      <ul>
        {result.map(res =>
        <li key={res.id}>
          {res.number}
        </li>
        )}
      </ul>
    </div>
  )

}


export default App;
