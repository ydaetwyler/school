import React from 'react'
import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
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