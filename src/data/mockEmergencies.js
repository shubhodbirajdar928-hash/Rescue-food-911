export const STATUS_LEVELS = {
  STABLE: {
    key: 'STABLE',
    label: 'STABLE',
    color: 'emerald',
    badgeClass: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    indicator: '🟢',
    vibe: 'Abhi waqt hai, garam aur taaza hai jaaneman!',
    doctorNote: 'Vitals nominal. Dil ki dhadkan resting. Still super sexy & delicious.'
  },
  OBSERVATION: {
    key: 'OBSERVATION',
    label: 'OBSERVATION',
    color: 'amber',
    badgeClass: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
    indicator: '🟡',
    vibe: 'Koi toh aao rescue karne, akelapan sata raha hai!',
    doctorNote: 'Thoda thoda thanda pad raha hai. Emergency mouth-to-food resuscitation ki zaroorat hai.'
  },
  URGENT: {
    key: 'URGENT',
    label: 'URGENT',
    color: 'orange',
    badgeClass: 'bg-orange-500/20 text-orange-400 border border-orange-500/40',
    indicator: '🟠',
    vibe: 'Maamla serious ho raha hai hero, jaldi aa!',
    doctorNote: 'Temperature gir raha hai! Ek bhookha dil aur pet turant chahiye!'
  },
  CRITICAL: {
    key: 'CRITICAL',
    label: 'CRITICAL',
    color: 'red',
    badgeClass: 'bg-red-500/20 text-red-400 border border-red-500/50 animate-pulse',
    indicator: '🔴',
    vibe: 'CODE RED: Aashiq thanda hone wala hai, rescue now!',
    doctorNote: 'Arey babu jaldi chalo, varna yeh garma-garam ishq bin mein chala jayega!'
  },
  LAST_CALL: {
    key: 'LAST_CALL',
    label: 'LAST CALL',
    color: 'rose',
    badgeClass: 'bg-rose-500/25 text-rose-300 border border-rose-500/60 animate-pulse',
    indicator: '💀',
    vibe: 'AAKHRI 5 MINUTE! Ab nahi toh kabhi nahi!',
    doctorNote: 'Aakhri saansein chal rahi hain! Counter par daudo meri jaan!'
  },
  EXPIRED: {
    key: 'EXPIRED',
    label: 'EXPIRED',
    color: 'slate',
    badgeClass: 'bg-slate-900/90 text-rose-400 border border-rose-500/40',
    indicator: '⛔',
    vibe: 'RESCUE WINDOW CLOSED',
    doctorNote: 'Rescue window khatam ho gayi. Food safe tha, par kitchen counter band ho chuka hai.'
  }
};

export const getStatusByMinutes = (minutesLeft) => {
  if (minutesLeft <= 0) return STATUS_LEVELS.EXPIRED;
  if (minutesLeft <= 5) return STATUS_LEVELS.LAST_CALL;
  if (minutesLeft <= 15) return STATUS_LEVELS.CRITICAL;
  if (minutesLeft <= 30) return STATUS_LEVELS.URGENT;
  if (minutesLeft <= 45) return STATUS_LEVELS.OBSERVATION;
  return STATUS_LEVELS.STABLE;
};

// Format timestamp into 12-hour AM/PM string
export const formatTimeStr = (timestamp) => {
  const d = new Date(timestamp);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
};

// Comprehensive registry of spicy, funny, flirty Bollywood Hindi triage reports for distinct foods
export const getFilmyTriageReportForFood = (name = '', category = '', emoji = '') => {
  const n = (name || '').toLowerCase();
  const c = (category || '').toLowerCase();

  // 1. Patties / Puff
  if (n.includes('pattice') || n.includes('puff') || c.includes('patties') || emoji === '🥐') {
    return 'Haye re meri 64 crispy layers! Sirf tumhare hot bites ke liye pighal rahi hoon jaaneman! Thoda ketchup lagao, thoda pyaar jatao... aakhir kab tak door se taadte rahoge hero? Jaldi rescue karo varna hum thande pad jayenge! 🥐💋🔥';
  }

  // 2. Vada Pav / Batata Vada
  if (n.includes('vada') || n.includes('wada') || c.includes('vadapav') || emoji === '🥔') {
    return 'Aata maajhi satakli! Itna hot batata vada aur spicy teekhi garlic chutney dekh kar bhi tumhara dil nahi pighla re Majnu? Hero bano aur le chalo mujhe apne saath, varna cold air lag jayegi aur hum tumhare sapnon mein aake satayenge! 🥔🌶️❤️';
  }

  // 3. Biryani / Pulao / Handi
  if (n.includes('biryani') || n.includes('pulao') || n.includes('handi') || c.includes('biryani') || emoji === '🍗' || emoji === '🍚') {
    return 'Babu Moshai... Biryani aur Ishq dono garam hi acche lagte hain! Itni zafrani khushboo, lambe chawal aur aisi nazaakat... aao na hero, kab tak door se dekh ke rulaoge? Bas ek baar apna bana lo, varna yeh royal handi kisi aur ke naseeb mein chali jayegi! 😉🍗🔥';
  }

  // 4. Pav Bhaji / Tawa Bhaji
  if (n.includes('bhaji') || n.includes('pav bhaji') || c.includes('bhaji') || emoji === '🍲') {
    return 'Tawa par itna saara Amul butter pighal gaya... par tumhara patthar dil kab pighlega re Deewane? Masaledaar bhaji aur garam makhan-toasted pav ready hain, bas tumhare honthon ke sahare ka intezaar hai! Ek baar chakh toh lo, jaan de denge! 🍲🧈😘';
  }

  // 5. Kachori / Khasta
  if (n.includes('kachori') || n.includes('khasta') || c.includes('kachorii') || emoji === '🍘') {
    return 'Itni khasta aur kurkuri hoon ki ek nazar mein ghayal kar doon! Meethi sonth aur teekhi pudina chutney se naha ke baithe hain... Aao na shona, aisi crispy romance zindagi mein dobara kahan milegi? 🍘😉💋';
  }

  // 6. Gulab Jamun / Rasgulla / Sweets
  if (n.includes('jamun') || n.includes('rasgulla') || n.includes('sweet') || n.includes('mithai') || c.includes('sweets') || emoji === '🍯') {
    return 'Haye mar jawaan! Desi ghee mein tale huye rasbhare gulaab jamun hain hum... itni meethi chaashni mein doobe hain ki chhoo lo toh pyaar ho jaye! Aaja meri rasmalai, hume apne pet mein panah de do, varna chaashni jam jayegi! 🍯🍮💋';
  }

  // 7. Samosa
  if (n.includes('samosa') || emoji === '🥟' && (n.includes('potato') || n.includes('aalu'))) {
    return 'Jab tak rahega samose mein aalu, tab tak rahenge hum tumhare aashiq babu! Golden crunchy triangle aur spicy aalu filling tadap rahi hai... Aao hero, teekhi green chutney ke saath hamari shaadi kara do! 🥟🌶️💍';
  }

  // 8. Sandwich / Toast
  if (n.includes('sandwich') || n.includes('toast') || c.includes('snacks') || emoji === '🥪') {
    return 'Dekho kitna crazy cheese pull ho raha hai jaaneman! Crispy grilled slices ke beech mein tumhare pyaar ki tapish dhoondh rahe hain... Jaldi khao varna cheese tight ho jayega aur dil toot jayega! 🥪🧀❤️';
  }

  // 9. Dosa / South Indian
  if (n.includes('dosa') || n.includes('idli') || n.includes('uttapam') || emoji === '🥞') {
    return 'Aiyyo Rama! Itna lamba, golden aur paper-thin crispy dosa dekha hai kabhi? Nariyal chutney aur garam sambar baahein phailaye khade hain... Jaldi aao thalaiva, romance thanda nahi hona chahiye! 🥞🥥🔥';
  }

  // 10. Momos / Dim Sum
  if (n.includes('momo') || n.includes('dim sum') || emoji === '🥟') {
    return 'Itne soft, steamed aur juicy momos hain hum... red fiery teekhi chutney ke bina adhoore hain aur tumhare bina anaath! Ek spicy bite lo aur seedha swarg pahunch jao hero! 🥟🌶️💋';
  }

  // 11. Chole Bhature / Naan
  if (n.includes('chole') || n.includes('bhature') || n.includes('kulcha') || emoji === '🫓') {
    return 'Garam phoola hua bhatura aur teekhe masaledaar pind ke chole! Sirka pyaaz aur hari mirch bhi ro rahi hain tumhare intezaar mein... Hero bano aur aake plate saaf kar do jaaneman! 🫓🧅🔥';
  }

  // 12. Paneer Tikka / Tandoori / Kebab
  if (n.includes('paneer') || n.includes('tikka') || n.includes('kebab') || n.includes('tandoor') || emoji === '🍢') {
    return 'Tandoor se nikla hua smokey aroma aur soft malai paneer! Chaat masala chhidak ke tawa pe tadap rahe hain... Aao na hero, aisi sizzling tandoori aashiqui dhoondhe se bhi nahi milegi! 🍢🔥💋';
  }

  // 13. Pizza
  if (n.includes('pizza') || emoji === '🍕') {
    return 'Extra mozzarella aur jalapeño ke saath aashiq ban ke baithe hain! Box thanda hone se pehle adopt kar lo Majnu, varna crispy crust papad ban jayega! 🍕🧀😘';
  }

  // 14. Burger / Fries
  if (n.includes('burger') || emoji === '🍔') {
    return 'Juicy double patty, melting cheese aur crispy lettuce! Hamari soft buns sirf tumhare pakadne ka intezaar kar rahi hain hero... Jaldi rescue karo varna burger flatline ho jayega! 🍔🍟❤️';
  }

  // 15. Jalebi / Rabdi
  if (n.includes('jalebi') || n.includes('rabdi') || emoji === '🥨') {
    return 'Garma-garam desi ghee ki tedhi-medhi kurkuri jalebi hoon main... bilkul tumhare ishq ki tarah uljhi hui! Thoda rabdi ka sahara do aur seedha dil mein utaar lo hero! 🥨🥛💋';
  }

  // 16. Chaat / Pani Puri
  if (n.includes('chaat') || n.includes('puri') || n.includes('bhel') || emoji === '🥣') {
    return 'Teekha teekha paani, meethi saunth chutney aur phooli hui crispy poori! Ek baar muh mein daalo toh dil garden-garden ho jaye... Jaldi rescue karo hero, poori soggy ho jayegi! 🥣💥😋';
  }

  // 17. Roll / Frankie / Wrap
  if (n.includes('roll') || n.includes('frankie') || n.includes('wrap') || emoji === '🌯') {
    return 'Flaky paratha mein lipti hui spicy juicy filling! Bilkul Bollywood heroine ki tarah chunri lapet ke khade hain... Ek bite lo aur humare pyaar mein roll ho jao! 🌯🌶️😘';
  }

  // 18. Noodles / Chinese
  if (n.includes('noodle') || n.includes('chowmein') || n.includes('manchurian') || emoji === '🍜') {
    return 'Desi Chinese ka dhuandhaar tadka aur spicy Schezwan sauce! Ek ek noodle tumhare romance ke sur gaa raha hai... Chopsticks uthao aur toot pado hero! 🍜🥡🔥';
  }

  // 19. Cake / Pastry / Brownie
  if (n.includes('cake') || n.includes('pastry') || n.includes('brownie') || emoji === '🍰') {
    return 'Rich dark chocolate aur velvety cream ka nasha! Tumhare meethe ishq ke bina yeh treat bilkul akeli hai... Aao na meri jaan, melt hone se pehle adopt kar lo! 🍰🍫💋';
  }

  // 20. Default Dynamic Bollywood Filmy generator
  const foodTitle = name.trim() || 'swadisht pakwaan';
  return `Arrey deewane! Yeh lazeez ${foodTitle} sirf tumhare intezaar mein kitchen counter par ahen bhar raha hai! Thoda pyaar dikhao aur turant rescue karo jaaneman, varna yeh garam romance hawa ho jayega! ${emoji || '🍽️'}💋🔥`;
};

// Helper to create a fully timestamp-anchored emergency item
export const buildEmergency = ({
  id,
  code,
  name,
  category,
  emoji,
  restaurant,
  address,
  distance = 0.8,
  originalPrice,
  rescuePrice,
  quantity,
  rescueWindowMinutes = 30,
  pickupWindowMinutes = 15,
  doctorNotes,
  safetyPledge,
  temp = 'Garam (60°C)',
  pulse = '105 BPM (Dil Ki Dhadkan)',
  mapCoords = { x: 50, y: 50 },
  remainingSecondsOffset = null
}) => {
  const now = Date.now();
  let expiresAt;
  let listedAt;

  if (remainingSecondsOffset !== null) {
    expiresAt = now + remainingSecondsOffset * 1000;
    listedAt = expiresAt - rescueWindowMinutes * 60 * 1000;
  } else {
    listedAt = now - 5 * 60 * 1000;
    expiresAt = listedAt + rescueWindowMinutes * 60 * 1000;
  }

  const secondsLeft = Math.max(0, Math.floor((expiresAt - now) / 1000));
  const minutesLeft = Math.ceil(secondsLeft / 60);
  const status = getStatusByMinutes(minutesLeft);

  const finalDoctorNotes = doctorNotes || getFilmyTriageReportForFood(name, category, emoji);

  return {
    id,
    code,
    name,
    category,
    emoji,
    restaurant,
    address,
    distance,
    originalPrice,
    rescuePrice,
    quantity,
    totalQuantity: quantity,
    claimedQuantity: 0,
    listedAt,
    listedTimeStr: formatTimeStr(listedAt),
    rescueDeadlineStr: formatTimeStr(expiresAt),
    rescueWindowMinutes,
    pickupWindowMinutes,
    expiresAt,
    secondsLeft,
    initialMinutes: rescueWindowMinutes,
    condition: status.key,
    doctorNotes: finalDoctorNotes,
    safetyPledge,
    vitalSigns: {
      temp,
      pulse,
      urgency: status.label
    },
    mapCoords
  };
};

export const INITIAL_EMERGENCIES = [
  buildEmergency({
    id: 'food-001',
    code: 'PUFF-420',
    name: 'Miss 64-Layers Shahi Veg Pattice (Ketchup Ki Deewani)',
    category: 'Patties',
    emoji: '🥐',
    restaurant: 'Sharma Ji Ka Diljala Bakery & ICU',
    address: 'Corner Stall 8, University Circle',
    distance: 0.5,
    originalPrice: 200,
    rescuePrice: 79,
    quantity: 10,
    rescueWindowMinutes: 30,
    pickupWindowMinutes: 15,
    remainingSecondsOffset: 29 * 60 + 58,
    doctorNotes: 'Haye re meri 64 crispy layers! Sirf tumhare hot bites ke liye pighal rahi hoon jaaneman! Thoda ketchup lagao, thoda pyaar jatao... aakhir kab tak door se taadte rahoge hero? Jaldi rescue karo varna hum thande pad jayenge! 🥐💋🔥',
    safetyPledge: 'Taaza baked golden crust. 100% edible and crispy surplus before counter closing.',
    temp: 'Garam (62°C)',
    pulse: '98 BPM (Flaky Dhadkan & Ketchup Pyar)',
    mapCoords: { x: 42, y: 55 }
  }),
  buildEmergency({
    id: 'food-002',
    code: 'BATATA-100',
    name: 'ACP Pradyuman Vada Pav (Kuch Toh Gadbad Hai!)',
    category: 'Vadapav',
    emoji: '🥔',
    restaurant: 'CID Emergency Vada Pav Outpost (Platform 1)',
    address: 'Platform 1 Exit, Central Station',
    distance: 0.4,
    originalPrice: 45,
    rescuePrice: 19,
    quantity: 6,
    rescueWindowMinutes: 25,
    pickupWindowMinutes: 15,
    remainingSecondsOffset: 12 * 60 + 43,
    doctorNotes: 'Aata maajhi satakli! Itna hot batata vada aur spicy teekhi garlic chutney dekh kar bhi tumhara dil nahi pighla re Majnu? Hero bano aur le chalo mujhe apne saath, varna cold air lag jayegi aur hum tumhare sapnon mein aake satayenge! 🥔🌶️❤️',
    safetyPledge: 'Freshly fried hot batata vada with fried green chilli and teekhi chutney.',
    temp: 'Garam (64°C)',
    pulse: '142 BPM (Garlic Panic & Daya Tod Do)',
    mapCoords: { x: 38, y: 44 }
  }),
  buildEmergency({
    id: 'food-003',
    code: 'BIRYANI-007',
    name: 'Nawab Majnu Dum Biryani (Zafrani Aansoo)',
    category: 'Biryani',
    emoji: '🍗',
    restaurant: "Nawab Chaman Dum Handi Trauma Center",
    address: 'Plot 12, Royal Plaza Food Court',
    distance: 1.8,
    originalPrice: 280,
    rescuePrice: 99,
    quantity: 5,
    rescueWindowMinutes: 45,
    pickupWindowMinutes: 20,
    remainingSecondsOffset: 25 * 60 + 30,
    doctorNotes: 'Babu Moshai... Biryani aur Ishq dono garam hi acche lagte hain! Itni zafrani khushboo, lambe chawal aur aisi nazaakat... aao na hero, kab tak door se dekh ke rulaoge? Bas ek baar apna bana lo, varna yeh royal handi kisi aur ke naseeb mein chali jayegi! 😉🍗🔥',
    safetyPledge: 'Kept in thermal sealed handi. Steaming hot and aromatic.',
    temp: 'Dhuandhaar (74°C)',
    pulse: '110 BPM (Zafrani Hawa & Royal Dhadkan)',
    mapCoords: { x: 50, y: 80 }
  }),
  buildEmergency({
    id: 'food-004',
    code: 'BHAJI-911',
    name: 'Makhan Tadpa Pav Bhaji (Amul Overdose ICU)',
    category: 'Bhaji',
    emoji: '🍲',
    restaurant: "Sardar Ji Sizzling Tawa Trauma Ward",
    address: 'Street 4, Food Bazaar Plaza',
    distance: 0.9,
    originalPrice: 150,
    rescuePrice: 59,
    quantity: 4,
    rescueWindowMinutes: 30,
    pickupWindowMinutes: 15,
    remainingSecondsOffset: 18 * 60 + 10,
    doctorNotes: 'Tawa par itna saara Amul butter pighal gaya... par tumhara patthar dil kab pighlega re Deewane? Masaledaar bhaji aur garam makhan-toasted pav ready hain, bas tumhare honthon ke sahare ka intezaar hai! Ek baar chakh toh lo, jaan de denge! 🍲🧈😘',
    safetyPledge: 'Simmered on giant tawa, packed with fresh butter, coriander & raw onion.',
    temp: 'Hot & Spicy (70°C)',
    pulse: '138 BPM (Tawa Sizzle & Butter Overflow)',
    mapCoords: { x: 62, y: 32 }
  }),
  buildEmergency({
    id: 'food-005',
    code: 'KACHORI-302',
    name: 'Gabbar Ki Khasta Kachori (Kitne Aloo The?)',
    category: 'Kachorii',
    emoji: '🍘',
    restaurant: 'Haldiram Aashiq Sweets & Cardiac Unit',
    address: 'Shop 2, Clock Tower Market',
    distance: 1.1,
    originalPrice: 55,
    rescuePrice: 22,
    quantity: 8,
    rescueWindowMinutes: 30,
    pickupWindowMinutes: 15,
    remainingSecondsOffset: 4 * 60 + 32,
    doctorNotes: 'Itni khasta aur kurkuri hoon ki ek nazar mein ghayal kar doon! Meethi sonth aur teekhi pudina chutney se naha ke baithe hain... Aao na shona, aisi crispy romance zindagi mein dobara kahan milegi? 🍘😉💋',
    safetyPledge: 'Deep-fried golden khasta crust. Still intensely crisp and fresh.',
    temp: 'Warm (54°C)',
    pulse: '160 BPM (Khasta Shock & Basanti Fear)',
    mapCoords: { x: 35, y: 22 }
  }),
  buildEmergency({
    id: 'food-006',
    code: 'SWEET-143',
    name: 'Rasbhara Romeo Gulab Jamun (Chashni Me Dooba)',
    category: 'Sweets',
    emoji: '🍯',
    restaurant: 'Mithai Mahal Sugar Drip Trauma Center',
    address: '18 Royal Bazaar Road',
    distance: 1.3,
    originalPrice: 120,
    rescuePrice: 45,
    quantity: 5,
    rescueWindowMinutes: 20,
    pickupWindowMinutes: 10,
    remainingSecondsOffset: 2 * 60 + 15,
    doctorNotes: 'Haye mar jawaan! Desi ghee mein tale huye rasbhare gulaab jamun hain hum... itni meethi chaashni mein doobe hain ki chhoo lo toh pyaar ho jaye! Aaja meri rasmalai, hume apne pet mein panah de do, varna chaashni jam jayegi! 🍯🍮💋',
    safetyPledge: 'Fresh mawa batch cooked in pure desi ghee. Warm and soft.',
    temp: 'Meetha & Garam (48°C)',
    pulse: '175 BPM (Syrup Dhadkan & Romantic Arrest)',
    mapCoords: { x: 80, y: 40 }
  })
];

export const INITIAL_EXPIRED_EMERGENCIES = [
  buildEmergency({
    id: 'food-exp-001',
    code: 'FLATLINE-000',
    name: 'Tedhi Medhi Jalebi Bai (Dil Toot Gaya Re!)',
    category: 'Sweets',
    emoji: '🥨',
    restaurant: 'Babumoshai Sweet Bengal ICU & Rabdi Ward',
    address: 'Shop 11, Metro Station Gate 2',
    distance: 1.4,
    originalPrice: 100,
    rescuePrice: 35,
    quantity: 4,
    rescueWindowMinutes: 20,
    pickupWindowMinutes: 10,
    remainingSecondsOffset: 0,
    doctorNotes: 'Arey re re! Garma-garam kurkuri jalebi ka waqt nikal gaya... chaashni thandi ho gayi aur aashiq hero der se pahuche! Ab kitchen log mein aaram kar rahe hain. 😭💔',
    safetyPledge: 'Pure desi ghee jalebi. Rescue window expired at shift change.',
    temp: 'Thandi (25°C)',
    pulse: '0 BPM (Aashiq Flatlined)',
    mapCoords: { x: 70, y: 30 }
  })
];

export const INITIAL_RESERVATIONS = [];
export const INITIAL_RESCUE_HISTORY = [];
