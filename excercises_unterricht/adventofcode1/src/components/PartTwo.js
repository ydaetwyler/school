import React, { useState, useEffect, useRef } from 'react'

import Header from './Header'
import SubTitle from './SubTitle'
import Display from './Display'
import Result from './Result'

const PartTwo = ({ allnumbers }) => {
    const [resultTwo, setResultTwo] = useState(0)
    const [matchTwo, setMatchTwo] = useState([])

    const inputRef = useRef();
    
    useEffect(() => {
        const checkNumbersTwo = (numbers) => {
            for (let i = 0; i < numbers.length; i++) {
              for (let x = 0; x < numbers.length; x++) {
                for (let z = 0; z < numbers.length; z++) {
                  if (i !== x && i !== z && x !== z) {
                    const sum = numbers[i].number + numbers[x].number + numbers[z].number
                    if (sum === 2020) {
                      setResultTwo(numbers[i].number * numbers[x].number * numbers[z].number)
                      setMatchTwo([numbers[i].number, numbers[x].number, numbers[z].number])
                    }
                  }
                }
              }
            }
        }
        checkNumbersTwo(allnumbers)
    }, [allnumbers, inputRef])

    return (
        <div>
            <Header textH="Part 2" />
            <SubTitle textS="These three numbers sum up to 2020" />
            <Display numbers={matchTwo} />
            <SubTitle textS="These numbers multiplied are" />
            <Result result={resultTwo} />
        </div>
    )
}

export default PartTwo

