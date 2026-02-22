"""Generate 10 stickman exercise PNGs (200x200, #00E5CC on transparent)."""
import math
from PIL import Image, ImageDraw

COLOR = (0, 229, 204)  # #00E5CC
SIZE = 200
LINE_W = 4
HEAD_R = 16
OUT = "assets/images"


def new():
    img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    return img, ImageDraw.Draw(img)


def head(d, cx, cy):
    d.ellipse([cx - HEAD_R, cy - HEAD_R, cx + HEAD_R, cy + HEAD_R],
              outline=COLOR, width=LINE_W)


def line(d, x1, y1, x2, y2):
    d.line([(x1, y1), (x2, y2)], fill=COLOR, width=LINE_W)


# --- 1. Jumping Jacks (star pose) ---
def jumping_jacks():
    img, d = new()
    cx, cy_head = 100, 32
    head(d, cx, cy_head)
    # body
    line(d, 100, 48, 100, 115)
    # arms up-out
    line(d, 100, 65, 55, 35)
    line(d, 100, 65, 145, 35)
    # legs out
    line(d, 100, 115, 55, 175)
    line(d, 100, 115, 145, 175)
    return img


# --- 2. Push-ups (plank-like, arms bent) ---
def push_ups():
    img, d = new()
    head(d, 40, 75)
    # body horizontal-ish
    line(d, 55, 78, 155, 90)
    # bent arms
    line(d, 55, 78, 45, 110)
    line(d, 45, 110, 55, 140)
    # back arm
    line(d, 80, 82, 70, 115)
    line(d, 70, 115, 80, 140)
    # legs
    line(d, 155, 90, 180, 130)
    line(d, 180, 130, 175, 145)
    return img


# --- 3. Squats ---
def squats():
    img, d = new()
    cx = 100
    head(d, cx, 35)
    # body
    line(d, 100, 51, 100, 100)
    # arms forward
    line(d, 100, 65, 140, 65)
    line(d, 100, 65, 60, 65)
    # bent legs
    line(d, 100, 100, 65, 120)
    line(d, 65, 120, 60, 170)
    line(d, 100, 100, 135, 120)
    line(d, 135, 120, 140, 170)
    return img


# --- 4. Plank ---
def plank():
    img, d = new()
    head(d, 35, 85)
    # body horizontal
    line(d, 50, 90, 165, 95)
    # straight arms
    line(d, 50, 90, 40, 135)
    line(d, 70, 91, 60, 135)
    # legs
    line(d, 165, 95, 185, 135)
    return img


# --- 5. Lunges ---
def lunges():
    img, d = new()
    cx = 100
    head(d, cx, 30)
    # body
    line(d, 100, 46, 100, 100)
    # arms at sides
    line(d, 100, 60, 75, 95)
    line(d, 100, 60, 125, 95)
    # front leg bent
    line(d, 100, 100, 65, 130)
    line(d, 65, 130, 60, 175)
    # back leg extended
    line(d, 100, 100, 145, 130)
    line(d, 145, 130, 165, 170)
    return img


# --- 6. High Knees ---
def high_knees():
    img, d = new()
    cx = 100
    head(d, cx, 28)
    # body
    line(d, 100, 44, 100, 105)
    # arms bent running
    line(d, 100, 60, 65, 50)
    line(d, 100, 60, 135, 85)
    # left leg - knee up high
    line(d, 100, 105, 80, 95)
    line(d, 80, 95, 75, 120)
    # right leg - standing
    line(d, 100, 105, 110, 145)
    line(d, 110, 145, 105, 180)
    return img


# --- 7. Tricep Dips ---
def tricep_dips():
    img, d = new()
    head(d, 100, 40)
    # body leaning back slightly
    line(d, 100, 56, 95, 115)
    # arms behind on bench
    line(d, 100, 65, 135, 70)
    line(d, 135, 70, 140, 100)
    # bench line
    line(d, 130, 100, 170, 100)
    # legs forward
    line(d, 95, 115, 65, 130)
    line(d, 65, 130, 50, 170)
    return img


# --- 8. Mountain Climbers ---
def mountain_climbers():
    img, d = new()
    head(d, 40, 60)
    # body diagonal
    line(d, 52, 68, 140, 100)
    # arms - straight to ground
    line(d, 55, 72, 45, 120)
    line(d, 70, 78, 60, 120)
    # one knee tucked
    line(d, 140, 100, 100, 95)
    line(d, 100, 95, 90, 120)
    # one leg extended
    line(d, 140, 100, 175, 125)
    line(d, 175, 125, 185, 140)
    return img


# --- 9. Glute Bridges ---
def glute_bridges():
    img, d = new()
    # lying on back with hips raised
    head(d, 35, 130)
    # upper body on ground
    line(d, 50, 128, 90, 110)
    # hips up
    line(d, 90, 110, 110, 85)
    # thighs down
    line(d, 110, 85, 140, 120)
    # shins
    line(d, 140, 120, 145, 160)
    # arms on ground
    line(d, 60, 125, 50, 160)
    line(d, 75, 118, 65, 155)
    return img


# --- 10. Burpees (jumping up) ---
def burpees():
    img, d = new()
    cx = 100
    head(d, cx, 25)
    # body
    line(d, 100, 41, 100, 105)
    # arms up
    line(d, 100, 55, 60, 20)
    line(d, 100, 55, 140, 20)
    # legs slightly bent (just jumped)
    line(d, 100, 105, 80, 140)
    line(d, 80, 140, 75, 175)
    line(d, 100, 105, 120, 140)
    line(d, 120, 140, 125, 175)
    # ground indicator
    line(d, 50, 185, 150, 185)
    return img


exercises = [
    ("jumping-jacks", jumping_jacks),
    ("push-ups", push_ups),
    ("squats", squats),
    ("plank", plank),
    ("lunges", lunges),
    ("high-knees", high_knees),
    ("tricep-dips", tricep_dips),
    ("mountain-climbers", mountain_climbers),
    ("glute-bridges", glute_bridges),
    ("burpees", burpees),
]

for name, func in exercises:
    img = func()
    path = f"{OUT}/{name}.png"
    img.save(path)
    print(f"Saved {path}")

print("Done!")
