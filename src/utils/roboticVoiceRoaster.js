// Smooth and Funny Voice Engine
// Uses the browser's built-in Web Speech API (window.speechSynthesis)
// Smooth, natural, friendly voice with simple, funny, punchy words on Results and Errors!

const ROAST_STORAGE_KEY = 'fr911_robo_roast_enabled';

// Play a pleasant, smooth 2-tone chime before speaking
const playSmoothChime = (isError = false) => {
  try {
    if (typeof window === 'undefined') return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine'; // Smooth, mellow sine wave instead of harsh buzz
    if (isError) {
      // Gentle warning chime
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(330, now + 0.18);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    } else {
      // Happy friendly ping
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    }

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.22);
  } catch {
    // Audio context fails gracefully if waiting on user interaction
  }
};

const SIMPLE_FUNNY_SCRIPTS = {
  // RESULTS (SUCCESS ACTIONS) - Simple, smooth, and funny
  MISSION_ACCEPTED: [
    "Nice move! You just saved fresh biryani and 100 rupees. Your stomach salutes you, human!",
    "Order locked in! Look at you running for discount food like an Olympic champion!",
    "Food saved! The dustbin lost, your tummy won. Go grab your delicious meal!",
    "Awesome choice! Emergency mission active. Don't get distracted by Instagram reels on the way!"
  ],
  RESCUE_COMPLETED: [
    "Mission complete! Delicious food rescued, zero waste. Swaad aa gaya!",
    "Target devoured! Full stomach, clean plate, money saved. You are a real food hero!",
    "Rescue successful! That food went to a happy tummy instead of the trash. Great job, legend!",
    "All cleared! Your hunger is solved and the planet is happier. Enjoy the food!"
  ],
  KITCHEN_DISPATCH: [
    "Kitchen alert! Hot surplus food is live on radar. The dustbin stays hungry tonight!",
    "Tandoor is on fire! Fresh meal dispatched. Save food, make cash!",
    "New batch broadcasted! Let's turn extra meals into happy customers and quick cash!"
  ],
  FEEDBACK_SUBMITTED_PRAISE: [
    "Five stars! The chef is so happy he is dancing in the kitchen!",
    "Great review! The kitchen team is smiling from ear to ear. Thank you hero!"
  ],
  FEEDBACK_RESOLVED: [
    "Problem solved! Hot food guaranteed. Everything is peaceful again!",
    "Issue fixed! The chef personally made sure your next meal will be super fresh!"
  ],
  FEEDBACK_DELETED: [
    "Complaint closed and deleted! Fresh clean slate for the kitchen team!"
  ],
  ITEM_RELISTED: [
    "Bonus time! Extra 15 minutes added to the clock. Grab it before it's gone!",
    "Second chance granted! Live on radar for 15 more minutes. Quick, hungry heroes!"
  ],
  KITCHEN_RESET: [
    "Kitchen reset! Everything is fresh, clean, and ready for action!"
  ],

  // ERRORS & ALERTS - Simple, funny, and clear
  SAFETY_NOT_CHECKED: [
    "Wait chef! Check the safety boxes first. Don't send our heroes to the hospital!",
    "Hold on! Food safety first. Please tick all check boxes before dispatching!"
  ],
  FORM_VALIDATION_ERROR: [
    "Oops! You forgot to type your message. Blank words cannot feed anyone!",
    "Hey human, please fill in the details first. Don't leave it empty!"
  ],
  FOOD_EXPIRED_TIMEOUT: [
    "Too late! You looked at your screen too long and the food expired. Be quicker next time!",
    "Time is up! The biryani couldn't wait any longer. Fast fingers get the food!"
  ],
  COMPLAINT_FILED: [
    "Alert! A spicy complaint was filed! Who forgot the extra garlic chutney? Fix it quick!",
    "Attention kitchen! Rescuer reported cold food. Turn up the heat chef!"
  ],
  OUT_OF_STOCK: [
    "Oh no, sold out! Someone was faster than you. Better luck on the next meal!",
    "Too slow human! Another hungry hero already took the last portion!"
  ],
  CANCELLATION_PANIC: [
    "You cancelled? Aww, your stomach is going to complain to you at midnight!",
    "Order closed without food! Your belly will remember this betrayal!"
  ],
  GENERAL_ERROR: [
    "Oops! Something went wrong. Take a deep breath and try again, human!"
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

// Pick the smoothest, highest-quality natural English voice available
const pickSmoothVoice = () => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // Search for the smoothest natural voices across Chrome, Edge, Safari & Windows
  const preferredVoice = voices.find(v =>
    v.lang.startsWith('en') && (
      v.name.includes('Natural') ||
      v.name.includes('Google US English') ||
      v.name.includes('Samantha') ||
      v.name.includes('Jenny') ||
      v.name.includes('Guy') ||
      v.name.includes('Aria') ||
      v.name.includes('Google UK English Female') ||
      v.name.includes('en-IN') ||
      v.name.includes('India')
    )
  );

  return preferredVoice || voices.find(v => v.lang.startsWith('en')) || voices[0];
};

/**
 * Speak a smooth and funny voice roast out loud using window.speechSynthesis
 * @param {string} category - key in SIMPLE_FUNNY_SCRIPTS (e.g. 'MISSION_ACCEPTED', 'SAFETY_NOT_CHECKED')
 * @param {string} [customText] - optional specific text override
 */
export const speakRoboticRoast = (category = 'MISSION_ACCEPTED', customText = null) => {
  if (typeof window === 'undefined') return;

  const isError = category.includes('ERROR') ||
    category.includes('NOT_CHECKED') ||
    category.includes('TIMEOUT') ||
    category.includes('COMPLAINT') ||
    category.includes('OUT_OF_STOCK') ||
    category.includes('PANIC');

  // Pick script
  const scriptList = SIMPLE_FUNNY_SCRIPTS[category] || SIMPLE_FUNNY_SCRIPTS.GENERAL_ERROR;
  const textToSpeak = customText || scriptList[Math.floor(Math.random() * scriptList.length)];

  // Play gentle, pleasing chime
  playSmoothChime(isError);

  // Dispatch visual event for on-screen subtitle balloon
  window.dispatchEvent(
    new CustomEvent('robotic-roast-spoken', {
      detail: {
        text: textToSpeak,
        category,
        isError,
        timestamp: Date.now()
      }
    })
  );

  if (!isRoboRoastEnabled()) return;

  if (!window.speechSynthesis) return;

  try {
    // Cancel any previous speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    // Smooth & pleasant voice tuning
    utterance.rate = 1.0; // Natural, clear conversational speed
    utterance.pitch = isError ? 0.95 : 1.05; // Friendly, smooth, expressive tone
    utterance.volume = 1.0;

    const voice = pickSmoothVoice();
    if (voice) {
      utterance.voice = voice;
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Speech synthesis error:', err);
  }
};

/**
 * Trigger a random test roast for demo purposes
 */
export const testRandomRoast = () => {
  const categories = Object.keys(SIMPLE_FUNNY_SCRIPTS);
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  speakRoboticRoast(randomCategory);
};
