/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    "tailwindcss",
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        "autoprefixer": {
          "flexbox": "no-2009"
        },
        "stage": 0,
        "features": {
          "custom-properties": false,
          "nesting-rules": true
        }
      }
    ]
  ]
};

export default config;
