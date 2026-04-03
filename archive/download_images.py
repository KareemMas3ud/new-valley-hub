import urllib.request
import os
import time

locations_dir = "backend/media/locations"
products_dir = "backend/media/products"
os.makedirs(locations_dir, exist_ok=True)
os.makedirs(products_dir, exist_ok=True)

# using picsum for reliability
images = {
    f"{locations_dir}/white_desert.jpg": "https://picsum.photos/seed/desert/600/400",
    f"{locations_dir}/hibis.jpg": "https://picsum.photos/seed/temple/600/400",
    f"{locations_dir}/farm.jpg": "https://picsum.photos/seed/farm/600/400",
    f"{locations_dir}/farafra.jpg": "https://picsum.photos/seed/oasis/600/400",
    f"{products_dir}/dates.jpg": "https://picsum.photos/seed/dates/600/400"
}

for path, url in images.items():
    print(f"Downloading {path}...")
    try:
        # User-Agent header is sometimes needed
        req = urllib.request.Request(
            url, 
            headers={'User-Agent': 'Mozilla/5.0'}
        )
        with urllib.request.urlopen(req) as response, open(path, 'wb') as out_file:
            out_file.write(response.read())
        print("Success.")
        time.sleep(1) # Be nice to the API
    except Exception as e:
        print(f"Failed: {e}")
