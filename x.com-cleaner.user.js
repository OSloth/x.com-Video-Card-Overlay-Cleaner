// ==UserScript==
// @name         x.com Video Card & Overlay Cleaner
// @namespace    https://github.com/OSloth
// @version      1.5
// @description  移除影片下方、影片內嵌連結以及「來自 xxx」的浮動跳轉標籤容器
// @license      MIT
// @author       OSloth
// @match        https://x.com/*
// @updateURL    https://raw.githubusercontent.com/OSloth/x.com-Video-Card-Overlay-Cleaner/main/x.com-cleaner.user.js
// @downloadURL  https://raw.githubusercontent.com/OSloth/x.com-Video-Card-Overlay-Cleaner/main/x.com-cleaner.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function cleanUp() {
        removeExternalLinks();
    }

    function removeExternalLinks() {
        // 1. 隱藏所有包含「來自 / From」的跳轉標籤
        document.querySelectorAll('a[role="link"]').forEach(a => {
            const text = a.textContent || '';
            if (text.includes('來自') || text.includes('From')) {
                let target = a;
                if (a.parentElement && a.parentElement.tagName === 'DIV') {
                    target = a.parentElement;
                }

                target.style.setProperty('display', 'none', 'important');
                target.style.setProperty('pointer-events', 'none', 'important');
            }
        });

        // 2. 補充：隱藏直接以 t.me 等外連構成的標籤
        document.querySelectorAll('a[role="link"]').forEach(a => {
            if (a.href && a.href.includes('t.me')) {
                a.style.setProperty('display', 'none', 'important');
                a.style.setProperty('pointer-events', 'none', 'important');
            }
        });
    }

    // 首次執行
    window.addEventListener('load', cleanUp);

    // 動態加載時自動清理
    const observer = new MutationObserver(cleanUp);
    observer.observe(document.body, { childList: true, subtree: true });
})();
