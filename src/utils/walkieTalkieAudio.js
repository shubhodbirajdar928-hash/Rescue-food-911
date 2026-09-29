// Walkie-Talkie Audio Engine 📻⚡
// Authentic Police Radio Squelch Static Burst, Roger Beeps & Dispatcher Voice

// Generate authentic walkie-talkie radio squelch static
export const playRadioStatic = (duration = 0.18) => {
  try {
    if (typeof window === 'undefined') return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    // Create white noise buffer
    const bufferSize = ctx.sampleRate * duration;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    // Filter to simulate narrow police radio frequency (bandpass 800Hz - 3200Hz)
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.value = 1800;
    bandpass.Q.value = 1.2;

    const gainNode = ctx.createGain();
    const now = ctx.currentTime;
    gainNode.gain.setValueAtTime(0.09, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

    whiteNoise.connect(bandpass);
    bandpass.connect(gainNode);
    gainNode.connect(ctx.destination);

    whiteNoise.start(now);
  } catch {
    // Ignore audio context errors
  }
};

// Play classic police roger beep ("Bleep!")
export const playRogerBeep = () => {
  try {
    if (typeof window === 'undefined') return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1650, now); // Classic high roger beep pitch
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  } catch {
    // Ignore
  }
};

// Play mechanical channel knob click
export const playChannelClick = () => {
  try {
    if (typeof window === 'undefined') return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(420, now);
    gain.gain.setValueAtTime(0.07, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.04);
  } catch {
    // Ignore
  }
};

// Dispatch channels with authentic Bollywood mock police chatter
export const RADIO_CHANNELS = [
  {
    id: 1,
    channel: 'CH 1',
    freq: '91.1 MHz',
    title: '🚨 DILJALA ICU (Biryani Sector)',
    tag: 'CRITICAL RESCUE',
    color: '#ef4444',
    transmissions: [
      {
        speaker: 'Control Room 911',
        text: 'Control Room to All Rescuers! 10 plates of Dum Biryani in critical condition at Station 4! Immediate extraction required! Over!',
        hindi: 'कंट्रोल रूम टू ऑल रेस्क्यूअर्स! 10 प्लेट बिरयानी खतरे में है! तुरंत निकालो, ओवर!'
      },
      {
        speaker: 'Patrol Unit 07',
        text: 'Unit 07 to HQ! Biryani aroma detected at 500 meters! Moving fast before shop closes! Over!',
        hindi: 'यूनिट 07! बिरयानी की खुशबू आ रही है, दुकान बंद होने से पहले पहुंच रहे हैं! ओवर!'
      }
    ]
  },
  {
    id: 2,
    channel: 'CH 2',
    freq: '94.7 MHz',
    title: '🕵️ CID DISPATCH (ACP & Daya)',
    tag: 'INVESTIGATION',
    color: '#3b82f6',
    transmissions: [
      {
        speaker: 'ACP Pradyuman',
        text: 'Daya! Kitchen ka darwaza todo! Biryani aur Raita dustbin mein nahi jaana chahiye, samjhe? Over!',
        hindi: 'दया! किचन का दरवाजा तोड़ो! बिरयानी डस्टबिन में नहीं जानी चाहिए! ओवर!'
      },
      {
        speaker: 'Inspector Daya',
        text: 'Darwaza tod diya sir! 60% discount pe saara taaza khana rescue kar liya hai! Over!',
        hindi: 'दरवाजा तोड़ दिया सर! 60% डिस्काउंट पे सारा खाना बचा लिया! ओवर!'
      }
    ]
  },
  {
    id: 3,
    channel: 'CH 3',
    freq: '98.3 MHz',
    title: '🍔 VADA PAV RAPID SQUAD',
    tag: 'STREET PATROL',
    color: '#eab308',
    transmissions: [
      {
        speaker: 'Vada Pav Chief',
        text: 'Patrol Car 911! Garma-garam Vada Pav with teekha lasoon chutney spotted! Rescuers advance immediately, over!',
        hindi: 'पेट्रोल कार 911! गरमा-गरम वड़ा पाव तीखी चटनी के साथ तैयार है! तुरंत लपटो, ओवर!'
      },
      {
        speaker: 'Street Patrol',
        text: 'Station 2 reporting! Only 15 minutes left on Samosas! Grab the parcel, save the crunch! Over!',
        hindi: 'स्टेशन 2! समोसे के 15 मिनट बचे हैं! पार्सल उठाओ, ओवर!'
      }
    ]
  },
  {
    id: 4,
    channel: 'CH 4',
    freq: '102.5 MHz',
    title: '🕶️ MUNNA & CIRCUIT PATROL',
    tag: 'BHAI DISPATCH',
    color: '#a855f7',
    transmissions: [
      {
        speaker: 'Munna Bhai',
        text: 'Aye Circuit! Tension nahi lene ka! Apun ka 911 app hai na! Khana mast hai, pet bhar ke khaane ka, over!',
        hindi: 'ऐ सर्किट! टेंशन नहीं लेने का! 911 ऐप है ना, पेट भर के खाने का! ओवर!'
      },
      {
        speaker: 'Circuit',
        text: 'Bhai bola toh bolne ka! Saara taaza surplus khana rescue ho rela hai bhai! Over and out!',
        hindi: 'भाई बोला तो बोलने का! सारा ताजा खाना बचा लिया भाई! ओवर!'
      }
    ]
  },
  {
    id: 5,
    channel: 'CH 5',
    freq: '106.9 MHz',
    title: '👓 BABURAO HQ (Hera Pheri)',
    tag: 'COMEDY SPECIAL',
    color: '#10b981',
    transmissions: [
      {
        speaker: 'Baburao Apte',
        text: 'Aye Control Room! Ye Baburao ka area hai re baba! 50% discount chal raha hai, jaldi loot machao! Over!',
        hindi: 'ऐ कंट्रोल रूम! ये बाबूराव का इलाका है! 50% छूट है, जल्दी लूटो! ओवर!'
      },
      {
        speaker: 'Baburao Apte',
        text: 'Utha le re baba, dustbin se pehle Biryani ko utha le! Khopdi tod dunga agar khana phenka toh! Over!',
        hindi: 'उठा ले रे बाबा, डस्टबिन से पहले बिरयानी उठा ले! ओवर!'
      }
    ]
  },
  {
    id: 6,
    channel: 'CH 6',
    freq: '108.0 MHz',
    title: '⚡ SPEED RESCUE AIRWAVES',
    tag: 'LIVE RADAR',
    color: '#ec4899',
    transmissions: [
      {
        speaker: 'Radar Control',
        text: 'Radar sweep complete! 4 Butter Naans and Paneer Butter Masala ready for instant pickup! Over!',
        hindi: 'राडार स्वीप पूरा! 4 बटर नान और पनीर तुरंत पिकअप के लिए तैयार! ओवर!'
      },
      {
        speaker: 'HQ Dispatch',
        text: 'Zero waste milestone! Rescuers saved 15 Kilograms of food tonight! Great work heroes, over!',
        hindi: 'जीरो वेस्ट अलर्ट! आज 15 किलो खाना बचाया गया! शाबाश हीरो, ओवर!'
      }
    ]
  }
];

// Speak radio transmission with authentic squelch opening and roger beep closing
export const speakRadioTransmission = (transmission, onStart, onEnd) => {
  if (typeof window === 'undefined') return;

  // 1. Play opening radio squelch static burst
  playRadioStatic(0.2);

  // 2. Schedule speech after squelch burst
  setTimeout(() => {
    if (!window.speechSynthesis) {
      if (onEnd) onEnd();
      return;
    }

    try {
      window.speechSynthesis.cancel();

      // Find best voice
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v =>
        v.lang.startsWith('hi') ||
        v.lang.includes('IN') ||
        (v.name || '').toLowerCase().includes('hindi') ||
        (v.name || '').toLowerCase().includes('ravi') ||
        (v.name || '').toLowerCase().includes('hemant')
      ) || voices.find(v => (v.name || '').toLowerCase().includes('david')) || voices[0];

      const isHindiVoice = voice && (voice.lang.startsWith('hi') || (voice.name || '').toLowerCase().includes('hindi'));
      const textToSay = isHindiVoice ? transmission.hindi : transmission.text;

      const utterance = new SpeechSynthesisUtterance(textToSay);
      if (voice) {
        utterance.voice = voice;
        utterance.lang = isHindiVoice ? 'hi-IN' : (voice.lang || 'en-IN');
      }

      // Authentic police radio delivery: steady, clear, slightly compressed
      utterance.rate = 1.02;
      utterance.pitch = 0.96;
      utterance.volume = 1.0;

      utterance.onstart = () => {
        if (onStart) onStart();
      };

      utterance.onend = () => {
        // 3. Play closing squelch and roger beep!
        playRadioStatic(0.12);
        setTimeout(playRogerBeep, 130);
        if (onEnd) onEnd();
      };

      utterance.onerror = () => {
        playRogerBeep();
        if (onEnd) onEnd();
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      playRogerBeep();
      if (onEnd) onEnd();
    }
  }, 220);
};
