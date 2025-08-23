import React from 'react';
import type { OGImageRenderOptions } from 'astro-opengraph-images';

// Simple egret SVG as JSX
const EgretIcon = () => (
    <svg
        width="120"
        height="120"
        viewBox="0 0 100 100"
        style={{ 
            position: 'absolute',
            right: '60px',
            top: '50%',
            transform: 'translateY(-50%)',
            opacity: 0.2
        }}
    >
        <circle cx="50" cy="30" r="15" fill="white"/>
        <ellipse cx="50" cy="55" rx="12" ry="25" fill="white"/>
        <path d="M 50 30 Q 35 25 30 35" stroke="white" strokeWidth="2" fill="none"/>
        <path d="M 38 75 L 35 90" stroke="white" strokeWidth="3"/>
        <path d="M 62 75 L 65 90" stroke="white" strokeWidth="3"/>
    </svg>
);

export default function BlogTemplate({ title, description, url }: OGImageRenderOptions) {
    // Extract date from the URL if it's a blog post
    const urlParts = url?.pathname ? url.pathname.split('/') : [];
    const date = urlParts.length > 2 ? urlParts[2] : new Date().toISOString().split('T')[0];
    
    return (
        <div
            style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                width: '100%',
                height: '100%',
                display: 'flex',
                position: 'relative',
                fontFamily: 'Inter',
            }}
        >
            {/* Dark overlay for better text contrast */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)',
                }}
            />
            
            {/* Decorative elements */}
            <div
                style={{
                    position: 'absolute',
                    top: '-100px',
                    right: '-100px',
                    width: '400px',
                    height: '400px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.05)',
                }}
            />
            
            <EgretIcon />
            
            {/* Main content */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '80px',
                    paddingRight: '240px',
                    width: '100%',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                {/* Top section with blog name */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        marginBottom: '40px',
                    }}
                >
                    <div
                        style={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            padding: '8px 20px',
                            borderRadius: '100px',
                            fontSize: '18px',
                            fontWeight: '600',
                            color: 'white',
                            backdropFilter: 'blur(10px)',
                        }}
                    >
                        Pedram Navid's Web Blog
                    </div>
                </div>
                
                {/* Title and description */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h1
                        style={{
                            fontSize: '56px',
                            fontWeight: '700',
                            color: 'white',
                            lineHeight: 1.2,
                            marginBottom: '24px',
                            textShadow: '0 2px 20px rgba(0,0,0,0.2)',
                        }}
                    >
                        {title}
                    </h1>
                    {description && (
                        <p
                            style={{
                                fontSize: '24px',
                                fontWeight: '400',
                                color: 'rgba(255, 255, 255, 0.95)',
                                lineHeight: 1.5,
                                textShadow: '0 1px 10px rgba(0,0,0,0.2)',
                            }}
                        >
                            {description}
                        </p>
                    )}
                </div>
                
                {/* Bottom section with metadata */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '20px',
                        color: 'rgba(255, 255, 255, 0.9)',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontWeight: '600' }}>Pedram Navid</span>
                        <span style={{ opacity: 0.6 }}>•</span>
                        <span>{date}</span>
                    </div>
                    <span style={{ 
                        fontWeight: '500',
                        background: 'rgba(255, 255, 255, 0.1)',
                        padding: '6px 16px',
                        borderRadius: '100px',
                        backdropFilter: 'blur(10px)',
                    }}>
                        pedramnavid.com
                    </span>
                </div>
            </div>
        </div>
    );
}