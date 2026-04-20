# Changelog

## 2026-04-20 11:35

- Safari video playback: modal playback now uses one persistent `<video>` element and a synchronous click-time `play()` call to preserve the WebKit user-gesture chain
- Hero autoplay reliability: retry `play()` on `loadedmetadata` and `canplay`, not only on mount timing
- Active video elements now use direct `src` attributes instead of nested `<source>` children to reduce Safari media parsing edge cases
