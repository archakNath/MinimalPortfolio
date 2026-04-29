import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react'
import mdxParser from '../../utils/mdxParser'
import blogUtils from '../../utils/blogUtils'
import CodeBlock from '../Common/CodeBlock'

const BlogPost = () => {
    const { slug } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [parsedContent, setParsedContent] = useState(null);

    useEffect(() => {
        if (post) {
            const rawHtml = mdxParser.parse(post.content);
            const processed = processCodeBlocks(rawHtml);
            setParsedContent(processed);
        }
    }, [post]);

    const processCodeBlocks = (htmlContent) => {
        // Split by code block markers
        const parts = [];
        let remaining = htmlContent;
        const regex = /\{\{CODE_BLOCK:(.*?):(.*?)\}\}/gs;
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(htmlContent)) !== null) {
            // Add HTML before code block
            if (match.index > lastIndex) {
                parts.push(<span key={`text-${lastIndex}`} dangerouslySetInnerHTML={{ __html: htmlContent.substring(lastIndex, match.index) }} />);
            }
            // Add CodeBlock component
            const language = match[1];
            const code = match[2];
            parts.push(<CodeBlock key={match.index} language={language}>{code}</CodeBlock>);
            lastIndex = match.index + match[0].length;
        }

        // Add remaining HTML
        if (lastIndex < htmlContent.length) {
            parts.push(<span key={`text-${lastIndex}`} dangerouslySetInnerHTML={{ __html: htmlContent.substring(lastIndex) }} />);
        }

        return parts;
    };

    useEffect(() => {
        loadPost()
    }, [slug])

    const loadPost = async () => {
        try {
            setLoading(true)
            const foundPost = await blogUtils.getPostBySlug(slug)

            if (!foundPost) {
                setError('Blog post not found')
                return
            }

            setPost(foundPost)
            setError(null)
        } catch (err) {
            console.error('Failed to load post:', err)
            setError('Failed to load blog post')
        } finally {
            setLoading(false)
        }
    }

    // Copy to clipboard function
    useEffect(() => {
        // Define the copy function globally
        window.copyToClipboard = (codeId) => {
            const codeElement = document.getElementById(codeId);
            if (codeElement) {
                const code = codeElement.innerText;
                navigator.clipboard.writeText(code).then(() => {
                    // Optional: Show a temporary success indicator
                    const btn = document.querySelector(`button[onclick="copyToClipboard('${codeId}')"]`);
                    if (btn) {
                        const originalHTML = btn.innerHTML;
                        btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor"/>
                    </svg>`;
                        setTimeout(() => {
                            btn.innerHTML = originalHTML;
                        }, 2000);
                    }
                }).catch(err => {
                    console.error('Failed to copy:', err);
                });
            }
        };

        return () => {
            delete window.copyToClipboard;
        };
    }, []);

    // Helper to get cover image URL
    const getCoverImageUrl = (coverImagePath) => {
        if (!coverImagePath) return null;

        // If it's a full URL, return as is
        if (coverImagePath.startsWith('http')) return coverImagePath;

        // Extract filename and fix path separators
        const filename = coverImagePath.split(/[\\/]/).pop(); // Handle both / and \

        // Images should be in public/blog/cover/
        return `/blog/cover/${filename}`;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        return `${day}.${month}.${year}`
    }

    if (loading) {
        return (
            <div className='w-full h-[80vh] flex items-center justify-center'>
                <p className='font-mono' style={{ color: 'var(--text-secondary)' }}>Loading post...</p>
            </div>
        )
    }

    if (error || !post) {
        return (
            <div className='w-full h-[80vh] flex items-center justify-center'>
                <div className='text-center'>
                    <p className='font-mono mb-4' style={{ color: 'var(--text-secondary)' }}>{error || 'Post not found'}</p>
                    <button
                        onClick={() => navigate('/blog')}
                        className='inline-flex items-center gap-2 px-3 py-1 rounded-lg font-mono text-sm transition-all duration-200'
                        style={{
                            backgroundColor: 'var(--bg-secondary)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-primary)'
                        }}
                    >
                        <ArrowLeft className='w-4 h-4' />
                        <span>Back to Blogs</span>
                    </button>
                </div>
            </div>
        )
    }

    return (
        <>
            {/* Header Section */}
            <div className='w-full border-b-2 border-dashed' style={{ borderColor: 'var(--border-color)' }}>
                <div className='max-w-3xl border-l-2 border-r-2 border-dashed mx-auto' style={{ borderLeftColor: 'var(--border-color)', borderRightColor: 'var(--border-color)' }}>
                    <div className='px-3 py-4'>
                        <button
                            onClick={() => navigate('/blog')}
                            className='inline-flex items-center gap-2 px-3 py-1 rounded-lg font-mono text-sm transition-all duration-200 mb-6'
                            style={{
                                backgroundColor: 'var(--bg-secondary)',
                                border: '1px solid var(--border-color)',
                                color: 'var(--text-primary)'
                            }}
                        >
                            <ArrowLeft className='w-4 h-4' />
                            <span>Back to Blogs</span>
                        </button>

                        <h1 className='text-2xl md:text-3xl font-mono font-bold mb-4' style={{ color: 'var(--text-primary)' }}>
                            {post.title}
                        </h1>

                        <div className='flex flex-wrap gap-4 text-sm font-mono mb-6' style={{ color: 'var(--text-secondary)' }}>
                            <div className='flex items-center gap-1'>
                                <Calendar className='w-4 h-4' />
                                <span>{formatDate(post.date)}</span>
                            </div>
                            <div className='flex items-center gap-1'>
                                <User className='w-4 h-4' />
                                <span>{post.author}</span>
                            </div>
                            {post.tags && post.tags.length > 0 && (
                                <div className='flex items-start gap-1'>
                                    <Tag className='w-4 h-4 flex-shrink-0 mt-0.5' />
                                    <div className='flex flex-wrap gap-2'>
                                        {post.tags.map(tag => (
                                            <span key={tag} className='px-2 py-0.5 rounded text-xs whitespace-nowrap' style={{ backgroundColor: 'var(--bg-secondary)' }}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {post.coverImage && (
                            <div className=' overflow-hidden rounded-lg'>
                                <img
                                    src={getCoverImageUrl(post.coverImage)}
                                    alt={post.title}
                                    className='w-full h-64 md:h-96 object-cover'
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        console.error('Failed to load image:', post.coverImage);
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className='w-full border-b-2 border-dashed' style={{ borderColor: 'var(--border-color)' }}>
                <div className='max-w-3xl border-l-2 border-r-2 border-dashed mx-auto' style={{ borderLeftColor: 'var(--border-color)', borderRightColor: 'var(--border-color)' }}>
                    <div className='px-3 py-8'>
                        <div
                            className="blog-content prose prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: mdxParser.parse(post.content) }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogPost