import React from 'react'
import ReactDOM from 'react-dom/client'
import { hydrateRoot } from 'react-dom/client'
import { App } from './App/App'
import { Providers } from './App/providers'
import '../globals.css'

hydrateRoot(
    document.getElementById('app') as HTMLElement,
    <Providers>
        <App />
    </Providers>
)