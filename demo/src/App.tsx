import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useScrollShadow } from '../../src';

function App() {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const [cardNum, setCardNum] = useState(4);
  useScrollShadow(wrapperRef, contentRef);

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'white',
    width: 600,
    marginBottom: 24,
    height: 100,
    textAlign: 'center',
    lineHeight: '100px',
    fontSize: 20,
  };

  const contentStyle: React.CSSProperties = {
    overflowY: 'scroll',
    maxHeight: '50vh',
  };

  const btnStyle: React.CSSProperties = {
    width: 32,
    height: 32,
    marginLeft: 16,
  };

  return (
    <>
      <div ref={wrapperRef}>
        <div ref={contentRef} style={contentStyle}>
          {new Array(cardNum).fill(1).map((_, i) => (
            <div key={i} style={cardStyle}>
              card {i + 1}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 24, marginBottom: 8 }}>
        <label>Change cards count: {cardNum}</label>
        <button style={btnStyle} onClick={() => setCardNum(v => v + 1)}> + </button>
        <button style={btnStyle} onClick={() => setCardNum(v => v - 1)}> - </button>
      </div>
      <span>The shadow will disappear when it's not scrollable</span>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));

