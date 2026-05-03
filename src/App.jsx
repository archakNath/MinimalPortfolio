import React from 'react'
import { Route, Routes } from 'react-router'
import Landing from './pages/Landing'
import Blogs from './pages/Blogs'
import BlogPage from './pages/BlogPage'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <Routes>
      <Route index element={<Landing />} />
      <Route path='/blog' element={<Blogs />} />
      <Route path="/blog/:slug" element={<BlogPage />} />
      <Route path='*' element={<NotFound/>} />
    </Routes>
  )
}

export default App