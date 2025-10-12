import { useEffect, useRef } from 'react';

// Declare the custom element type
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': any;
    }
  }
}

interface SplineViewerProps {
  sceneUrl?: string;
}

export default function SplineViewer({ sceneUrl = 'https://prod.spline.design/pIag4CnDYhoSg8Pq/scene.splinecode' }: SplineViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if script already exists
    const existingScript = document.querySelector('script[src*="spline-viewer"]');

    if (!existingScript) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@splinetool/viewer@1.10.77/build/spline-viewer.js';
      script.async = true;
      document.head.appendChild(script);
    }

    // Ultra aggressive CSS to hide watermark
    const style = document.createElement('style');
    style.textContent = `
      spline-viewer {
        width: 100% !important;
        height: 100% !important;
        display: block !important;
        position: relative !important;
      }

      /* Nuclear option - hide EVERYTHING except canvas */
      spline-viewer > *:not(canvas),
      spline-viewer div,
      spline-viewer a,
      spline-viewer img,
      spline-viewer svg,
      spline-viewer #logo,
      spline-viewer .logo,
      spline-viewer [class*="logo"],
      spline-viewer [id*="logo"],
      spline-viewer [class*="watermark"],
      spline-viewer [id*="watermark"],
      spline-viewer [href*="spline"],
      spline-viewer [style*="position: absolute"],
      spline-viewer [style*="position: fixed"],
      spline-viewer canvas + *,
      spline-viewer canvas ~ * {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
        width: 0 !important;
        height: 0 !important;
        position: absolute !important;
        left: -99999px !important;
        top: -99999px !important;
        z-index: -9999 !important;
      }

      spline-viewer canvas {
        width: 100% !important;
        height: 100% !important;
        display: block !important;
        position: relative !important;
        z-index: 1 !important;
      }
    `;
    document.head.appendChild(style);

    // Aggressive observer to remove any watermark elements
    const removeWatermarks = () => {
      const viewer = containerRef.current?.querySelector('spline-viewer');
      if (viewer) {
        // Remove all child elements except canvas
        Array.from(viewer.children).forEach((child) => {
          if (child.tagName !== 'CANVAS') {
            child.remove();
          }
        });

        // Also check shadow DOM if it exists
        if (viewer.shadowRoot) {
          const shadowLinks = viewer.shadowRoot.querySelectorAll('a, div:not(:has(canvas))');
          shadowLinks.forEach(el => el.remove());
        }
      }
    };

    const observer = new MutationObserver(() => {
      removeWatermarks();
    });

    // Initial removal
    setTimeout(removeWatermarks, 100);
    setTimeout(removeWatermarks, 500);
    setTimeout(removeWatermarks, 1000);

    if (containerRef.current) {
      observer.observe(containerRef.current, {
        childList: true,
        subtree: true,
        attributes: true
      });
    }

    return () => {
      document.head.removeChild(style);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden"
      style={{
        clipPath: 'inset(0 0 60px 0)'
      }}
    >
      {/* @ts-expect-error - Custom element from Spline library */}
      <spline-viewer
        url={sceneUrl}
        style={{
          width: '100%',
          height: 'calc(100% + 60px)',
          display: 'block',
          position: 'relative',
          top: '0'
        }}
      >
        {/* @ts-expect-error - Custom element from Spline library */}
      </spline-viewer>
    </div>
  );
}
