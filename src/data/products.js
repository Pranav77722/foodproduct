const PRODUCTS = [
    {
        id: '1',
        name: { en: 'Besan Ladoo (500g)', mr: 'बेसन लाडू (५०० ग्रॅम)' },
        price: 349,
        originalPrice: 399,
        category: 'sweets',
        image: 'https://images.unsplash.com/photo-1666190049568-ff12aa1e94e7?q=80&w=800&auto=format&fit=crop',
        rating: 4.9,
        isNew: false,
        description: {
            en: 'Traditional Maharashtrian besan ladoos made with roasted gram flour, pure ghee, powdered sugar, and cardamom. Each ladoo is hand-shaped with love.',
            mr: 'भाजलेल्या बेसनापासून शुद्ध तूप, पिठीसाखर आणि वेलची वापरून बनवलेले पारंपरिक महाराष्ट्रीय बेसन लाडू. प्रत्येक लाडू प्रेमाने हाताने वळलेला.',
        },
        ingredients: {
            en: ['Roasted Gram Flour (Besan)', 'Pure Desi Ghee', 'Powdered Sugar', 'Cardamom', 'Cashews', 'Raisins'],
            mr: ['भाजलेला बेसन', 'शुद्ध देशी तूप', 'पिठीसाखर', 'वेलची', 'काजू', 'बेदाणे'],
        },
        reviewCount: 234,
        stock: true,
    },
    {
        id: '2',
        name: { en: 'Ukadiche Modak (12 pcs)', mr: 'उकडीचे मोदक (१२ नग)' },
        price: 449,
        originalPrice: null,
        category: 'sweets',
        image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=800&auto=format&fit=crop',
        rating: 5.0,
        isNew: true,
        description: {
            en: 'Steamed rice flour dumplings filled with fresh coconut and jaggery — Lord Ganesh\'s favorite offering. Made fresh, order today!',
            mr: 'ताज्या खोबऱ्याच्या आणि गुळाच्या सारणाने भरलेले उकडीचे मोदक — गणपती बाप्पाचा आवडता नैवेद्य. ताजे बनवले, आजच ऑर्डर करा!',
        },
        ingredients: {
            en: ['Rice Flour', 'Fresh Coconut', 'Jaggery', 'Cardamom', 'Nutmeg', 'Ghee'],
            mr: ['तांदळाचे पीठ', 'ताजे खोबरे', 'गूळ', 'वेलची', 'जायफळ', 'तूप'],
        },
        reviewCount: 189,
        stock: true,
    },
    {
        id: '3',
        name: { en: 'Chakli (400g)', mr: 'चकली (४०० ग्रॅम)' },
        price: 249,
        originalPrice: null,
        category: 'snacks',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop',
        rating: 4.7,
        isNew: false,
        description: {
            en: 'Crispy spiral-shaped savory snack made with rice flour and aromatic spices. A Diwali essential and everyday teatime favorite.',
            mr: 'तांदळाच्या पिठापासून आणि सुवासिक मसाल्यांपासून बनवलेला कुरकुरीत चकली. दिवाळी फराळाचा अविभाज्य भाग.',
        },
        ingredients: {
            en: ['Rice Flour', 'Gram Flour', 'Sesame Seeds', 'Cumin', 'Red Chili', 'Ajwain', 'Oil'],
            mr: ['तांदळाचे पीठ', 'बेसन', 'तीळ', 'जिरे', 'लाल मिरची', 'ओवा', 'तेल'],
        },
        reviewCount: 156,
        stock: true,
    },
    {
        id: '4',
        name: { en: 'Puran Poli (6 pcs)', mr: 'पुरणपोळी (६ नग)' },
        price: 299,
        originalPrice: 349,
        category: 'sweets',
        image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?q=80&w=800&auto=format&fit=crop',
        rating: 4.8,
        isNew: true,
        description: {
            en: 'Soft flatbread stuffed with sweet chana dal filling, flavored with cardamom and nutmeg. Served best with a dollop of ghee!',
            mr: 'चणा डाळीच्या गोड पुरणाने भरलेली मऊ पोळी, वेलची आणि जायफळाचा स्वाद. तुपाच्या धारेसह सर्वोत्तम!',
        },
        ingredients: {
            en: ['Wheat Flour', 'Chana Dal', 'Jaggery', 'Cardamom', 'Nutmeg', 'Ghee', 'Turmeric'],
            mr: ['कणिक', 'चणा डाळ', 'गूळ', 'वेलची', 'जायफळ', 'तूप', 'हळद'],
        },
        reviewCount: 198,
        stock: true,
    },
    {
        id: '5',
        name: { en: 'Karanji / Gujiya (500g)', mr: 'करंजी (५०० ग्रॅम)' },
        price: 379,
        originalPrice: null,
        category: 'sweets',
        image: 'https://images.unsplash.com/photo-1605197161470-5f3e0e5d3b1c?q=80&w=800&auto=format&fit=crop',
        rating: 4.6,
        isNew: false,
        description: {
            en: 'Crispy deep-fried pastry filled with a sweet coconut, dry fruit, and poppy seed filling. A Diwali classic!',
            mr: 'ताज्या खोबऱ्याच्या, सुकामेव्याच्या आणि खसखशीच्या सारणाने भरलेली कुरकुरीत तळलेली करंजी. दिवाळीचा पारंपरिक फराळ!',
        },
        ingredients: {
            en: ['Refined Flour', 'Desiccated Coconut', 'Sugar', 'Poppy Seeds', 'Dry Fruits', 'Ghee'],
            mr: ['मैदा', 'खोबऱ्याचा कीस', 'साखर', 'खसखस', 'सुकामेवा', 'तूप'],
        },
        reviewCount: 143,
        stock: true,
    },
    {
        id: '6',
        name: { en: 'Maharashtrian Chivda Mix (400g)', mr: 'महाराष्ट्रीय चिवडा मिक्स (४०० ग्रॅम)' },
        price: 199,
        originalPrice: null,
        category: 'snacks',
        image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=800&auto=format&fit=crop',
        rating: 4.8,
        isNew: false,
        description: {
            en: 'A crispy, spicy, and slightly sweet mix of beaten rice flakes, peanuts, curry leaves, and turmeric. Ultimate teatime snack!',
            mr: 'पोहे, शेंगदाणे, कढीपत्ता आणि हळद यांचा कुरकुरीत, तिखट-गोड मिश्रण. चहासोबतचा सर्वोत्तम फराळ!',
        },
        ingredients: {
            en: ['Flattened Rice (Poha)', 'Peanuts', 'Cashews', 'Curry Leaves', 'Turmeric', 'Green Chili', 'Sugar', 'Oil'],
            mr: ['पोहे', 'शेंगदाणे', 'काजू', 'कढीपत्ता', 'हळद', 'हिरवी मिरची', 'साखर', 'तेल'],
        },
        reviewCount: 267,
        stock: true,
    },
    {
        id: '7',
        name: { en: 'Kaju Katli (250g)', mr: 'काजू कतली (२५० ग्रॅम)' },
        price: 499,
        originalPrice: 599,
        category: 'sweets',
        image: 'https://images.unsplash.com/photo-1643020025595-6e9e4bff2a15?q=80&w=800&auto=format&fit=crop',
        rating: 4.9,
        isNew: false,
        description: {
            en: 'Premium diamond-shaped cashew fudge, delicately flavored with cardamom and finished with edible silver foil. A celebration essential.',
            mr: 'उत्कृष्ट हिऱ्याच्या आकाराची काजू कतली, वेलचीची सूक्ष्म चव आणि चांदीच्या वर्खाने सजवलेली. सणासुदीचा अविभाज्य भाग.',
        },
        ingredients: {
            en: ['Cashew Nuts', 'Sugar', 'Cardamom', 'Edible Silver Foil', 'Ghee'],
            mr: ['काजू', 'साखर', 'वेलची', 'चांदीचा वर्ख', 'तूप'],
        },
        reviewCount: 312,
        stock: true,
    },
    {
        id: '8',
        name: { en: 'Shankarpali (400g)', mr: 'शंकरपाळी (४०० ग्रॅम)' },
        price: 229,
        originalPrice: null,
        category: 'snacks',
        image: 'https://images.unsplash.com/photo-1590080876351-941da357cd39?q=80&w=800&auto=format&fit=crop',
        rating: 4.5,
        isNew: false,
        description: {
            en: 'Sweet, crispy diamond-shaped biscuits made with flour, semolina, and a hint of cardamom. Perfect festival snack.',
            mr: 'कणिक, रवा आणि वेलचीपासून बनवलेली गोड, कुरकुरीत शंकरपाळी. सणासाठी उत्तम फराळ.',
        },
        ingredients: {
            en: ['Wheat Flour', 'Semolina', 'Sugar', 'Ghee', 'Cardamom', 'Milk'],
            mr: ['कणिक', 'रवा', 'साखर', 'तूप', 'वेलची', 'दूध'],
        },
        reviewCount: 178,
        stock: true,
    },
    {
        id: '9',
        name: { en: 'Goda Masala (200g)', mr: 'गोडा मसाला (२०० ग्रॅम)' },
        price: 179,
        originalPrice: null,
        category: 'spices',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop',
        rating: 4.9,
        isNew: true,
        description: {
            en: 'Signature Maharashtrian spice blend used in dals, vegetables, and amti. Stone-ground from whole spices for maximum aroma.',
            mr: 'डाळ, भाजी आणि आमटीसाठी वापरला जाणारा महाराष्ट्रीय गोडा मसाला. संपूर्ण मसाल्यांपासून पाट्यावर दळलेला.',
        },
        ingredients: {
            en: ['Coriander Seeds', 'Coconut', 'Sesame', 'Cinnamon', 'Cloves', 'Bay Leaf', 'Stone Flower', 'Dagad Phool'],
            mr: ['धने', 'खोबरे', 'तीळ', 'दालचिनी', 'लवंग', 'तमालपत्र', 'दगडफूल', 'नागकेशर'],
        },
        reviewCount: 289,
        stock: true,
    },
    {
        id: '10',
        name: { en: 'Kokum Sharbat (500ml)', mr: 'कोकम सरबत (५०० मिली)' },
        price: 199,
        originalPrice: null,
        category: 'drinks',
        image: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?q=80&w=800&auto=format&fit=crop',
        rating: 4.7,
        isNew: false,
        description: {
            en: 'Refreshing Konkan-style kokum concentrate. Just mix with cold water for an instant digestive drink. No artificial colors.',
            mr: 'कोकणी पद्धतीचे ताजेतवाने कोकम सरबत. थंड पाण्यात मिसळा आणि ताजेतवाने पेय तयार. कोणतेही कृत्रिम रंग नाहीत.',
        },
        ingredients: {
            en: ['Kokum Extract', 'Jaggery', 'Cumin', 'Rock Salt', 'Water'],
            mr: ['कोकम अर्क', 'गूळ', 'जिरे', 'सैंधव मीठ', 'पाणी'],
        },
        reviewCount: 198,
        stock: true,
    },
    {
        id: '11',
        name: { en: 'Thalipeeth Bhajani (500g)', mr: 'थालीपीठ भजनी (५०० ग्रॅम)' },
        price: 159,
        originalPrice: null,
        category: 'staples',
        image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=800&auto=format&fit=crop',
        rating: 4.6,
        isNew: false,
        description: {
            en: 'Ready-to-use multigrain flour blend for making traditional thalipeeth. Roasted and ground from 8 different grains and lentils.',
            mr: 'पारंपरिक थालीपीठ बनवण्यासाठी तयार बहुधान्य पिठाचे मिश्रण. ८ वेगवेगळ्या धान्यांपासून भाजून दळलेले.',
        },
        ingredients: {
            en: ['Wheat', 'Rice', 'Gram', 'Jowar', 'Bajra', 'Coriander Seeds', 'Cumin', 'Onion Seeds'],
            mr: ['गहू', 'तांदूळ', 'हरभरा', 'ज्वारी', 'बाजरी', 'धने', 'जिरे', 'कांदा बी'],
        },
        reviewCount: 145,
        stock: true,
    },
    {
        id: '12',
        name: { en: 'Amba Barfi (250g)', mr: 'आंबा बर्फी (२५० ग्रॅम)' },
        price: 329,
        originalPrice: null,
        category: 'sweets',
        image: 'https://images.unsplash.com/photo-1571714880718-e0e2ce5d4f29?q=80&w=800&auto=format&fit=crop',
        rating: 4.8,
        isNew: true,
        description: {
            en: 'Rich mango-flavored fudge made with real Alphonso mango pulp, milk solids, and sugar. A seasonal Konkan specialty.',
            mr: 'खऱ्या हापूस आंब्याच्या रसापासून, खवा आणि साखरेपासून बनवलेली आंबा बर्फी. कोकणचा हंगामी विशेष पदार्थ.',
        },
        ingredients: {
            en: ['Alphonso Mango Pulp', 'Milk Solids (Khawa)', 'Sugar', 'Cardamom', 'Ghee', 'Pistachios'],
            mr: ['हापूस आंब्याचा रस', 'खवा', 'साखर', 'वेलची', 'तूप', 'पिस्ता'],
        },
        reviewCount: 167,
        stock: true,
    },
];

/** Get product name / description / ingredients by language */
export const getProductText = (product, field, lang = 'en') => {
    if (!product || !product[field]) return '';
    return typeof product[field] === 'object' ? (product[field][lang] || product[field].en || '') : product[field];
};

export const FEATURED_IDS = ['1', '2', '3', '4'];

export const getFeaturedProducts = () => PRODUCTS.filter(p => FEATURED_IDS.includes(p.id));
export const getProductById = (id) => PRODUCTS.find(p => p.id === id) || PRODUCTS[0];

export default PRODUCTS;
