import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App/App'
import { Providers } from './App/providers'
import '../globals.css'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
    <Providers>
        <App />
    </Providers>
)