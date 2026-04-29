import React, { useEffect, useState } from 'react';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // 저장된 테마 혹은 시스템 설정 확인
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <>
      <style>
        {`
          .theme-switch-container {
            width: 100px;
            cursor: pointer;
            /* 컴포넌트를 원하는 곳에 배치하려면 
               아래 속성을 지우고 부모 요소에서 제어하거나, 
               필요에 따라 position: fixed; top: 24px; right: 32px; 등을 추가하세요 */
            display: inline-block;
          }
          
          .theme-switch-container svg {
            width: 100%;
            height: auto;
          }

          .switch { cursor: pointer; }
          
          /* Background Track */
          .bg { fill: #7EC0EE; transition: fill 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
          [data-theme="dark"] .bg { fill: #1B263B; }
          
          /* Slider Container */
          .slider { transform: translateX(40px); transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
          [data-theme="dark"] .slider { transform: translateX(120px); }
          
          /* Sun/Moon Body */
          .body { 
            fill: #FFD300; 
            transition: fill 0.6s cubic-bezier(0.4, 0, 0.2, 1), filter 0.6s ease; 
            filter: drop-shadow(0px 4px 8px rgba(0,0,0,0.15)) drop-shadow(0px 0px 0px rgba(253,253,253,0)); 
          }
          [data-theme="dark"] .body { 
            fill: #FDFDFD; 
            filter: drop-shadow(0px 4px 8px rgba(0,0,0,0.3)) drop-shadow(0px 0px 12px rgba(253,253,253,0.8)); 
          }
          
          /* Sun Rays */
          .rays { 
            stroke: #FFD300; 
            stroke-width: 3; 
            stroke-linecap: round; 
            transition: opacity 0.4s ease, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); 
            opacity: 1; 
            transform-origin: 0px 40px; 
            transform: rotate(0deg) scale(1); 
          }
          [data-theme="dark"] .rays { 
            opacity: 0; 
            transform: rotate(90deg) scale(0.5); 
          }

          /* Moon Crescent Cutout */
          .cutout { 
            fill: #7EC0EE; 
            transition: fill 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease; 
            transform: translate(30px, -30px); 
            opacity: 0; 
          }
          [data-theme="dark"] .cutout { 
            fill: #1B263B; 
            transform: translate(10px, -10px); 
            opacity: 1; 
          }

          /* Stars (Dark mode) */
          .stars { 
            opacity: 0; 
            transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); 
            transform: translateY(10px); 
            fill: #FFFFFF; 
          }
          [data-theme="dark"] .stars { 
            opacity: 1; 
            transform: translateY(0px); 
          }
          
          /* Clouds (Light mode) */
          .clouds { 
            opacity: 1; 
            transition: opacity 0.4s ease, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); 
            transform: translateY(0px); 
            fill: #FFFFFF; 
          }
          [data-theme="dark"] .clouds { 
            opacity: 0; 
            transform: translateY(10px); 
          }
        `}
      </style>
      
      <div 
        className="theme-switch-container" 
        onClick={toggleTheme} 
        title="다크 모드 전환"
        role="button"
        tabIndex={0}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80">
          <g className="switch">
            {/* Background Track */}
            <rect className="bg" width="160" height="80" rx="40" />

            {/* Dark Mode Stars */}
            <g className="stars">
              {/* 4-pointed Star 1 */}
              <path d="M40 20 Q40 25 45 25 Q40 25 40 30 Q40 25 35 25 Q40 25 40 20 Z" />
              {/* 4-pointed Star 2 (scaled down) */}
              <path d="M65 42 Q65 45 68 45 Q65 45 65 48 Q65 45 62 45 Q65 45 65 42 Z" />
              {/* Tiny Dot Stars */}
              <circle cx="30" cy="50" r="1.5" />
              <circle cx="55" cy="20" r="2" opacity="0.8"/>
              <circle cx="70" cy="35" r="1" opacity="0.6" />
            </g>

            {/* Light Mode Clouds */}
            <g className="clouds">
              {/* Large Cloud */}
              <path d="M 100 50 A 10 10 0 0 1 100 30 A 14 14 0 0 1 125 25 A 12 12 0 0 1 145 35 A 10 10 0 0 1 140 50 Z" />
              {/* Small Cloud */}
              <path d="M 75 55 A 8 8 0 0 1 75 39 A 12 12 0 0 1 95 35 A 10 10 0 0 1 110 45 A 8 8 0 0 1 105 55 Z" opacity="0.6" />
            </g>

            {/* Sliding Knob */}
            <g className="slider">
              {/* Sun Rays */}
              <g className="rays">
                <line x1="0" y1="4" x2="0" y2="12" />
                <line x1="0" y1="68" x2="0" y2="76" />
                <line x1="-36" y1="40" x2="-28" y2="40" />
                <line x1="28" y1="40" x2="36" y2="40" />
                <line x1="-25" y1="15" x2="-20" y2="20" />
                <line x1="20" y1="60" x2="25" y2="65" />
                <line x1="-25" y1="65" x2="-20" y2="60" />
                <line x1="20" y1="20" x2="25" y2="15" />
              </g>
              
              {/* Sun/Moon Body */}
              <circle className="body" cx="0" cy="40" r="24" />
              
              {/* Moon Crescent Cutout */}
              <circle className="cutout" cx="0" cy="40" r="22" />
            </g>
          </g>
        </svg>
      </div>
    </>
  );
};

export default ThemeToggle;
