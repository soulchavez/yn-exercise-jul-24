import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'

import App from './App'
import './index.css'

const queryClient = new QueryClient()

const rootElement = document.getElementById('root')

if (!rootElement) {
    throw new Error('Root element not found')
}

const root = ReactDOM.createRoot(rootElement)

root.render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>,
)
