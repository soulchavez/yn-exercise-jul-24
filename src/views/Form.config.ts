import { object, string, array } from 'yup'

import { DomainOption } from '../domain/types'

const IS_REQUIRED_MSG = 'This field is required'
const IS_NUMBER_MSG = 'This field must be a number'
const IS_EMAIL_MSG = 'This field must be a valid email'
const MIN_WORDS_MSG = (minWords: number) =>
    `At least ${minWords} words are required`
const MAX_WORDS_MSG = (maxLength: number) =>
    `At most ${maxLength} words are allowed`
const NAME_MIN_WORDS = 2
const NAME_MAX_WORDS = 4
const AGE_MAX = 99
const AGE_MIN = 18
const AGE_MIN_MSG = (minAge: number) =>
    `You should be at least ${minAge} years old.`
const AGE_MAX_MSG = (maxAge: number) => `You cannot be over ${maxAge}`
const INTEREST_MSG = 'Please select at least one interest.'

// TASK 1:
// - Implement additional validations for the age field.
// - The minimum age should be 18 and the maximum age should be 99.
// - Each validation should have a corresponding error message.

export const validationSchema = object().shape({
    name: string()
        .required(IS_REQUIRED_MSG)
        .test('hasMaxWords', MAX_WORDS_MSG(NAME_MAX_WORDS), value => {
            const wordCount = (value?.match(/\S+/g) || []).length
            return wordCount <= NAME_MAX_WORDS
        })
        .test('hasMinWords', MIN_WORDS_MSG(NAME_MIN_WORDS), value => {
            const wordCount = (value?.match(/\S+/g) || []).length
            return wordCount >= NAME_MIN_WORDS
        }),
    mail: string().required(IS_REQUIRED_MSG).email(IS_EMAIL_MSG),
    age: string()
        .required(IS_REQUIRED_MSG)
        .test(
            'isNumber',
            IS_NUMBER_MSG,
            (value: string) => !isNaN(Number(value)),
        )
        .test(
            'minAge',
            AGE_MIN_MSG(AGE_MIN),
            (value: string) => Number(value) >= AGE_MIN,
        )
        .test(
            'maxAge',
            AGE_MAX_MSG(AGE_MAX),
            (value: string) => Number(value) <= AGE_MAX,
        ),
    // TASK 3:
    // - Implement a validation rule for the 'interests' field.
    // - The validation should ensure that at least one option is selected.
    // - If no option is selected, display an error message.
    interests: array()
        .required()
        .test('oneSelected', INTEREST_MSG, value => {
            const val = value as Array<DomainOption>
            return (
                val.filter(
                    el => el[Number(Object.keys(el)[0])].isChecked === true,
                ).length > 0
            )
        }),
})
