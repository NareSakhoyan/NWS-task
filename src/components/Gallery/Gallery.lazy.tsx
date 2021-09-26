import React, { lazy, Suspense } from 'react';

const LazyGallery = lazy(() => import('./Gallery'));

const Gallery = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyGallery {...props} />
  </Suspense>
);

export default Gallery;
