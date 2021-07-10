import React, { useState, useEffect, useRef } from 'react'

import Header from './Header'
import SubTitle from './SubTitle'
import Display from './Display'
import Result from './Result'

const PartOne = ({ allnumbers }) => {
    const [result, setResult] = useState(0)
    const [match, setMatch] = useState([])

    const inputRef = useRef();

    useEffect(() => {
        const checkNumbers = (numbers) => {
            for (let i = 0; i < numbers.length; i++) {
                for (let x = 0; x < numbers.length; x++) {
                    if (i !== x) {
                        const sum = numbers[i].number + numbers[x].number
                        if (sum === 2020) {
                            setResult(numbers[i].number * numbers[x].number)
                            setMatch([numbers[i].number, numbers[x].number])
                        }
                    }
                }
            }
        }
        checkNumbers(allnumbers)
    }, [allnumbers, inputRef])

    return (
        <div>
            <Header textH="Part 1"/>
            <SubTitle textS="These two numbers sum up to 2020" />
            <Display numbers={match} />
            <SubTitle textS="These numbers multiplied are" />
            <Result result={result} />
        </div>
    )
}

export default PartOne