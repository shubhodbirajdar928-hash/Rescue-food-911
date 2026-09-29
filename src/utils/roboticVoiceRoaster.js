// Full Funny Desi Bollywood Hindi Voice Engine
// Uses the browser's built-in Web Speech API (window.speechSynthesis)
// Full Bollywood comedy: Baburao, Gabbar, CID Daya, Munna Bhai meme humor!

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

    osc.type = 'sine'; // Mellow, smooth chime
    if (isError) {
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.18);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    } else {
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5
      gain.gain.setValueAtTime(0.06, now);
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
  // RESULTS (SUCCESS ACTIONS) - FULL BOLLYWOOD COMEDY
  MISSION_ACCEPTED: [
    {
      hindi: "अरे देवा! उठा ले रे बाबा, मेरे को नहीं, इस गरमा-गरम समोसे को उठा ले! क्या डिस्काउंट मारा है रे बाबा, छा गए!",
      roman: "Arey Deva! Utha le re baba, mere ko nahi, is garma garam samose ko utha le! Kya discount maara hai re baba, chha gaye!"
    },
    {
      hindi: "शाबाश मेरे चीते! सत्तर परसेंट डिस्काउंट देख के इतनी तेज भागे जैसे पीछे मोहल्ले के कुत्ते पड़ गए हों! जाओ लपको खाना!",
      roman: "Shabash mere cheete! Sattar percent discount dekh ke itni tez bhaage jaise peeche mohalle ke kutte pad gaye hon! Jao lapko khana!"
    },
    {
      hindi: "अरे वाह भाई! खाना भी बचा लिया और दो सौ रुपये भी! आज रात घर वाले भी बोलेंगे - हमारा बेटा कुछ काम तो आया!",
      roman: "Arey wah bhai! Khana bhi bacha liya aur do sau rupaye bhi! Aaj raat ghar waale bhi bolenge - hamara beta kuch kaam toh aaya!"
    },
    {
      hindi: "ऑर्डर पक्का हो गया मामू! रास्ते में किसी को ताड़ने मत लग जाना, पहले काउंटर से खाना उठाओ!",
      roman: "Order pakka ho gaya mamu! Raste mein kisi ko taadne mat lag jaana, pehle counter se khana uthao!"
    },
    {
      hindi: "डस्टबिन बेचारा कोने में बैठ के रो रहा है और तुम्हारा पेट खुशी से भांगड़ा कर रहा है! स्वाद आ गया भाई!",
      roman: "Dustbin bechara kone mein baith ke ro raha hai aur tumhara pet khushi se bhangra kar raha hai! Swaad aa gaya bhai!"
    }
  ],
  RESCUE_COMPLETED: [
    {
      hindi: "अरे जियो मेरे लाल! पूरा खाना पेट के अंदर और कचरे का डिब्बा खाली! सवा सौ रुपया पूरा वसूल!",
      roman: "Arey jiyo mere laal! Pura khana pet ke andar aur kachre ka dibba khaali! Sawa sau rupiya pura vasool!"
    },
    {
      hindi: "मिशन सौ परसेंट कामयाब! पेट में इतनी शांति मिल गई जैसे बैंक खाते में अचानक सरकारी पैसा आ गया हो!",
      roman: "Mission sau percent kamyab! Pet mein itni shaanti mil gayi jaise bank khaate mein achanak sarkari paisa aa gaya ho!"
    },
    {
      hindi: "खोपड़ी में एकदम ठंडक पड़ गई रे बाबा! प्लेट भी साफ, इज्जत भी बच गई और बर्बादी भी रुक गई! इक्कीस तोपों की सलामी!",
      roman: "Khopdi mein ekdam thandak pad gayi re baba! Plate bhi saaf, izzat bhi bach gayi aur barbadi bhi ruk gayi! Ikkees topon ki salami!"
    },
    {
      hindi: "वाह उस्ताद! ऐसा खाना खाया कि आत्मा तृप्त हो गई! अब सीधे चार घंटे की कुंभकर्ण वाली नींद मारो!",
      roman: "Wah ustaad! Aisa khana khaya ki aatma tript ho gayi! Ab seedhe chaar ghante ki Kumbhkaran waali neend maaro!"
    }
  ],
  KITCHEN_DISPATCH: [
    {
      hindi: "अरे ओ सांभा! कितने समोसे बचे थे रे? सरदार, पूरे पंद्रह समोसे लाइव कर दिए! आज डस्टबिन भूखा मरेगा!",
      roman: "Arey o Sambha! Kitne samose bache the re? Sardar, poore pandrah samose live kar diye! Aaj dustbin bhookha marega!"
    },
    {
      hindi: "अरे गब्बर खुश हुआ! तंदूर से गरमा-गरम खाना सीधा रडार पे! खाना फेंका नहीं, सीधा रोकड़ा जेब में डाला!",
      roman: "Arey Gabbar khush hua! Tandoor se garma garam khana seedha radar pe! Khana phenka nahi, seedha rokda jeb mein daala!"
    },
    {
      hindi: "सावधानी हटी, बिरयानी बटी! शेफ साहब ने एक क्लिक में खाना मैदान में उतार दिया! टूट पड़ो भूखे शेरों!",
      roman: "Saavdhani hati, biryani bati! Chef saab ne ek click mein khana maidan mein utaar diya! Toot pado bhookhe sheron!"
    }
  ],
  FEEDBACK_SUBMITTED_PRAISE: [
    {
      hindi: "अरे फाइव स्टार मिल गया रे बाबा! शेफ साहब तो बेलन हाथ में लेके किचन में नागिन डांस करने लगे हैं!",
      roman: "Arey five star mil gaya re baba! Chef saab toh belan haath mein leke kitchen mein naagin dance karne lage hain!"
    },
    {
      hindi: "तारीफ ऐसी की है भाई कि शेफ साहब की छप्पन इंच की छाती फूल गई! पूरे ढाबे में लड्डू बंट रहे हैं!",
      roman: "Tareef aisi ki hai bhai ki chef saab ki chhati chaudi ho gayi! Poore dhabe mein laddu bant rahe hain!"
    }
  ],
  FEEDBACK_RESOLVED: [
    {
      hindi: "मामला रफा-दफा हो गया भाई! शेफ ने कान पकड़ के माफी मांग ली और डबल मसाला डाल दिया! अब कोई लफड़ा नहीं!",
      roman: "Mamla rafa dafa ho gaya bhai! Chef ne kaan pakad ke maafi maang li aur double masala daal diya! Ab koi lafda nahi!"
    }
  ],
  FEEDBACK_DELETED: [
    {
      hindi: "सबूत मिटा दिए गए हैं दया! शिकायत का नामो-निशान मिटा दिया! अब किचन में सिर्फ प्यार ही प्यार है!",
      roman: "Saboot mita diye gaye hain Daya! Shikayat ka naamo nishan mita diya! Ab kitchen mein sirf pyar hi pyar hai!"
    }
  ],
  ITEM_RELISTED: [
    {
      hindi: "अरे बाबूराव का स्टाइल देखो! पंद्रह मिनट का लाइफ सपोर्ट और दे दिया! अब तो खा लो रे बाबा!",
      roman: "Arey Baburao ka style dekho! Pandrah minute ka life support aur de diya! Ab toh khaa lo re baba!"
    }
  ],
  KITCHEN_RESET: [
    {
      hindi: "झाड़ू फिर गया रे बाबा! किचन ऐसा साफ हुआ जैसे नया-नया नोट! सब जीरो पे सेट!",
      roman: "Jhadu phir gaya re baba! Kitchen aisa saaf hua jaise naya naya note! Sab zero pe set!"
    }
  ],

  // ERRORS & ALERTS - FULL HILARIOUS DRAMA
  SAFETY_NOT_CHECKED: [
    {
      hindi: "अरे शेफ साहब, दिमाग का स्क्रू ढीला है क्या? बिना सेफ्टी टिक किए खाना भेजोगे तो सीधे यमराज आ जाएंगे! टिक लगाओ पहले!",
      roman: "Arey chef saab, dimag ka screw dheela hai kya? Bina safety tick kiye khana bhejoge toh seedhe Yamraj aa jayenge! Tick lagao pehle!"
    },
    {
      hindi: "अरे रुको रुको! बिना चेकिंग के खाना भेजा तो सीआईडी वाले दरवाजा तोड़ देंगे! पहले छहों बक्से टिक करो!",
      roman: "Arey ruko ruko! Bina checking ke khana bheja toh CID waale darwaza tod denge! Pehle chhahon bakse tick karo!"
    }
  ],
  FORM_VALIDATION_ERROR: [
    {
      hindi: "अरे अक्ल के दुश्मन! खाली फॉर्म भेज के क्या हवा खाएगा? कुछ लिख तो सही रे बाबा!",
      roman: "Arey aql ke dushman! Khaali form bhej ke kya hawa khayega? Kuch likh toh sahi re baba!"
    },
    {
      hindi: "अरे भाई! खाली बक्सा देख के तो कोई भी नाराज हो जाएगा! दो शब्द तो लिखो!",
      roman: "Arey bhai! Khaali baksa dekh ke toh koi bhi naraz ho jayega! Do shabd toh likho!"
    }
  ],
  FOOD_EXPIRED_TIMEOUT: [
    {
      hindi: "अरे कुंभकर्ण! देखते-देखते खाना एक्सपायर हो गया! अब मुंह बाके मक्खी पकड़ो बैठ के!",
      roman: "Arey Kumbhkaran! Dekhte dekhte khana expire ho gaya! Ab baith ke pachtao!"
    },
    {
      hindi: "टाइम खल्लास! बिरयानी बोली - टाटा, बाय बाय, खतम! तुम स्क्रीन ही घूरते रह गए!",
      roman: "Time khallas! Biryani boli - tata, bye bye, khatam! Tum screen hi ghoorte reh gaye!"
    }
  ],
  COMPLAINT_FILED: [
    {
      hindi: "अरे बाप रे बाप! दया, कुछ तो गड़बड़ है! चटनी किसने नहीं डाली? ग्राहक ने भयानक लफड़ा कर दिया है!",
      roman: "Arey baap re baap! Daya, kuch toh gadbad hai! Chutney kisne nahi dali? Grahak ne bhayanak lafda kar diya hai!"
    },
    {
      hindi: "अरे शेफ साहब, खाना ठंडा दे दिया क्या? ग्राहक लाल-पीला हो रहा है! जल्दी गरम करो!",
      roman: "Arey chef saab, khana thanda de diya kya? Grahak laal peela ho raha hai! Jaldi garam karo!"
    }
  ],
  OUT_OF_STOCK: [
    {
      hindi: "अरे ट्रेन छूट गई बाबूमोशाय! कोई दूसरा चील की तरह झपट्टा मार के खाना ले गया! अब पानी पी के सो जाओ!",
      roman: "Arey train chhoot gayi babumoshai! Koi doosra cheel ki tarah jhapatta maar ke khana le gaya! Ab paani pee ke so jao!"
    }
  ],
  CANCELLATION_PANIC: [
    {
      hindi: "अरे कैंसिल कर दिया? पापी पेट का श्राप लगेगा रे बाबा! रात को दो बजे जब चूहे कबड्डी खेलेंगे तब बहुत रोएगा!",
      roman: "Arey cancel kar diya? Paapi pet ka shraap lagega re baba! Raat ko do baje jab chuhe kabaddi khelenge tab bahut royega!"
    }
  ],
  GENERAL_ERROR: [
    {
      hindi: "अरे गड़बड़ हो गई रे देवा! सिस्टम की खोपड़ी घूम गई! एक बार फिर से बटन दबाओ!",
      roman: "Arey gadbad ho gayi re Deva! System ki khopdi ghoom gayi! Ek baar phir se button dabao!"
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
 * Speak in full funny Bollywood Hindi voice out loud using window.speechSynthesis
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

    // Natural expressive cadence for Hindi comedy
    utterance.rate = 1.0;
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
