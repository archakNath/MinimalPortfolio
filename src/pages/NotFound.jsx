import React from 'react'
import { Link } from 'react-router'
import { Home, AlertCircle } from 'lucide-react'
import Footer from '../components/Common/Footer'
import Header from '../components/Common/Header'

const NotFound = () => {
    return (
        <>
            <Header />
            <div className='w-full border-b-2 border-dashed' style={{ borderBottomColor: 'var(--border-color)' }} data-notfound>
                <div className='max-w-3xl mx-auto border-l-2 border-r-2 border-dashed' style={{ borderLeftColor: 'var(--border-color)', borderRightColor: 'var(--border-color)' }}>

                    {/* Header section - similar to Profile component structure */}
                    <div className='flex items-center justify-center p-8 border-b-2 border-dashed' style={{ borderBottomColor: 'var(--border-color)' }}>
                        <div className='text-center'>
                            <div className='flex justify-center mb-4'>
                                <AlertCircle className='w-20 h-20 md:w-24 md:h-24' style={{ color: 'var(--text-secondary)' }} />
                            </div>
                            <h1 className='text-6xl md:text-8xl font-bold font-mono mb-2' style={{ color: 'var(--text-primary)' }}>
                                404
                            </h1>
                            <p className='text-xl md:text-2xl font-mono mb-2' style={{ color: 'var(--text-secondary)' }}>
                                Page Not Found
                            </p>
                        </div>
                    </div>

                    {/* Main content area */}
                    <div className='p-6 border-b-2 border-dashed' style={{ borderBottomColor: 'var(--border-color)' }}>
                        <div className='text-center space-y-4'>
                            <p className='font-mono' style={{ color: 'var(--text-secondary)' }}>
                                Oops! The page you're looking for doesn't exist or has been moved.
                            </p>

                            <p className='font-mono text-sm' style={{ color: 'var(--text-secondary)' }}>
                                Check the URL for typos or navigate back to the homepage.
                            </p>

                            <div className='pt-4'>
                                <Link
                                    to="/"
                                    className='inline-flex items-center gap-2 px-6 py-3 font-mono rounded-md transition-colors cursor-pointer'
                                    style={{
                                        backgroundColor: 'var(--border-color)',
                                        color: 'var(--text-primary)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'var(--text-secondary)'
                                        e.currentTarget.style.color = 'var(--bg-primary)'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'var(--border-color)'
                                        e.currentTarget.style.color = 'var(--text-primary)'
                                    }}
                                >
                                    <Home className='w-4 h-4' />
                                    Back to Home
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Optional: Suggestions section */}
                    <div className='p-6'>
                        <div className='space-y-3'>
                            <h3 className='font-mono font-semibold text-sm tracking-wider' style={{ color: 'var(--text-primary)' }}>
                                SUGGESTIONS:
                            </h3>
                            <ul className='space-y-2 font-mono text-sm' style={{ color: 'var(--text-secondary)' }}>
                                <li>• Go to the <Link to="/blog" className='underline hover:opacity-70 transition-opacity' style={{ color: 'var(--text-primary)' }}>blog page</Link> to read our latest posts</li>
                                <li>• Return to the <Link to="/" className='underline hover:opacity-70 transition-opacity' style={{ color: 'var(--text-primary)' }}>homepage</Link></li>
                                <li>• Check if the blog post slug is correct</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default NotFound