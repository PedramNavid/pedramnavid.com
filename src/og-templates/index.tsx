import React from 'react';
import type { OGImageRenderOptions } from 'astro-opengraph-images';
import BlogTemplate from './blog';

// Simple egret SVG as JSX for default pages
const EgretLogo = () => (
    <svg
        width="160"
        height="160"
        viewBox="0 0 100 100"
        style={{ 
            marginBottom: '40px',
            opacity: 0.9
        }}
    >
        <circle cx="50" cy="30" r="15" fill="white"/>
        <ellipse cx="50" cy="55" rx="12" ry="25" fill="white"/>
        <path d="M 50 30 Q 35 25 30 35" stroke="white" strokeWidth="2" fill="none"/>
        <path d="M 38 75 L 35 90" stroke="white" strokeWidth="3"/>
        <path d="M 62 75 L 65 90" stroke="white" strokeWidth="3"/>
        <circle cx="47" cy="28" r="2" fill="#764ba2"/>
    </svg>
);

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
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                width: '100%',
                height: '100%',
                display: 'flex',
                position: 'relative',
                fontFamily: 'Inter',
            }}
        >
            {/* Background decorations */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.05) 100%)',
                }}
            />
            
            {/* Large decorative circle */}
            <div
                style={{
                    position: 'absolute',
                    top: '-200px',
                    left: '-200px',
                    width: '600px',
                    height: '600px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.03)',
                }}
            />
            
            {/* Small decorative circle */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '-150px',
                    right: '-150px',
                    width: '400px',
                    height: '400px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.05)',
                }}
            />
            
            {/* Main content */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    padding: '80px',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                <EgretLogo />
                
                <h1
                    style={{
                        fontSize: '72px',
                        fontWeight: '700',
                        color: 'white',
                        marginBottom: '32px',
                        textAlign: 'center',
                        textShadow: '0 4px 30px rgba(0,0,0,0.2)',
                        lineHeight: 1.1,
                    }}
                >
                    {title || 'Pedram Navid'}
                </h1>
                
                {description && (
                    <p
                        style={{
                            fontSize: '32px',
                            fontWeight: '400',
                            color: 'rgba(255, 255, 255, 0.95)',
                            textAlign: 'center',
                            maxWidth: '800px',
                            lineHeight: 1.4,
                            textShadow: '0 2px 20px rgba(0,0,0,0.2)',
                            marginBottom: '60px',
                        }}
                    >
                        {description}
                    </p>
                )}
                
                <div
                    style={{
                        marginTop: 'auto',
                        fontSize: '24px',
                        fontWeight: '500',
                        color: 'white',
                        background: 'rgba(255, 255, 255, 0.15)',
                        padding: '12px 32px',
                        borderRadius: '100px',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    pedramnavid.com
                </div>
            </div>
        </div>
    );
}