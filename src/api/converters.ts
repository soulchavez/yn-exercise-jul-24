import { DomainAnswers, DomainOption } from '../domain/types'

import { ApiAnswers, ApiOption } from './api'

export const apiToDomainAnswersConverter = (
    apiAnswers: ApiAnswers,
): DomainAnswers => ({
    name: apiAnswers.username,
    mail: apiAnswers.email,
    age: apiAnswers.age,
    interests: apiAnswers.interests.map((apiOption: ApiOption) =>
        Object.keys(apiOption).reduce((acc: DomainOption, key: string) => {
            acc[parseInt(key)] = {
                isChecked: apiOption[parseInt(key)].checked,
                label: apiOption[parseInt(key)].label,
            }
            return acc
        }, {}),
    ),
})

export const domainToApiAnswersConverter = (
    domainAnswer: DomainAnswers,
): ApiAnswers => ({
    username: domainAnswer.name,
    email: domainAnswer.mail,
    age: domainAnswer.age,
    interests: domainAnswer.interests.map((domainOption: DomainOption) =>
        Object.keys(domainOption).reduce((acc: ApiOption, key: string) => {
            acc[parseInt(key)] = {
                checked: domainOption[parseInt(key)].isChecked,
                label: domainOption[parseInt(key)].label,
            }
            return acc
        }, {}),
    ),
})
