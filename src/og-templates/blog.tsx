import React from 'react';
import type { OGImageRenderOptions } from 'astro-opengraph-images';

// Simple egret SVG as JSX
const EgretIcon = () => (
    <svg
        width="140"
        height="140"
        viewBox="0 0 100 100"
        style={{ 
            position: 'absolute',
            left: '80px',
            top: '50%',
            transform: 'translateY(-50%)',
            opacity: 0.3
        }}
    >
        <circle cx="50" cy="30" r="15" fill="white"/>
        <ellipse cx="50" cy="55" rx="12" ry="25" fill="white"/>
        <path d="M 50 30 Q 35 25 30 35" stroke="white" strokeWidth="2" fill="none"/>
        <path d="M 38 75 L 35 90" stroke="white" strokeWidth="3"/>
        <path d="M 62 75 L 65 90" stroke="white" strokeWidth="3"/>
    </svg>
);

export default function BlogTemplate(options: OGImageRenderOptions) {
    const { title, pathname } = options as any;
    
    // Extract date from the pathname if it's a blog post
    const urlParts = pathname ? pathname.split('/') : [];
    const date = urlParts.length > 2 ? urlParts[2] : new Date().toISOString().split('T')[0];
    
    // Clean up the title - remove both possible prefixes
    const cleanTitle = title
        ?.replace("Pedram Navid's Web Blog | ", "")
        ?.replace("Pedram Navid | ", "");
    
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
                    paddingLeft: '260px',
                    width: '100%',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                {/* Title only - no blog name or description */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h1
                        style={{
                            fontSize: '64px',
                            fontWeight: '700',
                            color: 'white',
                            lineHeight: 1.2,
                            textShadow: '0 2px 20px rgba(0,0,0,0.2)',
                        }}
                    >
                        {cleanTitle}
                    </h1>
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
                    <span style={{ fontWeight: '600' }}>pedramnavid.com</span>
                </div>
            </div>
        </div>
    );
}