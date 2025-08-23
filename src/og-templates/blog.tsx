import React from 'react';
import type { OGImageRenderOptions } from 'astro-opengraph-images';

export default function BlogTemplate({ title, description, url }: OGImageRenderOptions) {
    // Extract date from the URL if it's a blog post
    const urlParts = url?.pathname ? url.pathname.split('/') : [];
    const date = urlParts.length > 2 ? urlParts[2] : new Date().toISOString().split('T')[0];
    
    return (
        <div
            style={{
                background: 'linear-gradient(to bottom right, #6b46c1, #9333ea)',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '60px',
                fontFamily: 'Inter',
            }}
        >
            <h1
                style={{
                    fontSize: '72px',
                    fontWeight: '700',
                    color: 'white',
                    lineHeight: 1.2,
                    marginBottom: '30px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}
            >
                {title}
            </h1>
            {description && (
                <p
                    style={{
                        fontSize: '32px',
                        fontWeight: '400',
                        color: 'rgba(255, 255, 255, 0.9)',
                        lineHeight: 1.4,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        marginBottom: '40px',
                    }}
                >
                    {description}
                </p>
            )}
            <div
                style={{
                    marginTop: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    fontSize: '28px',
                    color: 'rgba(255, 255, 255, 0.8)',
                }}
            >
                <span>Pedram Navid</span>
                <span style={{ opacity: 0.5 }}>•</span>
                <span>{date}</span>
                <span style={{ marginLeft: 'auto' }}>pedramnavid.com</span>
            </div>
        </div>
    );
}