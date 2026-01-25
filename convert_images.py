from PIL import Image
import os
from pathlib import Path

# Convert all PNG images to JPG
media_dir = Path("backend/media/locations")
brain_dir = Path("C:/Users/amr mohsen/.gemini/antigravity/brain/bbf17620-9bd0-4988-82ec-f65ea5f38681")

# Image mapping: artifact_name -> (output_filename, attraction_names)
image_map = {
    "white_desert_real": ("white_desert.jpg", ["White Desert National Park", "Crystal Mountain"]),
    "hibis_temple_real": ("hibis_temple.jpg", ["Temple of Hibis", "Necropolis of Al-Bagawat", "Deir El-Hagar Temple", "Qasr El-Labeka", "Muzawaka Tombs"]),
    "farafra_oasis_real": ("farafra_oasis.jpg", ["Farafra Oasis", "Kharga Oasis"]),
    "dakhla_village_real": ("dakhla_village.jpg", ["Al-Qasr Islamic Village", "Dakhla Oasis", "Mut Village", "Balat Village"]),
    "date_farm_real": ("date_farm.jpg", ["Date Palm Farms"]),
    "black_desert_real": ("black_desert.jpg", ["Black Desert"]),
    "necropolis_real": ("necropolis.jpg", None),  # Alternative image
    "hot_spring_real": ("hot_spring.jpg", ["Bir Sahara Desert Spring"]),
    "crystal_mountain_real": ("crystal_mountain.jpg", None),  # Alternative image
    "marketplace_dates_real": ("marketplace_dates.jpg", None),  # For marketplace
}

print("Converting PNG images to JPG...")
for png_name, (jpg_name, _) in image_map.items():
    # Find the PNG file (with timestamp)
    png_files = list(brain_dir.glob(f"{png_name}_*.png"))
    if png_files:
        png_path = png_files[0]
        jpg_path = media_dir / jpg_name
        
        # Convert PNG to JPG
        try:
            img = Image.open(png_path)
            rgb_img = img.convert('RGB')
            rgb_img.save(jpg_path, 'JPEG', quality=90)
            print(f"✓ Converted {png_name} -> {jpg_name}")
        except Exception as e:
            print(f"✗ Failed to convert {png_name}: {e}")
    else:
        print(f"- PNG file not found for {png_name}")

# Also copy to products folder
products_dir = Path("backend/media/products")
products_dir.mkdir(parents=True, exist_ok=True)

marketplace_png = list(brain_dir.glob("marketplace_dates_real_*.png"))
if marketplace_png:
    img = Image.open(marketplace_png[0])
    rgb_img = img.convert('RGB')
    rgb_img.save(products_dir / "dates.jpg", 'JPEG', quality=90)
    print("✓ Converted marketplace dates image")

print("\nAll images converted successfully!")
