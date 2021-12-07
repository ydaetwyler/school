import * as Yup from 'yup'

export const validateLostPassword = Yup.object({
    email: Yup.string()
        .max(40, 'Must be 40 characters or less')
        .required('Required')
        .email('Invalid email')
})

export const validateNewFamily = Yup.object({
    familyName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required')
        .matches(/^[aA-zZ\s]+$/, 'Only alphates are allowed')
})

export const validateNewUserAccess = Yup.object({
    email: Yup.string()
        .max(40, 'Must be 40 characters or less')
        .required('Required')
        .email('Invalid email'),
    username: Yup.string()
        .max(18, 'Must be 18 characters or less')
        .required('Required')
        .matches(/^[aA-zZ\s]+$/, 'Only alphates are allowed'),
    password: Yup.string()
        .max(50, 'Must be 50 characters or less')
        .min(8, 'Password has to be 8 characters or more')
        .required('Required')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must contain 8 characters or more, one uppercase, one lowercase, one number and one special case character"
        ),
    passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Password confirmation does not match')
})

export const validateResetPassword= Yup.object({
    password: Yup.string()
        .max(50, 'Must be 50 characters or less')
        .min(8, 'Password has to be 8 characters or more')
        .required('Required')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must contain 8 characters or more, one uppercase, one lowercase, one number and one special case character"
        ),
    passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Password confirmation does not match')
})

export const validateUserAccess = Yup.object({
    email: Yup.string()
        .required('Required')
        .email('Invalid email'),
    password: Yup.string()
        .required('Required')
})