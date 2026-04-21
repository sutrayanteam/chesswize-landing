/**
 * Cloudflare Turnstile — explicit-render helper.
 *
 * The script tag in index.html uses `?render=explicit` so widgets don't
 * auto-mount on every `.cf-turnstile` element. React-owned DOM is fragile
 * to external mutation, so we explicitly call turnstile.render() from
 * within the component's effect and tear it down via turnstile.remove()
 * on unmount — no orphaned iframes if the form re-renders.
 */

const DEFAULT_SITE_KEY = (import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined) ?? "1x00000000000000000000AA";

interface TurnstileOptions {
  sitekey: string;
  callback?: (token: string) => void;
  "error-callback"?: (code: string) => void;
  "expired-callback"?: () => void;
  "timeout-callback"?: () => void;
  theme?: "auto" | "light" | "dark";
  size?: "normal" | "compact" | "flexible";
  action?: string;
  appearance?: "always" | "execute" | "interaction-only";
}

interface TurnstileApi {
  render: (container: string | HTMLElement, options: TurnstileOptions) => string;
  remove: (widgetId: string) => void;
  reset: (widgetId?: string) => void;
  getResponse: (widgetId?: string) => string | undefined;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

/** Resolve once the Turnstile library has loaded. Times out at 10s. */
export function turnstileReady(): Promise<TurnstileApi | null> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(null);
    if (window.turnstile) return resolve(window.turnstile);
    let tries = 0;
    const iv = window.setInterval(() => {
      tries++;
      if (window.turnstile) {
        window.clearInterval(iv);
        resolve(window.turnstile);
      } else if (tries > 100) {
        window.clearInterval(iv);
        resolve(null);
      }
    }, 100);
  });
}

export async function renderTurnstile(
  container: HTMLElement,
  onToken: (t: string) => void,
  onExpire?: () => void,
  onError?: (code?: string) => void,
): Promise<string | null> {
  const api = await turnstileReady();
  if (!api) {
    // Script never loaded at all — surface as an error so the UI can recover.
    onError?.("script_unavailable");
    return null;
  }
  // turnstile.render() can throw synchronously on bad sitekey / duplicate
  // render / CF edge issues. Without this catch, the error vanishes and the
  // caller is left with token=null, error=null — the infamous "Verifying..."
  // deadlock. Surface it via onError instead.
  try {
    return api.render(container, {
      sitekey: DEFAULT_SITE_KEY,
      action: "lead_submit",
      callback: onToken,
      "expired-callback": onExpire,
      "error-callback": (code?: string) => { onError?.(code); },
      "timeout-callback": () => { onError?.("timeout"); },
      theme: "light",
      // "flexible" has caused silent no-render on mobile layouts;
      // "normal" is the stock checkbox widget and renders reliably.
      size: "normal",
    });
  } catch (err) {
    onError?.(`render_threw:${String(err).slice(0, 80)}`);
    return null;
  }
}

export async function removeTurnstile(widgetId: string): Promise<void> {
  const api = await turnstileReady();
  if (!api) return;
  try {
    api.remove(widgetId);
  } catch {
    /* already gone */
  }
}

export async function resetTurnstile(widgetId: string): Promise<void> {
  const api = await turnstileReady();
  if (!api) return;
  try {
    api.reset(widgetId);
  } catch {
    /* widget gone — ignore */
  }
}
