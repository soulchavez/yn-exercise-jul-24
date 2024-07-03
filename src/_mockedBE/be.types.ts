export type ApiOption = {
    [key: number]: {
        checked: boolean
        label: string
    }
}

export type ApiOptions = Array<ApiOption>

export type ApiAnswers = {
    username: string
    email: string
    age: string
    interests: ApiOptions
}
