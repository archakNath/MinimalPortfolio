import React from 'react'
import Header from './components/Header'
import HeaderImage from './components/HeaderImage'
import Seperator from './components/Seperator'
import Profile from './components/Profile'
import Details from './components/Details'
import Socials from './components/Socials'
import Heading from './components/Heading'
import About from './components/About'
import Stack from './components/Stack'
import Blogs from './components/Blogs'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Footer from './components/Footer'

const App = () => {
  return (
    <>
    <Header/>
    <HeaderImage/>
    <Profile/>
    <Seperator/>
    <Details/>
    <Socials/>
    <Heading title="About"/>
    <About/>
    <Heading title="Stack"/>
    <Stack/>
    <Heading title="Blog"/>
    <Blogs/>
    <Heading title="Experience"/>
    <Experience/>
    <Heading title="Projects"/>
    <Projects/>
    <Heading title="Certifications"/>
    <Certifications/>
    <Footer/>
    </>
  )
}

export default App