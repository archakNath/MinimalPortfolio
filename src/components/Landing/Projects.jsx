import React, { useState } from 'react'
import { FolderGit2, ExternalLink, ChevronDown, ChevronUp, Clock } from 'lucide-react'
import { MdEvent } from 'react-icons/md'
import { FaBus, FaCode, FaNewspaper } from 'react-icons/fa'
import { HiSparkles } from 'react-icons/hi'
import { LuMessageCircleDashed } from 'react-icons/lu'
import { FaBuildingNgo } from 'react-icons/fa6'
import { GiDiamondRing } from 'react-icons/gi'
import Heading from './Heading'

const Projects = () => {
    const [visibleCount, setVisibleCount] = useState(4)
    const [expandedProjects, setExpandedProjects] = useState(() => {
        const initialState = {}
        // Only expand the first project by default
        initialState[1] = true
        return initialState
    })
    const [showLinkTooltip, setShowLinkTooltip] = useState({})

    const projects = [
        {
            id: 1,
            name: "EventFlow - Microservices Event Booking Platform",
            icon: <MdEvent className='w-4 h-4' />,
            link: "https://github.com/archakNath/eventflow-microservices",
            startDate: "2026-04-01",
            endDate: "∞",
            description: [
                "Built a production-ready microservices-based event booking platform with Spring Boot and Spring Cloud",
                "Implemented API Gateway, service discovery using Eureka, and database-per-service architecture",
                "Developed core services for user management, event handling, booking, payments, and analytics",
                "Integrated JWT authentication, role-based access control, distributed locking, and idempotent APIs",
                "Designed scalable inter-service communication using OpenFeign and load balancing"
            ],
            skills: ["Java", "Spring Boot", "Spring Cloud", "PostgreSQL", "Spring Security", "JWT", "Eureka", "OpenFeign", "Maven"]
        },
        {
            id: 2,
            name: "BusBondhu (Transport Management System)",
            icon: <FaBus className='w-4 h-4' />,
            link: "https://github.com/archakNath/BusBondhu",
            startDate: "2025-04-01",
            endDate: "2025-05-01",
            description: [
                "Built a bus route planner using greedy algorithm and haversine distance to optimize direct and indirect routes",
                "Visualized Kolkata bus stops using D3.js and GeoJSON with interactive real-time route highlights",
                "Developed frontend with React and Zustand enabling dynamic multi-hop route search",
                "Created RESTful backend with Node.js and Express serving route data from MongoDB"
            ],
            skills: ["React", "Zustand", "D3.js", "Node.js", "Express", "MongoDB", "GeoJSON"]
        },
        {
            id: 3,
            name: "AI-Related News Heading Scrapper",
            icon: <FaNewspaper className='w-4 h-4' />,
            link: "https://github.com/archakNath/AI-News-Heading-Scrapper",
            startDate: "2025-07-01",
            endDate: "2025-08-01",
            description: [
                "Built a Python scraper extracting AI news headlines, timestamps, images, and sources from sites like WION, BBC, and Bloomberg",
                "Structured scraped data and streamed it to a webhook server for real-time frontend updates",
                "Designed responsive UI using EJS to display headlines with timestamps and source attribution",
                "Automated daily scraping using cron jobs with error handling and deduplication logic"
            ],
            skills: ["Python", "Web Scraping", "EJS", "Cron Jobs", "REST APIs", "JSON"]
        },
        {
            id: 4,
            name: "AI-Powered Mock Interviewer",
            icon: <HiSparkles className='w-4 h-4' />,
            link: "https://github.com/archakNath/AI-Interviewer",
            startDate: "2025-08-01",
            endDate: "2025-09-01",
            description: [
                "Developed AI interview platform using Gemini 1.5 Flash to generate personalized questions from resumes",
                "Integrated Google Speech-to-Text API for real-time transcription and response detection",
                "Built interactive UI with React, Zustand, and WebRTC supporting video and adaptive interview flow",
                "Implemented scoring engine providing feedback based on speech content"
            ],
            skills: ["React", "Zustand", "WebRTC", "Node.js", "Google Speech-to-Text API", "Gemini API"]
        },
        {
            id: 5,
            name: "SendMeSecretMessage",
            icon: <LuMessageCircleDashed className='w-4 h-4' />,
            link: "https://github.com/archakNath/SendMeSecretMessage",
            startDate: "2024-01-01",
            endDate: "2024-02-01",
            description: [
                "Built an anonymous messaging platform allowing users to receive secret messages via a unique link",
                "Designed responsive frontend using HTML, CSS, JavaScript, and Tailwind CSS",
                "Implemented dynamic message handling and clean UI for seamless user interaction",
                "Deployed the application on Vercel for fast and reliable access"
            ],
            skills: ["HTML", "CSS", "JavaScript", "Tailwind CSS", "Vercel"]
        },
        {
            id: 6,
            name: "Minimal Portfolio",
            icon: <FolderGit2 className='w-4 h-4' />,
            link: "https://github.com/archakNath/MinimalPortfolio",
            startDate: "2025-01-01",
            endDate: "∞",
            description: [
                "Designed and developed a wireframe-style portfolio website with a unique aesthetic",
                "Implemented custom dark/light mode with persistent localStorage theme storage",
                "Built reusable components including search modal, expandable experience sections, and project showcases",
                "Created dynamic timezone display showing Kolkata time relative to user's location",
                "Added interactive elements like cursor-following text animation and copy-to-clipboard functionality",
                "Used Tailwind CSS for styling with CSS variables for dynamic theming"
            ],
            skills: ["React", "Tailwind CSS", "JavaScript", "Lucide Icons", "Web Speech API"]
        },
        {
            id: 7,
            name: "TECHSTORM 2.24 (Tech Fest Website)",
            icon: <FaCode className='w-4 h-4' />,
            link: "https://techstorm-2-24.vercel.app",
            startDate: "2024-01-01",
            endDate: "2024-02-01",
            description: [
                "Developed the official website for TECHSTORM 2024, the annual technical fest of BPPIMT",
                "Built responsive multi-page interface including event schedule, gallery, and information pages",
                "Collaborated with team members to implement features and manage content updates",
                "Deployed on Vercel with multiple production iterations and updates"
            ],
            skills: ["HTML", "CSS", "JavaScript", "Vercel"]
        },
        {
            id: 8,
            name: "KolkataCare (NGO Website)",
            icon: <FaBuildingNgo className='w-4 h-4' />,
            link: "https://kolkata-care.vercel.app",
            startDate: "2023-01-01",
            endDate: "2023-02-01",
            description: [
                "Developed a frontend landing page for a Kolkata-based social service NGO",
                "Implemented parallax scrolling and reveal animations using JavaScript event listeners",
                "Designed responsive UI with HTML and CSS focusing on accessibility and visual storytelling",
                "Structured an early-stage project demonstrating foundational frontend development skills"
            ],
            skills: ["HTML", "CSS", "JavaScript"]
        },
        {
            id: 9,
            name: "Wedding Invitation Website",
            icon: <GiDiamondRing className='w-4 h-4' />,
            link: "https://wedding-invitation-website.vercel.app",
            startDate: "2022-01-01",
            endDate: "2022-02-01",
            description: [
                "Built a fully responsive single-page wedding invitation website with interactive UI elements",
                "Implemented parallax scrolling and reveal animations using JavaScript event listeners",
                "Integrated Firebase Storage as a CDN for managing image assets",
                "Designed smooth navigation with linked sections and responsive hover interactions"
            ],
            skills: ["HTML", "CSS", "JavaScript", "Firebase"]
        }
    ];

    const calculateDuration = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = endDate === '∞' ? new Date() : new Date(endDate)

        let years = end.getFullYear() - start.getFullYear()
        let months = end.getMonth() - start.getMonth()

        if (months < 0) {
            years--
            months += 12
        }

        if (years === 0 && months === 0) return '< 1m'
        if (years === 0) return `${months}m`
        if (months === 0) return `${years}y`
        return `${years}y ${months}m`
    }

    const toggleExpand = (projectId) => {
        setExpandedProjects(prev => ({
            ...prev,
            [projectId]: !prev[projectId]
        }))
    }

    const visibleProjects = projects.slice(0, visibleCount)
    const hasMore = visibleCount < projects.length

    return (
        <>
            <Heading title="Projects" count={projects.length} />
            <div className='w-full border-b-2 border-dashed' style={{ borderBottomColor: 'var(--border-color)' }} data-projects>
                {/* Projects List */}
                <div className='w-full '>
                    {visibleProjects.map((project) => {
                        const duration = calculateDuration(project.startDate, project.endDate)
                        const startDateFormatted = new Date(project.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
                        const endDateFormatted = project.endDate === '∞' ? '∞' : new Date(project.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
                        const isExpanded = expandedProjects[project.id] || false
                        const hasDescription = project.description && project.description.length > 0

                        return (
                            <div key={project.id} className='w-full' style={{
                                borderColor: 'var(--border-color)',
                            }}>
                                <div className={`max-w-3xl border-l-2 ${isExpanded && hasDescription && 'border-b-2'} border-r-2 border-dashed mx-auto`} style={{ borderColor: 'var(--border-color)', borderRightColor: 'var(--border-color)' }}>
                                    {/* Project Header */}
                                    <div className='flex flex-col border-b-2 border-dashed px-3 pb-3' style={{ borderBottomColor: 'var(--border-color)' }}>
                                        <div className='flex justify-between'>
                                            <div className='flex items-center gap-2'>
                                                <span style={{ color: 'var(--text-secondary)' }}>{project.icon}</span>
                                                <h3 className='text-base md:text-lg font-mono font-semibold' style={{ color: 'var(--text-primary)' }}>
                                                    {project.name}
                                                </h3>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <div className="relative">
                                                    <a
                                                        href={project.link}
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                        onMouseEnter={() => setShowLinkTooltip(prev => ({ ...prev, [project.id]: true }))}
                                                        onMouseLeave={() => setShowLinkTooltip(prev => ({ ...prev, [project.id]: false }))}
                                                        className='p-1 rounded-md transition-all duration-200 '
                                                        style={{ color: 'var(--text-secondary)' }}
                                                    >
                                                        <ExternalLink className='w-4 h-4' />
                                                    </a>

                                                    {/* Tooltip */}
                                                    <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 transition-all duration-200 ${showLinkTooltip[project.id] ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-1'
                                                        }`}>
                                                        <div className='px-2 py-1 text-xs font-mono whitespace-nowrap rounded shadow-lg'
                                                            style={{
                                                                backgroundColor: 'var(--bg-secondary)',
                                                                color: 'var(--text-primary)',
                                                                border: '1px solid var(--border-color)'
                                                            }}>
                                                            Open project link
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

                                                {hasDescription && (
                                                    <button
                                                        onClick={() => toggleExpand(project.id)}
                                                        className='p-1 rounded-md transition-all duration-200 hover:scale-110'
                                                        style={{ color: 'var(--text-secondary)' }}
                                                    >
                                                        {isExpanded ? <ChevronUp className='w-4 h-4' /> : <ChevronDown className='w-4 h-4' />}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        {/* Date and Duration */}
                                        <div className='flex flex-wrap items-center gap-2 text-sm font-mono' style={{ color: 'var(--text-secondary)' }}>
                                            <span>{startDateFormatted} - {endDateFormatted}</span>
                                            <span>•</span>
                                            <span className='inline-flex items-center gap-1'>
                                                <Clock className='w-3 h-3' />
                                                {duration}
                                            </span>
                                        </div>
                                    </div>


                                    {isExpanded && hasDescription && (
                                        <div className='px-2 pb-2'>

                                            {/* Description - Only when expanded */}
                                            <ul className='space-y-1 ml-6 mt-3'>
                                                {project.description.map((point, pointIdx) => (
                                                    <li key={pointIdx} className='flex items-start gap-2 text-sm font-mono' style={{ color: 'var(--text-secondary)' }}>
                                                        <span className='mt-1.5 w-1 h-1 rounded-full flex-shrink-0' style={{ backgroundColor: 'var(--text-secondary)' }}></span>
                                                        <span>{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className='flex flex-wrap gap-2 mt-3'>
                                                {project.skills.map((skill, skillIdx) => (
                                                    <span
                                                        key={skillIdx}
                                                        className='px-2 py-1 text-xs font-mono rounded-full'
                                                        style={{
                                                            backgroundColor: 'var(--bg-primary)',
                                                            border: '1px solid var(--border-color)',
                                                            color: 'var(--text-secondary)'
                                                        }}
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}


                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Show More / Show Less Button */}
                <div className='text-center border-dashed' style={{ borderBottomColor: 'var(--border-color)' }}>
                    <div className='border-l-2 border-r-2 border-dashed max-w-3xl mx-auto py-2' style={{ borderLeftColor: 'var(--border-color)', borderRightColor: 'var(--border-color)' }}>
                        {hasMore ? (
                            <button
                                onClick={() => setVisibleCount(projects.length)}
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

export default Projects