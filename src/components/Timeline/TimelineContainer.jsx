import React, { useState } from 'react';
import TimelineHeader from './TimelineHeader';
import CosmicTrack from './CosmicTrack';
import TimelineList from './TimelineList';
import Modal from '../UI/Modal';
import MilestoneCard from './MilestoneCard';
import { TIMELINE_STAGES } from '../../data/timelineData';
import { Award, Clock, Users, MapPin, Sparkles } from 'lucide-react';

export default function TimelineContainer({ activeView }) {
  const [selectedStage, setSelectedStage] = useState(null);

  return (
    <div className="relative min-h-screen flex flex-col justify-between">
      {/* Top Header */}
      <TimelineHeader
        stages={TIMELINE_STAGES}
        onSelectStage={setSelectedStage}
      />

      {/* Main View: Track Map vs List Schedule */}
      <main className="flex-1 flex flex-col justify-center">
        {activeView === 'track' ? (
          <CosmicTrack
            stages={TIMELINE_STAGES}
            onSelectStage={setSelectedStage}
          />
        ) : (
          <TimelineList
            stages={TIMELINE_STAGES}
            onSelectStage={setSelectedStage}
          />
        )}
      </main>

      {/* Bottom Mission Stats Bar */}
      <footer className="relative z-10 max-w-6xl mx-auto w-full px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl">
          
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-tech uppercase text-slate-400">Total Bounty Pool</div>
              <div className="text-base sm:text-lg font-bold font-mono text-white">INR 1,50,000+</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-tech uppercase text-slate-400">Sprint Duration</div>
              <div className="text-base sm:text-lg font-bold font-mono text-white">36 Hours Non-Stop</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-tech uppercase text-slate-400">Finalist Strike Teams</div>
              <div className="text-base sm:text-lg font-bold font-mono text-white">Top 60 Selected</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-tech uppercase text-slate-400">Mission Base</div>
              <div className="text-base sm:text-lg font-bold font-mono text-white">NIT Silchar Campus</div>
            </div>
          </div>

        </div>

        {/* Footer Copyright and Organization Tag */}
        <div className="text-center text-xs font-mono text-slate-500 mt-6">
          NitsHacks 9.0 © 2026 GDSC & Coding Club, National Institute of Technology Silchar.
        </div>
      </footer>

      {/* Detail Briefing Modal */}
      <Modal
        isOpen={Boolean(selectedStage)}
        onClose={() => setSelectedStage(null)}
        accentColor={selectedStage?.accentColor}
      >
        <MilestoneCard
          stage={selectedStage}
          onClose={() => setSelectedStage(null)}
        />
      </Modal>
    </div>
  );
}
