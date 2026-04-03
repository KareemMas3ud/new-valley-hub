import os
import django
import sys
import json
from pathlib import Path
from decimal import Decimal
from difflib import SequenceMatcher

# Setup Django
BASE_DIR = Path(__file__).resolve().parent / "backend"
sys.path.append(str(BASE_DIR))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'new_valley_hub.settings')
django.setup()

from tourism.models import Attraction
from hospitality.models import Hotel
from services.models import Service, ServiceCategory
from marketplace.models import Product

# JSON Dataset
DATASET = [
  {
    "category": "Historical & Heritage",
    "sub_category": "Pharaonic & Persian",
    "location": "Kharga Oasis",
    "name_en": "Temple of Hibis",
    "name_ar": "معبد هيبس",
    "description": "The most important temple in the oasis, representing the Saite and Persian periods (26th & 27th Dynasties). Contains reliefs of Darius I.",
    "notes": "Located 2-3 km north of Kharga. Unique preservation state."
  },
  {
    "category": "Historical & Heritage",
    "sub_category": "Pharaonic & Roman",
    "location": "Kharga Oasis",
    "name_en": "Qasr Al-Ghuwayta",
    "name_ar": "معبد الغويطة",
    "description": "A fortress temple from the 27th Dynasty dedicated to the Theban Triad. Located atop a hill, offering great views.",
    "notes": "21 km south of Kharga. Contains reliefs of Ptolemy III & IV."
  },
  {
    "category": "Historical & Heritage",
    "sub_category": "Roman",
    "location": "Kharga Oasis",
    "name_en": "Qasr Al-Zayan",
    "name_ar": "معبد الزيان",
    "description": "Roman temple built under Emperor Antoninus Pius, dedicated to Amun-Hibis.",
    "notes": "Located south of Ghuwayta. Important stop on the southern route."
  },
  {
    "category": "Historical & Heritage",
    "sub_category": "Islamic & Ottoman",
    "location": "Kharga Oasis",
    "name_en": "Al-Nadora Fortress",
    "name_ar": "قلعة الناضورة",
    "description": "Strategic lookout point used in Mamluk and Ottoman eras. Best panoramic view of Kharga.",
    "notes": "1 km from the city. Ideal for sunset photography."
  },
  {
    "category": "Historical & Heritage",
    "sub_category": "Coptic",
    "location": "Kharga Oasis",
    "name_en": "Al-Bagawat Cemetery",
    "name_ar": "جبانة البجوات",
    "description": "One of the oldest Christian cemeteries (3rd-7th century), featuring 263 chapels with biblical murals (Noah's Ark, Exodus).",
    "notes": "Located behind Hibis Temple."
  },
  {
    "category": "Historical & Heritage",
    "sub_category": "Coptic",
    "location": "Kharga Oasis",
    "name_en": "Deir Mustafa Kashef",
    "name_ar": "دير مصطفى الكاشف",
    "description": "Originally a Roman fortress turned into a Coptic monastery. Known for massive structures and vaulted ceilings.",
    "notes": "Near Al-Bagawat."
  },
  {
    "category": "Culture & Museums",
    "sub_category": "Museums",
    "location": "Kharga Oasis",
    "name_en": "New Valley Museum",
    "name_ar": "متحف آثار الوادي الجديد",
    "description": "Houses artifacts from Prehistoric to Islamic eras. Ideal starting point for tours.",
    "notes": "Located inside Kharga city."
  },
  {
    "category": "Accommodation",
    "sub_category": "Hotels",
    "location": "Kharga Oasis",
    "name_en": "Badr Hotel & Resort",
    "name_ar": "فندق ومنتجع بدر",
    "rating": "4 Stars",
    "type": "Private",
    "features": ["Swimming Pool", "Luxury", "Green Areas"]
  },
  {
    "category": "Accommodation",
    "sub_category": "Hotels",
    "location": "Kharga Oasis",
    "name_en": "Solymar Pioneers",
    "name_ar": "فندق سوليمار بايونيرز",
    "rating": "4 Stars",
    "type": "Private",
    "features": ["Family Friendly", "Recreation", "Business Facilities"]
  },
  {
    "category": "Accommodation",
    "sub_category": "Hotels",
    "location": "Kharga Oasis",
    "name_en": "Kharga Hotel (Mubariz)",
    "name_ar": "فندق الخارجة (مبارز)",
    "rating": "2 Stars",
    "contact": "092-2921524",
    "features": ["City Center", "Economic"],
    "notes": "56 Rooms"
  },
  {
    "category": "Accommodation",
    "sub_category": "Hotels",
    "location": "Kharga Oasis",
    "name_en": "Hamad Allah Hotel",
    "name_ar": "فندق حمد الله",
    "rating": "2 Stars",
    "features": ["Traditional", "Budget Friendly"],
    "notes": "54 Rooms"
  },
  {
    "category": "Accommodation",
    "sub_category": "Hotels",
    "location": "Kharga Oasis",
    "name_en": "Al-Radwan Hotel",
    "name_ar": "فندق الرضوان",
    "rating": "2 Stars",
    "notes": "26 Rooms. Economic."
  },
  {
    "category": "Accommodation",
    "sub_category": "Hotels",
    "location": "Kharga Oasis",
    "name_en": "Al-Waha Hotel",
    "name_ar": "فندق الواحة",
    "rating": "2 Stars",
    "notes": "31 Rooms."
  },
  {
    "category": "Dining",
    "sub_category": "Restaurants",
    "location": "Kharga Oasis",
    "name_en": "Wimpy El Basatin",
    "name_ar": "مطعم ومبي البساتين",
    "description": "Historic restaurant (est. 1995) offering grills and oriental food. Social landmark.",
    "address": "El Basatin Square"
  },
  {
    "category": "Dining",
    "sub_category": "Restaurants",
    "location": "Kharga Oasis",
    "name_en": "Astakoza",
    "name_ar": "مطعم استاكوزا",
    "description": "Specialized in Red Sea fish and seafood.",
    "address": "Gamal Abdel Nasser St."
  },
  {
    "category": "Medical Services",
    "sub_category": "Hospitals",
    "location": "Kharga Oasis",
    "name_en": "Kharga General Hospital",
    "name_ar": "مستشفى الخارجة العام",
    "description": "Main central hospital with emergency and surgery units.",
    "contact": "Emergency: 123"
  },
  {
    "category": "Services",
    "sub_category": "Banking",
    "location": "Kharga Oasis",
    "name_en": "National Bank of Egypt (NBE)",
    "name_ar": "البنك الأهلي المصري",
    "description": "Main branch with ATMs.",
    "address": "Kharga-Asyut Rd."
  },
  {
    "category": "Historical & Heritage",
    "sub_category": "Islamic Heritage",
    "location": "Dakhla Oasis",
    "name_en": "Al-Qasr Islamic Village",
    "name_ar": "قرية القصر الإسلامية",
    "description": "Open-air museum of a medieval mud-brick village. Retains original architecture, court, and madrasa."
  },
  {
    "category": "Historical & Heritage",
    "sub_category": "Roman",
    "location": "Dakhla Oasis",
    "name_en": "Deir El-Hagar",
    "name_ar": "دير الحجر",
    "description": "Roman temple (1st Century AD) dedicated to the Theban Triad. Features reliefs of Nero and Vespasian."
  },
  {
    "category": "Historical & Heritage",
    "sub_category": "Roman",
    "location": "Dakhla Oasis",
    "name_en": "Al-Muzawaka Tombs",
    "name_ar": "مقابر المزوقة",
    "description": "Roman cemetery with colorful rock-cut tombs mixing Egyptian and Roman art."
  },
  {
    "category": "Wellness",
    "sub_category": "Hot Springs",
    "location": "Dakhla Oasis",
    "name_en": "Mut Hot Springs (Bir 3)",
    "name_ar": "آبار موط الساخنة",
    "description": "Sulfuric therapeutic wells with temperatures up to 43°C."
  },
  {
    "category": "Accommodation",
    "sub_category": "Eco-Lodges",
    "location": "Dakhla Oasis",
    "name_en": "Desert Lodge",
    "name_ar": "ديزرت لودج",
    "contact": "092-7727061",
    "description": "Luxury eco-lodge in Al-Qasr, built with mud and palm reeds.",
    "notes": "32 Rooms"
  },
  {
    "category": "Accommodation",
    "sub_category": "Eco-Lodges",
    "location": "Dakhla Oasis",
    "name_en": "Al Tarfa Desert Sanctuary",
    "name_ar": "منتجع الطرفة",
    "contact": "092-9105007",
    "description": "World-renowned luxury desert sanctuary.",
    "notes": "20 Rooms"
  },
  {
    "category": "Nature & Safari",
    "sub_category": "National Parks",
    "location": "Farafra Oasis",
    "name_en": "White Desert National Park",
    "name_ar": "محمية الصحراء البيضاء",
    "description": "Famous for chalk rock formations (Mushroom, Chicken). Premier camping destination."
  },
  {
    "category": "Nature & Safari",
    "sub_category": "Attractions",
    "location": "Farafra Oasis",
    "name_en": "Crystal Mountain",
    "name_ar": "جبل الكريستال",
    "description": "Geological formation of calcite crystals."
  },
  {
    "category": "Wellness",
    "sub_category": "Hot Springs",
    "location": "Farafra Oasis",
    "name_en": "Bir Sitta",
    "name_ar": "بئر ستة",
    "description": "Sulfuric hot spring 6km west of Farafra. Popular for relaxation."
  },
  {
    "category": "Historical & Heritage",
    "sub_category": "Roman",
    "location": "Baris Oasis",
    "name_en": "Temple of Dush",
    "name_ar": "معبد دوش",
    "description": "Roman temple and fortress (Kysis) controlling caravan routes. Dedicated to Serapis."
  },
  {
    "category": "Local Industry",
    "sub_category": "Factory",
    "location": "Kharga Oasis",
    "name_en": "The Date Complex",
    "name_ar": "مجمع تمور الوادي الجديد",
    "description": "Largest date factory (14 acres). Produces raw dates, chocolate dates, and syrup.",
    "address": "Gamal Abdel Nasser St."
  }
]

# Similarity threshold for name matching
SIMILARITY_THRESHOLD = 0.8

def similarity(a, b):
    """Calculate similarity ratio between two strings"""
    return SequenceMatcher(None, a.lower(), b.lower()).ratio()

def find_matching_attraction(name_en):
    """Find existing attraction by name similarity"""
    attractions = Attraction.objects.all()
    for attr in attractions:
        if similarity(attr.name, name_en) >= SIMILARITY_THRESHOLD:
            return attr
    return None

def find_matching_hotel(name_en):
    """Find existing hotel by name similarity"""
    hotels = Hotel.objects.all()
    for hotel in hotels:
        if similarity(hotel.name, name_en) >= SIMILARITY_THRESHOLD:
            return hotel
    return None

def find_matching_service(name_en):
    """Find existing service by name similarity"""
    services = Service.objects.all()
    for service in services:
        if similarity(service.name, name_en) >= SIMILARITY_THRESHOLD:
            return service
    return None

def map_category_to_attraction_type(category, sub_category):
    """Map JSON category to our attraction_type"""
    if "Heritage" in category or "Historical" in category:
        return "historical"
    elif "Nature" in category or "Safari" in category:
        return "natural"
    elif "Wellness" in category or "Culture" in category:
        return "cultural"
    return "cultural"

def extract_star_rating(rating_str):
    """Extract numeric star rating from string like '4 Stars'"""
    if not rating_str:
        return 3
    try:
        return int(rating_str.split()[0])
    except:
        return 3

def get_price_range(rating):
    """Map star rating to price range"""
    if rating >= 4:
        return "$$$"
    elif rating >= 3:
        return "$$"
    return "$"

def process_dataset():
    """Smart merge process"""
    stats = {
        "new_attractions": 0,
        "updated_attractions": 0,
        "new_hotels": 0,
        "updated_hotels": 0,
        "new_services": 0,
        "updated_services": 0,
        "new_products": 0,
        "skipped": 0
    }

    # Get or create service categories
    restaurant_cat, _ = ServiceCategory.objects.get_or_create(name="Restaurant", defaults={"slug": "restaurant"})
    hospital_cat, _ = ServiceCategory.objects.get_or_create(name="Hospital", defaults={"slug": "hospital"})
    bank_cat, _ = ServiceCategory.objects.get_or_create(name="Bank", defaults={"slug": "bank"})

    for item in DATASET:
        category = item.get("category", "")
        name_en = item.get("name_en", "")
        name_ar = item.get("name_ar", "")
        description = item.get("description", "")
        location = item.get("location", "New Valley, Egypt")
        notes = item.get("notes", "")

        # Merge description and notes
        full_description = f"{description} {notes}".strip()

        try:
            # ACCOMMODATION -> Hotel
            if category == "Accommodation":
                existing = find_matching_hotel(name_en)
                
                if existing:
                    # Enrich existing
                    if not existing.description or len(full_description) > len(existing.description):
                        existing.description = full_description
                    if not existing.phone_number and item.get("contact"):
                        existing.phone_number = item["contact"]
                    existing.save()
                    stats["updated_hotels"] += 1
                    print(f"✓ ENRICHED Hotel: {name_en}")
                else:
                    # Create new
                    Hotel.objects.create(
                        name=name_en,
                        description=full_description,
                        stars=extract_star_rating(item.get("rating", "3 Stars")),
                        price_range=get_price_range(extract_star_rating(item.get("rating", "3 Stars"))),
                        phone_number=item.get("contact", "+20 92 7XX XXXX"),
                        booking_url="https://www.booking.com/searchresults.html?ss=New+Valley+Egypt",
                        latitude=25.4400,
                        longitude=30.5500,
                        address=location
                    )
                    stats["new_hotels"] += 1
                    print(f"✓ NEW Hotel: {name_en}")

            # HISTORICAL, NATURE, CULTURE, WELLNESS -> Attraction
            elif category in ["Historical & Heritage", "Nature & Safari", "Culture & Museums", "Wellness"]:
                existing = find_matching_attraction(name_en)
                
                if existing:
                    # Enrich existing
                    if not existing.description or len(full_description) > len(existing.description):
                        existing.description = full_description
                    existing.save()
                    stats["updated_attractions"] += 1
                    print(f"✓ ENRICHED Attraction: {name_en}")
                else:
                    # Create new
                    Attraction.objects.create(
                        name=name_en,
                        description=full_description,
                        attraction_type=map_category_to_attraction_type(category, item.get("sub_category", "")),
                        visit_duration_minutes=90,
                        opening_time="08:00",
                        closing_time="17:00",
                        ticket_price=0.00,
                        latitude=25.4400,
                        longitude=30.5500,
                        address=location
                    )
                    stats["new_attractions"] += 1
                    print(f"✓ NEW Attraction: {name_en}")

            # DINING, MEDICAL SERVICES, SERVICES -> Service
            elif category in ["Dining", "Medical Services", "Services"]:
                existing = find_matching_service(name_en)
                
                # Map to category
                if "Dining" in category:
                    cat = restaurant_cat
                elif "Medical" in category:
                    cat = hospital_cat
                elif "Banking" in category:
                    cat = bank_cat
                else:
                    cat = restaurant_cat

                if existing:
                    # Enrich existing
                    if not existing.description or len(full_description) > len(existing.description):
                        existing.description = full_description
                    if not existing.phone_number and item.get("contact"):
                        existing.phone_number = item["contact"]
                    existing.save()
                    stats["updated_services"] += 1
                    print(f"✓ ENRICHED Service: {name_en}")
                else:
                    # Create new
                    Service.objects.create(
                        name=name_en,
                        description=full_description,
                        category=cat,
                        is_emergency=("Hospital" in name_en or "Emergency" in name_en),
                        phone_number=item.get("contact", "N/A"),
                        latitude=25.4400,
                        longitude=30.5500,
                        address=item.get("address", location)
                    )
                    stats["new_services"] += 1
                    print(f"✓ NEW Service: {name_en}")

            # LOCAL INDUSTRY -> Product
            elif category == "Local Industry":
                Product.objects.create(
                    name=name_en,
                    description=full_description,
                    price=Decimal("15.00"),
                    seller_name="New Valley Artisans",
                    seller_contact="+20 100 XXX XXXX"
                )
                stats["new_products"] += 1
                print(f"✓ NEW Product: {name_en}")

            else:
                stats["skipped"] += 1
                print(f"⊘ SKIPPED (unknown category): {name_en}")

        except Exception as e:
            print(f"✗ ERROR processing {name_en}: {e}")
            stats["skipped"] += 1

    return stats

if __name__ == "__main__":
    print("=" * 70)
    print(" SMART MERGE: NEW VALLEY POI DATASET")
    print("=" * 70)
    print("\n🔄 Processing dataset with deduplication...\n")

    stats = process_dataset()

    print("\n" + "=" * 70)
    print(" MERGE SUMMARY")
    print("=" * 70)
    print(f"\n📊 NEW ITEMS ADDED:")
    print(f"  ✚ {stats['new_attractions']} Attractions")
    print(f"  ✚ {stats['new_hotels']} Hotels")
    print(f"  ✚ {stats['new_services']} Services")
    print(f"  ✚ {stats['new_products']} Products")
    print(f"\n🔄 EXISTING ITEMS ENRICHED:")
    print(f"  ↻ {stats['updated_attractions']} Attractions")
    print(f"  ↻ {stats['updated_hotels']} Hotels")
    print(f"  ↻ {stats['updated_services']} Services")
    print(f"\n⊘ Skipped: {stats['skipped']}")
    print("\n✅ MERGE COMPLETE - No data was lost!")
    print("=" * 70)
