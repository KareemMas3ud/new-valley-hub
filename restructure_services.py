import os
import django
import sys
from pathlib import Path

# Setup Django
BASE_DIR = Path(__file__).resolve().parent / "backend"
sys.path.append(str(BASE_DIR))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'new_valley_hub.settings')
django.setup()

from services.models import ServiceCategory, Service

print("=" * 70)
print(" RESTRUCTURING SERVICES TO HIERARCHICAL SCHEMA")
print("=" * 70)
print()

# Step 1: Create Parent Categories
print("STEP 1: Creating Parent Categories...")
parent_categories = [
    {
        "name": "Dining & Restaurants",
        "slug": "dining-restaurants",
        "order": 1,
        "description": "Restaurants, cafés, and food services across the New Valley"
    },
    {
        "name": "Medical Infrastructure",
        "slug": "medical",
        "order": 2,
        "description": "Hospitals, clinics, pharmacies, and healthcare services"
    },
    {
        "name": "Emergency Services",
        "slug": "emergency",
        "order": 3,
        "description": "Police, fire, ambulance, and emergency hotlines"
    },
    {
        "name": "General Services",
        "slug": "general-services",
        "order": 4,
        "description": "Banks, transport, fuel stations, and other essential services"
    }
]

parent_cats = {}
for cat_data in parent_categories:
    cat, created = ServiceCategory.objects.get_or_create(
        slug=cat_data["slug"],
        defaults={
            "name": cat_data["name"],
            "order": cat_data["order"],
            "description": cat_data["description"],
            "parent": None  # These are root categories
        }
    )
    parent_cats[cat_data["slug"]] = cat
    print(f"  {'✓ CREATED' if created else '✓ EXISTS'}: {cat.name}")

print()

# Step 2: Restructure Existing Categories as Subcategories
print("STEP 2: Converting Existing Categories to Subcategories...")

# Mapping: old category slug -> new parent slug
category_mapping = {
    "restaurant": "dining-restaurants",
    "hospital": "medical",
    "pharmacy": "medical",
    "police": "emergency",
    "bank": "general-services",
    "transport": "general-services",
    "fuel": "general-services",
    "innovation-hub": "general-services"
}

for old_slug, parent_slug in category_mapping.items():
    try:
        old_cat = ServiceCategory.objects.get(slug=old_slug)
        parent_cat = parent_cats[parent_slug]
        
        # Update to be a subcategory
        old_cat.parent = parent_cat
        old_cat.save()
        
        print(f"  ✓ {old_cat.name} -> {parent_cat.name}")
    except ServiceCategory.DoesNotExist:
        print(f"  ⊘ Category '{old_slug}' not found (skipped)")

print()

# Step 3: Add Missing Subcategories
print("STEP 3: Adding New Subcategories...")

new_subcategories = [
    {"name": "Fine Dining", "slug": "fine-dining", "parent": "dining-restaurants", "order": 1},
    {"name": "Fast Food", "slug": "fast-food", "parent": "dining-restaurants", "order": 2},
    {"name": "Local Cuisine", "slug": "local-cuisine", "parent": "dining-restaurants", "order": 3},
    {"name": "Cafés & Bakeries", "slug": "cafes-bakeries", "parent": "dining-restaurants", "order": 4},
    {"name": "Clinics", "slug": "clinics", "parent": "medical", "order": 2},
    {"name": "Ambulance", "slug": "ambulance", "parent": "emergency", "order": 2},
    {"name": "Fire Department", "slug": "fire", "parent": "emergency", "order": 3},
    {"name": "Post Office", "slug": "post-office", "parent": "general-services", "order": 5},
]

for subcat_data in new_subcategories:
    parent_cat = parent_cats[subcat_data["parent"]]
    subcat, created = ServiceCategory.objects.get_or_create(
        slug=subcat_data["slug"],
        defaults={
            "name": subcat_data["name"],
            "parent": parent_cat,
            "order": subcat_data["order"]
        }
    )
    if created:
        print(f"  ✚ ADDED: {subcat.name} under {parent_cat.name}")

print()

# Step 4: Verify Structure
print("=" * 70)
print(" HIERARCHICAL STRUCTURE VERIFICATION")
print("=" * 70)
print()

for parent in ServiceCategory.objects.filter(parent=None).order_by('order'):
    print(f"📁 {parent.name}")
    for subcat in parent.subcategories.all().order_by('order'):
        service_count = subcat.services.count()
        print(f"   ├─ {subcat.name} ({service_count} services)")
    print()

print("=" * 70)
print(" ✅ SCHEMA REFACTORING COMPLETE!")
print("=" * 70)
print()
print("Structure: 4 Parent Categories → 12+ Subcategories → 22 Services")
print("Ready to receive new dataset with proper categorization.")
