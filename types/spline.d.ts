declare namespace JSX {
  interface IntrinsicElements {
    'spline-viewer': SplineViewerAttributes;
  }
}

interface SplineViewerAttributes extends React.HTMLAttributes<HTMLElement> {
  url?: string;
  loading?: 'lazy' | 'eager';
  width?: string | number;
  height?: string | number;
}
