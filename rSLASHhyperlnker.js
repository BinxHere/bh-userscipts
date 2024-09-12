// ==UserScript==
// @name         Reddit r/ Link Converter
// @namespace    https://violentmonkey.github.io/
// @version      1.0.2
// @description  Convert r/[subreddit] text into clickable Reddit hyperlinks. This script was made with help of chatgpt
// @author       BinxHere
// @match        http://*/*
// @match        https://*/*
// @license      The Unlicense
// @exclude    *.google.com
// @icon         https://raw.githubusercontent.com/BinxHere/bh-userscipts/main/redact%20thing.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to convert "r/[subreddit]" text into clickable hyperlinks
    function convertToLinks() {
        // Define the regular expression to find "r/[subreddit]" patterns
        const regex = /r\/([a-zA-Z0-9_]+)/g;

        // Iterate through all text nodes in the document body
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        const nodes = [];

        while (walker.nextNode()) {
            nodes.push(walker.currentNode);
        }

        nodes.forEach(node => {
            const parent = node.parentNode;

            // Only modify nodes that are not already within a link or a script/style tag
            if (parent && parent.nodeName !== 'A' && parent.nodeName !== 'SCRIPT' && parent.nodeName !== 'STYLE') {
                const matches = node.textContent.match(regex);
                if (matches) {
                    let newHTML = node.textContent.replace(regex, function(match, p1) {
                        return `<a href="https://www.reddit.com/r/${p1}" target="_blank">${match}</a>`;
                    });

                    const span = document.createElement('span');
                    span.innerHTML = newHTML;
                    parent.replaceChild(span, node);
                }
            }
        });
    }

    // Run the function after the page content is fully loaded
    window.addEventListener('load', convertToLinks);
})();
