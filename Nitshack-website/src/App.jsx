import React from 'react';
import SpaceBackground from './components/Timeline/SpaceBackground';
import TimelineScene from './components/Timeline/TimelineScene';

function App() {
  return (
    <div className="relative min-h-screen bg-[#02050f] text-slate-100 overflow-x-hidden flex items-center justify-center">
      {/* Deep Space Background with Stars */}
      <SpaceBackground />

      {/* Main Timeline Scene matching reference image */}
      <div className="relative z-10 w-full">
        <TimelineScene />
      </div>
    </div>
  );
}

export default App;
