const bcrypt = require('bcryptjs');
const db = require('./database');
require('dotenv').config();

function slugify(text) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const destinations = [
  {
    name: 'Ooty',
    tagline: 'Queen of the Nilgiris',
    description: 'A misty hill station famous for tea estates, the toy train, botanical gardens, and cool weather year-round. Ooty remains the most-loved hill retreat in Tamil Nadu.',
    image_url: 'https://images.unsplash.com/photo-1602216846623-c52e2dad3a5e?w=1200&q=80',
    best_time_to_visit: 'October to June',
    featured: 1,
  },
  {
    name: 'Kodaikanal',
    tagline: 'Princess of Hill Stations',
    description: 'Known for its star-shaped lake, dense shola forests, and pleasant climate, Kodaikanal is a favourite escape for families and honeymooners alike.',
    image_url: 'https://images.unsplash.com/photo-1626621331169-7322872c8635?w=1200&q=80',
    best_time_to_visit: 'September to May',
    featured: 1,
  },
  {
    name: 'Madurai',
    tagline: 'The Temple City',
    description: 'Home to the magnificent Meenakshi Amman Temple, Madurai offers a deep dive into Tamil culture, ancient architecture, and authentic local cuisine.',
    image_url: 'https://images.unsplash.com/photo-1621839673705-6617945851a8?w=1200&q=80',
    best_time_to_visit: 'October to March',
    featured: 1,
  },
  {
    name: 'Rameswaram',
    tagline: 'A Sacred Island Town',
    description: 'A holy pilgrimage town connected by the iconic Pamban Bridge, famous for the Ramanathaswamy Temple and pristine coastal views.',
    image_url: 'https://images.unsplash.com/photo-1623060064327-1066997228d2?w=1200&q=80',
    best_time_to_visit: 'October to March',
    featured: 0,
  },
  {
    name: 'Kanyakumari',
    tagline: 'Land\u2019s End of India',
    description: 'Where the Arabian Sea, Bay of Bengal, and Indian Ocean meet. Famous for the Vivekananda Rock Memorial and unforgettable sunrise-sunset views.',
    image_url: 'https://images.unsplash.com/photo-1602308304610-93d4f0c70932?w=1200&q=80',
    best_time_to_visit: 'October to February',
    featured: 1,
  },
  {
    name: 'Mahabalipuram',
    tagline: 'Coastal Stone Heritage',
    description: 'A UNESCO World Heritage town near Chennai known for ancient rock-cut temples, the Shore Temple, and beautiful beaches.',
    image_url: 'https://images.unsplash.com/photo-1582972236019-ea4af5ffe587?w=1200&q=80',
    best_time_to_visit: 'November to February',
    featured: 0,
  },
  {
    name: 'Chennai',
    tagline: 'Gateway to Tamil Nadu',
    description: 'The vibrant capital city blending Marina Beach, colonial architecture, temples, and modern city life - the perfect starting point for any Tamil Nadu trip.',
    image_url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&q=80',
    best_time_to_visit: 'November to February',
    featured: 0,
  },
  {
    name: 'Yercaud',
    tagline: 'A Hidden Hill Gem',
    description: 'A quiet, less-crowded hill station in the Eastern Ghats with coffee plantations, a serene lake, and panoramic viewpoints.',
    image_url: 'https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?w=1200&q=80',
    best_time_to_visit: 'October to May',
    featured: 0,
  },
];

const insertDestination = db.prepare(`
  INSERT INTO destinations (name, slug, tagline, description, image_url, best_time_to_visit, featured)
  VALUES (@name, @slug, @tagline, @description, @image_url, @best_time_to_visit, @featured)
`);

const destinationIds = {};

const insertAllDestinations = db.transaction((rows) => {
  for (const d of rows) {
    const slug = slugify(d.name);
    const result = insertDestination.run({ ...d, slug });
    destinationIds[d.name] = result.lastInsertRowid;
  }
});

const packages = [
  {
    title: 'Ooty Honeymoon Special - 3 Days',
    destination: 'Ooty',
    duration_days: 3,
    duration_nights: 2,
    price: 12999,
    description: 'A romantic getaway through Ooty\u2019s tea gardens, lakes, and viewpoints, with a comfortable stay and private cab throughout.',
    highlights: 'Botanical Garden,Ooty Lake Boating,Doddabetta Peak,Tea Factory Visit,Toy Train Ride',
    image_url: 'https://images.unsplash.com/photo-1601701119533-fde7ae42d09f?w=1200&q=80',
    featured: 1,
  },
  {
    title: 'Kodaikanal Family Tour - 2 Days',
    destination: 'Kodaikanal',
    duration_days: 2,
    duration_nights: 1,
    price: 8499,
    description: 'A quick family-friendly trip covering all the major sights of Kodaikanal at a relaxed pace.',
    highlights: 'Kodai Lake,Coaker\u2019s Walk,Pillar Rocks,Bryant Park,Silver Cascade Falls',
    image_url: 'https://images.unsplash.com/photo-1605538883669-825200433431?w=1200&q=80',
    featured: 1,
  },
  {
    title: 'Madurai Heritage & Temple Tour - 2 Days',
    destination: 'Madurai',
    duration_days: 2,
    duration_nights: 1,
    price: 6999,
    description: 'Explore the spiritual and architectural heart of Tamil Nadu with guided temple visits and local food experiences.',
    highlights: 'Meenakshi Amman Temple,Thirumalai Nayakkar Palace,Gandhi Museum,Local Food Walk',
    image_url: 'https://images.unsplash.com/photo-1600100397608-f0a7f2a7c4b8?w=1200&q=80',
    featured: 1,
  },
  {
    title: 'Rameswaram Pilgrimage Tour - 2 Days',
    destination: 'Rameswaram',
    duration_days: 2,
    duration_nights: 1,
    price: 7499,
    description: 'A guided pilgrimage covering Ramanathaswamy Temple, Dhanushkodi, and the iconic Pamban Bridge.',
    highlights: 'Ramanathaswamy Temple,Dhanushkodi Beach,Pamban Bridge,Agnitheertham',
    image_url: 'https://images.unsplash.com/photo-1625125164721-8523d6e191f8?w=1200&q=80',
    featured: 0,
  },
  {
    title: 'Kanyakumari Sunrise Special - 1 Day',
    destination: 'Kanyakumari',
    duration_days: 1,
    duration_nights: 0,
    price: 3499,
    description: 'A day trip timed around the famous Kanyakumari sunrise, with visits to the Vivekananda Rock Memorial and Thiruvalluvar Statue.',
    highlights: 'Sunrise Point,Vivekananda Rock Memorial,Thiruvalluvar Statue,Triveni Sangam',
    image_url: 'https://images.unsplash.com/photo-1602216846096-9c41fe6f5a39?w=1200&q=80',
    featured: 0,
  },
  {
    title: 'Mahabalipuram Heritage Day Trip',
    destination: 'Mahabalipuram',
    duration_days: 1,
    duration_nights: 0,
    price: 2999,
    description: 'A relaxed day trip from Chennai exploring ancient rock-cut monuments and a beach-side lunch.',
    highlights: 'Shore Temple,Five Rathas,Arjuna\u2019s Penance,Beach Walk',
    image_url: 'https://images.unsplash.com/photo-1620766182966-c6eb5103e07f?w=1200&q=80',
    featured: 0,
  },
  {
    title: 'Tamil Nadu Grand Tour - 7 Days',
    destination: 'Madurai',
    duration_days: 7,
    duration_nights: 6,
    price: 27999,
    description: 'Our signature circuit covering hills, temples, and coastline: Chennai - Mahabalipuram - Madurai - Rameswaram - Kanyakumari.',
    highlights: 'Multi-city Circuit,AC Coach Travel,Hotel Stay Included,All Sightseeing Covered',
    image_url: 'https://images.unsplash.com/photo-1600100397608-f0a7f2a7c4b8?w=1200&q=80',
    featured: 1,
  },
];

const insertPackage = db.prepare(`
  INSERT INTO packages (title, slug, destination_id, duration_days, duration_nights, price, description, highlights, image_url, featured)
  VALUES (@title, @slug, @destination_id, @duration_days, @duration_nights, @price, @description, @highlights, @image_url, @featured)
`);

const insertAllPackages = db.transaction((rows) => {
  for (const p of rows) {
    const slug = slugify(p.title);
    const destination_id = destinationIds[p.destination] || null;
    insertPackage.run({
      title: p.title,
      slug,
      destination_id,
      duration_days: p.duration_days,
      duration_nights: p.duration_nights,
      price: p.price,
      description: p.description,
      highlights: p.highlights,
      image_url: p.image_url,
      featured: p.featured,
    });
  }
});

const testimonials = [
  {
    customer_name: 'Priya Raman',
    location: 'Chennai',
    rating: 5,
    message: 'Our Ooty trip with Harthika Travels was perfectly planned. The driver was friendly and every hotel was exactly as promised. Highly recommend!',
    avatar_url: '',
  },
  {
    customer_name: 'Suresh Kumar',
    location: 'Coimbatore',
    rating: 5,
    message: 'Booked the Tamil Nadu Grand Tour for our family of 6. Smooth experience from booking to drop-off. Will definitely book again.',
    avatar_url: '',
  },
  {
    customer_name: 'Anitha & Family',
    location: 'Bengaluru',
    rating: 4,
    message: 'Madurai temple tour was insightful and the guide knew so much history. Loved the food recommendations too.',
    avatar_url: '',
  },
  {
    customer_name: 'Vignesh M.',
    location: 'Trichy',
    rating: 5,
    message: 'Quick one-day Kanyakumari trip, very well organised for the price. The sunrise view alone was worth it.',
    avatar_url: '',
  },
];

const insertTestimonial = db.prepare(`
  INSERT INTO testimonials (customer_name, location, rating, message, avatar_url, approved)
  VALUES (@customer_name, @location, @rating, @message, @avatar_url, 1)
`);

const insertAllTestimonials = db.transaction((rows) => {
  for (const t of rows) insertTestimonial.run(t);
});

function seedAdmin() {
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'Harthika@2026';
  const existing = db.prepare('SELECT * FROM admin_users WHERE username = ?').get(username);
  if (!existing) {
    const hash = bcrypt.hashSync(password, 10);
    db.prepare('INSERT INTO admin_users (username, password_hash) VALUES (?, ?)').run(username, hash);
    console.log(`Admin user created -> username: ${username}`);
  } else {
    console.log('Admin user already exists, skipping.');
  }
}

function run() {
  const destCount = db.prepare('SELECT COUNT(*) as count FROM destinations').get().count;
  if (destCount === 0) {
    insertAllDestinations(destinations);
    insertAllPackages(packages);
    insertAllTestimonials(testimonials);
    console.log(`Seeded ${destinations.length} destinations, ${packages.length} packages, ${testimonials.length} testimonials.`);
  } else {
    console.log('Destinations already seeded, skipping destination/package/testimonial seed.');
  }
  seedAdmin();
}

run();
