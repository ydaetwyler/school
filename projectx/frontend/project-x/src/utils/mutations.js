import { gql } from '@apollo/client'

const LOST_PASSWORD = gql`
mutation LostPassword($email: String!) {
    lostPassword(email: $email)
}
`

const CREATE_FAMILY = gql`
    mutation CreateFamily($familyName: String!) {
        createFamily(familyName: $familyName)
    }
`

const SIGN_UP = gql`
    mutation SignUp($username: String!, $email: String!, $password: String!, $userHash: String!) {
        signUp(username: $username, email: $email, password: $password, userHash: $userHash)
    }
`

const RESET_PASSWORD = gql`
    mutation ResetPassword($password: String!, $userHash: String!) {
        resetPassword(password: $password, userHash: $userHash)
    }
`

const SIGN_IN = gql`
    mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password)
    }
`

export default { LOST_PASSWORD, CREATE_FAMILY, SIGN_UP, RESET_PASSWORD, SIGN_IN }