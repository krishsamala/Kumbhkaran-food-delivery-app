import React, { useState } from 'react';
import logo from '../assets/Kumbhkaran_2.png';
import wing1 from '../assets/wing1.png';
import wing2 from '../assets/wing2.png';
import '../HomePage.css';

// --- (1) Helper Function to get Initials ---
const getInitials = (name) => {
  
  const firstNameLine = name.split('\n')[0]; 
  const names = firstNameLine.split(' ');
  const initials = names.map(n => n[0]).join('');
  // Return the first two initials
  return initials.length > 2 ? initials.substring(0, 2) : initials;
};

// --- (2) Mock Data (Updated) ---
// I've removed 'photoUrl' and added 'bgColor' for the circles
const teamData = [
  {
    id: 1,
    name: 'Swayam Zarkar\n60003240160-I187',
    linkedinUrl: '#',
    details: 'Contributions: \nFrontend-\n  ~CartPage\n  ~LoginPage\nBackend\n  ~Handled User-Model.\n  ~Posted & Get User Data',
    bgColor: 'bg-blue-500', // Color for the circle
  },
  {
    id: 2,
    name: 'Krish Samala\n60003240300-I170',
    linkedinUrl: '#',
    details: 'Contributions: \nFrontend-\n  ~HomePage\n  ~SignupPage\nBackend\n  ~Updated User-Model.\n  ~Posted & Fetched User Addresses and Favourites',
    bgColor: 'bg-red-500',
  },
  {
    id: 3,
    name: 'Meet Savliya\n60003240021-I171',
    linkedinUrl: '#',
    details: 'Role: UI/UX Designer. \nDesigned the entire app flow and is a Tailwind CSS wizard.',
    bgColor: 'bg-purple-500',
  },
  {
    id: 4,
    name: 'Bhavya Patel\n60003240268-I165',
    linkedinUrl: '#',
    details: 'Role: Backend Specialist. \nHandled all the API integrations and database management.',
    bgColor: 'bg-green-500',
  }
];

// --- (3) The Component ---
function AboutUs() {
  const [expandedCard, setExpandedCard] = useState(null);

  const handleCardClick = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="min-h-screen p-6 md:p-12">
        <header className="flex justify-center items-center pt-2 pb-2">
        <div className="flex items-center">
          <img 
          src={wing1} 
          alt="left wing" 
          className="h-40 w-auto -mr-24 z-0 animate-wing-1"
        />
        
        <img 
          src={logo} 
          alt="Kumbhkaran Logo" 
          className="h-36 w-auto z-10"
        />

        <img 
          src={wing2} 
          alt="right wing" 
          className="h-40 w-auto -ml-24 z-0 animate-wing-2"
        />
        </div>        
      </header>
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
        Meet the Team
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamData.map((student) => {
          const isExpanded = expandedCard === student.id;

          return (
            <div
              key={student.id}
              className="bg-white rounded-lg shadow-xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105"
              onClick={() => handleCardClick(student.id)}
            >
              {/* --- (4) REPLACEMENT: Initials Circle --- */}
              <div className="w-full h-64 flex items-center justify-center bg-gray-100">
                <div 
                  className={`w-36 h-36 rounded-full flex items-center justify-center ${student.bgColor}`}
                >
                  <span className="text-5xl font-bold text-white">
                    {getInitials(student.name)}
                  </span>
                </div>
              </div>

              {/* Always Visible Part (with \n support) */}
              <h3 className="text-2xl font-semibold p-4 text-center whitespace-pre-line">
                {student.name}
              </h3>

              {/* Expandable Section */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  isExpanded ? 'max-h-96 p-4' : 'max-h-0'
                }`}
              >
                <p className="text-gray-900 whitespace-pre-line ">
                  {student.details}
                </p>
                <div className="flex justify-center mt-4">
                  <a 
                    href={student.linkedinUrl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                    onClick={(e) => e.stopPropagation()} 
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* GitHub Repo Button */}
      <div className="text-center mt-16">
        <a
          href="https://github.com/krishsamala/Kumbhkaran-food-delivery-app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gray-900 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-300"
        >
          View Project Repository on GitHub
        </a>
      </div>

    </div>
  );
}

export default AboutUs;