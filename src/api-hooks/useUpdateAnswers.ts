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
    const setLoading = useAnswersStore(state => state.setLoading)
    return useMutation({
        mutationFn: async (newAnswers: DomainAnswers) => {
            setLoading(true)
            const convertedNewAnswers = domainToApiAnswersConverter(newAnswers)
            return await updateAnswersFromApi(convertedNewAnswers)
        },
        onSuccess: ({ data }) => {
            const result = apiToDomainAnswersConverter(data)
            setAnswers(result)
            setLoading(false)
        },
    })
}
