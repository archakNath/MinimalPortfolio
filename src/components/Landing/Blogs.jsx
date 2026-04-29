import React, { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import Heading from './Heading'
import { NavLink, Link } from 'react-router'
import blogUtils from '../../utils/blogUtils'

const Blogs = () => {

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

    // Handle different cases based on number of blogs
    const totalBlogs = allBlogs.length

    let blogsToShow = []
    let hasMoreBlogs = false

    if (totalBlogs === 0) {
        // No blogs case
        blogsToShow = []
        hasMoreBlogs = false
    } else if (totalBlogs === 3) {
        // If 3 blogs, show only 2 (first 2)
        blogsToShow = allBlogs.slice(0, 2)
        hasMoreBlogs = true
    } else {
        // For 2, 4, or more blogs, show up to 4 blogs
        blogsToShow = allBlogs.slice(0, 4)
        hasMoreBlogs = totalBlogs > 4
    }

    // Format date to DD.MM.YYYY
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        return `${day}.${month}.${year}`
    }
    if (loading) {
        return (
            <>
                <Heading title="Blog" count={0} />
                <div className='w-full border-dashed' data-blogs>
                    <div className='max-w-3xl border-l-2 border-r-2 border-dashed mx-auto' style={{ borderLeftColor: 'var(--border-color)', borderRightColor: 'var(--border-color)' }}>
                        <div className='py-12 text-center'>
                            <p className='font-mono' style={{ color: 'var(--text-secondary)' }}>
                                Loading blogs...
                            </p>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    // Spacing Component (inline)
    const Spacing = () => (
        <div className='w-full border-b-2 border-t-2 border-dashed relative hidden md:block' style={{ borderBottomColor: 'var(--border-color)', borderTopColor: 'var(--border-color)' }}>
            <div className='max-w-3xl mx-auto border-l-2 border-r-2 border-dashed relative' style={{ borderLeftColor: 'var(--border-color)', borderRightColor: 'var(--border-color)', height: '20px' }}>
                <div className='w-[19px] h-full mx-auto border-l-2 border-r-2 border-dashed' style={{ borderLeftColor: 'var(--border-color)', borderRightColor: 'var(--border-color)' }}>
                </div>
            </div>
        </div>
    )

    // Group blogs into rows of 2
    const rows = []
    for (let i = 0; i < blogsToShow.length; i += 2) {
        rows.push(blogsToShow.slice(i, i + 2))
    }

    return (
        <>
            <Heading title="Blog" count={totalBlogs} />

            {/* No Blogs Case */}
            {totalBlogs === 0 && (
                <div className='w-full border-dashed' data-blogs>
                    <div className='max-w-3xl border-l-2 border-r-2 border-dashed mx-auto' style={{ borderLeftColor: 'var(--border-color)', borderRightColor: 'var(--border-color)' }}>
                        <div className='py-12 text-center'>
                            <p className='font-mono' style={{ color: 'var(--text-secondary)' }}>
                                No blog posts yet. Coming soon!
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Blog Rows - Only show if there are blogs to display */}
            {blogsToShow.length > 0 && rows.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                    <div className='w-full border-dashed' style={{ borderBottomColor: 'var(--border-color)' }} data-blogs>
                        <div className='max-w-3xl border-l-2 border-r-2 border-dashed mx-auto' style={{ borderLeftColor: 'var(--border-color)', borderRightColor: 'var(--border-color)' }}>
                            <div className=''>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    {row.map((blog, colIndex) => (
                                        <Link
                                            key={blog.slug}
                                            to={`/blog/${blog.slug}`}
                                            className={`group p-4 transition-all duration-200 md:${colIndex === 0 ? 'border-r-2' : 'border-l-2'}
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
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {rowIndex < rows.length - 1 && <Spacing />}
                </React.Fragment>
            ))}

            {/* View All Blogs Button - Show when there are more blogs to see */}
            {hasMoreBlogs && (
                <div className='w-full border-b-2 md:border-t-2 border-dashed relative' style={{ borderBottomColor: 'var(--border-color)', borderTopColor: 'var(--border-color)' }}>
                    <div className='max-w-3xl mx-auto border-l-2 border-r-2 py-3 border-dashed relative' style={{ borderLeftColor: 'var(--border-color)', borderRightColor: 'var(--border-color)' }}>
                        <div className='text-center'>
                            <NavLink
                                to="/blog"
                                className='inline-flex items-center gap-2 px-3 py-1 rounded-lg font-mono text-sm transition-all duration-200 hover:gap-3 hover:translate-y-[-2px]'
                                style={{
                                    backgroundColor: 'var(--bg-secondary)',
                                    border: '1px solid var(--border-color)',
                                    color: 'var(--text-primary)'
                                }}
                            >
                                <span>View All Blogs</span>
                                <ArrowRight className='w-4 h-4' />
                            </NavLink>
                        </div>
                    </div>
                </div>
            )}

            {blogsToShow.length <3 && (
                <div className='w-full border-b-2 border-dashed relative hidden md:block' style={{ borderBottomColor: 'var(--border-color)', borderTopColor: 'var(--border-color)' }}>
                </div>
            )}
        </>
    )
}

export default Blogs