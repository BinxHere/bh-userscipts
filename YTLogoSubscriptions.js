// ==UserScript==
// @name  YT Logo Redirector
// @namespace  https://violentmonkey.github.io/
// @version  1.0.2
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

const TARGET_URL = "https://www.youtube.com/feed/subscriptions"; // Could redirect to anything, but honestly I'd just redirect it to Subscriptions

function patchLogo() {
  const logo = document.querySelector('a#logo');
  if (!logo) return;

  logo.href = TARGET_URL;

  logo.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = TARGET_URL;
  }, true);
}

const observer = new MutationObserver(patchLogo);
observer.observe(document.documentElement, { childList: true, subtree: true });
