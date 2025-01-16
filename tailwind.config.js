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
        'spin-slow': 'spinSlow 3s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'bounce-in': 'bounceIn 0.75s ease-out',
        'fade-in-down': 'fadeInDown 1s ease-out',
        'fade-out-up': 'fadeOutUp 1s ease-out',
        'rotate-y': 'rotateY 3s linear infinite',
        'shake': 'shake 0.5s ease-in-out infinite',
        'blink': 'blink 1s infinite',
        'flip': 'flip 1s ease-in-out infinite',
        'swing': 'swing 2s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'neon-glow': 'neonGlow 1.5s ease-in-out infinite', // New animation
        'wave': 'wave 2s ease-in-out infinite', // New animation
        'spin-reverse': 'spinReverse 3s linear infinite', // New animation
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
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.5)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeOutUp: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-20px)' },
        },
        rotateY: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        flip: {
          '0%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(180deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
        swing: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(15deg)' },
          '75%': { transform: 'rotate(-15deg)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
        glow: {
          '0%, 100%': { opacity: '1', filter: 'brightness(100%)' },
          '50%': { opacity: '0.8', filter: 'brightness(150%)' },
        },
        neonGlow: {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 5px #00FFFF)' },
          '50%': { opacity: '0.8', filter: 'drop-shadow(0 0 20px #00FFFF)' },
        },
        wave: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        spinReverse: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
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
        'yellow-500': '#eab308',
        'lime-500': '#84cc16',
        'fuchsia-500': '#d946ef',
        'amber-500': '#f59e0b',
        'emerald-500': '#10b981',
        'rose-500': '#f43f5e',
        'violet-500': '#8b5cf6',
        'sky-500': '#0ea5e9',
        'stone-500': '#78716c',
        'neutral-500': '#737373',
        'crimson-500': '#dc143c',
        'gold-500': '#ffd700',
        'silver-500': '#c0c0c0',
        'bronze-500': '#cd7f32',
        'platinum-500': '#e5e4e2',
        'neon-blue': '#00FFFF', // New color
        'neon-pink': '#FF00FF', // New color
        'neon-green': '#39FF14', // New color
      },

      // Gradients
      backgroundImage: {
        'gradient-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))',
        'gradient-to-b': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
        'gradient-to-br': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
        'gradient-to-tr': 'linear-gradient(to top right, var(--tw-gradient-stops))',
        'gradient-custom': 'linear-gradient(135deg, #6EE7B7, #3B82F6, #9333EA)',
        'gradient-rainbow': 'linear-gradient(90deg, #FF9A8B, #FF6F61, #FF3B2F, #FF0000, #FF7F50, #FFA500, #FFD700)',
        'gradient-sunset': 'linear-gradient(135deg, #FF6F61, #FF3B2F, #FF0000, #FF7F50, #FFA500)',
        'gradient-ocean': 'linear-gradient(135deg, #00C9FF, #92FE9D)',
        'gradient-fire': 'linear-gradient(135deg, #FF416C, #FF4B2B)',
        'gradient-metal': 'linear-gradient(135deg, #c0c0c0, #808080)',
        'gradient-gold': 'linear-gradient(135deg, #ffd700, #ffa500)',
        'gradient-silver': 'linear-gradient(135deg, #c0c0c0, #a8a8a8)',
        'gradient-bronze': 'linear-gradient(135deg, #cd7f32, #8b4513)',
        'gradient-neon': 'linear-gradient(135deg, #00FFFF, #FF00FF, #39FF14)', // New gradient
      },
    },
  },
  plugins: [],
};