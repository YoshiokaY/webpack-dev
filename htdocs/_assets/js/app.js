/******/ (function() { // webpackBootstrap
/******/ 	"use strict";

;// ./src/_assets/js/class/Tab.ts
//** タブ */
class Tab {
    constructor(TARGET = ".c_tab", OPEN = "-open") {
        this.target = TARGET;
        this.open = OPEN;
        const btns = document.querySelectorAll(TARGET + "_list li button");
        function onTabClick(e) {
            const event = e.target;
            // イベントターゲットが含まれるタブコンテンツを取得
            const parent = event.closest(TARGET);
            const tabContents = parent?.querySelectorAll(TARGET + "_content");
            const tabArr = Array.prototype.slice.call(tabContents);
            const item = parent?.querySelectorAll(TARGET + "_list li button");
            const itemArr = Array.prototype.slice.call(item);
            // ボタンとパネルを紐づけるための番号取得
            const index = itemArr.indexOf(e.target);
            // タブボタン切り替え
            itemArr.forEach((el) => {
                el.classList.remove(OPEN);
                el.setAttribute("aria-pressed", "false");
                el.setAttribute("tabindex", "0");
            });
            event.classList.add(OPEN);
            event.setAttribute("aria-pressed", "true");
            event.setAttribute("tabindex", "-1");
            // タブパネル切り替え
            tabArr.forEach((tab) => {
                tab.setAttribute("hidden", "");
                tab.setAttribute("tabindex", "-1");
            });
            tabArr[index].removeAttribute("hidden");
            // フォーカスしてもスクロールはしない
            tabArr[index].focus({ preventScroll: true });
        }
        btns.forEach((btn) => {
            btn.addEventListener("click", onTabClick);
        });
        // アンカーリンク調べてそのタブを開く
        if (btns.length > 0) {
            const url = new URL(window.location.href);
            const hash = url.hash;
            if (hash) {
                const number = Number(hash.slice(-1));
                if (!isNaN(number)) {
                    btns[number - 1].click();
                }
            }
        }
    }
}

;// ./src/_assets/js/app.js

window.addEventListener("load", () => {
    new Tab();
});
window.addEventListener("DOMContentLoaded", () => {
    const img = document.querySelector("#concept .section-title");
    console.log(img.innerHTML);
});

/******/ })()
;