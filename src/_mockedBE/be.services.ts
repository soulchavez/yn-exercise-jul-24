import chalk from 'chalk'
import { cloneDeep, delay } from 'lodash'

import type { ApiAnswers, ApiOption } from './be.types'

const SIMULATED_DELAY = 1500

const delayExecution = (delayTime: number) =>
    new Promise(resolve => delay(resolve, delayTime))

const logDBStatus = () => {
    console.log(chalk.bgGreen.black('mocked-db:'), mockDB)
}

const initialState: ApiAnswers = {
    username: '',
    email: '',
    age: '',
    interests: [
        { 23213: { checked: false, label: 'React' } },
        { 12345: { checked: false, label: 'Angular' } },
        { 67890: { checked: false, label: 'Vue' } },
        { 54321: { checked: false, label: 'Svelte' } },
        { 98765: { checked: false, label: 'htmx' } },
    ],
}

let mockDB = cloneDeep(initialState)

type UpdateAnswerProps = {
    answerName: keyof ApiAnswers
    answerValue: string | Array<ApiOption>
}

type ApiResponse<T> = { status: number; data: T }

export const updateSingleAnswer = async ({
    answerName,
    answerValue,
}: UpdateAnswerProps): Promise<
    ApiResponse<{ [key: string]: string | Array<ApiOption> }>
> => {
    await delayExecution(SIMULATED_DELAY)
    mockDB = {
        ...mockDB,
        [answerName]: cloneDeep(answerValue),
    }
    logDBStatus()
    return { status: 200, data: { [answerName]: cloneDeep(answerValue) } }
}

export const updateAnswers = async (
    answers: ApiAnswers,
): Promise<ApiResponse<ApiAnswers>> => {
    await delayExecution(SIMULATED_DELAY)
    const clonedAnswers = cloneDeep(answers)
    mockDB = { ...mockDB, ...clonedAnswers }
    logDBStatus()
    return { status: 200, data: cloneDeep(mockDB) }
}

export const getAnswers = async (): Promise<ApiResponse<ApiAnswers>> => {
    await delayExecution(SIMULATED_DELAY)
    logDBStatus()
    return { status: 200, data: cloneDeep(mockDB) }
}

export const resetAnswers = async (): Promise<ApiResponse<ApiAnswers>> => {
    await delayExecution(SIMULATED_DELAY)
    mockDB = cloneDeep(initialState)
    logDBStatus()
    return { status: 200, data: cloneDeep(mockDB) }
}
