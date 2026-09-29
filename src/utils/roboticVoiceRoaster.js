// Robotic Voice Roast Engine
// Uses the browser's built-in Web Speech API (window.speechSynthesis)
// to roast the user out loud with robotic Bollywood & tech humor on Results and Errors!

const ROAST_STORAGE_KEY = 'fr911_robo_roast_enabled';

// Play a quick retro 8-bit robotic bleep before speaking
const playRoboticBleep = (isError = false) => {
  try {
    if (typeof window === 'undefined') return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = isError ? 'sawtooth' : 'square';
    if (isError) {
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.linearRampToValueAtTime(220, now + 0.15);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    } else {
      osc.frequency.setValueAtTime(700, now);
      osc.frequency.linearRampToValueAtTime(1100, now + 0.08);
      osc.frequency.linearRampToValueAtTime(880, now + 0.16);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    }

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  } catch {
    // Audio context may require user interaction; fails silently
  }
};

const ROAST_SCRIPTS = {
  // RESULTS (SUCCESS ACTIONS)
  MISSION_ACCEPTED: [
    "Beep boop! Emergency mission locked in! Look at you, running faster for 70 percent off biryani than you ever ran in gym class! Your stomach salutes you, human!",
    "Bleep! Samosa rescue protocol initiated! You are out here playing superhero while saving 150 rupees. Outstanding financial move, human!",
    "Beep boop! Mission accepted! Rescuer en route! The dustbin is crying salty tears, but your wallet is cheering! Swaad aagaya!",
    "Attention human! Emergency order placed! Do not get distracted by reels on the way to the counter! Move those legs!"
  ],
  RESCUE_COMPLETED: [
    "Beep boop! Target devoured! Human, calories detected: infinity! Dignity remaining: nominal! But zero food wasted. 21 topon ki salami!",
    "Alert! Food rescue successful! You saved this meal from the bin and gave it a 5-star royal funeral in your belly. Beep boop!",
    "Beep! Mission accomplished! The kitchen balance sheet looks beautiful and your tummy is officially full. Sawa sau rupiya vasool!",
    "Beep boop! Rescue verified! Another batch saved from the kitchen bin! You are officially certified as a hungry legend!"
  ],
  KITCHEN_DISPATCH: [
    "Attention! Chef has deployed a hot emergency tandoor batch! Babumoshai, rokda inbound! Dustbin sent on an indefinite hunger strike! Beep boop!",
    "Beep boop! New surplus alert! Dhabe ka Gabbar has fired the rescue flare. Quick, cash in before closing time!",
    "Alert! Hot food deployed into cyber space! Turn surplus into cash before the midnight gong strikes! Beep!"
  ],
  FEEDBACK_SUBMITTED_PRAISE: [
    "Beep! 5-star praise recorded! Chef's ego has expanded by 500 percent! The entire kitchen staff is currently doing bhangra in station 4!",
    "Beep boop! Rescuer left 5 stars! The head chef has framed this review and hung it above the tandoor! Swaad aagaya!"
  ],
  FEEDBACK_RESOLVED: [
    "Beep boop! Lafda terminated! Kitchen supervisor has upgraded the thermal packaging. Peace restored to the galaxy!",
    "Alert! Rescuer issue resolved! Complaint solved faster than a Maggi noodle! Outstanding kitchen management!"
  ],
  FEEDBACK_DELETED: [
    "Beep! Incident ticket deleted into the digital void! Clean slate achieved, chef. Now go back to making butter naan!"
  ],
  ITEM_RELISTED: [
    "Beep! Relist granted! Extra 15 minutes pumped into the countdown! Second chance given to food! Devour it before it's too late, humans!"
  ],
  KITCHEN_RESET: [
    "Beep boop! Clean sweep activated! Database wiped cleaner than a dish washed with double Vim bar! Zero casualties!"
  ],

  // ERRORS & ALERTS
  SAFETY_NOT_CHECKED: [
    "Error 403! Access denied, human chef! You forgot to check the mandatory food safety clearance boxes! Do you want to send our rescuers to the emergency room? Check the boxes first! Beep boop!",
    "Halt chef! Disclaimer unchecked! Food rescue 911 will not allow suspicious unchecked parcels into the wild! Click all check boxes, human!"
  ],
  FORM_VALIDATION_ERROR: [
    "Error 404! Brain cell not found! Human, fill out all required fields properly. Empty complaints will not feed your appetite! Beep boop!",
    "Alert! Validation failed! You missed a field, human! Even a toaster has better input precision than this. Try again!"
  ],
  FOOD_EXPIRED_TIMEOUT: [
    "Beep boop! Time is up human! You scrolled on your phone for too long and the food emergency expired. The biryani has passed away to the memorial ward. Slow claps for your hesitation!",
    "Wasted! The rescue clock hit 00:00! While you were overthinking, the discount expired. Tragic human hesitation detected!"
  ],
  COMPLAINT_FILED: [
    "Alert! Spicy lafda detected at dispatch counter! Who forgot the extra garlic chutney? Inspector Daya, break open the kitchen door! Beep boop!",
    "Code red! Food complaint logged! Rescuer reported temperature drop. Chef, turn up the bhatti heat immediately!"
  ],
  OUT_OF_STOCK: [
    "Error! Out of stock! The hungry mob was faster than you. Next time stop admiring your reflection and tap faster, human! Beep boop!",
    "Sold out! You snooze, you lose! Someone else already adopted that butter chicken. Better luck next hunger emergency!"
  ],
  CANCELLATION_PANIC: [
    "Mission aborted! Rescuer panicked and fled the food emergency! Weak human reflexes detected. The dustbin is laughing at you! Beep!",
    "Window closed! Human retreated without food! Your stomach will remember this betrayal at 2 AM!"
  ],
  GENERAL_ERROR: [
    "Beep boop! System malfunction! Human error detected at keyboard interface! Please rethink your life choices and try again!"
  ]
};

// Check if roast voice is enabled
export const isRoboRoastEnabled = () => {
  if (typeof window === 'undefined') return true;
  const saved = localStorage.getItem(ROAST_STORAGE_KEY);
  return saved !== null ? saved === 'true' : true;
};

// Set enabled state
export const setRoboRoastEnabled = (enabled) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ROAST_STORAGE_KEY, enabled ? 'true' : 'false');
  window.dispatchEvent(new CustomEvent('robo-roast-toggle', { detail: { enabled } }));
};

// Select the most robotic English voice available
const pickRoboticVoice = () => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // Look for preferred robotic/clear voices
  const preferred = voices.find(v =>
    v.lang.startsWith('en') && (
      v.name.includes('Google UK English Male') ||
      v.name.includes('David') ||
      v.name.includes('George') ||
      v.name.includes('Alex') ||
      v.name.includes('Robot') ||
      v.name.includes('Google US English')
    )
  );

  return preferred || voices.find(v => v.lang.startsWith('en')) || voices[0];
};

/**
 * Speak a robotic roast out loud using window.speechSynthesis
 * @param {string} category - key in ROAST_SCRIPTS (e.g. 'MISSION_ACCEPTED', 'SAFETY_NOT_CHECKED')
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
  const scriptList = ROAST_SCRIPTS[category] || ROAST_SCRIPTS.GENERAL_ERROR;
  const textToSpeak = customText || scriptList[Math.floor(Math.random() * scriptList.length)];

  // Play retro robotic beep sound effect first
  playRoboticBleep(isError);

  // Dispatch visual event for on-screen subtitles / toast
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

  // If user disabled audio roast, skip TTS speech
  if (!isRoboRoastEnabled()) return;

  if (!window.speechSynthesis) {
    console.warn('Web Speech API is not supported in this browser.');
    return;
  }

  try {
    // Cancel any previous speaking to prevent overlapping voices
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    // Robotic voice tuning
    utterance.rate = 1.0; // Steady mechanical cadence
    utterance.pitch = isError ? 0.75 : 0.85; // Low mechanical tone
    utterance.volume = 1.0;

    const voice = pickRoboticVoice();
    if (voice) {
      utterance.voice = voice;
    }

    // Warm-up on some mobile browsers
    utterance.onend = () => {
      // Speech finished
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
    };

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Failed to speak robotic roast:', err);
  }
};

/**
 * Trigger a random test roast for demo purposes
 */
export const testRandomRoast = () => {
  const categories = Object.keys(ROAST_SCRIPTS);
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  speakRoboticRoast(randomCategory);
};
