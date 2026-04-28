import React from 'react'

const About = () => {
    return (
        <div className='w-full border-b-2 border-dashed' style={{ borderBottomColor: 'var(--border-color)' }} data-about>
            <div className='max-w-3xl border-l-2 border-r-2 border-dashed mx-auto' style={{ borderLeftColor: 'var(--border-color)', borderRightColor: 'var(--border-color)' }}>
                <div className='py-4 md:py-6 px-4 md:px-6'>

                    {/* About Points */}
                    <ul className='space-y-4'>
                        <li className='flex items-start gap-3 transition-all duration-200'>
                            <span className='flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2' style={{ backgroundColor: 'var(--text-secondary)' }}></span>
                            <span className='text-sm md:text-base font-mono leading-relaxed' style={{ color: 'var(--text-primary)' }}>
                                Associate Software Engineer Trainee with a passion for building clean, efficient, and user-friendly web applications.
                            </span>
                        </li>

                        <li className='flex items-start gap-3 transition-all duration-200'>
                            <span className='flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2' style={{ backgroundColor: 'var(--text-secondary)' }}></span>
                            <span className='text-sm md:text-base font-mono leading-relaxed' style={{ color: 'var(--text-primary)' }}>
                                B.Tech graduate in Information Technology, constantly exploring modern technologies and frameworks to solve real-world problems.
                            </span>
                        </li>

                        <li className='flex items-start gap-3 transition-all duration-200'>
                            <span className='flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2' style={{ backgroundColor: 'var(--text-secondary)' }}></span>
                            <span className='text-sm md:text-base font-mono leading-relaxed' style={{ color: 'var(--text-primary)' }}>
                                Focused on continuous learning and improving systems for tomorrow through thoughtful design and development.
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default About