from PIL import Image
import os
import django
import sys
from pathlib import Path

# Convert PNG to JPG
brain_dir = Path("C:/Users/amr mohsen/.gemini/antigravity/brain/bbf17620-9bd0-4988-82ec-f65ea5f38681")
locations_dir = Path("backend/media/locations")

new_images = {
    "qasr_ghuwayta": "qasr_ghuwayta.jpg",
    "nadora_fortress": "nadora_fortress.jpg",
    "mustafa_kashef": "mustafa_kashef.jpg",
    "new_valley_museum": "new_valley_museum.jpg"
}

print("Converting new attraction images...")
for png_name, jpg_name in new_images.items():
    png_files = list(brain_dir.glob(f"{png_name}_*.png"))
    if png_files:
        png_path = png_files[0]
        jpg_path = locations_dir / jpg_name
        
        try:
            img = Image.open(png_path)
            rgb_img = img.convert('RGB')
            rgb_img.save(jpg_path, 'JPEG', quality=90)
            print(f"✓ Converted {jpg_name}")
        except Exception as e:
            print(f"✗ Failed: {e}")

# Setup Django
BASE_DIR = Path(__file__).resolve().parent / "backend"
sys.path.append(str(BASE_DIR))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'new_valley_hub.settings')
django.setup()

from tourism.models import Attraction
from django.core.files import File

print("\nApplying images to attractions...")

# Map images to attraction names
image_mapping = {
    "Qasr Al-Ghuwayta": "qasr_ghuwayta.jpg",
    "Al-Nadora Fortress": "nadora_fortress.jpg",
    "Deir Mustafa Kashef": "mustafa_kashef.jpg",
    "New Valley Museum": "new_valley_museum.jpg"
}

for attraction_name, image_file in image_mapping.items():
    try:
        attraction = Attraction.objects.get(name=attraction_name)
        img_path = locations_dir / image_file
        
        if img_path.exists():
            with open(img_path, 'rb') as f:
                attraction.image.save(image_file, File(f), save=True)
            print(f"✓ Added image to: {attraction_name}")
    except Attraction.DoesNotExist:
        print(f"✗ Attraction not found: {attraction_name}")
    except Exception as e:
        print(f"✗ Error: {e}")

print("\n✅ Image application complete!")
