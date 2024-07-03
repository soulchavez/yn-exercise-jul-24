import { useQuery } from 'react-query'

import { getAnswersFromApi } from '../api/api'
import { apiToDomainAnswersConverter } from '../api/converters'
import { useAnswersStore } from '../state'

export const useGetAnswers = () => {
    const setAnswers = useAnswersStore(state => state.setAnswers)
    return useQuery('get answers from api', {
        retry: false,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        queryFn: getAnswersFromApi,
        onSuccess: ({ data }) => {
            const result = apiToDomainAnswersConverter(data)
            setAnswers(result)
        },
    })
}
