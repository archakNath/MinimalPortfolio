import React, { useState } from 'react'
import { ExternalLink, ChevronDown, ChevronUp, Award } from 'lucide-react'
import { SiGeeksforgeeks, SiGooglecloud, SiPostman } from 'react-icons/si'
import { FaKaggle } from 'react-icons/fa'
import Heading from './Heading'

const Certifications = () => {
    const [visibleCount, setVisibleCount] = useState(4)
    const [showTooltip, setShowTooltip] = useState({})

    const certifications = [
        {
            id: 1,
            name: "Full Stack Developer Bootcamp - Master Frontend to Backend",
            icon: <SiGeeksforgeeks className='w-4 h-4' />,
            link: "https://www.geeksforgeeks.org/certificate/b88af82c17b95ddd0dcda243a22c94c9?utm_source=socials&utm_medium=cc_link",
            issuer: "GeeksforGeeks",
            date: "2024-06-01"
        },
        {
            id: 2,
            name: "API Fundamentals Student Expert",
            icon: <SiPostman className='w-4 h-4' />,
            link: "https://api.badgr.io/public/assertions/9e3l1o0QQQGCb5FkdMnUuA?identity__email=archak.it222053%40bppimt.ac.in",
            issuer: "Postman",
            date: "2023-03-13"
        },
        {
            id: 3,
            name: "Google Cloud Big Data and Machine Learning Fundamentals",
            icon: <SiGooglecloud className='w-4 h-4' />,
            link: "https://coursera.org/share/efd13bbab15a4557bd91bc9431a736cb",
            issuer: "Google Cloud Training Online",
            date: "2022-12-21"
        },
        {
            id: 4,
            name: "Cyber Security Awareness",
            icon: <Award className='w-4 h-4' />,
            link: "https://drive.google.com/file/d/1lSHWlrft6UX21FVMRsKG1gTBgzZeXNRY/view?usp=share_link",
            issuer: "MyGov India",
            date: "2022-08-05"
        },
        {
            id: 5,
            name: "British Council EnglishScore Certificate",
            icon: <Award className='w-4 h-4' />,
            link: "https://drive.google.com/file/d/1mbTAqVqgeZ15thHI9NJH7o_DQE9enM3A/view?usp=drivesdk",
            issuer: "British Council",
            date: "2022-05-12"
        },
        {
            id: 6,
            name: "Basic Python Programming",
            icon: <FaKaggle className='w-4 h-4' />,
            link: "https://www.kaggle.com/learn/certification/archaknath/python",
            issuer: "Kaggle",
            date: "2022-12-03"
        }
    ]

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
    }

    const visibleCertifications = certifications.slice(0, visibleCount)
    const hasMore = visibleCount < certifications.length

    return (
        <>
            <Heading title="Certifications" count={certifications.length} />
            <div className='w-full border-b-2 border-dashed' style={{ borderBottomColor: 'var(--border-color)' }} data-certifications>
                <div className='w-full'>
                    {visibleCertifications.map((cert) => (
                        <div key={cert.id} className='w-full' style={{ borderColor: 'var(--border-color)' }}>
                            <div className='max-w-3xl border-l-2 border-b-2 border-r-2 border-dashed mx-auto py-2' style={{ borderColor: 'var(--border-color)' }}>
                                {/* Certificate Row */}
                                <div className='flex items-center justify-between px-3 py-2 cursor-pointer  transition-colors'
                                    onClick={() => window.open(cert.link, '_blank')}>
                                    <div className='flex items-center gap-3'>
                                        <span style={{ color: 'var(--text-secondary)' }}>{cert.icon}</span>
                                        <div>
                                            <h3 className='text-base md:text-lg font-mono font-semibold' style={{ color: 'var(--text-primary)' }}>
                                                {cert.name}
                                            </h3>
                                            <div className='flex items-center gap-2 text-xs font-mono mt-0.5' style={{ color: 'var(--text-secondary)' }}>
                                                <span>@{cert.issuer}</span>
                                                <span>•</span>
                                                <span>{formatDate(cert.date)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <div
                                            onMouseEnter={() => setShowTooltip(prev => ({ ...prev, [cert.id]: true }))}
                                            onMouseLeave={() => setShowTooltip(prev => ({ ...prev, [cert.id]: false }))}
                                            className='p-1 rounded-md transition-all duration-200'
                                            style={{ color: 'var(--text-secondary)' }}
                                        >
                                            <ExternalLink className='w-4 h-4' />
                                        </div>

                                        {/* Tooltip */}
                                        <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 transition-all duration-200 ${showTooltip[cert.id] ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-1'
                                            }`}>
                                            <div className='px-2 py-1 text-xs font-mono whitespace-nowrap rounded shadow-lg'
                                                style={{
                                                    backgroundColor: 'var(--bg-secondary)',
                                                    color: 'var(--text-primary)',
                                                    border: '1px solid var(--border-color)'
                                                }}>
                                                View certificate
                                            </div>
                                            <div className='absolute top-full left-1/2 transform -translate-x-1/2'
                                                style={{
                                                    width: 0,
                                                    height: 0,
                                                    borderLeft: '5px solid transparent',
                                                    borderRight: '5px solid transparent',
                                                    borderTop: `5px solid var(--border-color)`
                                                }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Show More / Show Less Button */}
                <div className='text-center border-dashed' style={{ borderBottomColor: 'var(--border-color)' }}>
                    <div className='border-l-2 border-r-2 border-dashed max-w-3xl mx-auto py-2' style={{ borderLeftColor: 'var(--border-color)', borderRightColor: 'var(--border-color)' }}>
                        {hasMore ? (
                            <button
                                onClick={() => setVisibleCount(certifications.length)}
                                className='inline-flex items-center gap-2 px-3 py-1 rounded-lg font-mono text-sm transition-all duration-200 hover:gap-3 hover:translate-y-[-2px] cursor-pointer'
                                style={{
                                    backgroundColor: 'var(--bg-secondary)',
                                    border: '1px solid var(--border-color)',
                                    color: 'var(--text-primary)'
                                }}
                            >
                                <span>Show More</span>
                                <ChevronDown className='w-4 h-4' />
                            </button>
                        ) : (
                            <button
                                onClick={() => setVisibleCount(4)}
                                className='inline-flex items-center gap-2 px-3 py-1 rounded-lg font-mono text-sm transition-all duration-200 hover:gap-3 hover:translate-y-[-2px] cursor-pointer'
                                style={{
                                    backgroundColor: 'var(--bg-secondary)',
                                    border: '1px solid var(--border-color)',
                                    color: 'var(--text-primary)'
                                }}
                            >
                                <span>Show Less</span>
                                <ChevronUp className='w-4 h-4' />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Certifications