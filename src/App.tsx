import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { useGetAnswers } from './api-hooks/useGetAnswers'
import { SideMenu } from './components'
import { APP_ROUTES } from './domain/routes'
import { FormView, TableView } from './views'

const App = () => {
    // The useGetAnswers hook will call the API and set the
    // answers in the store.
    // The return of this, and the other hooks, is never used directly.
    // Everything is handled by the store.
    useGetAnswers()

    return (
        <div id="app">
            <Router>
                <SideMenu routes={APP_ROUTES}>
                    <Routes>
                        <Route path={APP_ROUTES.FORM} element={<FormView />} />
                        <Route
                            path={APP_ROUTES.TABLE}
                            element={<TableView />}
                        />
                    </Routes>
                </SideMenu>
            </Router>
        </div>
    )
}

export default App
