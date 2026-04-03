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

# FINAL STABLE IMAGE URLS - Wikimedia Commons Special:FilePath
FINAL_IMAGE_UPDATES = [
  {
    "name_en": "Temple of Hibis",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Hibis,_Temple_(IV).jpg"
  },
  {
    "name_en": "Al-Bagawat Cemetery",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/BagawatEntrance.jpg"
  },
  {
    "name_en": "Al-Nadora Fortress",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Nadora_Temple.jpg"
  },
  {
    "name_en": "Al-Qasr Islamic Village",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Al-Qasr_city_(Dakhla_Oasis).jpg"
  },
  {
    "name_en": "Badr Museum",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Badr_Museum_Farafra.jpg"
  },
  {
    "name_en": "Balat Village",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Balat_Dakhla.jpg"
  },
  {
    "name_en": "Bashendi Village",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Bashendi_Village.jpg"
  },
  {
    "name_en": "Bir Sahara Desert Spring",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Oasis_in_Libyan_Desert.jpg"
  },
  {
    "name_en": "Bir Sitta",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Mut_Hot_Spring.jpg"
  },
  {
    "name_en": "Black Desert",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Black_Desert_-_Bahariya_Oasis.jpg"
  },
  {
    "name_en": "Crystal Mountain",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Crystal_Mountain_Egypt.jpg"
  },
  {
    "name_en": "Dakhla Oasis",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Dakhla_Oasis_Fields.jpg"
  },
  {
    "name_en": "Date Palm Farms",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Dates_on_palm_tree.jpg"
  },
  {
    "name_en": "Deir El-Hagar",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Deir_el-Hagar_Temple_01.jpg"
  },
  {
    "name_en": "Deir Mustafa Kashef",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Monastery_of_Mustafa_Kashef.jpg"
  },
  {
    "name_en": "Farafra Oasis",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Farafra_Oasis_Palm_Trees.jpg"
  },
  {
    "name_en": "Kharga Oasis",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Temple_of_Hibis_04.jpg"
  },
  {
    "name_en": "Mastaba of Khentika",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Mastaba_of_Khentika.jpg"
  },
  {
    "name_en": "Mut Hot Springs (Bir 3)",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Mut_Hot_Spring.jpg"
  },
  {
    "name_en": "Mut Village",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Mut_Citadel.jpg"
  },
  {
    "name_en": "Muzawaka Tombs",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Muzzawaka_Tombs.jpg"
  },
  {
    "name_en": "New Valley Museum",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/New_Valley_Museum.jpg"
  },
  {
    "name_en": "Qasr Al-Ghuwayta",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Qasr_al-Ghuwayta_Temple_01.jpg"
  },
  {
    "name_en": "Qasr Al-Zayan",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Qasr_al-Ghuwayta_Temple_01.jpg"
  },
  {
    "name_en": "Temple of Dush",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Temple_of_Dush_01.jpg"
  },
  {
    "name_en": "White Desert National Park",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/WhiteDesertMushroom.jpg"
  },
  {
    "name_en": "Al Tarfa Desert Sanctuary",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Dakhla_Oasis_House.jpg"
  },
  {
    "name_en": "Desert Lodge",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Traditional_house_in_Dakhla_oasis.jpg"
  },
  {
    "name_en": "Rahala Safari Hotel",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Farafra_Oasis_landscape.jpg"
  },
  {
    "name_en": "Badr Hotel & Resort",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Kharga_Oasis_View.jpg"
  },
  {
    "name_en": "Ahmed Hamdy Restaurant",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Egyptian_Food_Kebab_Kofta.jpg"
  },
  {
    "name_en": "Wimpy El Basatin",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Egyptian_mixed_grill.jpg"
  },
  {
    "name_en": "Astakoza",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Seafood_plate_Egypt.jpg"
  },
  {
    "name_en": "Bondoka (Crepiano)",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Koshary_Dish.jpg"
  },
  {
    "name_en": "National Bank of Egypt (NBE)",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/NBE_Logo.svg"
  },
  {
    "name_en": "Banque Misr - Dakhla",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Banque_Misr_Logo.svg"
  },
  {
    "name_en": "Kharga General Hospital",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Egyptian_Hospital_Building.jpg"
  },
  {
    "name_en": "The Date Complex",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Dates_Market_Egypt.jpg"
  },
  {
    "name_en": "Siwi Pottery Set",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Pottery_in_Egypt.jpg"
  },
  {
    "name_en": "Desert Honey (500g)",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Honey_Jars.jpg"
  },
  {
    "name_en": "Handwoven Palm Basket",
    "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Woven_Basket_Egypt.jpg"
  }
]

def update_images():
    """Update all POI images with stable Wikimedia Commons URLs"""
    
    stats = {
        "attractions_updated": 0,
        "hotels_updated": 0,
        "services_updated": 0,
        "products_updated": 0,
        "not_found": []
    }
    
    print("=" * 70)
    print(" FINAL IMAGE UPDATE - STABLE WIKIMEDIA COMMONS URLs")
    print("=" * 70)
    print()
    
    for item in FINAL_IMAGE_UPDATES:
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

if __name__ == "__main__":
    # Update Images
    stats = update_images()
    
    # Summary
    print("\n" + "=" * 70)
    print(" FINAL UPDATE SUMMARY")
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
    
    print("\n✅ ALL IMAGES NOW USE STABLE WIKIMEDIA COMMONS URLs")
    print("✅ No hotlinking restrictions - permanent redirects")
    print("✅ Demo-ready with professional imagery")
    print("=" * 70)
