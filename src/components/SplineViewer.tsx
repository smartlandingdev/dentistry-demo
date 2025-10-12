import { useEffect, useRef } from 'react';

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
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <spline-viewer
        url={sceneUrl}
        style={{ width: '100%', height: '100%', display: 'block' }}
      ></spline-viewer>
    </div>
  );
}

// Extend JSX to include custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { url: string; style?: React.CSSProperties },
        HTMLElement
      >;
    }
  }
}
