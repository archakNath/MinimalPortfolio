import React from 'react'
import Header from '../components/Common/Header'
import HeaderImage from '../components/Landing/HeaderImage'
import Seperator from '../components/Common/Seperator'
import Profile from '../components/Landing/Profile'
import Details from '../components/Landing/Details'
import Socials from '../components/Landing/Socials'
import Heading from '../components/Landing/Heading'
import About from '../components/Landing/About'
import Stack from '../components/Landing/Stack'
import Blogs from '../components/Landing/Blogs'
import Experience from '../components/Landing/Experience'
import Projects from '../components/Landing/Projects'
import Certifications from '../components/Landing/Certifications'
import Footer from '../components/Common/Footer'

const Landing = () => {
    return (
        <>
            <Header />
            <HeaderImage />
            <Profile />
            <Seperator />
            <Details />
            <Socials />
            <div id="about">
                <About />
            </div>
            <Stack />
            <Blogs />
            <div id="experience">
                <Experience />
            </div>
            <div id="projects">
                <Projects />
            </div>
            <div id="certifications">
                <Certifications />
            </div>
            <Footer />
        </>
    )
}

export default Landing