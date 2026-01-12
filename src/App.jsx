import { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import bassImage from './photos/bass.png';
import floorImage from './photos/floor drum.jpg';
import hihatImage from './photos/hiphat.jpg';
import snareImage from './photos/snare.webp';
import lowDrumImage from './photos/low.jpg';
import crashImage from './photos/crash.jpg';
import rideImage from './photos/ride.jpg';
import highDrumImage from './photos/high tom.png';
import electricBassImage from './electronic/electronic bass.jpg';
import electricFloorImage from './electronic/electric floor.jpg';
import electricHiHatImage from './electronic/hihat electronic.jpg';
import electricSnareImage from './electronic/electric snare.jpg';
import electricCrashImage from './electronic/electronic crash.png';
import electricRideImage from './electronic/ride electronic.jpg';
import electricHighTomImage from './electronic/electronic high tom.jpg';
import electricLowTomImage from './electronic/electronic low tom.jpg';
import longride from './songs/long-ride-cymbal-2-36337.mp3';
import snareSound from './songs/snare-112754.mp3';
import tomSound from './songs/tom-2-85124.mp3';
import bassSound from './songs/mega-bass-sub-drop-effect-240472.mp3';
import lowFloorSound from './songs/low-floor-tom-level-2-106160.mp3';
import crashSound from './songs/tr707-crash-cymbal-241376.mp3';
import hihatSound from './songs/hi-hat-6-231041.mp3';
import lowDrumSound from './songs/low-drum-105611.mp3';

const images = {
  rock: {
    bass: bassImage,
    snare: snareImage,
    floor: floorImage,
    hiHat: hihatImage,
    lowDrum: lowDrumImage,
    highDrum: highDrumImage,
    crash: crashImage,
    ride: rideImage,
  },
  jazz: {
    bass: bassImage,
    snare: snareImage,
    floor: floorImage,
    hiHat: hihatImage,
    lowDrum: lowDrumImage,
    highDrum: highDrumImage,
    crash: crashImage,
    ride: rideImage,
  },
  electronic: {
    bass: electricBassImage,
    snare: electricSnareImage,
    floor: electricFloorImage,
    hiHat: electricHiHatImage,
    lowDrum: electricLowTomImage,
    highDrum: electricHighTomImage,
    crash: electricCrashImage,
    ride: electricRideImage,
  },
};

const sounds = {
  rock: {
    bass: bassSound,
    snare: snareSound,
    floor: lowFloorSound,
    hiHat: hihatSound,
    lowDrum: lowDrumSound,
    highDrum: tomSound,
    crash: crashSound,
    ride: longride,
  },
  jazz: {
    bass: bassSound,
    snare: snareSound,
    floor: lowFloorSound,
    hiHat: hihatSound,
    lowDrum: lowDrumSound,
    highDrum: tomSound,
    crash: crashSound,
    ride: longride,
  },
  electronic: {
    bass: bassSound,
    snare: snareSound,
    floor: lowFloorSound,
    hiHat: hihatSound,
    lowDrum: lowDrumSound,
    highDrum: tomSound,
    crash: crashSound,
    ride: longride,
  },
};

const pads = [
  { id: 'crash', label: 'Crash', key: 'J', positionClass: 'pos-crash' },
  { id: 'ride', label: 'Ride', key: 'K', positionClass: 'pos-ride' },
  { id: 'hiHat', label: 'Hi-Hat', key: 'F', positionClass: 'pos-hihat' },
  { id: 'snare', label: 'Snare', key: 'S', positionClass: 'pos-snare' },
  { id: 'highDrum', label: 'High Tom', key: 'H', positionClass: 'pos-high' },
  { id: 'lowDrum', label: 'Low Tom', key: 'G', positionClass: 'pos-low' },
  { id: 'floor', label: 'Floor Tom', key: 'D', positionClass: 'pos-floor' },
  { id: 'bass', label: 'Kick', key: 'A', positionClass: 'pos-kick' },
];

const kitCopy = {
  rock: 'Punchy, roomy rock kit with forward kick and crisp cymbals.',
  jazz: 'Warm, dynamic jazz kit that stays articulate at softer touches.',
  electronic: 'Clean electronic kit with fast transients and deep low end.',
};

function App() {
  const [currentKit, setCurrentKit] = useState('rock');
  const [activePad, setActivePad] = useState(null);

  const keyMap = useMemo(() => (
    pads.reduce((map, pad) => {
      map[pad.key.toLowerCase()] = pad.id;
      return map;
    }, {})
  ), []);

  const playSound = useCallback((padId) => {
    const audio = new Audio(sounds[currentKit][padId]);
    audio.currentTime = 0;
    audio.play();
    setActivePad(padId);
    setTimeout(() => setActivePad(null), 180);
  }, [currentKit]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const padId = keyMap[event.key.toLowerCase()];
      if (!padId) return;
      event.preventDefault();
      playSound(padId);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keyMap, playSound]);

  return (
    <div className="app-shell">
      <header className="hero">
        <div className="eyebrow">Responsive | Playable | Realistic</div>
        <h1>Roland OCTAPAD Studio</h1>
        <p>Tap the pads, use your keyboard, and flip between acoustic and electronic kits that sit like a real drum set.</p>
      </header>

      <div className="kit-switcher" role="group" aria-label="Drum kit selector">
        {['rock', 'jazz', 'electronic'].map((kit) => (
          <button
            key={kit}
            className={`kit-chip ${currentKit === kit ? 'is-active' : ''}`}
            onClick={() => setCurrentKit(kit)}
          >
            {kit.toUpperCase()}
          </button>
        ))}
      </div>

      <section className="content">
        <div className="drum-stage" aria-label={`${currentKit} drum kit`}>
          <div className="stage-glow" aria-hidden="true" />
          <div className="drum-grid">
            {pads.map((pad) => (
              <button
                key={pad.id}
                className={`drum-pad ${pad.positionClass} ${activePad === pad.id ? 'is-active' : ''}`}
                onClick={() => playSound(pad.id)}
                aria-label={`${pad.label} pad (${pad.key})`}
              >
                <div className="pad-face">
                  <img src={images[currentKit][pad.id]} alt={pad.label} loading="lazy" />
                  <div className="pad-overlay" />
                  <div className="pad-info">
                    <span className="keycap">{pad.key}</span>
                    <span className="label">{pad.label}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <aside className="side-panel">
          <div className="card">
            <p className="card-title">Current kit</p>
            <h3>{currentKit.toUpperCase()}</h3>
            <p className="muted">{kitCopy[currentKit]}</p>
            <div className="pill-row">
              <span className="pill">Tap or click</span>
              <span className="pill">Keyboard-ready</span>
              <span className="pill">Responsive layout</span>
            </div>
          </div>
          <div className="card">
            <p className="card-title">Keyboard map</p>
            <div className="hotkey-grid">
              {pads.map((pad) => (
                <div key={pad.id} className="hotkey">
                  <span className="keycap small">{pad.key}</span>
                  <span>{pad.label}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

export default App;