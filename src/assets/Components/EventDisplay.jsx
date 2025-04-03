import React, { useState, useRef, useEffect } from 'react'

const EventDisplay = ({ 
  eventName, 
  eventType, 
  location, 
  time, 
  creatorName, 
  brandName,
  viewMode = "card" // Default to card view, can be "card" or "line"
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  
  // Define different styles based on event type
  const cardStyles = {
    'concert': viewMode === 'card' 
      ? 'bg-gradient-to-b from-purple-500 to-indigo-700 border-purple-300' 
      : 'bg-gradient-to-r from-purple-500 to-indigo-700 border-purple-300',
    'conference': viewMode === 'card'
      ? 'bg-gradient-to-b from-blue-500 to-blue-700 border-blue-300'
      : 'bg-gradient-to-r from-blue-500 to-blue-700 border-blue-300',
    'workshop': viewMode === 'card'
      ? 'bg-gradient-to-b from-yellow-400 to-orange-500 border-yellow-300'
      : 'bg-gradient-to-r from-yellow-400 to-orange-500 border-yellow-300',
    'sports': viewMode === 'card'
      ? 'bg-gradient-to-b from-green-500 to-emerald-600 border-green-300'
      : 'bg-gradient-to-r from-green-500 to-emerald-600 border-green-300',
    'exhibition': viewMode === 'card'
      ? 'bg-gradient-to-b from-red-500 to-pink-600 border-red-300'
      : 'bg-gradient-to-r from-red-500 to-pink-600 border-red-300',
    'festival': 'bg-gradient-to-r from-purple-400 to-pink-500 border-purple-300',
    'wellness': 'bg-gradient-to-r from-blue-400 to-teal-500 border-blue-300',
    'business': 'bg-gradient-to-r from-gray-500 to-gray-600 border-gray-300',
    'entertainment': 'bg-gradient-to-r from-pink-500 to-red-600 border-pink-300',
    'technology': 'bg-gradient-to-r from-indigo-500 to-blue-600 border-indigo-300',
    'professional': 'bg-gradient-to-r from-blue-600 to-gray-700 border-blue-400',
    'arts': 'bg-gradient-to-r from-yellow-500 to-orange-600 border-yellow-400',
    'shopping': 'bg-gradient-to-r from-green-400 to-teal-500 border-green-300',
    'education': 'bg-gradient-to-r from-blue-500 to-cyan-600 border-blue-300',
    'cultural': 'bg-gradient-to-r from-yellow-600 to-orange-600 border-yellow-500'
  };
  
  // Default style if event type doesn't match predefined types
  const defaultStyle = viewMode === 'card' 
    ? 'bg-gradient-to-b from-gray-500 to-gray-700 border-gray-300' 
    : 'bg-gradient-to-r from-gray-500 to-gray-700 border-gray-300';
  
  const cardStyle = cardStyles[eventType.toLowerCase()] || defaultStyle;
  
  // Handle 3D tilt effect based on mouse position (only for card view)
  const handleMouseMove = (e) => {
    if (!cardRef.current || viewMode !== 'card') return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    setPosition({ x: rotateY, y: rotateX });
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  // Animation on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Card view rendering
  if (viewMode === 'card') {
    return (
      <div 
        ref={cardRef}
        className={`rounded-2xl ${cardStyle} p-5 shadow-lg w-64 h-96 border-2 transition-all duration-300 ease-in-out transform 
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          ${isHovered ? 'z-10 shadow-xl' : ''}`}
        style={{
          transform: isHovered 
            ? `perspective(1000px) rotateX(${position.y}deg) rotateY(${position.x}deg) scale3d(1.05, 1.05, 1.05)` 
            : 'perspective(1000px) rotateX(0) rotateY(0)',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <div className="flex flex-col h-full relative overflow-hidden">
          {/* Background animated circles */}
          <div className={`absolute rounded-full w-24 h-24 bg-white opacity-10 -top-6 -right-6 
            transition-transform duration-700 ${isHovered ? 'scale-150' : 'scale-100'}`}></div>
          <div className={`absolute rounded-full w-16 h-16 bg-white opacity-10 bottom-10 -left-8 
            transition-transform duration-700 ${isHovered ? 'scale-150' : 'scale-100'}`}></div>
          
          {/* Event Type Badge - with pulsing animation */}
          <div className="self-center mb-3 relative z-10">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white bg-opacity-25 text-white backdrop-filter backdrop-blur-sm
              ${isHovered ? 'animate-pulse' : ''}`}>
              {eventType}
            </span>
          </div>
          
          {/* Event Name - with animation delay based on hover */}
          <h2 className={`text-center text-2xl font-bold text-white tracking-tight leading-tight mb-4 relative z-10 
            transition-transform duration-300 ${isHovered ? 'transform -translate-y-1' : ''}`}>
            {eventName}
          </h2>
          
          {/* Divider - with width animation */}
          <div className={`border-t border-white border-opacity-20 mb-4 mx-auto transition-all duration-300 
            ${isHovered ? 'w-full' : 'w-3/4'}`}></div>
          
          {/* Event Details */}
          <div className="space-y-4 flex-grow flex flex-col items-center justify-center relative z-10">
            {/* Location with staggered animation */}
            <div className={`flex flex-col items-center text-white transition-all duration-300 ease-in-out
              ${isHovered ? 'transform -translate-y-1 transition-delay-100' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 mb-1 transition-all duration-300 ${isHovered ? 'text-yellow-200' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm font-medium text-white text-opacity-90 text-center">{location}</span>
            </div>
            
            {/* Time with staggered animation */}
            <div className={`flex flex-col items-center text-white transition-all duration-300 ease-in-out
              ${isHovered ? 'transform -translate-y-1 transition-delay-200' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 mb-1 transition-all duration-300 ${isHovered ? 'text-yellow-200' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-white text-opacity-90 text-center">{time}</span>
            </div>
          </div>
          
          {/* Divider - with width animation */}
          <div className={`border-t border-white border-opacity-20 mt-4 mb-3 mx-auto transition-all duration-300 
            ${isHovered ? 'w-full' : 'w-3/4'}`}></div>
          
          {/* Footer with Creator & Brand - slide in animation */}
          <div className={`flex flex-col items-center gap-1 relative z-10 transition-all duration-300 
            ${isHovered ? 'transform -translate-y-1 opacity-100' : 'opacity-70'}`}>
            <span className="text-xs text-white text-opacity-80 text-center">Created by {creatorName}</span>
            <span className="text-xs font-semibold text-white text-center">{brandName}</span>
          </div>
        </div>
      </div>
    );
  }

  // Line view rendering
  return (
    <div 
      ref={cardRef}
      className={`rounded-xl ${cardStyle} p-0 shadow-lg border-0 transition-all duration-300 ease-in-out w-full mb-4 overflow-hidden
        ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}
        ${isHovered ? 'shadow-xl scale-[1.02]' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ticket container with dashed border */}
      <div className="flex flex-col sm:flex-row relative bg-opacity-95 overflow-hidden">
        {/* Left tear-off stub section */}
        <div className="relative z-10 bg-white bg-opacity-20 border-r border-dashed border-white border-opacity-50 p-3 flex-shrink-0 w-full sm:w-auto flex flex-col sm:justify-center items-center">
          {/* Event Type Badge in vertical orientation */}
          <span className="transform -rotate-90 origin-center hidden sm:block absolute -left-10 whitespace-nowrap">
            <span className={`px-3 py-1 rounded-full text-xs font-medium bg-white bg-opacity-25 text-white
              ${isHovered ? 'animate-pulse' : ''}`}>
              {eventType.toUpperCase()}
            </span>
          </span>
          
          {/* Mobile event type */}
          <span className={`sm:hidden inline-flex items-center px-3 py-1 mb-2 rounded-full text-xs font-medium bg-white bg-opacity-25 text-white
            ${isHovered ? 'animate-pulse' : ''}`}>
            {eventType}
          </span>
          
          {/* Circular punch hole at top */}
          <div className="hidden sm:block absolute top-4 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gray-900"></div>
          
          {/* Circular punch hole at bottom */}
          <div className="hidden sm:block absolute bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gray-900"></div>

          {/* Time in digital clock style */}
          <div className="text-center sm:mt-4">
            <div className={`text-white text-lg sm:text-xl font-mono font-bold bg-black bg-opacity-30 px-2 py-1 rounded-md transition-all duration-300 ${isHovered ? 'text-yellow-200' : ''}`}>
              {time}
            </div>
            <div className="text-white text-xs mt-1 font-light">TIME</div>
          </div>
        </div>
        
        {/* Main ticket content section */}
        <div className="flex-grow p-4 relative">
          {/* Background elements */}
          <div className={`absolute rounded-full w-32 h-32 bg-white opacity-5 -top-10 -right-10 
            transition-transform duration-700 ${isHovered ? 'scale-150' : 'scale-100'}`}></div>
          <div className={`absolute rounded-full w-24 h-24 bg-white opacity-5 bottom-0 -left-8 
            transition-transform duration-700 ${isHovered ? 'scale-150' : 'scale-100'}`}></div>
          
          {/* Perforated edge visual top and bottom */}
          <div className="absolute left-0 top-0 w-full h-2 bg-transparent flex items-center">
            {Array(20).fill().map((_, i) => (
              <div key={`top-${i}`} className="h-[3px] w-[10px] bg-white opacity-20 mx-[5px]"></div>
            ))}
          </div>
          <div className="absolute left-0 bottom-0 w-full h-2 bg-transparent flex items-center">
            {Array(20).fill().map((_, i) => (
              <div key={`bottom-${i}`} className="h-[3px] w-[10px] bg-white opacity-20 mx-[5px]"></div>
            ))}
          </div>
          
          {/* Event name and details */}
          <div className="flex flex-col h-full justify-between">
            <div>
              <h2 className={`text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight mb-1
                transition-all duration-300 ${isHovered ? 'transform -translate-y-px' : ''}`}>
                {eventName}
              </h2>
              
              <div className="flex flex-wrap gap-3 mt-3 text-white text-opacity-90">
                {/* Location with icon */}
                <div className={`flex items-center transition-all duration-300 ease-in-out
                  ${isHovered ? 'transform -translate-y-px' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm font-medium">{location}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              {/* Fake barcode */}
              <div className="mt-3 mb-2 mx-auto w-3/4 flex justify-center">
                <div className={`relative h-12 w-full bg-white bg-opacity-10 rounded-sm overflow-hidden ${isHovered ? 'animate-pulse' : ''}`}>
                  {/* Barcode lines */}
                  {Array(40).fill().map((_, i) => (
                    <div 
                      key={i} 
                      className="absolute h-full bg-white" 
                      style={{
                        left: `${i * 2.5}%`, 
                        width: `${Math.random() * 0.8 + 0.2}%`,
                        opacity: Math.random() * 0.5 + 0.5
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              
              {/* Ticket number & creator info */}
              <div className="flex justify-between items-center text-xs text-white text-opacity-80">
                <div>#{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</div>
                <div>Created by {creatorName} | {brandName}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDisplay
