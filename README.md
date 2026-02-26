# VIGXII VISUALS CO.

> Premium Photography & Cinematic Films — A luxury, minimal, cinematic multi-page website built with the MERN stack.

## Tech Stack

- **Frontend:** React (Create React App), Framer Motion, React Router, React Icons
- **Backend:** Express.js, MongoDB (Mongoose), Nodemailer
- **Styling:** Custom CSS with CSS Variables, responsive design

## Getting Started

### Prerequisites

- Node.js 16+
- MongoDB (local or Atlas)

### Installation

```bash
# Install all dependencies (root + client + server)
npm run install-all

# Or install individually
cd client && npm install
cd ../server && npm install
```

### Environment Variables

Create `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vigxii
```

### Running the App

```bash
# Run both client and server concurrently
npm run dev

# Or run separately
npm run client   # React on port 3000
npm run server   # Express on port 5000
```

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero video, featured work, about preview, services, testimonials, CTA |
| Portfolio | `/portfolio` | Filterable grid with category tabs |
| Project Detail | `/portfolio/:id` | Full cover, gallery, optional film embed |
| Films | `/films` | Cinematic dark layout with video modal |
| Services | `/services` | Alternating B&W sections with detailed service info |
| About | `/about` | Founder story, philosophy, why choose us, achievements |
| Testimonials | `/testimonials` | Client quotes with avatars and star ratings |
| Contact | `/contact` | Form + studio info + Google Maps embed |

## Design System

- **Colors:** Pure Black `#000`, Off White `#F5F5F5`, Soft Gray `#D9D9D9`, Soft Gold `#C6A85B`
- **Fonts:** Cormorant Garamond (headings), Montserrat (body)
- **Animations:** Fade-in on scroll, slow zoom on hover, text reveal, smooth page transitions

## License

&copy; 2026 VIGXII Visuals Co. All rights reserved.
