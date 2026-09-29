import React, { useState } from 'react';
import { useRescue } from '../../context/RescueContext';
import {
  MessageSquareQuote,
  Star,
  CheckCircle2,
  AlertTriangle,
  Send,
  Sparkles,
  ShieldAlert,
  Flame,
  Clock,
  Package,
  HeartHandshake,
  Trash2
} from 'lucide-react';

const QUICK_RESOLUTIONS = [
  {
    label: '📦 Packaging Upgraded',
    note: 'Kitchen Action: Switched to double-layered thermal foil container and taped edges securely. Problem permanently eliminated! 📦🛡️'
  },
  {
    label: '🔥 Temperature Fixed',
    note: 'Kitchen Action: Inspected food warmer; increased holding drawer temperature to 68°C. Fresh hot batches guaranteed! 🔥♨️'
  },
  {
    label: '⏱️ Counter Lag Eliminated',
    note: 'Kitchen Action: Created dedicated fast-track 911 rescue pickup counter shelf. No more waiting! ⏱️⚡'
  },
  {
    label: '👨‍🍳 Chef Briefed & Rescuer Rewarded',
    note: 'Kitchen Action: Head Chef personally acknowledged. Rescuer issued 50 Bonus Hero Points & priority dispatch badge! 🎁👨‍🍳'
  },
  {
    label: '🎉 Pinned to Chef Wall',
    note: 'Kitchen Action: 5-Star Praise read aloud in kitchen briefing! 21-topon ki salami to our hungry hero! 🌟❤️'
  }
];

export const KitchenFeedbackInbox = () => {
  const { feedbacks, resolveFeedback, deleteFeedback } = useRescue();
  const [filter, setFilter] = useState('ALL'); // 'ALL' | 'OPEN' | 'PRAISE' | 'RESOLVED'
  const [replyNotes, setReplyNotes] = useState({});
  const [activeReplyingId, setActiveReplyingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [deletedToast, setDeletedToast] = useState(null);

  const openCount = feedbacks.filter((f) => f.status === 'IN_INVESTIGATION').length;
  const praiseCount = feedbacks.filter((f) => f.type === 'PRAISE').length;
  const resolvedCount = feedbacks.filter((f) => f.status === 'RESOLVED').length;

  const filteredFeedbacks = feedbacks.filter((f) => {
    if (filter === 'OPEN') return f.status === 'IN_INVESTIGATION';
    if (filter === 'PRAISE') return f.type === 'PRAISE';
    if (filter === 'RESOLVED') return f.status === 'RESOLVED';
    return true;
  });

  const handleApplyPreset = (fbId, note) => {
    setReplyNotes((prev) => ({ ...prev, [fbId]: note }));
  };

  const handleResolve = (fbId) => {
    const note =
      replyNotes[fbId]?.trim() ||
      'Kitchen supervisor has taken corrective action and updated station protocols. Thank you for keeping our food safe! 🚑🛡️';
    resolveFeedback(fbId, {
      status: 'RESOLVED',
      resolutionNote: note
    });
    setActiveReplyingId(null);
  };

  const handleReopen = (fbId) => {
    resolveFeedback(fbId, {
      status: 'IN_INVESTIGATION',
      resolutionNote: 'Re-opened for secondary kitchen audit by Executive Sous Chef. 🩺📋'
    });
  };

  const handleDelete = (fbId, code) => {
    deleteFeedback(fbId);
    setConfirmDeleteId(null);
    setDeletedToast(`Incident ticket ${code} deleted from records.`);
    setTimeout(() => setDeletedToast(null), 3000);
  };

  const handleResolveAndDelete = (fbId, code) => {
    const note =
      replyNotes[fbId]?.trim() ||
      'Kitchen supervisor has taken corrective action and updated station protocols. Problem resolved and ticket closed! 🚑🛡️';
    resolveFeedback(fbId, {
      status: 'RESOLVED',
      resolutionNote: note
    });
    deleteFeedback(fbId);
    setActiveReplyingId(null);
    setDeletedToast(`Issue ${code} marked as fixed & deleted from active feedback.`);
    setTimeout(() => setDeletedToast(null), 3500);
  };

  return (
    <div className="space-y-6 text-left font-mono">
      {/* Toast notification when feedback is deleted */}
      {deletedToast && (
        <div className="p-3.5 rounded-2xl bg-rose-600/90 text-white text-xs font-bold flex items-center justify-between shadow-2xl animate-in slide-in-from-top-2 border border-rose-400/40">
          <span className="flex items-center gap-2">
            <Trash2 className="w-4 h-4 shrink-0 text-white" />
            <span>{deletedToast}</span>
          </span>
          <button
            onClick={() => setDeletedToast(null)}
            className="text-white hover:text-rose-200 px-2 py-0.5 rounded-lg bg-black/20"
          >
            ✕
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                <MessageSquareQuote className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white m-0 tracking-wider">
                KITCHEN DISPATCH RESCUER FEEDBACK & COMPLAINT DESK
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              Live customer incident reports, food triage complaints, temperature checks & chef praises
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] uppercase text-slate-400 font-bold block">Open Tickets</span>
              <span className={`text-xl font-black ${openCount > 0 ? 'text-red-400 animate-pulse' : 'text-emerald-400'}`}>
                {openCount}
              </span>
            </div>
            <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] uppercase text-slate-400 font-bold block">Total Reviews</span>
              <span className="text-xl font-black text-purple-400">{feedbacks.length}</span>
            </div>
          </div>
        </div>

        {/* Filter sub-bar */}
        <div className="flex items-center gap-2 mt-5 flex-wrap">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === 'ALL'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Reports ({feedbacks.length})
          </button>

          <button
            onClick={() => setFilter('OPEN')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              filter === 'OPEN'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/40'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>Action Required ({openCount})</span>
            {openCount > 0 && <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />}
          </button>

          <button
            onClick={() => setFilter('PRAISE')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              filter === 'PRAISE'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>🌟 Chef Praises ({praiseCount})</span>
          </button>

          <button
            onClick={() => setFilter('RESOLVED')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              filter === 'RESOLVED'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-300" />
            <span>Resolved ({resolvedCount})</span>
          </button>
        </div>
      </div>

      {/* Incident Cards Feed */}
      {filteredFeedbacks.length === 0 ? (
        <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-12 text-center space-y-3">
          <span className="text-5xl block">🎉</span>
          <h3 className="text-xl font-bold text-white">No Reports in this Category</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Everything in the kitchen dispatch is peaceful. Rescuer complaints and praise will appear here immediately as they are submitted!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredFeedbacks.map((fb) => {
            const isOpen = fb.status === 'IN_INVESTIGATION';
            const isReplying = activeReplyingId === fb.id;
            const currentDraftNote = replyNotes[fb.id] || '';

            return (
              <div
                key={fb.id}
                className={`bg-slate-900/90 rounded-2xl border p-5 sm:p-6 shadow-xl space-y-4 transition-all ${
                  isOpen
                    ? 'border-rose-500/50 shadow-rose-950/20'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Top Info Bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-xs font-bold text-purple-400">
                      {fb.code}
                    </span>
                    <span className="text-sm font-black text-white">{fb.foodName}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-xs text-slate-400">{fb.restaurant}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Rating stars */}
                    <div className="flex items-center text-amber-400">
                      {[...Array(fb.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>

                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                        isOpen
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {isOpen ? '🔴 Action Required' : '✅ Solved / Acknowledged'}
                    </span>
                  </div>
                </div>

                {/* Rescuer Message */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5 font-bold text-slate-200">
                      <span className="w-2 h-2 rounded-full bg-purple-400" />
                      Reported by: {fb.rescuerName}
                    </span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(fb.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div className="bg-slate-950/70 rounded-xl p-3.5 border border-slate-800/80">
                    <div className="text-[11px] font-bold text-slate-400 mb-1">
                      CATEGORY: <span className="text-purple-300">{fb.typeLabel}</span>
                    </div>
                    <p className="text-sm text-slate-100 italic font-sans pl-2 border-l-2 border-purple-500 leading-relaxed">
                      "{fb.message}"
                    </p>
                  </div>
                </div>

                {/* Current Resolution or Action Panel */}
                <div className="pt-2 border-t border-slate-800/60">
                  {/* Current Active Kitchen Resolution Note */}
                  {fb.resolutionNote && (
                    <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-3.5 text-xs space-y-1 mb-3">
                      <div className="flex items-center justify-between text-emerald-400 font-bold uppercase text-[10px]">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          KITCHEN SUPERVISOR ACTION NOTE:
                        </span>
                        {fb.resolvedAt && (
                          <span className="text-slate-500 text-[10px]">
                            {new Date(fb.resolvedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-200 text-xs leading-relaxed">
                        {fb.resolutionNote}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons for Kitchen Manager */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <button
                      onClick={() => setActiveReplyingId(isReplying ? null : fb.id)}
                      className="px-4 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/40 text-xs font-bold flex items-center gap-2 transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isReplying ? 'Close Action Drawer' : '👨‍🍳 Take Kitchen Action / Reply'}</span>
                    </button>

                    {isOpen ? (
                      <button
                        onClick={() => handleResolve(fb.id)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-900/30 transition-all"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Quick Mark as Solved</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleReopen(fb.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 text-xs font-bold border border-slate-800 transition-all"
                      >
                        Re-open for Audit
                      </button>
                    )}

                    {/* Delete Feedback Button (Available once fixed or to clear from desk) */}
                    {confirmDeleteId === fb.id ? (
                      <div className="flex items-center gap-1.5 bg-rose-950/80 border border-rose-500/50 p-1.5 rounded-xl ml-auto animate-in fade-in">
                        <span className="text-[11px] text-rose-300 font-bold px-1.5">Confirm Delete?</span>
                        <button
                          onClick={() => handleDelete(fb.id, fb.code)}
                          className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold shadow transition-all active:scale-95"
                        >
                          Yes, Delete
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="px-2 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-[11px]"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDeleteId(fb.id)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ml-auto active:scale-95 ${
                          !isOpen
                            ? 'bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/40'
                            : 'bg-slate-950 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-500/30'
                        }`}
                        title="Delete feedback from kitchen dispatch records"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                        <span>{!isOpen ? '🗑️ Delete Fixed Ticket' : 'Delete Ticket'}</span>
                      </button>
                    )}
                  </div>

                  {/* Kitchen Action Drawer */}
                  {isReplying && (
                    <div className="mt-4 p-4 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-3">
                      <div className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>1-Click Kitchen Resolution Presets:</span>
                      </div>

                      {/* Quick resolution chips */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {QUICK_RESOLUTIONS.map((item, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleApplyPreset(fb.id, item.note)}
                            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-purple-500/50 text-[11px] text-slate-300 transition-all"
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>

                      {/* Custom note textarea */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] text-slate-400 block font-bold">
                          Official Kitchen Action Note (Visible to Rescuer):
                        </label>
                        <textarea
                          rows={2}
                          value={currentDraftNote}
                          onChange={(e) =>
                            setReplyNotes((prev) => ({ ...prev, [fb.id]: e.target.value }))
                          }
                          placeholder="Type what action the kitchen took (e.g. checked temperature, repackaged item, trained counter staff)..."
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                        />
                      </div>

                      <div className="flex justify-end gap-2 flex-wrap">
                        <button
                          type="button"
                          onClick={() => setActiveReplyingId(null)}
                          className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white text-xs font-bold"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleResolveAndDelete(fb.id, fb.code)}
                          className="px-4 py-2 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all active:scale-95"
                          title="Mark problem as fixed and delete from active feedback records"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Fixed: Resolve & Delete</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleResolve(fb.id)}
                          className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-900/40 transition-all active:scale-95"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Transmit Kitchen Resolution to Rescuer</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
