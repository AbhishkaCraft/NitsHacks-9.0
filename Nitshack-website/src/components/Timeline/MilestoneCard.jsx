import React from 'react';
import { Calendar, Clock, Trophy, CheckCircle2, ShieldAlert, ArrowRight, ExternalLink } from 'lucide-react';

export default function MilestoneCard({ stage, onClose }) {
  if (!stage) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div
          className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white shrink-0"
          style={{
            boxShadow: `0 0 20px ${stage.accentColor}`,
          }}
        >
          <img
            src={stage.avatar}
            alt={stage.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span
              className="text-xs font-tech px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider"
              style={{
                backgroundColor: `${stage.accentColor}22`,
                color: stage.accentColor,
                border: `1px solid ${stage.accentColor}55`,
              }}
            >
              {stage.codename}
            </span>
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider ${
                stage.status === 'ACTIVE'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                  : stage.status === 'COMPLETED'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-slate-700/50 text-slate-400 border border-slate-600/50'
              }`}
            >
              {stage.statusBadge}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-heading tracking-wide uppercase text-white leading-tight">
            {stage.name}
          </h3>

          <p className="text-xs sm:text-sm text-slate-400 italic">
            "{stage.tagline}"
          </p>
        </div>
      </div>

      {/* Date & Time pill row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-950/60 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2.5 text-slate-300 text-sm">
          <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
          <div>
            <div className="text-xs text-slate-500 uppercase font-tech">Duration</div>
            <div className="font-medium text-slate-200">{stage.date}</div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-slate-300 text-sm">
          <Clock className="w-4 h-4 text-sky-400 shrink-0" />
          <div>
            <div className="text-xs text-slate-500 uppercase font-tech">Schedule</div>
            <div className="font-medium text-slate-200">{stage.time}</div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <h4 className="text-xs font-tech uppercase tracking-wider text-slate-400">
          Mission Objective
        </h4>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          {stage.fullDesc}
        </p>
      </div>

      {/* Key Checkpoints */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-tech uppercase tracking-wider text-slate-400">
          Protocols & Milestones
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {stage.keyPoints.map((point, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-800/40 border border-slate-700/40 text-xs sm:text-sm text-slate-200"
            >
              <CheckCircle2
                className="w-4 h-4 shrink-0 mt-0.5"
                style={{ color: stage.accentColor }}
              />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bounties / Stakes */}
      <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-transparent border border-amber-500/20">
        <Trophy className="w-5 h-5 text-amber-400 shrink-0" />
        <div className="text-xs sm:text-sm">
          <span className="text-amber-400 font-bold uppercase tracking-wider font-tech">
            Stakes & Perks:{' '}
          </span>
          <span className="text-slate-300">{stage.prizesOrBounties}</span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-800">
        <div className="text-xs text-slate-500 font-mono">
          NitsHacks 9.0 // Stage ID: {stage.id.toUpperCase()}
        </div>
        <button
          onClick={onClose}
          className="px-5 py-2 rounded-lg font-tech text-xs tracking-wider uppercase font-bold text-black transition-transform duration-150 hover:scale-105 active:scale-95"
          style={{ backgroundColor: stage.accentColor }}
        >
          Acknowledge Briefing
        </button>
      </div>
    </div>
  );
}
