import React, { useState, useEffect } from 'react';
import {
  Siren,
  X,
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Heart,
  Radio,
  Activity,
  Check,
  ArrowLeft,
  Sparkles
} from 'lucide-react';

const MANDATORY_ITEMS = [
  {
    id: 'safeForConsumption',
    label: 'I confirm that this food is safe for consumption.'
  },
  {
    id: 'preparedAndStoredSafely',
    label: 'I confirm that the food has been prepared and stored safely.'
  },
  {
    id: 'accurateDetails',
    label: 'I confirm that the preparation time and food details are accurate.'
  },
  {
    id: 'allergenInfoProvided',
    label: 'I have provided all relevant allergen information.'
  },
  {
    id: 'notPreviouslyServed',
    label: 'I confirm that this food has not been previously served to another customer.'
  },
  {
    id: 'platformDisclaimerUnderstood',
    label: 'I understand that Food Rescue 911 does not guarantee the safety or quality of food provided by the restaurant.'
  }
];

export const FoodSafetyDisclaimerModal = ({
  isOpen,
  onClose,
  onConfirm,
  onSuccessDismiss,
  foodData
}) => {
  // Checkbox states
  const [checkedItems, setCheckedItems] = useState({
    safeForConsumption: false,
    preparedAndStoredSafely: false,
    accurateDetails: false,
    allergenInfoProvided: false,
    notPreviouslyServed: false,
    platformDisclaimerUnderstood: false
  });
  const [isAgreed, setIsAgreed] = useState(false);
  const [isDispatched, setIsDispatched] = useState(false);

  // Reset states when opened with new foodData
  useEffect(() => {
    if (isOpen) {
      setCheckedItems({
        safeForConsumption: false,
        preparedAndStoredSafely: false,
        accurateDetails: false,
        allergenInfoProvided: false,
        notPreviouslyServed: false,
        platformDisclaimerUnderstood: false
      });
      setIsAgreed(false);
      setIsDispatched(false);
    }
  }, [isOpen, foodData]);

  const handleDismissSuccess = () => {
    if (onSuccessDismiss) {
      onSuccessDismiss();
    } else {
      onClose();
    }
  };

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        if (isDispatched) {
          handleDismissSuccess();
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isDispatched, onClose]);

  if (!isOpen) return null;

  const allMandatoryChecked = MANDATORY_ITEMS.every(
    (item) => checkedItems[item.id]
  );
  const isFormValid = allMandatoryChecked && isAgreed;

  const toggleCheck = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSelectAll = () => {
    const allChecked = MANDATORY_ITEMS.every((item) => checkedItems[item.id]) && isAgreed;
    const newState = !allChecked;
    const updated = {};
    MANDATORY_ITEMS.forEach((item) => {
      updated[item.id] = newState;
    });
    setCheckedItems(updated);
    setIsAgreed(newState);
  };

  const handleDispatch = (e) => {
    if (e) e.preventDefault();
    if (!isFormValid) return;

    if (onConfirm) {
      onConfirm(foodData);
    }
    setIsDispatched(true);
  };

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="food-safety-title"
    >
      <div className="bg-zinc-950 border-2 border-amber-500/50 rounded-2xl sm:rounded-3xl max-w-xl w-full shadow-2xl shadow-amber-950/50 overflow-hidden flex flex-col my-auto max-h-[88vh]">
        {/* If successfully cleared & dispatched, show funny confirmation view */}
        {isDispatched ? (
          <div className="p-6 sm:p-8 text-center space-y-6 overflow-y-auto animate-scale-in">
            {/* Header Badge */}
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <span className="text-3xl animate-bounce">🚑</span>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>OFFICIALLY CLEARED FOR RESCUE</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center justify-center gap-2">
                <span>🚑 FOOD CLEARED FOR DISPATCH</span>
              </h3>
            </div>

            {/* Medical / Triage Clearance Card */}
            <div className="bg-zinc-900/90 border border-emerald-500/40 rounded-2xl p-5 text-left font-mono space-y-3 shadow-inner">
              <div className="flex items-center justify-between text-xs sm:text-sm py-1 border-b border-zinc-800">
                <span className="text-zinc-400 flex items-center gap-2">
                  <span>🩺</span>
                  <span>Kitchen clearance:</span>
                </span>
                <span className="text-emerald-400 font-black tracking-wider bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                  APPROVED
                </span>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm py-1 border-b border-zinc-800">
                <span className="text-zinc-400 flex items-center gap-2">
                  <span>❤️</span>
                  <span>Food vitals:</span>
                </span>
                <span className="text-emerald-400 font-bold tracking-wider">
                  STABLE
                </span>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm py-1 border-b border-zinc-800">
                <span className="text-zinc-400 flex items-center gap-2">
                  <span>{foodData?.emoji || '🍔'}</span>
                  <span>Rescue status:</span>
                </span>
                <span className="text-amber-400 font-bold tracking-wider">
                  READY
                </span>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm py-1">
                <span className="text-zinc-400 flex items-center gap-2">
                  <span>📡</span>
                  <span>Emergency broadcast:</span>
                </span>
                <span className="text-blue-400 font-bold tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping inline-block" />
                  SENT
                </span>
              </div>
            </div>

            {/* Funny Farewell Quote */}
            <div className="bg-amber-950/30 border border-amber-500/40 rounded-xl p-4 text-center">
              <p className="text-sm sm:text-base text-amber-200 font-semibold italic">
                "Patient has officially left the kitchen. Good luck, little burger. 🫡"
              </p>
              {foodData?.name && (
                <p className="text-[11px] text-zinc-400 font-mono mt-1">
                  Dispatched Patient: <span className="text-amber-300 font-bold">{foodData.emoji || '🥐'} {foodData.name}</span> ({foodData.quantity || 'surplus'} units)
                </p>
              )}
            </div>

            {/* Return Button */}
            <button
              onClick={handleDismissSuccess}
              className="w-full py-3.5 sm:py-4 rounded-xl font-black text-sm tracking-wider text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 hover:from-emerald-300 hover:to-teal-200 shadow-xl shadow-emerald-500/20 border-2 border-emerald-300 flex items-center justify-center gap-2 transform active:scale-98 transition-all"
            >
              <span>👨‍🍳 RETURN TO KITCHEN DISPLAY SYSTEM</span>
            </button>
          </div>
        ) : (
          /* Disclaimer & Clearance Checklist Form */
          <form onSubmit={handleDispatch} className="flex flex-col flex-1 min-h-0 overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-zinc-800 bg-gradient-to-r from-amber-950/40 via-zinc-900 to-zinc-950 flex items-start justify-between gap-3 shrink-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400 shrink-0">
                    <ShieldAlert className="w-5 h-5 text-amber-400 animate-pulse" />
                  </div>
                  <div>
                    <h3
                      id="food-safety-title"
                      className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-1.5"
                    >
                      <span>🚨 FOOD SAFETY CLEARANCE REQUIRED</span>
                    </h3>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-amber-300/90 font-medium italic pl-10">
                  "Before this patient leaves the kitchen, the kitchen must confirm that it is safe for rescue."
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="text-zinc-500 hover:text-zinc-300 p-1.5 rounded-lg hover:bg-zinc-800 transition-colors shrink-0"
                aria-label="Close food safety clearance"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Food Patient Quick Preview Pill */}
            {foodData && (
              <div className="px-5 py-2.5 bg-zinc-900/70 border-b border-zinc-800/80 flex items-center justify-between gap-2 text-xs font-mono shrink-0">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-lg">{foodData.emoji || '🥐'}</span>
                  <span className="text-zinc-200 font-bold truncate">
                    {foodData.name || 'Surplus Batch'}
                  </span>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">₹{foodData.rescuePrice}</span>
                  <span className="text-zinc-500">|</span>
                  <span className="text-zinc-300">{foodData.quantity} units</span>
                </div>
              </div>
            )}

            {/* Scrollable Checkbox List */}
            <div className="p-4 sm:p-5 overflow-y-auto flex-1 min-h-0 space-y-3.5 text-left">
              {/* Quick Select-all helper */}
              <div className="flex items-center justify-between pb-1 border-b border-zinc-800/80">
                <span className="text-[11px] font-mono uppercase text-zinc-400 font-semibold tracking-wider">
                  Mandatory Safety Checklist ({Object.values(checkedItems).filter(Boolean).length}/{MANDATORY_ITEMS.length})
                </span>
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="text-[11px] font-mono text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors font-bold"
                >
                  {allMandatoryChecked && isAgreed ? 'Uncheck all' : '⚡ Check all safety items (Quick Clear)'}
                </button>
              </div>

              {/* 6 Mandatory Checkboxes */}
              <div className="space-y-2">
                {MANDATORY_ITEMS.map((item) => {
                  const isChecked = checkedItems[item.id];
                  return (
                    <label
                      key={item.id}
                      className={`flex items-start gap-3 p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer select-none ${
                        isChecked
                          ? 'bg-amber-500/10 border-amber-500/50 shadow-sm'
                          : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleCheck(item.id)}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 mt-0.5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                          isChecked
                            ? 'bg-amber-500 border-amber-400 text-black'
                            : 'border-zinc-600 bg-zinc-950 hover:border-amber-400'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span
                        className={`text-xs sm:text-sm leading-relaxed ${
                          isChecked ? 'text-amber-100 font-medium' : 'text-zinc-300'
                        }`}
                      >
                        {item.label}
                      </span>
                    </label>
                  );
                })}
              </div>

              {/* Declaration Text Box */}
              <div className="p-3.5 bg-zinc-900/90 border border-zinc-800 rounded-xl space-y-2.5">
                <p className="text-xs text-zinc-300 italic leading-relaxed font-sans">
                  "By dispatching this food, I confirm that the information provided is accurate and that the food is suitable for rescue."
                </p>

                {/* Final Required Agreement Checkbox */}
                <label
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all cursor-pointer select-none ${
                    isAgreed
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-md shadow-emerald-500/10'
                      : allMandatoryChecked
                      ? 'bg-amber-500/15 border-amber-400 text-amber-200 animate-pulse'
                      : 'bg-zinc-950 border-emerald-500/40 hover:border-emerald-500 text-zinc-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isAgreed}
                    onChange={(e) => setIsAgreed(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                      isAgreed
                        ? 'bg-emerald-500 border-emerald-400 text-black'
                        : allMandatoryChecked
                        ? 'border-amber-400 bg-zinc-900'
                        : 'border-emerald-500/60 bg-zinc-900 hover:border-emerald-400'
                    }`}
                  >
                    {isAgreed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-black font-mono tracking-wide">
                      I AGREE & CLEAR THIS FOOD FOR RESCUE
                    </span>
                    {allMandatoryChecked && !isAgreed && (
                      <span className="text-[10px] text-amber-400 font-bold">
                        👉 Final Step: Check this box to enable the dispatch button below!
                      </span>
                    )}
                  </div>
                </label>
              </div>

              {!isFormValid && (
                <div className="flex items-center gap-1.5 text-[11px] text-amber-400/90 font-mono pb-1">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    {!allMandatoryChecked
                      ? 'Please check all 6 food safety statements above.'
                      : 'Please check the agreement box above to enable dispatch.'}
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons (Always Sticky at Bottom) */}
            <div className="p-3 sm:p-4 bg-zinc-900 border-t border-zinc-800 shrink-0 flex items-center gap-2.5 z-10 shadow-2xl">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-3.5 rounded-xl text-xs font-mono font-bold text-zinc-400 hover:text-white bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 flex items-center justify-center gap-1.5 transition-colors shrink-0"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>CANCEL</span>
              </button>

              <button
                type="submit"
                disabled={!isFormValid}
                className={`flex-1 py-3.5 rounded-xl font-black text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2 transition-all ${
                  isFormValid
                    ? 'text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 hover:from-emerald-300 hover:to-teal-200 shadow-xl shadow-emerald-500/30 border-2 border-emerald-300 transform active:scale-98 cursor-pointer'
                    : 'text-zinc-500 bg-zinc-800/60 border border-zinc-700/50 cursor-not-allowed opacity-60'
                }`}
              >
                <Siren className="w-4 h-4 shrink-0" />
                <span>🚑 CLEAR & DISPATCH FOOD</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
