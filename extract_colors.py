
import sys
from collections import Counter
from PIL import Image

def get_palette(image_path, n=5):
    try:
        image = Image.open(image_path)
        image = image.convert('RGB')
        image = image.resize((150, 150)) # Resize for speed
        pixels = list(image.getdata())
        counts = Counter(pixels)
        most_common = counts.most_common(n)
        
        print("Extracted Palette:")
        for color, count in most_common:
            hex_color = '#{:02x}{:02x}{:02x}'.format(*color)
            print(f"- {hex_color}")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        get_palette(sys.argv[1])
    else:
        print("Usage: python extract_colors.py <image_path>")
