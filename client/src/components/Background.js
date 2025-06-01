import { useEffect } from 'react';
import Trianglify from 'trianglify';


const Background = () => {
  const generatePattern = () => {
    const pattern = Trianglify({
      width: window.innerWidth,
      height: window.innerHeight,
      cellSize: 75,
      variance: 0.75,
      // xColors: 'Greens',
      // yColors: 'Reds'
    });

    document.body.style.backgroundImage = `url(${pattern.toCanvas().toDataURL()})`;
  };

  useEffect(() => {
    generatePattern();
    window.addEventListener('resize', generatePattern);

    return () => {
      window.removeEventListener('resize', generatePattern);
    };
  }, []);

  return null;
};

export default Background;
