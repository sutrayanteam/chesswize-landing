**Safari Audit**

Below is the prioritized Safari/WebKit fix list for `chesswize.in`, assuming **Safari 15** minimum support.

## 1. Video issues

1. **CRITICAL**  
   **Where:** [src/App.tsx#L1772](/Users/codex/Downloads/chesswize-landing-page/src/App.tsx#L1772)  
   **Cause:** The modal video uses `controls autoPlay playsInline` but **is not muted**. On Safari/iOS, autoplay without a user gesture is only reliably allowed for silent video or video that starts muted. Even though opening the modal came from a click, Safari does not reliably treat a later mount/effect-driven `autoplay` as the same gesture chain.  
   **Fix:** Do not depend on `autoPlay` here. Start playback **imperatively inside the same click handler** that opens the modal, or mount the modal video as `muted` first and unmute only after a user interaction inside the modal. Best pattern:
   - pass a `shouldStartWithSound` flag
   - on the button click, open modal and set a state that causes a `video.play()` call in a `requestAnimationFrame` or layout effect
   - if `play()` rejects, show a large play button overlay
   - optionally start `muted` and let the user unmute via controls

2. **CRITICAL**  
   **Where:** [src/App.tsx#L185-L195](/Users/codex/Downloads/chesswize-landing-page/src/App.tsx#L185), [src/App.tsx#L303-L316](/Users/codex/Downloads/chesswize-landing-page/src/App.tsx#L303)  
   **Cause:** The hero video is autoplaying muted, then you toggle audio live. WebKit’s autoplay policy explicitly allows muted autoplay, but if a video becomes unmuted outside a valid gesture context, Safari may pause or reject playback. Your current click handler is close, but Safari is still fragile when React state and DOM media state drift.  
   **Fix:** Keep the DOM property as the source of truth during playback:
   - read `const next = !v.muted` instead of `!muted`
   - set `v.muted = next`
   - call `await v.play()` inside the click handler
   - only then `setMuted(v.muted)`  
   Also add a `play/pause` fallback UI if `play()` rejects. Do not assume the state flip means sound started.

3. **CRITICAL**  
   **Where:** [src/App.tsx#L303-L316](/Users/codex/Downloads/chesswize-landing-page/src/App.tsx#L303), [src/App.tsx#L171-L183](/Users/codex/Downloads/chesswize-landing-page/src/App.tsx#L171)  
   **Cause:** This is the right direction for Safari, but the implementation still mixes:
   - boolean React state
   - DOM `muted` property
   - autoplay retry logic  
   Safari is much safer when the video is treated as an imperative media element, not a declarative React-controlled one.  
   **Fix:** For the hero video:
   - render `muted` as a static attribute for initial autoplay
   - after mount, manage mute/play only through `videoRef.current`
   - sync React UI from DOM state on `volumechange` / `play` / `pause`
   - avoid relying on React rerender timing for media policy-sensitive behavior

4. **MAJOR**  
   **Where:** [src/App.tsx#L315](/Users/codex/Downloads/chesswize-landing-page/src/App.tsx#L315), [src/App.tsx#L1775](/Users/codex/Downloads/chesswize-landing-page/src/App.tsx#L1775)  
   **Cause:** Hero video now uses `<source type="video/mp4">`, which is better for Safari than bare `src` because source selection and MIME sniffing are more reliable. The modal still uses bare `src`. Safari usually handles `src`, but using `<source>` is the safer and more consistent pattern.  
   **Fix:** Change the modal video to:
   ```tsx
   <video ...>
     <source src={src} type="video/mp4" />
   </video>
   ```
   If you add alternate formats later, Safari will degrade more predictably.

5. **MAJOR**  
   **Where:** [src/App.tsx#L309-L310](/Users/codex/Downloads/chesswize-landing-page/src/App.tsx#L309)  
   **Cause:** `playsInline` is required and present. The legacy `webkit-playsinline` attribute is also added, which is good for WebKit edge cases. The modal video does **not** include it.  
   **Fix:** Add the same legacy attribute to the modal video too. It is low-cost and improves old iOS Safari behavior.

6. **MAJOR**  
   **Where:** [src/App.tsx#L1718-L1735](/Users/codex/Downloads/chesswize-landing-page/src/App.tsx#L1718)  
   **Cause:** On modal close, you try to resume background videos with `v.play().catch(() => {})`. If the hero video was unmuted before opening the modal, Safari may reject resume because it no longer qualifies for autoplay.  
   **Fix:** Only auto-resume videos that are still muted:
   - capture `{ element, wasMuted }`
   - resume only when `element.muted === true`
   - otherwise leave paused and require user interaction

7. **MAJOR**  
   **Where:** [index.html#L17](/Users/codex/Downloads/chesswize-landing-page/index.html#L17), [src/App.tsx#L312](/Users/codex/Downloads/chesswize-landing-page/src/App.tsx#L312), [src/App.tsx#L1780](/Users/codex/Downloads/chesswize-landing-page/src/App.tsx#L1780)  
   **Cause:** Posters are `.webp`. Safari 15 is fine, but Safari 13 is not. Since you asked for Safari-specific audit and called this out, there is no fallback today.  
   **Fix:** Add JPEG fallback with `<picture>` for poster-like surfaces where possible, or keep duplicate `.jpg` posters and switch based on feature detection if you truly care about Safari 13/macOS Catalina. For your stated minimum Safari 15, this is not blocking, but it is the right fallback if you want broader WebKit coverage.

8. **MINOR**  
   **Where:** [src/App.tsx#L311](/Users/codex/Downloads/chesswize-landing-page/src/App.tsx#L311), [src/App.tsx#L1779](/Users/codex/Downloads/chesswize-landing-page/src/App.tsx#L1779)  
   **Cause:** `preload="metadata"` on the hero video is correct for Safari. `preload="auto"` on every modal instance is more aggressive than needed, especially on iOS with bandwidth and battery constraints.  
   **Fix:** Keep:
   - hero: `metadata`
   - modal: prefer `metadata` unless fast-start testing proves `auto` is needed  
   Since the modal is click-initiated, `metadata` is usually enough.

## 2. CSS / layout issues

9. **MAJOR**  
   **Where:** [src/index.css#L60-L62](/Users/codex/Downloads/chesswize-landing-page/src/index.css#L60)  
   **Cause:** `text-wrap: balance` is not safe for Safari 15. On Safari 15 it will be ignored, which is fine functionally, but heading wrapping will differ from your intended design.  
   **Fix:** Guard it:
   ```css
   h1, h2, h3 {
     overflow-wrap: anywhere;
   }

   @supports (text-wrap: balance) {
     h1, h2, h3 {
       text-wrap: balance;
       overflow-wrap: normal;
     }
   }
   ```
   This gives Safari 15 a decent fallback instead of just default wrapping.

10. **MINOR**  
    **Where:** [src/index.css#L121-L126](/Users/codex/Downloads/chesswize-landing-page/src/index.css#L121), [src/index.css#L222-L230](/Users/codex/Downloads/chesswize-landing-page/src/index.css#L222), plus multiple `backdrop-blur-*` utility usages in [src/App.tsx#L321](/Users/codex/Downloads/chesswize-landing-page/src/App.tsx#L321), [src/App.tsx#L333](/Users/codex/Downloads/chesswize-landing-page/src/App.tsx#L333), [src/App.tsx#L362](/Users/codex/Downloads/chesswize-landing-page/src/App.tsx#L362), [src/App.tsx#L1748](/Users/codex/Downloads/chesswize-landing-page/src/App.tsx#L1748), [src/App.tsx#L1768](/Users/codex/Downloads/chesswize-landing-page/src/App.tsx#L1768), [src/App.tsx#L1820](/Users/codex/Downloads/chesswize-landing-page/src/App.tsx#L1820)  
    **Cause:** Your custom classes correctly include `-webkit-backdrop-filter`, but Tailwind utility-generated `backdrop-blur-*` rules depend on the generated CSS. Modern Tailwind usually emits the prefixed version through tooling, but Safari blur surfaces are still a frequent failure point if the final CSS is not prefixed as expected.  
    **Fix:** Verify the built CSS contains `-webkit-backdrop-filter` for utility-based blur too. If not, replace Safari-critical surfaces with custom classes like `gs-glass` / `glass-panel`.

11. **MINOR**  
    **Where:** [src/App.tsx#L302](/Users/codex/Downloads/chesswize-landing-page/src/App.tsx#L302), [src/App.tsx#L1807](/Users/codex/Downloads/chesswize-landing-page/src/App.tsx#L1807)  
    **Cause:** `aspect-square` and `aspect-[9/16]` are supported in Safari 15. The main Safari risk is not support, but flex item sizing around aspect-ratio in constrained containers. Your `VideoCard` uses `flex-shrink-0` which helps.  
    **Fix:** No urgent change. If you see squashing in Safari, add explicit width plus `min-width: 0` / `min-height: 0` on surrounding flex items.

12. **MINOR**  
    **Where:** throughout `src/App.tsx` flex layouts using `gap-*`  
    **Cause:** Flexbox gap is supported in Safari 15. No issue for your support floor.  
    **Fix:** None needed.

13. **MINOR**  
    **Where:** `object-cover` usage on images and videos, e.g. [src/App.tsx#L313](/Users/codex/Downloads/chesswize-landing-page/src/App.tsx#L313), [src/App.tsx#L1813](/Users/codex/Downloads/chesswize-landing-page/src/App.tsx#L1813)  
    **Cause:** Safari 15 supports `object-fit` and `object-position`.  
    **Fix:** None needed.

14. **MINOR**  
    **Where:** `scrollbar-gutter`, `@container`, CSS nesting, `fit-content`, `min-width: fit-content`  
    **Cause:** I do not see these in the shipped code you provided.  
    **Fix:** None needed.

## 3. JavaScript / runtime issues

15. **CRITICAL**  
    **Where:** [src/App.tsx#L1728-L1734](/Users/codex/Downloads/chesswize-landing-page/src/App.tsx#L1728)  
    **Cause:** `document.body.style.overflow = "hidden"` is not reliable scroll lock on iOS Safari. The body can still rubber-band or the page can jump when the modal closes.  
    **Fix:** Use iOS-safe scroll locking:
    - store `const scrollY = window.scrollY`
    - set body styles:
      - `position: fixed`
      - `top: -${scrollY}px`
      - `left: 0`
      - `right: 0`
      - `width: 100%`
      - optionally `overflow: hidden`
    - on close, restore styles and `window.scrollTo(0, scrollY)`  
    This is a common Safari-specific fix.

16. **MAJOR**  
    **Where:** [vite.config.ts](/Users/codex/Downloads/chesswize-landing-page/vite.config.ts)  
    **Cause:** `build.target = 'esnext'` is too loose if Safari 15 is your minimum. Vite may leave syntax/features untranspiled that Safari 15 does not handle as well as newer engines.  
    **Fix:** Set a real browser floor, for example:
    ```ts
    build: {
      target: ['safari15', 'chrome107', 'firefox104', 'edge107'],
    }
    ```
    This is not a confirmed current bug, but it is the wrong compatibility policy for your stated support target.

17. **MINOR**  
    **Where:** `ResizeObserver`, `IntersectionObserver`, `structuredClone`, `.at()`  
    **Cause:** I do not see these APIs used in the shipped app code.  
    **Fix:** None needed.

18. **MINOR**  
    **Where:** Framer Motion usage throughout `src/App.tsx`  
    **Cause:** Motion itself is generally fine on Safari 15. Your animations are simple transforms/opacity. The bigger Safari issue is media policy, not motion.  
    **Fix:** None needed. Keep reduced-motion handling, which you already have in [src/index.css#L65-L72](/Users/codex/Downloads/chesswize-landing-page/src/index.css#L65).

## 4. Forms on Safari

19. **MAJOR**  
    **Where:** [src/App.tsx#L3115-L3116](/Users/codex/Downloads/chesswize-landing-page/src/App.tsx#L3115)  
    **Cause:** `child_name` has no `autoComplete` hint. Safari autofill is aggressive and can inject parent data into the wrong fields.  
    **Fix:** Add explicit autocomplete tokens where possible:
    - parent name: already good with `name`
    - phone: already good with `tel`
    - city: already good with `address-level2`
    - child name: use `autocomplete="off"` if you do not want Safari to guess, or leave it blank intentionally but test autofill

20. **MINOR**  
    **Where:** [src/App.tsx#L3069](/Users/codex/Downloads/chesswize-landing-page/src/App.tsx#L3069)  
    **Cause:** `type="tel"` with `inputMode="tel"` is good on Safari.  
    **Fix:** None needed.

21. **MAJOR**  
    **Where:** [src/App.tsx#L3134-L3140](/Users/codex/Downloads/chesswize-landing-page/src/App.tsx#L3134)  
    **Cause:** The checkbox styling relies on modern selector behavior in the label class: `has-[:checked]:...`. Safari 15 does **not** support `:has()`.  
    **Fix:** This is a real Safari 15 compatibility break for the checked-state card styling. The checkbox still works, but the visual selected card state will fail. Replace with a JS/class-based checked state or use `peer` patterns that do not require `:has()`.

22. **MINOR**  
    **Where:** focus styles throughout, e.g. [src/App.tsx#L138](/Users/codex/Downloads/chesswize-landing-page/src/App.tsx#L138), [src/App.tsx#L1805](/Users/codex/Downloads/chesswize-landing-page/src/App.tsx#L1805)  
    **Cause:** `:focus-visible` is supported across modern Safari, including your support floor.  
    **Fix:** None needed for Safari 15. If you ever widen support lower, add a `:focus` fallback.

## 5. Fonts / typography

23. **MINOR**  
    **Where:** [index.html#L12-L15](/Users/codex/Downloads/chesswize-landing-page/index.html#L12)  
    **Cause:** Google Fonts preload with `as="style"` is not harmful, but some Safari versions don’t gain much from it. It’s not a bug, just limited payoff.  
    **Fix:** Keep `preconnect`. The safest simple setup is often just:
    - `preconnect` to both origins
    - normal stylesheet link  
    Your current setup is acceptable.

24. **MINOR**  
    **Where:** [src/index.css#L45](/Users/codex/Downloads/chesswize-landing-page/src/index.css#L45)  
    **Cause:** Plus Jakarta Sans weights used here are standard and Safari-safe. No special Safari weight issue stands out.  
    **Fix:** None needed.

## 6. Service worker / PWA / storage

25. **MINOR**  
    **Where:** repo-wide  
    **Cause:** I do not see a service worker, cache storage strategy, or client storage dependency in the shipped app.  
    **Fix:** None needed.

## 7. Fetch / XHR / analytics / ITP

26. **MINOR**  
    **Where:** [src/App.tsx#L2951-L2959](/Users/codex/Downloads/chesswize-landing-page/src/App.tsx#L2951), [worker/wrangler.toml](/Users/codex/Downloads/chesswize-landing-page/worker/wrangler.toml)  
    **Cause:** `/api/leads` is same-origin, so Safari ITP and CORS are not a problem here. This is the correct setup.  
    **Fix:** None needed.

27. **MINOR**  
    **Where:** analytics/pixels in [index.html#L69-L75](/Users/codex/Downloads/chesswize-landing-page/index.html#L69)  
    **Cause:** No active third-party pixels are loaded, so Safari ITP is currently irrelevant.  
    **Fix:** None needed now. When pixels are added later, expect Safari to reduce third-party cookie usefulness.

## Recommended fix order

1. **Fix modal playback start logic** so it does not rely on plain `autoPlay` with unmuted media.  
2. **Stabilize hero mute/unmute** around DOM media state, not React state timing.  
3. **Replace `:has()`-based checkbox card styling** for Safari 15.  
4. **Fix iOS Safari scroll locking** in the modal.  
5. **Set Vite build target to Safari 15-compatible output.**  
6. **Add `text-wrap` fallback** and optionally poster fallbacks if you want Safari 13 coverage.

## Likely root cause of the reported bug

The most likely Safari failure is this combination:

- hero video depends on Safari muted autoplay rules, then changes mute state live
- modal video mounts with `autoPlay` but **without `muted`**
- Safari does not reliably treat that modal mount as a valid autoplay-with-sound gesture continuation

That means the **highest-probability direct fix** is:

- hero: keep autoplay muted, unmute only via explicit `play()` inside user click
- modal: do **not** rely on `autoPlay` for sound-on start; either start muted or call `play()` from the opening click path and show a manual fallback if rejected

## Sources

- WebKit autoplay/inline video policy: https://webkit.org/blog/6784/new-video-policies-for-ios/
- MDN autoplay guide: https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay
- MDN `<video>`: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
- MDN `text-wrap`: https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap
- MDN `:focus-visible`: https://developer.mozilla.org/en-US/docs/Web/CSS/%3Afocus-visible
- MDN image formats/WebP overview: https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types
- MDN `scrollbar-gutter`: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scrollbar-gutter

I could not update `HANDOFF.md` or write code because this session is read-only.

- **Critical:** modal **video autoplay**
- **Critical:** hero **mute/unmute Safari path**
- **Major:** Safari 15 **`:has()`** styling break
- **Major:** iOS **scroll lock**
- **Major:** Vite **`esnext` target**
