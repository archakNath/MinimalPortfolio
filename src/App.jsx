import React from 'react'
import { Route, Routes } from 'react-router'
import Landing from './pages/Landing'
import Blogs from './pages/Blogs'
import BlogPage from './pages/BlogPage'

const App = () => {
  return (
    <Routes>
      <Route index element={<Landing />} />
      <Route path='/blog' element={<Blogs />} />
      <Route path="/blog/:slug" element={<BlogPage />} />
    </Routes>
  )
}

export default App