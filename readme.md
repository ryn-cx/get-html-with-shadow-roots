<!-- TODO: Validate -->
# Get HTML With Shadow Roots

Userscript that copies the webpage's entire content including the shadow roots.

## Installation

1. Install a userscript manager in the browser.
2. [Install the userscript](https://raw.githubusercontent.com/ryn-cx/get-html-with-shadow-roots/gh-pages/index.prod.user.js).

## Why it exists

Web browsers do not have an easy way to copy a page's HTML with its shadow roots included.

## Alternatives to This Userscript

- **Manual reconstruction** The web browser can only copy shadow roots one at a time, by right-clicking the
  `#shadow-root` node and choosing **Copy → Inner HTML**. This is a slow and tedious
  process that requires the user to manually rebuild the HTML by hand.
- **Running a snippet** A snippet can do it by running `document.documentElement.getHTML()` with
  every shadow root passed in its `shadowRoots` option. This works well, but
  it's convenient to have a single button instead of having to constantly
  copy and paste a snippet.

  ```js
  function findOpenShadowRoots(searchRoot) {
    const openShadowRoots = [];
    for (const element of searchRoot.querySelectorAll("*")) {
      if (element.shadowRoot !== null) {
        openShadowRoots.push(element.shadowRoot, ...findOpenShadowRoots(element.shadowRoot));
      }
    }
    return openShadowRoots;
  }

  copy(`<!doctype html>\n${document.documentElement.getHTML({ shadowRoots: findOpenShadowRoots(document) })}`);
  ```

## Limitation

- **Closed shadow roots are not copied.** A userscript cannot access a shadow root created with `mode: "closed"`, because `element.shadowRoot` is `null` for it.


## Build

```bash
npm run build
```

`dist/index.prod.user.js` is the final script. you can manually copy it to greasyfork for deploy.
