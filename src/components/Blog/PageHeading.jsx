import React from 'react'

const PageHeading = () => {
    return (
        <>
            <div className='w-full border-b-2 border-dashed' style={{ borderBottomColor: 'var(--border-color)' }} data-blog-header>
                <div className='max-w-3xl px-3 pt-8 pb-1 border-l-2 border-r-2 border-dashed mx-auto' style={{ borderLeftColor: 'var(--border-color)', borderRightColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                    Blog
                </div>
            </div>
            <div className='w-full border-b-2 border-dashed' style={{ borderBottomColor: 'var(--border-color)' }} data-blog-header>
                <div className='max-w-3xl px-3 py-1 border-l-2 border-r-2 border-dashed mx-auto' style={{ borderLeftColor: 'var(--border-color)', borderRightColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                    <h1 className='text-2xl md:text-3xl'>Writing about tech, code, <br />
                        and everything in between.</h1>
                </div>
            </div>
        </>
    )
}

export default PageHeading