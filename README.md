# use-scroll-shadow
A react hook for adding top and bottom shadow to scrollable content.  

[Demo](https://necolo.github.io/use-scroll-shadow/)

## why use-scroll-shadow
You can use [PureCSS](https://css-scroll-shadows.vercel.app) for simple scrollable content.  
But if the content children has solid background colors, that pure css way is not suitable.

Features
- Add top shadow when content scrolled
- Hide bottom shadow when content hit bottom
- Observe scroll element height, if it's not scrollable, will hide shadows
- Will not cause any side-effect

## Install

```
npm i use-scroll-shadow
```

## How to use

```typescript
import React, { useRef } from 'react';
import { useScrollShadow } from 'use-scroll-shadow';
import 'use-scroll-shadow/lib/index.css'; // don't forget import css

// example
function App() {
  const { contentRef } = useScrollShadow();

  return (
    <div>
      <div ref={contentRef} style={{ overflowY: 'auto', maxHeight: '100vh' }}>
        {/* Put your content here */}
      </div>
    </div>
  );
}
```

## If you want to restyle the shadow
Do this in your `.css` file:

```css
.scroll-shadow-box:before {
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.5),
    transparent
  ) !important;
}
.scroll-shadow-box:after {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), transparent) !important;
}
```
