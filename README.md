<div align="center">
  <img src="screenshots/Logo.png" alt="New Valley Hub Logo" width="300">
  
  <h1>New Valley Hub (بوابة الوادي الجديد) 🏜️</h1>
  
  <p><strong>"Discover Egypt's Hidden Oasis Through Premium Digital Tourism"</strong></p>
  
  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
    <img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white" alt="Django">
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
    <img src="https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white" alt="Google Gemini">
    <img src="https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white" alt="PWA">
  </p>
</div>

---

## 📖 About the Project

**New Valley Hub** is a premium, AI-powered digital tourism platform celebrating the majestic New Valley Governorate (الوادي الجديد) in Egypt. From the otherworldly landscapes of the White Desert to the ancient oasis towns of Kharga and Dakhla, we bring Egypt's hidden treasures to the world through cutting-edge technology and luxurious design.

Built for the **"New Valley Innovates" Hackathon 2026**, this Progressive Web Application showcases the perfect fusion of heritage and innovation through AI-driven experiences, sophisticated UI/UX, and offline-first architecture.

**🏆 Key Achievements:**
- ✨ **Luxury Earthy Design System** - Premium ceramic-effect UI with warm, sophisticated color palette
- 🤖 **RAG-Powered AI Chatbot** - "3m Sa3ed" local guide with real-time database integration
- 🎨 **Interactive Souvenir Maker** - Canvas-based editor with ancient Egyptian fonts
- 🗺️ **Offline-First PWA** - Full functionality without internet connectivity
- 📱 **Installable App** - Native-like experience on all devices

---

## 🎨 Design Philosophy: "Luxury Earthy" Theme

Our design system embodies the warmth of the Egyptian desert with a premium, minimalist aesthetic.

### Color Palette

```css
🍫 Dark Chocolate (#472825) - Primary text, headings, deep elegance
🌅 Medium Taupe (#96786F) - Secondary text, subtle sophistication  
✨ Golden Sand (#D3AB80) - Buttons, accents, warm highlights
🥐 Creamy Beige (#FDE4BC) - Card backgrounds, secondary elements
🏺 Ivory White (#FFF4E2) - Main backgrounds, pristine canvas
```

### Signature UI Elements

**🧭 Morphing Solid Header**
- **At Top:** Full-width solid ivory header with bottom border
- **On Scroll:** Transforms into centered floating capsule (rounded-full)
- **Effect:** Premium "ceramic pill" with golden sand border and warm shadow
- **Transition:** Smooth 500ms animation with centered positioning

**💎 Ceramic Effect Components**
- Solid, opaque backgrounds (no transparency/blur)
- Subtle golden accents and warm shadows
- High readability with dark brown text
- Card hover effects with gentle elevation

**🌟 Premium Interactions**
- Logo dynamically resizes on scroll (h-12 → h-10)
- Cards scale to 105% on hover with shadow enhancement
- Smooth 300-500ms transitions throughout
- Unified Dark Brown/Golden Sand social buttons

---

## 🔥 Flagship Features

### 🤖 "3m Sa3ed" (عم سعيد) - Your AI Local Guide

**The most intelligent tourism chatbot in Egypt, powered by Google Gemini AI with RAG technology.**

**Technical Innovation:**
- **RAG-Enhanced Responses:** Searches attractions and hotels in real-time before answering
- **Contextual Awareness:** Uses actual database content to provide accurate, up-to-date information
- **Friendly Persona:** Welcomes with "Ahlan ya habibi!" in authentic Egyptian style
- **Smart Prompting:** "You are '3m Sa3ed', a helpful guide for New Valley Egypt..."

**Premium UI/UX:**
- Dark Brown/Taupe gradient header with luxury aesthetics
- Golden Sand user messages, Creamy Beige AI responses
- Typing indicators with animated dots
- Auto-scroll to latest messages
- Toggle button with gradient hover effect

**API Endpoint:**
```python
POST /api/tourism/chat/
Body: { "message": "Tell me about White Desert" }
Response: { "response": "Ahlan ya habibi! The White Desert is..." }
```

---

### ✨ AI-Powered Trip Planner

**Intelligent itinerary generator with cost estimation.**

**Algorithm Features:**
- **Interest-Based Filtering:** Natural, Historical, Cultural attractions
- **Budget Tiers:** 
  - Low: 550 EGP/day
  - Medium: 1,300 EGP/day  
  - High: 3,500 EGP/day
- **Smart Scheduling:** 2 activities per day (Morning/Afternoon)
- **Cost Calculation:** Base cost + ticket prices for accurate budgeting

**User Experience:**
- Creamy Beige form cards with Golden Sand accents
- Dark Brown text for perfect readability
- Interactive itinerary display with images
- Total estimated cost in Egyptian Pounds (EGP)

**API Endpoint:**
```python
POST /api/tourism/attractions/generate_plan/
Body: { "days": 3, "budget": "medium", "interests": ["natural", "historical"] }
```

---

### 📸 Digital Souvenir Maker

**Professional canvas-based photo editor with Egyptian themes.**

**Creative Tools:**
- **Background Selection:** Choose from Digital Artifacts collection
- **Custom Image Upload:** Paste URL or upload your own photos
- **Ancient Typography:** Exclusive fonts (Ancient, Hieroglyphs)
- **Text Customization:** Color picker, font size, positioning
- **Export Feature:** Download as PNG with transparent background support

**Design:**
- Creamy Beige controls panel
- Golden Sand action buttons
- Ivory White preview area
- Dark Brown text labels
- Scoped local font loading (no global pollution)

---

### 🔍 Global Search Engine

**Unified search across all content types with intelligent categorization.**

**Multi-Model Architecture:**
```python
# Searches simultaneously:
- Attractions (name, description, category)
- Hotels (name, description, star rating)
- Products (name, description, price)

# Returns unified JSON with type badges
GET /api/tourism/search/?q=desert
Response: { results: [...], count: 13, query: "desert" }
```

**Performance:**
- 10 results per model (30 max total)
- SQL injection protection with sanitized queries
- Absolute image URLs for seamless frontend consumption
- Type-specific metadata (category, rating, price)

---

### 🗺️ Interactive Maps & Offline Support

**Leaflet-powered maps with full offline fallback.**

**Features:**
- Real-time marker rendering for attractions
- Cluster support for dense areas
- Custom icons and popups
- Static map fallback when offline
- Zoom controls and satellite view

**Technology:**
- React-Leaflet 5.0.0 integration
- Leaflet 1.9.4 engine
- OpenStreetMap tiles
- Service Worker caching

---

### 🆘 Emergency SOS Button

**One-tap access to critical services for tourist safety.**

**Emergency Contacts:**
- 🚑 **Ambulance:** 123
- 🚓 **Police:** 122
- 🔥 **Fire Department:** 180
- 👮 **Tourist Police:** 126
- 🏥 **Hospital:** Direct dial

**Design:**
- Fixed bottom-right position
- Pulse animation for visibility
- Dark Brown with Golden Sand accents
- Creamy Beige emergency contact cards
- Direct `tel:` links for instant calling

---

### 📴 Progressive Web App (PWA)

**Installable, offline-first architecture for native-like experience.**

**Capabilities:**
- ✅ Service Worker caching
- ✅ Add to Home Screen
- ✅ Offline indicator banner
- ✅ Background sync
- ✅ Push notifications ready

**Technical Stack:**
- `vite-plugin-pwa` 1.2.0
- Workbox integration
- Manifest auto-generation
- iOS Safari support

---

## 🛠️ Technology Stack

### Frontend Architecture

| Technology | Version | Purpose |
|:-----------|:--------|:--------|
| **React** | 19.2.0 | Modern UI with hooks and functional components |
| **Vite** | 7.2.4 | Lightning-fast HMR and optimized builds |
| **Tailwind CSS** | 4.1.18 | Utility-first styling with custom luxury palette |
| **React Router** | 7.13.0 | Client-side routing across 10 pages |
| **Axios** | 1.13.3 | Promise-based HTTP client |
| **React Icons** | 5.5.0 | Icon library (Fa*, Si*, Md* icons) |
| **React Leaflet** | 5.0.0 | Interactive map components |
| **Leaflet** | 1.9.4 | Map rendering engine |
| **vite-plugin-pwa** | 1.2.0 | PWA manifest and service worker generation |

### Backend Architecture

| Technology | Version | Purpose |
|:-----------|:--------|:--------|
| **Django** | 5.2.10 | Web framework with powerful ORM |
| **Django REST Framework** | 3.16.1 | RESTful API with ViewSets and Serializers |
| **google-generativeai** | Latest | Google Gemini AI SDK |
| **Pillow** | 12.1.0 | Image processing for uploads |
| **django-cors-headers** | 4.9.0 | CORS middleware for React frontend |
| **gunicorn** | 21.2.0 | Production WSGI server |
| **whitenoise** | 6.6.0 | Static file serving |
| **psycopg2-binary** | 2.9.9 | PostgreSQL adapter |

### Database

- **Development:** SQLite3 (included, zero config)
- **Production:** PostgreSQL (Neon DB recommended)
- **ORM:** Django Models with abstract base classes

---

## 📂 Project Architecture

```
new-valley-hub/
├── backend/                    # Django REST API
│   ├── core/                   # Shared utilities
│   │   └── models.py          # BaseLocationModel (abstract)
│   ├── tourism/                # Main tourism app
│   │   ├── models.py          # Attraction, DigitalArtifact, TeamMember, etc.
│   │   ├── views.py           # ChatAPIView, SearchAPIView, ViewSets
│   │   ├── serializers.py     # DRF serializers
│   │   ├── urls.py            # API routes
│   │   └── ai_planner.py      # Trip itinerary algorithm
│   ├── hospitality/            # Hotels app
│   │   └── models.py          # Hotel model with stars, booking
│   ├── marketplace/            # Products app
│   │   └── models.py          # Product model
│   ├── services/               # Services directory
│   │   └── models.py          # ServiceCategory (hierarchical), Service
│   └── new_valley_hub/         # Django project settings
│       ├── settings.py        # Configuration
│       └── urls.py            # Root URL config
├── frontend/                   # React PWA
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── Navbar.jsx             # Morphing solid capsule header
│   │   │   ├── Footer.jsx             # Dark Brown with SandScript credit
│   │   │   ├── ChatbotWidget.jsx      # 3m Sa3ed AI chatbot
│   │   │   ├── TeamSection.jsx        # Luxury earthy team cards
│   │   │   ├── SOSButton.jsx          # Emergency contacts
│   │   │   ├── WeatherWidget.jsx      # Creamy Beige weather display
│   │   │   ├── SouvenirMaker.jsx      # Canvas editor
│   │   │   ├── OfflineIndicator.jsx   # Network status
│   │   │   ├── AttractionCard.jsx     # Card component
│   │   │   ├── ServiceCard.jsx        # Service listing card
│   │   │   └── HotelCard.jsx          # Hotel card with booking
│   │   ├── pages/              # Route-based pages
│   │   │   ├── HomePage.jsx           # Landing + hero + features
│   │   │   ├── AttractionsPage.jsx    # Filterable attractions
│   │   │   ├── ServicesPage.jsx       # Hierarchical services
│   │   │   ├── HotelsPage.jsx         # Hotel listings
│   │   │   ├── MapPage.jsx            # Interactive Leaflet map
│   │   │   ├── PlannerPage.jsx        # AI trip planner
│   │   │   ├── MarketplacePage.jsx    # Local products
│   │   │   ├── SouvenirPage.jsx       # Souvenir maker wrapper
│   │   │   ├── ContactPage.jsx        # Contact + team + governor
│   │   │   └── SearchResults.jsx      # Global search UI
│   │   ├── services/
│   │   │   └── api.js         # Axios client configuration
│   │   ├── App.jsx            # Root component + routing
│   │   └── index.css          # Tailwind + global styles
│   ├── dev-dist/              # PWA service worker files
│   ├── package.json
│   └── vite.config.js         # Vite + PWA configuration
├── screenshots/                # Feature screenshots
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Python** 3.10+ (Django backend)
- **Node.js** 18+ (React frontend)
- **Google Gemini API Key** ([Get it here](https://makersuite.google.com/app/apikey))

### Installation

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/KareemMas3ud/new-valley-hub.git
cd new-valley-hub
```

#### 2️⃣ Backend Setup

```bash
cd backend

# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Set Gemini API key
export GEMINI_API_KEY="your_api_key_here"  # Linux/Mac
set GEMINI_API_KEY=your_api_key_here       # Windows CMD
$env:GEMINI_API_KEY="your_api_key_here"    # Windows PowerShell

# Run migrations
python manage.py migrate

# Seed database (optional)
python seed_comprehensive.py

# Create admin user (optional)
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

**Backend runs on:** `http://127.0.0.1:8000`

#### 3️⃣ Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Frontend runs on:** `http://localhost:5173`

#### 4️⃣ Access the Application

- **Frontend UI:** http://localhost:5173
- **Backend API:** http://127.0.0.1:8000/api/
- **Django Admin:** http://127.0.0.1:8000/admin/
- **API Docs:** http://127.0.0.1:8000/api/ (browsable)

---

## 📸 Screenshots

| Home Page | AI Chatbot - 3m Sa3ed 🤖 |
| :---: | :---: |
| ![Home Page](./screenshots/home.png) | ![Chatbot](./screenshots/chatbot.png) |

| AI Trip Planner ✨ | Interactive Map |
| :---: | :---: |
| ![Trip Planner](./screenshots/trip_planner.png) | ![Map](./screenshots/map.png) |

| Attractions | Hotels |
| :---: | :---: |
| ![Attractions](./screenshots/attractions.png) | ![Hotels](./screenshots/hotels.png) |

| Local Market 🛍️ | Souvenir Maker |
| :---: | :---: |
| ![Market](./screenshots/market.png) | ![Souvenir Maker](./screenshots/souvenir.png) |

| Services | SOS Emergency Button |
| :---: | :---: |
| ![Services](./screenshots/services.png) | ![SOS](./screenshots/SOS.png) |

| Governor's Section | Team Section |
| :---: | :---: |
| ![Governor](./screenshots/governor.png) | ![Team](./screenshots/team.png) |

---

## 🔌 API Documentation

### Tourism Endpoints

```
# Attractions
GET    /api/tourism/attractions/           List all attractions
GET    /api/tourism/attractions/{id}/      Retrieve specific attraction
POST   /api/tourism/attractions/generate_plan/   AI trip planner

# Digital Museum
GET    /api/tourism/artifacts/             List all digital artifacts
GET    /api/tourism/artifacts/{id}/        Retrieve specific artifact

# Team & Governor
GET    /api/tourism/team/                  List team members
GET    /api/tourism/governor/              Get governor profile (singleton)
```

### Hospitality Endpoints

```
GET    /api/hospitality/hotels/            List all hotels
GET    /api/hospitality/hotels/{id}/       Retrieve specific hotel
```

### Marketplace Endpoints

```
GET    /api/marketplace/products/          List all products
GET    /api/marketplace/products/{id}/     Retrieve specific product
```

### Services Endpoints

```
GET    /api/services/categories/           List service categories (hierarchical)
GET    /api/services/services/             List all services
```

### AI & Search Endpoints

```
# AI Chatbot
POST   /api/tourism/chat/
Body:  { "message": "Tell me about White Desert" }
Response: { "response": "Ahlan ya habibi! The White Desert..." }

# Global Search
GET    /api/tourism/search/?q={query}
Response: { 
  "results": [...], 
  "count": 13, 
  "query": "desert" 
}
```

---

## 🎯 Key Technical Highlights

### 1. RAG Implementation (Retrieval-Augmented Generation)

```python
# backend/tourism/views.py - ChatAPIView
def post(self, request):
    user_message = request.data.get('message', '')
    
    # RAG: Search database for context
    context_results = []
    attractions = Attraction.objects.filter(
        Q(name__icontains=user_message) | Q(description__icontains=user_message)
    )[:2]
    for item in attractions:
        context_results.append(f"Place: {item.name} - {item.description[:150]}")
    
    # Build prompt with context
    context_str = "\n".join(context_results)
    prompt = f"System: You are '3m Sa3ed', a helpful guide... Context: {context_str}..."
    
    # Generate AI response
    response = model.generate_content(prompt, request_options={'timeout': 30})
    return Response({'response': response.text})
```

### 2. Morphing Solid Header Animation

```jsx
// frontend/src/components/Navbar.jsx
const [isFloating, setIsFloating] = useState(false);

useEffect(() => {
  const handleScroll = () => setIsFloating(window.scrollY > 50);
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

return (
  <nav className={`
    fixed z-50 transition-all duration-500 ease-in-out
    ${isFloating
      ? 'top-4 left-1/2 -translate-x-1/2 w-[90%] md:w-[85%] rounded-full bg-[#FFF4E2]/95 border border-[#D3AB80]/40 shadow-xl shadow-[#472825]/10 py-3'
      : 'top-0 left-0 w-full bg-[#FFF4E2] border-b border-[#D3AB80]/20 rounded-none shadow-none py-5'
    }
  `}>
```

### 3. Trip Planner Algorithm

```python
# backend/tourism/ai_planner.py
def generate_itinerary(days, budget_level, interests):
    # Filter attractions by interests
    relevant_attractions = [a for a in all_attractions 
                           if a.attraction_type in interests]
    
    # Budget calculation
    daily_rates = {'low': 550, 'medium': 1300, 'high': 3500}
    base_cost = daily_rates[budget_level] * days
    
    # Build itinerary
    itinerary = []
    for day in range(1, days + 1):
        activities = []
        for time in ['Morning', 'Afternoon']:
            attr = relevant_attractions.pop(0)
            activities.append({
                'name': attr.name,
                'time': time,
                'price': float(attr.ticket_price)
            })
        itinerary.append({'day': day, 'activities': activities})
    
    return {'itinerary': itinerary, 'total_estimated_cost': base_cost + ticket_sum}
```

### 4. Ceramic Card Hover Effect

```jsx
// Luxury Earthy Theme - Solid, Premium Interactions
<div className="
  bg-[#FFF4E2] border border-[#D3AB80]/20
  transition-all duration-300
  hover:scale-105 hover:shadow-xl hover:shadow-[#472825]/10
  rounded-lg overflow-hidden
">
  {/* Solid ivory card with golden accents */}
</div>
```

---

## 🌟 Unique Value Propositions

1. **🎨 Luxury Earthy Design System**
   - Custom color palette inspired by Egyptian desert
   - Ceramic-effect solid UI (no transparency/blur)
   - Morphing navigation header with smooth transitions

2. **🤖 RAG-Powered AI Chatbot**
   - Only tourism chatbot in Egypt with real-time database integration
   - Context-aware responses using actual attraction/hotel data
   - Friendly "3m Sa3ed" persona with Egyptian authenticity

3. **🖼️ Digital Souvenir Maker**
   - Professional canvas editor with ancient Egyptian fonts
   - Export high-quality PNGs with transparent background
   - Scoped font loading prevents global CSS pollution

4. **📴 True Offline-First Architecture**
   - Service Worker caching for all critical assets
   - Static map fallback when connectivity lost
   - Offline indicator with graceful degradation

5. **🆘 Tourist Safety Integration**
   - One-tap emergency contacts (ambulance, police, tourist police)
   - Fixed SOS button always accessible
   - Direct tel: links for instant calling

6. **🔍 Intelligent Multi-Model Search**
   - Searches 3 content types simultaneously
   - SQL injection protection with sanitized queries
   - Type-specific badges and metadata

7. **💎 Premium Interactions**
   - Logo resizes dynamically on scroll
   - Unified social buttons (Dark Brown/Golden Sand)
   - 105% hover zoom on all cards
   - Smooth 300-500ms transitions

---

## 🤝 Contributing

This project was built for the **"New Valley Innovates" Hackathon 2026**. We welcome contributions!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👨‍💻 Team - SandScript

**Built with ❤️ by the SandScript Team for New Valley Governorate 🇪🇬**

Our diverse team of developers, designers, and AI specialists came together to create this premium digital tourism experience. Check the **Meet the Team** section in the Contact page to see our profiles, GitHub repositories, and LinkedIn connections!

---

## 📝 License

This project is developed for educational and hackathon purposes.

---

## 🙏 Acknowledgments

- **Google Gemini AI** - Powering our intelligent RAG chatbot
- **New Valley Governorate** - Inspiring this digital transformation
- **React & Django Communities** - Outstanding documentation and support
- **Tailwind CSS** - Making luxury UIs achievable
- **OpenStreetMap & Leaflet** - Free, open-source mapping
- **"New Valley Innovates" Hackathon 2026** - Platform for innovation

---

<div align="center">
  
  **Made with ❤️ for New Valley Governorate** 🏜️✨
  
  *"Where Heritage Meets Innovation Through Luxury Design"*
  
  **SandScript Team © 2026**

  <br><br>

  [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/KareemMas3ud/new-valley-hub)
  
</div>
