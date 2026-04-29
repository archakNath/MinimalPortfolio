import React from 'react'
import { Route, Routes } from 'react-router'
import Landing from './pages/Landing'
import Blogs from './pages/Blogs'
import BlogAdmin from './pages/BlogAdmin'
import BlogPage from './pages/BlogPage'

// Add this import - MUST be before any component that uses code highlighting
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css' // or any theme you prefer
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-typescript'

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