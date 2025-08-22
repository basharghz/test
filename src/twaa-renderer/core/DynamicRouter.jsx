import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DynamicPage from './DynamicPage'

const DynamicRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<DynamicPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default DynamicRouter
