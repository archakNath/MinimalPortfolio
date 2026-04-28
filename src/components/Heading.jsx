import React from 'react'
import Seperator from './Seperator'

const Heading = ({ title }) => {
    return (
        <>
        <Seperator/>
        <div className='w-full border-b-2 border-dashed' style={{ borderBottomColor: 'var(--border-color)' }} data-heading>
            <div className='max-w-3xl border-l-2 border-r-2 border-dashed mx-auto' style={{ borderLeftColor: 'var(--border-color)', borderRightColor: 'var(--border-color)' }}>
                <div className='py-1 px-3'>
                    <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold font-mono tracking-tight' style={{ color: 'var(--text-primary)' }}>
                        {title}
                    </h1>
                </div>
            </div>
        </div>
        </>
    )
}

export default Heading