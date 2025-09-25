/******/ (function() { // webpackBootstrap
/******/ 	"use strict";

;// ./src/_assets/js/class/sample.ts
// サンプル
class HogeScript {
    constructor() {
        const element = document.querySelector("body");
        if (element) {
            console.log("読み込み完了しました");
        }
    }
}

;// ./src/_assets/js/menu.js

window.addEventListener("load", () => {
    new HogeScript();
});

/******/ })()
;