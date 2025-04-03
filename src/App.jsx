import { useState } from 'react'
import './App.css'
import EventDisplay from './assets/Components/EventDisplay'

function App() {
  // Sample event data - expanded to 20 events
  const events = [
    {
      eventName: "Summer Jazz Festival",
      eventType: "Concert",
      location: "Central Park, New York",
      time: "Aug 15, 2023 • 7:00 PM",
      creatorName: "Julia Stevens",
      brandName: "JazzWorld"
    },
    {
      eventName: "Tech Innovation Summit",
      eventType: "Conference",
      location: "Convention Center, San Francisco",
      time: "Sep 10, 2023 • 9:00 AM",
      creatorName: "Mark Anderson",
      brandName: "TechFuture"
    },
    {
      eventName: "Digital Art Workshop",
      eventType: "Workshop",
      location: "Modern Art Museum, Chicago",
      time: "Oct 5, 2023 • 2:00 PM",
      creatorName: "Sofia Garcia",
      brandName: "ArtNow"
    },
    {
      eventName: "Marathon Championship",
      eventType: "Sports",
      location: "Downtown, Boston",
      time: "Nov 12, 2023 • 8:00 AM",
      creatorName: "James Wilson",
      brandName: "SportsPro"
    },
    // Additional events to make 20 in total
    {
      eventName: "Food & Wine Festival",
      eventType: "Festival",
      location: "Waterfront, Seattle",
      time: "Aug 25, 2023 • 12:00 PM",
      creatorName: "Emily Chen",
      brandName: "TasteMatters"
    },
    {
      eventName: "Web Development Bootcamp",
      eventType: "Workshop",
      location: "Tech Hub, Austin",
      time: "Sep 20, 2023 • 10:00 AM",
      creatorName: "David Miller",
      brandName: "CodeMasters"
    },
    {
      eventName: "Photography Exhibition",
      eventType: "Exhibition",
      location: "Art Gallery, Los Angeles",
      time: "Oct 15, 2023 • 11:00 AM",
      creatorName: "Michael Wong",
      brandName: "VisualArts"
    },
    {
      eventName: "Yoga Retreat",
      eventType: "Wellness",
      location: "Sunset Beach, Miami",
      time: "Nov 5, 2023 • 7:00 AM",
      creatorName: "Sarah Johnson",
      brandName: "ZenLife"
    },
    {
      eventName: "Startup Pitch Night",
      eventType: "Business",
      location: "Innovation Center, Denver",
      time: "Aug 30, 2023 • 6:00 PM",
      creatorName: "Alex Thompson",
      brandName: "VentureUp"
    },
    {
      eventName: "Film Festival",
      eventType: "Entertainment",
      location: "Grand Theater, Portland",
      time: "Sep 25, 2023 • 4:00 PM",
      creatorName: "Lisa Patel",
      brandName: "CinemaWorld"
    },
    {
      eventName: "Science Fair",
      eventType: "Education",
      location: "Science Museum, Philadelphia",
      time: "Oct 20, 2023 • 9:00 AM",
      creatorName: "Robert Brown",
      brandName: "ScienceNow"
    },
    {
      eventName: "Charity 5K Run",
      eventType: "Sports",
      location: "City Park, Dallas",
      time: "Nov 15, 2023 • 8:30 AM",
      creatorName: "Jennifer Smith",
      brandName: "RunForGood"
    },
    {
      eventName: "Book Launch Party",
      eventType: "Cultural",
      location: "Public Library, Atlanta",
      time: "Aug 18, 2023 • 5:00 PM",
      creatorName: "Daniel Lee",
      brandName: "BookWorms"
    },
    {
      eventName: "AI Conference",
      eventType: "Technology",
      location: "Research Center, Seattle",
      time: "Sep 15, 2023 • 9:00 AM",
      creatorName: "Olivia Williams",
      brandName: "FutureTech"
    },
    {
      eventName: "Fashion Show",
      eventType: "Entertainment",
      location: "Design District, Miami",
      time: "Oct 25, 2023 • 7:30 PM",
      creatorName: "Thomas Rodriguez",
      brandName: "StyleVogue"
    },
    {
      eventName: "Cooking Masterclass",
      eventType: "Workshop",
      location: "Culinary Institute, Chicago",
      time: "Nov 20, 2023 • 1:00 PM",
      creatorName: "Maria Garcia",
      brandName: "ChefsCraft"
    },
    {
      eventName: "Gaming Tournament",
      eventType: "Entertainment",
      location: "Arena Center, Las Vegas",
      time: "Aug 22, 2023 • 2:00 PM",
      creatorName: "Kevin Park",
      brandName: "GamersUnite"
    },
    {
      eventName: "Business Networking",
      eventType: "Professional",
      location: "Grand Hotel, Washington DC",
      time: "Sep 28, 2023 • 6:30 PM",
      creatorName: "Natalie Adams",
      brandName: "ConnectPro"
    },
    {
      eventName: "Dance Competition",
      eventType: "Arts",
      location: "Performing Arts Center, Houston",
      time: "Oct 30, 2023 • 5:00 PM",
      creatorName: "Ryan Mitchell",
      brandName: "DanceFusion"
    },
    {
      eventName: "Holiday Market",
      eventType: "Shopping",
      location: "Downtown Square, Nashville",
      time: "Nov 25, 2023 • 10:00 AM",
      creatorName: "Amanda Taylor",
      brandName: "FestiveCrafts"
    }
  ];

  // State to track visible cards
  const [startIndex, setStartIndex] = useState(0);
  const cardsToShow = 4; // Number of cards visible at once
  
  // Navigation functions
  const handlePrev = () => {
    setStartIndex(prev => Math.max(0, prev - 1));
  };
  
  const handleNext = () => {
    setStartIndex(prev => Math.min(events.length - cardsToShow, prev + 1));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-10 animate-fade-in">Event Cards</h1>
        
        {/* Card Grid Layout Section */}
        <div className="relative px-10 py-8 mb-16"> 
          {/* Left Navigation Arrow - Improved Design */}
          <button 
            onClick={handlePrev}
            disabled={startIndex === 0}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 translate-x-[-15px] z-20 
                     bg-gradient-to-r from-blue-500 to-purple-600 text-white 
                     rounded-full shadow-lg p-4 
                     hover:from-blue-600 hover:to-purple-700 hover:scale-110
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                     disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
                     transition-all duration-300 ease-in-out"
            aria-label="Previous cards"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Card Container with Overflow */}
          <div className="overflow-hidden overflow-y-visible" style={{ minHeight: "430px" }}> 
            <div 
              className="flex transition-transform duration-300 ease-in-out" 
              style={{ transform: `translateX(-${startIndex * 280}px)` }}
            >
              {events.map((event, index) => (
                <div key={index} className="flex-shrink-0 mt-6 w-64 mx-2 hover:z-10"> 
                  <EventDisplay 
                    eventName={event.eventName}
                    eventType={event.eventType}
                    location={event.location}
                    time={event.time}
                    creatorName={event.creatorName}
                    brandName={event.brandName}
                    viewMode="card"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Navigation Arrow */}
          <button 
            onClick={handleNext}
            disabled={startIndex >= events.length - cardsToShow}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-[15px] z-20 
                     bg-gradient-to-l from-blue-500 to-purple-600 text-white
                     rounded-full shadow-lg p-4
                     hover:from-blue-600 hover:to-purple-700 hover:scale-110
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                     disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
                     transition-all duration-300 ease-in-out"
            aria-label="Next cards"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Line Card Layout Section */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Event List</h2>
        <div className="px-4 md:px-10 space-y-4">
          {events.map((event, index) => (
            <EventDisplay 
              key={index}
              eventName={event.eventName}
              eventType={event.eventType}
              location={event.location}
              time={event.time}
              creatorName={event.creatorName}
              brandName={event.brandName}
              viewMode="line"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
