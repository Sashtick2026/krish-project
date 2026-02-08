
// FIX: To correctly augment global types, this file must be treated as a module.
// Importing 'react' makes this file a module, brings React's types into scope,
// and allows `declare global` to correctly augment the JSX namespace. This
// resolves errors about missing types and invalid global augmentations.
// FIX: Changed `import 'react'` to `import React from 'react'` to bring the React namespace into scope for type referencing.
import React from 'react';

// FIX: Removed the empty `declare global { namespace JSX { ... } }` block.
// This block was overriding the default React JSX intrinsic element types,
// causing TypeScript to not recognize standard HTML tags like `div`, `span`, etc.
// By removing it, a project falls back to the correct types from `@types/react`,
// which resolves all JSX-related compilation errors.

// FIX: The 'declare global' block that defined 'dotlottie-wc' has been removed.
// It was overriding all default React JSX types, causing hundreds of compilation errors.
// By removing this block, we allow TypeScript to use the correct built-in types for
// standard HTML elements. The custom element 'dotlottie-wc' is now handled via
// React.createElement to bypass this JSX type-checking issue.
