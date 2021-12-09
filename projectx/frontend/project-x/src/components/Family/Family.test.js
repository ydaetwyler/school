import React from 'react'
import { render, screen,waitFor } from "@testing-library/react"
import { MockedProvider } from '@apollo/client/testing'
import { gql } from '@apollo/client'

import '@testing-library/jest-dom'

import Family from './Family'

export const GET_FAMILY = gql`
    query GetFamily {
        getFamily {
            familyName
        }
    }
`

const mocksSuccess = [
    {
        request: {
            query: GET_FAMILY,
        },
        result: {
            data: {
                getFamily: {
                    familyName: "FeuersteinForever"
                }
            }
        }
    }
]

test('Family render/success', async () => {
    render(
        <MockedProvider mocks={mocksSuccess} addTypename={false}>
            <Family />
        </MockedProvider>
    )
    
    await waitFor(() =>new Promise(resolve => setTimeout(resolve, 0)))

    // verify to be on Family Board page
    expect(screen.getByText(/Family Board/i)).toBeInTheDocument()

    // verify the family is loaded
    expect(screen.getByText(/FeuersteinForever/i)).toBeInTheDocument()
})