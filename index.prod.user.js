// ==UserScript==
// @name        Get HTML With Shadow Roots
// @namespace   https://github.com/ryn-cx/get-html-with-shadow-roots
// @version     0.1.0
// @author      ryn-cx
// @source      https://github.com/ryn-cx/get-html-with-shadow-roots
// @match       *://*/*
// @grant       GM.registerMenuCommand
// @grant       GM.setClipboard
// @grant       GM.notification
// @noframes
// @run-at      document-end
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/** Returns every open shadow root inside searchRoot, including shadow roots nested inside other shadow roots. */
function findOpenShadowRoots(searchRoot) {
    const openShadowRoots = [];
    for (const element of searchRoot.querySelectorAll("*")) {
        if (element.shadowRoot !== null) {
            openShadowRoots.push(element.shadowRoot, ...findOpenShadowRoots(element.shadowRoot));
        }
    }
    return openShadowRoots;
}
// TODO: Validate
function copyPageHtmlWithShadowRoots() {
    const openShadowRoots = findOpenShadowRoots(document);
    const pageHtmlWithShadowRoots = `<!doctype html>\n${document.documentElement.getHTML({ shadowRoots: openShadowRoots })}`;
    GM.setClipboard(pageHtmlWithShadowRoots);
    GM.notification(`Copied ${pageHtmlWithShadowRoots.length} HTML with ${openShadowRoots.length} shadow roots.`, "Get HTML With Shadow Roots");
}
GM.registerMenuCommand("Copy page HTML with shadow roots", copyPageHtmlWithShadowRoots);

/******/ })()
;