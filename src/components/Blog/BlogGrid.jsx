import React, { useState, useEffect } from 'react'
import { ArrowRight, Search } from 'lucide-react'
import { NavLink } from 'react-router'
import blogUtils from '../../utils/blogUtils'

const BlogGrid = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [allBlogs, setAllBlogs] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadBlogs = async () => {
            const posts = await blogUtils.getAllPosts()
            setAllBlogs(posts)
            setLoading(false)
        }
        loadBlogs()
    }, [])

    // Filter blogs based on search query
    const filteredBlogs = allBlogs.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const totalBlogs = filteredBlogs.length

    // Format date to DD.MM.YYYY
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        return `${day}.${month}.${year}`
    }

    // Group blogs into rows of 2
    const rows = []
    for (let i = 0; i < filteredBlogs.length; i += 2) {
        rows.push(filteredBlogs.slice(i, i + 2))
    }

    // Check if the last row has only 1 blog (odd number)
    const isLastRowOdd = rows.length > 0 && rows[rows.length - 1].length === 1

    return (
        <>
            {/* Search Bar */}
            <div className='w-full border-b-2 border-dashed' style={{ borderColor: 'var(--border-color)' }} data-blogs>
                <div className='max-w-3xl border-l-2 border-r-2 border-dashed mx-auto' style={{ borderLeftColor: 'var(--border-color)', borderRightColor: 'var(--border-color)' }}>
                    <div className='px-3 py-4'>
                        <div className='flex items-center gap-2 border-2 rounded-lg px-3 py-2' style={{ borderColor: 'var(--border-color)' }}>
                            <Search className='w-4 h-4' style={{ color: 'var(--text-secondary)' }} />
                            <input
                                type="text"
                                placeholder="Search blogs..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className='w-full bg-transparent outline-none text-sm font-mono'
                                style={{ color: 'var(--text-primary)' }}
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className='p-0.5 rounded-md transition-all duration-200 hover:scale-110 cursor-pointer'
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {loading && (
                <div className='w-full h-[80vh] flex items-center justify-center'>
                    <p className='font-mono' style={{ color: 'var(--text-secondary)' }}>Loading blogs...</p>
                </div>
            )}

            {!loading && (
                <>
                    {/* No Blogs Case */}
                    {totalBlogs === 0 && (
                        <div className='w-full h-[80vh] border-b-2 border-dashed' data-blogs style={{ borderBottomColor: 'var(--border-color)' }}>
                            <div className='max-w-3xl h-full border-l-2 border-r-2 border-dashed mx-auto' style={{ borderLeftColor: 'var(--border-color)', borderRightColor: 'var(--border-color)' }}>
                                <div className='px-3 py-4'>
                                    <p className='font-mono' style={{ color: 'var(--text-secondary)' }}>
                                        {searchQuery ? `No blogs found matching "${searchQuery}"` : "No blog to show."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {totalBlogs > 0 && (
                        <div className='w-full border-b-2 border-dashed relative hidden md:block' style={{ borderBottomColor: 'var(--border-color)', borderTopColor: 'var(--border-color)' }}>
                            <div className='max-w-3xl mx-auto border-l-2 border-r-2 border-dashed relative' style={{ borderLeftColor: 'var(--border-color)', borderRightColor: 'var(--border-color)', height: '20px' }}>
                                <div className='w-[19px] h-full mx-auto border-l-2 border-r-2 border-dashed' style={{ borderLeftColor: 'var(--border-color)', borderRightColor: 'var(--border-color)' }}>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Blog Rows - Show all blogs */}
                    {totalBlogs > 0 && rows.map((row, rowIndex) => {
                        const isLastRow = rowIndex === rows.length - 1
                        const needsPlaceholder = isLastRow && isLastRowOdd

                        return (
                            <React.Fragment key={rowIndex}>
                                <div className='w-full border-dashed' style={{ borderBottomColor: 'var(--border-color)' }} data-blogs>
                                    <div className='max-w-3xl border-l-2 border-r-2 border-dashed mx-auto' style={{ borderLeftColor: 'var(--border-color)', borderRightColor: 'var(--border-color)' }}>
                                        <div className=''>
                                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                                {row.map((blog, colIndex) => (
                                                    <NavLink
                                                        key={blog.slug}
                                                        to={`/blog/${blog.slug}`}
                                                        className={`group p-4 transition-all duration-200 border-0 md:${colIndex === 0 ? 'border-r-2' : 'border-l-2'}
                                                    } border-dashed border-b-2 md:border-b-0`}
                                                        style={{
                                                            borderColor: 'var(--border-color)',
                                                        }}
                                                    >
                                                        {/* Blog Image */}
                                                        <div className='mb-4 overflow-hidden rounded-lg'>
                                                            <img
                                                                src={blog.image}
                                                                alt={blog.title}
                                                                className='w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105'
                                                            />
                                                        </div>

                                                        {/* Blog Title */}
                                                        <h3 className='text-lg md:text-xl font-mono font-bold mb-2 line-clamp-2' style={{ color: 'var(--text-primary)' }}>
                                                            {blog.title}
                                                        </h3>

                                                        {/* Blog Description */}
                                                        <p className='text-sm font-mono mb-3 line-clamp-2' style={{ color: 'var(--text-secondary)' }}>
                                                            {blog.description}
                                                        </p>

                                                        {/* Date */}
                                                        <div className='flex items-center gap-4 text-xs font-mono' style={{ color: 'var(--text-secondary)' }}>
                                                            <div className='flex items-center gap-1'>
                                                                <span>{formatDate(blog.date)}</span>
                                                            </div>
                                                        </div>
                                                    </NavLink>
                                                ))}

                                                {/* Placeholder for odd number of blogs in last row */}
                                                {needsPlaceholder && (
                                                    <div className='p-4 md:border-l-2 border-dashed border-b-2 md:border-b-0 flex flex-col items-center justify-center text-center'
                                                        style={{
                                                            borderColor: 'var(--border-color)'
                                                        }}
                                                    >
                                                        <div className='opacity-50'>
                                                            <p className='text-lg md:text-xl font-mono font-bold mb-2' style={{ color: 'var(--text-secondary)' }}>
                                                                More Blogs
                                                            </p>
                                                            <p className='text-sm font-mono' style={{ color: 'var(--text-secondary)' }}>
                                                                Coming Soon...
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {rowIndex < rows.length + 1 && (
                                    <div className='w-full border-b-2 border-t-2 border-dashed relative hidden md:block' style={{ borderBottomColor: 'var(--border-color)', borderTopColor: 'var(--border-color)' }}>
                                        <div className='max-w-3xl mx-auto border-l-2 border-r-2 border-dashed relative' style={{ borderLeftColor: 'var(--border-color)', borderRightColor: 'var(--border-color)', height: '20px' }}>
                                            <div className='w-[19px] h-full mx-auto border-l-2 border-r-2 border-dashed' style={{ borderLeftColor: 'var(--border-color)', borderRightColor: 'var(--border-color)' }}>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </React.Fragment>
                        )
                    })}
                </>
            )}
        </>
    )
}

export default BlogGrid