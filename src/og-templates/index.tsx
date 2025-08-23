import React from 'react';
import type { OGImageRenderOptions } from 'astro-opengraph-images';
import BlogTemplate from './blog';

export default function render(options: OGImageRenderOptions) {
    const { title, description, url } = options;
    
    // Check if this is a blog post
    if (url && url.pathname && url.pathname.startsWith('/blog/') && url.pathname !== '/blog/') {
        return <BlogTemplate {...options} />;
    }
    
    // Default template for other pages
    return (
        <div
            style={{
                background: 'linear-gradient(to bottom right, #6b46c1, #9333ea)',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '60px',
                fontFamily: 'Inter',
            }}
        >
            <h1
                style={{
                    fontSize: '96px',
                    fontWeight: '700',
                    color: 'white',
                    marginBottom: '30px',
                    textAlign: 'center',
                }}
            >
                {title || 'Pedram Navid'}
            </h1>
            {description && (
                <p
                    style={{
                        fontSize: '42px',
                        fontWeight: '400',
                        color: 'rgba(255, 255, 255, 0.9)',
                        textAlign: 'center',
                        maxWidth: '900px',
                    }}
                >
                    {description}
                </p>
            )}
            <div
                style={{
                    marginTop: 'auto',
                    fontSize: '32px',
                    color: 'rgba(255, 255, 255, 0.8)',
                }}
            >
                pedramnavid.com
            </div>
        </div>
    );
}