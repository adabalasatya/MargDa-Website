/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Animations
      animation: {
        'pulse-slow': 'pulseSlow 8s infinite',
        'fade-in-up': 'fadeInUp 1s ease-out',
        'fade-in-left': 'fadeInLeft 1s ease-out',
        'fade-in-right': 'fadeInRight 1s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slideUp 1.5s ease-out forwards',
        'slide-down': 'slideDown 0.5s ease-out forwards',
        'bounce-slow': 'bounceSlow 2s infinite',
        'rotate-3d': 'rotate3D 5s linear infinite',
        'scale-bounce': 'scaleBounce 1.5s ease-out infinite',
        'zoom-in': 'zoomIn 0.5s ease-out forwards',
        'zoom-out': 'zoomOut 0.5s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-in-left': 'slideInLeft 1s ease-out forwards',
        'slide-in-right': 'slideInRight 1s ease-out forwards',
      },

      // Keyframes
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        rotate3D: {
          '0%': { transform: 'rotateX(0deg) rotateY(0deg)' },
          '100%': { transform: 'rotateX(360deg) rotateY(360deg)' },
        },
        scaleBounce: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        zoomOut: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.8)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },

      // Colors
      colors: {
        'blue-600': '#2563eb',
        'blue-700': '#1d4ed8',
        'gray-500': '#6b7280',
        'gray-900': '#111827',
        'purple-600': '#9333ea',
        'indigo-600': '#4f46e5',
        'orange-500': '#f97316',
        'green-500': '#22c55e',
        'red-500': '#ef4444',
        'pink-500': '#ec4899',
        'teal-500': '#14b8a6',
        'cyan-500': '#06b6d4',
        'yellow-500': '#eab308', // New yellow color
        'lime-500': '#84cc16', // New lime green
        'fuchsia-500': '#d946ef', // New fuchsia
        'amber-500': '#f59e0b', // New amber
      },

      // Gradients
      backgroundImage: {
        'gradient-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))',
        'gradient-to-b': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
        'gradient-to-br': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
        'gradient-to-tr': 'linear-gradient(to top right, var(--tw-gradient-stops))',
        'gradient-custom': 'linear-gradient(135deg, #6EE7B7, #3B82F6, #9333EA)',
      },
    },
  },
  plugins: [],
};
