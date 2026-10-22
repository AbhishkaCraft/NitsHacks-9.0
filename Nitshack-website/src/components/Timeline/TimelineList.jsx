import React from 'react';
import { Calendar, Clock, ChevronRight, CheckCircle2, Trophy } from 'lucide-react';

export default function TimelineList({ stages, onSelectStage }) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-4">
      {stages.map((stage, idx) => {
        const isCurrent = stage.status === 'ACTIVE';
        return (
          <div
            key={stage.id}
            onClick={() => onSelectStage(stage)}
            className={`group relative p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer backdrop-blur-xl overflow-hidden ${
              isCurrent
                ? 'bg-slate-900/90 border-amber-400/60 shadow-[0_0_25px_rgba(250,204,21,0.2)]'
                : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
            }`}
          >
            {/* Left Accent Color Indicator */}
            <div
              className="absolute top-0 left-0 bottom-0 w-1.5 transition-all group-hover:w-2"
              style={{ backgroundColor: stage.accentColor }}
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pl-2">
              {/* Left Column: Avatar + Details */}
              <div className="flex items-start sm:items-center gap-4">
                <div
                  className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-white shrink-0"
                  style={{
                    boxShadow: `0 0 15px ${stage.accentColor}`,
                  }}
                >
                  <img
                    src={stage.avatar}
                    alt={stage.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-mono text-xs text-slate-400">
                      STAGE {stage.stageNumber}
                    </span>
                    <span
                      className="text-[10px] font-tech uppercase px-2 py-0.5 rounded-full font-bold"
                      style={{
                        backgroundColor: `${stage.accentColor}20`,
                        color: stage.accentColor,
                        border: `1px solid ${stage.accentColor}40`,
                      }}
                    >
                      {stage.codename}
                    </span>
                    <span
                      className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                        stage.status === 'ACTIVE'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : stage.status === 'COMPLETED'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {stage.statusBadge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-heading tracking-wide uppercase text-white group-hover:text-amber-300 transition-colors">
                    {stage.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 mt-0.5 max-w-xl">
                    {stage.shortDesc}
                  </p>
                </div>
              </div>

              {/* Right Column: Time & Trigger Button */}
              <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800/80">
                <div className="text-left sm:text-right font-mono text-xs text-slate-400">
                  <div className="text-slate-200 font-semibold">{stage.date}</div>
                  <div className="text-[11px] text-slate-500">{stage.time}</div>
                </div>

                <div className="flex items-center gap-1 text-xs font-tech text-amber-400 group-hover:translate-x-1 transition-transform">
                  <span>View Briefing</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
