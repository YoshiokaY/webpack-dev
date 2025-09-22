require('dotenv').config();

const shouldMinify = process.env.MINIFY === "true" || process.env.NODE_ENV === "production";

module.exports = {
  plugins: {
    autoprefixer: {},
    "@tailwindcss/postcss": { 
      optimize: { 
        minify: shouldMinify 
      } 
    },
  },
};
