import { gql } from '@apollo/client'

export const LOST_PASSWORD = gql`
mutation LostPassword($email: String!) {
    lostPassword(email: $email)
}
`

export const CREATE_FAMILY = gql`
    mutation CreateFamily($familyName: String!) {
        createFamily(familyName: $familyName)
    }
`

export const SIGN_UP = gql`
    mutation SignUp($username: String!, $email: String!, $password: String!, $userHash: String!) {
        signUp(username: $username, email: $email, password: $password, userHash: $userHash)
    }
`

export const RESET_PASSWORD = gql`
    mutation ResetPassword($password: String!, $userHash: String!) {
        resetPassword(password: $password, userHash: $userHash)
    }
`

export const SIGN_IN = gql`
    mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password)
    }
`