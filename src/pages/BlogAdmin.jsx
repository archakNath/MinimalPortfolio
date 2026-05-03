import React, { useState, useRef, useEffect } from 'react';
import {
    MDXEditor, headingsPlugin, listsPlugin, quotePlugin, thematicBreakPlugin, linkPlugin, imagePlugin, codeBlockPlugin, codeMirrorPlugin, toolbarPlugin, UndoRedo, BoldItalicUnderlineToggles, ListsToggle, Separator, InsertThematicBreak, BlockTypeSelect, CreateLink, InsertImage, linkDialogPlugin, diffSourcePlugin,
    markdownShortcutPlugin,
    directivesPlugin,
    frontmatterPlugin
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import './BlogAdmin.css';

const BlogAdmin = () => {
    const editorRef = useRef(null);
    const [markdown, setMarkdown] = useState('');
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState(null);
    const [directoryHandle, setDirectoryHandle] = useState(null);

    // Form fields
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [author, setAuthor] = useState('');
    const [tags, setTags] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [status, setStatus] = useState('draft');
    const [hasUserInteracted, setHasUserInteracted] = useState(false);

    // Restore connection on page load
    useEffect(() => {
        const restoreConnection = async () => {
            const savedHandle = await loadDirectoryHandle();
            if (savedHandle) {
                // Connection restored automatically
                console.log('Connection restored from previous session');
            }
        };
        restoreConnection();
    }, []);

    // Load posts when directory is available
    useEffect(() => {
        if (directoryHandle) {
            loadPosts();
        }
    }, [directoryHandle]);

    // Request access to the Blog folder
    const requestDirectoryAccess = async () => {
        try {
            const dirHandle = await window.showDirectoryPicker();
            let blogHandle = dirHandle;

            if (dirHandle.name !== 'Blog') {
                try {
                    blogHandle = await dirHandle.getDirectoryHandle('Blog');
                } catch {
                    blogHandle = await dirHandle.getDirectoryHandle('Blog', { create: true });
                }
            }

            setDirectoryHandle(blogHandle);
            localStorage.setItem('blog_was_connected', 'true'); // Save connection state
            showNotification('success', 'Connected to /src/content/Blog folder');
        } catch (error) {
            console.error('Failed to access directory:', error);
            showNotification('error', 'Please select your /src/content/Blog folder');
        }
    };

    // Generate slug from title
    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    // Handle title change
    const handleTitleChange = (newTitle) => {
        setTitle(newTitle);
        if (!selectedPost) {
            setSlug(generateSlug(newTitle));
        }
    };

    // Load all MDX files from the Blog folder
    const loadPosts = async () => {
        if (!directoryHandle) return;

        setIsLoading(true);
        const loadedPosts = [];

        try {
            for await (const entry of directoryHandle.values()) {
                if (entry.kind === 'file' && entry.name.endsWith('.mdx')) {
                    const file = await entry.getFile();
                    const content = await file.text();
                    const slug = entry.name.replace('.mdx', '');

                    // Parse frontmatter
                    const frontmatter = parseFrontmatter(content);

                    loadedPosts.push({
                        id: slug,
                        slug: slug,
                        title: frontmatter.title || slug,
                        excerpt: frontmatter.excerpt || '',
                        date: frontmatter.date || new Date().toISOString(),
                        author: frontmatter.author || '',
                        tags: frontmatter.tags || [],
                        coverImage: frontmatter.coverImage || '',
                        status: frontmatter.status || 'draft',
                        content: frontmatter.content,
                        fileHandle: entry
                    });
                }
            }

            // Sort by date descending
            loadedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
            setPosts(loadedPosts);
        } catch (error) {
            console.error('Failed to load posts:', error);
            showNotification('error', 'Failed to load posts');
        } finally {
            setIsLoading(false);
        }
    };

    // Parse frontmatter from MDX content
    const parseFrontmatter = (content) => {
        const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
        const match = content.match(frontmatterRegex);

        if (match) {
            const frontmatterText = match[1];
            const mdxContent = match[2];
            const frontmatter = {};

            // Parse YAML-like frontmatter
            const lines = frontmatterText.split('\n');
            lines.forEach(line => {
                const colonIndex = line.indexOf(':');
                if (colonIndex > 0) {
                    const key = line.substring(0, colonIndex).trim();
                    let value = line.substring(colonIndex + 1).trim();

                    // Remove quotes if present
                    if (value.startsWith('"') && value.endsWith('"')) {
                        value = value.slice(1, -1);
                    }

                    // Parse arrays (tags)
                    if (value.startsWith('[') && value.endsWith(']')) {
                        value = value.slice(1, -1).split(',').map(v => v.trim().replace(/['"]/g, ''));
                    }

                    frontmatter[key] = value;
                }
            });

            return { ...frontmatter, content: mdxContent };
        }

        return { content };
    };

    // Generate frontmatter string (without duplication)
    const generateFrontmatter = () => {
        const date = selectedPost?.date || new Date().toISOString();
        const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
        const tagsStr = tagsArray.length ? tagsArray.map(tag => `"${tag}"`).join(', ') : '';

        return `---
title: "${title.replace(/"/g, '\\"')}"
date: "${date}"
author: "${author || 'Admin'}"
excerpt: "${excerpt.replace(/"/g, '\\"')}"
tags: [${tagsStr}]
status: "${status}"
coverImage: "${coverImage}"
---

`;
    };



    // Save MDX file directly to the Blog folder
    const savePost = async () => {
        console.log('=== savePost started ===');
        console.log('directoryHandle exists?', !!directoryHandle);
        console.log('isEditing:', isEditing);
        console.log('slug:', slug);

        if (!directoryHandle) {
            console.log('No directory handle, requesting access...');
            showNotification('error', 'Please connect to the Blog folder first');
            requestDirectoryAccess();
            return;
        }

        if (!title || !slug) {
            console.log('Missing title or slug');
            showNotification('error', 'Title and slug are required');
            return;
        }

        const content = editorRef.current?.getMarkdown() || markdown;
        const fullContent = generateFrontmatter() + content;
        const fileName = `${slug}.mdx`;

        console.log('fileName:', fileName);
        console.log('fullContent length:', fullContent.length);

        setIsLoading(true);

        // Store the current directory handle reference
        const currentHandle = directoryHandle;
        console.log('currentHandle name:', currentHandle.name);

        try {
            // Create or get the file handle
            let fileHandle;
            try {
                console.log('Attempting to get file handle...');
                fileHandle = await currentHandle.getFileHandle(fileName, { create: true });
                console.log('File handle obtained successfully');
            } catch (error) {
                console.error('Error getting file handle:', error);
                fileHandle = await currentHandle.getFileHandle(fileName);
            }

            console.log('Creating writable stream...');
            const writable = await fileHandle.createWritable();
            console.log('Writing content...');
            await writable.write(fullContent);
            console.log('Closing writable...');
            await writable.close();
            console.log('File written successfully');

            showNotification('success', isEditing ? 'Post updated successfully' : 'Post created successfully');

            // Check if directory handle is still valid
            console.log('Checking directory handle validity...');
            console.log('directoryHandle still exists?', !!directoryHandle);
            console.log('directoryHandle name:', directoryHandle?.name);

            // Verify directory handle still works
            try {
                await directoryHandle.requestPermission({ mode: 'readwrite' });
                console.log('Directory permission verified');
            } catch (permError) {
                console.error('Directory permission lost:', permError);
                // Reconnect if permission lost
                await requestDirectoryAccess();
            }

            // Reload posts
            console.log('Reloading posts...');
            await loadPosts();
            console.log('Posts reloaded, count:', posts.length);

            // If editing, update the selected post with new data
            if (isEditing) {
                console.log('Looking for updated post with slug:', slug);
                const updatedPost = posts.find(p => p.slug === slug);
                if (updatedPost) {
                    console.log('Found updated post:', updatedPost.title);
                    setSelectedPost(updatedPost);
                } else {
                    console.log('Updated post not found in posts array');
                }
            } else {
                console.log('Clearing form for new post');
                clearForm();
            }
        } catch (error) {
            console.error('Failed to save post - FULL ERROR:', error);
            console.error('Error name:', error.name);
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
            showNotification('error', 'Failed to save post. Check folder permissions.');

            // If error indicates invalid handle, reconnect
            if (error.name === 'InvalidStateError' || error.message.includes('handle')) {
                console.log('Attempting to reconnect to folder...');
                await requestDirectoryAccess();
            }
        } finally {
            setIsLoading(false);
            console.log('=== savePost completed ===');
        }
    };

    // Save directory handle to IndexedDB
    const saveDirectoryHandle = async (handle) => {
        try {
            const db = await openDB();
            const tx = db.transaction('handles', 'readwrite');
            const store = tx.objectStore('handles');
            await store.put(handle, 'blogFolder');
            await tx.done;
            console.log('Directory handle saved to IndexedDB');
        } catch (error) {
            console.error('Failed to save handle:', error);
        }
    };

    // Simplified - don't try to restore handle, just show message
    const loadDirectoryHandle = async () => {
        // Check if user had previously connected
        const wasConnected = localStorage.getItem('blog_was_connected');
        if (wasConnected === 'true') {
            showNotification('info', 'Please click "Reconnect" to restore your Blog folder connection');
        }
        return null;
    };

    // Open IndexedDB
    const openDB = () => {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('BlogAdminDB', 1);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('handles')) {
                    db.createObjectStore('handles');
                }
            };
        });
    };

    const refreshConnection = async () => {
        console.log('Manual refresh - reconnecting...');
        // Clear the current handle and request new one
        setDirectoryHandle(null);
        await requestDirectoryAccess();
    };

    const debugLog = (message, data = null) => {
        const logs = JSON.parse(localStorage.getItem('blog_debug_logs') || '[]');
        logs.push({
            timestamp: new Date().toISOString(),
            message,
            data: data ? JSON.stringify(data) : null
        });
        // Keep last 50 logs
        while (logs.length > 50) logs.shift();
        localStorage.setItem('blog_debug_logs', JSON.stringify(logs));
        console.log(message, data);
    };

    // Load a post for editing
    const loadPost = async (post) => {
        setIsLoading(true);
        try {
            // If we have the file handle, read fresh content
            if (post.fileHandle) {
                const file = await post.fileHandle.getFile();
                const content = await file.text();
                const parsed = parseFrontmatter(content);

                setSelectedPost(post);
                setTitle(parsed.title || post.title);
                setSlug(post.slug);
                setExcerpt(parsed.excerpt || '');
                setAuthor(parsed.author || '');
                setTags((parsed.tags || []).join(', '));
                setCoverImage(parsed.coverImage || '');
                setStatus(parsed.status || 'draft');
                setMarkdown(parsed.content || '');
                setIsEditing(true);

                if (editorRef.current) {
                    editorRef.current.setMarkdown(parsed.content || '');
                }
            } else {
                // Fallback to stored post data
                setSelectedPost(post);
                setTitle(post.title);
                setSlug(post.slug);
                setExcerpt(post.excerpt || '');
                setAuthor(post.author || '');
                setTags((post.tags || []).join(', '));
                setCoverImage(post.coverImage || '');
                setStatus(post.status || 'draft');
                setMarkdown(post.content || '');
                setIsEditing(true);

                if (editorRef.current) {
                    editorRef.current.setMarkdown(post.content || '');
                }
            }
        } catch (error) {
            console.error('Failed to load post:', error);
            showNotification('error', 'Failed to load post');
        } finally {
            setIsLoading(false);
        }
    };

    // Delete a post
    const deletePost = async (slug) => {
        if (!directoryHandle) return;
        if (!confirm('Are you sure you want to delete this post?')) return;

        setIsLoading(true);
        try {
            await directoryHandle.removeEntry(`${slug}.mdx`);
            showNotification('success', 'Post deleted successfully');
            await loadPosts();
            if (selectedPost?.slug === slug) {
                clearForm();
            }
        } catch (error) {
            console.error('Failed to delete post:', error);
            showNotification('error', 'Failed to delete post');
        } finally {
            setIsLoading(false);
        }
    };

    // Clear the form
    const clearForm = () => {
        setSelectedPost(null);
        setIsEditing(false);
        setTitle('');
        setSlug('');
        setExcerpt('');
        setAuthor('');
        setTags('');
        setCoverImage('');
        setStatus('draft');
        setMarkdown('');
        if (editorRef.current) {
            editorRef.current.setMarkdown('');
        }
    };

    // Show notification
    const showNotification = (type, message) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 3000);
    };

    return (
        <div className="blog-admin-container">
            <div className="blog-admin-header">
                <h1>Blog Administration</h1>
                <div className="header-actions">
                    {!directoryHandle ? (
                        <button
                            onClick={async () => {
                                setHasUserInteracted(true);
                                await requestDirectoryAccess();
                            }}
                            className="btn-primary"
                        >
                            📁 Connect to /src/content/Blog Folder
                        </button>
                    ) : (
                        <>
                            <span className="folder-status">✅ Connected to: {directoryHandle.name}</span>
                            <button onClick={clearForm} className="btn-secondary">
                                + New Post
                            </button>
                            <button onClick={refreshConnection} className="btn-secondary" style={{ marginLeft: '10px' }}>
                                🔄 Reconnect
                            </button>
                        </>
                    )}
                </div>
            </div>

            {notification && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}

            {!directoryHandle && (
                <div className="folder-prompt">
                    <p>Please click "Connect Blog Folder" and select your <strong>/src/content/Blog</strong> folder</p>
                    <button onClick={requestDirectoryAccess} className="btn-primary">
                        Select Blog Folder
                    </button>
                </div>
            )}

            {directoryHandle && (
                <div className="blog-admin-content">
                    {/* Sidebar */}
                    <div className="blog-posts-sidebar">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px' }}>
                            <h2 style={{ margin: 0 }}>All Posts ({posts.length})</h2>
                            <button
                                onClick={() => loadPosts()}
                                style={{ padding: '4px 8px', cursor: 'pointer' }}
                                title="Refresh posts"
                            >
                                🔄
                            </button>
                        </div>
                        <div className="posts-list">
                            {posts.map((post) => (
                                <div
                                    key={post.id}
                                    className={`post-item ${selectedPost?.id === post.id ? 'active' : ''}`}
                                    onClick={() => loadPost(post)}
                                >
                                    <div className="post-title">{post.title}</div>
                                    <div className="post-meta">
                                        <span className="post-date">
                                            {new Date(post.date).toLocaleDateString()}
                                        </span>
                                        <span className={`post-status ${post.status}`}>
                                            {post.status}
                                        </span>
                                    </div>
                                    <button
                                        className="delete-post-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deletePost(post.slug);
                                        }}
                                    >
                                        🗑️
                                    </button>
                                </div>
                            ))}
                            {posts.length === 0 && (
                                <div className="no-posts">
                                    No posts yet. Create your first post!
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Editor */}
                    <div className="blog-editor-area">
                        {isLoading ? (
                            <div className="loading">Loading...</div>
                        ) : (
                            <div className="editor-container">
                                <div className="metadata-form">
                                    <div className="form-group">
                                        <label>Title *</label>
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(e) => handleTitleChange(e.target.value)}
                                            placeholder="Enter post title"
                                        />
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Slug *</label>
                                            <input
                                                type="text"
                                                value={slug}
                                                onChange={(e) => setSlug(generateSlug(e.target.value))}
                                                placeholder="url-friendly-name"
                                                disabled={isEditing}
                                            />
                                            <small>Filename: {slug}.mdx</small>
                                        </div>

                                        <div className="form-group">
                                            <label>Author</label>
                                            <input
                                                type="text"
                                                value={author}
                                                onChange={(e) => setAuthor(e.target.value)}
                                                placeholder="Author name"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Tags (comma-separated)</label>
                                            <input
                                                type="text"
                                                value={tags}
                                                onChange={(e) => setTags(e.target.value)}
                                                placeholder="react, javascript, tutorial"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Status</label>
                                            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                                <option value="draft">Draft</option>
                                                <option value="published">Published</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Cover Image URL (optional)</label>
                                        <input
                                            type="text"
                                            value={coverImage}
                                            onChange={(e) => setCoverImage(e.target.value)}
                                            placeholder="/blog/cover/your-image.jpg"
                                        />
                                        <small style={{ display: 'block', marginTop: '5px', color: 'var(--text-secondary)' }}>
                                            Place images in: public/blog/cover/ folder
                                        </small>
                                    </div>

                                    <div className="form-group">
                                        <label>Excerpt</label>
                                        <textarea
                                            value={excerpt}
                                            onChange={(e) => setExcerpt(e.target.value)}
                                            placeholder="Brief description of the post..."
                                            rows={3}
                                        />
                                    </div>
                                </div>

                                <div className="mdx-editor-wrapper">
                                    <label>Content (Markdown with MDX support)</label>
                                    <MDXEditor
                                        ref={editorRef}
                                        markdown={markdown}
                                        onChange={setMarkdown}
                                        plugins={[
                                            headingsPlugin(),
                                            listsPlugin(),
                                            quotePlugin(),
                                            thematicBreakPlugin(),
                                            linkPlugin(),
                                            imagePlugin(),
                                            codeBlockPlugin({ defaultCodeBlockLanguage: 'javascript' }),
                                            codeMirrorPlugin({
                                                codeBlockLanguages: {
                                                    js: 'JavaScript',
                                                    jsx: 'JSX',
                                                    ts: 'TypeScript',
                                                    tsx: 'TSX',
                                                    css: 'CSS',
                                                    html: 'HTML',
                                                    json: 'JSON',
                                                    bash: 'Bash',
                                                    java: 'Java',
                                                },
                                            }),
                                            linkDialogPlugin(),
                                            diffSourcePlugin({      // ADD THIS - enables markdown preview/source toggle
                                                diffMarkdown: '',
                                                viewMode: 'rich-text',  // 'rich-text' for WYSIWYG, 'source' for markdown
                                            }),
                                            markdownShortcutPlugin(),  // ADD THIS - enables markdown shortcuts (like # for heading)
                                            directivesPlugin(),        // ADD THIS
                                            frontmatterPlugin(),       // ADD THIS - handles frontmatter properly
                                            toolbarPlugin({
                                                toolbarContents: () => (
                                                    <>
                                                        <UndoRedo />
                                                        <Separator />
                                                        <BoldItalicUnderlineToggles />
                                                        <Separator />
                                                        <ListsToggle />
                                                        <Separator />
                                                        <BlockTypeSelect />
                                                        <Separator />
                                                        <CreateLink />
                                                        <InsertImage />
                                                        <Separator />
                                                        <InsertThematicBreak />
                                                    </>
                                                ),
                                            }),
                                        ]}
                                    />
                                </div>

                                <div className="editor-actions">
                                    <button onClick={savePost} disabled={isLoading} className="btn-primary">
                                        {isEditing ? 'Update Post' : 'Create Post'}
                                    </button>
                                    {isEditing && (
                                        <button onClick={clearForm} className="btn-secondary">
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogAdmin;