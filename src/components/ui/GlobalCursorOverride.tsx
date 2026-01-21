import { useEffect } from 'react';

function GlobalCursorOverride() {
  useEffect(() => {
    // Transparent 1x1 PNG cursor for Chrome compatibility
    const transparentCursor = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==) 1 1, auto";

    // Force cursor: none on body continuously
    const enforceCursor = () => {
      document.body.style.cursor = transparentCursor;
      document.documentElement.style.cursor = transparentCursor;
    };

    // Initial enforcement
    enforceCursor();

    // Monitor for any changes and re-enforce
    const observer = new MutationObserver(enforceCursor);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style'],
      subtree: false
    });

    // Chrome-specific: Use RAF loop with setProperty for stronger enforcement
    let rafId: number;
    const continuousEnforce = () => {
      document.body.style.setProperty('cursor', transparentCursor, 'important');
      document.documentElement.style.setProperty('cursor', transparentCursor, 'important');
      rafId = requestAnimationFrame(continuousEnforce);
    };
    rafId = requestAnimationFrame(continuousEnforce);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
      document.body.style.cursor = 'auto';
      document.documentElement.style.cursor = 'auto';
    };
  }, []);

  return (
    <style dangerouslySetInnerHTML={{
      __html: `
        /* Chrome-compatible cursor hiding using 1x1 transparent PNG */
        html, body, #root, *, *::before, *::after {
          cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==) 1 1, auto !important;
        }
        
        /* Specific overrides for interactive elements in all states */
        a, button, [role="button"], 
        a:hover, button:hover, [role="button"]:hover,
        a:focus, button:focus, [role="button"]:focus,
        a:active, button:active, [role="button"]:active {
          cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==) 1 1, auto !important;
        }

        /* Chakra UI specific overrides */
        .chakra-button, .chakra-link, .chakra-menu__item,
        .chakra-button:hover, .chakra-link:hover, .chakra-menu__item:hover {
          cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==) 1 1, auto !important;
        }
        
        /* Restore for inputs */
        input, textarea, [contenteditable="true"], select, option {
          cursor: text !important;
        }
        
        /* Ensure chakra portals don't override */
        .chakra-portal, .chakra-modal__content, .chakra-modal__overlay {
          cursor: none !important;
        }
      `
    }} />
  );
}

export default GlobalCursorOverride;
