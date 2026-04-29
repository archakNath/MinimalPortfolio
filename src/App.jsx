import React from 'react'
import { Route, Routes } from 'react-router'
import Landing from './pages/Landing'
import Blogs from './pages/Blogs'
import BlogAdmin from './pages/BlogAdmin'
import BlogPage from './pages/BlogPage'

const App = () => {
  return (
    <Routes>
      <Route index element={<Landing />} />
      <Route path='/blog' element={<Blogs />} />
      <Route path='/admin' element={<BlogAdmin />} />
      <Route path="/blog/:slug" element={<BlogPage />} />
    </Routes>
  )
}

export default App