// import { useState, useEffect } from 'react';
// import './App.css';
// import stickman from './assets/stickerman.png'; // Import the image here

// const storySteps = [
//   "I'm...",
//   "your",  
//   "little",
//   "reminder",
//   "that",  
//   "you",   
//   "are"    
// ];

// const compliments = [
//   "Beautiful", "Important", "Loved", "Fascinating", "Gifted",
//   "Radiant", "Inspiring", "Wonderful", "Worthy", "Memorable",
//   "Special", "Loveable", "Captivating", "Needed", "Comforting", "Valuable"
// ];

// function App() {
//   const [step, setStep] = useState(0);
//   const [showFinal, setShowFinal] = useState(false);
//   const [fadeClass, setFadeClass] = useState('fade-in');
//   const [checkedCount, setCheckedCount] = useState(0);

//   const handleNext = () => {
//     setFadeClass('fade-out');
//     setTimeout(() => {
//       if (step < storySteps.length - 1) {
//         setStep(prev => prev + 1);
//         setFadeClass('fade-in');
//       } else {
//         setShowFinal(true);
//         setFadeClass('fade-in');
//       }
//     }, 400);
//   };

//   useEffect(() => {
//     if (showFinal && checkedCount < compliments.length) {
//       const timer = setTimeout(() => {
//         setCheckedCount(prev => prev + 1);
//       }, 300); 
//       return () => clearTimeout(timer);
//     }
//   }, [showFinal, checkedCount]);

//   return (
//     <div className="container" onClick={!showFinal ? handleNext : undefined}>
//       <div className={`glass-card ${showFinal ? 'final-mode' : ''}`}>
//         <div className={`content ${fadeClass}`}>
//           {!showFinal ? (
//             <>
//               {/* Optional: Show stickman small in intro? Uncomment if desired: */}
//               <img src={stickman} className="stickman-intro" alt="stickman" />
//               <h1 className="main-text">{storySteps[step]}</h1>
//               <p className="hint">Tap to continue</p>
//             </>
//           ) : (
//             <div className="checklist-container">
//               {/* The Stickman appears here! */}
//               <img src={stickman} className="stickman-final" alt="stickman" />
              
//               <h2 className="sub-text">You are...</h2>
//               <div className="checklist-scroll">
//                 {compliments.map((word, index) => (
//                   <div 
//                     key={index} 
//                     className={`checklist-item ${index < checkedCount ? 'visible' : ''}`}
//                     style={{ transitionDelay: `${index * 50}ms` }}
//                   >
//                     <span className="checkbox">
//                       {index < checkedCount ? '☑' : '☐'}
//                     </span>
//                     <span className="word">{word}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;


import { useState, useEffect } from 'react';
import './App.css';
import stickman from './assets/stickerman.png'; 

const storySteps = [
  "I'm...",
  "your",  
  "little",
  "reminder",
  "that",  
  "you",   
  "are"    
];

// Compliments from Page 8
const compliments = [
  "Beautiful", "Important", "Loved", "Fascinating", "Gifted",
  "Radiant", "Inspiring", "Wonderful", "Worthy", "Memorable",
  "Special", "Loveable", "Captivating", "Needed", "Comforting", "Valuable"
];

function App() {
  const [step, setStep] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  const [complimentIndex, setComplimentIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState('fade-in');

  const handleNext = () => {
    setFadeClass('fade-out');
    setTimeout(() => {
      if (step < storySteps.length - 1) {
        setStep(prev => prev + 1);
        setFadeClass('fade-in');
      } else {
        setShowFinal(true);
        setFadeClass('fade-in');
      }
    }, 400);
  };

  // --- NEW CODE: Security Protection ---
  useEffect(() => {
    // 1. Disable Right Click
    const handleContextmenu = (e) => {
      e.preventDefault();
    };
    document.addEventListener('contextmenu', handleContextmenu);

    // 2. Disable Common Copy Shortcuts (Optional)
    const handleKeyDown = (e) => {
      // Block F12 (Inspect), Ctrl+Shift+I (Inspect), Ctrl+U (View Source)
      if (
        e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && e.key === 'I') || 
        (e.ctrlKey && e.key === 'u')
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup when leaving
    return () => {
      document.removeEventListener('contextmenu', handleContextmenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  // -------------------------------------

  // Auto-cycle the compliments (One by one)
  useEffect(() => {
    if (showFinal) {
      const interval = setInterval(() => {
        setFadeClass('fade-out');
        setTimeout(() => {
          setComplimentIndex((prev) => (prev + 1) % compliments.length);
          setFadeClass('fade-in');
        }, 400); // Wait for fade out
      }, 3000); // Change word every 3 seconds
      return () => clearInterval(interval);
    }
  }, [showFinal]);

  return (
    <div className="container" onClick={!showFinal ? handleNext : undefined}>
      <div className={`glass-card ${showFinal ? 'final-mode' : ''}`}>
        <div className={`content ${fadeClass}`}>
          {!showFinal ? (
            <>
              <img src={stickman} className="stickman-intro" alt="stickman" />
              <h1 className="main-text">{storySteps[step]}</h1>
              <p className="hint">Tap to continue</p>
            </>
          ) : (
            <div className="final-screen-container">
              {/* 1. Stickman at the top */}
              <img src={stickman} className="stickman-final" alt="stickman" />
              
              {/* 2. "You are..." */}
              <h2 className="sub-text">You are...</h2>
              
              {/* 3. The Changing Word */}
              <h1 className="compliment-text">{compliments[complimentIndex]}</h1>
              
              {/* 4. Heart at the bottom */}
              <div className="heart-icon">❤️</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
