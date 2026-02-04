// ==UserScript==
// @name  YT Logo Redirector
// @namespace  https://violentmonkey.github.io/
// @version  1.1.0
// @description  Make the YouTube logo in the top left redirect to the Subscriptions page instead of Home
// @author  BinxHere
// @match  https://*.youtube.com/*
// @match  http://*.youtube.com/*
// @run-at  document-start
// @license  GNU V2
// @icon  https://raw.githubusercontent.com/BinxHere/bh-userscipts/refs/heads/main/ytredirectorlogo.png
// @updateURL	 https://raw.githubusercontent.com/BinxHere/bh-userscipts/refs/heads/main/YTLogoSubscriptions.js
// @grant  none
// ==/UserScript==

const TARGET_URL = "/feed/subscriptions";
document.addEventListener('click', (e) => {
    const logoLink = e.target.closest('a#logo');
    if (logoLink) {
        e.preventDefault();
        window.location.href = TARGET_URL;
    }
}, true);
