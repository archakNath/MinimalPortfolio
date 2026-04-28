import React, { useState, useRef } from 'react'

const HeaderImage = () => {
    const [transform, setTransform] = useState('translate(0px, 0px)')
    const containerRef = useRef(null)

    const handleMouseMove = (e) => {
        if (!containerRef.current) return
        
        const rect = containerRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        
        const mouseX = e.clientX
        const mouseY = e.clientY
        
        // Calculate offset (max 50px movement)
        const offsetX = ((mouseX - centerX) / rect.width) * 60
        const offsetY = ((mouseY - centerY) / rect.height) * 60
        
        const limitedX = Math.min(Math.max(offsetX, -50), 50)
        const limitedY = Math.min(Math.max(offsetY, -50), 50)
        
        setTransform(`translate(${limitedX}px, ${limitedY}px)`)
    }
    
    const handleMouseLeave = () => {
        setTransform('translate(0px, 0px)') // Always returns to exact center
    }

    return (
        <div className='w-full border-b-2 border-dashed border-gray-200' style={{ borderBottomColor: 'var(--border-color)' }} data-header-image>
            <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 border-l-2 border-r-2 border-dashed' style={{ borderLeftColor: 'var(--border-color)', borderRightColor: 'var(--border-color)' }}>
                <div 
                    ref={containerRef}
                    className='relative w-full overflow-hidden'
                    style={{ paddingBottom: '30%' }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <span 
                            className='text-5xl md:text-8xl lg:text-7xl font-bold font-mono tracking-wider transition-transform duration-300 ease-out'
                            style={{ 
                                color: 'var(--text-primary)',
                                transform: transform
                            }}
                        >
                            AN
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderImage