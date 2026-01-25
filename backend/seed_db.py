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

from tourism.models import Attraction
from services.models import Service, ServiceCategory
from hospitality.models import Hotel
from marketplace.models import Product

def seed_data():
    print("Seeding data with images...")

    # Clear existing data
    Attraction.objects.all().delete()
    Service.objects.all().delete()
    ServiceCategory.objects.all().delete()
    Hotel.objects.all().delete()
    Product.objects.all().delete()

    # Define Image Paths
    img_dir = BASE_DIR / "media" / "locations"
    prod_img_dir = BASE_DIR / "media" / "products"

    def get_image(filename):
        path = img_dir / filename
        if path.exists():
            return File(open(path, 'rb'))
        return None

    def get_prod_image(filename):
        path = prod_img_dir / filename
        if path.exists():
            return File(open(path, 'rb'))
        return None

    # 1. Attractions
    attractions = [
        {
            "name": "White Desert National Park",
            "description": "A surreal landscape of chalk rock formations created by sandstorms. Famous for camping and stargazing.",
            "type": "natural",
            "lat": 27.3292,
            "lon": 28.1362,
            "duration": 180,
            "price": 5.00,
            "img": "white_desert.jpg"
        },
        {
            "name": "Temple of Hibis",
            "description": "The largest and best-preserved ancient Egyptian temple in the Kharga Oasis.",
            "type": "historical",
            "lat": 25.4678,
            "lon": 30.5516,
            "duration": 60,
            "price": 10.00,
            "img": "hibis.jpg"
        },
        {
            "name": "Al-Qasr Islamic Village",
            "description": "A medieval ottoman-era village built of mud-brick, featuring narrow alleys and historic mosques.",
            "type": "cultural",
            "lat": 25.6942,
            "lon": 28.8920,
            "duration": 90,
            "price": 0.00,
             "img": "farm.jpg" # Reuse farm image for village texture
        },
        {
            "name": "Al-Qasr Date Farm",
            "description": "Taste the world-famous dates and explore traditional agriculture.",
            "type": "cultural",
            "lat": 25.7000,
            "lon": 28.9000,
            "duration": 45,
            "price": 2.00,
            "img": "farm.jpg"
        },
         {
            "name": "Farafra Oasis",
            "description": "Known for its traditional water wells and palm groves. A gateway to the White Desert.",
            "type": "natural",
            "lat": 27.0602,
            "lon": 27.9715,
            "duration": 120,
            "price": 0.00,
            "img": "farafra.jpg"
        }
    ]

    for item in attractions:
        obj = Attraction(
            name=item['name'],
            description=item['description'],
            attraction_type=item['type'],
            visit_duration_minutes=item['duration'],
            opening_time="09:00",
            closing_time="17:00",
            ticket_price=item['price'],
            latitude=item['lat'],
            longitude=item['lon'],
            address="New Valley Governorate"
        )
        img_file = get_image(item.get('img'))
        if img_file:
            obj.image.save(item.get('img'), img_file, save=False)
        obj.save()
            
    print(f"Created {len(attractions)} Attractions.")

    # 2. Services
    cats = {
        "hospital": ServiceCategory.objects.create(name="Hospital", slug="hospital"),
        "police": ServiceCategory.objects.create(name="Police", slug="police"),
        "bank": ServiceCategory.objects.create(name="Bank", slug="bank"),
        "restaurant": ServiceCategory.objects.create(name="Restaurant", slug="restaurant"),
    }

    services = [
        {"name": "Kharga General Hospital", "cat": "hospital", "lat": 25.4400, "lon": 30.5500, "emergency": True},
        {"name": "Tourism Police Unit", "cat": "police", "lat": 25.4350, "lon": 30.5480, "emergency": True},
        {"name": "National Bank of Egypt", "cat": "bank", "lat": 25.4420, "lon": 30.5550, "emergency": False},
        {"name": "Oasis Bedouin Restaurant", "cat": "restaurant", "lat": 25.4380, "lon": 30.5600, "emergency": False},
    ]

    for item in services:
        Service.objects.create(
            name=item['name'],
            description=f"Main {item['cat']} in the area.",
            category=cats[item['cat']],
            is_emergency=item['emergency'],
            latitude=item['lat'],
            longitude=item['lon'],
            address="Downtown Kharga"
        )
    print(f"Created {len(services)} Services.")

    # 3. Hotels
    hotels = [
        {"name": "Sol Y Mar Pioneers", "stars": 4, "price": "$$", "lat": 25.4500, "lon": 30.5400},
        {"name": "Qasr El Bagawat Hotel", "stars": 3, "price": "$", "lat": 25.4800, "lon": 30.5300},
        {"name": "Badawiya Hotel Farafra", "stars": 3, "price": "$$", "lat": 27.0600, "lon": 27.9700},
    ]

    for item in hotels:
        Hotel.objects.create(
            name=item['name'],
            description="Comfortable stay with local hospitality.",
            stars=item['stars'],
            price_range=item['price'],
            booking_url="https://www.booking.com",
            latitude=item['lat'],
            longitude=item['lon'],
            address="New Valley"
        )
    print(f"Created {len(hotels)} Hotels.")

    # 4. Products
    products = [
        {"name": "Organic Dates (1kg)", "desc": "Freshly harvested dates from the oasis.", "price": 10.00, "seller": "Amr Farm", "contact": "010xxxx"},
        {"name": "Handwoven Basket", "desc": "Traditional palm leaf basket.", "price": 15.00, "seller": "Fatima Crafts", "contact": "012xxxx"},
    ]

    for item in products:
        obj = Product(
            name=item['name'],
            description=item['desc'],
            price=item['price'],
            seller_name=item['seller'],
            seller_contact=item['contact']
        )
        # Use dates.jpg for both as check
        img_file = get_prod_image("dates.jpg")
        if img_file:
             obj.image.save("dates.jpg", img_file, save=False)
        obj.save()

    print(f"Created {len(products)} Products.")
    print("Done!")

if __name__ == '__main__':
    seed_data()
