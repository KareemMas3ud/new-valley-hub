import os
import django
import sys
import json
from pathlib import Path

# Setup Django
BASE_DIR = Path(__file__).resolve().parent / "backend"
sys.path.append(str(BASE_DIR))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'new_valley_hub.settings')
django.setup()

from tourism.models import Attraction
from hospitality.models import Hotel
from services.models import Service
from marketplace.models import Product

def generate_media_audit():
    """Generate comprehensive media audit JSON"""
    
    audit_data = []
    
    # 1. ATTRACTIONS
    print("Auditing Attractions...")
    for attraction in Attraction.objects.all().order_by('name'):
        audit_data.append({
            "name_en": attraction.name,
            "category": "Attraction",
            "subcategory": attraction.attraction_type.capitalize() if attraction.attraction_type else "General",
            "image_url": f"http://127.0.0.1:8000{attraction.image.url}" if attraction.image else None
        })
    
    # 2. HOTELS
    print("Auditing Hotels...")
    for hotel in Hotel.objects.all().order_by('name'):
        audit_data.append({
            "name_en": hotel.name,
            "category": "Hotel",
            "subcategory": f"{hotel.stars}-Star" if hotel.stars else "Unrated",
            "image_url": f"http://127.0.0.1:8000{hotel.image.url}" if hotel.image else None
        })
    
    # 3. SERVICES
    print("Auditing Services...")
    for service in Service.objects.select_related('category', 'category__parent').all().order_by('name'):
        parent_cat = service.category.parent.name if service.category.parent else "General"
        audit_data.append({
            "name_en": service.name,
            "category": "Service",
            "subcategory": f"{parent_cat} > {service.category.name}",
            "image_url": f"http://127.0.0.1:8000{service.image.url}" if service.image else None
        })
    
    # 4. PRODUCTS
    print("Auditing Products...")
    for product in Product.objects.all().order_by('name'):
        audit_data.append({
            "name_en": product.name,
            "category": "Product",
            "subcategory": "Marketplace",
            "image_url": f"http://127.0.0.1:8000{product.image.url}" if product.image else None
        })
    
    return audit_data

if __name__ == "__main__":
    print("=" * 70)
    print(" MEDIA AUDIT REPORT GENERATOR")
    print("=" * 70)
    print()
    
    audit = generate_media_audit()
    
    # Statistics
    total = len(audit)
    with_images = sum(1 for item in audit if item['image_url'])
    without_images = total - with_images
    
    print()
    print("=" * 70)
    print(" AUDIT STATISTICS")
    print("=" * 70)
    print(f"Total POIs: {total}")
    print(f"  ✓ With Images: {with_images} ({with_images/total*100:.1f}%)")
    print(f"  ✗ Missing Images: {without_images} ({without_images/total*100:.1f}%)")
    print()
    
    # Category breakdown
    by_category = {}
    for item in audit:
        cat = item['category']
        by_category[cat] = by_category.get(cat, 0) + 1
    
    print("By Category:")
    for cat, count in by_category.items():
        cat_with_images = sum(1 for item in audit if item['category'] == cat and item['image_url'])
        print(f"  {cat}: {count} total ({cat_with_images} with images)")
    
    print()
    print("=" * 70)
    print()
    
    # Generate JSON
    json_output = json.dumps(audit, indent=2, ensure_ascii=False)
    
    # Save to file
    output_path = Path("media_audit_report.json")
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(json_output)
    
    print(f"✅ Report saved to: {output_path.absolute()}")
    print()
    print("JSON OUTPUT (copy below):")
    print("=" * 70)
    print(json_output)
    print("=" * 70)
