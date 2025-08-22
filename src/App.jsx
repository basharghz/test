import React from 'react'
import { DynamicRouter, ErrorBoundary } from './twaa-renderer'

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <DynamicRouter />
      </div>
    </ErrorBoundary>
  )
}

export default App
