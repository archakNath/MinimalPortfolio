import React from 'react'
import { ArrowRight } from 'lucide-react'
import Heading from './Heading'
import { NavLink } from 'react-router'

const Blogs = () => {
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

    // Handle different cases based on number of blogs
    const totalBlogs = allBlogs.length
    
    let blogsToShow = []
    let hasMoreBlogs = false
    
    if (totalBlogs === 0) {
        // No blogs case
        blogsToShow = []
        hasMoreBlogs = false
    } else if (totalBlogs === 1) {
        // If only 1 blog, don't show any, just show "View All" button
        blogsToShow = []
        hasMoreBlogs = true
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
                                        <a
                                            key={blog.slug}
                                            href={`/blog/${blog.slug}`}
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
                                        </a>
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
        </>
    )
}

export default Blogs