// 1-Word Bollywood Style Hindi Voice Engine
// Pure Bollywood Icons: Jhakaas, Mogambo, Gabbar, Thakur, Daya, Circuit, Khallas, Baburao!

const ROAST_STORAGE_KEY = 'fr911_robo_roast_enabled';

// Play a quick Bollywood style brass/chime fanfare before speaking
const playSmoothChime = (isError = false) => {
  try {
    if (typeof window === 'undefined') return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    if (isError) {
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.15);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    } else {
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.exponentialRampToValueAtTime(987.77, now + 0.12);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    }

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.18);
  } catch {
    // Audio context fails gracefully if waiting on user interaction
  }
};

export const HINDI_FUNNY_SCRIPTS = {
  // RESULTS (SUCCESS ACTIONS) - 1-WORD BOLLYWOOD BLOCKBUSTERS
  MISSION_ACCEPTED: [
    { hindi: "झकास!", roman: "Jhakaas!" },      // Anil Kapoor
    { hindi: "मोगाम्बो!", roman: "Mogambo!" },   // Mr. India
    { hindi: "रापचिक!", roman: "Rapchik!" },    // Munna Bhai
    { hindi: "सिक्सर!", roman: "Sixer!" }
  ],
  RESCUE_COMPLETED: [
    { hindi: "शहंशाह!", roman: "Shahenshah!" }, // Amitabh Bachchan
    { hindi: "बादशाह!", roman: "Baadshah!" },   // SRK
    { hindi: "वसूल!", roman: "Vasool!" },       // Baburao
    { hindi: "शोले!", roman: "Sholay!" }        // Sholay
  ],
  KITCHEN_DISPATCH: [
    { hindi: "गब्बर!", roman: "Gabbar!" },      // Sholay
    { hindi: "धमाका!", roman: "Dhamaka!" },
    { hindi: "तहलका!", roman: "Tehelka!" },
    { hindi: "सुल्तान!", roman: "Sultan!" }
  ],
  FEEDBACK_SUBMITTED_PRAISE: [
    { hindi: "सुपरस्टार!", roman: "Superstar!" },
    { hindi: "लाजवाब!", roman: "Lajawab!" }
  ],
  FEEDBACK_RESOLVED: [
    { hindi: "सॉर्टेड!", roman: "Sorted!" },    // Munna Bhai
    { hindi: "शांति!", roman: "Shaanti!" }
  ],
  FEEDBACK_DELETED: [
    { hindi: "गायब!", roman: "Gaayab!" }
  ],
  ITEM_RELISTED: [
    { hindi: "री-लोड!", roman: "Reload!" },
    { hindi: "जिंदा!", roman: "Zinda!" }
  ],
  KITCHEN_RESET: [
    { hindi: "सफाचट!", roman: "Safachat!" }
  ],

  // ERRORS & ALERTS - 1-WORD BOLLYWOOD DRAMA
  SAFETY_NOT_CHECKED: [
    { hindi: "ठाकुर!", roman: "Thakur!" },       // Yeh haath mujhe de de Thakur
    { hindi: "यमराज!", roman: "Yamraj!" },
    { hindi: "क्राइममास्टर!", roman: "CrimeMaster!" } // Crime Master Gogo
  ],
  FORM_VALIDATION_ERROR: [
    { hindi: "सर्किट!", roman: "Circuit!" },     // Munna Bhai
    { hindi: "ढक्कन!", roman: "Dhakkan!" },
    { hindi: "चोमू!", roman: "Chomu!" }
  ],
  FOOD_EXPIRED_TIMEOUT: [
    { hindi: "खल्लास!", roman: "Khallas!" },     // Company
    { hindi: "कुंभकर्ण!", roman: "Kumbhkaran!" },
    { hindi: "अलविदा!", roman: "Alvida!" }
  ],
  COMPLAINT_FILED: [
    { hindi: "दया!", roman: "Daya!" },           // CID Daya darwaza tod
    { hindi: "लफड़ा!", roman: "Lafda!" },
    { hindi: "गड़बड़!", roman: "Gadbad!" }
  ],
  OUT_OF_STOCK: [
    { hindi: "पोपट!", roman: "Popat!" },
    { hindi: "गोली!", roman: "Goli!" }
  ],
  CANCELLATION_PANIC: [
    { hindi: "बाबूराव!", roman: "Baburao!" },   // Yeh Baburao ka style hai
    { hindi: "भगोड़ा!", roman: "Bhagoda!" }
  ],
  GENERAL_ERROR: [
    { hindi: "लोचा!", roman: "Locha!" },
    { hindi: "गड़बड़!", roman: "Gadbad!" }
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

// Pick the smoothest Hindi or Indian English voice
const pickHindiVoice = () => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // 1. Look for genuine native Hindi voice (Google हिन्दी, Microsoft Hemant, Kalpana, hi-IN)
  const hindiVoice = voices.find(v =>
    v.lang.startsWith('hi') ||
    v.lang.includes('hi_IN') ||
    v.name.toLowerCase().includes('hindi') ||
    v.name.includes('हिन्दी') ||
    v.name.toLowerCase().includes('kalpana') ||
    v.name.toLowerCase().includes('hemant')
  );
  if (hindiVoice) return { voice: hindiVoice, isHindiNative: true };

  // 2. Look for Indian English voice (en-IN, Ravi, Heera)
  const indianVoice = voices.find(v =>
    v.lang.includes('IN') ||
    v.name.toLowerCase().includes('india') ||
    v.name.toLowerCase().includes('ravi') ||
    v.name.toLowerCase().includes('heera')
  );
  if (indianVoice) return { voice: indianVoice, isHindiNative: false };

  // 3. Fallback to natural English voice
  const fallback = voices.find(v =>
    v.lang.startsWith('en') && (
      v.name.includes('Natural') ||
      v.name.includes('Google US English') ||
      v.name.includes('Samantha') ||
      v.name.includes('Jenny')
    )
  ) || voices[0];

  return { voice: fallback, isHindiNative: false };
};

/**
 * Speak in 1-word iconic Bollywood Hindi voice out loud using window.speechSynthesis
 * @param {string} category - key in HINDI_FUNNY_SCRIPTS (e.g. 'MISSION_ACCEPTED', 'SAFETY_NOT_CHECKED')
 */
export const speakRoboticRoast = (category = 'MISSION_ACCEPTED') => {
  if (typeof window === 'undefined') return;

  const isError = category.includes('ERROR') ||
    category.includes('NOT_CHECKED') ||
    category.includes('TIMEOUT') ||
    category.includes('COMPLAINT') ||
    category.includes('OUT_OF_STOCK') ||
    category.includes('PANIC');

  // Pick 1-word script item
  const scriptList = HINDI_FUNNY_SCRIPTS[category] || HINDI_FUNNY_SCRIPTS.GENERAL_ERROR;
  const item = scriptList[Math.floor(Math.random() * scriptList.length)];

  // Play gentle chime
  playSmoothChime(isError);

  // Dispatch visual event for on-screen subtitle balloon
  window.dispatchEvent(
    new CustomEvent('robotic-roast-spoken', {
      detail: {
        text: item.hindi,
        roman: item.roman,
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

    const voiceInfo = pickHindiVoice();
    const textToSpeak = voiceInfo && voiceInfo.isHindiNative ? item.hindi : item.roman;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    if (voiceInfo && voiceInfo.voice) {
      utterance.voice = voiceInfo.voice;
      utterance.lang = voiceInfo.isHindiNative ? 'hi-IN' : (voiceInfo.voice.lang || 'en-IN');
    } else {
      utterance.lang = 'hi-IN';
    }

    // Punchy 1-word Bollywood delivery
    utterance.rate = 1.05;
    utterance.pitch = isError ? 0.95 : 1.1;
    utterance.volume = 1.0;

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Speech synthesis error:', err);
  }
};

/**
 * Trigger a random 1-word Bollywood test roast for demo purposes
 */
export const testRandomRoast = () => {
  const categories = Object.keys(HINDI_FUNNY_SCRIPTS);
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  speakRoboticRoast(randomCategory);
};
