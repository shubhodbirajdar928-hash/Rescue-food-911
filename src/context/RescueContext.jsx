import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_EMERGENCIES, INITIAL_RESERVATIONS, INITIAL_RESCUE_HISTORY, INITIAL_EXPIRED_EMERGENCIES, getStatusByMinutes, formatTimeStr, getFilmyTriageReportForFood } from '../data/mockEmergencies';
import { playSound } from '../utils/soundEffects';
import { triggerRescueConfetti } from '../utils/confetti';

const RescueContext = createContext(null);

// Ensure every single food has its distinct, food-specific spicy Bollywood triage diagnosis
const ensureUniqueFilmyReports = (items) => {
  if (!Array.isArray(items)) return [];
  return items.map(item => {
    const isWrongPatties = item.doctorNotes && item.doctorNotes.includes('64 crispy layers') && !item.name.toLowerCase().includes('pattice') && !item.name.toLowerCase().includes('puff');
    const isMissingOrGeneric = !item.doctorNotes || item.doctorNotes.includes('Critical surplus') || item.doctorNotes.includes('Vitals nominal');
    if (isWrongPatties || isMissingOrGeneric) {
      return {
        ...item,
        doctorNotes: getFilmyTriageReportForFood(item.name, item.category, item.emoji)
      };
    }
    return item;
  });
};

export const INITIAL_FEEDBACKS = [
  {
    id: 'fb-001',
    code: 'FB-911-001',
    foodName: 'Miss 64-Layers Shahi Veg Pattice',
    restaurant: 'Sharma Ji Ka Diljala Bakery & ICU',
    type: 'PRAISE',
    typeLabel: '🌟 Chef Praise (Lajawab Khana)',
    rating: 5,
    rescuerName: 'Rescuer Raju (Hero #007)',
    message: 'Bhai kya crispy layers thi! Ekdum garma garam pattice mila counter par. Bachat bhi mast hui aur taste bilkul A1! Chef saab ko salam!',
    status: 'RESOLVED',
    statusLabel: '🎖️ Pinned to Kitchen Trauma Wall',
    resolutionNote: 'Chef Sharma Ji personally thanked the rescuer and issued a complimentary cutting chai token! ☕❤️',
    timestamp: Date.now() - 3600000 * 2
  },
  {
    id: 'fb-002',
    code: 'FB-911-002',
    foodName: 'ACP Pradyuman Vada Pav',
    restaurant: 'CID Emergency Vada Pav Outpost',
    type: 'COMPLAINT',
    typeLabel: '🚨 Quality / Missing Item',
    rating: 2,
    rescuerName: 'Inspector Daya',
    message: 'Vada pav tasty tha lekin extra teekhi garlic chutney parcel mein nahi thi! Kuch toh gadbad hai Daya! Please packaging check karo.',
    status: 'ACTION_TAKEN',
    statusLabel: '👨‍🍳 Kitchen Action Taken',
    resolutionNote: 'Outpost counter staff retrained. Chutney pouch count verified on all active dispatch racks. 🧄✅',
    timestamp: Date.now() - 3600000 * 5
  },
  {
    id: 'fb-003',
    code: 'FB-911-003',
    foodName: 'Makhan Tadpa Pav Bhaji',
    restaurant: 'Sardar Ji Sizzling Tawa Trauma Ward',
    type: 'TEMPERATURE',
    typeLabel: '🥶 Temperature Issue',
    rating: 3,
    rescuerName: 'Hero Baburao',
    message: 'Taste mast tha par parcel thoda thanda ho gaya tha counter delay ki wajah se. Microwave mein 30 second garam karke khana pada.',
    status: 'RESOLVED',
    statusLabel: '🟢 Resolved & Closed',
    resolutionNote: 'Thermal aluminum wrap added to all takeaway packaging for hot bhaji! 🍲🔥',
    timestamp: Date.now() - 3600000 * 9
  }
];

export const RescueProvider = ({ children }) => {
  // Active Role: 'rescuer' or 'restaurant'
  const [role, setRole] = useState(() => {
    return localStorage.getItem('fr911_role') || 'rescuer';
  });

  // Sound effects toggle
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('fr911_sound');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // One-time initialization to clean baseline with sample item if empty
  if (typeof window !== 'undefined' && localStorage.getItem('fr911_v8_init') !== 'true') {
    localStorage.removeItem('fr911_v6_emergencies');
    localStorage.removeItem('fr911_v6_expired');
    localStorage.removeItem('fr911_v7_emergencies');
    localStorage.removeItem('fr911_v7_expired');
    localStorage.setItem('fr911_v8_emergencies', JSON.stringify(ensureUniqueFilmyReports(INITIAL_EMERGENCIES)));
    localStorage.setItem('fr911_v8_expired', JSON.stringify(ensureUniqueFilmyReports(INITIAL_EXPIRED_EMERGENCIES)));
    localStorage.setItem('fr911_v8_reservations', JSON.stringify([]));
    localStorage.setItem('fr911_v8_history', JSON.stringify([]));
    localStorage.setItem('fr911_v8_init', 'true');
  }

  // Active food emergencies list - initialized with timestamp-anchored items (strictly active, secondsLeft > 0)
  const [emergencies, setEmergencies] = useState(() => {
    const saved = localStorage.getItem('fr911_v8_emergencies');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const now = Date.now();
          // Filter out any already expired items from active list
          const activeOnly = parsed.filter(item => {
            const exp = item.expiresAt || (now + (item.secondsLeft || 0) * 1000);
            return Math.floor((exp - now) / 1000) > 0;
          });
          return ensureUniqueFilmyReports(activeOnly);
        }
      } catch { /* fallback */ }
    }
    return ensureUniqueFilmyReports(INITIAL_EMERGENCIES);
  });

  // Expired food emergencies archive (unrescued items whose rescue window elapsed)
  const [expiredEmergencies, setExpiredEmergencies] = useState(() => {
    const saved = localStorage.getItem('fr911_v8_expired');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return ensureUniqueFilmyReports(parsed);
      } catch { /* fallback */ }
    }
    return ensureUniqueFilmyReports(INITIAL_EXPIRED_EMERGENCIES);
  });

  // Active reservations
  const [reservations, setReservations] = useState(() => {
    const saved = localStorage.getItem('fr911_v8_reservations');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fallback */ }
    }
    return [];
  });

  // Rescuer history
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('fr911_v8_history');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fallback */ }
    }
    return [];
  });

  // Modals & view states
  const [selectedEmergency, setSelectedEmergency] = useState(null);
  const [activeMission, setActiveMission] = useState(null); // When mission is accepted
  const [completedRescueData, setCompletedRescueData] = useState(null); // When celebratory success modal shows
  const [demoStep, setDemoStep] = useState(1);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('fr911_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('fr911_sound', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem('fr911_v8_emergencies', JSON.stringify(emergencies));
  }, [emergencies]);

  useEffect(() => {
    localStorage.setItem('fr911_v8_expired', JSON.stringify(expiredEmergencies));
  }, [expiredEmergencies]);

  useEffect(() => {
    localStorage.setItem('fr911_v8_reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem('fr911_v8_history', JSON.stringify(history));
  }, [history]);

  // Rescuer Feedback & Complaints State
  const [feedbacks, setFeedbacks] = useState(() => {
    const saved = localStorage.getItem('fr911_v8_feedbacks');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_FEEDBACKS;
  });

  useEffect(() => {
    localStorage.setItem('fr911_v8_feedbacks', JSON.stringify(feedbacks));
  }, [feedbacks]);

  const addFeedback = (feedbackData) => {
    const newId = `fb-${Date.now().toString().slice(-4)}`;
    const code = `FB-911-${Math.floor(100 + Math.random() * 900)}`;
    const newEntry = {
      id: newId,
      code,
      foodName: feedbackData.foodName || 'General Rescue Feedback',
      restaurant: feedbackData.restaurant || 'Central Kitchen Station #04',
      type: feedbackData.type || 'PRAISE',
      typeLabel: feedbackData.typeLabel || '🌟 General Feedback',
      rating: feedbackData.rating || 5,
      rescuerName: feedbackData.rescuerName || 'You (Hero On-Duty)',
      message: feedbackData.message || '',
      status: feedbackData.type === 'PRAISE' ? 'RESOLVED' : 'IN_INVESTIGATION',
      statusLabel: feedbackData.type === 'PRAISE' ? '🎖️ Appreciated & Forwarded' : '🩺 Under ICU Investigation',
      resolutionNote: feedbackData.type === 'PRAISE'
        ? 'Chef has received your praise! Pinned to Kitchen Trauma Wall with 21-topon ki salami! 🎖️❤️'
        : 'Emergency complaint ticket dispatched to kitchen supervisor for quality audit. 🚑📋',
      timestamp: Date.now()
    };
    setFeedbacks(prev => [newEntry, ...prev]);
    playAudio('beep');
    return newEntry;
  };

  const resolveFeedback = (id, resolutionData) => {
    setFeedbacks(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: resolutionData.status || 'RESOLVED',
          statusLabel: resolutionData.status === 'RESOLVED' ? '✅ Action Taken & Solved' : '🩺 Under Kitchen Review',
          resolutionNote: resolutionData.resolutionNote || 'Kitchen supervisor inspected and resolved this issue.',
          resolvedAt: Date.now()
        };
      }
      return item;
    }));
    playAudio('dispatch');
  };

  // LIVE COUNTDOWN TIMER TICKER (runs every second)
  // Calculates remaining seconds from absolute expiresAt.
  // AUTOMATIC EXPIRY REMOVAL: When secondsLeft reaches 0, the food is automatically
  // removed from active live broadcasts and archived in expiredEmergencies.
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();

      setEmergencies(prev => {
        const stillActive = [];
        const newlyExpired = [];

        prev.forEach(item => {
          const expiresAt = item.expiresAt || (now + (item.secondsLeft || 0) * 1000);
          const nextSec = Math.max(0, Math.floor((expiresAt - now) / 1000));
          const nextMins = Math.ceil(nextSec / 60);
          const nextCondition = getStatusByMinutes(nextMins).key;
          const updated = {
            ...item,
            expiresAt,
            secondsLeft: nextSec,
            condition: nextCondition,
            isExpired: nextSec === 0
          };

          if (nextSec <= 0) {
            newlyExpired.push({
              ...updated,
              secondsLeft: 0,
              isExpired: true,
              condition: 'EXPIRED',
              expiredAt: now,
              expiredTimeStr: formatTimeStr(now)
            });
          } else {
            stillActive.push(updated);
          }
        });

        if (newlyExpired.length > 0) {
          setExpiredEmergencies(expPrev => {
            const existingIds = new Set(expPrev.map(e => e.id));
            const filteredNew = newlyExpired.filter(e => !existingIds.has(e.id));
            return [...filteredNew, ...expPrev];
          });
        }

        return stillActive;
      });

      setSelectedEmergency(prev => {
        if (!prev) return null;
        const expiresAt = prev.expiresAt || (now + (prev.secondsLeft || 0) * 1000);
        const nextSec = Math.max(0, Math.floor((expiresAt - now) / 1000));
        const nextMins = Math.ceil(nextSec / 60);
        return {
          ...prev,
          expiresAt,
          secondsLeft: nextSec,
          condition: nextSec === 0 ? 'EXPIRED' : getStatusByMinutes(nextMins).key,
          isExpired: nextSec === 0
        };
      });

      // Also tick activeMission if one is live
      setActiveMission(prev => {
        if (!prev || !prev.pickupExpiresAt) return prev;
        const pickupSec = Math.max(0, Math.floor((prev.pickupExpiresAt - now) / 1000));
        return {
          ...prev,
          pickupSecondsLeft: pickupSec,
          isPickupExpired: pickupSec === 0
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const playAudio = (type) => {
    if (soundEnabled) {
      playSound(type);
    }
  };

  // Switch Role
  const switchRole = (newRole) => {
    setRole(newRole);
    playAudio('dispatch');
  };

  // Add new food emergency from Restaurant
  const addEmergency = (foodData) => {
    const now = Date.now();
    const rescueMins = parseInt(foodData.rescueWindowMinutes, 10) || 30;
    const pickupMins = parseInt(foodData.pickupWindowMinutes, 10) || 15;

    // Anchor to wall-clock timestamps
    const listedAt = foodData.listedAt || now;
    const expiresAt = foodData.expiresAt || (listedAt + rescueMins * 60 * 1000);
    const secondsLeft = Math.max(0, Math.floor((expiresAt - now) / 1000));
    const statusObj = getStatusByMinutes(Math.ceil(secondsLeft / 60));

    const newId = `food-${Date.now().toString().slice(-4)}`;
    const filmyCodes = ['420', '302', '007', '143', '911', '100', '786', '840', '555', '999'];
    const chosenCodeNum = filmyCodes[Math.floor(Math.random() * filmyCodes.length)];
    const cleanWord = (foodData.name || 'FOOD').replace(/[^a-zA-Z]/g, '').slice(0, 5).toUpperCase() || 'FOOD';
    const code = `${cleanWord}-${chosenCodeNum}`;

    const newEmergency = {
      id: newId,
      code: code,
      name: foodData.name,
      category: foodData.category || 'General',
      emoji: foodData.emoji || '🥐',
      restaurant: foodData.restaurant || 'Munna Bhai MBBS Emergency Kitchen #04',
      address: foodData.address || 'Corner Stall 8, University Circle',
      distance: 0.6,
      originalPrice: Number(foodData.originalPrice),
      rescuePrice: Number(foodData.rescuePrice),
      quantity: Number(foodData.quantity) || 10,
      totalQuantity: Number(foodData.quantity) || 10,
      claimedQuantity: 0,
      listedAt,
      listedTimeStr: foodData.listedTimeStr || formatTimeStr(listedAt),
      rescueWindowMinutes: rescueMins,
      rescueDeadlineStr: foodData.rescueDeadlineStr || formatTimeStr(expiresAt),
      pickupWindowMinutes: pickupMins,
      expiresAt,
      secondsLeft,
      initialMinutes: rescueMins,
      condition: statusObj.key,
      isExpired: secondsLeft === 0,
      doctorNotes: (foodData.doctorNotes && !foodData.doctorNotes.startsWith('Food Safety Clearance'))
        ? foodData.doctorNotes
        : getFilmyTriageReportForFood(foodData.name, foodData.category, foodData.emoji),
      safetyPledge: foodData.safetyPledge || 'Freshly prepared. 100% safe, verified edible surplus before pickup window ends.',
      vitalSigns: {
        temp: 'Freshly warm (65°C)',
        pulse: '105 BPM (Eager to be devoured)',
        urgency: statusObj.label
      },
      mapCoords: {
        x: Math.floor(Math.random() * 60) + 20,
        y: Math.floor(Math.random() * 60) + 20
      }
    };

    setEmergencies(prev => [newEmergency, ...prev]);
    playAudio('siren');
    return newEmergency;
  };

  // Reserve Food Emergency (Food Rescuer flow)
  // Enforces:
  // 1. Cannot claim expired listing
  // 2. Cannot claim more than remaining quantity (anti-overclaim)
  const reserveEmergency = (foodItem, quantity = 1, customerName = 'You (Hero On-Duty)') => {
    const now = Date.now();
    const expiresAt = foodItem.expiresAt || (now + (foodItem.secondsLeft || 0) * 1000);
    const remainingSec = Math.max(0, Math.floor((expiresAt - now) / 1000));

    // PREVENT CLAIMING EXPIRED FOOD LISTING
    if (remainingSec <= 0) {
      alert('🚨 AREY BHAI! TIME KHATAM HO GAYA! 😭\n\nFood rescue nahi ho paya...\nThe rescue window for this food has expired. 🥲\n\nNote: The vendor configured rescue window has closed.');
      return null;
    }

    // PREVENT CLAIMING WHEN QUANTITY IS EXHAUSTED
    const current = emergencies.find(e => e.id === foodItem.id);
    if (!current || current.quantity <= 0) {
      alert('🚨 AREY BHAI! All portions of this food have already been rescued by other heroes!');
      return null;
    }

    const claimQty = Math.min(quantity, current.quantity);
    if (claimQty <= 0) {
      return null;
    }

    const missionCode = `MISSION #FR911-${Math.floor(1000 + Math.random() * 9000)}`;
    const pickupMins = foodItem.pickupWindowMinutes || 15;
    const pickupExpiresAt = now + pickupMins * 60 * 1000;
    const pickupDeadlineStr = formatTimeStr(pickupExpiresAt);

    const newReservation = {
      id: `res-${Date.now().toString().slice(-4)}`,
      missionCode,
      foodId: foodItem.id,
      foodCode: foodItem.code,
      foodName: foodItem.name,
      foodEmoji: foodItem.emoji,
      customerName: customerName,
      customerPhone: '+91 99887 76655',
      quantity: claimQty,
      rescuePrice: foodItem.rescuePrice,
      originalPrice: foodItem.originalPrice,
      restaurant: foodItem.restaurant,
      address: foodItem.address,
      pickupWindowMinutes: pickupMins,
      pickupExpiresAt,
      pickupDeadline: pickupDeadlineStr,
      pickupSecondsLeft: pickupMins * 60,
      isPickupExpired: false,
      status: 'RESERVED',
      timestamp: 'Just now',
      pointsAwarded: 50 * claimQty
    };

    // Atomically decrement remaining quantity
    setEmergencies(prev =>
      prev.map(item => {
        if (item.id === foodItem.id) {
          const rem = Math.max(0, item.quantity - claimQty);
          return {
            ...item,
            quantity: rem,
            claimedQuantity: (item.claimedQuantity || 0) + claimQty,
            isSoldOut: rem === 0
          };
        }
        return item;
      })
    );

    setReservations(prev => [newReservation, ...prev]);
    setActiveMission(newReservation);
    setSelectedEmergency(null);
    playAudio('dispatch');

    return newReservation;
  };

  // Mark status: ON THE WAY
  const markOnTheWay = (reservationId) => {
    setReservations(prev =>
      prev.map(res => (res.id === reservationId ? { ...res, status: 'ON_THE_WAY' } : res))
    );
    if (activeMission && activeMission.id === reservationId) {
      setActiveMission(prev => ({ ...prev, status: 'ON_THE_WAY' }));
    }
    playAudio('siren');
  };

  // Mark as Rescued (Completed)
  const markAsRescued = (reservationId) => {
    const target = reservations.find(r => r.id === reservationId);
    if (!target) return;

    // Update reservation status
    setReservations(prev =>
      prev.map(r => (r.id === reservationId ? { ...r, status: 'COMPLETED' } : r))
    );

    // Add to history
    const historyEntry = {
      id: `hist-${Date.now().toString().slice(-4)}`,
      foodName: target.foodName,
      emoji: target.foodEmoji,
      restaurant: target.restaurant,
      savedAmount: (target.originalPrice - target.rescuePrice) * target.quantity,
      paidAmount: target.rescuePrice * target.quantity,
      points: target.pointsAwarded || 50,
      date: 'Just now',
      heroReview: '“Mission accomplished! Zero food left behind.”'
    };

    setHistory(prev => [historyEntry, ...prev]);

    // Show celebration modal & confetti
    setCompletedRescueData({
      reservation: target,
      historyEntry
    });

    if (activeMission && activeMission.id === reservationId) {
      setActiveMission(null);
    }

    playAudio('success');
    triggerRescueConfetti();
  };

  // Re-list an expired surplus batch with a renewed rescue window (Kitchen Chef action)
  const relistEmergency = (foodId, additionalMinutes = 15) => {
    const target = expiredEmergencies.find(e => e.id === foodId);
    if (!target) return;

    const now = Date.now();
    const rescueMins = parseInt(additionalMinutes, 10) || 15;
    const expiresAt = now + rescueMins * 60 * 1000;
    const statusObj = getStatusByMinutes(rescueMins);

    const relisted = {
      ...target,
      listedAt: now,
      listedTimeStr: formatTimeStr(now),
      rescueWindowMinutes: rescueMins,
      rescueDeadlineStr: formatTimeStr(expiresAt),
      expiresAt,
      secondsLeft: rescueMins * 60,
      initialMinutes: rescueMins,
      condition: statusObj.key,
      isExpired: false,
      doctorNotes: target.doctorNotes || getFilmyTriageReportForFood(target.name, target.category, target.emoji),
      relistedCount: (target.relistedCount || 0) + 1
    };

    setExpiredEmergencies(prev => prev.filter(e => e.id !== foodId));
    setEmergencies(prev => [relisted, ...prev]);
    playAudio('siren');
  };

  // Archive / delete expired emergency permanently
  const deleteExpiredEmergency = (foodId) => {
    setExpiredEmergencies(prev => prev.filter(e => e.id !== foodId));
    playAudio('dispatch');
  };

  // Clear all expired records
  const clearAllExpired = () => {
    setExpiredEmergencies([]);
    playAudio('dispatch');
  };

  // Reset all data to 0
  const resetToZero = () => {
    localStorage.setItem('fr911_v8_emergencies', JSON.stringify([]));
    localStorage.setItem('fr911_v8_expired', JSON.stringify([]));
    localStorage.setItem('fr911_v8_reservations', JSON.stringify([]));
    localStorage.setItem('fr911_v8_history', JSON.stringify([]));
    setEmergencies([]);
    setExpiredEmergencies([]);
    setReservations([]);
    setHistory([]);
    setActiveMission(null);
    setSelectedEmergency(null);
    setCompletedRescueData(null);
    playAudio('dispatch');
  };

  // Load sample food emergencies anchored to now
  const loadSampleEmergencies = () => {
    const now = Date.now();
    const freshSamples = INITIAL_EMERGENCIES.map(item => {
      const offset = item.secondsLeft || (item.rescueWindowMinutes * 60);
      const expiresAt = now + offset * 1000;
      const listedAt = expiresAt - (item.rescueWindowMinutes * 60 * 1000);
      return {
        ...item,
        listedAt,
        expiresAt,
        listedTimeStr: formatTimeStr(listedAt),
        rescueDeadlineStr: formatTimeStr(expiresAt),
        secondsLeft: offset,
        isExpired: offset <= 0,
        doctorNotes: item.doctorNotes || getFilmyTriageReportForFood(item.name, item.category, item.emoji)
      };
    });

    localStorage.setItem('fr911_v8_emergencies', JSON.stringify(freshSamples));
    localStorage.setItem('fr911_v8_expired', JSON.stringify(INITIAL_EXPIRED_EMERGENCIES));
    setEmergencies(freshSamples);
    setExpiredEmergencies(INITIAL_EXPIRED_EMERGENCIES);
    playAudio('siren');
  };

  // Reset to zero by default for clean demo
  const resetDemoData = resetToZero;

  // Computed totals for impact
  const totalRescuedCount = history.length;
  const totalMoneySaved = history.reduce((sum, h) => sum + (h.savedAmount || 0), 0);
  const totalRevenueRecovered = history.reduce((sum, h) => sum + (h.paidAmount || 0), 0);
  const totalWasteAvoidedKg = Math.round((totalRescuedCount * 0.45) * 10) / 10;
  const totalHeroPoints = history.reduce((sum, h) => sum + (h.points || 0), 0);

  return (
    <RescueContext.Provider
      value={{
        role,
        setRole: switchRole,
        soundEnabled,
        setSoundEnabled,
        playAudio,
        emergencies,
        expiredEmergencies,
        reservations,
        history,
        selectedEmergency,
        setSelectedEmergency,
        activeMission,
        setActiveMission,
        completedRescueData,
        setCompletedRescueData,
        demoStep,
        setDemoStep,
        addEmergency,
        reserveEmergency,
        markOnTheWay,
        markAsRescued,
        relistEmergency,
        deleteExpiredEmergency,
        clearAllExpired,
        resetDemoData,
        resetToZero,
        loadSampleEmergencies,
        // Feedback & Complaints
        feedbacks,
        addFeedback,
        resolveFeedback,
        // Computed Impact
        totalRescuedCount,
        totalMoneySaved,
        totalRevenueRecovered,
        totalWasteAvoidedKg,
        totalHeroPoints
      }}
    >
      {children}
    </RescueContext.Provider>
  );
};

export const useRescue = () => {
  const ctx = useContext(RescueContext);
  if (!ctx) throw new Error('useRescue must be used within RescueProvider');
  return ctx;
};
