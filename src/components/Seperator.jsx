import React from 'react'

const Seperator = () => {
    return (
        <div className='w-full border-b-2 border-dashed relative' style={{ borderBottomColor: 'var(--border-color)' }} data-seperator>
            {/* Slanting lines that span the entire width */}
            <div className='absolute inset-0 opacity-30' style={{
                backgroundImage: 'repeating-linear-gradient(-45deg, var(--border-color) 0px, var(--border-color) 1px, transparent 1px, transparent 10px)'
            }}></div>
            
            {/* Container with borders overlaying the lines */}
            <div className='max-w-3xl mx-auto border-l-2 border-r-2 border-dashed relative' style={{ borderLeftColor: 'var(--border-color)', borderRightColor: 'var(--border-color)', height: '30px' }}>
            </div>
        </div>
    )
}

export default Seperator