/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  // 🔥 O SEGREDO: 'safelist' força essas classes a existirem no site final
  safelist: [
    // Cores de fundo das colunas
    'bg-blue-200', 'border-blue-400',
    'bg-yellow-100', 'border-yellow-400',
    'bg-green-100', 'border-green-600',
    'bg-purple-100', 'border-purple-400',
    
    // Fundo geral e layout
    'bg-gray-200', 
    'text-gray-800',
    'grid', 
    'grid-cols-1', 
    'md:grid-cols-2', 
    'xl:grid-cols-4', 
    'gap-4'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};