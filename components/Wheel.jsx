import React, { useEffect, useState } from 'react';

export default function Wheel({ spinning, onStop }) {
  useEffect(() => {
    const canvas = document.getElementById('canvas');
    const main = document.getElementById('wheelWrapper');
    main.style.height = `${window.innerHeight / 2}px`;

    canvas.width = main.offsetWidth;
    canvas.height = main.offsetHeight;

    const theWheel = new Winwheel(params);
  }, []);

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

  return (
    <div id='wheelWrapper' style={{ width: '100%', height: '100%' }}>
      <canvas id='canvas' style={{ display: 'block' }} />
    </div>
  );
}
