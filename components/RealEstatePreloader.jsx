import { useEffect, useState } from 'react';

const RealEstatePreloader = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [loadingText, setLoadingText] = useState('Initializing...');

  const loadingSteps = [
    'Initializing...',
    'Loading properties...',
    'Connecting to database...',
    'Preparing your experience...',
    'Almost ready...'
  ];

  useEffect(() => {
    const duration = 4000; // 4 seconds total
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + increment;
        
        // Update loading text based on progress
        if (newProgress < 20) {
          setLoadingText(loadingSteps[0]);
        } else if (newProgress < 40) {
          setLoadingText(loadingSteps[1]);
        } else if (newProgress < 60) {
          setLoadingText(loadingSteps[2]);
        } else if (newProgress < 80) {
          setLoadingText(loadingSteps[3]);
        } else {
          setLoadingText(loadingSteps[4]);
        }
        
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const floatingIcons = ['🏠', '🏢', '🏡', '🏘️', '🔑'];

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
        }

        @keyframes slideInLeft {
          from {
            transform: translateX(-100vw);
          }
          to {
            transform: translateX(100vw);
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100vw);
          }
          to {
            transform: translateX(-100vw);
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        @keyframes svgFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pathDraw {
          0% {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
          }
          100% {
            stroke-dasharray: 1000;
            stroke-dashoffset: 0;
          }
        }

        .preloader-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #025a9b 0%, #2284c4 50%, #025a9b 100%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          transition: opacity 0.8s ease-out, visibility 0.8s ease-out;
          opacity: ${isVisible ? 1 : 0};
          visibility: ${isVisible ? 'visible' : 'hidden'};
        }

        .logo-container {
          position: relative;
          margin-bottom: 40px;
          animation: fadeInUp 1s ease-out;
        }

        .logo {
          width: 120px;
          height: 120px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
          animation: pulse 3s infinite ease-in-out;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .logo::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          animation: rotate 4s linear infinite;
        }

        .custom-svg {
          width: 80px;
          height: 80px;
          z-index: 2;
          position: relative;
          animation: svgFloat 3s ease-in-out infinite;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
        }

        .svg-path-animate {
          stroke: #ffffff;
          stroke-width: 0.5;
          fill: none;
          animation: pathDraw 2s ease-in-out;
          animation-delay: 0.5s;
          animation-fill-mode: forwards;
        }

        .company-name {
          color: white;
          font-size: 32px;
          font-weight: 700;
          margin: 0 0 8px 0;
          text-align: center;
          animation: fadeInUp 1s ease-out 0.3s both;
          letter-spacing: 2px;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
          font-family: 'Arial', sans-serif;
        }

        .tagline {
          color: rgba(255, 255, 255, 0.9);
          font-size: 18px;
          margin: 0 0 50px 0;
          text-align: center;
          animation: fadeInUp 1s ease-out 0.5s both;
          font-weight: 300;
          letter-spacing: 1px;
        }

        .progress-container {
          width: 350px;
          height: 6px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
          overflow: hidden;
          animation: fadeInUp 1s ease-out 0.7s both;
          position: relative;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #ffffff, #2284c4, #ffffff);
          background-size: 200% 100%;
          border-radius: 3px;
          width: ${progress}%;
          transition: width 0.3s ease;
          animation: shimmer 2s infinite;
          box-shadow: 0 0 10px rgba(34, 132, 196, 0.5);
        }

        .progress-text {
          color: rgba(255, 255, 255, 0.9);
          font-size: 16px;
          margin-top: 20px;
          text-align: center;
          animation: fadeInUp 1s ease-out 0.9s both;
          font-weight: 400;
          letter-spacing: 0.5px;
        }

        .floating-elements {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }

        .floating-icon {
          position: absolute;
          color: rgba(255, 255, 255, 0.08);
          font-size: 20px;
          user-select: none;
        }

        .floating-icon:nth-child(1) {
          font-size: 24px;
          top: 15%;
          animation: slideInLeft 10s linear infinite;
          animation-delay: 0s;
        }

        .floating-icon:nth-child(2) {
          font-size: 28px;
          top: 30%;
          animation: slideInRight 11s linear infinite;
          animation-delay: 1s;
        }

        .floating-icon:nth-child(3) {
          font-size: 32px;
          top: 45%;
          animation: slideInLeft 12s linear infinite;
          animation-delay: 2s;
        }

        .floating-icon:nth-child(4) {
          font-size: 36px;
          top: 60%;
          animation: slideInRight 13s linear infinite;
          animation-delay: 3s;
        }

        .floating-icon:nth-child(5) {
          font-size: 40px;
          top: 75%;
          animation: slideInLeft 14s linear infinite;
          animation-delay: 4s;
        }

        .percentage {
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
          margin-top: 8px;
          text-align: center;
          font-weight: 300;
        }

        body {
          overflow: ${isVisible ? 'hidden' : 'auto'};
        }
      `}</style>
      
      <div className="preloader-container">
        <div className="floating-elements">
          {floatingIcons.map((icon, index) => (
            <div key={index} className="floating-icon">
              {icon}
            </div>
          ))}
        </div>
        
        <div className="logo-container">
          <div className="logo">
            <svg 
              className="custom-svg" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 134.47 140.35"
            >
              <defs>
                <style>{`
                  .cls-1{fill:#ffffff;}
                  .cls-2{fill:#e0e7ff;}
                  .cls-3{fill:#ffffff;}
                `}</style>
              </defs>
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                  <path className="cls-1" d="M.36,117.48V100.54H4.27v13.81h8.67v3.13Z"/>
                  <path className="cls-1" d="M30.23,100.54v10.53a6.36,6.36,0,0,1-2,5.09,8.29,8.29,0,0,1-5.62,1.72q-7.58,0-7.57-6.81V100.54H19v10.53a4.1,4.1,0,0,0,.65,2.54,3.56,3.56,0,0,0,3,1.14,3.85,3.85,0,0,0,2.89-.9,4,4,0,0,0,.8-2.78V100.54Z"/>
                  <path className="cls-1" d="M33.59,117.48V100.54H39.1l4.16,11.65h.05l3.94-11.65h5.5v16.94H49.09v-12H49l-4.36,12h-3L37.3,105.59h0v11.89Z"/>
                  <path className="cls-1" d="M56.19,117.48V100.54H60.1v16.94Z"/>
                  <path className="cls-1" d="M63.54,117.48V100.54h3.9L74.9,111.9V100.54h3.66v16.94H74.63L67.2,106.14v11.34Z"/>
                  <path className="cls-1" d="M81.23,109.08a9,9,0,0,1,2.31-6.36,9.28,9.28,0,0,1,12.86,0,9,9,0,0,1,2.32,6.36,8.73,8.73,0,0,1-2.32,6.24,9.36,9.36,0,0,1-12.86,0A8.72,8.72,0,0,1,81.23,109.08Zm3.91,0a6.42,6.42,0,0,0,1.1,3.89,4.81,4.81,0,0,0,7.47,0,6.49,6.49,0,0,0,1.1-3.89,6.79,6.79,0,0,0-1.1-4,4.78,4.78,0,0,0-7.47,0A6.72,6.72,0,0,0,85.14,109.08Z"/>
                  <path className="cls-1" d="M116.48,100.54v10.53a6.36,6.36,0,0,1-2,5.09,8.29,8.29,0,0,1-5.62,1.72q-7.57,0-7.57-6.81V100.54h3.91v10.53a4.1,4.1,0,0,0,.65,2.54,3.56,3.56,0,0,0,3,1.14,3.85,3.85,0,0,0,2.89-.9,4,4,0,0,0,.8-2.78V100.54Z"/>
                  <path className="cls-1" d="M118.72,111.86h3.79a2.77,2.77,0,0,0,1.2,2.42,4.73,4.73,0,0,0,2.74.71,5.47,5.47,0,0,0,2.24-.4,1.81,1.81,0,0,0,1.22-1.71c0-1-.91-1.7-2.74-2.19q-4.74-1.27-5.11-1.47a4.15,4.15,0,0,1-2.74-4,4.44,4.44,0,0,1,2.12-3.87,8,8,0,0,1,4.53-1.26,8.79,8.79,0,0,1,5,1.26,4.74,4.74,0,0,1,2.17,4.2h-3.79q-.15-2.57-3.51-2.56a3.55,3.55,0,0,0-1.82.43,1.63,1.63,0,0,0-.87,1.49,1.4,1.4,0,0,0,1,1.35,35.3,35.3,0,0,0,4.33,1.21,11.23,11.23,0,0,1,3.12,1.14,4.23,4.23,0,0,1,2.17,3.8,4.7,4.7,0,0,1-1.9,3.89,8.77,8.77,0,0,1-5.5,1.54,9.05,9.05,0,0,1-5.29-1.44A5.26,5.26,0,0,1,118.72,111.86Z"/>
                  <path className="cls-2" d="M0,140V126.61H3.1v5.15H8.8v-5.15h3.09V140H8.8v-5.79H3.1V140Z"/>
                  <path className="cls-2" d="M14,133.38a7,7,0,0,1,1.84-5,6.61,6.61,0,0,1,5.09-2,6.59,6.59,0,0,1,5.08,2,7,7,0,0,1,1.84,5A6.87,6.87,0,0,1,26,138.32a6.66,6.66,0,0,1-5.08,2,6.67,6.67,0,0,1-5.09-2A6.87,6.87,0,0,1,14,133.38Zm3.1,0a5.13,5.13,0,0,0,.87,3.08,3.43,3.43,0,0,0,3,1.41,3.42,3.42,0,0,0,2.95-1.41,5.13,5.13,0,0,0,.87-3.08,5.36,5.36,0,0,0-.87-3.18,3.38,3.38,0,0,0-2.95-1.43,3.39,3.39,0,0,0-3,1.43A5.36,5.36,0,0,0,17.1,133.38Z"/>
                  <path className="cls-2" d="M41.91,126.61V135a5,5,0,0,1-1.57,4,6.54,6.54,0,0,1-4.44,1.37q-6,0-6-5.4v-8.34H33V135a3.31,3.31,0,0,0,.51,2,2.81,2.81,0,0,0,2.39.91,3,3,0,0,0,2.28-.72,3.12,3.12,0,0,0,.64-2.2v-8.34Z"/>
                  <path className="cls-2" d="M43.69,135.57h3a2.2,2.2,0,0,0,1,1.92,3.7,3.7,0,0,0,2.17.56,4.26,4.26,0,0,0,1.78-.32,1.41,1.41,0,0,0,1-1.35c0-.76-.72-1.34-2.17-1.73-2.5-.67-3.84-1.06-4-1.16a3.28,3.28,0,0,1-2.17-3.14,3.5,3.5,0,0,1,1.68-3.06,6.36,6.36,0,0,1,3.59-1,7,7,0,0,1,3.92,1,3.73,3.73,0,0,1,1.72,3.32h-3c-.08-1.35-1-2-2.78-2a2.89,2.89,0,0,0-1.44.33,1.31,1.31,0,0,0-.69,1.19,1.11,1.11,0,0,0,.77,1.07,32.89,32.89,0,0,0,3.43,1,8.32,8.32,0,0,1,2.46.9,3.32,3.32,0,0,1,1.72,3,3.73,3.73,0,0,1-1.5,3.09,7,7,0,0,1-4.36,1.22,7.16,7.16,0,0,1-4.18-1.15A4.12,4.12,0,0,1,43.69,135.57Z"/>
                  <path className="cls-2" d="M57.37,140V126.61h3.1V140Z"/>
                  <path className="cls-2" d="M63.19,140V126.61h3.09l5.91,9v-9h2.9V140H72l-5.89-9v9Z"/>
                  <path className="cls-2" d="M88.3,140L88,138.51a4.78,4.78,0,0,1-3.87,1.84,6.68,6.68,0,0,1-5.09-2,6.91,6.91,0,0,1-1.83-4.94,7.07,7.07,0,0,1,1.83-5,6.61,6.61,0,0,1,5.09-2A6.44,6.44,0,0,1,88,127.51a4.85,4.85,0,0,1,2,3.52h-3A2.74,2.74,0,0,0,86,129.36a3.15,3.15,0,0,0-1.92-.59,3.4,3.4,0,0,0-3,1.43,5.36,5.36,0,0,0-.87,3.18,5.13,5.13,0,0,0,.87,3.08,3.43,3.43,0,0,0,3,1.41q3.07,0,3.35-2.9H84.36v-2.2h5.91V140Z"/>
                  <path className="cls-3" d="M98.26,140V126.61h3.1v10.94h6.86V140Z"/>
                  <path className="cls-3" d="M113.07,140V129.09h-4.22v-2.48h11.54v2.48h-4.22V140Z"/>
                  <path className="cls-3" d="M122,140V126.61h6.07a6.22,6.22,0,0,1,4.56,1.66,6.54,6.54,0,0,1,1.83,5,7.06,7.06,0,0,1-1.58,4.85,6.05,6.05,0,0,1-4.81,1.94Zm3.09-10.94v8.46h2.77a3.34,3.34,0,0,0,2.42-.9,4.2,4.2,0,0,0,1.09-3.12,5,5,0,0,0-.87-3.23,3.88,3.88,0,0,0-3.2-1.21Z"/>
                  <path className="cls-3" d="M98,24.42C96.28,17.57,83.76,15,74.33,15.91A56.63,56.63,0,0,0,50,24.37C19,44.92,22.27,68,22.27,68c1.57-6.85,6-24.65,36.21-37.66a51.77,51.77,0,0,1,14.82-4,29,29,0,0,1,12.79,1.3c10.5,3.95,2.25,16,2.25,16C100.17,32.54,98.28,25.57,98,24.42Z"/>
                  <path className="cls-3" d="M88.35,10.66l0-10.61C58.14-1.31,35.08,25.27,28.93,37.65,32.06,34,59.35,4.13,88.35,10.66Z"/>
                  <path className="cls-3" d="M73.28,74.39H58.57v8.12c-11.3-.06-15.06,0-15.06,0V43.35A44,44,0,0,0,28.6,60.13l-.05,17.24,0,14.78,44.78,0Z"/>
                  <polygon className="cls-1" points="88.48 43.87 88.59 92.13 111.72 82.37 111.72 71 106.1 67.16 106.1 77.53 99.75 78.82 99.78 52.74 88.48 43.87"/>
                  <path className="cls-1" d="M58.46,60.62l14.89,0,0-28.46a56.26,56.26,0,0,0-14.82,3.63v9.32Z"/>
                </g>
              </g>
            </svg>
          </div>
        </div>
        
        <h1 className="company-name">LUMINUS</h1>
        <p className="tagline">Housing LTD</p>
        
        <div className="progress-container">
          <div className="progress-bar" />
        </div>
        
        <div className="progress-text">{loadingText}</div>
        <div className="percentage">{Math.round(progress)}%</div>
      </div>
    </>
  );
};

export default RealEstatePreloader;