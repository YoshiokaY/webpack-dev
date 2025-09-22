import fs from "fs";
import chokidar from "chokidar";
import { glob } from "glob";

const matches = glob.sync("src/_assets/css/**/_*.scss");

const watcher = chokidar.watch(matches.length > 0 ? matches : "src/_assets/css/**/_*.scss", {
  ignoreInitial: true,
  persistent: true,
  followSymlinks: true,
  depth: 99,
  awaitWriteFinish: {
    stabilityThreshold: 200,
    pollInterval: 100
  }
});

watcher.on("change", (changedFile) => {
  const mainScssFiles = glob.sync("src/_assets/css/*.scss", {
    ignore: ["**//_*.scss"]
  });
  
  mainScssFiles.forEach(file => {
    const content = fs.readFileSync(file, "utf8");
    fs.writeFileSync(file, content, "utf8");
  });
});
