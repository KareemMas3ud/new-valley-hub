import os
import django
import sys
from pathlib import Path
from decimal import Decimal

# Setup Django
BASE_DIR = Path(__file__).resolve().parent / "backend"
sys.path.append(str(BASE_DIR))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'new_valley_hub.settings')
django.setup()

from tourism.models import Attraction
from hospitality.models import Hotel
from services.models import Service, ServiceCategory
from marketplace.models import Product

# Complete JSON Dataset - ALL items
COMPLETE_DATASET = [
  # Restaurants
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
    "category": "Dining",
    "sub_category": "Fast Food",
    "location": "Kharga Oasis",
    "name_en": "Al-Sayyad Restaurant",
    "name_ar": "مطعم الصياد",
    "description": "Take-away sandwiches (Shawerma, Burger). Popular with students.",
    "address": "Next to Faculty of Education"
  },
  {
    "category": "Dining",
    "sub_category": "Local Food",
    "location": "Kharga Oasis",
    "name_en": "Bondoka (Crepiano)",
    "name_ar": "مطعم بندقة",
    "description": "Popular chain for Koshary, Crepes, and Pastries. Very economic."
  },
  {
    "category": "Dining",
    "sub_category": "Pizza & Pies",
    "location": "Kharga Oasis",
    "name_en": "Pizza Ibn Al-Balad",
    "name_ar": "بيتزا ابن البلد",
    "description": "Specializes in Pizza and Pies (Feteer).",
    "address": "El Shoala Square"
  },
  {
    "category": "Dining",
    "sub_category": "Restaurants",
    "location": "Kharga Oasis",
    "name_en": "Palm Valley",
    "name_ar": "بالم فالي",
    "description": "Offers a modern dining experience."
  },
  {
    "category": "Dining",
    "sub_category": "Local Food",
    "location": "Kharga Oasis",
    "name_en": "Haneen Restaurant",
    "name_ar": "مطعم حنين",
    "description": "Traditional Egyptian street food (Foul, Falafel)."
  },
  {
    "category": "Dining",
    "sub_category": "Restaurants",
    "location": "Dakhla Oasis",
    "name_en": "Ahmed Hamdy Restaurant",
    "name_ar": "مطعم أحمد حمدي",
    "description": "Famous tourist restaurant in Mut offering grills and vegetables."
  },
  # Pharmacies
  {
    "category": "Medical Services",
    "sub_category": "Pharmacies",
    "location": "Kharga Oasis",
    "name_en": "Dr. Montaser Awad Pharmacy",
    "name_ar": "صيدلية د. منتصر عوض",
    "address": "El Souq St., near Moaz Mosque"
  },
  {
    "category": "Medical Services",
    "sub_category": "Pharmacies",
    "location": "Kharga Oasis",
    "name_en": "Orabi Pharmacy",
    "name_ar": "صيدلية عرابي",
    "address": "El Nabawy El Mohandes St."
  },
  # Additional Hotels
  {
    "category": "Accommodation",
    "sub_category": "Hotels",
    "location": "Dakhla Oasis",
    "name_en": "Al Forsan Hotel",
    "name_ar": "فندق الفرسان",
    "contact": "092-7821347",
    "rating": "2 Stars",
    "location_detail": "Mut City"
  },
  {
    "category": "Accommodation",
    "sub_category": "Hotels",
    "location": "Dakhla Oasis",
    "name_en": "Al Badawiya Hotel Dakhla",
    "name_ar": "فندق البدوية الداخلة",
    "contact": "092-7727451",
    "description": "Traditional design, good for groups."
  },
  {
    "category": "Accommodation",
    "sub_category": "Hotels",
    "location": "Dakhla Oasis",
    "name_en": "Sol Y Mar Mut Inn",
    "name_ar": "سوليمار موط",
    "contact": "092-7929751",
    "rating": "3 Stars",
    "features": ["Private Sulphur Spring", "Chalets"]
  },
  {
    "category": "Accommodation",
    "sub_category": "Safari Hotels",
    "location": "Farafra Oasis",
    "name_en": "Rahala Safari Hotel",
    "name_ar": "فندق رحالة سفاري",
    "rating": "4 Stars",
    "description": "Comfortable stay for safari travelers."
  },
  {
    "category": "Accommodation",
    "sub_category": "Safari Hotels",
    "location": "Farafra Oasis",
    "name_en": "Aqua Sun Hotel",
    "name_ar": "أكوا صن",
    "description": "Features a private hot spring."
  },
  {
    "category": "Accommodation",
    "sub_category": "Hotels",
    "location": "Baris Oasis",
    "name_en": "Amira Hotel",
    "name_ar": "فندق أميرة باريس",
    "description": "Designed in Hassan Fathy style (domes). The main tourist hotel in the south.",
    "notes": "23 Rooms"
  },
  # Additional Attractions
  {
    "category": "Culture & Museums",
    "sub_category": "Art",
    "location": "Farafra Oasis",
    "name_en": "Badr Museum",
    "name_ar": "متحف بدر",
    "description": "Mud-brick museum by local artist Badr Abdel Moghny depicting oasis life."
  },
  {
    "category": "Historical & Heritage",
    "sub_category": "Villages",
    "location": "Dakhla Oasis",
    "name_en": "Bashendi Village",
    "name_ar": "قرية بشندي",
    "description": "Model village for heritage preservation. Contains a carpet/kilim factory and Roman tombs."
  },
  {
    "category": "Historical & Heritage",
    "sub_category": "Islamic Heritage",
    "location": "Balat",
    "name_en": "Balat Islamic Village",
    "name_ar": "قرية بلاط الإسلامية",
    "description": "Medieval village similar to Al-Qasr but less known. High authenticity."
  },
  {
    "category": "Historical & Heritage",
    "sub_category": "Pharaonic",
    "location": "Balat",
    "name_en": "Mastaba of Khentika",
    "name_ar": "مصطبة خنتيكا",
    "description": "Old Kingdom tombs (6th Dynasty) for Oasis governors."
  },
  # Innovation & Education
  {
    "category": "Innovation & Education",
    "sub_category": "Hubs",
    "location": "Kharga Oasis",
    "name_en": "Creativa New Valley",
    "name_ar": "مركز إبداع مصر الرقمية",
    "description": "Innovation hub offering co-working spaces, labs, and entrepreneurship training."
  },
  # Local Industry & Products
  {
    "category": "Local Industry",
    "sub_category": "Crafts",
    "location": "Kharga Oasis",
    "name_en": "Pottery & Ceramics Unit",
    "name_ar": "وحدة إنتاج الخزف والفخار",
    "description": "Produces modern pottery decor while preserving oasis identity."
  }
]

def process_all_items():
    """Process all remaining items from JSON"""
    stats = {
        "new_restaurants": 0,
        "new_pharmacies": 0,
        "new_hotels": 0,
        "new_attractions": 0,
        "new_products": 0,
        "new_innovation": 0
    }

    # Get or create service categories
    restaurant_cat, _ = ServiceCategory.objects.get_or_create(
        name="Restaurant", 
        defaults={"slug": "restaurant"}
    )
    pharmacy_cat, _ = ServiceCategory.objects.get_or_create(
        name="Pharmacy", 
        defaults={"slug": "pharmacy"}
    )
    innovation_cat, _ = ServiceCategory.objects.get_or_create(
        name="Innovation Hub", 
        defaults={"slug": "innovation-hub"}
    )

    for item in COMPLETE_DATASET:
        category = item.get("category", "")
        sub_category = item.get("sub_category", "")
        name_en = item.get("name_en", "")
        description = item.get("description", "")
        location = item.get("location", "New Valley, Egypt")
        address = item.get("address", location)

        try:
            # RESTAURANTS
            if category == "Dining":
                if not Service.objects.filter(name=name_en).exists():
                    Service.objects.create(
                        name=name_en,
                        description=description,
                        category=restaurant_cat,
                        phone_number="+20 92 XXX XXXX",
                        latitude=25.4400,
                        longitude=30.5500,
                        address=address
                    )
                    stats["new_restaurants"] += 1
                    print(f"✓ NEW Restaurant: {name_en}")

            # PHARMACIES
            elif sub_category == "Pharmacies":
                if not Service.objects.filter(name=name_en).exists():
                    Service.objects.create(
                        name=name_en,
                        description=description or "Pharmacy services",
                        category=pharmacy_cat,
                        phone_number="+20 92 XXX XXXX",
                        latitude=25.4400,
                        longitude=30.5500,
                        address=address
                    )
                    stats["new_pharmacies"] += 1
                    print(f"✓ NEW Pharmacy: {name_en}")

            # HOTELS
            elif category == "Accommodation":
                if not Hotel.objects.filter(name__icontains=name_en.split()[0]).exists():
                    rating_str = item.get("rating", "3 Stars")
                    try:
                        stars = int(rating_str.split()[0]) if rating_str else 3
                    except:
                        stars = 3

                    Hotel.objects.create(
                        name=name_en,
                        description=description or f"Hotel in {location}",
                        stars=stars,
                        price_range="$$" if stars >= 3 else "$",
                        phone_number=item.get("contact", "+20 92 XXX XXXX"),
                        booking_url="https://www.booking.com/searchresults.html?ss=New+Valley+Egypt",
                        latitude=25.4400,
                        longitude=30.5500,
                        address=location
                    )
                    stats["new_hotels"] += 1
                    print(f"✓ NEW Hotel: {name_en}")

            # ATTRACTIONS
            elif category in ["Culture & Museums", "Historical & Heritage"]:
                if not Attraction.objects.filter(name__icontains=name_en.split()[0]).exists():
                    Attraction.objects.create(
                        name=name_en,
                        description=description,
                        attraction_type="cultural" if "Culture" in category else "historical",
                        visit_duration_minutes=60,
                        opening_time="09:00",
                        closing_time="17:00",
                        ticket_price=Decimal("0.00"),
                        latitude=25.4400,
                        longitude=30.5500,
                        address=location
                    )
                    stats["new_attractions"] += 1
                    print(f"✓ NEW Attraction: {name_en}")

            # INNOVATION HUBS
            elif category == "Innovation & Education":
                if not Service.objects.filter(name=name_en).exists():
                    Service.objects.create(
                        name=name_en,
                        description=description,
                        category=innovation_cat,
                        phone_number="+20 100 XXX XXXX",
                        latitude=25.4400,
                        longitude=30.5500,
                        address=address
                    )
                    stats["new_innovation"] += 1
                    print(f"✓ NEW Innovation Hub: {name_en}")

            # LOCAL PRODUCTS
            elif category == "Local Industry":
                if not Product.objects.filter(name__icontains=name_en.split()[0]).exists():
                    Product.objects.create(
                        name=name_en,
                        description=description,
                        price=Decimal("20.00"),
                        seller_name="New Valley Crafts",
                        seller_contact="+20 100 XXX XXXX"
                    )
                    stats["new_products"] += 1
                    print(f"✓ NEW Product: {name_en}")

        except Exception as e:
            print(f"✗ ERROR: {name_en} - {e}")

    return stats

if __name__ == "__main__":
    print("=" * 70)
    print(" ADDING ALL REMAINING POIs FROM DATASET")
    print("=" * 70)
    print()

    stats = process_all_items()

    print("\n" + "=" * 70)
    print(" ADDITION SUMMARY")
    print("=" * 70)
    print(f"\n✚ NEW ITEMS ADDED:")
    print(f"  🍽️  {stats['new_restaurants']} Restaurants")
    print(f"  💊 {stats['new_pharmacies']} Pharmacies")
    print(f"  🏨 {stats['new_hotels']} Hotels")
    print(f"  🏛️  {stats['new_attractions']} Attractions")
    print(f"  🛍️  {stats['new_products']} Products")
    print(f"  💡 {stats['new_innovation']} Innovation Hubs")
    print(f"\n  TOTAL: {sum(stats.values())} New POIs")
    print("\n✅ ALL ITEMS ADDED!")
    print("=" * 70)
