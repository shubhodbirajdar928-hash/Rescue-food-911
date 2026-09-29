// Smooth & Funny Bollywood Male Voice Engine 🎙️🎭
// Simple, hilarious meme-worthy lines (Oye hoye mast!, Balle balle!, Khatam tata bye bye!, Arrey yaar ruko zara!)
// Tuned for crystal-clear, silky smooth male speech synthesis!

const ROAST_STORAGE_KEY = 'fr911_robo_roast_enabled';

// Cache browser voices reliably
let cachedVoices = [];
const loadVoices = () => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return [];
  const v = window.speechSynthesis.getVoices();
  if (v && v.length > 0) cachedVoices = v;
  return cachedVoices;
};

if (typeof window !== 'undefined' && window.speechSynthesis) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    loadVoices();
  };
}

// Play a smooth, warm and funny sound effect before speaking
const playBollywoodFanfare = (isError = false) => {
  try {
    if (typeof window === 'undefined') return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    if (isError) {
      // Smooth, funny cartoon descending slide (pure sine wave, no harsh buzzing)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine'; // Silky smooth pure tone
      osc.frequency.setValueAtTime(360, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.22); // Funny gentle slide

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } else {
      // Smooth, cheerful soft chime (C5 - E5 - G5 pure sine bells)
      const notes = [523.25, 659.25, 783.99];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = now + idx * 0.06;

        osc.type = 'sine'; // Soft, warm bell chime
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.08, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.22);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.22);
      });
    }
  } catch {
    // Fails gracefully if awaiting user gesture
  }
};

export const BOLLYWOOD_THEME_SCRIPTS = {
  // RESULTS (SUCCESS ACTIONS) - SIMPLE, FUNNY & SUPER SMOOTH
  MISSION_ACCEPTED: [
    { hindi: "ओए होए, मस्त!", roman: "Oye hoye, mast!", star: "Smooth Hero 😎" },
    { hindi: "बल्ले बल्ले!", roman: "Balle balle!", star: "Full Happy 🕺" },
    { hindi: "वाह भाई वाह!", roman: "Wah bhai wah!", star: "Super Star 🌟" },
    { hindi: "जबरदस्त!", roman: "Zabardast!", star: "Full Power ⚡" }
  ],
  RESCUE_COMPLETED: [
    { hindi: "सब सेट है, बॉस!", roman: "Sab set hai, boss!", star: "Rescue Done 👍" },
    { hindi: "सुपर हिट, हीरो!", roman: "Super hit, hero!", star: "Action Star 🦸" },
    { hindi: "पैसा वसूल!", roman: "Paisa vasool!", star: "Baburao Style 💰" },
    { hindi: "रॉकिंग!", roman: "Rocking!", star: "Full Swag 🎸" }
  ],
  KITCHEN_DISPATCH: [
    { hindi: "गरमा-गरम, तैयार!", roman: "Garma garam, taiyaar!", star: "Fresh Dispatch 🍲" },
    { hindi: "धमाका!", roman: "Dhamaka!", star: "Full Speed ⚡" },
    { hindi: "झकास!", roman: "Jhakaas!", star: "Anil Kapoor Style 🕺" }
  ],
  FEEDBACK_SUBMITTED_PRAISE: [
    { hindi: "मजा आ गया!", roman: "Maza aa gaya!", star: "Top Taste 😋" },
    { hindi: "वाह, लाजवाब!", roman: "Wah, lajawab!", star: "Dil Khush ❤️" }
  ],
  FEEDBACK_RESOLVED: [
    { hindi: "सॉर्टेड, नो टेंशन!", roman: "Sorted, no tension!", star: "Chill Mode ✌️" },
    { hindi: "शांति!", roman: "Shaanti!", star: "All Good 🧘" }
  ],
  FEEDBACK_DELETED: [
    { hindi: "गायब, छू-मंतर!", roman: "Gaayab, chhoo-mantar!", star: "Magic Trick 🎩" }
  ],
  ITEM_RELISTED: [
    { hindi: "वापस आ गया!", roman: "Waapas aa gaya!", star: "Back Again 🔄" },
    { hindi: "जिंदा है!", roman: "Zinda hai!", star: "Fir Se Live 🐅" }
  ],
  KITCHEN_RESET: [
    { hindi: "सफाचट!", roman: "Safachat!", star: "Clean Sweep 🧹" }
  ],

  // ERRORS & ALERTS - SIMPLE, FUNNY & SUPER SMOOTH
  SAFETY_NOT_CHECKED: [
    { hindi: "अरे यार, रुको जरा!", roman: "Arrey yaar, ruko zara!", star: "Sabar Karo ✋" },
    { hindi: "ध्यान से, भाई!", roman: "Dhyan se, bhai!", star: "Watch Out 👀" }
  ],
  FORM_VALIDATION_ERROR: [
    { hindi: "अरे बाप रे, लोचा!", roman: "Arrey baap re, locha!", star: "Form Bhool Gaye 📝" },
    { hindi: "ढक्कन, चेक करो!", roman: "Dhakkan, check karo!", star: "Funny Oops 🤪" }
  ],
  FOOD_EXPIRED_TIMEOUT: [
    { hindi: "खत्म, टाटा, बाय बाय!", roman: "Khatam, tata, bye bye!", star: "Time Over ⏰" },
    { hindi: "गया, टाटा!", roman: "Gaya, tata!", star: "Too Late 💨" }
  ],
  COMPLAINT_FILED: [
    { hindi: "ओए तेरी, गड़बड़!", roman: "Oye teri, gadbad!", star: "CID Alert 🕵️" },
    { hindi: "आईला, लफड़ा!", roman: "Aila, lafda!", star: "Scene Alert 🚨" }
  ],
  OUT_OF_STOCK: [
    { hindi: "पोपट हो गया!", roman: "Popat ho gaya!", star: "Plate Empty 🦜" },
    { hindi: "सब खाली!", roman: "Sab khaali!", star: "All Gone 📦" }
  ],
  CANCELLATION_PANIC: [
    { hindi: "अरे रे, कैंसल!", roman: "Arrey re, cancel!", star: "Plan Cancel 🏃" },
    { hindi: "बाबूराव, ये क्या किया!", roman: "Baburao, ye kya kiya!", star: "Hera Pheri 👓" }
  ],
  GENERAL_ERROR: [
    { hindi: "लोचा हो गया!", roman: "Locha ho gaya!", star: "Chhota Locha 😅" },
    { hindi: "गड़बड़ है, भाई!", roman: "Gadbad hai, bhai!", star: "Funny Glitch 🎬" }
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

// Pick the smoothest, highest-quality MALE Hindi or Indian English voice
const pickBollywoodVoice = () => {
  const voices = loadVoices();
  if (!voices || voices.length === 0) return null;

  // 0. Prefer Natural / Neural Male voices first (smoothest modern neural voices in Edge/Chrome)
  const naturalMale = voices.find(v => {
    const isMale = isMaleVoice(v) && !isFemaleVoice(v);
    const isNatural = (v.name || '').toLowerCase().includes('natural') || (v.name || '').toLowerCase().includes('online');
    const isIndian = v.lang.startsWith('hi') || v.lang.includes('IN');
    return isMale && isNatural && isIndian;
  });
  if (naturalMale) return { voice: naturalMale, isHindiNative: naturalMale.lang.startsWith('hi') };

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

  // 4. Look for global smooth MALE voice (Google UK English Male, Microsoft David, Alex, Microsoft George)
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

  // Play smooth funny sound effect
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

    // Smooth & funny natural male delivery tuning:
    // Natural conversational pace and warm, friendly pitch
    utterance.rate = 0.93; // Relaxed, clear, and smooth delivery
    utterance.pitch = isError ? 0.94 : 0.98; // Silky smooth, warm natural male baritone
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
