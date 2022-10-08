// http://dougtesting.net/winwheel/docs/

import Script from 'next/script'
import Wheel from '/components/Wheel'
import Sidebar from '/components/Sidebar'
import styles from '/styles/Home.module.scss'
import WinningSegmentScreen from '../components/WinningSegmentScreen'

import { useEffect, useState } from 'react';
import Head from 'next/head'

export default function Home() {
  const [theWheel, setTheWheel] = useState();
  const [winningSegment, setWinningSegment] = useState();
  const [segments, setSegments] = useState([
    { fillStyle: '#eae56f', text: 'Loading your favorites!' },
  ]);

  // Get segments from storage
  useEffect(() => {
    const firstSegment = { fillStyle: '#eae56f', text: 'Loading your favorites!' }
    const localSegments = localStorage.getItem('segments')

    let segments
    if (localSegments) {
      const parsedLocalSegments = JSON.parse(localSegments)
      segments = parsedLocalSegments.filter(ls => {
        if (ls?.text !== '' && ls?.text !== firstSegment.text) return ls
      })
    }
    else {
      segments = firstSegment
    }

    const params = {
      pointerAngle: 0,
      numSegments: segments.length,
      fillStyle: '#e7706f',
      lineWidth: 1,
      segments,
      animation: {
        type: 'spinToStop',
        duration: 5, // In seconds
        spins: 8,
        callbackFinished: (winningSegment) => setWinningSegment(winningSegment.text),
      },
    };

    if (!theWheel) setTheWheel(new Winwheel(params));
  }, []);

  return (
    < >
      <Head>
        <title>Food wheel</title>
      </Head>

      <Script type='text/javascript' src='/Winwheel.js' strategy='beforeInteractive' />
      <Script type='text/javascript' src='/TweenMax.js' strategy='beforeInteractive' />

      <main id="main" className={`container-fluid h-100`}>
        <div className='row h-100'>
          <div className='col-12 col-md-8 col-lg-9 d-flex align-items-center' style={{ height: '95vh' }}>
            <Wheel theWheel={theWheel} />
          </div>
          <div className='col-12 col-md-4 col-lg-3 g-0'>
            <Sidebar theWheel={theWheel} segments={segments} setSegments={setSegments} />
          </div>
        </div>

        {winningSegment && <WinningSegmentScreen winningSegment={winningSegment} onHide={() => setWinningSegment()} />}
      </main>

      <footer className={styles.footer}>
        Made with 🍕 by {' '}
        <span id={styles.jeramai}>
          Jeram.ai
        </span>
      </footer>
    </>
  )
}
