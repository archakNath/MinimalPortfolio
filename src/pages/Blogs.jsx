import React from 'react'
import Header from '../components/Common/Header'
import Footer from '../components/Common/Footer'
import PageHeading from '../components/Blog/PageHeading'
import BlogGrid from '../components/Blog/BlogGrid'

const Blogs = () => {
    return (
        <>
            <Header />
            <PageHeading />
            <BlogGrid />
            <Footer />
        </>
    )
}

export default Blogs