import React from 'react'
import { Route, Routes } from 'react-router'
import Landing from './pages/Landing'
import Blogs from './pages/Blogs'

const App = () => {
  return (
    <Routes>
      <Route index element={<Landing/>} />
      <Route path='/blog' element={<Blogs/>} />
    </Routes>
  )
}

export default App