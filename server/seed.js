/**
 * Seed script — populates MongoDB with sample projects, films, and testimonials
 * Run: node seed.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');
const Testimonial = require('./models/Testimonial');

const img = (url) => ({ url, publicId: 'seed/' + Math.random().toString(36).slice(2, 10) });

const projects = [
  {
    title: 'The Royal Wedding',
    category: 'Weddings',
    coverImage: img('https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80'),
    description: 'An exquisite wedding celebration captured in the grandeur of a heritage palace. Every frame reflects the opulence, emotion, and timeless elegance of this unforgettable day.',
    images: [
      img('https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80'),
      img('https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80'),
      img('https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80'),
      img('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80'),
      img('https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=800&q=80'),
      img('https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80'),
    ],
    featured: true,
    isFilm: false,
  },
  {
    title: 'Golden Hour Romance',
    category: 'Pre-Wedding',
    coverImage: img('https://images.unsplash.com/photo-1529636798458-92182e662485?w=1200&q=80'),
    description: 'A stunning pre-wedding shoot bathed in the golden light of sunset. The couple\'s love story unfolds against a backdrop of rolling landscapes and warm, ethereal tones.',
    images: [
      img('https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80'),
      img('https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=800&q=80'),
      img('https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80'),
      img('https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80'),
    ],
    featured: true,
    isFilm: false,
  },
  {
    title: 'Vogue Noir',
    category: 'Fashion',
    coverImage: img('https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80'),
    description: 'High fashion meets dark editorial in this moody, cinematic shoot inspired by Vogue. Bold silhouettes, dramatic lighting, and couture craftsmanship.',
    images: [
      img('https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80'),
      img('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80'),
      img('https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80'),
    ],
    featured: true,
    isFilm: false,
  },
  {
    title: 'Elegance in Motion',
    category: 'Weddings',
    coverImage: img('https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=80'),
    description: 'A celebration of love that moved with grace and sophistication. Every candid and composed moment tells a chapter of their beautiful journey together.',
    images: [
      img('https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80'),
      img('https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80'),
      img('https://images.unsplash.com/photo-1549416878-c78a4e1a5094?w=800&q=80'),
    ],
    featured: false,
    isFilm: false,
  },
  {
    title: 'Brand Luxe Campaign',
    category: 'Commercial',
    coverImage: img('https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&q=80'),
    description: 'A high-end commercial campaign for a luxury lifestyle brand. Impeccable styling, refined aesthetics, and images that speak the language of luxury.',
    images: [
      img('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80'),
      img('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80'),
    ],
    featured: true,
    isFilm: false,
  },
  {
    title: 'Midnight Gala',
    category: 'Events',
    coverImage: img('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80'),
    description: 'An exclusive corporate gala captured under the shimmer of chandelier light. Candid moments blended with architectural elegance for a visually stunning narrative.',
    images: [
      img('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80'),
      img('https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80'),
    ],
    featured: true,
    isFilm: false,
  },
  {
    title: 'Eternal Promises',
    category: 'Weddings',
    coverImage: img('https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1200&q=80'),
    description: 'A heartfelt wedding documented with our signature editorial gaze. From the quiet preparations to the grand ceremony, every emotion was preserved.',
    images: [
      img('https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80'),
      img('https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80'),
    ],
    featured: false,
    isFilm: false,
  },
  {
    title: 'Parisian Escape',
    category: 'Pre-Wedding',
    coverImage: img('https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&q=80'),
    description: 'Romance in the streets of Paris — a dreamy pre-wedding series capturing stolen glances, gentle embraces, and the timeless beauty of the City of Love.',
    images: [
      img('https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80'),
      img('https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=800&q=80'),
    ],
    featured: false,
    isFilm: false,
  },
  {
    title: 'Haute Couture Series',
    category: 'Fashion',
    coverImage: img('https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80'),
    description: 'A fashion editorial celebrating haute couture with sculptural poses, rich textures, and the art of movement in fabric.',
    images: [
      img('https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80'),
      img('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80'),
    ],
    featured: false,
    isFilm: false,
  },
  {
    title: 'Minimal Luxe Branding',
    category: 'Commercial',
    coverImage: img('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80'),
    description: 'A refined product photography campaign embodying the minimalist luxury aesthetic. Clean lines, soft light, and meticulous composition.',
    images: [
      img('https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80'),
    ],
    featured: false,
    isFilm: false,
  },
  {
    title: 'Sunset Soirée',
    category: 'Events',
    coverImage: img('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80'),
    description: 'An outdoor celebration bathed in golden hour warmth. We captured the joy, laughter, and flowing elegance of an unforgettable evening under open skies.',
    images: [
      img('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80'),
    ],
    featured: false,
    isFilm: false,
  },
  {
    title: 'The Grand Affair',
    category: 'Weddings',
    coverImage: img('https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&q=80'),
    description: 'A grand-scale destination wedding that was nothing short of cinematic. Lavish décor, heartfelt moments, and the vibrant spirit of celebration.',
    images: [
      img('https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80'),
      img('https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80'),
      img('https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80'),
    ],
    featured: false,
    isFilm: false,
  },
];

const films = [
  {
    title: 'Priya & Arjun — Wedding Film',
    category: 'Weddings',
    coverImage: img('https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80'),
    description: 'A cinematic wedding film capturing the royal celebration of Priya and Arjun. Set in a heritage palace, every frame tells a story of timeless love.',
    youtubeUrl: 'https://www.youtube.com/watch?v=04MpIh6dTOE',
    featured: true,
    isFilm: true,
  },
  {
    title: 'Meera & Rohan — Pre-Wedding',
    category: 'Pre-Wedding',
    coverImage: img('https://images.unsplash.com/photo-1529636798458-92182e662485?w=1200&q=80'),
    description: 'A dreamy pre-wedding film shot at golden hour. The love between Meera and Rohan shines through in every beautifully composed scene.',
    youtubeUrl: 'https://www.youtube.com/watch?v=04MpIh6dTOE',
    featured: false,
    isFilm: true,
  },
  {
    title: 'Luxe Brand Campaign 2025',
    category: 'Commercial',
    coverImage: img('https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&q=80'),
    description: 'A cinematic brand film for a premium luxury label. Sweeping visuals, meticulous art direction, and an unforgettable mood.',
    youtubeUrl: 'https://www.youtube.com/watch?v=04MpIh6dTOE',
    featured: false,
    isFilm: true,
  },
  {
    title: 'The Grand Celebration',
    category: 'Weddings',
    coverImage: img('https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&q=80'),
    description: 'A grand wedding film documenting a celebration that spanned three days. Family, tradition, and modern elegance woven together.',
    youtubeUrl: 'https://www.youtube.com/watch?v=04MpIh6dTOE',
    featured: true,
    isFilm: true,
  },
  {
    title: 'Vogue Fashion Reel',
    category: 'Fashion',
    coverImage: img('https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80'),
    description: 'A high-energy fashion reel featuring bold silhouettes, couture gowns, and dynamic movement choreographed to music.',
    youtubeUrl: 'https://www.youtube.com/watch?v=04MpIh6dTOE',
    featured: false,
    isFilm: true,
  },
  {
    title: 'A Night of Elegance',
    category: 'Events',
    coverImage: img('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80'),
    description: 'An event highlight film of a prestigious corporate gala. Chandelier-lit halls, keynote moments, and the energy of a curated evening.',
    youtubeUrl: 'https://www.youtube.com/watch?v=04MpIh6dTOE',
    featured: false,
    isFilm: true,
  },
];

const testimonials = [
  {
    clientName: 'Priya & Arjun Kapoor',
    clientImage: { url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80', publicId: '' },
    rating: 5,
    quote: "VIGXII Visuals captured our wedding day with such artistry and elegance. Every photograph feels like a piece of fine art. They didn't just document our day — they immortalized it. We are forever grateful.",
    event: 'Destination Wedding, Udaipur',
    approved: true,
  },
  {
    clientName: 'Meera & Rohan Sharma',
    clientImage: { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', publicId: '' },
    rating: 5,
    quote: "The level of professionalism and creative vision is unmatched. Our pre-wedding film looks like it belongs in a cinema. Absolutely breathtaking work that we will treasure forever.",
    event: 'Pre-Wedding, Santorini',
    approved: true,
  },
  {
    clientName: 'Ananya Sinha',
    clientImage: { url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80', publicId: '' },
    rating: 5,
    quote: "Working with VIGXII for our fashion campaign was an incredible experience. The editorial quality of each shot exceeded all our expectations. Pure perfection in every frame.",
    event: 'Fashion Editorial, Mumbai',
    approved: true,
  },
  {
    clientName: 'Vikram Mehta',
    clientImage: { url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80', publicId: '' },
    rating: 5,
    quote: "From start to finish, the VIGXII team delivered luxury-level service. The images from our corporate event are stunning and truly capture the essence of our brand's identity.",
    event: 'Corporate Gala, Delhi',
    approved: true,
  },
  {
    clientName: 'Rahul Desai',
    clientImage: { url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80', publicId: '' },
    rating: 5,
    quote: "The commercial shoot for our luxury watch brand was flawless. VIGXII understood the aesthetic we were going for immediately and delivered images that elevated our entire campaign.",
    event: 'Product Campaign',
    approved: true,
  },
  {
    clientName: 'Nisha & Aditya Patel',
    clientImage: { url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80', publicId: '' },
    rating: 5,
    quote: "Our wedding film brought tears to everyone's eyes. The cinematography, music selection, and storytelling were beyond what we could have imagined. This is art, not just videography.",
    event: 'Grand Wedding, Jaipur',
    approved: true,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Project.deleteMany({});
    await Testimonial.deleteMany({});
    console.log('Cleared existing data');

    // Insert projects
    const insertedProjects = await Project.insertMany(projects);
    console.log(`Inserted ${insertedProjects.length} projects`);

    // Insert films
    const insertedFilms = await Project.insertMany(films);
    console.log(`Inserted ${insertedFilms.length} films`);

    // Insert testimonials
    const insertedTestimonials = await Testimonial.insertMany(testimonials);
    console.log(`Inserted ${insertedTestimonials.length} testimonials`);

    console.log('\n✓ Database seeded successfully!');
    console.log(`  ${insertedProjects.length} photo projects`);
    console.log(`  ${insertedFilms.length} films (with YouTube URLs)`);
    console.log(`  ${insertedTestimonials.length} testimonials (approved)`);
  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
