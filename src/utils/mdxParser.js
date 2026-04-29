/**
 * Simple MDX/Markdown parser that generates HTML
 * Supports: Headings, Lists, Code blocks, Links, Images, Bold, Italic, etc.
 */

class MdxParser {
    constructor() {
        this.html = '';
    }

    parse(mdxContent) {
        if (!mdxContent) return '';

        const lines = mdxContent.split('\n');
        let html = '';
        let inCodeBlock = false;
        let codeBlockContent = '';
        let codeBlockLanguage = '';
        let inList = false;
        let listType = '';
        let listItems = [];

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];

            // Handle code blocks
            if (line.startsWith('```')) {
                if (!inCodeBlock) {
                    inCodeBlock = true;
                    codeBlockLanguage = line.slice(3).trim();
                    codeBlockContent = '';
                } else {
                    html += this.renderCodeBlock(codeBlockContent, codeBlockLanguage);
                    inCodeBlock = false;
                    codeBlockLanguage = '';
                }
                continue;
            }

            if (inCodeBlock) {
                codeBlockContent += line + '\n';
                continue;
            }

            // Handle headings
            if (line.startsWith('# ')) {
                html += this.renderHeading(line.slice(2), 1);
                continue;
            }
            if (line.startsWith('## ')) {
                html += this.renderHeading(line.slice(3), 2);
                continue;
            }
            if (line.startsWith('### ')) {
                html += this.renderHeading(line.slice(4), 3);
                continue;
            }
            if (line.startsWith('#### ')) {
                html += this.renderHeading(line.slice(5), 4);
                continue;
            }

            // Handle blockquotes
            if (line.startsWith('>')) {
                let quoteContent = line.replace(/^>\s?/, '');
                // Handle multiple lines of quote until empty line
                while (i + 1 < lines.length && lines[i + 1].startsWith('>')) {
                    i++;
                    quoteContent += ' ' + lines[i].replace(/^>\s?/, '');
                }
                html += `<blockquote class="pl-4 border-l-4 my-4 italic" style="border-left-color: var(--border-color); color: var(--text-secondary);">${this.renderInline(quoteContent)}</blockquote>\n`;
                continue;
            }

            // Handle horizontal rule
            if (line.trim() === '---' || line.trim() === '***') {
                html += '<hr class="my-8 border-t border-dashed" style="border-color: var(--border-color);" />';
                continue;
            }

            // Handle lists
            if (line.match(/^[\d]+\. /)) {
                if (!inList) {
                    if (listItems.length > 0) html += this.renderList(listItems, listType);
                    listItems = [];
                    listType = 'ol';
                    inList = true;
                }
                const content = line.replace(/^[\d]+\. /, '');
                listItems.push(this.renderInline(content));
                continue;
            }

            if (line.match(/^[-*] /)) {
                if (!inList) {
                    if (listItems.length > 0) html += this.renderList(listItems, listType);
                    listItems = [];
                    listType = 'ul';
                    inList = true;
                }
                const content = line.replace(/^[-*] /, '');
                listItems.push(this.renderInline(content));
                continue;
            }

            // Close list if we're exiting
            if (inList && line.trim() === '') {
                html += this.renderList(listItems, listType);
                listItems = [];
                inList = false;
                listType = '';
                html += '\n';
                continue;
            }

            // Handle empty lines
            if (line.trim() === '') {
                if (inList) {
                    // Continue list
                    continue;
                }
                html += '\n';
                continue;
            }

            // Regular paragraph
            html += `<p class="mb-4 leading-relaxed" style="color: var(--text-secondary);">${this.renderInline(line)}</p>\n`;
        }

        // Close any remaining list
        if (inList && listItems.length > 0) {
            html += this.renderList(listItems, listType);
        }

        return html;
    }

    renderHeading(content, level) {
        const sizes = {
            1: 'text-3xl md:text-4xl font-bold mt-8 mb-4',
            2: 'text-2xl md:text-3xl font-semibold mt-6 mb-3',
            3: 'text-xl md:text-2xl font-semibold mt-5 mb-2',
            4: 'text-lg md:text-xl font-medium mt-4 mb-2'
        };
        return `<h${level} class="${sizes[level]}" style="color: var(--text-primary);">${this.renderInline(content)}</h${level}>\n`;
    }


    renderInline(text) {
        // Bold
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold" style="color: var(--text-primary);">$1</strong>');
        // Italic
        text = text.replace(/\*(.*?)\*/g, '<em class="italic" style="color: var(--text-secondary);">$1</em>');
        // Inline code
        text = text.replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 rounded text-sm font-mono" style="background-color: var(--bg-secondary); color: var(--text-primary);">$1</code>');
        // Links
        text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="underline transition-opacity hover:opacity-80" style="color: var(--accent-color);">$1</a>');
        // Images
        text = text.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-4" />');

        return text;
    }

    renderCodeBlock(content, language) {
        const escapedContent = this.escapeHtml(content.trim());
        const lines = escapedContent.split('\n');
        const codeId = `code-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        // Generate line numbers
        const lineNumbers = lines.map((_, index) =>
            `<span style="display: block; color: var(--text-secondary); font-size: 12px; line-height: 1.5;">${index + 1}</span>`
        ).join('');

        return `
        <div class="rounded-lg overflow-hidden my-4" style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);">
            <div class="px-4 py-2 border-b flex justify-between items-center" style="background-color: var(--bg-primary); color: var(--text-secondary); border-color: var(--border-color);">
                <span class="text-xs font-mono">${language || 'code'}</span>
                <button 
                    onclick="copyToClipboard('${codeId}')"
                    class="copy-code-btn p-1 rounded transition-colors hover:bg-opacity-20 hover:bg-gray-500"
                    style="cursor: pointer; background: transparent; border: none;"
                    title="Copy code"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" fill="currentColor"/>
                    </svg>
                </button>
            </div>
            <div style="display: flex; overflow-x: auto;">
                <div style="padding: 1rem 0.5rem; text-align: right; user-select: none; border-right: 1px solid var(--border-color); background-color: var(--bg-secondary);">
                    ${lineNumbers}
                </div>
                <pre id="${codeId}" style="margin: 0; border:none; padding: 1rem; overflow-x: auto; flex: 1;"><code class="font-mono text-sm" style="color: var(--text-primary); margin: 0; display: block; line-height: 1.5;">${escapedContent}</code></pre>
            </div>
        </div>
    `;
    }


    renderList(items, type) {
        const tag = type === 'ul' ? 'ul' : 'ol';
        const listHtml = items.map(item => `<li class="mb-1 ml-6" style="color: var(--text-secondary);">${item}</li>`).join('');
        return `<${tag} class="my-3 list-${type === 'ul' ? 'disc' : 'decimal'}">${listHtml}</${tag}>\n`;
    }

    escapeHtml(text) {
        const htmlEntities = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return text.replace(/[&<>"']/g, char => htmlEntities[char]);
    }
}

// Create singleton instance
const mdxParser = new MdxParser();

export default mdxParser;