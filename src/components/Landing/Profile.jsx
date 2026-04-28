import React, { useState, useEffect } from 'react'
import { BadgeCheck, Volume2 } from 'lucide-react'

const Profile = () => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    
    const texts = [
        "Software Engineer",
        "Crafting & improving systems for tomorrow."
    ]
    
    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true)
            setTimeout(() => {
                setCurrentTextIndex((prev) => (prev + 1) % texts.length)
                setIsAnimating(false)
            }, 500) // Half of the animation duration
        }, 3000) // Change text every 3 seconds
        
        return () => clearInterval(interval)
    }, [])
    
    const speakName = () => {
        // Using Web Speech API for pronunciation
        const utterance = new SpeechSynthesisUtterance("R-Chuck Naath")
        utterance.lang = "en-US"
        utterance.rate = 0.8
        window.speechSynthesis.speak(utterance)
    }
    
    // Alternative: If you have an audio file
    // const speakName = () => {
    //     const audio = new Audio('/pronunciation.mp3')
    //     audio.play()
    // }

    return (
        <div className='w-full border-b-2 border-dashed' style={{ borderBottomColor: 'var(--border-color)' }} data-profile>
            <div className='max-w-3xl mx-auto border-l-2 border-r-2 border-dashed' style={{ borderLeftColor: 'var(--border-color)', borderRightColor: 'var(--border-color)' }}>
                <div className='flex items-end'>
                    <div className='border-r-2 border-dashed p-2' style={{ borderLeftColor: 'var(--border-color)', borderRightColor: 'var(--border-color)' }}>
                        <div className='w-25 h-25 md:w-30 md:h-30 rounded-full overflow-hidden border-2 border-dashed' style={{ borderColor: 'var(--border-color)' }}>
                            {/* Circular Image */}
                            <div className='rounded-full m-1 overflow-hidden'>
                                <img
                                    src="/profile.jpg"
                                    alt="Profile"
                                    className='w-full h-full object-cover'
                                />
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col w-full'>
                        <div className='border-t-2 p-2 border-dashed' style={{ borderTopColor: 'var(--border-color)' }}>
                            {/* Name with Badge and Speaker Icon */}
                            <div className='flex items-center gap-2 flex-wrap'>
                                <h1 className='text-xl md:text-2xl lg:text-3xl font-bold font-mono' style={{ color: 'var(--text-primary)' }}>
                                    Archak Nath
                                </h1>
                                
                                {/* Blue Verification Badge */}
                                <BadgeCheck className='w-6 h-6 md:w-7 md:h-7 text-blue-500' fill="#3b83f631" />
                                
                                {/* Speaker Icon for Pronunciation */}
                                <button
                                    onClick={speakName}
                                    className='p-1 rounded-md hover:bg-[#ffffff31] transition-colors cursor-pointer'
                                    aria-label="Pronounce my name"
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    <Volume2 className='w-5 h-5 md:w-6 md:h-6' />
                                </button>
                            </div>
                        </div>

                        <div className='border-t-2 p-2 border-dashed' style={{ borderTopColor: 'var(--border-color)' }}>
                            {/* Animated Job Title */}
                            <div className='relative h-6 overflow-hidden'>
                                <p 
                                    className={`text-base font-mono absolute transition-all duration-500 ${
                                        isAnimating 
                                            ? 'animate-fade-out-up' 
                                            : 'animate-fade-in-down'
                                    }`}
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    {texts[currentTextIndex]}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile