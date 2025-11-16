import React from 'react';

const IntroVideoPage = ({ setActivePage }) => {

  // This function is called when the video finishes playing
  const handleVideoEnd = () => {
    console.log("Video ended, navigating to Home...");
    setActivePage('Home');
  };

  // Optional: Allow user to skip
  const handleSkip = () => {
    console.log("Skipping intro, navigating to Home...");
    setActivePage('Home');
  };

  return (
    <div className="relative h-screen w-screen bg-black">
      {/* The Video Player */}
      <video
        className="h-full w-full object-cover"
        src="/videos/intro.mp4" // Path from the 'public' folder
        autoPlay      // Start playing automatically
        // muted         // REQUIRED for autoplay in most browsers
        onEnded={handleVideoEnd} // Event listener for when it finishes
      >
        Your browser does not support the video tag.
      </video>

      {/* Optional: Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute bottom-10 right-10 bg-white/50 text-black font-bold py-2 px-6 rounded-lg backdrop-blur-sm hover:bg-white transition-all"
      >
        Skip Intro
      </button>
    </div>
  );
};

export default IntroVideoPage;