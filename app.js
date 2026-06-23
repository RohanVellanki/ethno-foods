/* ============================================================
   ETHNO FOODS · S V AGRO FOODS  — front-end app
   Plain vanilla JS. No build step. Open index.html directly.
   ------------------------------------------------------------
   The AI assistant runs in DEMO MODE: it answers from the local
   product catalog + browser speech (free, no API key). To upgrade
   to real Sarvam AI (better Telugu/Hindi voice + smarter answers),
   see README.md → "Going live with Sarvam".
   ============================================================ */

const WA_NUMBER = "919243211033"; // +91 92432 11033
const waLink = (msg) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg || "Hi Ethno Foods! I'd like to know more about your products.")}`;

/* ---------------- PRODUCT CATALOG ---------------- */
const CATEGORIES = [
  { id: "all",     en: "All",            te: "అన్నీ",        hi: "सभी" },
  { id: "oils",    en: "Wood-Pressed Oils", te: "నూనెలు",   hi: "तेल" },
  { id: "millets", en: "Millets & Grains", te: "సిరి ధాన్యాలు", hi: "मिलेट्स" },
  { id: "rice",    en: "Organic Rice",   te: "సేంద్రియ బియ్యం", hi: "ऑर्गेनिक चावल" },
  { id: "flours",  en: "Ravva & Flours", te: "రవ్వ & పిండి", hi: "रवा व आटा" },
  { id: "naturals",en: "Naturals",       te: "సహజమైనవి",     hi: "प्राकृतिक" },
  { id: "pickles", en: "Pickles & Snacks", te: "పచ్చళ్ళు & స్నాక్స్", hi: "अचार व स्नैक्स" },
];

const PRODUCTS = [
  { id:"sunflower-oil", cat:"oils", emoji:"🌻", grad:["#e6a72a","#c98a17"],
    en:"Wood-Pressed Sunflower Oil", te:"పొద్దు తిరుగుడు నూనె", hi:"लकड़ी से निकाला सूरजमुखी तेल",
    den:"Traditionally wood-pressed sunflower oil — cloth-filtered, chemical-free, full of natural aroma.",
    dte:"గానుగ పద్ధతిలో తీసిన స్వచ్ఛమైన పొద్దు తిరుగుడు నూనె — రసాయనాలు లేవు.",
    dhi:"पारंपरिक लकड़ी कोल्हू में निकाला शुद्ध सूरजमुखी तेल — कोई केमिकल नहीं।" },

  { id:"wood-oils", cat:"oils", emoji:"🫒", grad:["#caa53e","#8a6d12"],
    en:"Wood-Pressed Oils (Groundnut · Sesame · Coconut)", te:"గానుగ నూనెలు", hi:"लकड़ी कोल्हू तेल",
    den:"A full range of wood-pressed oils made the slow, traditional way. Ask us for the current oils & sizes.",
    dte:"గానుగ పద్ధతిలో తీసిన వివిధ నూనెలు. అందుబాటులో ఉన్న నూనెల కోసం అడగండి.",
    dhi:"पारंपरिक तरीके से बने विभिन्न लकड़ी कोल्हू तेल। उपलब्ध तेल पूछें।" },

  { id:"millets", cat:"millets", emoji:"🌾", grad:["#8aa84a","#4f6b1f"],
    en:"Native Millets (Siri Dhanyalu)", te:"సిరి ధాన్యాలు", hi:"देसी मिलेट्स",
    den:"Foxtail, finger (ragi), pearl (sajja), little (sama), kodo (arika), barnyard (udalu), browntop & more.",
    dte:"కొర్రలు, రాగులు, సజ్జలు, సామలు, అరికలు, ఊదలు, అండుకొర్రలు — అన్ని రకాల సిరి ధాన్యాలు.",
    dhi:"कंगनी, रागी, बाजरा, सामा, कोदो, सांवा समेत सभी देसी मिलेट्स।" },

  { id:"red-rice", cat:"rice", emoji:"🍚", grad:["#b65a3c","#7d2f1c"],
    en:"Organic Red Rice", te:"ఎర్ర బియ్యం", hi:"लाल चावल",
    den:"Fibre-rich heirloom red rice — loaded with antioxidants and a nutty taste.",
    dte:"పీచు, యాంటీఆక్సిడెంట్లు ఎక్కువగా ఉండే ఎర్ర బియ్యం.",
    dhi:"फाइबर व एंटीऑक्सीडेंट से भरपूर लाल चावल।" },

  { id:"brown-rice", cat:"rice", emoji:"🍚", grad:["#b08947","#6e5320"],
    en:"Organic Brown Rice", te:"బ్రౌన్ రైస్", hi:"ब्राउन राइस",
    den:"Whole-grain brown rice with the bran intact for slow, steady energy.",
    dte:"పొట్టు తీయని పూర్తి ధాన్యం బ్రౌన్ రైస్.",
    dhi:"छिलके सहित साबुत ब्राउन राइस।" },

  { id:"black-rice", cat:"rice", emoji:"🍚", grad:["#4b3a55","#241b2b"],
    en:"Organic Black Rice", te:"నల్ల బియ్యం", hi:"काला चावल",
    den:"Antioxidant-rich black rice — once reserved for royalty, now on your plate.",
    dte:"యాంటీఆక్సిడెంట్లు పుష్కలంగా ఉండే నల్ల బియ్యం.",
    dhi:"एंटीऑक्सीडेंट से भरपूर काला चावल।" },

  { id:"multigrain-ravva", cat:"flours", emoji:"🥣", grad:["#cf8f3a","#8a5a14"],
    en:"Multigrain Ravva", te:"మల్టీగ్రెయిన్ రవ్వ", hi:"मल्टीग्रेन रवा",
    den:"A nutritious blend of millets & grains, ground into fine ravva for upma, idli & more.",
    dte:"ఉప్మా, ఇడ్లీ కోసం వివిధ ధాన్యాలతో తయారు చేసిన మల్టీగ్రెయిన్ రవ్వ.",
    dhi:"उपमा, इडली के लिए कई अनाजों से बना पौष्टिक मल्टीग्रेन रवा।" },

  { id:"chapathi-flour", cat:"flours", emoji:"🫓", grad:["#3e8a5c","#1f5132"],
    en:"Multigrain Chapathi Flour", te:"మల్టీగ్రెయిన్ చపాతి పిండి", hi:"मल्टीग्रेन चपाती आटा",
    den:"Wholesome multigrain flour for soft, fibre-rich chapathis.",
    dte:"మెత్తని, పీచుతో కూడిన చపాతీల కోసం మల్టీగ్రెయిన్ పిండి.",
    dhi:"नरम, फाइबर युक्त चपाती के लिए मल्टीग्रेन आटा।" },

  { id:"idly-ravva", cat:"flours", emoji:"🍥", grad:["#c1572f","#7d2f1c"],
    en:"Sorghum (Jonna) Idly Ravva", te:"జొన్న ఇడ్లీ రవ్వ", hi:"ज्वार इडली रवा",
    den:"Sorghum-based idly ravva for fluffy, gut-friendly idlis.",
    dte:"మెత్తని, ఆరోగ్యకరమైన ఇడ్లీల కోసం జొన్న ఇడ్లీ రవ్వ.",
    dhi:"मुलायम, सेहतमंद इडली के लिए ज्वार इडली रवा।" },

  { id:"honey", cat:"naturals", emoji:"🍯", grad:["#e6a72a","#b5780f"],
    en:"Pure Raw Honey", te:"స్వచ్ఛమైన తేనె", hi:"शुद्ध शहद",
    den:"Unadulterated natural honey — no sugar, no additives, just the real thing.",
    dte:"కల్తీ లేని సహజమైన తేనె — చక్కెర, రసాయనాలు ఏవీ లేవు.",
    dhi:"बिना मिलावट शुद्ध प्राकृतिक शहद।" },

  { id:"tulasi", cat:"naturals", emoji:"🌿", grad:["#4f8a3a","#27521b"],
    en:"Tulasi (Holy Basil) Powder", te:"తులసి పొడి", hi:"तुलसी पाउडर",
    den:"Own-farm tulasi powder — supports immunity, skin, hair and soothes cough.",
    dte:"మా సొంత ఫాం నుండి తులసి పొడి — రోగనిరోధక శక్తి, చర్మం, దగ్గుకు మంచిది.",
    dhi:"अपने फार्म की तुलसी पाउडर — इम्युनिटी, त्वचा व खांसी के लिए।" },

  { id:"moringa", cat:"naturals", emoji:"🍃", grad:["#6aa84f","#356b22"],
    en:"Moringa (Munaga) Powder", te:"మునగ పొడి", hi:"मोरिंगा पाउडर",
    den:"Nutrient-dense moringa leaf powder — the 'miracle tree' superfood.",
    dte:"పోషకాలు పుష్కలంగా ఉండే మునగ ఆకు పొడి — దివ్య ఔషధం.",
    dhi:"पोषक तत्वों से भरपूर मोरिंगा पत्ती पाउडर।" },

  { id:"kumkuma", cat:"naturals", emoji:"🔴", grad:["#c1272f","#7d161c"],
    en:"Pure Kumkuma", te:"స్వచ్ఛమైన కుంకుమ", hi:"शुद्ध कुमकुम",
    den:"Turmeric-based pure kumkuma — no adulteration, no chemicals, gentle on skin.",
    dte:"పసుపు నుండి తయారైన స్వచ్ఛమైన కుంకుమ — కల్తీ, రసాయనాలు లేవు.",
    dhi:"हल्दी से बना शुद्ध कुमकुम — बिना मिलावट, त्वचा के लिए सुरक्षित।" },

  { id:"mango-pickle", cat:"pickles", emoji:"🥭", grad:["#d99a1f","#a85a18"],
    en:"Mango Pickle (Avakaya)", te:"ఆవకాయ పచ్చడి", hi:"आम का अचार",
    den:"Classic Andhra avakaya — made with pure spice powders and wood-pressed oil.",
    dte:"స్వచ్ఛమైన కారంపొడి, గానుగ నూనెతో చేసిన సంప్రదాయ ఆవకాయ.",
    dhi:"शुद्ध मसालों व लकड़ी कोल्हू तेल से बना आंध्रा आम का अचार।" },

  { id:"protein-laddu", cat:"pickles", emoji:"🟤", grad:["#9a6b3f","#5e3c1f"],
    en:"Protein Laddu", te:"ప్రోటీన్ లడ్డు", hi:"प्रोटीन लड्डू",
    den:"A wholesome, protein-rich laddu — the healthy snack to replace chips.",
    dte:"చిప్స్‌కు బదులు ఆరోగ్యకరమైన, ప్రోటీన్ ఎక్కువగా ఉండే లడ్డు.",
    dhi:"चिप्स की जगह सेहतमंद, प्रोटीन से भरपूर लड्डू।" },
];

/* ---------------- UI STRINGS (i18n) ---------------- */
const I18N = {
  en:{
    nav_products:"Products", nav_process:"How It's Made", nav_about:"About", nav_contact:"Contact", nav_order:"Order",
    hero_eyebrow:"FSSAI Licensed · Chemical-Free · Pan-India Delivery",
    hero_title:"Pure, traditional foods<br/>straight from the farm",
    hero_tagline:"\"మీ ఆరోగ్యం.. మీ చేతుల్లోనే\" — your health is in your hands.",
    hero_sub:"Wood-pressed oils, native millets, organic rice, stone-ground pickles, raw honey and farm-fresh herbal powders — no colours, no chemicals, just honest food.",
    hero_shop:"Explore Products", hero_wa:"Order on WhatsApp",
    badge_fssai:"FSSAI Licensed", badge_chem:"100% Chemical-Free", badge_farm:"Own-Farm Sourced", badge_india:"Made with Love in India",
    hero_card_t:"Wood-Pressed. Cloth-Filtered.", hero_card_s:"The traditional 5-step process, unchanged for generations.",
    prod_eyebrow:"Our Range", prod_title:"One stop for natural food products",
    prod_sub:"Tap any product to ask about it, or order directly on WhatsApp. Prices & pack sizes shared on request.",
    proc_eyebrow:"How It's Made", proc_title:"The wood-pressed way",
    proc_sub:"Slow, traditional, and chemical-free — the way oil was always meant to be made.",
    about_eyebrow:"Our Story", about_title:"Honest food from our family farm to yours",
    about_p1:"Ethno Foods (S V Agro Foods) is a Telangana-based natural foods maker on a simple belief — <em>\"ఆరోగ్యం ఎవరికీ ఊరికే రాదు, మీ ఆరోగ్యం మీ చేతుల్లోనే\"</em>. Real health comes from real food.",
    about_p2:"We farm-source our grains and seeds, hand-clean them, and process them the traditional way — wood-pressed oils, stone-ground masalas, and herbal powders from our own farm. No colours, no preservatives, no shortcuts. FSSAI-licensed and delivered across India.",
    about_s1:"Natural products", about_s2:"Outlets in Telangana", about_s3:"Delivery & export",
    contact_eyebrow:"Visit or Call", contact_title:"Find us & order",
    contact_cta_t:"Order on WhatsApp", contact_cta_s:"Message us for prices, pack sizes and delivery anywhere in India.",
    footer_tag:"One stop for natural food products. Pan-India delivery & export.",
    footer_built:"Website & AI assistant by", footer_demo:"Demo build — content & photos to be finalised with the client.",
    bot_name:"Ethno Assistant", bot_status:"Ask me in Telugu, Hindi or English", bot_ph:"Type your message…",
    bot_voice:"Voice replies on", bot_demo:"Demo mode",
    bot_greet:"Namaste! 🙏 I'm the Ethno Foods assistant. Ask me about our wood-pressed oils, millets, rice, pickles, honey or powders — in Telugu, Hindi or English!",
    q_products:"Show products", q_oils:"Wood-pressed oils", q_delivery:"Delivery?", q_contact:"Contact",
  },
  te:{
    nav_products:"ఉత్పత్తులు", nav_process:"తయారీ విధానం", nav_about:"మా గురించి", nav_contact:"సంప్రదించండి", nav_order:"ఆర్డర్",
    hero_eyebrow:"FSSAI లైసెన్స్ · రసాయనాలు లేవు · దేశమంతటా డెలివరీ",
    hero_title:"పొలం నుండి నేరుగా<br/>స్వచ్ఛమైన సంప్రదాయ ఆహారం",
    hero_tagline:"\"మీ ఆరోగ్యం.. మీ చేతుల్లోనే\"",
    hero_sub:"గానుగ నూనెలు, సిరి ధాన్యాలు, సేంద్రియ బియ్యం, పచ్చళ్ళు, స్వచ్ఛమైన తేనె, తులసి-మునగ పొడులు — రంగులు, రసాయనాలు లేకుండా.",
    hero_shop:"ఉత్పత్తులు చూడండి", hero_wa:"WhatsApp లో ఆర్డర్",
    badge_fssai:"FSSAI లైసెన్స్", badge_chem:"100% రసాయనాలు లేవు", badge_farm:"సొంత పొలం", badge_india:"భారత్‌లో ప్రేమతో తయారీ",
    hero_card_t:"గానుగ. వస్త్రంతో వడపోత.", hero_card_s:"తరతరాలుగా మారని సంప్రదాయ 5-దశల విధానం.",
    prod_eyebrow:"మా శ్రేణి", prod_title:"సహజ ఆహార ఉత్పత్తులకు ఒకే చోటు",
    prod_sub:"ఏదైనా ఉత్పత్తిని తాకి అడగండి లేదా నేరుగా WhatsApp లో ఆర్డర్ చేయండి. ధరలు, ప్యాక్ సైజులు అడిగితే చెబుతాం.",
    proc_eyebrow:"తయారీ విధానం", proc_title:"గానుగ పద్ధతి",
    proc_sub:"నెమ్మదిగా, సంప్రదాయంగా, రసాయనాలు లేకుండా — నూనె ఎలా తయారవ్వాలో అలా.",
    about_eyebrow:"మా కథ", about_title:"మా పొలం నుండి మీ ఇంటికి స్వచ్ఛమైన ఆహారం",
    about_p1:"ఎత్నో ఫుడ్స్ (S V Agro Foods) తెలంగాణకు చెందిన సహజ ఆహార సంస్థ — <em>\"ఆరోగ్యం ఎవరికీ ఊరికే రాదు, మీ ఆరోగ్యం మీ చేతుల్లోనే\"</em>.",
    about_p2:"మేము ధాన్యాలను పొలం నుండి తీసుకుని, చేతితో శుభ్రం చేసి, సంప్రదాయ పద్ధతిలో తయారు చేస్తాం — గానుగ నూనెలు, మసాలాలు, సొంత పొలం పొడులు. రంగులు, ప్రిజర్వేటివ్‌లు లేవు. FSSAI లైసెన్స్, దేశమంతటా డెలివరీ.",
    about_s1:"సహజ ఉత్పత్తులు", about_s2:"తెలంగాణలో అవుట్‌లెట్లు", about_s3:"డెలివరీ & ఎగుమతి",
    contact_eyebrow:"రండి లేదా కాల్ చేయండి", contact_title:"మమ్మల్ని కలవండి & ఆర్డర్ చేయండి",
    contact_cta_t:"WhatsApp లో ఆర్డర్", contact_cta_s:"ధరలు, ప్యాక్ సైజులు, డెలివరీ కోసం మాకు మెసేజ్ చేయండి.",
    footer_tag:"సహజ ఆహార ఉత్పత్తులకు ఒకే చోటు. దేశమంతటా డెలివరీ & ఎగుమతి.",
    footer_built:"వెబ్‌సైట్ & AI అసిస్టెంట్:", footer_demo:"డెమో — కంటెంట్ & ఫోటోలు క్లయింట్‌తో ఖరారు చేయాలి.",
    bot_name:"ఎత్నో అసిస్టెంట్", bot_status:"తెలుగు, హిందీ లేదా ఇంగ్లీష్‌లో అడగండి", bot_ph:"మీ సందేశం టైప్ చేయండి…",
    bot_voice:"వాయిస్ ఆన్", bot_demo:"డెమో మోడ్",
    bot_greet:"నమస్తే! 🙏 నేను ఎత్నో ఫుడ్స్ అసిస్టెంట్‌ని. మా గానుగ నూనెలు, సిరి ధాన్యాలు, బియ్యం, పచ్చళ్ళు, తేనె, పొడుల గురించి అడగండి — తెలుగు, హిందీ లేదా ఇంగ్లీష్‌లో!",
    q_products:"ఉత్పత్తులు చూపించు", q_oils:"గానుగ నూనెలు", q_delivery:"డెలివరీ?", q_contact:"సంప్రదించండి",
  },
  hi:{
    nav_products:"उत्पाद", nav_process:"कैसे बनता है", nav_about:"हमारे बारे में", nav_contact:"संपर्क", nav_order:"ऑर्डर",
    hero_eyebrow:"FSSAI लाइसेंस · केमिकल-मुक्त · पूरे भारत में डिलीवरी",
    hero_title:"खेत से सीधे<br/>शुद्ध, पारंपरिक भोजन",
    hero_tagline:"\"आपकी सेहत.. आपके हाथ में\"",
    hero_sub:"लकड़ी कोल्हू तेल, देसी मिलेट्स, ऑर्गेनिक चावल, अचार, शुद्ध शहद और तुलसी-मोरिंगा पाउडर — बिना रंग, बिना केमिकल।",
    hero_shop:"उत्पाद देखें", hero_wa:"WhatsApp पर ऑर्डर",
    badge_fssai:"FSSAI लाइसेंस", badge_chem:"100% केमिकल-मुक्त", badge_farm:"अपना फार्म", badge_india:"भारत में प्यार से बना",
    hero_card_t:"लकड़ी कोल्हू. कपड़े से छाना.", hero_card_s:"पीढ़ियों से अपरिवर्तित पारंपरिक 5-चरण प्रक्रिया।",
    prod_eyebrow:"हमारी रेंज", prod_title:"प्राकृतिक खाद्य उत्पादों के लिए एक ही जगह",
    prod_sub:"किसी भी उत्पाद पर टैप करके पूछें या सीधे WhatsApp पर ऑर्डर करें। कीमत व पैक साइज़ पूछने पर बताते हैं।",
    proc_eyebrow:"कैसे बनता है", proc_title:"लकड़ी कोल्हू का तरीका",
    proc_sub:"धीमा, पारंपरिक और केमिकल-मुक्त — जैसे तेल हमेशा बनना चाहिए।",
    about_eyebrow:"हमारी कहानी", about_title:"हमारे फार्म से आपके घर तक ईमानदार भोजन",
    about_p1:"एथ्नो फूड्स (S V Agro Foods) तेलंगाना का प्राकृतिक खाद्य निर्माता है — <em>\"सेहत मुफ्त नहीं मिलती, आपकी सेहत आपके हाथ में\"</em>।",
    about_p2:"हम अनाज खेत से लेते हैं, हाथ से साफ करते हैं और पारंपरिक तरीके से बनाते हैं — लकड़ी कोल्हू तेल, मसाले और अपने फार्म के पाउडर। कोई रंग या प्रिज़र्वेटिव नहीं। FSSAI लाइसेंस, पूरे भारत में डिलीवरी।",
    about_s1:"प्राकृतिक उत्पाद", about_s2:"तेलंगाना में आउटलेट", about_s3:"डिलीवरी व निर्यात",
    contact_eyebrow:"आएं या कॉल करें", contact_title:"हमें खोजें व ऑर्डर करें",
    contact_cta_t:"WhatsApp पर ऑर्डर", contact_cta_s:"कीमत, पैक साइज़ व डिलीवरी के लिए हमें मैसेज करें।",
    footer_tag:"प्राकृतिक खाद्य उत्पादों के लिए एक ही जगह। पूरे भारत में डिलीवरी व निर्यात।",
    footer_built:"वेबसाइट व AI असिस्टेंट:", footer_demo:"डेमो — कंटेंट व फोटो क्लाइंट के साथ अंतिम होंगे।",
    bot_name:"एथ्नो असिस्टेंट", bot_status:"तेलुगु, हिंदी या अंग्रेज़ी में पूछें", bot_ph:"अपना संदेश लिखें…",
    bot_voice:"वॉइस चालू", bot_demo:"डेमो मोड",
    bot_greet:"नमस्ते! 🙏 मैं एथ्नो फूड्स असिस्टेंट हूँ। हमारे लकड़ी कोल्हू तेल, मिलेट्स, चावल, अचार, शहद या पाउडर के बारे में पूछें — तेलुगु, हिंदी या अंग्रेज़ी में!",
    q_products:"उत्पाद दिखाएं", q_oils:"लकड़ी कोल्हू तेल", q_delivery:"डिलीवरी?", q_contact:"संपर्क",
  },
};

const PROCESS_STEPS = [
  { emoji:"🧑‍🌾", en:"Farm Sourced", te:"పొలం నుండి", hi:"खेत से" },
  { emoji:"🧹", en:"Hand Cleaned", te:"చేతితో శుభ్రం", hi:"हाथ से साफ" },
  { emoji:"🪵", en:"Wood Pressed", te:"గానుగ", hi:"लकड़ी कोल्हू" },
  { emoji:"🧵", en:"Cloth Filtered", te:"వస్త్రంతో వడపోత", hi:"कपड़े से छाना" },
  { emoji:"🍶", en:"Bottled", te:"బాటిల్", hi:"बोतलबंद" },
];

const FEATURES = [
  { emoji:"✋", en:"Easy to Use", te:"వాడటం సులభం", hi:"उपयोग में आसान" },
  { emoji:"🌍", en:"Eco-Friendly", te:"పర్యావరణ హితం", hi:"पर्यावरण हितैषी" },
  { emoji:"🧪", en:"Chemical-Free", te:"రసాయనాలు లేవు", hi:"केमिकल-मुक्त" },
  { emoji:"🦁", en:"Made in India", te:"భారత్‌లో తయారీ", hi:"भारत में निर्मित" },
];

const CONTACTS = [
  { icon:"🏭", en:"Processing Unit", te:"ప్రాసెసింగ్ యూనిట్", hi:"प्रोसेसिंग यूनिट",
    addr:"Adams College Road, New Palvancha" },
  { icon:"🏬", en:"Palvancha Outlet", te:"పాల్వంచ అవుట్‌లెట్", hi:"पाल्वंचा आउटलेट",
    addr:"Near Arun Ice Cream, Ambedkar Center" },
  { icon:"🏬", en:"Kothagudem Outlet", te:"కొత్తగూడెం అవుట్‌లెట్", hi:"कोठागुडेम आउटलेट",
    addr:"Opp. Vidyanagar Gram Panchayat Office" },
];

/* ---------------- STATE ---------------- */
let LANG = "en";
let FILTER = "all";
let speakOn = true;

const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const t = (k) => (I18N[LANG] && I18N[LANG][k]) || I18N.en[k] || k;
const pName = (p) => p[LANG] || p.en;
const pDesc = (p) => p["d"+LANG] || p.den;

/* ---------------- RENDER ---------------- */
function applyI18n(){
  document.documentElement.lang = LANG;
  document.body.dataset.langActive = LANG;
  $$("[data-i18n]").forEach(el=>{ el.innerHTML = t(el.dataset.i18n); });
  $$("[data-i18n-ph]").forEach(el=>{ el.placeholder = t(el.dataset.i18nPh); });
  $("#botText").placeholder = t("bot_ph");
}

function renderTrust(){
  const items=[
    {ic:"🛡️", k:"badge_fssai"},{ic:"🌱", k:"badge_chem"},
    {ic:"🚚", en:"Pan-India Delivery", te:"దేశమంతటా డెలివరీ", hi:"पूरे भारत में डिलीवरी"},
    {ic:"📦", en:"Export Packing", te:"ఎగుమతి ప్యాకింగ్", hi:"निर्यात पैकिंग"},
    {ic:"🌾", en:"Own-Farm Sourced", te:"సొంత పొలం", hi:"अपना फार्म"},
  ];
  $("#trustInner").innerHTML = items.map(i=>{
    const label = i.k ? t(i.k) : (i[LANG]||i.en);
    return `<span class="trust-item">${i.ic} ${label}</span>`;
  }).join("");
}

function renderFilters(){
  $("#filterBar").innerHTML = CATEGORIES.map(c=>
    `<button data-cat="${c.id}" class="${c.id===FILTER?'active':''}">${c[LANG]||c.en}</button>`).join("");
  $$("#filterBar button").forEach(b=>b.onclick=()=>{FILTER=b.dataset.cat;renderFilters();renderProducts();});
}

function renderProducts(){
  const list = PRODUCTS.filter(p=>FILTER==="all"||p.cat===FILTER);
  const catName = (id)=>{const c=CATEGORIES.find(x=>x.id===id);return c?(c[LANG]||c.en):"";};
  $("#productGrid").innerHTML = list.map(p=>`
    <article class="product-card" data-id="${p.id}">
      <div class="pc-media" style="background:linear-gradient(150deg,${p.grad[0]},${p.grad[1]})">
        <span class="pc-tag">${catName(p.cat)}</span>
        <span class="pc-emoji">${p.emoji}</span>
      </div>
      <div class="pc-body">
        <span class="pc-name">${p.en}</span>
        <span class="pc-te">${p.te}</span>
        <span class="pc-desc">${pDesc(p)}</span>
        <div class="pc-actions">
          <button class="btn pc-ask" data-ask="${p.id}">${LANG==='te'?'అడగండి':LANG==='hi'?'पूछें':'Ask'}</button>
          <a class="btn btn-wa" target="_blank" rel="noopener" href="${waLink(`Hi! I'd like to order: ${p.en} (${p.te}). Please share price & pack sizes.`)}">${LANG==='te'?'ఆర్డర్':LANG==='hi'?'ऑर्डर':'Order'}</a>
        </div>
      </div>
    </article>`).join("");

  $$("#productGrid .pc-ask").forEach(b=>b.onclick=(e)=>{
    e.stopPropagation();
    const p=PRODUCTS.find(x=>x.id===b.dataset.ask);
    openBot(); askAboutProduct(p);
  });
  $$("#productGrid .product-card").forEach(c=>c.onclick=()=>{
    const p=PRODUCTS.find(x=>x.id===c.dataset.id);
    openBot(); askAboutProduct(p);
  });
}

function renderProcess(){
  $("#processSteps").innerHTML = PROCESS_STEPS.map((s,i)=>`
    <div class="proc-step">
      <div class="proc-num">${i+1}</div>
      <div class="proc-emoji">${s.emoji}</div>
      <strong>${s[LANG]||s.en}</strong>
    </div>`).join("");
}

function renderFeatures(){
  $("#aboutFeats").innerHTML = FEATURES.map(f=>`
    <div class="feat">
      <div class="feat-icon">${f.emoji}</div>
      <strong>${f[LANG]||f.en}</strong>
      <span>${f.en}</span>
    </div>`).join("");
}

function renderContacts(){
  $("#contactCards").innerHTML = CONTACTS.map(c=>`
    <div class="contact-card">
      <span class="cc-icon">${c.icon}</span>
      <div><strong>${c[LANG]||c.en}</strong><span>${c.addr}</span></div>
    </div>`).join("");
}

function setWaLinks(){
  const link = waLink();
  ["#navWa","#heroWa","#contactWa","#floatWa"].forEach(s=>{const el=$(s);if(el)el.href=link;});
}

/* ---------------- LANGUAGE SWITCH ---------------- */
function setLang(lang){
  LANG=lang;
  $$("#langSwitch button").forEach(b=>b.classList.toggle("active",b.dataset.lang===lang));
  $$("#botLang button").forEach(b=>b.classList.toggle("active",b.dataset.lang===lang));
  applyI18n(); renderTrust(); renderFilters(); renderProducts(); renderProcess(); renderFeatures(); renderContacts();
}

/* ============================================================
   AI ASSISTANT (demo brain) + browser voice
   ============================================================ */
const bot = $("#bot"), botBody = $("#botBody");
let botGreeted=false;

function openBot(){
  bot.classList.add("open"); bot.setAttribute("aria-hidden","false");
  $("#botFab").style.display="none";
  if(!botGreeted){ botGreeted=true; addMsg("bot", t("bot_greet")); renderQuick(); }
}
function closeBot(){
  bot.classList.remove("open"); bot.setAttribute("aria-hidden","true");
  $("#botFab").style.display="grid";
}

function addMsg(who, html, opts={}){
  const d=document.createElement("div");
  d.className="msg "+who;
  d.innerHTML=html;
  botBody.appendChild(d); botBody.scrollTop=botBody.scrollHeight;
  if(who==="bot" && speakOn && opts.speak!==false) speak(stripHtml(html));
  return d;
}
function stripHtml(h){const x=document.createElement("div");x.innerHTML=h;return x.textContent||"";}

function typing(){
  const d=document.createElement("div");
  d.className="msg bot"; d.innerHTML=`<span class="typing"><span></span><span></span><span></span></span>`;
  botBody.appendChild(d); botBody.scrollTop=botBody.scrollHeight; return d;
}

function renderQuick(){
  $("#botQuick").innerHTML = [
    ["products",t("q_products")],["oils",t("q_oils")],["delivery",t("q_delivery")],["contact",t("q_contact")]
  ].map(([k,l])=>`<button data-q="${k}">${l}</button>`).join("");
  $$("#botQuick button").forEach(b=>b.onclick=()=>handleQuick(b.dataset.q));
}

function handleQuick(q){
  if(q==="products"){ addMsg("user",t("q_products")); botRespond("products"); }
  if(q==="oils"){ addMsg("user",t("q_oils")); const p=PRODUCTS.find(x=>x.id==="sunflower-oil"); askAboutProduct(p,true); }
  if(q==="delivery"){ addMsg("user",t("q_delivery")); botRespond("delivery"); }
  if(q==="contact"){ addMsg("user",t("q_contact")); botRespond("contact"); }
}

function askAboutProduct(p, skipUser){
  if(!skipUser) addMsg("user", LANG==='te'?`${p.te} గురించి చెప్పండి`:LANG==='hi'?`${pName(p)} के बारे में बताएं`:`Tell me about ${p.en}`);
  const tp=typing();
  setTimeout(()=>{
    tp.remove();
    const orderTxt = LANG==='te'?'WhatsApp లో ఆర్డర్ చేయండి':LANG==='hi'?'WhatsApp पर ऑर्डर करें':'Order on WhatsApp';
    const priceLine = LANG==='te'?'ధర & ప్యాక్ సైజుల కోసం WhatsApp లో మెసేజ్ చేయండి.'
      :LANG==='hi'?'कीमत व पैक साइज़ के लिए WhatsApp पर मैसेज करें।'
      :'Message us on WhatsApp for price & pack sizes.';
    const html = `<strong>${p.en}</strong> · <span class="te-text">${p.te}</span><br/>${pDesc(p)}<br/>
      <small style="color:var(--muted)">${priceLine}</small>
      <a class="msg-wa" target="_blank" rel="noopener" href="${waLink(`Hi! I'd like: ${p.en} (${p.te}). Price & sizes?`)}">💬 ${orderTxt}</a>`;
    addMsg("bot",html);
  },650);
}

/* very small intent matcher over the catalog */
function findProducts(text){
  const s=text.toLowerCase();
  return PRODUCTS.filter(p=>{
    const hay=[p.en,p.te,p.hi,p.id,p.cat].join(" ").toLowerCase();
    // match on any significant word
    return s.split(/\s+/).some(w=>w.length>2 && hay.includes(w)) ||
           hay.split(/[\s,()·]+/).some(w=>w.length>3 && s.includes(w.toLowerCase()));
  });
}

function botRespond(intent, raw){
  const tp=typing();
  setTimeout(()=>{
    tp.remove();
    if(intent==="products"){
      const names=PRODUCTS.slice(0,8).map(p=>`• ${p.en} (${p.te})`).join("<br/>");
      const more = LANG==='te'?'…ఇంకా చాలా! పైన ఉత్పత్తులు చూడండి లేదా పేరు చెప్పండి.'
        :LANG==='hi'?'…और भी! ऊपर उत्पाद देखें या नाम बताएं।':'…and more! Scroll the products above or name one.';
      addMsg("bot", (LANG==='te'?'మా ముఖ్య ఉత్పత్తులు:<br/>':LANG==='hi'?'हमारे मुख्य उत्पाद:<br/>':'Our main products:<br/>')+names+"<br/>"+more);
    }
    else if(intent==="delivery"){
      addMsg("bot", LANG==='te'?'అవును! మేము దేశమంతటా 🇮🇳 డెలివరీ చేస్తాం. ఎగుమతి ప్యాకింగ్ & కొరియర్ సౌకర్యం కూడా ఉంది. ఛార్జీలు ప్రాంతాన్ని బట్టి ఉంటాయి.'
        :LANG==='hi'?'हाँ! हम पूरे भारत 🇮🇳 में डिलीवरी करते हैं। निर्यात पैकिंग व कूरियर सुविधा भी है। चार्ज क्षेत्र अनुसार।'
        :'Yes! We deliver across India 🇮🇳 with export packing & courier facility. Charges vary by location.');
    }
    else if(intent==="contact"){
      addMsg("bot", `📞 92432 11033 / 94480 28642<br/>🏭 Adams College Road, New Palvancha<br/>🏬 Palvancha & Kothagudem outlets<br/>
        <a class="msg-wa" target="_blank" rel="noopener" href="${waLink()}">💬 ${LANG==='te'?'WhatsApp':LANG==='hi'?'WhatsApp':'Chat on WhatsApp'}</a>`);
    }
    else if(intent==="greet"){
      addMsg("bot", t("bot_greet"));
    }
    else { // fallback / search
      const hits=findProducts(raw||"");
      if(hits.length){
        const p=hits[0];
        askAboutProduct(p,true); return;
      }
      addMsg("bot", LANG==='te'?'క్షమించండి, నాకు అర్థం కాలేదు 🙏 మీరు మా నూనెలు, మిల్లెట్లు, బియ్యం, పచ్చళ్ళు, తేనె లేదా పొడుల గురించి అడగవచ్చు. లేదా WhatsApp లో నేరుగా మెసేజ్ చేయండి.'
        :LANG==='hi'?'क्षमा करें, समझ नहीं आया 🙏 आप हमारे तेल, मिलेट्स, चावल, अचार, शहद या पाउडर के बारे में पूछ सकते हैं। या सीधे WhatsApp पर मैसेज करें।'
        :"Sorry, I didn't quite get that 🙏 You can ask about our oils, millets, rice, pickles, honey or powders — or message us directly on WhatsApp.");
    }
  }, 600);
}

function userSend(text){
  if(!text.trim()) return;
  addMsg("user", text);
  const s=text.toLowerCase();
  if(/\b(hi|hello|hey|namaste|namaskar|నమస్తే|హాయ్|नमस्ते|हाय)\b/.test(s)) return botRespond("greet");
  if(/(deliver|delivery|ship|courier|డెలివరీ|డెలివర్|డిलीవरी|भेज|डिलीवरी|कूरियर)/.test(s)) return botRespond("delivery");
  if(/(contact|phone|call|number|address|where|సంప్రదించు|ఫోన్|నంబర్|చిరునామా|ఎక్కడ|संपर्क|फोन|नंबर|पता|कहां)/.test(s)) return botRespond("contact");
  if(/(product|list|items|show|catalog|ఉత్పత్తులు|లిస్ట్|उत्पाद|सूची|दिखा)/.test(s)) return botRespond("products");
  return botRespond("search", text);
}

/* ---------------- VOICE: browser Web Speech API ---------------- */
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
let recog=null, listening=false;
const langCode = ()=>({en:"en-IN",te:"te-IN",hi:"hi-IN"}[LANG]);

function setupRecog(){
  if(!SR) return null;
  const r=new SR();
  r.lang=langCode(); r.interimResults=false; r.maxAlternatives=1;
  r.onresult=(e)=>{ const txt=e.results[0][0].transcript; $("#botText").value=txt; userSend(txt); };
  r.onend=()=>{ listening=false; $("#botMic").classList.remove("listening"); };
  r.onerror=()=>{ listening=false; $("#botMic").classList.remove("listening"); };
  return r;
}
function toggleMic(){
  if(!SR){ addMsg("bot", LANG==='te'?'మీ బ్రౌజర్‌లో వాయిస్ సపోర్ట్ లేదు. దయచేసి Chrome వాడండి లేదా టైప్ చేయండి.':LANG==='hi'?'आपके ब्राउज़र में वॉइस सपोर्ट नहीं है। कृपया Chrome इस्तेमाल करें या टाइप करें।':"Voice isn't supported in this browser. Please use Chrome, or type instead."); return; }
  if(listening){ recog && recog.stop(); return; }
  recog=setupRecog(); if(!recog) return;
  recog.lang=langCode();
  try{ recog.start(); listening=true; $("#botMic").classList.add("listening"); }catch(e){}
}

function speak(text){
  if(!("speechSynthesis" in window) || !text) return;
  try{
    window.speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(text);
    u.lang=langCode();
    const vs=window.speechSynthesis.getVoices();
    const v=vs.find(v=>v.lang===langCode())||vs.find(v=>v.lang&&v.lang.startsWith(LANG));
    if(v) u.voice=v;
    u.rate=1; u.pitch=1;
    window.speechSynthesis.speak(u);
  }catch(e){}
}
if("speechSynthesis" in window){ window.speechSynthesis.onvoiceschanged=()=>{}; }

/* ---------------- WIRE-UP ---------------- */
function init(){
  // language buttons
  $$("#langSwitch button").forEach(b=>b.onclick=()=>setLang(b.dataset.lang));
  $$("#botLang button").forEach(b=>b.onclick=()=>{ setLang(b.dataset.lang); renderQuick(); });

  // initial render
  setLang("en");
  setWaLinks();

  // nav
  const nav=$("#nav");
  window.addEventListener("scroll",()=>nav.classList.toggle("scrolled",window.scrollY>10));
  $("#navBurger").onclick=()=>$("#navLinks").classList.toggle("open");
  $$("#navLinks a").forEach(a=>a.onclick=()=>$("#navLinks").classList.remove("open"));

  // bot
  $("#botFab").onclick=openBot;
  $("#botClose").onclick=closeBot;
  $("#botForm").onsubmit=(e)=>{ e.preventDefault(); const v=$("#botText").value; $("#botText").value=""; userSend(v); };
  $("#botMic").onclick=toggleMic;
  $("#botSpeakToggle").onclick=function(){
    speakOn=!speakOn; this.classList.toggle("on",speakOn); this.classList.toggle("off",!speakOn);
    this.setAttribute("aria-checked",speakOn);
    if(!speakOn && "speechSynthesis" in window) window.speechSynthesis.cancel();
  };
}
document.addEventListener("DOMContentLoaded", init);
