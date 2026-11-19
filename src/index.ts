/** Returns every open shadow root inside searchRoot, including shadow roots nested inside other shadow roots. */
function findOpenShadowRoots(searchRoot: Document | ShadowRoot): ShadowRoot[] {
  const openShadowRoots: ShadowRoot[] = [];
  for (const element of searchRoot.querySelectorAll("*")) {
    if (element.shadowRoot !== null) {
      openShadowRoots.push(
        element.shadowRoot,
        ...findOpenShadowRoots(element.shadowRoot),
      );
    }
  }
  return openShadowRoots;
}

function copyPageHtmlWithShadowRoots(): void {
  const openShadowRoots = findOpenShadowRoots(document);
  const pageHtmlWithShadowRoots = `<!doctype html>\n${document.documentElement.getHTML({ shadowRoots: openShadowRoots })}`;
  GM.setClipboard(pageHtmlWithShadowRoots);
  alert(`Copied HTML with ${openShadowRoots.length} shadow roots.`);
}

GM.registerMenuCommand(
  "Copy page HTML with shadow roots",
  copyPageHtmlWithShadowRoots,
);
