import { Tab } from "./class/Tab.ts";

window.addEventListener("load", () => {
  new Tab();
});

window.addEventListener("DOMContentLoaded", () => {
  const img = document.querySelector("#concept .section-title");
  console.log(img.innerHTML);
});
