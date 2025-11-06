/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      
      // --- ADD THIS ---
      keyframes: {
        flap: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }, // How high the flap goes
        }
      },
      animation: {
        flap: 'flap 2s infinite ease-in-out', // The animation itself
      }
      // --- END ADD ---

    },
  },
  plugins: [],
}

