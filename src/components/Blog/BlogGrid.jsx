import React, { useState } from 'react'
import { ArrowRight, Search } from 'lucide-react'
import { NavLink } from 'react-router'

const BlogGrid = () => {
    const [searchQuery, setSearchQuery] = useState('')

    const allBlogs = [
        {
            title: "Building a Component Library with React and Tailwind",
            description: "Learn how to create a reusable component library that scales across multiple projects.",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
            date: "2025-04-15",
            slug: "building-component-library"
        },
        {
            title: "Mastering TypeScript: Advanced Patterns",
            description: "Deep dive into advanced TypeScript patterns for better type safety and developer experience.",
            image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=400&fit=crop",
            date: "2025-04-10",
            slug: "mastering-typescript"
        },
        {
            title: "The Art of Pixel-Perfect Design Implementation",
            description: "Tips and tricks for implementing designs with precision and attention to detail.",
            image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&h=400&fit=crop",
            date: "2025-04-05",
            slug: "pixel-perfect-design"
        },
        {
            title: "Optimizing Next.js Applications for Performance",
            description: "Techniques to improve loading times and overall performance in Next.js apps.",
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
            date: "2025-03-28",
            slug: "optimizing-nextjs"
        },
        {
            title: "Another Blog Post",
            description: "This is an extra blog post that won't be shown.",
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
            date: "2025-03-20",
            slug: "another-blog"
        }
    ]

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
                                                className={`group p-4 transition-all duration-200 ${colIndex === 0 ? 'border-r-2' : 'border-l-2'}
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
                                            <div className='p-4 border-l-2 border-dashed border-b-2 md:border-b-0 flex flex-col items-center justify-center text-center'
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
    )
}

export default BlogGrid