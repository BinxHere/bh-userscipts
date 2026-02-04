// ==UserScript==
// @name         YT Logo Redirector
// @namespace    https://violentmonkey.github.io/
// @version      1.0.1
// @description  Make the YouTube logo in the top left redirect to the Subscriptions page instead of Home
// @author       BinxHere
// @match       https://*.youtube.com/*
// @match       http://*.youtube.com/*
// @run-at      document-start
// @license      GNU V2
// @updateURL	 https://raw.githubusercontent.com/BinxHere/bh-userscipts/refs/heads/main/YTLogoSubscriptions.js
// @compatible   chrome
// @compatible   firefox
// @compatible   edge
// @compatible   opera
// @compatible   brave
// @compatible   vivaldi
// @compatible   waterfox
// @compatible   librewolf
// @compatible   ghost
// @compatible   qq
// @compatible   whale
// @compatible   kiwi
// @grant        none
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
