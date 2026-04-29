// src/utils/blogUtils.js

/**
 * Blog Utilities - Handles reading and parsing MDX blog posts
 * Uses Vite's glob import for static analysis
 */

class BlogUtils {
    constructor() {
        this.posts = [];
        this.isInitialized = false;
    }

    /**
     * Initialize blog posts by importing all MDX files
     * Uses Vite's import.meta.glob for dynamic imports
     */
    async initialize() {
        if (this.isInitialized) return this.posts;

        try {
            // Import all MDX files from the Blog folder
            const modules = import.meta.glob('/src/content/Blog/*.mdx', { 
                query: '?raw', 
                import: 'default' 
            });

            const posts = [];

            for (const [path, importer] of Object.entries(modules)) {
                const content = await importer();
                const slug = path.split('/').pop().replace('.mdx', '');
                const parsed = this.parseFrontmatter(content);
                
                posts.push({
                    id: slug,
                    slug: slug,
                    title: parsed.title || slug,
                    excerpt: parsed.excerpt || '',
                    description: parsed.excerpt || '',
                    date: parsed.date || new Date().toISOString(),
                    author: parsed.author || 'Admin',
                    tags: parsed.tags || [],
                    coverImage: parsed.coverImage || '',
                    status: parsed.status || 'draft',
                    content: parsed.content,
                    image: parsed.coverImage || this.getRandomPlaceholderImage(),
                });
            }

            // Sort by date descending
            posts.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            // Filter only published posts for public view
            this.posts = posts.filter(post => post.status === 'published');
            this.isInitialized = true;
            
            console.log(`Loaded ${this.posts.length} published blog posts`);
            return this.posts;
        } catch (error) {
            console.error('Failed to initialize blog posts:', error);
            return [];
        }
    }

    /**
     * Parse frontmatter from MDX content
     */
    parseFrontmatter(content) {
        const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
        const match = content.match(frontmatterRegex);

        if (match) {
            const frontmatterText = match[1];
            const mdxContent = match[2];
            const frontmatter = {};

            const lines = frontmatterText.split('\n');
            lines.forEach(line => {
                const colonIndex = line.indexOf(':');
                if (colonIndex > 0) {
                    const key = line.substring(0, colonIndex).trim();
                    let value = line.substring(colonIndex + 1).trim();

                    if (value.startsWith('"') && value.endsWith('"')) {
                        value = value.slice(1, -1);
                    }

                    if (value.startsWith('[') && value.endsWith(']')) {
                        value = value.slice(1, -1).split(',').map(v => v.trim().replace(/['"]/g, ''));
                    }

                    frontmatter[key] = value;
                }
            });

            return { ...frontmatter, content: mdxContent };
        }

        return { content };
    }

    /**
     * Get random placeholder image for posts without cover image
     */
    getRandomPlaceholderImage() {
        const images = [
            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
        ];
        return images[Math.floor(Math.random() * images.length)];
    }

    /**
     * Get all published posts
     */
    async getAllPosts() {
        if (!this.isInitialized) {
            await this.initialize();
        }
        return this.posts;
    }

    /**
     * Get a single post by slug
     */
    async getPostBySlug(slug) {
        if (!this.isInitialized) {
            await this.initialize();
        }
        return this.posts.find(post => post.slug === slug) || null;
    }

    /**
     * Search posts by query
     */
    async searchPosts(query) {
        if (!this.isInitialized) {
            await this.initialize();
        }
        
        const lowerQuery = query.toLowerCase();
        return this.posts.filter(post => 
            post.title.toLowerCase().includes(lowerQuery) ||
            post.excerpt.toLowerCase().includes(lowerQuery) ||
            post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        );
    }

    /**
     * Get posts by tag
     */
    async getPostsByTag(tag) {
        if (!this.isInitialized) {
            await this.initialize();
        }
        return this.posts.filter(post => 
            post.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
        );
    }

    /**
     * Get all unique tags
     */
    async getAllTags() {
        if (!this.isInitialized) {
            await this.initialize();
        }
        const tags = new Set();
        this.posts.forEach(post => {
            post.tags.forEach(tag => tags.add(tag));
        });
        return Array.from(tags);
    }

    /**
     * Get latest posts (limit)
     */
    async getLatestPosts(limit = 5) {
        if (!this.isInitialized) {
            await this.initialize();
        }
        return this.posts.slice(0, limit);
    }
}

// Create a singleton instance
const blogUtils = new BlogUtils();

export default blogUtils;