<div align="center">

![New Valley Hub Logo](./frontend/public/Logo.png)

# New Valley Hub
**Comprehensive Technical Documentation & System Architecture**

> **Project**: New Valley Hub — Smart Tourism Platform for Al Wadi Al Jadid, Egypt<br>
> **Stack**: Django 6 · React 18 · Vite · SQLite / PostgreSQL

Prepared by: **SandScript Team**<br>
Date: **April 2026**

</div>

<div style="page-break-after: always;"></div>

## Document History

| Version | Date | Author | Description |
|---|---|---|---|
| 1.0.0 | April 2026 | SandScript Team | Initial Release |

---

## Table of Contents

- [1. Source Code Structure & Requirements (SRC)](#1-source-code-structure--requirements-src)
  - [1.1 Technology Stack](#11-technology-stack)
  - [1.2 Folder Structure](#12-folder-structure)
- [2. System Architecture](#2-system-architecture)
  - [2.1 Description](#21-description)
  - [2.2 Architecture Diagram](#22-architecture-diagram)
- [3. Entity-Relationship Diagram (ERD)](#3-entity-relationship-diagram-erd)
- [4. Use Case Diagram](#4-use-case-diagram)
- [5. Sequence Diagram — AI Chatbot Flow](#5-sequence-diagram--ai-chatbot-flow)
- [6. User Guide](#6-user-guide)
  - [6.1 End-User Guide](#61-end-user-guide)
  - [6.2 Developer Guide](#62-developer-guide)

---

## 1. Source Code Structure & Requirements (SRC)

### 1.1 Technology Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **Frontend Framework** | React | 18 | Component-based Single Page Application |
| **Frontend Build Tool** | Vite | Latest | Development server & production bundler |
| **Frontend Routing** | React Router DOM | v6 | Client-side page routing |
| **Frontend HTTP Client** | Axios | Latest | REST API communication with the backend |
| **Frontend 3D / AR** | model-viewer (Web Component) | Latest | Augmented Reality artifact viewing |
| **PWA Support** | vite-plugin-pwa | Latest | Offline capability via service worker |
| **Backend Framework** | Django | 6.0.2 | Python web framework |
| **REST API Layer** | Django REST Framework | 3.16.1 | JSON API serialization & viewsets |
| **Authentication** | djangorestframework-simplejwt | Latest | JWT access & refresh token management |
| **Cross-Origin Support** | django-cors-headers | 4.9.0 | CORS headers for frontend–backend communication |
| **AI Chatbot** | Google Generative AI (Gemini) | 0.8.6 | AI-powered local guide chatbot ("Am Sa3eed") |
| **Static Files** | WhiteNoise | 6.11.0 | Serve static files efficiently without a CDN |
| **Database (Dev)** | SQLite | 3 | Local development database |
| **Database (Prod)** | PostgreSQL | Latest | Production database (deployed on Render.com) |
| **DB URL Parsing** | dj-database-url | 3.1.1 | Parse `DATABASE_URL` environment variable |
| **Image Processing** | Pillow | 12.1.1 | Image field handling in Django models |

---

### 1.2 Folder Structure

```
new-valley-hub/                         # Project root
├── backend/                            # Django REST API application
│   ├── new_valley_hub/                 # Django project configuration package
│   │   ├── settings.py                 # All settings: CORS, JWT, DB, static, media
│   │   ├── urls.py                     # Root URL dispatcher (routes to all Django apps)
│   │   └── wsgi.py                     # WSGI entry point for production deployment
│   │
│   ├── core/                           # Shared base models
│   │   └── models.py                   # BaseLocationModel (abstract: name, coords, image, address)
│   │
│   ├── tourism/                        # Main Django app — largest module
│   │   ├── models.py                   # Attraction, MuseumArtifact, SouvenirAsset,
│   │   │                               # TeamMember, GovernorProfile, SiteConfiguration,
│   │   │                               # UserSavedTrip, UserSavedSouvenir
│   │   ├── views.py                    # ViewSets for all tourism models + SearchAPIView
│   │   ├── auth_views.py               # RegisterView, SaveTripView, SouvenirView (JWT-gated)
│   │   ├── chat_view.py                # ChatAPIView — Gemini AI chatbot integration
│   │   ├── ai_planner.py               # AI-based itinerary generation helper
│   │   ├── serializers.py              # DRF serializers for all tourism models
│   │   ├── urls.py                     # tourism/ routes + /chat/ + /search/ endpoints
│   │   └── auth_urls.py                # /auth/ sub-routes: register, save-trip, souvenirs
│   │
│   ├── hospitality/                    # Hotel management Django app
│   │   ├── models.py                   # Hotel (extends BaseLocationModel: stars, booking_url…)
│   │   ├── views.py                    # HotelViewSet
│   │   └── urls.py                     # /hospitality/ routes
│   │
│   ├── services/                       # Local services Django app
│   │   ├── models.py                   # ServiceCategory (hierarchical self-FK), Service
│   │   ├── views.py                    # ServiceViewSet, ServiceCategoryViewSet
│   │   └── urls.py                     # /services/ routes
│   │
│   ├── marketplace/                    # Local products marketplace app
│   │   ├── models.py                   # Product (name, price, seller_name, seller_contact)
│   │   ├── views.py                    # ProductViewSet
│   │   └── urls.py                     # /marketplace/ routes
│   │
│   ├── media/                          # Uploaded files (images, 3D models)
│   ├── db.sqlite3                      # SQLite database (development only)
│   └── requirements.txt                # All Python dependencies
│
├── frontend/                           # React SPA
│   ├── src/
│   │   ├── main.jsx                    # React entry point
│   │   ├── App.jsx                     # Root component — defines all page routes
│   │   ├── index.css                   # Global styles
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx         # Global auth state: JWT tokens, user info, login/logout
│   │   │
│   │   ├── services/
│   │   │   └── api.js                  # Axios instance + all exported API call functions
│   │   │
│   │   ├── pages/                      # Route-level page components (one per URL)
│   │   │   ├── HomePage.jsx            # Landing page: hero, attractions showcase, features
│   │   │   ├── AttractionsPage.jsx     # Browse & filter all tourist attractions
│   │   │   ├── HotelsPage.jsx          # Browse hotels with stars and booking links
│   │   │   ├── ServicesPage.jsx        # Local services directory (hospitals, banks, dining…)
│   │   │   ├── MapPage.jsx             # Interactive map with all POI markers
│   │   │   ├── PlannerPage.jsx         # AI-powered itinerary planner with CO₂ calculator
│   │   │   ├── MarketplacePage.jsx     # Local products marketplace
│   │   │   ├── VirtualMuseumPage.jsx   # 3D artifact viewer with AR/WebXR support
│   │   │   ├── SouvenirPage.jsx        # Digital souvenir photo editor
│   │   │   ├── SearchResults.jsx       # Global cross-content search results
│   │   │   ├── MyTrips.jsx             # Saved trips dashboard (requires login)
│   │   │   └── ContactPage.jsx         # Contact form page
│   │   │
│   │   └── components/                 # Reusable UI components
│   │       ├── Navbar.jsx              # Top navigation bar + auth modal trigger + search
│   │       ├── Footer.jsx              # Site footer
│   │       ├── LoginModal.jsx          # Login / Register modal dialog
│   │       ├── ChatbotWidget.jsx       # Floating AI chatbot widget (Am Sa3eed)
│   │       ├── TripPlanner.jsx         # Core trip planner logic with CO₂ calculation
│   │       ├── MapComponent.jsx        # Leaflet.js map wrapper component
│   │       ├── ARViewer.jsx            # model-viewer Web Component wrapper for AR
│   │       ├── SouvenirMaker.jsx       # HTML Canvas-based photo editor
│   │       ├── WeatherWidget.jsx       # Live weather display for New Valley
│   │       ├── SOSButton.jsx           # Emergency SOS floating button
│   │       ├── OfflineIndicator.jsx    # PWA offline status banner
│   │       ├── GovernorSection.jsx     # Governor's welcome message section
│   │       ├── TeamSection.jsx         # Development team showcase
│   │       ├── RevealOnScroll.jsx      # Framer Motion scroll-reveal animation wrapper
│   │       ├── AttractionCard.jsx      # Card component for displaying an attraction
│   │       ├── HotelCard.jsx           # Card component for displaying a hotel
│   │       └── ServiceCard.jsx         # Card component for displaying a service
│   │
│   ├── package.json                    # Node.js dependencies and npm scripts
│   └── vite.config.js                  # Vite configuration (PWA plugin, proxy, aliases)
│
├── screenshots/                        # Project screenshots (used in README/proposal)
├── README.md                           # Project overview and quick-start guide
├── Technical_Documentation.md          # This document
└── archive/                            # One-off development utility scripts (not part of the app)
```

---

## 2. System Architecture

### 2.1 Description

New Valley Hub follows a classic **decoupled SPA + REST API** architecture:

- **Frontend (React + Vite)**: A fully client-side Single Page Application. All navigation happens in the browser without full page reloads. The app communicates with the backend exclusively through REST API calls using Axios, and it is configured as a **Progressive Web App (PWA)** with a service worker for offline caching.
- **Backend (Django REST Framework)**: Exposes a JSON REST API consumed by the frontend. Authentication is handled via **JWT tokens** issued by SimpleJWT. The AI chatbot is powered by **Google Gemini API**, which is invoked server-side so the API key is never exposed to the browser.
- **Database**: SQLite is used in development for simplicity; PostgreSQL is used in production on Render.com. All database access goes through Django's ORM.
- **External Services**: Google Gemini API (AI chatbot), OpenWeatherMap (weather widget), Leaflet/OpenStreetMap (interactive maps), and Booking.com (hotel reservation links).

### 2.2 Architecture Diagram

```mermaid
graph TB
    subgraph CLIENT["🌐 Client — Browser (localhost:5173)"]
        direction TB
        PWA["React SPA (Vite + PWA)"]
        SW["Service Worker (Offline Cache)"]
        PWA <--> SW
    end

    subgraph FRONTEND_PAGES["Frontend Pages"]
        HP["HomePage"]
        AP["AttractionsPage"]
        PP["PlannerPage"]
        MM["VirtualMuseumPage (AR)"]
        MP["MarketplacePage"]
        SP["ServicesPage"]
        MT["MyTrips (Auth-gated)"]
        SV["SouvenirPage"]
    end

    subgraph SHARED_COMPONENTS["Shared Components"]
        CB["ChatbotWidget"]
        NAV["Navbar + LoginModal"]
        MAP["MapComponent (Leaflet)"]
        AR["ARViewer (model-viewer)"]
        SOS["SOSButton"]
        WW["WeatherWidget"]
    end

    subgraph BACKEND["🐍 Django Backend (localhost:8000)"]
        direction TB
        DRF["Django REST Framework"]
        JWT_AUTH["SimpleJWT Auth Middleware"]
        subgraph APPS["Django Apps"]
            TU["tourism/"]
            HO["hospitality/"]
            SV2["services/"]
            MK["marketplace/"]
        end
        DRF --> APPS
        DRF --> JWT_AUTH
    end

    subgraph DATABASE["🗄️ Database"]
        SQLITE["SQLite (Development)"]
        POSTGRES["PostgreSQL (Production)"]
    end

    subgraph EXTERNAL["☁️ External Services"]
        GEMINI["Google Gemini API\n(AI Chatbot)"]
        OWM["OpenWeatherMap\n(Weather Data)"]
        OSM["OpenStreetMap / Leaflet\n(Map Tiles)"]
        BOOKING["Booking.com\n(Hotel Reservations)"]
    end

    PWA -- "Axios REST Calls (JSON + JWT Bearer)" --> BACKEND
    BACKEND --> DATABASE
    BACKEND -- "genai.configure() → generate_content()" --> GEMINI
    WW -- "fetch() weather API" --> OWM
    MAP -- "tile requests" --> OSM
    CB -- "POST /api/tourism/chat/" --> BACKEND
    NAV -- "POST /api/auth/token/" --> BACKEND
```

---

## 3. Entity-Relationship Diagram (ERD)

The following ERD is derived directly from the Django models in the codebase. `BaseLocationModel` is an **abstract** model whose fields (`name`, `description`, `image`, `latitude`, `longitude`, `address`, `created_at`, `updated_at`) are inherited and embedded into each concrete table.

```mermaid
erDiagram
    AUTH_USER {
        int id PK
        string username
        string email
        string password
    }

    ATTRACTION {
        int id PK
        string name
        text description
        string image
        decimal latitude
        decimal longitude
        string address
        datetime created_at
        datetime updated_at
        string attraction_type
        int visit_duration_minutes
        time opening_time
        time closing_time
        decimal ticket_price
    }

    HOTEL {
        int id PK
        string name
        text description
        string image
        decimal latitude
        decimal longitude
        string address
        datetime created_at
        datetime updated_at
        int stars
        string booking_url
        string google_map_url
        string contact_email
        string phone_number
        string price_range
    }

    SERVICE_CATEGORY {
        int id PK
        string name
        string slug
        int parent_id FK
        int order
        text description
    }

    SERVICE {
        int id PK
        string name
        text description
        int category_id FK
        string phone_number
        string website
        string email
        string address
        decimal latitude
        decimal longitude
        bool is_emergency
        bool is_24_hours
        time opening_time
        time closing_time
        string image
        datetime created_at
        datetime updated_at
    }

    PRODUCT {
        int id PK
        string name
        text description
        decimal price
        string image
        string seller_name
        string seller_contact
        datetime created_at
    }

    MUSEUM_ARTIFACT {
        int id PK
        string name
        text description
        string image
        string image_url
        file model_3d_file
        int related_attraction_id FK
        int order
        datetime created_at
        datetime updated_at
    }

    SOUVENIR_ASSET {
        int id PK
        string name
        string category
        file image_file
        string image_url
        bool is_premium
        int display_order
        datetime created_at
        datetime updated_at
    }

    TEAM_MEMBER {
        int id PK
        string name
        string role
        file photo
        string photo_url
        string profile_url
    }

    GOVERNOR_PROFILE {
        int id PK
        string name
        string title
        file photo
        string welcome_heading
        text welcome_message
        text career_highlights
    }

    SITE_CONFIGURATION {
        int id PK
        string gemini_api_key
        datetime updated_at
    }

    USER_SAVED_TRIP {
        int id PK
        int user_id FK
        string transport_mode
        decimal total_co2
        json route_data
        datetime created_at
    }

    USER_SAVED_SOUVENIR {
        int id PK
        int user_id FK
        text image_data
        string caption
        datetime created_at
    }

    %% Relationships
    AUTH_USER ||--o{ USER_SAVED_TRIP : "saves"
    AUTH_USER ||--o{ USER_SAVED_SOUVENIR : "saves"
    ATTRACTION ||--o{ MUSEUM_ARTIFACT : "has artifacts"
    SERVICE_CATEGORY ||--o{ SERVICE : "categorizes"
    SERVICE_CATEGORY ||--o{ SERVICE_CATEGORY : "has subcategories"
```

---

## 4. Use Case Diagram

Three actors interact with the system: **Guest** (unauthenticated visitor), **Registered User** (authenticated), and **Admin** (Django admin panel).

```mermaid
flowchart LR
    %% ── Actors (outside the system boundary) ──────────────────────────────
    GUEST["🧍 Guest\n(Unregistered User)"]
    USER["🧍 Registered User"]
    ADMIN["🧍 Admin"]

    %% ── System Boundary ───────────────────────────────────────────────────
    subgraph SYS["New Valley Hub System"]

        %% Public Use Cases
        UC1(["Browse Attractions"])
        UC2(["Browse Hotels"])
        UC3(["Browse Local Services"])
        UC4(["View Interactive Map"])
        UC5(["Chat with AI Guide"])
        UC6(["Global Search"])
        UC7(["Browse Marketplace"])
        UC8(["View Virtual Museum / AR"])
        UC9(["Create Digital Souvenir"])
        UC10(["Plan Trip & Calculate CO₂"])
        UC11(["Register / Login"])

        %% Auth-gated Use Cases
        UC12(["Save Trip to Account"])
        UC13(["Save Souvenir to Account"])
        UC14(["View My Saved Trips"])
        UC15(["Delete Saved Item"])

        %% Admin Use Cases
        UC16(["Manage Content CRUD"])
        UC17(["Configure Gemini API Key"])
        UC18(["Manage Users"])

        %% Intermediate / Relationship Nodes
        AUTH(["Authentication"])
        JWT(["JWT Token Issued"])
        AUTHCHECK(["Check Auth Token"])

        %% ── <<include>> / <<extend>> relationships ──────────────────────
        UC11 -. "<<include>>" .-> AUTH
        AUTH -. "<<extend>>" .-> JWT

        UC12 -. "<<include>>" .-> AUTHCHECK
        UC13 -. "<<include>>" .-> AUTHCHECK
        UC14 -. "<<include>>" .-> AUTHCHECK
        UC15 -. "<<extend>>"  .-> UC14

        UC5  -. "<<include>>" .-> UC6
    end

    %% ── Guest associations ───────────────────────────────────────────────
    GUEST --> UC1
    GUEST --> UC2
    GUEST --> UC3
    GUEST --> UC4
    GUEST --> UC5
    GUEST --> UC7
    GUEST --> UC8
    GUEST --> UC9
    GUEST --> UC10
    GUEST --> UC11

    %% ── Registered User associations ─────────────────────────────────────
    USER --> UC1
    USER --> UC2
    USER --> UC3
    USER --> UC4
    USER --> UC5
    USER --> UC6
    USER --> UC7
    USER --> UC8
    USER --> UC9
    USER --> UC10
    USER --> UC12
    USER --> UC13
    USER --> UC14

    %% ── Admin associations ───────────────────────────────────────────────
    ADMIN --> UC16
    ADMIN --> UC17
    ADMIN --> UC18
```

---

## 5. Sequence Diagram — AI Chatbot Flow

This sequence traces the complete lifecycle of a user sending a message to the "Am Sa3eed" AI chatbot — from the browser click all the way to the Gemini API response rendered on screen.

```mermaid
sequenceDiagram
    actor User
    participant ChatbotWidget as ChatbotWidget.jsx
    participant AxiosAPI as api.js (Axios)
    participant DjangoView as ChatAPIView (chat_view.py)
    participant ORM as Django ORM
    participant DB as SQLite / PostgreSQL
    participant Gemini as Google Gemini API

    User->>ChatbotWidget: Types message & clicks Send
    ChatbotWidget->>AxiosAPI: POST /api/tourism/chat/ {message: "Tell me about White Desert"}
    AxiosAPI->>DjangoView: HTTP POST with JSON body

    Note over DjangoView: Validate — message must not be empty

    DjangoView->>DjangoView: Load GEMINI_API_KEY from os.getenv()
    DjangoView->>DjangoView: genai.configure(api_key=...)<br/>model = GenerativeModel('gemini-pro')

    Note over DjangoView: Context Search — "Brain" Phase

    DjangoView->>ORM: Attraction.objects.filter(Q(name__icontains=msg) | Q(description__icontains=msg))[:3]
    ORM->>DB: SELECT * FROM tourism_attraction WHERE ...
    DB-->>ORM: Matching attraction rows
    ORM-->>DjangoView: Attraction QuerySet

    DjangoView->>ORM: Hotel.objects.filter(Q(name__icontains=msg) | Q(description__icontains=msg))[:3]
    ORM->>DB: SELECT * FROM hospitality_hotel WHERE ...
    DB-->>ORM: Matching hotel rows
    ORM-->>DjangoView: Hotel QuerySet

    DjangoView->>ORM: Product.objects.filter(Q(name__icontains=msg) | Q(description__icontains=msg))[:3]
    ORM->>DB: SELECT * FROM marketplace_product WHERE ...
    DB-->>ORM: Matching product rows
    ORM-->>DjangoView: Product QuerySet

    Note over DjangoView: Build context string from all DB results

    DjangoView->>DjangoView: Compose system_prompt with persona<br/>("Am Sa3eed") + DB context + user question

    DjangoView->>Gemini: model.generate_content(system_prompt)
    Gemini-->>DjangoView: response.text (AI reply in character)

    DjangoView-->>AxiosAPI: HTTP 200 JSON {response: "Ya habibi! White Desert is..."}
    AxiosAPI-->>ChatbotWidget: response.data.response
    ChatbotWidget->>User: Displays AI response in chat bubble
```

---

## 6. User Guide

---

### 6.1 End-User Guide

#### a) About New Valley Hub

New Valley Hub is a web-based smart tourism platform designed to help visitors and residents explore Al Wadi Al Jadid (the New Valley Governorate) in Egypt. The platform consolidates tourism, hospitality, local services, and cultural heritage into a single, elegant, and accessible digital destination.

If you are a New Valley Hub user, you will have access to the following functionalities:

1. Create a personal account and log in securely
2. Browse historical, natural, and cultural tourist attractions
3. Find and book hotels across the oases
4. Discover local services (hospitals, restaurants, banks, pharmacies)
5. Plan a full trip itinerary with a CO₂ carbon footprint calculator
6. Chat with an AI-powered local guide ("Am Sa3eed")
7. Explore a 3D Virtual Museum with Augmented Reality support
8. Create and save personalised digital souvenirs
9. Browse the local marketplace for authentic New Valley products
10. Use the interactive map to navigate all points of interest

---

#### b) Security in New Valley Hub

User authentication in New Valley Hub is handled using **JSON Web Tokens (JWT)**. When a user registers or logs in, the server issues a short-lived **Access Token** (valid for 1 day) and a long-lived **Refresh Token** (valid for 30 days). These tokens are stored in the browser's `localStorage`.

All protected actions — such as saving a trip or a souvenir — require a valid Bearer token to be sent with every request. The token is automatically attached by the frontend's Axios instance. No sensitive user data is ever handled on the client side beyond the token itself.

The Gemini AI API key is stored exclusively on the server as an environment variable and is never transmitted to the browser, preventing any exposure of credentials.

---

#### c) Step-by-Step Guide

---

##### 1. Opening the Application

Open your web browser and navigate to the New Valley Hub website.

![New Valley Hub homepage hero section](./screenshots/home.jpg)

**Figure 1** — *New Valley Hub Home Page*

Upon opening the application, you are greeted with the homepage featuring a full-screen hero banner, a top navigation bar with all key sections, a floating AI chatbot button, and an emergency SOS button.

---

##### 2. Registering a New Account

Click the **Login** button located in the top-right corner of the navigation bar.

![Navbar Login button highlighted](./screenshots/Login-button-highlighted.jpg)

**Figure 2** — *Navigation Bar with Login Button*

A modal dialog will appear. Switch to the **Register** tab by clicking on it.

![Login/Register modal — Register tab selected](./screenshots/Register-tab-unExisting.png)

**Figure 3** — *Register Tab in the Login Modal*

Enter your **email address** and a **password**, then click **Create Account**. You will be automatically logged in upon successful registration. Ensure your password is secure: use a mix of uppercase, lowercase, numbers, and symbols.

---

##### 3. Logging In to an Existing Account

Click the **Login** button in the navigation bar. In the modal, ensure the **Login** tab is selected. Enter your registered **email** and **password**, then click **Sign In**.

![Login modal with email and password fields filled](./screenshots/Register-tab-Existing.png)

**Figure 4** — *Login Screen with Credentials*

Upon a successful login, your name/email will appear in the navbar and you will gain access to features such as Saving Trips and My Trips.

---

##### 4. Browsing Attractions

Click **Attractions** in the top navigation bar.

![Attractions page showing grid of attraction cards](./screenshots/attractions.png)

**Figure 5** — *Attractions Page — Grid View*

You will be presented with a grid of all tourist attractions in New Valley, including historical sites, natural reserves, and cultural centres. You can filter the results by attraction type using the filter buttons at the top of the page. Click on any card to see its full details, including opening hours, ticket price, visit duration, and location on the map.

---

##### 5. Finding a Hotel

Click **Hotels** in the navigation bar to browse available accommodation across the oases.

![Hotels page showing hotel cards with star ratings and price range](./screenshots/hotels.png)

**Figure 6** — *Hotels Page — Available Accommodation*

Each hotel card displays the hotel name, star rating, price range indicator ($, $$, $$$), contact details, and a direct **Book Now** link that redirects to Booking.com for reservations.

---

##### 6. Exploring Local Services

Click **Services** in the navigation bar to access the services directory.

![Services page with category filter tabs — Hospitals, Restaurants, Banks, etc.](./screenshots/services.png)

**Figure 7** — *Services Page — Category Filter View*

Services are organised into hierarchical categories such as Medical, Dining, Banking, and Transportation. Use the category filter tabs to narrow down the list. Emergency services are highlighted with a special indicator and are always displayed at the top of the list.

---

##### 7. Using the Interactive Map

Click **Map** in the navigation bar to open the interactive map.

![Map page with Leaflet map showing coloured markers for attractions, hotels, and services](./screenshots/map.png)

**Figure 8** — *Interactive Map — All Points of Interest*

The map displays all attractions, hotels, and services as clickable markers. Click any marker to see a popup with the name, category, and address of that location. You can zoom in and out and drag the map to navigate across all oases.

---

##### 8. Planning a Trip

Click **Planner** in the navigation bar to open the AI-powered trip planner.

![Planner page showing location selection, transport mode picker, and itinerary list](./screenshots/planner.png)

**Figure 9** — *Trip Planner — Itinerary Builder*

Search for and add locations to your itinerary using the search field. Select your preferred **transport mode** (car, bus, walking, or bicycle) to calculate the estimated **CO₂ carbon footprint** of your trip. Once you are satisfied with your itinerary, click **Save Trip** (requires login) to save it to your account for future reference.

---

##### 9. Chatting with the AI Guide

Click the **floating chat icon** in the bottom-right corner of any page to open the AI chatbot.

![AI chatbot widget open with a sample conversation — question about White Desert](./screenshots/chatbot.png)

**Figure 10** — *AI Chatbot Widget ("Am Sa3eed")*

Type your question in the input field and press **Send**. The chatbot, "Am Sa3eed (عم سعيد)", is a friendly AI local guide who answers questions about New Valley's attractions, hotels, history, and culture in a warm, conversational tone mixing English and Egyptian Arabic. The AI searches the live database before responding, so answers are grounded in actual platform data.

---

##### 10. Visiting the Virtual Museum

Click **Museum** in the navigation bar to access the Virtual Museum.

![Virtual Museum page with 3D artifact cards displayed in a grid](./screenshots/museum.png)

**Figure 11** — *Virtual Museum — 3D Artifact Gallery*

The Virtual Museum displays a collection of historical 3D artifacts from New Valley. Click on any artifact to load its interactive 3D model viewer. On a mobile device, tap the **AR button** (cube icon) to view the artifact in Augmented Reality — placed in your physical environment through your phone's camera.

---

##### 11. Creating a Digital Souvenir

Click **Souvenir** in the navigation bar to open the Souvenir Maker.

![Souvenir Maker editor with photo canvas, asset panel, and sticker options](./screenshots/souvenir.png)

**Figure 12** — *Souvenir Maker — Photo Editor*

Upload a personal photo using the **Upload Photo** button. Then browse the available backgrounds, stickers, and frames on the side panel and click them to apply them to your canvas. Add a custom text caption if desired. When satisfied, click **Download** to save the image to your device, or click **Save to My Account** (requires login) to store it in your profile.

---

##### 12. Browsing the Marketplace

Click **Marketplace** in the navigation bar to browse local New Valley products.

![Marketplace page showing product cards with prices and seller information](./screenshots/marketplace.png)

**Figure 13** — *Marketplace — Local Products*

Each product card displays the product name, description, price, and seller contact information. The marketplace features authentic New Valley crafts, dates, ceramics, and other local goods. Contact the seller directly using the displayed contact information to make a purchase.

---

##### 13. Viewing & Managing Saved Trips

Click **My Trips** in the navigation bar (requires login).

![My Trips page showing a list of saved trip cards with route data and CO₂ values](./screenshots/dashboard.png)

**Figure 14** — *My Trips Dashboard*

All your previously saved trips are displayed as cards, showing the transport mode, total CO₂ footprint, route details, and the date they were saved. Click the **Delete** button on any card to permanently remove that trip from your account.

---

##### 14. Using the SOS Emergency Button

Click the **red floating SOS button** located in the bottom-left corner of any page.

![SOS modal open showing emergency contact numbers for police, ambulance, and fire brigade](./screenshots/SOS.png)

**Figure 15** — *Emergency SOS Panel*

The SOS panel displays the official emergency contact numbers for New Valley Governorate, including Police, Ambulance, and Fire Brigade. This feature is always accessible regardless of login status and is designed to work in offline mode via the PWA service worker.

---

##### 15. Logging Out

To log out, click on your user avatar or email in the top-right corner of the navigation bar, then click **Logout**.

![Navbar user menu with Logout option highlighted](./screenshots/logout.jpg)

**Figure 16** — *Logout from the Navigation Bar*

You will be immediately logged out, your JWT tokens will be cleared from localStorage, and you will be redirected to the homepage as a guest.

---

### 6.2 Developer Guide

#### Prerequisites

Ensure the following tools are installed on your system before beginning:

| Tool | Required Version |
|---|---|
| Python | 3.11 or higher |
| Node.js | 18 or higher |
| npm | 9 or higher |
| Git | Any recent version |

---

#### Step 1 — Clone the Repository

```bash
git clone https://github.com/karim238253/new-valley-hub.git
cd new-valley-hub
```

---

#### Step 2 — Create the Python Virtual Environment

```bash
# From the project root directory
python -m venv .venv

# Activate on Windows
.venv\Scripts\activate

# Activate on macOS / Linux
source .venv/bin/activate
```

---

#### Step 3 — Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
```

---

#### Step 4 — Configure Environment Variables

Create a file named `.env` inside the `backend/` directory with the following content:

```env
# Django secret key — generate a new one for your environment
SECRET_KEY=your-very-secret-django-key-here

# Set to False in production
DEBUG=True

# Comma-separated list of allowed hosts
ALLOWED_HOSTS=localhost,127.0.0.1

# Required — powers the AI chatbot feature
GEMINI_API_KEY=your-google-gemini-api-key-here

# Optional — leave blank to use SQLite (default for local development)
# DATABASE_URL=postgresql://user:password@host:port/dbname

# Optional — only required in production deployment
# FRONTEND_URL=https://your-production-frontend-url.com
```

> **Getting a Gemini API Key**: Visit [Google AI Studio](https://aistudio.google.com/app/apikey), sign in with a Google account, and generate a free API key.

---

#### Step 5 — Run Database Migrations

```bash
# From the backend/ directory, with the virtual environment active
python manage.py migrate

# Optional: Create a superuser for Django admin panel access
python manage.py createsuperuser
```

---

#### Step 6 — Start the Backend Server

```bash
# From the backend/ directory
python manage.py runserver
```

The Django API will be available at: `http://127.0.0.1:8000/api/`

---

#### Step 7 — Install Frontend Dependencies

Open a **new terminal window** (keep the backend running):

```bash
# From the project root
cd frontend
npm install
```

---

#### Step 8 — Start the Frontend Development Server

```bash
# From the frontend/ directory
npm run dev
```

The React SPA will be available at: `http://localhost:5173`

---

#### Step 9 — Access the Application

| URL | Description |
|---|---|
| `http://localhost:5173` | Main React SPA (the website) |
| `http://127.0.0.1:8000/api/` | DRF Browsable API root |
| `http://127.0.0.1:8000/admin/` | Django admin panel |

---

#### API Endpoint Reference

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/tourism/attractions/` | List all tourist attractions | No |
| GET | `/api/tourism/museum-artifacts/` | List 3D museum artifacts | No |
| GET | `/api/tourism/souvenir-assets/` | List souvenir maker assets | No |
| GET | `/api/tourism/team/` | List team members | No |
| GET | `/api/tourism/governor/` | Governor profile data | No |
| GET | `/api/tourism/search/?q=...` | Global cross-model search | No |
| POST | `/api/tourism/chat/` | Send message to AI chatbot | No |
| GET | `/api/hospitality/hotels/` | List all hotels | No |
| GET | `/api/services/items/` | List all local services | No |
| GET | `/api/services/categories/` | List service categories | No |
| GET | `/api/marketplace/products/` | List marketplace products | No |
| POST | `/api/auth/register/` | Register a new user account | No |
| POST | `/api/auth/token/` | Login — returns access & refresh tokens | No |
| POST | `/api/auth/token/refresh/` | Refresh expired access token | No |
| GET | `/api/auth/save-trip/` | Get current user's saved trips | **JWT** |
| POST | `/api/auth/save-trip/` | Save a new trip | **JWT** |
| DELETE | `/api/auth/save-trip/<id>/` | Delete a saved trip by ID | **JWT** |
| GET | `/api/auth/souvenirs/` | Get current user's saved souvenirs | **JWT** |
| POST | `/api/auth/souvenirs/` | Save a new souvenir | **JWT** |
| DELETE | `/api/auth/souvenirs/<id>/` | Delete a saved souvenir by ID | **JWT** |

---

*Documentation generated from full codebase analysis — April 2026.*
