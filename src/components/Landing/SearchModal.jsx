import React, { useState, useEffect, useRef } from 'react'
import { Search, Home, BookOpen, Briefcase, Award, User, Calendar, Tag as TagIcon } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router'
import blogUtils from '../../utils/blogUtils'  // Static import instead of dynamic

const SearchItem = ({ item, index, selectedIndex, setSelectedIndex, itemRefs, handleItemClick }) => {
    const Icon = item.icon
    
    return (
        <div
            ref={el => itemRefs.current[index] = el}
            onClick={() => handleItemClick(item)}
            onMouseEnter={() => setSelectedIndex(index)}
            className='flex items-center justify-between p-3 cursor-pointer transition-colors border-b border-dashed'
            style={{
                borderBottomColor: 'var(--border-color)',
                backgroundColor: index === selectedIndex
                    ? (document.documentElement.getAttribute('data-theme') === 'dark' ? '#3f3f46' : '#e5e7eb')
                    : 'transparent',
                borderLeft: index === selectedIndex ? '3px solid #3b82f6' : '3px solid transparent',
            }}
        >
            <div className='flex items-start gap-3 flex-1 min-w-0'>
                <Icon className='w-4 h-4 flex-shrink-0 mt-0.5' style={{ color: 'var(--text-secondary)' }} />
                <div className='flex flex-col flex-1 min-w-0'>
                    <div className='flex items-center gap-2 flex-wrap'>
                        <span className='font-mono font-semibold' style={{
                            color: 'var(--text-primary)',
                            fontWeight: index === selectedIndex ? '700' : '600'
                        }}>
                            {item.name}
                        </span>
                        {item.type === 'blog' && item.tags && item.tags.length > 0 && (
                            <div className='flex gap-1 flex-shrink-0'>
                                {item.tags.slice(0, 2).map(tag => (
                                    <span key={tag} className='text-xs px-1.5 py-0.5 rounded flex items-center gap-0.5' style={{
                                        backgroundColor: index === selectedIndex
                                            ? (document.documentElement.getAttribute('data-theme') === 'dark' ? '#52525b' : '#d1d5db')
                                            : 'var(--bg-secondary)',
                                        color: 'var(--text-secondary)'
                                    }}>
                                        <TagIcon className='w-3 h-3' />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                    <span className='text-xs font-mono mt-0.5 line-clamp-2' style={{ color: 'var(--text-secondary)' }}>
                        {item.description}
                    </span>
                    {item.type === 'blog' && item.date && (
                        <div className='flex items-center gap-1 text-xs font-mono mt-1 opacity-60' style={{ color: 'var(--text-secondary)' }}>
                            <Calendar className='w-3 h-3' />
                            <span>{new Date(item.date).toLocaleDateString()}</span>
                        </div>
                    )}
                </div>
            </div>
            {item.type !== 'blog' && (
                <span className='text-xs font-mono px-2 py-1 rounded ml-2 flex-shrink-0' style={{
                    backgroundColor: index === selectedIndex
                        ? (document.documentElement.getAttribute('data-theme') === 'dark' ? '#52525b' : '#d1d5db')
                        : 'var(--bg-secondary)',
                    color: 'var(--text-secondary)',
                    border: `1px solid ${index === selectedIndex ? '#3b82f6' : 'var(--border-color)'}`,
                }}>
                    {item.command}
                </span>
            )}
        </div>
    )
}

const SearchModal = ({ isOpen, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [blogPosts, setBlogPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const modalRef = useRef(null)
    const inputRef = useRef(null)
    const listRef = useRef(null)
    const itemRefs = useRef([])
    const navigate = useNavigate()
    const location = useLocation()

    // Menu items
    const menuItems = [
        { id: 'home', name: "Home", command: "/", description: "Return to home page", icon: Home, type: 'menu' },
        { id: 'blog', name: "Blog", command: "/blog", description: "Read my latest articles", icon: BookOpen, type: 'menu' },
    ]

    // Portfolio items
    const portfolioItems = [
        { id: 'projects', name: "Projects", command: "#projects", description: "View all my projects", icon: Briefcase, type: 'portfolio', isHash: true },
        { id: 'experience', name: "Experience", command: "#experience", description: "Check my work experience", icon: Briefcase, type: 'portfolio', isHash: true },
        { id: 'certifications', name: "Certifications", command: "#certifications", description: "View my certifications", icon: Award, type: 'portfolio', isHash: true },
        { id: 'about', name: "About", command: "#about", description: "Learn more about me", icon: User, type: 'portfolio', isHash: true },
    ]

    // Load blog posts dynamically on mount and when modal opens
    useEffect(() => {
        const loadBlogPosts = async () => {
            if (!isOpen) return
            setIsLoading(true)
            try {
                const posts = await blogUtils.getAllPosts()
                const blogItems = posts.map(post => ({
                    id: `blog-${post.slug}`,
                    name: post.title,
                    slug: post.slug,
                    description: post.excerpt || `Read blog post: ${post.title}`,
                    icon: BookOpen,
                    type: 'blog',
                    date: post.date,
                    tags: post.tags
                }))
                setBlogPosts(blogItems)
            } catch (error) {
                console.error('Failed to load blog posts:', error)
                setBlogPosts([])
            } finally {
                setIsLoading(false)
            }
        }
        
        loadBlogPosts()
    }, [isOpen])

    // Filter items based on search query
    const filterItems = (items) => {
        if (!searchQuery) return items
        return items.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
        )
    }

    const filteredMenu = filterItems(menuItems)
    const filteredPortfolio = filterItems(portfolioItems)
    const filteredBlogs = filterItems(blogPosts)

    const hasResults = filteredMenu.length > 0 || filteredPortfolio.length > 0 || filteredBlogs.length > 0
    const totalItems = filteredMenu.length + filteredPortfolio.length + filteredBlogs.length

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus()
            setSelectedIndex(0)
        }
    }, [isOpen])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault()
                    setSelectedIndex(prev => {
                        if (prev < totalItems - 1) {
                            return prev + 1
                        }
                        return prev
                    })
                    break
                case 'ArrowUp':
                    e.preventDefault()
                    setSelectedIndex(prev => {
                        if (prev > 0) {
                            return prev - 1
                        }
                        return prev
                    })
                    break
                case 'Enter':
                    e.preventDefault()
                    const selectedItem = getItemAtIndex(selectedIndex)
                    if (selectedItem) {
                        handleItemClick(selectedItem)
                    }
                    break
                case 'Escape':
                    e.preventDefault()
                    onClose()
                    break
                default:
                    break
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, totalItems, selectedIndex])

    // Get item by flat index
    const getItemAtIndex = (index) => {
        let currentIndex = 0
        
        if (index < filteredMenu.length) {
            return filteredMenu[index]
        }
        currentIndex += filteredMenu.length
        
        if (index < currentIndex + filteredPortfolio.length) {
            return filteredPortfolio[index - currentIndex]
        }
        currentIndex += filteredPortfolio.length
        
        if (index < currentIndex + filteredBlogs.length) {
            return filteredBlogs[index - currentIndex]
        }
        
        return null
    }

    // Scroll to selected item
    useEffect(() => {
        if (selectedIndex >= 0 && itemRefs.current[selectedIndex]) {
            const selectedElement = itemRefs.current[selectedIndex]
            const container = listRef.current

            if (container && selectedElement) {
                const containerRect = container.getBoundingClientRect()
                const elementRect = selectedElement.getBoundingClientRect()

                if (elementRect.top < containerRect.top) {
                    selectedElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'nearest'
                    })
                }
                else if (elementRect.bottom > containerRect.bottom) {
                    selectedElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'end',
                        inline: 'nearest'
                    })
                }
            }
        }
    }, [selectedIndex])

    // Reset selected index when search query changes
    useEffect(() => {
        setSelectedIndex(0)
        itemRefs.current = []
    }, [searchQuery])

    const handleItemClick = (item) => {
        if (item.type === 'blog') {
            navigate(`/blog/${item.slug}`)
            onClose()
            return
        }
        
        if (item.isHash) {
            if (location.pathname !== '/') {
                navigate('/')
                setTimeout(() => {
                    const element = document.querySelector(item.command)
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' })
                    }
                    onClose()
                }, 100)
            } else {
                const element = document.querySelector(item.command)
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                }
                onClose()
            }
            return
        }
        
        navigate(item.command)
        onClose()
    }

    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose()
        }
    }

    if (!isOpen) return null

    return (
        <div
            className='fixed inset-0 z-50 flex items-start justify-center pt-20'
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={handleOutsideClick}
        >
            {/* Modal Container */}
            <div
                ref={modalRef}
                className='w-full max-w-2xl mx-4 rounded-lg shadow-2xl'
                style={{
                    backgroundColor: 'var(--bg-primary)',
                    border: '2px dashed var(--border-color)'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Section 1: Search Input */}
                <div className='border-b-2 border-dashed p-4' style={{ borderBottomColor: 'var(--border-color)' }}>
                    <div className='flex items-center gap-3'>
                        <Search className='w-5 h-5' style={{ color: 'var(--text-secondary)' }} />
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Type a command or search blogs..."
                            className='w-full bg-transparent outline-none text-base font-mono'
                            style={{ color: 'var(--text-primary)' }}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className='p-1 rounded-md transition-all duration-200 hover:scale-110'
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

                {/* Section 2: List of Items */}
                <div
                    ref={listRef}
                    className='max-h-96 overflow-y-auto'
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <style>
                        {`
                            .max-h-96::-webkit-scrollbar {
                                display: none;
                            }
                        `}
                    </style>
                    {isLoading ? (
                        <div className='p-8 text-center font-mono' style={{ color: 'var(--text-secondary)' }}>
                            Loading blog posts...
                        </div>
                    ) : !hasResults ? (
                        <div className='p-8 text-center font-mono' style={{ color: 'var(--text-secondary)' }}>
                            No results found for "{searchQuery}"
                        </div>
                    ) : (
                        <>
                            {/* Menu Section */}
                            {filteredMenu.length > 0 && (
                                <div>
                                    <div className='px-3 py-2 text-xs font-mono font-semibold uppercase tracking-wider' style={{ color: 'var(--text-secondary)' }}>
                                        Menu
                                    </div>
                                    {filteredMenu.map((item, idx) => (
                                        <SearchItem
                                            key={item.id}
                                            item={item}
                                            index={idx}
                                            selectedIndex={selectedIndex}
                                            setSelectedIndex={setSelectedIndex}
                                            itemRefs={itemRefs}
                                            handleItemClick={handleItemClick}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Portfolio Section */}
                            {filteredPortfolio.length > 0 && (
                                <div>
                                    <div className='px-3 py-2 text-xs font-mono font-semibold uppercase tracking-wider' style={{ color: 'var(--text-secondary)' }}>
                                        Portfolio
                                    </div>
                                    {filteredPortfolio.map((item, idx) => (
                                        <SearchItem
                                            key={item.id}
                                            item={item}
                                            index={filteredMenu.length + idx}
                                            selectedIndex={selectedIndex}
                                            setSelectedIndex={setSelectedIndex}
                                            itemRefs={itemRefs}
                                            handleItemClick={handleItemClick}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Blog Section */}
                            {filteredBlogs.length > 0 && (
                                <div>
                                    <div className='px-3 py-2 text-xs font-mono font-semibold uppercase tracking-wider' style={{ color: 'var(--text-secondary)' }}>
                                        Blog Posts ({filteredBlogs.length})
                                    </div>
                                    {filteredBlogs.map((item, idx) => (
                                        <SearchItem
                                            key={item.id}
                                            item={item}
                                            index={filteredMenu.length + filteredPortfolio.length + idx}
                                            selectedIndex={selectedIndex}
                                            setSelectedIndex={setSelectedIndex}
                                            itemRefs={itemRefs}
                                            handleItemClick={handleItemClick}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Section 3: Footer */}
                <div className='border-t-2 border-dashed p-3 flex justify-between items-center' style={{ borderTopColor: 'var(--border-color)' }}>
                    <span className='text-sm font-mono font-semibold' style={{ color: 'var(--text-primary)' }}>
                        AN
                    </span>
                    <div className='flex items-center gap-3 text-xs font-mono'>
                        <div className='flex items-center gap-2'>
                            <span style={{ color: 'var(--text-secondary)' }}>Navigate</span>
                            <kbd className='px-1.5 py-0.5 text-xs font-mono font-semibold rounded shadow-sm'
                                style={{
                                    backgroundColor: 'var(--bg-secondary)',
                                    color: 'var(--text-primary)',
                                    border: '1px solid var(--border-color)'
                                }}>
                                ↑↓
                            </kbd>
                        </div>

                        <div className='w-px h-4' style={{ backgroundColor: 'var(--border-color)' }}></div>

                        <div className='flex items-center gap-2'>
                            <span style={{ color: 'var(--text-secondary)' }}>Select</span>
                            <kbd className='px-1.5 py-0.5 text-xs font-mono font-semibold rounded shadow-sm'
                                style={{
                                    backgroundColor: 'var(--bg-secondary)',
                                    color: 'var(--text-primary)',
                                    border: '1px solid var(--border-color)'
                                }}>
                                ↵
                            </kbd>
                        </div>

                        <div className='w-px h-4' style={{ backgroundColor: 'var(--border-color)' }}></div>

                        <div className='flex items-center gap-2'>
                            <span style={{ color: 'var(--text-secondary)' }}>Exit</span>
                            <kbd className='px-1.5 py-0.5 text-xs font-mono font-semibold rounded shadow-sm'
                                style={{
                                    backgroundColor: 'var(--bg-secondary)',
                                    color: 'var(--text-primary)',
                                    border: '1px solid var(--border-color)'
                                }}>
                                Esc
                            </kbd>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchModal