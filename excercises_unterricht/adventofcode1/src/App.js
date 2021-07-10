import './App.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [numbers, setNumbers] = useState([])
  const [result, setResult] = useState([])
  const [match, setMatch] = useState([])


  useEffect(() => {
    axios
      .get('http://localhost:3001/allnumbers')
      .then(response => {
        setNumbers(response.data)
      })
  }, [])

  useEffect(() => {
    const checkSum = (numbers) => {
      for (let i = 0; i < numbers.length; i++) {
        for (let x = 0; x < numbers.length; x++) {
          if (i !== x) {
            const sum = numbers[i].number + numbers[x].number
            if (sum === 2020) {
              setMatch([numbers[i].number, numbers[x].number])
              setResult([numbers[i].number * numbers[x].number])
            }
          }
        }
      }
    }
    checkSum(numbers)
  }, [numbers])   

  console.log(result)

  return (
    <div>
      <h1>AdventOfCode 1</h1>
      <h2>These two numbers sum up to 2020</h2>
      <ul>
        {match.map(numb =>
        <li key={numb}>
          {numb}
        </li>
        )}
      </ul>
      <h2>These numbers multiplied are</h2>
      <ul>
        {result.map(res =>
        <li key={res}>
          {res}
        </li>
        )}
      </ul>
    </div>
  )

}


export default App;
