const categories = [
  {
    no: '01', icon: 'football', en: 'Football', ar: 'كرة القدم',
    descEn: 'Everything the modern footballer needs, for weekend players and dedicated athletes alike.',
    descAr: 'كل ما يحتاجه لاعب كرة القدم العصري، سواء لهواة الملاعب أو الرياضيين المحترفين.',
    items: [
      { en: 'Footballs', ar: 'كرات القدم' }, { en: 'Football Boots', ar: 'أحذية كرة القدم' },
      { en: 'Kits & Jerseys', ar: 'الأطقم والقمصان' }, { en: 'Shin Guards', ar: 'واقيات الساق' },
      { en: 'Goalkeeper Gloves', ar: 'قفازات الحراسة' }, { en: 'Training Accessories', ar: 'مستلزمات التدريب' },
    ],
  },
  {
    no: '02', icon: 'dumbbell', en: 'Gym & Fitness', ar: 'الجيم واللياقة',
    descEn: 'Reliable equipment for home gyms and fitness routines, for every training level.',
    descAr: 'معدات موثوقة للتمارين المنزلية وروتين اللياقة، لكل مستويات التدريب.',
    items: [
      { en: 'Dumbbells & Weights', ar: 'الدمبل والأوزان' }, { en: 'Resistance Bands', ar: 'أحزمة المقاومة' },
      { en: 'Exercise Mats', ar: 'سجادات التمارين' }, { en: 'Gym Gloves', ar: 'قفازات الجيم' },
      { en: 'Jump Ropes', ar: 'حبال القفز' }, { en: 'Activewear', ar: 'ملابس اللياقة' },
    ],
  },
  {
    no: '03', icon: 'swim', en: 'Water Sports & Swimming', ar: 'الرياضات المائية والسباحة',
    descEn: 'Swimwear and pool essentials for every age, including modest swimwear options.',
    descAr: 'ملابس سباحة ومستلزمات مسبح لكل الأعمار، تشمل خيارات الملابس المحتشمة.',
    items: [
      { en: 'Swimming Goggles', ar: 'نظارات السباحة' }, { en: 'Swim Caps', ar: 'أغطية الرأس' },
      { en: 'Swimwear & Modest Swimwear', ar: 'ملابس السباحة والمحتشمة' }, { en: 'Kickboards', ar: 'ألواح التعويم' },
      { en: 'Pool Accessories', ar: 'مستلزمات المسبح' },
    ],
  },
  {
    no: '04', icon: 'martial', en: 'Martial Arts', ar: 'الفنون القتالية',
    descEn: 'Uniforms and protective gear for karate, taekwondo and combat-sport training.',
    descAr: 'بدلات ومعدات حماية لتدريبات الكاراتيه والتايكوندو والرياضات القتالية.',
    items: [
      { en: 'Karate & Taekwondo Uniforms', ar: 'بدلات الكاراتيه والتايكوندو' }, { en: 'Belts', ar: 'الأحزمة' },
      { en: 'Gloves & Protective Gear', ar: 'القفازات ومعدات الحماية' }, { en: 'Head & Shin Guards', ar: 'واقيات الرأس والساق' },
      { en: 'Training Pads & Bags', ar: 'وسائد وأكياس التدريب' },
    ],
  },
  {
    no: '05', icon: 'racket', en: 'Racket Sports', ar: 'الرياضات المضربية',
    descEn: 'Rackets, balls and accessories for tennis, squash, badminton, padel and table tennis.',
    descAr: 'مضارب وكرات وإكسسوارات لرياضات التنس والاسكواش والبادمنتون والبادل وتنس الطاولة.',
    items: [
      { en: 'Tennis & Squash Rackets', ar: 'مضارب التنس والاسكواش' }, { en: 'Badminton & Padel', ar: 'البادمنتون والبادل' },
      { en: 'Table Tennis', ar: 'تنس الطاولة' }, { en: 'Balls & Shuttlecocks', ar: 'الكرات والريش' },
      { en: 'Racket Bags & Grips', ar: 'حقائب ومقابض المضارب' },
    ],
  },
  {
    no: '06', icon: 'basketball', en: 'Team Sports', ar: 'الرياضات الجماعية',
    descEn: 'Balls, jerseys and training gear for basketball, volleyball and handball teams.',
    descAr: 'كرات وأطقم ومعدات تدريب لفرق كرة السلة والطائرة واليد.',
    items: [
      { en: 'Basketball, Volleyball & Handball', ar: 'كرة السلة والطائرة واليد' }, { en: 'Team Jerseys', ar: 'أطقم الفريق' },
      { en: 'Nets & Training Gear', ar: 'الشباك ومعدات التدريب' }, { en: 'Balls', ar: 'الكرات' },
    ],
  },
  {
    no: '07', icon: 'child', en: 'Kids & Family', ar: 'الأطفال والعائلة',
    descEn: 'Sportswear and gear sized for young athletes, built for play and durability.',
    descAr: 'ملابس ومعدات رياضية بمقاسات مناسبة للرياضيين الصغار، مصممة للّعب والمتانة.',
    items: [
      { en: 'Kids Sportswear', ar: 'ملابس رياضية للأطفال' }, { en: 'Mini Equipment', ar: 'معدات مصغّرة' },
      { en: 'Kids Footwear', ar: 'أحذية الأطفال' }, { en: 'Family Bags & Accessories', ar: 'حقائب ومستلزمات عائلية' },
    ],
  },
  {
    no: '08', icon: 'tent', en: 'Camping & Outdoor', ar: 'المخيمات والأنشطة الخارجية',
    descEn: "Gear for weekend getaways and outdoor adventures across the Kingdom's landscapes.",
    descAr: 'معدات لرحلات نهاية الأسبوع والمغامرات الخارجية في مختلف مناطق المملكة.',
    items: [
      { en: 'Tents', ar: 'الخيام' }, { en: 'Sleeping Bags', ar: 'أكياس النوم' },
      { en: 'Backpacks', ar: 'حقائب الظهر' }, { en: 'Outdoor Accessories', ar: 'مستلزمات الأنشطة الخارجية' },
    ],
  },
  {
    no: '09', icon: 'tshirt', en: 'Sportswear', ar: 'الملابس الرياضية',
    descEn: 'Activewear for men, women and kids — including modest sportswear options for every lifestyle.',
    descAr: 'ملابس رياضية للرجال والنساء والأطفال — بما في ذلك خيارات الملابس الرياضية المحتشمة لكل أسلوب حياة.',
    items: [
      { en: "Men's Activewear", ar: 'ملابس رياضية للرجال' }, { en: "Women's Activewear", ar: 'ملابس رياضية للنساء' },
      { en: 'Modest Sportswear', ar: 'الملابس الرياضية المحتشمة' }, { en: "Kids' Activewear", ar: 'ملابس رياضية للأطفال' },
      { en: 'Sports Footwear', ar: 'الأحذية الرياضية' },
    ],
  },
  {
    no: '10', icon: 'bag', en: 'Accessories & Equipment', ar: 'الإكسسوارات والمعدات',
    descEn: "The essentials that complete every athlete's kit — bags, protection, and recognition.",
    descAr: 'الأساسيات التي تكمّل عدة كل رياضي — الحقائب، الحماية، والتكريم.',
    items: [
      { en: 'Sports Bags', ar: 'الحقائب الرياضية' }, { en: 'Gloves', ar: 'القفازات' },
      { en: 'Medical & First-Aid Items', ar: 'المستلزمات الطبية والإسعافات' }, { en: 'Trophies & Awards', ar: 'الكؤوس والجوائز' },
      { en: 'Flags', ar: 'الأعلام' },
    ],
  },
];

module.exports = { categories };
