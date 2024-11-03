// ==UserScript==
// @name         Reddit r/ Link Converter (Whitespace Aware)
// @namespace    https://violentmonkey.github.io/
// @version      1.1.0
// @description  Convert r/[subreddit] text into clickable Reddit hyperlinks only if surrounded by whitespace or at the beginning of a line.
// @author       BinxHere
// @match        http://*/*
// @match        https://*/*
// @license      The Unlicense
// @exclude      *.google.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to convert "r/[subreddit]" text into clickable hyperlinks, ensuring it's surrounded by whitespace or at the start of a line
    function convertToLinks() {
        // Define the regular expression to find "r/[subreddit]" patterns surrounded by whitespace or line boundaries
        const regex = /(^|\s)r\/([a-zA-Z0-9_]+)(?=\s|$)/g;

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
                    let newHTML = node.textContent.replace(regex, function(match, p1, p2) {
                        return `${p1}<a href="https://www.reddit.com/r/${p2}" target="_blank">r/${p2}</a>`;
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
