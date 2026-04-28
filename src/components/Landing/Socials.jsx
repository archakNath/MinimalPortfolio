import React from 'react'
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { HiExternalLink } from 'react-icons/hi'
import { RxArrowTopRight } from 'react-icons/rx'

const Socials = () => {
    const socialLinks = [
        {
            name: "X (Twitter)",
            icon: <FaXTwitter className='w-5 h-5 md:w-6 md:h-6' />,
            url: "https://x.com/NathArchak",
            username: "@NathArchak"
        },
        {
            name: "LinkedIn",
            icon: <FaLinkedin className='w-5 h-5 md:w-6 md:h-6' />,
            url: "https://www.linkedin.com/in/archak-nath/",
            username: "in/archak-nath"
        },
        {
            name: "GitHub",
            icon: <FaGithub className='w-5 h-5 md:w-6 md:h-6' />,
            url: "https://github.com/archakNath",
            username: "archakNath"
        }
    ]

    return (
        <div className='w-full border-b-2 border-dashed' style={{ borderBottomColor: 'var(--border-color)' }} data-socials>
            <div className='max-w-3xl mx-auto border-l-2 border-r-2 border-dashed' style={{ borderLeftColor: 'var(--border-color)', borderRightColor: 'var(--border-color)' }}>
                <div>

                    {/* Single Row with Three Columns */}
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-2 px-2'>
                        {socialLinks.map((social, index) => (
                            <a
                                key={index}
                                href={social.url}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='group flex items-center justify-between p-2 transition-all duration-200 md:border-l-2 md:border-r-2 border-b-2 md:border-b-0  border-dashed'
                                style={{ borderColor: 'var(--border-color)', borderRightColor: 'var(--border-color)' }}
                            >
                                <div className='flex  gap-3'>
                                    <div className='flex-shrink-0 transition-transform duration-200 mt-1' style={{ color: 'var(--text-secondary)' }}>
                                        {social.icon}
                                    </div>
                                    <div className='flex flex-col'>
                                        <span className='text-sm md:text-base font-mono font-semibold' style={{ color: 'var(--text-primary)' }}>
                                            {social.name}
                                        </span>
                                        <span className='text-xs md:text-sm font-mono' style={{ color: 'var(--text-secondary)' }}>
                                            {social.username}
                                        </span>
                                    </div>
                                </div>
                                <RxArrowTopRight className='w-4 h-4 md:w-5 md:h-5 transition-transform duration-200' style={{ color: 'var(--text-secondary)' }} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Socials