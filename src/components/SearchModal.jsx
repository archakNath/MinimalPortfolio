import React, { useState, useEffect, useRef } from 'react'
import { Search } from 'lucide-react'

const SearchModal = ({ isOpen, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedIndex, setSelectedIndex] = useState(0)
    const modalRef = useRef(null)
    const inputRef = useRef(null)
    const listRef = useRef(null)
    const itemRefs = useRef([])

    // Sample search items
    const searchItems = [
        { id: 1, name: "Blog", command: "/blog", description: "Go to blog page" },
        { id: 2, name: "Home", command: "/home", description: "Return to home" },
        { id: 3, name: "Profile", command: "/profile", description: "View your profile" },
        { id: 4, name: "Settings", command: "/settings", description: "Adjust settings" },
        { id: 5, name: "Dark Mode", command: "/dark", description: "Toggle dark mode" },
        { id: 6, name: "Projects", command: "/projects", description: "View all projects" },
        { id: 7, name: "Contact", command: "/contact", description: "Get in touch" },
    ]

    // Filter items based on search query
    const filteredItems = searchItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.command.toLowerCase().includes(searchQuery.toLowerCase())
    )

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
                        if (prev < filteredItems.length - 1) {
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
                    if (filteredItems[selectedIndex]) {
                        handleItemClick(filteredItems[selectedIndex])
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
    }, [isOpen, filteredItems, selectedIndex])

    // Scroll to selected item - FIXED VERSION
    useEffect(() => {
        if (selectedIndex >= 0 && itemRefs.current[selectedIndex]) {
            const selectedElement = itemRefs.current[selectedIndex]
            const container = listRef.current
            
            if (container && selectedElement) {
                const containerRect = container.getBoundingClientRect()
                const elementRect = selectedElement.getBoundingClientRect()
                
                // Check if element is above the visible area
                if (elementRect.top < containerRect.top) {
                    selectedElement.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start',
                        inline: 'nearest'
                    })
                }
                // Check if element is below the visible area
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
        // Reset the refs array when filtered items change
        itemRefs.current = []
    }, [searchQuery])

    const handleItemClick = (item) => {
        console.log('Selected:', item)
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
                            placeholder="Type a command or search..."
                            className='w-full bg-transparent outline-none text-base font-mono'
                            style={{ color: 'var(--text-primary)' }}
                        />
                    </div>
                </div>

                {/* Section 2: List of Items - No Scrollbar */}
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
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item, index) => (
                            <div
                                key={item.id}
                                ref={el => itemRefs.current[index] = el}
                                onClick={() => handleItemClick(item)}
                                onMouseEnter={() => setSelectedIndex(index)}
                                className={`flex items-center justify-between p-3 cursor-pointer transition-colors border-b border-dashed ${
                                    index === filteredItems.length - 1 ? 'border-b-0' : ''
                                }`}
                                style={{
                                    borderBottomColor: index === filteredItems.length - 1 ? 'transparent' : 'var(--border-color)',
                                    backgroundColor: index === selectedIndex 
                                        ? (document.documentElement.getAttribute('data-theme') === 'dark' ? '#3f3f46' : '#e5e7eb')
                                        : 'transparent',
                                    borderLeft: index === selectedIndex ? '3px solid #3b82f6' : '3px solid transparent',
                                }}
                            >
                                <div className='flex flex-col'>
                                    <span className='font-mono font-semibold' style={{ 
                                        color: 'var(--text-primary)',
                                        fontWeight: index === selectedIndex ? '700' : '600'
                                    }}>
                                        {item.name}
                                    </span>
                                    <span className='text-xs font-mono' style={{ color: 'var(--text-secondary)' }}>
                                        {item.description}
                                    </span>
                                </div>
                                <span className='text-xs font-mono px-2 py-1 rounded' style={{
                                    backgroundColor: index === selectedIndex 
                                        ? (document.documentElement.getAttribute('data-theme') === 'dark' ? '#52525b' : '#d1d5db')
                                        : 'var(--bg-secondary)',
                                    color: 'var(--text-secondary)',
                                    border: `1px solid ${index === selectedIndex ? '#3b82f6' : 'var(--border-color)'}`,
                                }}>
                                    {item.command}
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className='p-8 text-center font-mono' style={{ color: 'var(--text-secondary)' }}>
                            No results found for "{searchQuery}"
                        </div>
                    )}
                </div>

                {/* Section 3: Footer */}
                <div className='border-t-2 border-dashed p-3 flex justify-between items-center' style={{ borderTopColor: 'var(--border-color)' }}>
                    <span className='text-sm font-mono font-semibold' style={{ color: 'var(--text-primary)' }}>
                        AN
                    </span>
                    <div className='flex items-center gap-3 text-xs font-mono'>
                        <div className='flex items-center gap-2'>
                            <span style={{ color: 'var(--text-secondary)' }}>Go to Page</span>
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