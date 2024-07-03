import { useMutation } from 'react-query'

import { updateAnswersFromApi } from '../api/api'
import {
    apiToDomainAnswersConverter,
    domainToApiAnswersConverter,
} from '../api/converters'
import { DomainAnswers } from '../domain/types'
import { useAnswersStore } from '../state'

export const useUpdateAnswers = () => {
    const setAnswers = useAnswersStore(state => state.setAnswers)
    return useMutation({
        mutationFn: async (newAnswers: DomainAnswers) => {
            const convertedNewAnswers = domainToApiAnswersConverter(newAnswers)
            return await updateAnswersFromApi(convertedNewAnswers)
        },
        onSuccess: ({ data }) => {
            const result = apiToDomainAnswersConverter(data)
            setAnswers(result)
        },
    })
}
