import React from 'react'
import { AiOutlineDotNet } from 'react-icons/ai'
import { FaDatabase } from 'react-icons/fa'
import { GrOracle } from 'react-icons/gr'
import { LiaCss3Alt } from 'react-icons/lia'
import { RiJavaFill } from 'react-icons/ri'
import { 
    SiReact, SiJavascript, SiTypescript, SiTailwindcss, SiNodedotjs, 
    SiPython, SiGit, SiGithub, SiVercel, SiMongodb, SiPostgresql,
    SiHtml5, SiNextdotjs, SiExpress,
    SiSpring,
    SiSpringboot,
    SiMysql
} from 'react-icons/si'
import { TbBrandCSharp, TbReport } from 'react-icons/tb'
import Heading from './Heading'

const Stack = () => {
    const techStack = [
    { name: "React", icon: <SiReact className='w-4 h-4' />, color: "#61DAFB" },
    { name: "JavaScript", icon: <SiJavascript className='w-4 h-4' />, color: "#F7DF1E" },
    { name: "TypeScript", icon: <SiTypescript className='w-4 h-4' />, color: "#3178C6" },
    { name: "Tailwind CSS", icon: <SiTailwindcss className='w-4 h-4' />, color: "#06B6D4" },
    { name: "Node.js", icon: <SiNodedotjs className='w-4 h-4' />, color: "#339933" },
    { name: "Python", icon: <SiPython className='w-4 h-4' />, color: "#3776AB" },
    { name: "Java", icon: <RiJavaFill className='w-4 h-4' />, color: "#007396" },
    { name: "C#", icon: <TbBrandCSharp className='w-4 h-4' />, color: "#239120" },
    { name: ".NET", icon: <AiOutlineDotNet className='w-4 h-4' />, color: "#512BD4" },
    { name: "Spring", icon: <SiSpring className='w-4 h-4' />, color: "#6DB33F" },
    { name: "Spring Boot", icon: <SiSpringboot className='w-4 h-4' />, color: "#6DB33F" },
    { name: "JSP", icon: <RiJavaFill className='w-4 h-4' />, color: "#007396" },
    { name: "Jasper Reports", icon: <TbReport className='w-4 h-4' />, color: "#B29A6B" },
    { name: "Git", icon: <SiGit className='w-4 h-4' />, color: "#F05032" },
    { name: "GitHub", icon: <SiGithub className='w-4 h-4' />, color: "#181717" },
    { name: "Vercel", icon: <SiVercel className='w-4 h-4' />, color: "#000000" },
    { name: "MongoDB", icon: <SiMongodb className='w-4 h-4' />, color: "#47A248" },
    { name: "PostgreSQL", icon: <SiPostgresql className='w-4 h-4' />, color: "#4169E1" },
    { name: "Oracle DB", icon: <GrOracle className='w-4 h-4' />, color: "#F80000" },
    { name: "MySQL", icon: <SiMysql className='w-4 h-4' />, color: "#4479A1" },
    { name: "Chroma DB", icon: <FaDatabase className='w-4 h-4' />, color: "#00A3E0" },
    { name: "HTML5", icon: <SiHtml5 className='w-4 h-4' />, color: "#E34F26" },
    { name: "CSS3", icon: <LiaCss3Alt className='w-4 h-4' />, color: "#1572B6" },
    { name: "Next.js", icon: <SiNextdotjs className='w-4 h-4' />, color: "#000000" },
    { name: "Express", icon: <SiExpress className='w-4 h-4' />, color: "#000000" }
]

    return (
        <>
        <Heading title="Stack"/>
        <div className='w-full border-b-2 border-dashed' style={{ borderBottomColor: 'var(--border-color)' }} data-stack>
            <div className='max-w-3xl border-l-2 border-r-2 border-dashed mx-auto' style={{ borderLeftColor: 'var(--border-color)', borderRightColor: 'var(--border-color)' }}>
                <div className='px-3 py-3'>
                    {/* Tags Container - Inline flex wrap */}
                    <div className='flex flex-wrap gap-1'>
                        {techStack.map((tech, index) => (
                            <div
                                key={index}
                                className='flex items-center gap-2 px-2 py-1 rounded-full transition-all duration-200 hover:scale-105'
                                style={{
                                    backgroundColor: 'var(--bg-secondary)',
                                    border: '1px solid var(--border-color)'
                                }}
                            >
                                <div style={{ color: tech.color }}>
                                    {tech.icon}
                                </div>
                                <span className='text-xs md:text-sm font-mono' style={{ color: 'var(--text-primary)' }}>
                                    {tech.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </>
        
    )
}

export default Stack