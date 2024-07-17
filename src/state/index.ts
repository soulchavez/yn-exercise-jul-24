import { StateCreator, create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { DomainAnswers } from '../domain/types'

type AnswersStoreProperties = DomainAnswers

type AnswersStoreActions = {
    setAnswers: (answers: DomainAnswers) => void
    getAnswers: () => DomainAnswers
}

type UIState = {
    loading: boolean
    setLoading: (loading: boolean) => void
}

export type AnswersStore = AnswersStoreProperties &
    AnswersStoreActions &
    UIState

const initialState: AnswersStoreProperties = {
    name: '',
    mail: '',
    age: '',
    interests: [],
}

const createStore: StateCreator<AnswersStore> = (set, get) => ({
    ...initialState,
    setAnswers: answers => set(state => ({ ...state, ...answers })),
    getAnswers: () => ({
        age: get().age,
        name: get().name,
        mail: get().mail,
        interests: get().interests,
    }),
    loading: false,
    setLoading: loading => set(state => ({ ...state, loading })),
})

export const useAnswersStore = create(devtools(createStore))
