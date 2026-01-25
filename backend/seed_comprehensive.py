import os
import django
import sys
from pathlib import Path
from django.core.files import File

# Setup Django environment
BASE_DIR = Path(__file__).resolve().parent
sys.path.append(str(BASE_DIR))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'new_valley_hub.settings')
django.setup()

from tourism.models import Attraction, DigitalArtifact
from services.models import Service, ServiceCategory
from hospitality.models import Hotel
from marketplace.models import Product

def seed_comprehensive_data():
    print("🌴 Seeding COMPREHENSIVE data for New Valley Hub...")

    # Clear existing data
    print("Clearing old data...")
    Attraction.objects.all().delete()
    DigitalArtifact.objects.all().delete()
    Service.objects.all().delete()
    ServiceCategory.objects.all().delete()
    Hotel.objects.all().delete()
    Product.objects.all().delete()

    # Image helper
    def attach_image(obj, filename, field_name='image'):
        img_path = BASE_DIR / "media" / "locations" / filename
        if img_path.exists():
            with open(img_path, 'rb') as f:
                getattr(obj, field_name).save(filename, File(f), save=False)
            return True
        return False

    # ========== ATTRACTIONS (15+ items) ==========
    print("\n📍 Creating Attractions...")
    
    attractions_data = [
        {
            "name": "White Desert National Park",
            "desc": "A surreal landscape of chalk rock formations shaped by wind and sand. Perfect for camping under the stars and experiencing the otherworldly beauty of Egypt's desert.",
            "type": "natural",
            "lat": 27.3292,
            "lon": 28.1362,
            "duration": 180,
            "price": 5.00,
            "img": "white_desert.jpg"
        },
        {
            "name": "Temple of Hibis",
            "desc": "The largest and best-preserved temple of the Persian period in Egypt. Built during the 6th century BC, it showcases stunning hieroglyphics and ancient architecture.",
            "type": "historical",
            "lat": 25.4678,
            "lon": 30.5516,
            "duration": 90,
            "price": 10.00,
            "img": "hibis_temple.jpg"
        },
        {
            "name": "Al-Qasr Islamic Village",
            "desc": "A living medieval village with narrow alleys, mud-brick houses, and historic mosques. Experience traditional Egyptian desert life frozen in time.",
            "type": "cultural",
            "lat": 25.6942,
            "lon": 28.8920,
            "duration": 120,
            "price": 0.00,
            "img": "dakhla_village.jpg"
        },
        {
            "name": "Farafra Oasis",
            "desc": "The smallest and most isolated oasis in the Western Desert. Known for its hot springs, palm groves, and as the gateway to the White Desert.",
            "type": "natural",
            "lat": 27.0602,
            "lon": 27.9715,
            "duration": 90,
            "price": 0.00,
            "img": "farafra_oasis.jpg"
        },
        {
            "name": "Crystal Mountain",
            "desc": "A spectacular rock formation covered in quartz crystals that sparkle under the desert sun. Located between Bahareya and Farafra oases.",
            "type": "natural",
            "lat": 27.1500,
            "lon": 28.3000,
            "duration": 60,
            "price": 0.00,
            "img": "crystal_mountain.jpg"
        },
        {
            "name": "Dakhla Oasis",
            "desc": "Famous for its medieval mud-brick villages, hot springs, and ancient tombs. A perfect blend of history and nature.",
            "type": "cultural",
            "lat": 25.5000,
            "lon": 29.0000,
            "duration": 240,
            "price": 0.00,
            "img": "farafra_oasis.jpg"
        },
        {
            "name": "Necropolis of Al-Bagawat",
            "desc": "One of the oldest Christian cemeteries in the world, dating back to the 3rd-7th centuries AD. Features beautifully decorated mud-brick chapels.",
            "type": "historical",
            "lat": 25.4800,
            "lon": 30.5400,
            "duration": 75,
            "price": 8.00,
            "img": "necropolis.jpg"
        },
        {
            "name": "Kharga Oasis",
            "desc": "The largest and most developed of the Western Desert oases. Home to ancient fortresses, roman temples, and modern amenities.",
            "type": "cultural",
            "lat": 25.4400,
            "lon": 30.5500,
            "duration": 180,
            "price": 0.00,
            "img": "farafra_oasis.jpg"
        },
        {
            "name": "Mut Village",
            "desc": "The capital of Dakhla Oasis, known for its ethnographic museum, traditional crafts, and friendly locals.",
            "type": "cultural",
            "lat": 25.4936,
            "lon": 28.9699,
            "duration": 120,
            "price": 0.00,
            "img": "dakhla_village.jpg"
        },
        {
            "name": "Bir Sahara Desert Spring",
            "desc": "A natural hot spring in the middle of the desert providing a unique bathing experience surrounded by sand dunes.",
            "type": "natural",
            "lat": 27.2000,
            "lon": 27.8000,
            "duration": 90,
            "price": 3.00,
            "img": "hot_spring.jpg"
        },
        {
            "name": "Deir El-Hagar Temple",
            "desc": "A restored Roman temple dedicated to the Theban Triad. Features well-preserved hieroglyphs and stunning desert views.",
            "type": "historical",
            "lat": 25.5500,
            "lon": 28.9200,
            "duration": 60,
            "price": 7.00,
            "img": "hibis_temple.jpg"
        },
        {
            "name": "Qasr El-Labeka",
            "desc": "Ancient Roman fortress ruins offering panoramic views of the surrounding oasis. A photographer's paradise at sunset.",
            "type": "historical",
            "lat": 25.4900,
            "lon": 30.5700,
            "duration": 45,
            "price": 5.00,
            "img": "hibis_temple.jpg"
        },
        {
            "name": "Muzawaka Tombs",
            "desc": "Roman-era tombs with exceptionally well-preserved colorful paintings depicting ancient Egyptian mythology.",
            "type": "historical",
            "lat": 25.5000,
            "lon": 29.1000,
            "duration": 60,
            "price": 6.00,
            "img": "necropolis.jpg"
        },
        {
            "name": "Black Desert",
            "desc": "A unique landscape covered in black volcanic rocks contrasting sharply with golden sand. Perfect for off-road adventures.",
            "type": "natural",
            "lat": 27.8000,
            "lon": 28.7000,
            "duration": 120,
            "price": 0.00,
            "img": "black_desert.jpg"
        },
        {
            "name": "Balat Village",
            "desc": "An ancient Islamic village with winding streets, traditional architecture, and authentic local pottery workshops.",
            "type": "cultural",
            "lat": 25.5200,
            "lon": 28.9500,
            "duration": 90,
            "price": 0.00,
            "img": "dakhla_village.jpg"
        },
        {
            "name": "Date Palm Farms",
            "desc": "Experience traditional agriculture and taste the world-famous New Valley dates fresh from the tree.",
            "type": "cultural",
            "lat": 25.7000,
            "lon": 28.9000,
            "duration": 60,
            "price": 2.00,
            "img": "date_farm.jpg"
        },
    ]

    created_count = 0
    for item in attractions_data:
        obj = Attraction(
            name=item['name'],
            description=item['desc'],
            attraction_type=item['type'],
            visit_duration_minutes=item['duration'],
            opening_time="08:00",
            closing_time="18:00",
            ticket_price=item['price'],
            latitude=item['lat'],
            longitude=item['lon'],
            address="New Valley Governorate, Egypt"
        )
        if attach_image(obj, item.get('img', '')):
            created_count += 1
        obj.save()
    
    print(f"✅ Created {len(attractions_data)} attractions ({created_count} with images)")

    # ========== SERVICES ==========
    print("\n🏥 Creating Services...")
    
    cats = {
        "hospital": ServiceCategory.objects.create(name="Hospital", slug="hospital"),
        "police": ServiceCategory.objects.create(name="Police", slug="police"),
        "bank": ServiceCategory.objects.create(name="Bank", slug="bank"),
        "restaurant": ServiceCategory.objects.create(name="Restaurant", slug="restaurant"),
        "transport": ServiceCategory.objects.create(name="Transportation", slug="transport"),
        "fuel": ServiceCategory.objects.create(name="Gas Station", slug="fuel"),
    }

    services_data = [
        {"name": "Kharga General Hospital", "cat": "hospital", "lat": 25.4400, "lon": 30.5500, "phone": "+20 92 792 0011", "emergency": True},
        {"name": "Dakhla Hospital", "cat": "hospital", "lat": 25.5000, "lon": 29.0000, "phone": "+20 92 782 1234", "emergency": True},
        {"name": "Tourism Police Kharga", "cat": "police", "lat": 25.4350, "lon": 30.5480, "phone": "126", "emergency": True},
        {"name": "Dakhla Police Station", "cat": "police", "lat": 25.4950, "lon": 28.9950, "phone": "122", "emergency": True},
        {"name": "National Bank of Egypt - Kharga", "cat": "bank", "lat": 25.4420, "lon": 30.5550, "phone": "+20 92 792 3456", "emergency": False},
        {"name": "Banque Misr - Dakhla", "cat": "bank", "lat": 25.4970, "lon": 28.9720, "phone": "+20 92 782 5678", "emergency": False},
        {"name": "Oasis Bedouin Restaurant", "cat": "restaurant", "lat": 25.4380, "lon": 30.5600, "phone": "+20 100 123 4567", "emergency": False},
        {"name": "Desert Rose Café", "cat": "restaurant", "lat": 25.4950, "lon": 28.9730, "phone": "+20 100 234 5678", "emergency": False},
        {"name": "Kharga Bus Station", "cat": "transport", "lat": 25.4450, "lon": 30.5450, "phone": "+20 92 792 7890", "emergency": False},
        {"name": "Farafra Gas Station", "cat": "fuel", "lat": 27.0600, "lon": 27.9700, "phone": "+20 100 345 6789", "emergency": False},
    ]

    for item in services_data:
        Service.objects.create(
            name=item['name'],
            description=f"Essential service: {item['cat']}. Contact: {item['phone']}",
            category=cats[item['cat']],
            is_emergency=item['emergency'],
            latitude=item['lat'],
            longitude=item['lon'],
            address="New Valley, Egypt",
            phone_number=item['phone']
        )
    
    print(f"✅ Created {len(services_data)} services in {len(cats)} categories")

    # ========== HOTELS ==========
    print("\n🏨 Creating Hotels...")
    
    hotels_data = [
        {"name": "Sol Y Mar Pioneers Hotel", "stars": 4, "price": "$$", "lat": 25.4500, "lon": 30.5400},
        {"name": "Qasr El-Bagawat Hotel", "stars": 3, "price": "$", "lat": 25.4800, "lon": 30.5300},
        {"name": "Badawiya Hotel Farafra", "stars": 3, "price": "$$", "lat": 27.0600, "lon": 27.9700},
        {"name": "Desert Lodge Dakhla", "stars": 4, "price": "$$$", "lat": 25.4950, "lon": 28.9700},
        {"name": "Al Tarfa Desert Sanctuary", "stars": 5, "price": "$$$$", "lat": 25.5000, "lon": 28.9500},
        {"name": "Mut Garden Retreat", "stars": 3, "price": "$", "lat": 25.4936, "lon": 28.9699},
    ]

    for item in hotels_data:
        Hotel.objects.create(
            name=item['name'],
            description=f"{item['stars']}-star accommodation with authentic desert hospitality and modern amenities.",
            stars=item['stars'],
            price_range=item['price'],
            booking_url="https://www.booking.com/searchresults.html?ss=New+Valley+Egypt",
            latitude=item['lat'],
            longitude=item['lon'],
            address="New Valley, Egypt",
            phone_number="+20 92 7XX XXXX"
        )
    
    print(f"✅ Created {len(hotels_data)} hotels")

    # ========== MARKETPLACE PRODUCTS ==========
    print("\n🛍️ Creating Marketplace Products...")
    
    products_data = [
        {"name": "Organic Medjool Dates (1kg)", "desc": "Premium dates from the oasis farms", "price": 12.00, "seller": "Kharga Farm Co-op", "contact": "+20 100 111 2222"},
        {"name": "Handwoven Palm Basket", "desc": "Traditional palm leaf basket by local artisans", "price": 18.00, "seller": "Dakhla Crafts", "contact": "+20 100 222 3333"},
        {"name": "Desert Honey (500g)", "desc": "Pure wildflower honey from desert blooms", "price": 15.00, "seller": "Oasis Apiary", "contact": "+20 100 333 4444"},
        {"name": "Siwi Pottery Set", "desc": "Hand-painted ceramic plates and bowls", "price": 25.00, "seller": "Mut Pottery", "contact": "+20 100 444 5555"},
        {"name": "Embroidered Bedouin Scarf", "desc": "Colorful traditional scarf with authentic patterns", "price": 20.00, "seller": "Desert Textiles", "contact": "+20 100 555 6666"},
    ]

    for item in products_data:
        obj = Product(
            name=item['name'],
            description=item['desc'],
            price=item['price'],
            seller_name=item['seller'],
            seller_contact=item['contact']
        )
        # Attach product image if available
        img_path = BASE_DIR / "media" / "products" / "dates.jpg"
        if img_path.exists():
            with open(img_path, 'rb') as f:
                obj.image.save("dates.jpg", File(f), save=False)
        obj.save()

    print("\n🎉 COMPREHENSIVE SEEDING COMPLETE!")
    print(f"Total: {Attraction.objects.count()} attractions, {Service.objects.count()} services, ")
    print(f"       {Hotel.objects.count()} hotels, {Product.objects.count()} products")

if __name__ == '__main__':
    seed_comprehensive_data()

