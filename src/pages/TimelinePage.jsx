import SpaceBackground from '../components/Timeline/SpaceBackground'
import TimelineScene from '../components/Timeline/TimelineScene'

export default function TimelinePage() {
  return (
    <div className="relative min-h-screen bg-[#02050f] text-slate-100 overflow-x-hidden flex flex-col justify-between">
      {/* Deep Space Background with Stars */}
      <SpaceBackground />

      {/* Spacer for fixed top universal navbar */}
      <div className="w-full shrink-0 pt-3 sm:pt-4 md:pt-6 h-[76px] sm:h-[92px] md:h-[108px] pointer-events-none" aria-hidden="true" />

      {/* Main Timeline Scene */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center">
        <TimelineScene />
      </div>
    </div>
  )
}
