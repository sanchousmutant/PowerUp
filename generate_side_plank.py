"""Generate side-plank stickman PNG (200x200, #00E5CC on transparent)."""
from PIL import Image, ImageDraw

COLOR = (0, 229, 204)
SIZE = 200
LINE_W = 4
HEAD_R = 16

img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
d = ImageDraw.Draw(img)

# Side plank: body sideways, one arm on ground, other arm up
# Head
cx, cy = 65, 55
d.ellipse([cx - HEAD_R, cy - HEAD_R, cx + HEAD_R, cy + HEAD_R], outline=COLOR, width=LINE_W)

# Body diagonal
d.line([(75, 68), (140, 110)], fill=COLOR, width=LINE_W)

# Bottom arm (supporting, to ground)
d.line([(75, 68), (55, 110)], fill=COLOR, width=LINE_W)
d.line([(55, 110), (50, 140)], fill=COLOR, width=LINE_W)

# Top arm (up)
d.line([(85, 75), (60, 30)], fill=COLOR, width=LINE_W)

# Legs (stacked, straight)
d.line([(140, 110), (175, 155)], fill=COLOR, width=LINE_W)
d.line([(175, 155), (180, 170)], fill=COLOR, width=LINE_W)

# Ground line
d.line([(40, 145), (185, 175)], fill=COLOR, width=LINE_W)

img.save("assets/images/side-plank.png")
print("Saved side-plank.png")
