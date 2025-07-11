// tailwind.config.js
export default {
  content: [
    './assets/**/*.{js,ts,jsx,tsx,scss}',
    './Components/**/*.{twig,php}',    
    './templates/**/*.{twig,php}',
    './lib/**/*.{twig,php}',
    './inc/**/*.{twig,php}',
    './*.php',
    './Components/BlockImageText/index.twig',
  ],
  safelist: [
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
