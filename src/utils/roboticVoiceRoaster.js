// Bollywood Theme Voice Engine 🎬🎭
// Theatrical Bollywood Hero & Villain Fanfares & Iconic 1-Word Dialogues!
// Anil Kapoor (Jhakaas!), Mogambo (Mogambo!), Gabbar (Gabbar!), Thakur (Thakur!), CID Daya (Daya!)

const ROAST_STORAGE_KEY = 'fr911_robo_roast_enabled';

// Play an iconic theatrical Bollywood cinematic fanfare before speaking
const playBollywoodFanfare = (isError = false) => {
  try {
    if (typeof window === 'undefined') return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    if (isError) {
      // Dramatic Bollywood villain / suspense stabs: "Dhum! Dhum! Dhum!"
      const stabs = [330, 293.66, 220]; // E4, D4, A3 minor suspense
      stabs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = now + idx * 0.1;

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.09, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.18);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.18);
      });
    } else {
      // Triumphant Bollywood hero entry brass fanfare (C-E-G-C major hero flourish)
      const notes = [261.63, 329.63, 392.00, 523.25];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = now + idx * 0.08;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.1, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.28);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.28);
      });
    }
  } catch {
    // Fails gracefully if awaiting user gesture
  }
};

export const BOLLYWOOD_THEME_SCRIPTS = {
  // RESULTS (SUCCESS ACTIONS) - ICONIC 1-WORD BOLLYWOOD HERO SHOUTS
  MISSION_ACCEPTED: [
    { hindi: "झकाऽऽस!", roman: "Jhakaas!", star: "Anil Kapoor Style 🕺" },
    { hindi: "मोगैम्बोऽऽ!", roman: "Mogambo!", star: "Amrish Puri Style 👑" },
    { hindi: "रापचिक!", roman: "Rapchik!", star: "Munna Bhai Style 💥" },
    { hindi: "सिक्सर!", roman: "Sixer!", star: "Bollywood Hero Entry 🏏" }
  ],
  RESCUE_COMPLETED: [
    { hindi: "शहंशाह!", roman: "Shahenshah!", star: "Amitabh Bachchan Style 🧥" },
    { hindi: "बादशाह!", roman: "Baadshah!", star: "Shah Rukh Khan Style 👑" },
    { hindi: "वसूल!", roman: "Vasool!", star: "Baburao Apte Style 💰" },
    { hindi: "शोले!", roman: "Sholay!", star: "Dharmendra Style 🔥" }
  ],
  KITCHEN_DISPATCH: [
    { hindi: "गब्बर!", roman: "Gabbar!", star: "Gabbar Singh Style 🤠" },
    { hindi: "धमाका!", roman: "Dhamaka!", star: "Bollywood Climax 💥" },
    { hindi: "तहलका!", roman: "Tehelka!", star: "Dharmendra Action 🌪️" },
    { hindi: "सुल्तान!", roman: "Sultan!", star: "Salman Khan Style 🥊" }
  ],
  FEEDBACK_SUBMITTED_PRAISE: [
    { hindi: "सुपरस्टार!", roman: "Superstar!", star: "Rajinikanth Style 🌟" },
    { hindi: "लाजवाब!", roman: "Lajawab!", star: "Sanjeev Kumar Style 😋" }
  ],
  FEEDBACK_RESOLVED: [
    { hindi: "सॉर्टेड!", roman: "Sorted!", star: "Munna & Circuit 🕶️" },
    { hindi: "शांति!", roman: "Shaanti!", star: "Om Shanti Om 🧘" }
  ],
  FEEDBACK_DELETED: [
    { hindi: "गायब!", roman: "Gaayab!", star: "Mr. India Invisible 🎩" }
  ],
  ITEM_RELISTED: [
    { hindi: "री-लोड!", roman: "Reload!", star: "Bollywood Sequels 🎬" },
    { hindi: "जिंदा!", roman: "Zinda!", star: "Tiger Zinda Hai 🐅" }
  ],
  KITCHEN_RESET: [
    { hindi: "सफाचट!", roman: "Safachat!", star: "Baburao Ka Jhadu 🧹" }
  ],

  // ERRORS & ALERTS - ICONIC 1-WORD BOLLYWOOD DRAMA SHOUTS
  SAFETY_NOT_CHECKED: [
    { hindi: "ठाकुऽऽर!", roman: "Thakur!", star: "Sholay Gabbar Warning ✋" },
    { hindi: "यमराज!", roman: "Yamraj!", star: "Asrani Jailor Style 🐃" },
    { hindi: "क्राइममास्टर!", roman: "CrimeMaster!", star: "Crime Master Gogo 🦸" }
  ],
  FORM_VALIDATION_ERROR: [
    { hindi: "सर्किट!", roman: "Circuit!", star: "Munna Bhai Warning 🕶️" },
    { hindi: "ढक्कन!", roman: "Dhakkan!", star: "Bollywood Comedy 🪣" },
    { hindi: "चोमू!", roman: "Chomu!", star: "Golmaal Style 🤓" }
  ],
  FOOD_EXPIRED_TIMEOUT: [
    { hindi: "खल्लाऽऽस!", roman: "Khallas!", star: "Company Style 💀" },
    { hindi: "कुंभकर्ण!", roman: "Kumbhkaran!", star: "Hera Pheri Sleep 😴" },
    { hindi: "अलविदा!", roman: "Alvida!", star: "Kabhi Alvida Naa Kehna 👋" }
  ],
  COMPLAINT_FILED: [
    { hindi: "दऽऽया!", roman: "Daya!", star: "CID ACP Pradyuman 🚪" },
    { hindi: "लफड़ा!", roman: "Lafda!", star: "Bollywood Drama 🚨" },
    { hindi: "गड़बड़!", roman: "Gadbad!", star: "CID Investigation 🕵️" }
  ],
  OUT_OF_STOCK: [
    { hindi: "पोपऽऽट!", roman: "Popat!", star: "Taarak Mehta & Comedy 🦜" },
    { hindi: "गोली!", roman: "Goli!", star: "Bollywood Action 💊" }
  ],
  CANCELLATION_PANIC: [
    { hindi: "बाबूराव!", roman: "Baburao!", star: "Hera Pheri Retreat 👓" },
    { hindi: "भगोड़ा!", roman: "Bhagoda!", star: "Sholay Villagers 🏃" }
  ],
  GENERAL_ERROR: [
    { hindi: "लोचा!", roman: "Locha!", star: "Munna Bhai Locha 😵" },
    { hindi: "गड़बड़!", roman: "Gadbad!", star: "Golmaal Fun 🎬" }
  ]
};

// Check if voice is enabled
export const isRoboRoastEnabled = () => {
  if (typeof window === 'undefined') return true;
  const saved = localStorage.getItem(ROAST_STORAGE_KEY);
  return saved !== null ? saved === 'true' : true;
};

// Toggle enabled state
export const setRoboRoastEnabled = (enabled) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ROAST_STORAGE_KEY, enabled ? 'true' : 'false');
  window.dispatchEvent(new CustomEvent('robo-roast-toggle', { detail: { enabled } }));
};

// Female voice names to filter out when user requested male Bollywood voice
const FEMALE_VOICE_NAMES = [
  'kalpana', 'heera', 'neerja', 'zira', 'samantha', 'jenny', 'aria',
  'swara', 'aditi', 'victoria', 'karen', 'moira', 'fiona', 'veena',
  'female', 'woman', 'girl'
];

// Male voice keywords and well-known male TTS voice identifiers
const MALE_VOICE_NAMES = [
  'hemant', 'ravi', 'david', 'mark', 'george', 'guy', 'prabhat',
  'madhur', 'alex', 'fred', 'daniel', 'male', 'man', 'boy', 'natural (male)'
];

const isFemaleVoice = (v) => {
  const name = (v?.name || '').toLowerCase();
  return FEMALE_VOICE_NAMES.some(fn => name.includes(fn));
};

const isMaleVoice = (v) => {
  const name = (v?.name || '').toLowerCase();
  return MALE_VOICE_NAMES.some(mn => name.includes(mn));
};

// Pick the most dramatic MALE Hindi or Indian English voice
const pickBollywoodVoice = () => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // 1. Look for genuine native MALE Hindi voice (e.g., Microsoft Hemant - Hindi, Google Hindi Male)
  const hindiMaleVoice = voices.find(v => {
    const isHindi = v.lang.startsWith('hi') ||
      v.lang.includes('hi_IN') ||
      v.name.toLowerCase().includes('hindi') ||
      v.name.includes('हिन्दी');
    return isHindi && isMaleVoice(v) && !isFemaleVoice(v);
  });
  if (hindiMaleVoice) return { voice: hindiMaleVoice, isHindiNative: true };

  // 2. Look for Indian English MALE voice (e.g., Microsoft Ravi - English India, Prabhat)
  const indianMaleVoice = voices.find(v => {
    const isIndian = v.lang.includes('IN') || v.name.toLowerCase().includes('india');
    return isIndian && isMaleVoice(v) && !isFemaleVoice(v);
  });
  if (indianMaleVoice) return { voice: indianMaleVoice, isHindiNative: false };

  // 3. Fallback to any Hindi voice that is NOT explicitly female
  const hindiNonFemale = voices.find(v => {
    const isHindi = v.lang.startsWith('hi') ||
      v.lang.includes('hi_IN') ||
      v.name.toLowerCase().includes('hindi') ||
      v.name.includes('हिन्दी');
    return isHindi && !isFemaleVoice(v);
  });
  if (hindiNonFemale) return { voice: hindiNonFemale, isHindiNative: true };

  // 4. Look for global authoritative MALE voice (Microsoft David, Microsoft George, Microsoft Mark, Google UK Male, Alex)
  const globalMaleVoice = voices.find(v => isMaleVoice(v) && !isFemaleVoice(v));
  if (globalMaleVoice) return { voice: globalMaleVoice, isHindiNative: false };

  // 5. Fallback to any voice that is not female
  const nonFemaleVoice = voices.find(v => !isFemaleVoice(v));
  if (nonFemaleVoice) return { voice: nonFemaleVoice, isHindiNative: false };

  // 6. Absolute last resort
  return { voice: voices[0], isHindiNative: false };
};

/**
 * Speak in Bollywood Theme voice out loud using window.speechSynthesis
 * @param {string} category - key in BOLLYWOOD_THEME_SCRIPTS (e.g. 'MISSION_ACCEPTED', 'SAFETY_NOT_CHECKED')
 */
export const speakRoboticRoast = (category = 'MISSION_ACCEPTED') => {
  if (typeof window === 'undefined') return;

  const isError = category.includes('ERROR') ||
    category.includes('NOT_CHECKED') ||
    category.includes('TIMEOUT') ||
    category.includes('COMPLAINT') ||
    category.includes('OUT_OF_STOCK') ||
    category.includes('PANIC');

  // Pick script item
  const scriptList = BOLLYWOOD_THEME_SCRIPTS[category] || BOLLYWOOD_THEME_SCRIPTS.GENERAL_ERROR;
  const item = scriptList[Math.floor(Math.random() * scriptList.length)];

  // Play dramatic Bollywood cinematic fanfare
  playBollywoodFanfare(isError);

  // Dispatch visual event for on-screen subtitle balloon
  window.dispatchEvent(
    new CustomEvent('robotic-roast-spoken', {
      detail: {
        text: item.hindi,
        roman: item.roman,
        star: item.star,
        category,
        isError,
        timestamp: Date.now()
      }
    })
  );

  if (!isRoboRoastEnabled()) return;
  if (!window.speechSynthesis) return;

  try {
    // Cancel previous speech
    window.speechSynthesis.cancel();

    const voiceInfo = pickBollywoodVoice();
    const textToSpeak = voiceInfo && voiceInfo.isHindiNative ? item.hindi : item.roman;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    if (voiceInfo && voiceInfo.voice) {
      utterance.voice = voiceInfo.voice;
      utterance.lang = voiceInfo.isHindiNative ? 'hi-IN' : (voiceInfo.voice.lang || 'en-IN');
    } else {
      utterance.lang = 'hi-IN';
    }

    // Theatrical Bollywood MALE dialogue delivery tuning (deep baritone masculine pitch)
    utterance.rate = 0.98; // Punchy, theatrical dramatic hero pace
    utterance.pitch = isError ? 0.78 : 0.85; // Deep masculine hero/villain baritone
    utterance.volume = 1.0;

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Bollywood speech synthesis error:', err);
  }
};

/**
 * Trigger a random 1-word Bollywood test dialogue for demo purposes
 */
export const testRandomRoast = () => {
  const categories = Object.keys(BOLLYWOOD_THEME_SCRIPTS);
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  speakRoboticRoast(randomCategory);
};
