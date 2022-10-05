import { useEffect } from 'react';

export default function CustomFavicon({ setFavi }) {
  useEffect(() => {
    const max = 8;
    let imgCounter = 1;

    const interval = setInterval(() => {
      setFavi(`/favicon/${imgCounter}.png`);

      if (imgCounter === max) imgCounter = 1;
      else imgCounter++;
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return null;
}
