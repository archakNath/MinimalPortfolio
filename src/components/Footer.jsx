import React from 'react'
import Seperator from './Seperator'

const Footer = () => {
    return (
        <>
            <Seperator />
            <div className='w-full border-b-2 border-dashed relative' style={{ borderBottomColor: 'var(--border-color)' }} data-footer>
                <div className='max-w-3xl mx-auto flex flex-col items-center border-l-2 border-r-2 border-dashed relative py-2 px-4 text-center footer-container' style={{ borderLeftColor: 'var(--border-color)', borderRightColor: 'var(--border-color)' }}>
                    <p className='text-sm font-mono mb-2 footer-text' style={{ color: 'var(--text-secondary)' }}>
                        Inspired by <a
                            href="https://chanhdai.com/"
                            target='_blank'
                            rel='noopener noreferrer'
                            className='footer-link'
                        >chanhdai.com</a>
                    </p>
                    <p className='text-sm font-mono footer-text' style={{ color: 'var(--text-secondary)' }}>
                        Built with care by <a
                            href="https://x.com/NathArchak"
                            target='_blank'
                            rel='noopener noreferrer'
                            className='footer-link'
                        >archakn</a>.
                        The source code is available on <a
                            href="https://github.com/NathArchak/portfolio"
                            target='_blank'
                            rel='noopener noreferrer'
                            className='footer-link'
                        >GitHub</a>.
                    </p>
                </div>
            </div>
            <div>
                <div className='w-full border-b-2 border-dashed relative' style={{ borderBottomColor: 'var(--border-color)' }} data-footer>
                    <div className='max-w-3xl mx-auto border-l-2 border-r-2 border-dashed relative py-2 px-4 text-center' style={{ borderLeftColor: 'var(--border-color)', borderRightColor: 'var(--border-color)' }}>
                        <p className='text-sm font-mono' style={{ color: 'var(--text-secondary)' }}>
                            © {new Date().getFullYear()} Archak Nath. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer