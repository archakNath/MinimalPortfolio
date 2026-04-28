import React, { useState, useEffect } from 'react'
import { Briefcase, Calendar, MapPin, CheckCircle, Circle, ExternalLink, Code, Award, Clock, Users, Rocket, Globe, ChevronDown, ChevronUp } from 'lucide-react'
import { GiGraduateCap } from 'react-icons/gi'
import Heading from './Heading'

const Experience = () => {

    const experiences = [
        {
            id: 1,
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpUpyZaLgl-wqwDxwMlVmdRLYAnrxmqwf6oA&s",
            companyName: "Nomura Research Institute FinTech India Pvt. Ltd.",
            companyUrl: "https://www.nrifintech.com/",
            isActive: true,
            positions: [
                {
                    title: "Associate Software Engineer Trainee",
                    icon: <Briefcase className='w-4 h-4' />,
                    type: "Apprenticeship",
                    location: "Kolkata, West Bengal, India · Hybrid",
                    startDate: "2025-09-16",
                    endDate: "∞",
                    description: [
                        "Building and maintaining scalable web applications using modern tech stack",
                        "Migrating legacy systems to newer technologies for improved performance and maintainability",
                        "Implementing features and fixing bugs in existing applications to enhance user experience",
                    ],
                    skills: ["Java", "Spring Boot", "Spring", "JSP", "Gitlab", "Jasper Reports", "MySQL", "PostgreSQL", "Oracle DB", "C#", "ASP.NET", "OSGi", "CSS", "Eclipse IDE"]
                }
            ]
        },
        {
            id: 2,
            logo: "https://media.licdn.com/dms/image/v2/D560BAQECstYZ2bnXgA/company-logo_200_200/company-logo_200_200/0/1683958443685/bluebeaks_solutions_llp_logo?e=2147483647&v=beta&t=50tqJ-6ga9BAB6weyRvQ-fTTAvZw84Ma3wryR_rHWl8",
            companyName: "Bluebeaks Solutions",
            companyUrl: "https://jobreferral.club/",
            isActive: false,
            positions: [
                {
                    title: "AI Engineer",
                    icon: <Rocket className='w-4 h-4' />,
                    type: "Internship",
                    location: "Remote",
                    startDate: "2025-07-01",
                    endDate: "2025-10-01",
                    description: [
                        "Completed 3 months of Internship working on JobReferral.Club (SaaS tools, community, etc)"
                    ],
                    skills: ["React", "JavaScript", "TypeScript", "Tailwind CSS", "Node.js", "Python", "Git", "GitHub", "VPS", "MongoDB", "Gemini Flash", "NGINX", "Auth0", "Web Scrapping"]
                }
            ]
        },
        {
            id: 3,
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGhfl6xBiJPJ52Cs_qPhXY0R4dbCbOa0wagA&s",
            companyName: "B.P. Poddar Institute of Management and Technology",
            companyUrl: "https://bppimt.ac.in/",
            isActive: true,
            positions: [
                {
                    title: "App Core Member (GDSC BPPIMT)",
                    icon: <Users className='w-4 h-4' />,
                    type: "Volunteer",
                    location: "On-site",
                    startDate: "2023-08-01",
                    endDate: "2024-07-01",
                    description: [
                        "Became a part of the GDSC App Team",
                        "Organised workshops and seminars to promote app development among the newcomers",
                        "Served and recognized: Certificate of Completion"
                    ],
                    skills: ["XML", "Java", "Kotlin", "Dart", "Flutter"]
                },
                {
                    title: "Web Master (ACM BPPIMT Student Chapter)",
                    icon: <Globe className='w-4 h-4' />,
                    type: "Membership",
                    location: "On-site",
                    startDate: "2023-07-01",
                    endDate: "2025-04-01",
                    description: [
                        "Designed, Developed and Deployed the landing page of Association of Computing Machinery(ACM) BPPIMT Student Chapter",
                        "Gives brief detail about the ACM and the benefits of joining ACM",
                        "Organized multiple events(both online & offline) to promote software development and problem solving skills"
                    ],
                    skills: ["React", "Tailwind CSS", "Figma", "Vercel"]
                },
                {
                    title: "Student Member (ACM BPPIMT Student Chapter)",
                    icon: <Users className='w-4 h-4' />,
                    type: "Membership",
                    location: "On-site",
                    startDate: "2023-07-01",
                    endDate: "2025-11-01",
                    description: [
                        "Active member of ACM student chapter",
                        "Received ACM Membership Certificate"
                    ],
                    skills: ["HTML", "CSS", "JavaScript"]
                },
                {
                    title: "Web Developer & Volunteer (TechStorm 2.24 & TechStorm 2.25)",
                    icon: <Code className='w-4 h-4' />,
                    type: "Volunteer",
                    location: "On-site",
                    startDate: "2024-02-01",
                    endDate: "2024-03-01",
                    description: [
                        "Designed, Developed and Deployed the landing page of TechStorm 2.24, the annual tech fest of BPPIMT",
                        "Simple frontend project with details of various events and their corresponding registration links provided",
                        "Volunteered in organising App Mania - App Development Competition"
                    ],
                    skills: ["HTML", "CSS", "JavaScript", "Shery JS", "Framer Motion", "Vercel", "GitHub", "GSAP", "Figma"]
                },
                {
                    title: "Multimedia Developer (AISC 2024 & AISC 2025)",
                    icon: <Award className='w-4 h-4' />,
                    type: "Volunteer",
                    location: "On-site",
                    startDate: "2023-09-01",
                    endDate: "2024-07-01",
                    description: [
                        "Designed, Developed and Deployed the landing page of International conference on Artificial Intelligence and Sustainable Computing (AISC) 2024 organised by BPPIMT, Kolkata and Calcutta University",
                        "Provided important information regarding the conference like the guidelines, schedule, call for papers(CFP), etc"
                    ],
                    skills: ["HTML", "CSS", "JavaScript"]
                }
            ]
        },
        {
            id: 4,
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX1yeYsgwSkn3PwgNe5RCiE4ugyBSE8_0WJg&s",
            companyName: "Education",
            isActive: false,
            positions: [
                {
                    title: "B.P. Poddar Institute of Management and Technology",
                    icon: <GiGraduateCap className='w-4 h-4' />,
                    type: "B.Tech in Information Technology",
                    location: "Kolkata",
                    startDate: "2022-08-01",
                    endDate: "∞",
                    skills: ["DSA", "OOPs Concepts", "DBMS", "Operating Systems", "Computer Networks", "Software Engineering", "Web Development", "Mobile App Development", "AI & ML"]
                },
                {
                    title: "St. Augustine's Day School",
                    icon: <GiGraduateCap className='w-4 h-4' />,
                    type: "Higher Secondary Education",
                    location: "Shyamnagar",
                    startDate: "2014-04-01",
                    endDate: "2022-04-01",
                    skills: ["Java", "QBASIC", "HTML"]
                },
            ]
        },
    ]

    // Initialize expanded positions - only expand the first experience (NRIFT)
    const [expandedPositions, setExpandedPositions] = useState(() => {
        const initialState = {}
        // Only expand the first experience (id: 1)
        const firstExp = experiences[0]
        if (firstExp && firstExp.positions && firstExp.positions.length > 0 && firstExp.positions[0].description && firstExp.positions[0].description.length > 0) {
            initialState[`${firstExp.id}-0`] = true
        }
        return initialState
    })

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

    const toggleExpand = (companyId, positionIdx) => {
        const key = `${companyId}-${positionIdx}`
        setExpandedPositions(prev => ({
            ...prev,
            [key]: !prev[key]
        }))
    }

    const BlinkingDot = () => (
        <span className='relative flex h-3 w-3'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
            <span className='relative inline-flex rounded-full h-3 w-3 bg-green-500'></span>
        </span>
    )

    return (
        <>
            <Heading title="Experience" />
            <div className='w-full border-dashed' style={{ borderBottomColor: 'var(--border-color)' }} data-experience>
                {/* Experiences */}
                <div className='w-full'>
                    {experiences.map((exp) => (
                        <div className='w-full border-b-2 border-dashed' style={{ borderBottomColor: 'var(--border-color)' }} key={exp.id}>
                            <div className='max-w-3xl mx-auto border-l-2 border-r-2 border-dashed py-4 px-2 md:px-4' style={{ borderColor: 'var(--border-color)' }}>
                                {/* Company Header */}
                                <div className='flex items-center gap-3'>
                                    <div className='w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-dashed' style={{ borderColor: 'var(--border-color)' }}>
                                        <img src={exp.logo} alt={exp.companyName} className='w-full h-full object-cover' />
                                    </div>

                                    <div className='flex-1'>
                                        <div className='flex items-center gap-2 flex-wrap'>
                                            <a
                                                href={exp.companyUrl}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                className='text-lg md:text-xl font-mono font-bold hover:underline inline-flex items-center gap-2'
                                                style={{ color: 'var(--text-primary)' }}
                                            >
                                                {exp.companyName}
                                            </a>
                                            {exp.isActive && <BlinkingDot />}
                                        </div>
                                    </div>
                                </div>

                                {/* Positions */}
                                <div className='space-y-4 ml-14 border-dashed pl-6' style={{ borderColor: 'var(--border-color)' }}>
                                    {exp.positions.map((position, idx) => {
                                        const duration = calculateDuration(position.startDate, position.endDate)
                                        const startDateFormatted = new Date(position.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
                                        const endDateFormatted = position.endDate === '∞' ? '∞' : new Date(position.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
                                        const isExpanded = expandedPositions[`${exp.id}-${idx}`] || false
                                        const hasDescription = position.description && position.description.length > 0
                                        const hasSkills = position.skills && position.skills.length > 0

                                        return (
                                            <div key={idx} className='space-y-2'>
                                                <div className='flex items-center justify-between'>
                                                    <div className='flex items-center gap-2'>
                                                        <span style={{ color: 'var(--text-secondary)' }}>{position.icon}</span>
                                                        <h3 className='text-base md:text-lg font-mono font-semibold' style={{ color: 'var(--text-primary)' }}>
                                                            {position.title}
                                                        </h3>
                                                    </div>
                                                    {hasDescription && (
                                                        <button
                                                            onClick={() => toggleExpand(exp.id, idx)}
                                                            className='p-1 rounded-md transition-all duration-200 hover:scale-110'
                                                            style={{ color: 'var(--text-secondary)' }}
                                                        >
                                                            {isExpanded ? <ChevronUp className='w-4 h-4' /> : <ChevronDown className='w-4 h-4' />}
                                                        </button>
                                                    )}
                                                </div>

                                                <div className='flex flex-wrap items-center gap-2 text-sm font-mono' style={{ color: 'var(--text-secondary)' }}>
                                                    <span className='px-2 py-0.5 rounded' style={{ backgroundColor: 'var(--bg-secondary)' }}>
                                                        {position.type}
                                                    </span>
                                                    <span>•</span>
                                                    <span>{startDateFormatted} - {endDateFormatted}</span>
                                                    <span>•</span>
                                                    <span className='inline-flex items-center gap-1'>
                                                        <Clock className='w-3 h-3' />
                                                        {duration}
                                                    </span>
                                                </div>

                                                {position.location && (
                                                    <div className='flex items-center gap-1 text-xs font-mono ml-[6px] mt-1' style={{ color: 'var(--text-secondary)' }}>
                                                        <MapPin className='w-3 h-3' />
                                                        <span>{position.location}</span>
                                                    </div>
                                                )}

                                                {/* Description - Only when expanded */}
                                                {isExpanded && hasDescription && (
                                                    <ul className='space-y-1 ml-6 mt-2'>
                                                        {position.description.map((point, pointIdx) => (
                                                            <li key={pointIdx} className='flex items-start gap-2 text-sm font-mono' style={{ color: 'var(--text-secondary)' }}>
                                                                <span className='mt-1.5 w-1 h-1 rounded-full flex-shrink-0' style={{ backgroundColor: 'var(--text-secondary)' }}></span>
                                                                <span>{point}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}

                                                {/* Skills - Always visible */}
                                                {hasSkills && (
                                                    <div className='flex flex-wrap gap-2'>
                                                        {position.skills.map((skill, skillIdx) => (
                                                            <span
                                                                key={skillIdx}
                                                                className='px-2 py-1 text-xs font-mono rounded-full'
                                                                style={{
                                                                    backgroundColor: 'var(--bg-secondary)',
                                                                    border: '1px solid var(--border-color)',
                                                                    color: 'var(--text-secondary)'
                                                                }}
                                                            >
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}


                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Experience