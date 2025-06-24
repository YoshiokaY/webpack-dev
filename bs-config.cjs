module.exports = {
  server: {
    baseDir: "./htdocs",
    index: "index.html",
  },
  files: ["./htdocs/**/*.html", "./htdocs/**/*.css", "./htdocs/**/*.js"],
  port: 3000,
  notify: false,
  open: "local",
  ui: {
    port: 3001,
  },
};
