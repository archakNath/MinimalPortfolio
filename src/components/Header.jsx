import { Search, Sun, Moon } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import SearchModal from './SearchModal'

const Header = () => {
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [showTooltip, setShowTooltip] = useState(false)

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            setIsDarkMode(true)
            document.documentElement.setAttribute('data-theme', 'dark')
        } else {
            setIsDarkMode(false)
            document.documentElement.setAttribute('data-theme', 'light')
        }
    }, [])

    useEffect(() => {
        const handleKeyPress = (e) => {
            const activeElement = document.activeElement
            const isTyping = activeElement?.tagName === 'INPUT' ||
                activeElement?.tagName === 'TEXTAREA' ||
                activeElement?.isContentEditable ||
                activeElement?.getAttribute('role') === 'textbox'

            if ((e.key === 'd' || e.key === 'D') && !isTyping) {
                e.preventDefault()
                toggleDarkMode()
            }

            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault()
                setIsSearchOpen(true)
            }

            if (e.key === 'Escape' && isSearchOpen) {
                setIsSearchOpen(false)
            }
        }

        window.addEventListener('keydown', handleKeyPress)

        return () => {
            window.removeEventListener('keydown', handleKeyPress)
        }
    }, [isDarkMode, isSearchOpen])

    const toggleDarkMode = () => {
        if (isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'light')
            localStorage.setItem('theme', 'light')
            setIsDarkMode(false)
        } else {
            document.documentElement.setAttribute('data-theme', 'dark')
            localStorage.setItem('theme', 'dark')
            setIsDarkMode(true)
        }
    }

    return (
        <>
            <div className='w-full border-b-2 border-dashed z-50' style={{
                borderBottomColor: 'var(--border-color)',
                backgroundColor: 'var(--bg-primary)',
                position: 'sticky',
                top: 0
            }} data-header>
                <div className='max-w-3xl mx-auto border-x-2 border-dashed' style={{ borderLeftColor: 'var(--border-color)', borderRightColor: 'var(--border-color)' }}>
                    <div className='flex justify-between items-center h-12 md:h-15 p-3'>
                        <span className='text-lg md:text-xl font-semibold'>AN</span>
                        <div className='flex items-center gap-3 md:gap-4'>
                            <a href="/blog" className='text-sm md:text-base hover:text-gray-600 transition-colors'>Blog</a>
                            <div className='flex items-center gap-2 cursor-pointer'>
                                <button
                                    onClick={() => setIsSearchOpen(true)}
                                    className='flex items-center gap-2 bg-gray-100 px-2 py-1.5 rounded-md hover:bg-gray-200 transition-colors'
                                >
                                    <Search className='w-4 h-4' />
                                    <div className='hidden md:flex gap-1'>
                                        <kbd className='px-1.5 py-0.5 text-xs font-mono font-semibold text-gray-700 bg-white border border-gray-300 rounded shadow-sm'>Ctrl</kbd>
                                        <span className='text-gray-400'>+</span>
                                        <kbd className='px-1.5 py-0.5 text-xs font-mono font-semibold text-gray-700 bg-white border border-gray-300 rounded shadow-sm'>K</kbd>
                                    </div>
                                </button>

                                <div className="relative inline-block">
                                    <button
                                        onClick={toggleDarkMode}
                                        onMouseEnter={() => setShowTooltip(true)}
                                        onMouseLeave={() => setShowTooltip(false)}
                                        className='p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer'
                                        aria-label="Toggle dark mode"
                                    >
                                        {isDarkMode ? (
                                            <Sun className='w-4 h-4' />
                                        ) : (
                                            <Moon className='w-4 h-4' />
                                        )}
                                    </button>

                                    <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 transition-all duration-200 ${showTooltip ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1'
                                        }`}>
                                        <div className='px-2 py-1 text-xs font-mono whitespace-nowrap rounded shadow-lg'
                                            style={{
                                                backgroundColor: 'var(--bg-secondary)',
                                                color: 'var(--text-primary)',
                                                border: '1px solid var(--border-color)'
                                            }}>
                                            Toggle mode <kbd className='px-1 py-0.5 text-xs font-mono bg-gray-200 dark:bg-gray-700 rounded'>D</kbd>
                                        </div>
                                        <div className='absolute bottom-full left-1/2 transform -translate-x-1/2'
                                            style={{
                                                width: 0,
                                                height: 0,
                                                borderLeft: '5px solid transparent',
                                                borderRight: '5px solid transparent',
                                                borderBottom: `5px solid var(--border-color)`
                                            }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    )
}

export default Header