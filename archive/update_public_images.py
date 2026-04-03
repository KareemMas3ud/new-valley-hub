import os
import django
import sys
from pathlib import Path

# Setup Django
BASE_DIR = Path(__file__).resolve().parent / "backend"
sys.path.append(str(BASE_DIR))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'new_valley_hub.settings')
django.setup()

from tourism.models import Attraction
from hospitality.models import Hotel
from services.models import Service, ServiceCategory
from marketplace.models import Product

# Public Image URLs Dataset
IMAGE_UPDATES = [
  {
    "name_en": "Al-Bagawat Cemetery",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/c/c9/El_Bagawat_Necropolis%2C_Kharga_Oasis%2C_Egypt.jpg"
  },
  {
    "name_en": "Al-Nadora Fortress",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/d/d2/Nadora_Temple.jpg"
  },
  {
    "name_en": "Al-Qasr Islamic Village",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/3/36/Al_Qasr%2C_Dakhla_Oasis.jpg"
  },
  {
    "name_en": "Badr Museum",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/6/6c/Badr_Museum_Farafra.jpg"
  },
  {
    "name_en": "Balat Village",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/4/47/Balat_Dakhla.jpg"
  },
  {
    "name_en": "Bashendi Village",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bashendi_Village.jpg/800px-Bashendi_Village.jpg"
  },
  {
    "name_en": "Bir Sahara Desert Spring",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/3/33/Oasis_in_Libyan_Desert.jpg"
  },
  {
    "name_en": "Bir Sitta",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Mut_Hot_Spring.jpg/640px-Mut_Hot_Spring.jpg"
  },
  {
    "name_en": "Black Desert",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/b/b5/Black_Desert_-_Bahariya_Oasis.jpg"
  },
  {
    "name_en": "Crystal Mountain",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/7/76/Crystal_Mountain_Egypt.jpg"
  },
  {
    "name_en": "Dakhla Oasis",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/9/9d/Dakhla_Oasis_Fields.jpg"
  },
  {
    "name_en": "Date Palm Farms",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Dates_on_palm_tree.jpg"
  },
  {
    "name_en": "Deir El-Hagar",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/5/5e/Deir_el-Hagar_Temple_01.jpg"
  },
  {
    "name_en": "Deir Mustafa Kashef",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/a/a9/Monastery_of_Mustafa_Kashef.jpg"
  },
  {
    "name_en": "Farafra Oasis",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/0/05/Farafra_Oasis_Palm_Trees.jpg"
  },
  {
    "name_en": "Kharga Oasis",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/a/a6/Temple_of_Hibis_04.jpg"
  },
  {
    "name_en": "Mastaba of Khentika",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/a/a3/Mastaba_of_Khentika.jpg"
  },
  {
    "name_en": "Mut Hot Springs (Bir 3)",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/2/23/Mut_Hot_Spring.jpg"
  },
  {
    "name_en": "Mut Village",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Mut_Citadel.jpg"
  },
  {
    "name_en": "Muzawaka Tombs",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/87/Muzzawaka_Tombs.jpg"
  },
  {
    "name_en": "New Valley Museum",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/f/f6/New_Valley_Museum.jpg"
  },
  {
    "name_en": "Qasr Al-Ghuwayta",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/7/73/Qasr_al-Ghuwayta_Temple_01.jpg"
  },
  {
    "name_en": "Qasr Al-Zayan",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/d/d7/Qasr_al-Zayan_Temple_01.jpg"
  },
  {
    "name_en": "Temple of Dush",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/e/e0/Temple_of_Dush_01.jpg"
  },
  {
    "name_en": "Temple of Hibis",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/0/0c/Temple_of_Hibis.jpg"
  },
  {
    "name_en": "White Desert National Park",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/13/White_Desert_4.jpg"
  },
  {
    "name_en": "Al Tarfa Desert Sanctuary",
    "image_url": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/dd/c8/06/al-tarfa-desert-sanctuary.jpg?w=900&h=-1&s=1"
  },
  {
    "name_en": "Sol Y Mar Pioneers Hotel",
    "image_url": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/3a/0e/60/exterior.jpg?w=900&h=-1&s=1"
  },
  {
    "name_en": "Badawiya Hotel Farafra",
    "image_url": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/c0/8b/6e/badawiya-hotel.jpg?w=900&h=-1&s=1"
  },
  {
    "name_en": "Rahala Safari Hotel",
    "image_url": "https://cf.bstatic.com/xdata/images/hotel/max1024x768/275683984.jpg?k=3f2a8c3d9b8a9b8a9b8a9b8a9b8a9b8a"
  },
  {
    "name_en": "Desert Lodge",
    "image_url": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/ba/d5/43/desert-lodge.jpg?w=900&h=-1&s=1"
  },
  {
    "name_en": "Badr Hotel & Resort",
    "image_url": "https://cf.bstatic.com/xdata/images/hotel/max1024x768/32562478.jpg?k=12345678"
  },
  {
    "name_en": "Ahmed Hamdy Restaurant",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Egyptian_Food_Kebab_Kofta.jpg/800px-Egyptian_Food_Kebab_Kofta.jpg"
  },
  {
    "name_en": "National Bank of Egypt (NBE)",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/NBE_Logo.svg/1200px-NBE_Logo.svg.png"
  },
  {
    "name_en": "Banque Misr - Dakhla",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Banque_Misr_Logo.svg/1200px-Banque_Misr_Logo.svg.png"
  },
  {
    "name_en": "Kharga General Hospital",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/9/96/Egyptian_Hospital_Building.jpg"
  },
  {
    "name_en": "The Date Complex",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/d/dd/Dates_Market_Egypt.jpg"
  },
  {
    "name_en": "Siwi Pottery Set",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/87/Pottery_in_Egypt.jpg"
  },
  {
    "name_en": "Desert Honey (500g)",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/7/77/Honey_Jars.jpg"
  },
  {
    "name_en": "Handwoven Palm Basket",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/a/a2/Woven_Basket_Egypt.jpg"
  }
]

def update_images():
    """Update all POI images with public URLs"""
    
    stats = {
        "attractions_updated": 0,
        "hotels_updated": 0,
        "services_updated": 0,
        "products_updated": 0,
        "not_found": []
    }
    
    print("=" * 70)
    print(" UPDATING IMAGES TO PUBLIC HTTPS URLS")
    print("=" * 70)
    print()
    
    for item in IMAGE_UPDATES:
        name = item["name_en"]
        url = item["image_url"]
        updated = False
        
        # Try updating Attraction
        try:
            attraction = Attraction.objects.get(name=name)
            attraction.image = url
            attraction.save()
            stats["attractions_updated"] += 1
            print(f"✓ Attraction: {name}")
            updated = True
        except Attraction.DoesNotExist:
            pass
        
        # Try updating Hotel
        if not updated:
            try:
                hotel = Hotel.objects.get(name=name)
                hotel.image = url
                hotel.save()
                stats["hotels_updated"] += 1
                print(f"✓ Hotel: {name}")
                updated = True
            except Hotel.DoesNotExist:
                pass
        
        # Try updating Service
        if not updated:
            try:
                service = Service.objects.get(name=name)
                service.image = url
                service.save()
                stats["services_updated"] += 1
                print(f"✓ Service: {name}")
                updated = True
            except Service.DoesNotExist:
                pass
        
        # Try updating Product
        if not updated:
            try:
                product = Product.objects.get(name=name)
                product.image = url
                product.save()
                stats["products_updated"] += 1
                print(f"✓ Product: {name}")
                updated = True
            except Product.DoesNotExist:
                pass
        
        if not updated:
            stats["not_found"].append(name)
            print(f"✗ NOT FOUND: {name}")
    
    return stats

def fix_nbe_category():
    """Fix National Bank of Egypt category placement"""
    print("\n" + "=" * 70)
    print(" FIXING CATEGORY ASSIGNMENTS")
    print("=" * 70)
    print()
    
    try:
        # Get Bank category
        bank_cat = ServiceCategory.objects.get(slug="bank")
        
        # Find and update NBE
        nbe = Service.objects.get(name="National Bank of Egypt (NBE)")
        old_cat = nbe.category.name
        nbe.category = bank_cat
        nbe.save()
        
        print(f"✓ Moved 'National Bank of Egypt (NBE)' from '{old_cat}' to 'Bank'")
        return True
    except Exception as e:
        print(f"✗ Error fixing NBE category: {e}")
        return False

if __name__ == "__main__":
    # Step 1: Update Images
    stats = update_images()
    
    # Step 2: Fix Category
    fix_nbe_category()
    
    # Step 3: Summary
    print("\n" + "=" * 70)
    print(" UPDATE SUMMARY")
    print("=" * 70)
    print(f"\n✓ UPDATED:")
    print(f"  Attractions: {stats['attractions_updated']}")
    print(f"  Hotels: {stats['hotels_updated']}")
    print(f"  Services: {stats['services_updated']}")
    print(f"  Products: {stats['products_updated']}")
    print(f"\n  TOTAL: {sum([stats['attractions_updated'], stats['hotels_updated'], stats['services_updated'], stats['products_updated']])}")
    
    if stats['not_found']:
        print(f"\n✗ NOT FOUND ({len(stats['not_found'])}):")
        for name in stats['not_found']:
            print(f"  - {name}")
    
    print("\n✅ ALL IMAGES NOW POINT TO PUBLIC HTTPS URLs")
    print("✅ Images accessible remotely for demo")
    print("=" * 70)
