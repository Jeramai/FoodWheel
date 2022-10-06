import React, { useEffect } from 'react';
import Image from 'next/image';

export default function Wheel({ theWheel }) {
  useEffect(() => {
    const canvas = document.getElementById('canvas');
    const main = document.getElementById('wheelWrapper');
    main.style.height = `${window.innerHeight / 2}px`;

    canvas.width = main.offsetWidth;
    canvas.height = main.offsetHeight;
  }, []);

  return (
    <div id='wheelWrapper' style={{ position: 'relative', width: '100%', height: '100%' }}>
      <canvas id='canvas' style={{ display: 'block' }} />
      <div id='prizePin'>
        <Image src='/pin.png' width={45} height={45} />
      </div>

      <div style={{ width: '100%', textAlign: 'center', marginTop: '10px' }}>
        <button
          className='btn btn-primary mt-2'
          onClick={() => {
            if (theWheel) {
              theWheel.stopAnimation(false);

              theWheel.rotationAngle = theWheel.rotationAngle % 360;

              theWheel.startAnimation();
            }
          }}
        >
          Spin to win!
        </button>
      </div>
    </div>
  );
}
