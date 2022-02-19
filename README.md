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
  const wrapperRef = useRef(null);
  const scrollContentRef = useRef(null);
  useScrollShadow(wrapperRef, scrollContentRef);

  return (
    <div ref={wrapperRef}>
      <div ref={scrollContentRef} style={{ overflowY: 'auto', maxHeight: '100vh' }}>
        {/* Put your content here */}
      </div>
    </div>
  );
}
```
