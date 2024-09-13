// ==UserScript==
// @name         Reddit r/ Link Converter with Existence Check
// @namespace    https://violentmonkey.github.io/
// @version      1.1.0
// @description  Convert r/[subreddit] text into clickable Reddit hyperlinks if the subreddit exists.
// @author       BinxHere
// @match        http://*/*
// @match        https://*/*
// @license      The Unlicense
// @exclude      *.google.com
// @icon         https://raw.githubusercontent.com/BinxHere/bh-userscipts/main/redact%20thing.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to check if a subreddit exists
    function checkSubredditExists(subreddit) {
        return fetch(`https://www.reddit.com/r/${subreddit}/about.json`)
            .then(response => {
                if (response.ok) return true; // Subreddit exists
                else return false; // Subreddit does not exist
            })
            .catch(() => false); // Handle network errors or other issues
    }

    // Function to convert "r/[subreddit]" text into clickable hyperlinks if the subreddit exists
    async function convertToLinks() {
        const regex = /r\/([a-zA-Z0-9_]+)/g;

        // Iterate through all text nodes in the document body
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        const nodes = [];

        while (walker.nextNode()) {
            nodes.push(walker.currentNode);
        }

        for (const node of nodes) {
            const parent = node.parentNode;

            // Only modify nodes that are not already within a link or a script/style tag
            if (parent && parent.nodeName !== 'A' && parent.nodeName !== 'SCRIPT' && parent.nodeName !== 'STYLE') {
                const matches = node.textContent.match(regex);
                if (matches) {
                    let newHTML = node.textContent;

                    for (const match of matches) {
                        const subreddit = match.split('/')[1];
                        const exists = await checkSubredditExists(subreddit);

                        if (exists) {
                            newHTML = newHTML.replace(match, `<a href="https://www.reddit.com/r/${subreddit}" target="_blank">${match}</a>`);
                        }
                    }

                    const span = document.createElement('span');
                    span.innerHTML = newHTML;
                    parent.replaceChild(span, node);
                }
            }
        }
    }

    // Run the function after the page content is fully loaded
    window.addEventListener('load', convertToLinks);
})();
