import React from 'react'
import { act, render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from "history"
import { Link, BrowserRouter } from 'react-router-dom'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import dotenv from 'dotenv'



import '@testing-library/jest-dom'

import Login from './Login'

import { expect } from '@jest/globals'

dotenv.config()
const baseUrl = process.env.REACT_APP_BASE_URL

const client = new ApolloClient({
    uri: baseUrl,
    cache: new InMemoryCache()
})

/*
// Simulate links to test routes without link
const TestLinks = () => (
    <BrowserRouter>
        <Link to="/">HOME Testlink</Link>
        <Link to="/login/V1StGXR8_Z5jdHi6B-myT">NUACCESS Testlink</Link>
        <Link to="/reset/V1StGXR8_Z5jdHi6B-myT">PWRESET Testlink</Link>
    </BrowserRouter>
)
*/


const leftClick = { button: 0 }

test('Login rendering/navigating links', () => {
    render(
        <ApolloProvider client={client}>
            <Login />
        </ApolloProvider>
    )

    // verify to be on login page
    expect(screen.getByText(/Login/i)).toBeInTheDocument()

    // Check lost password click
    userEvent.click(screen.getByText(/Lost Password/i), leftClick)
    
    expect(screen.getByText(/Reset password/i)).toBeInTheDocument()

    // Check create new family click
    userEvent.click(screen.getByText(/Create new family/i), leftClick)
    
    expect(screen.getByText(/Start family/i)).toBeInTheDocument()
})

/*
test('Login/navigating non-links', () => {
    render(
        <ApolloProvider client={client}>
            <Login />
            <TestLinks />
        </ApolloProvider>
    )

    // Go to login root first
    userEvent.click(screen.getByText(/HOME Testlink/i), leftClick)

    // Check new user access hash url
    userEvent.click(screen.getByText(/NUACCESS Testlink/i), leftClick)

    expect(screen.getByText(/Join family/i)).toBeInTheDocument()
    
    // Go to login root first
    userEvent.click(screen.getByText(/HOME Testlink/i), leftClick)

    // Check reset password hash url
    userEvent.click(screen.getByText(/PWRESET Testlink/i), leftClick)
    
    expect(screen.getByText(/Reset Password/i)).toBeInTheDocument()
})
*/