import SpaceBackground from '../components/Timeline/SpaceBackground'
import TimelineScene from '../components/Timeline/TimelineScene'
import Navbar from '../components/Navbar'

export default function TimelinePage() {
  return (
    <div className="relative min-h-screen bg-[#02050f] text-slate-100 overflow-x-hidden flex flex-col justify-between">
      {/* Deep Space Background with Stars */}
      <SpaceBackground />

      {/* Top Universal Navbar */}
      <header className="relative z-50 w-full pt-3 sm:pt-4 md:pt-6">
        <Navbar activeRoute="/timeline" />
      </header>

      {/* Main Timeline Scene */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center">
        <TimelineScene />
      </div>
    </div>
  )
}
