import React from 'react'

const Spacing = () => {
    return (
        <div className='w-full border-b-2 border-dashed relative' style={{ borderBottomColor: 'var(--border-color)' }} data-spacing>
            
            {/* Container with borders overlaying the lines */}
            <div className='max-w-3xl mx-auto border-l-2 border-r-2 border-dashed relative' style={{ borderLeftColor: 'var(--border-color)', borderRightColor: 'var(--border-color)', height: '20px' }}>
                <div className='w-5 h-full mx-auto border-l-2 border-r-2 border-dashed' style={{ borderLeftColor: 'var(--border-color)', borderRightColor: 'var(--border-color)' }}>
                </div>
            </div>
        </div>
    )
}

export default Spacing