import React, { useState, useEffect } from 'react'
import { Briefcase, GraduationCap, MapPin, Clock, Mail, Globe, User, Copy, Check } from 'lucide-react'

const Details = () => {
    const [kolkataTime, setKolkataTime] = useState('')
    const [timeDifference, setTimeDifference] = useState('')
    const [showTooltip, setShowTooltip] = useState(false)
    const [showEmailCopy, setShowEmailCopy] = useState(false)
    const [emailCopied, setEmailCopied] = useState(false)

    useEffect(() => {
        const updateTime = () => {
            // Get current time in Kolkata (GMT+5:30)
            const now = new Date()
            const kolkataOffset = 5.5 * 60 * 60 * 1000 // 5 hours 30 minutes in milliseconds
            const utcTime = now.getTime() + (now.getTimezoneOffset() * 60 * 1000)
            const kolkataTimeObj = new Date(utcTime + kolkataOffset)
            
            // Format Kolkata time
            const formattedTime = kolkataTimeObj.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            })
            setKolkataTime(formattedTime)
            
            // Calculate time difference from user's local time
            const userOffset = now.getTimezoneOffset() // in minutes
            const kolkataOffsetMinutes = 330 // 5:30 = 330 minutes
            const diffMinutes = kolkataOffsetMinutes + userOffset // User offset is negative of GMT
            
            const diffHours = Math.floor(Math.abs(diffMinutes) / 60)
            const diffMins = Math.abs(diffMinutes) % 60
            
            let diffText = ''
            if (diffMinutes > 0) {
                if (diffMins === 0) {
                    diffText = `${diffHours}h ahead`
                } else {
                    diffText = `${diffHours}h ${diffMins}m ahead`
                }
            } else if (diffMinutes < 0) {
                if (diffMins === 0) {
                    diffText = `${diffHours}h behind`
                } else {
                    diffText = `${diffHours}h ${diffMins}m behind`
                }
            } else {
                diffText = 'same timezone'
            }
            
            setTimeDifference(diffText)
        }
        
        updateTime()
        const interval = setInterval(updateTime, 60000) // Update every minute
        
        return () => clearInterval(interval)
    }, [])

    const copyToClipboard = async (text, type) => {
        try {
            await navigator.clipboard.writeText(text)
            if (type === 'email') {
                setEmailCopied(true)
                setTimeout(() => setEmailCopied(false), 2000)
            }
        } catch (err) {
            console.error('Failed to copy: ', err)
        }
    }

    return (
        <div className='w-full border-b-2 border-dashed' style={{ borderBottomColor: 'var(--border-color)' }} data-details>
            <div className='max-w-3xl mx-auto border-l-2 border-r-2 border-dashed' style={{ borderLeftColor: 'var(--border-color)', borderRightColor: 'var(--border-color)' }}>
                <div>
                    {/* 2x2 Grid */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-3'>
                        {/* Item 1: Current Role - Full width on first row */}
                        <div className='md:col-span-2 flex items-start gap-3 transition-all duration-200'>
                            <div className='flex-shrink-0 p-2 rounded-lg' style={{ 
                                backgroundColor: 'var(--bg-secondary)',
                                color: 'var(--text-secondary)'
                            }}>
                                <Briefcase className='w-5 h-5' />
                            </div>
                            <div className='flex flex-col flex-1'>
                                <span className='text-xs font-mono uppercase tracking-wide mb-1' style={{ color: 'var(--text-secondary)' }}>
                                    Current Role
                                </span>
                                <span className='text-sm md:text-base font-mono' style={{ color: 'var(--text-primary)' }}>
                                    Associate Software Engineer Trainee @ <a href="https://www.nrifintech.com/" target='_blank' rel='noopener noreferrer' className='hover:underline'>NRIFT</a>
                                </span>
                            </div>
                        </div>

                        {/* Item 2: Time with Tooltip */}
                        <div className='flex items-start gap-3 transition-all duration-200 relative'>
                            <div className='flex-shrink-0 p-2 rounded-lg' style={{ 
                                backgroundColor: 'var(--bg-secondary)',
                                color: 'var(--text-secondary)'
                            }}>
                                <Clock className='w-5 h-5' />
                            </div>
                            <div className='flex flex-col flex-1'>
                                <span className='text-xs font-mono uppercase tracking-wide mb-1' style={{ color: 'var(--text-secondary)' }}>
                                    Time
                                </span>
                                <div 
                                    className='relative inline-block'
                                    onMouseEnter={() => setShowTooltip(true)}
                                    onMouseLeave={() => setShowTooltip(false)}
                                >
                                    <span className='text-sm md:text-base font-mono cursor-help' style={{ color: 'var(--text-primary)' }}>
                                        {kolkataTime} // {timeDifference}
                                    </span>
                                    
                                    {/* Tooltip */}
                                    {showTooltip && (
                                        <div className='absolute bottom-full left-0 mb-2 z-10'>
                                            <div className='px-2 py-1 text-xs font-mono whitespace-nowrap rounded shadow-lg'
                                                style={{
                                                    backgroundColor: 'var(--bg-secondary)',
                                                    color: 'var(--text-primary)',
                                                    border: '1px solid var(--border-color)'
                                                }}>
                                                GMT+5:30 / Kolkata
                                            </div>
                                            <div className='absolute top-full left-4'
                                                style={{
                                                    width: 0,
                                                    height: 0,
                                                    borderLeft: '5px solid transparent',
                                                    borderRight: '5px solid transparent',
                                                    borderTop: `5px solid var(--border-color)`
                                                }}></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Item 3: Location */}
                        <div className='flex items-start gap-3 transition-all duration-200'>
                            <div className='flex-shrink-0 p-2 rounded-lg' style={{ 
                                backgroundColor: 'var(--bg-secondary)',
                                color: 'var(--text-secondary)'
                            }}>
                                <MapPin className='w-5 h-5' />
                            </div>
                            <div className='flex flex-col flex-1'>
                                <span className='text-xs font-mono uppercase tracking-wide mb-1' style={{ color: 'var(--text-secondary)' }}>
                                    Location
                                </span>
                                <span className='text-sm md:text-base font-mono' style={{ color: 'var(--text-primary)' }}>
                                    <a href="https://maps.app.goo.gl/5UhcpbHFpDTHpDRQ9" target='_blank' rel='noopener noreferrer' className='hover:underline'>Kolkata, IN</a>
                                </span>
                            </div>
                        </div>

                        {/* Item 4: Education */}
                        <div className='flex items-start gap-3 transition-all duration-200'>
                            <div className='flex-shrink-0 p-2 rounded-lg' style={{ 
                                backgroundColor: 'var(--bg-secondary)',
                                color: 'var(--text-secondary)'
                            }}>
                                <GraduationCap className='w-5 h-5' />
                            </div>
                            <div className='flex flex-col flex-1'>
                                <span className='text-xs font-mono uppercase tracking-wide mb-1' style={{ color: 'var(--text-secondary)' }}>
                                    Education
                                </span>
                                <span className='text-sm md:text-base font-mono' style={{ color: 'var(--text-primary)' }}>
                                    B.Tech in IT
                                </span>
                            </div>
                        </div>

                        {/* Item 5: Email with Copy Icon */}
                        <div 
                            className='flex items-start gap-3 transition-all duration-200'
                            onMouseEnter={() => setShowEmailCopy(true)}
                            onMouseLeave={() => setShowEmailCopy(false)}
                        >
                            <div className='flex-shrink-0 p-2 rounded-lg' style={{ 
                                backgroundColor: 'var(--bg-secondary)',
                                color: 'var(--text-secondary)'
                            }}>
                                <Mail className='w-5 h-5' />
                            </div>
                            <div className='flex flex-col flex-1'>
                                <span className='text-xs font-mono uppercase tracking-wide mb-1' style={{ color: 'var(--text-secondary)' }}>
                                    Email
                                </span>
                                <div className='flex items-center gap-2'>
                                    <span className='text-sm md:text-base font-mono' style={{ color: 'var(--text-primary)' }}>
                                        <a href="mailto:archak.nath2004@gmail.com" className='hover:underline'>archak.nath2004@gmail.com</a>
                                    </span>
                                    {showEmailCopy && (
                                        <button
                                            onClick={() => copyToClipboard('archak.nath2004@gmail.com', 'email')}
                                            className='p-1 rounded-md transition-all duration-100'
                                            style={{ color: 'var(--text-secondary)' }}
                                        >
                                            {emailCopied ? (
                                                <Check className='w-4 h-4 text-green-500' />
                                            ) : (
                                                <Copy className='w-4 h-4 cursor-pointer' />
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Item 6: Website */}
                        <div className='flex items-start gap-3 transition-all duration-200'>
                            <div className='flex-shrink-0 p-2 rounded-lg' style={{ 
                                backgroundColor: 'var(--bg-secondary)',
                                color: 'var(--text-secondary)'
                            }}>
                                <Globe className='w-5 h-5' />
                            </div>
                            <div className='flex flex-col flex-1'>
                                <span className='text-xs font-mono uppercase tracking-wide mb-1' style={{ color: 'var(--text-secondary)' }}>
                                    Website
                                </span>
                                <span className='text-sm md:text-base font-mono' style={{ color: 'var(--text-primary)' }}>
                                    <a href="https://archaknath.in" target='_blank' rel='noopener noreferrer' className='hover:underline'>archaknath.in</a>
                                </span>
                            </div>
                        </div>

                        {/* Item 7: Pronouns */}
                        <div className='flex items-start gap-3 transition-all duration-200'>
                            <div className='flex-shrink-0 p-2 rounded-lg' style={{ 
                                backgroundColor: 'var(--bg-secondary)',
                                color: 'var(--text-secondary)'
                            }}>
                                <User className='w-5 h-5' />
                            </div>
                            <div className='flex flex-col flex-1'>
                                <span className='text-xs font-mono uppercase tracking-wide mb-1' style={{ color: 'var(--text-secondary)' }}>
                                    Pronouns
                                </span>
                                <span className='text-sm md:text-base font-mono' style={{ color: 'var(--text-primary)' }}>
                                    he/him
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details