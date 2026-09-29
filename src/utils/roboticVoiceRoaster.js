// Smooth and Funny Hindi Voice Engine
// Uses the browser's built-in Web Speech API (window.speechSynthesis)
// Authentic, smooth, and hilarious Hindi voice on Results and Errors!

const ROAST_STORAGE_KEY = 'fr911_robo_roast_enabled';

// Play a pleasant, mellow chime before speaking
const playSmoothChime = (isError = false) => {
  try {
    if (typeof window === 'undefined') return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine'; // Mellow, pleasant sine chime
    if (isError) {
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(330, now + 0.18);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    } else {
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

export const HINDI_FUNNY_SCRIPTS = {
  // RESULTS (SUCCESS ACTIONS) - Funny, smooth, and authentic Hindi
  MISSION_ACCEPTED: [
    {
      hindi: "अरे वाह भाई! गरमा-गरम खाना भी बचा लिया और सौ रुपये भी! आज तुम्हारा पेट भी खुश और बटुआ भी!",
      roman: "Arey wah bhai! Garma garam khana bhi bacha liya aur sau rupaye bhi! Aaj tumhara pet bhi khush aur batua bhi!"
    },
    {
      hindi: "शाबाश हीरो! डिस्काउंट के लिए इतनी तेज दौड़े जैसे ओलंपिक का गोल्ड मेडल जीतना हो! जाओ अपना खाना उठाओ!",
      roman: "Shabash hero! Discount ke liye itni tez daude jaise Olympic ka gold medal jeetna ho! Jao apna khana uthao!"
    },
    {
      hindi: "डस्टबिन बेचारा रो रहा है और तुम्हारा पेट खुशी से नाच रहा है! स्वाद आ गया भाई!",
      roman: "Dustbin bechara ro raha hai aur tumhara pet khushi se naach raha hai! Swaad aa gaya bhai!"
    },
    {
      hindi: "ऑर्डर पक्का हो गया! रास्ते में इंस्टाग्राम की रील्स मत देखना, जल्दी जाके खाना ले लो!",
      roman: "Order pakka ho gaya! Raste mein Instagram ki reels mat dekhna, jaldi jaake khana le lo!"
    }
  ],
  RESCUE_COMPLETED: [
    {
      hindi: "मिशन पूरा! स्वादिष्ट खाना पेट के अंदर और बर्बादी खत्म! स्वाद आ गया!",
      roman: "Mission pura! Swadisht khana pet ke andar aur barbadi khatam! Swaad aa gaya!"
    },
    {
      hindi: "पेट भर गया, प्लेट साफ, और पैसे भी बच गए! असली खाना रक्षक तुम ही हो भाई!",
      roman: "Pet bhar gaya, plate saaf, aur paise bhi bach gaye! Asli khana rakshak tum hi ho bhai!"
    },
    {
      hindi: "अरे जियो मेरे लाल! पूरा खाना सुरक्षित तुम्हारे पेट के हवाले! इक्कीस तोपों की सलामी!",
      roman: "Arey jiyo mere laal! Pura khana surakshit tumhare pet ke hawale! Ikkees topon ki salami!"
    },
    {
      hindi: "सवा सौ रुपया वसूल! खाना सीधे तुम्हारे पेट में, कचरे के डिब्बे का आज उपवास है!",
      roman: "Sawa sau rupiya vasool! Khana seedhe tumhare pet mein, kachre ke dibbe ka aaj upvaas hai!"
    }
  ],
  KITCHEN_DISPATCH: [
    {
      hindi: "अरे शेफ साहब ने गरमा-गरम खाना लाइव कर दिया! आज कचरे का डिब्बा भूखा सोएगा!",
      roman: "Arey chef saab ne garma garam khana live kar diya! Aaj kachre ka dibba bhookha soyega!"
    },
    {
      hindi: "तंदूर चालू है भाई! एक्स्ट्रा खाना लाइव हो गया, खाना बचाओ और रोकड़ा बनाओ!",
      roman: "Tandoor chalu hai bhai! Extra khana live ho gaya, khana bachao aur rokda banao!"
    }
  ],
  FEEDBACK_SUBMITTED_PRAISE: [
    {
      hindi: "फाइव स्टार मिल गया! शेफ साहब तो खुशी के मारे किचन में भांगड़ा करने लगे हैं!",
      roman: "Five star mil gaya! Chef saab toh khushi ke maare kitchen mein bhangra karne lage hain!"
    },
    {
      hindi: "तगड़ा रिव्यू दिया भाई! पूरी किचन टीम के चेहरे पर बत्तीसी खिल गई है!",
      roman: "Tagda review diya bhai! Puri kitchen team ke chehre par battisi khil gayi hai!"
    }
  ],
  FEEDBACK_RESOLVED: [
    {
      hindi: "मामला हल हो गया भाई! शेफ ने एकदम गरमा-गरम खाने का पक्का बंदोबस्त कर दिया है!",
      roman: "Mamla hal ho gaya bhai! Chef ne ekdam garam garam khane ka pakka bandobast kar diya hai!"
    }
  ],
  FEEDBACK_DELETED: [
    {
      hindi: "शिकायत खत्म और खाता साफ! किचन में फिर से शांति हो गई!",
      roman: "Shikayat khatam aur khata saaf! Kitchen mein phir se shaanti ho gayi!"
    }
  ],
  ITEM_RELISTED: [
    {
      hindi: "पंद्रह मिनट का बोनस टाइम मिल गया! जल्दी लपको, कहीं कोई और न खा जाए!",
      roman: "Pandrah minute ka bonus time mil gaya! Jaldi lapko, kahin koi aur na khaa jaaye!"
    }
  ],
  KITCHEN_RESET: [
    {
      hindi: "किचन एकदम चकाचक साफ! सब रिसेट हो गया!",
      roman: "Kitchen ekdam chakachak saaf! Sab reset ho gaya!"
    }
  ],

  // ERRORS & ALERTS - Funny & simple Hindi
  SAFETY_NOT_CHECKED: [
    {
      hindi: "अरे रुको शेफ साहब! पहले सेफ्टी के सारे टिक लगाओ, ग्राहकों को अस्पताल नहीं भेजना है!",
      roman: "Arey ruko chef saab! Pehle safety ke saare tick lagao, grahako ko aspatal nahi bhejna hai!"
    },
    {
      hindi: "अरे भाई! बिना सेफ्टी चेकिंग के खाना नहीं भेज सकते! पहले बॉक्स टिक करो!",
      roman: "Arey bhai! Bina safety checking ke khana nahi bhej sakte! Pehle box tick karo!"
    }
  ],
  FORM_VALIDATION_ERROR: [
    {
      hindi: "अरे खाली डिब्बा भेज रहे हो क्या? पहले कुछ लिखो तो सही!",
      roman: "Arey khaali dibba bhej rahe ho kya? Pehle kuch likho toh sahi!"
    },
    {
      hindi: "अरे भाई! खाली फॉर्म से किसका पेट भरेगा? पूरी जानकारी तो लिखो!",
      roman: "Arey bhai! Khaali form se kiska pet bharega? Puri jankari toh likho!"
    }
  ],
  FOOD_EXPIRED_TIMEOUT: [
    {
      hindi: "अरे देर कर दी भाई! स्क्रीन देखते-देखते खाना एक्सपायर हो गया! अगली बार फुर्ती दिखाओ!",
      roman: "Arey der kar di bhai! Screen dekhte dekhte khana expire ho gaya! Agli baar phurti dikhao!"
    },
    {
      hindi: "टाइम खत्म हो गया भाई! बिरयानी तुम्हारा इंतजार करते-करते थक गई!",
      roman: "Time khatam ho gaya bhai! Biryani tumhara intezar karte karte thak gayi!"
    }
  ],
  COMPLAINT_FILED: [
    {
      hindi: "अरे बाप रे! ग्राहक की शिकायत आ गई! लहसुन की चटनी किसने नहीं डाली? दया, दरवाजा तोड़ो!",
      roman: "Arey baap re! Grahak ki shikayat aa gayi! Lahsun ki chutney kisne nahi daali? Daya, darwaza todo!"
    },
    {
      hindi: "अरे शेफ साहब, खाना ठंडा निकला! भट्टी की आंच तेज करो जल्दी!",
      roman: "Arey chef saab, khana thanda nikla! Bhatti ki aanch tez karo jaldi!"
    }
  ],
  OUT_OF_STOCK: [
    {
      hindi: "अरे रे! सारा खाना खत्म हो गया! दूसरे भूखे भाई तुमसे तेज निकले!",
      roman: "Arey re! Saara khana khatam ho gaya! Doosre bhookhe bhai tumse tez nikle!"
    }
  ],
  CANCELLATION_PANIC: [
    {
      hindi: "अरे कैंसिल कर दिया? रात के बारह बजे जब भूख लगेगी तब बहुत याद आएगी!",
      roman: "Arey cancel kar diya? Raat ke baarah baje jab bhookh lagegi tab bahut yaad aayegi!"
    }
  ],
  GENERAL_ERROR: [
    {
      hindi: "अरे कुछ गड़बड़ हो गई भाई! एक बार फिर से कोशिश करो!",
      roman: "Arey kuch gadbad ho gayi bhai! Ek baar phir se koshish karo!"
    }
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

  // 3. Fallback to natural smooth English voice
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
 * Speak in smooth and funny Hindi voice out loud using window.speechSynthesis
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

  // Pick script item
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

    // Natural cadence for Hindi speech
    utterance.rate = 0.98;
    utterance.pitch = isError ? 0.95 : 1.05;
    utterance.volume = 1.0;

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Speech synthesis error:', err);
  }
};

/**
 * Trigger a random test roast for demo purposes
 */
export const testRandomRoast = () => {
  const categories = Object.keys(HINDI_FUNNY_SCRIPTS);
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  speakRoboticRoast(randomCategory);
};
