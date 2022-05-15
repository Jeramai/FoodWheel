import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Wheel({ spinning, onStop }) {
  const [theWheel, setTheWheel] = useState();

  const segments = [
    { fillStyle: '#eae56f', text: 'Segment 1' },
    { fillStyle: '#89f26e', text: 'Segment 2' },
    { fillStyle: '#7de6ef', text: 'Segment 3' },
    { fillStyle: '#e7706f', text: 'Segment 4' }
  ];
  const params = {
    numSegments: segments.length,
    fillStyle: '#e7706f',
    lineWidth: 1,
    segments
  };

  useEffect(() => {
    const canvas = document.getElementById('canvas');
    const main = document.getElementById('wheelWrapper');
    main.style.height = `${window.innerHeight / 2}px`;

    canvas.width = main.offsetWidth;
    canvas.height = main.offsetHeight;

    setTheWheel(new Winwheel(params));
  }, []);

  function addSegment(text, fillStyle = 'random') {
    if (fillStyle === 'random') {
      const colors = ['#eae56f', '#89f26e', '#7de6ef', '#e7706f'];
      fillStyle = colors[Math.floor(Math.random() * colors.length)];
    }

    // TODO: Maybe useful for adding the data to the chain
    // http://dougtesting.net/winwheel/docs/tut5_add_remove_segments
    theWheel.addSegment(
      {
        text,
        fillStyle
      },
      1
    );
    theWheel.draw();
  }

  function deleteSegment(segment_id) {
    theWheel.deleteSegment(segment_id);
    theWheel.draw();
  }

  return (
    <div id='wheelWrapper' style={{ position: 'relative', width: '100%', height: '100%' }}>
      <canvas id='canvas' style={{ display: 'block' }} />
      <div id='prizePin'>
        <Image src='/pin.png' width={45} height={45} />
      </div>
      <button onClick={() => addSegment('Nice.')}>Add</button>
    </div>
  );
}
