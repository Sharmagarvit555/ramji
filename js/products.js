/* js/products.js - Gemstone Product Catalog */

window.products = [
  {
    id: 1,
    name: "Royal Blue Sapphire",
    category: "sapphire",
    price: 3500,
    originalPrice: 4200,
    image: "radial-gradient(circle at 30% 30%, #1a6fc4, #0d4a8c, #071e3d)",
    images: [
      "radial-gradient(circle at 30% 30%, #1a6fc4, #0d4a8c, #071e3d)",
      "radial-gradient(circle at 70% 30%, #2980b9, #1a5f8a, #0a2a4a)",
      "radial-gradient(circle at 50% 20%, #3498db, #1a6fc4, #0d4a8c)"
    ],
    description: "A breathtaking Royal Blue Sapphire sourced from the pristine mines of Kashmir. This exceptional stone exhibits the coveted 'cornflower blue' hue with remarkable clarity and brilliance, making it one of the most sought-after gemstones in the world.",
    carat: 2.5,
    cut: "Oval",
    color: "Royal Blue",
    origin: "Kashmir, India",
    certification: "GIA Certified",
    rating: 4.9,
    reviews: [
      { author: "Emma R.", rating: 5, text: "Absolutely stunning! The color is even more vibrant in person. A truly exceptional gem.", date: "2024-01-15" },
      { author: "Michael T.", rating: 5, text: "Bought this for my wife's anniversary ring. She was speechless. Quality is superb.", date: "2024-02-08" },
      { author: "Sophie L.", rating: 4, text: "Beautiful stone with excellent clarity. Very happy with my purchase.", date: "2024-03-01" }
    ],
    inStock: true,
    badge: "Popular"
  },
  {
    id: 2,
    name: "Colombian Emerald",
    category: "emerald",
    price: 5200,
    originalPrice: 6500,
    image: "radial-gradient(circle at 35% 25%, #27ae60, #1e8449, #0d3b22)",
    images: [
      "radial-gradient(circle at 35% 25%, #27ae60, #1e8449, #0d3b22)",
      "radial-gradient(circle at 60% 40%, #2ecc71, #27ae60, #145a32)",
      "radial-gradient(circle at 25% 60%, #58d68d, #1e8449, #0d3b22)"
    ],
    description: "Mined from the legendary Muzo valley in Colombia, this emerald showcases the finest 'vivid green' color with characteristic inclusions known as 'jardin'. An extraordinary specimen for collectors and connoisseurs alike.",
    carat: 1.8,
    cut: "Emerald",
    color: "Vivid Green",
    origin: "Muzo, Colombia",
    certification: "AGL Certified",
    rating: 4.8,
    reviews: [
      { author: "Isabella M.", rating: 5, text: "The green is absolutely magical. Worth every penny for a Colombian of this quality.", date: "2024-01-22" },
      { author: "James K.", rating: 5, text: "Perfect emerald. The color saturation is incredible, truly a museum-quality piece.", date: "2024-02-14" },
      { author: "Natalia V.", rating: 4, text: "Gorgeous stone. The jardin adds character. Couldn't be happier.", date: "2024-03-10" }
    ],
    inStock: true,
    badge: "Rare"
  },
  {
    id: 3,
    name: "Burmese Ruby",
    category: "ruby",
    price: 8750,
    originalPrice: 10500,
    image: "radial-gradient(circle at 30% 30%, #e74c3c, #c0392b, #7b241c)",
    images: [
      "radial-gradient(circle at 30% 30%, #e74c3c, #c0392b, #7b241c)",
      "radial-gradient(circle at 65% 35%, #ff6b6b, #e74c3c, #a93226)",
      "radial-gradient(circle at 40% 60%, #ff5252, #c0392b, #7b241c)"
    ],
    description: "The pinnacle of ruby excellence — a magnificent Burmese Ruby displaying the legendary 'pigeon's blood' red color. Originating from the historic Mogok Valley, this ruby glows with an internal fire that has captivated royalty for centuries.",
    carat: 3.0,
    cut: "Round",
    color: "Pigeon's Blood Red",
    origin: "Mogok, Myanmar",
    certification: "GRS Certified",
    rating: 5.0,
    reviews: [
      { author: "Alexander W.", rating: 5, text: "The finest ruby I have ever seen. The pigeon's blood color is unmistakable.", date: "2024-01-05" },
      { author: "Catherine B.", rating: 5, text: "Extraordinary gem. The fluorescence under UV light is breathtaking.", date: "2024-02-20" },
      { author: "Robert D.", rating: 5, text: "Worth the investment. A true heirloom piece that will be passed down generations.", date: "2024-03-15" }
    ],
    inStock: true,
    badge: "Rare"
  },
  {
    id: 4,
    name: "Round Brilliant Diamond",
    category: "diamond",
    price: 12000,
    originalPrice: 14500,
    image: "radial-gradient(circle at 30% 20%, #f8f9fa, #dee2e6, #6c757d)",
    images: [
      "radial-gradient(circle at 30% 20%, #f8f9fa, #dee2e6, #6c757d)",
      "radial-gradient(circle at 70% 30%, #ffffff, #e9ecef, #adb5bd)",
      "radial-gradient(circle at 50% 60%, #f1f3f5, #ced4da, #495057)"
    ],
    description: "An exceptional Round Brilliant Diamond graded D/Flawless — the highest grades on both the color and clarity scales. This extraordinary diamond exhibits perfect symmetry and optimal light performance, creating the ultimate fire and brilliance.",
    carat: 1.5,
    cut: "Round Brilliant",
    color: "D (Colorless)",
    origin: "Botswana",
    certification: "GIA Certified",
    rating: 4.9,
    reviews: [
      { author: "Victoria S.", rating: 5, text: "Breathtaking. The fire and brilliance are unparalleled. A truly perfect diamond.", date: "2024-01-30" },
      { author: "Thomas H.", rating: 5, text: "Proposed with this diamond and she said yes! Flawless in every sense.", date: "2024-02-14" },
      { author: "Amanda J.", rating: 5, text: "The GIA certification gave me confidence. The stone exceeded all expectations.", date: "2024-03-22" }
    ],
    inStock: true,
    badge: "Popular"
  },
  {
    id: 5,
    name: "Purple Amethyst",
    category: "amethyst",
    price: 450,
    originalPrice: 580,
    image: "radial-gradient(circle at 35% 30%, #9b59b6, #6c3483, #4a235a)",
    images: [
      "radial-gradient(circle at 35% 30%, #9b59b6, #6c3483, #4a235a)",
      "radial-gradient(circle at 65% 40%, #bb8fce, #9b59b6, #5b2c6f)",
      "radial-gradient(circle at 45% 65%, #a569bd, #7d3c98, #4a235a)"
    ],
    description: "A deep, rich Siberian Amethyst with exceptional color saturation and clarity. The intense violet hue with red flashes is characteristic of the finest quality amethysts, making this an ideal centerpiece for luxury jewelry.",
    carat: 5.0,
    cut: "Cushion",
    color: "Deep Purple",
    origin: "Siberia, Russia",
    certification: "IGS Certified",
    rating: 4.7,
    reviews: [
      { author: "Grace F.", rating: 5, text: "The color is absolutely gorgeous. Deep purple with red flashes — just stunning.", date: "2024-01-18" },
      { author: "Daniel M.", rating: 4, text: "Great value for the quality. The cushion cut shows off the color beautifully.", date: "2024-02-25" },
      { author: "Lily P.", rating: 5, text: "Perfect amethyst for my ring project. The clarity is exceptional.", date: "2024-03-08" }
    ],
    inStock: true,
    badge: "New"
  },
  {
    id: 6,
    name: "Australian Black Opal",
    category: "opal",
    price: 6800,
    originalPrice: 8200,
    image: "radial-gradient(circle at 40% 35%, #2c3e50, #1a252f, #0d1b2a), radial-gradient(circle at 60% 60%, rgba(231,76,60,0.4), transparent)",
    images: [
      "radial-gradient(circle at 40% 35%, #1a1a2e, #16213e, #0f3460)",
      "radial-gradient(circle at 60% 40%, #2c3e50, #1a252f, #16213e)",
      "radial-gradient(circle at 35% 65%, #1a1a2e, #0f3460, #16213e)"
    ],
    description: "The world's most prized opal — an Australian Black Opal from Lightning Ridge displaying a full spectral play-of-color on a dark body tone. The brilliant red and green fire dancing across the stone is nothing short of miraculous.",
    carat: 4.2,
    cut: "Cabochon",
    color: "Black with Multi-color Play",
    origin: "Lightning Ridge, Australia",
    certification: "GAAL Certified",
    rating: 4.8,
    reviews: [
      { author: "Olivia N.", rating: 5, text: "The play of color is mesmerizing. Every angle reveals a new explosion of color.", date: "2024-01-12" },
      { author: "Noah C.", rating: 5, text: "Never seen anything like this in person. The rolling fire is absolutely magical.", date: "2024-02-09" },
      { author: "Harper G.", rating: 4, text: "Stunning opal. The body tone is very dark with incredible spectral colors.", date: "2024-03-20" }
    ],
    inStock: true,
    badge: "Rare"
  },
  {
    id: 7,
    name: "Swiss Blue Topaz",
    category: "topaz",
    price: 380,
    originalPrice: 480,
    image: "radial-gradient(circle at 30% 25%, #2980b9, #1a5f8a, #0d3151)",
    images: [
      "radial-gradient(circle at 30% 25%, #2980b9, #1a5f8a, #0d3151)",
      "radial-gradient(circle at 65% 35%, #3498db, #2980b9, #1a5276)",
      "radial-gradient(circle at 45% 70%, #5dade2, #2471a3, #1a5276)"
    ],
    description: "A vibrant Swiss Blue Topaz with an intensely saturated electric blue color and exceptional clarity. This brilliant-cut stone maximizes the stone's natural brilliance and scintillation, perfect for eye-catching jewelry.",
    carat: 3.5,
    cut: "Pear",
    color: "Electric Blue",
    origin: "Brazil",
    certification: "IGI Certified",
    rating: 4.6,
    reviews: [
      { author: "Lucas A.", rating: 5, text: "The blue is so vivid and electric! Exactly what I was looking for.", date: "2024-01-28" },
      { author: "Mia B.", rating: 4, text: "Beautiful clarity and fantastic price for a stone this size.", date: "2024-02-18" },
      { author: "Ethan W.", rating: 5, text: "Perfect swiss blue color. The brilliance in the pear cut is outstanding.", date: "2024-03-05" }
    ],
    inStock: true,
    badge: null
  },
  {
    id: 8,
    name: "Pink Tourmaline",
    category: "tourmaline",
    price: 1200,
    originalPrice: 1500,
    image: "radial-gradient(circle at 35% 30%, #ff69b4, #c2185b, #880e4f)",
    images: [
      "radial-gradient(circle at 35% 30%, #ff69b4, #c2185b, #880e4f)",
      "radial-gradient(circle at 65% 40%, #ff8fab, #e91e8c, #ad1457)",
      "radial-gradient(circle at 45% 65%, #f48fb1, #c2185b, #6a0f3f)"
    ],
    description: "A luscious Pink Tourmaline (Rubellite) from the finest mines of Brazil, exhibiting a pure hot pink color with excellent transparency. This exceptional stone has a rare purity of color without secondary hues.",
    carat: 2.8,
    cut: "Princess",
    color: "Hot Pink",
    origin: "Minas Gerais, Brazil",
    certification: "SSEF Certified",
    rating: 4.7,
    reviews: [
      { author: "Ava C.", rating: 5, text: "The pink color is absolutely stunning — pure and vibrant. Perfect rubellite!", date: "2024-01-20" },
      { author: "Charlotte H.", rating: 5, text: "My favorite gemstone! This tourmaline has an incredible depth of color.", date: "2024-02-28" },
      { author: "Zoe M.", rating: 4, text: "Beautiful stone with excellent clarity. The princess cut suits it perfectly.", date: "2024-03-12" }
    ],
    inStock: true,
    badge: "New"
  },
  {
    id: 9,
    name: "Ceylon Yellow Sapphire",
    category: "sapphire",
    price: 2800,
    originalPrice: 3400,
    image: "radial-gradient(circle at 30% 25%, #f39c12, #e67e22, #d35400)",
    images: [
      "radial-gradient(circle at 30% 25%, #f39c12, #e67e22, #d35400)",
      "radial-gradient(circle at 65% 35%, #f7dc6f, #f39c12, #e67e22)",
      "radial-gradient(circle at 45% 70%, #fad7a0, #f0b27a, #d35400)"
    ],
    description: "A golden Ceylon Yellow Sapphire of the finest quality, displaying a pure canary yellow color with exceptional brilliance. Sapphires from Sri Lanka are renowned for their outstanding clarity and bright, lively color.",
    carat: 2.0,
    cut: "Cushion",
    color: "Canary Yellow",
    origin: "Ratnapura, Sri Lanka",
    certification: "GIA Certified",
    rating: 4.8,
    reviews: [
      { author: "Sophia K.", rating: 5, text: "Stunning yellow sapphire! The canary color is pure and incredibly vibrant.", date: "2024-01-16" },
      { author: "William P.", rating: 4, text: "Excellent quality Ceylon sapphire. The clarity is remarkable for this price.", date: "2024-02-22" },
      { author: "Emily T.", rating: 5, text: "Set this in a gold ring — absolutely breathtaking combination.", date: "2024-03-18" }
    ],
    inStock: true,
    badge: null
  },
  {
    id: 10,
    name: "Zambian Emerald",
    category: "emerald",
    price: 3900,
    originalPrice: 4800,
    image: "radial-gradient(circle at 40% 30%, #1abc9c, #148f77, #0e6655)",
    images: [
      "radial-gradient(circle at 40% 30%, #1abc9c, #148f77, #0e6655)",
      "radial-gradient(circle at 60% 45%, #48c9b0, #1abc9c, #117a65)",
      "radial-gradient(circle at 35% 70%, #45b39d, #138d75, #0e6655)"
    ],
    description: "A superb Zambian Emerald known for its characteristic bluish-green color with exceptional clarity. Zambian emeralds are prized for their deeper, richer tone and higher clarity compared to their Colombian counterparts.",
    carat: 1.5,
    cut: "Octagon",
    color: "Bluish Green",
    origin: "Kafubu, Zambia",
    certification: "Gübelin Certified",
    rating: 4.7,
    reviews: [
      { author: "Henry L.", rating: 5, text: "The bluish-green is incredible. Zambian emeralds have such a unique character.", date: "2024-01-24" },
      { author: "Claire B.", rating: 4, text: "Outstanding clarity for an emerald. The color saturation is magnificent.", date: "2024-02-16" },
      { author: "Arthur N.", rating: 5, text: "A collector's piece. The Gübelin certification confirms its exceptional quality.", date: "2024-03-25" }
    ],
    inStock: true,
    badge: null
  },
  {
    id: 11,
    name: "Star Ruby",
    category: "ruby",
    price: 4500,
    originalPrice: 5500,
    image: "radial-gradient(circle at 40% 35%, #c0392b, #922b21, #641e16)",
    images: [
      "radial-gradient(circle at 40% 35%, #c0392b, #922b21, #641e16)",
      "radial-gradient(circle at 60% 45%, #e74c3c, #c0392b, #7b241c)",
      "radial-gradient(circle at 35% 65%, #a93226, #922b21, #5b0e0e)"
    ],
    description: "A magnificent Star Ruby displaying a perfect six-rayed asterism star floating serenely on its surface. This phenomenon, caused by rutile needles aligned in the corundum crystal, creates a mystical visual effect unlike any other gemstone.",
    carat: 3.5,
    cut: "Cabochon",
    color: "Deep Red",
    origin: "Mogok, Myanmar",
    certification: "GRS Certified",
    rating: 4.9,
    reviews: [
      { author: "Eleanor F.", rating: 5, text: "The star effect is absolutely phenomenal. A truly magical and unique gem.", date: "2024-01-08" },
      { author: "George S.", rating: 5, text: "Perfect star with all six rays. The deep red color is extraordinary.", date: "2024-02-05" },
      { author: "Louise M.", rating: 5, text: "One of the finest star rubies I've encountered. The asterism is crisp and centered.", date: "2024-03-28" }
    ],
    inStock: true,
    badge: "Rare"
  },
  {
    id: 12,
    name: "Paraiba Tourmaline",
    category: "tourmaline",
    price: 15000,
    originalPrice: 18000,
    image: "radial-gradient(circle at 35% 25%, #00e5ff, #00acc1, #006064)",
    images: [
      "radial-gradient(circle at 35% 25%, #00e5ff, #00acc1, #006064)",
      "radial-gradient(circle at 65% 40%, #40c4ff, #0288d1, #01579b)",
      "radial-gradient(circle at 45% 70%, #00b0ff, #0097a7, #006064)"
    ],
    description: "The rarest and most coveted tourmaline in existence — a genuine Paraiba Tourmaline from the original deposit in Paraíba, Brazil. Its extraordinary neon blue-green color, caused by copper and manganese, glows with an otherworldly electric luminescence.",
    carat: 1.2,
    cut: "Oval",
    color: "Neon Blue-Green",
    origin: "Paraíba, Brazil",
    certification: "GIA Certified",
    rating: 5.0,
    reviews: [
      { author: "Frederick A.", rating: 5, text: "Absolutely electrifying color. There is nothing else like a Paraiba tourmaline.", date: "2024-01-03" },
      { author: "Beatrice H.", rating: 5, text: "This is the crown jewel of my collection. The neon glow is supernatural.", date: "2024-02-12" },
      { author: "Sebastian R.", rating: 5, text: "Worth every penny. The copper-induced color is simply unrivaled in the gem world.", date: "2024-03-30" }
    ],
    inStock: true,
    badge: "Rare"
  }
];
