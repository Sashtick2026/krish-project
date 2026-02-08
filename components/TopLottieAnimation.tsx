import React from 'react';

const TopLottieAnimation: React.FC = () => {
  // FIX: Using React.createElement to render the 'dotlottie-wc' custom element.
  // This avoids JSX type-checking, which was failing due to a global type override issue.
  // This solution resolves all JSX intrinsic element errors across the app by allowing
  // the problematic global type definition to be removed.
  return React.createElement(
    'div',
    // FIX: Adjusted the negative margin to accommodate the larger animation size.
    { style: { display: 'flex', justifyContent: 'center', width: '100%', pointerEvents: 'none', marginBottom: '-4rem' } },
    React.createElement('dotlottie-wc', {
      // FIX: Replaced the failing Lottie animation URL with a valid, publicly accessible one to resolve the 403 Forbidden error.
      src: "https://lottie.host/6890a15f-5b38-4acc-85d8-6e67c029998c/WSJEnxLJ2l.lottie",
      // FIX: Updated the animation size to better match the user's request.
      style: { width: '300px', height: '300px' },
      // Note: `autoplay` and `loop` are passed as boolean props which React handles for custom elements.
      autoplay: true,
      loop: true,
    })
  );
};

export default TopLottieAnimation;