from PIL import Image
from pathlib import Path
import os
import django
import sys

# Convert hotel PNGs to JPG
brain_dir = Path("C:/Users/amr mohsen/.gemini/antigravity/brain/bbf17620-9bd0-4988-82ec-f65ea5f38681")
hotels_dir = Path("backend/media/hotels")
hotels_dir.mkdir(parents=True, exist_ok=True)

# Image mapping
hotel_images = {
    "desert_hotel_luxury": "luxury_hotel.jpg",
    "budget_hotel_oasis": "budget_hotel.jpg",
    "boutique_hotel_farafra": "boutique_hotel.jpg"
}

print("Converting hotel images...")
for png_name, jpg_name in hotel_images.items():
    png_files = list(brain_dir.glob(f"{png_name}_*.png"))
    if png_files:
        png_path = png_files[0]
        jpg_path = hotels_dir / jpg_name
        
        try:
            img = Image.open(png_path)
            rgb_img = img.convert('RGB')
            rgb_img.save(jpg_path, 'JPEG', quality=90)
            print(f"✓ Converted {png_name} -> {jpg_name}")
        except Exception as e:
            print(f"✗ Failed: {e}")

print("\nNow updating hotel records with images...")

# Setup Django
BASE_DIR = Path(__file__).resolve().parent / "backend"
sys.path.append(str(BASE_DIR))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'new_valley_hub.settings')
django.setup()

from hospitality.models import Hotel
from django.core.files import File

hotels = Hotel.objects.all().order_by('id')
hotel_image_files = ['luxury_hotel.jpg', 'budget_hotel.jpg', 'boutique_hotel.jpg', 'luxury_hotel.jpg', 'budget_hotel.jpg', 'boutique_hotel.jpg']

for idx, hotel in enumerate(hotels):
    if idx < len(hotel_image_files):
        img_filename = hotel_image_files[idx]
        img_path = hotels_dir / img_filename
        
        if img_path.exists():
            with open(img_path, 'rb') as f:
                hotel.image.save(img_filename, File(f), save=True)
            print(f"✓ Added image to: {hotel.name}")
        else:
            print(f"✗ Image not found: {img_filename}")

print("\n✅ All hotels updated with images!")
