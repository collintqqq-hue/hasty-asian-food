"""
Builds the printed marketing pieces.

The photography comes from Higgsfield, composed with a deliberate empty band.
All TEXT is drawn here rather than by the image model: these carry a website and
a phone number, and an image model garbles long strings like
"asianfoodtakeout.ca". Drawing it means every character is exact and stays
crisp at print size.

    python marketing/make-posters.py

Requires Pillow. Outputs to marketing/out/.
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
from pathlib import Path

HERE = Path(__file__).parent
RAW = HERE / "raw"
OUT = HERE / "out"
OUT.mkdir(exist_ok=True)
LOGO = HERE.parent / "src" / "assets" / "brand" / "logo.png"

F = "C:/Windows/Fonts/"
SERIF        = F + "georgia.ttf"
SERIF_BOLD   = F + "georgiab.ttf"
SERIF_ITALIC = F + "georgiai.ttf"
SANS         = F + "segoeui.ttf"
SANS_BOLD    = F + "segoeuib.ttf"

CREAM      = (247, 242, 233)
BRASS      = (201, 164, 91)
BRASS_SOFT = (224, 196, 140)
WHITE      = (255, 255, 255)
RED        = (176, 32, 28)

# Verified facts only. No prices for the new items — none were supplied, and a
# printed poster outlives a price list anyway.
PHONE   = "(343) 998-8051"
SITE    = "asianfoodtakeout.ca"
ADDRESS = "2361 Carling Avenue, Ottawa"
INSIDE  = "INSIDE HASTY MARKET"
# The flyer prints "11am to 9pm" with no days. "OPEN DAILY" would be a claim
# nobody has made \u2014 do not put it on something that gets printed and nailed up.
HOURS   = "KITCHEN  11 AM \u2013 9 PM"


def font(path, size):
    return ImageFont.truetype(path, size)


def text_w(draw, s, fnt, tracking=0):
    if not tracking:
        return draw.textlength(s, font=fnt)
    return sum(draw.textlength(c, font=fnt) for c in s) + tracking * (len(s) - 1)


def draw_tracked(draw, xy, s, fnt, fill, tracking=0, anchor_center=None):
    """Pillow has no letter-spacing, so draw glyph by glyph."""
    x, y = xy
    if anchor_center is not None:
        x = anchor_center - text_w(draw, s, fnt, tracking) / 2
    if not tracking:
        draw.text((x, y), s, font=fnt, fill=fill)
        return
    for c in s:
        draw.text((x, y), c, font=fnt, fill=fill)
        x += draw.textlength(c, font=fnt) + tracking


def centered(draw, y, s, fnt, fill, W, tracking=0):
    draw_tracked(draw, (0, y), s, fnt, fill, tracking, anchor_center=W / 2)


def scrim(img, start_frac, opacity=245, top=False):
    """
    Vertical gradient to black so type is always legible over photography, and
    so the hard wood-to-black seam in some frames is blended away.
    """
    W, H = img.size
    grad = Image.new("L", (1, H), 0)
    px = grad.load()
    start = int(H * start_frac)
    for y in range(H):
        if top:
            t = 0 if y > start else (start - y) / max(start, 1)
        else:
            t = 0 if y < start else (y - start) / max(H - start, 1)
        px[0, y] = int(opacity * (t ** 1.35))
    mask = grad.resize((W, H))
    black = Image.new("RGB", (W, H), (0, 0, 0))
    return Image.composite(black, img, mask)


def circle_logo(size):
    lg = Image.open(LOGO).convert("RGB").resize((size, size), Image.LANCZOS)
    mask = Image.new("L", (size * 4, size * 4), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, size * 4 - 1, size * 4 - 1), fill=255)
    mask = mask.resize((size, size), Image.LANCZOS)
    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(lg, (0, 0), mask)
    return out


def rule(draw, y, W, width_frac=0.16, color=BRASS, thickness=3):
    half = W * width_frac / 2
    draw.rectangle([W / 2 - half, y, W / 2 + half, y + thickness], fill=color)


def footer_block(draw, W, y, big_site=True):
    """Website, phone, address, hours — the part that has to be right."""
    f_site = font(SANS_BOLD, int(W * (0.062 if big_site else 0.05)))
    f_ph = font(SERIF_BOLD, int(W * 0.055))
    f_sm = font(SANS, int(W * 0.026))

    centered(draw, y, SITE, f_site, BRASS_SOFT, W, tracking=W * 0.001)
    y += f_site.size * 1.35
    centered(draw, y, PHONE, f_ph, CREAM, W)
    y += f_ph.size * 1.5
    centered(draw, y, ADDRESS, f_sm, CREAM, W, tracking=W * 0.0012)
    y += f_sm.size * 1.55
    centered(draw, y, HOURS, f_sm, BRASS, W, tracking=W * 0.0022)
    return y + f_sm.size


# ─────────────────────────── layouts ───────────────────────────
#
# Both signs sit ON the building, so the street address is dead weight on each:
# a driver on Carling can see the place, and anyone reading the window is
# standing on it. That space buys legibility instead.

def rows_max_width(rows):
    """Widest text row. The fit loop originally checked height only, and
    "VIETNAMESE" ran off both edges of the road sign."""
    probe = ImageDraw.Draw(Image.new("RGB", (8, 8)))
    w = 0
    for r in rows:
        if r[0] == "text":
            w = max(w, text_w(probe, r[1], r[2], r[4]))
    return w


def rows_height(rows):
    h = 0
    for r in rows:
        if r[0] == "logo":
            h += r[1] + r[2]
        elif r[0] == "rule":
            h += 3 + r[1]
        else:
            h += int(r[2].size * 1.02) + r[5]
    return h


def draw_rows(img, d, rows, W, y):
    for r in rows:
        if r[0] == "logo":
            lg = circle_logo(r[1])
            img.paste(lg, (int(W / 2 - lg.width / 2), int(y)), lg)
            y += r[1] + r[2]
        elif r[0] == "rule":
            rule(d, y, W)
            y += 3 + r[1]
        else:
            _, txt, fnt, fill, tr, gap = r
            centered(d, y, txt, fnt, fill, W, tracking=tr)
            y += int(fnt.size * 1.02) + gap
    return y


def render(src, out_name, build, scrim_from, clear_from):
    """Shrink the block until it provably fits, then bottom-anchor it."""
    img = Image.open(RAW / src).convert("RGB")
    W, H = img.size
    img = scrim(img, scrim_from, 250)
    d = ImageDraw.Draw(img)

    bottom = int(H * 0.055)
    available = H - bottom - int(H * clear_from)

    scale = 1.0
    while scale > 0.4:
        rows = build(W, scale)
        if rows_height(rows) <= available and rows_max_width(rows) <= W * 0.88:
            break
        scale -= 0.02

    total = rows_height(rows)
    y = H - bottom - total
    draw_rows(img, d, rows, W, y)

    assert rows_max_width(rows) <= W * 0.90, f"{out_name}: text wider than canvas"
    assert y > 0, f"{out_name}: text block overflows the top"
    img.save(OUT / out_name, quality=95, dpi=(300, 300))
    print(f"  {out_name}  {W}x{H}  (scale {scale:.2f})")


def road_sign(src, out_name, line1, line2, also):
    """
    Drive-by. Four elements, nothing else — headline, what else we do, the
    instruction, the website. No address, no hours, no phone: nobody reads a
    phone number at 50 km/h, and every extra line shrinks the ones that matter.
    """
    def build(W, scale):
        fh = font(SERIF_BOLD, int(W * 0.150 * scale))
        fa = font(SANS_BOLD, int(W * 0.040 * scale))
        floc = font(SANS_BOLD, int(W * 0.062 * scale))
        fs = font(SANS_BOLD, int(W * 0.068 * scale))
        return [
            ("text", line1, fh, CREAM, 0, int(fh.size * 0.06)),
            ("text", line2, fh, CREAM, 0, int(W * 0.028 * scale)),
            ("text", also, fa, BRASS, W * 0.005 * scale, int(W * 0.034 * scale)),
            ("rule", int(W * 0.030 * scale)),
            ("text", INSIDE, floc, CREAM, W * 0.007 * scale, int(W * 0.030 * scale)),
            ("text", SITE, fs, BRASS_SOFT, 0, 0),
        ]
    render(src, out_name, build, 0.36, 0.40)


def window_sign(src, out_name, kicker, headline_lines, items):
    """
    Read from a few feet, standing still. Carries the dish list and — the thing
    a person at the glass actually wants to know — the hours.
    """
    def build(W, scale):
        rows = [("logo", int(W * 0.125 * scale), int(W * 0.028 * scale))]
        rows.append(("text", kicker, font(SANS_BOLD, int(W * 0.024 * scale)), BRASS,
                     W * 0.006 * scale, int(W * 0.028 * scale)))
        fh = font(SERIF_BOLD, int(W * 0.086 * scale))
        for i, line in enumerate(headline_lines):
            gap = int(fh.size * 0.13) if i < len(headline_lines) - 1 else int(W * 0.026 * scale)
            rows.append(("text", line, fh, CREAM, 0, gap))
        rows.append(("rule", int(W * 0.020 * scale)))
        fi = font(SERIF_ITALIC, int(W * 0.038 * scale))
        for i, line in enumerate(items):
            gap = int(fi.size * 0.32) if i < len(items) - 1 else int(W * 0.034 * scale)
            rows.append(("text", line, fi, BRASS_SOFT, 0, gap))
        rows.append(("text", HOURS, font(SANS_BOLD, int(W * 0.042 * scale)), CREAM,
                     W * 0.005 * scale, int(W * 0.030 * scale)))
        rows.append(("text", SITE, font(SANS_BOLD, int(W * 0.056 * scale)), BRASS_SOFT,
                     W * 0.001, int(W * 0.016 * scale)))
        rows.append(("text", PHONE, font(SERIF_BOLD, int(W * 0.052 * scale)), CREAM,
                     0, int(W * 0.016 * scale)))
        rows.append(("text", INSIDE, font(SANS, int(W * 0.028 * scale)), BRASS,
                     W * 0.004 * scale, 0))
        return rows
    render(src, out_name, build, 0.40, 0.44)


def business_card(src):
    """3.5 x 2 in at 300 dpi, plus 1/8 in bleed all round."""
    BLEED = 38
    TW, TH = 1050, 600
    W, H = TW + BLEED * 2, TH + BLEED * 2

    bg = Image.open(RAW / src).convert("RGB")
    scale = max(W / bg.width, H / bg.height)
    bg = bg.resize((int(bg.width * scale) + 1, int(bg.height * scale) + 1), Image.LANCZOS)
    left = (bg.width - W) // 2
    bg = bg.crop((left, (bg.height - H) // 2, left + W, (bg.height - H) // 2 + H))

    # Darken the left so the type has a clean bed.
    grad = Image.new("L", (W, 1), 0)
    px = grad.load()
    for x in range(W):
        px[x, 0] = int(232 * max(0.0, 1 - (x / W) / 0.82) ** 0.85)
    bg = Image.composite(Image.new("RGB", (W, H), (0, 0, 0)), bg, grad.resize((W, H)))

    d = ImageDraw.Draw(bg)
    lg = circle_logo(int(TH * 0.42))
    lx, ly = BLEED + int(TW * 0.055), BLEED + int(TH * 0.14)
    bg.paste(lg, (lx, ly), lg)

    x = lx + lg.width + int(TW * 0.045)
    y = ly + int(TH * 0.02)

    # Keep every line inside the print safe area. At full size the name reached
    # within 20px of the trim edge, and a guillotine is not that accurate.
    safe_right = BLEED + TW - int(TW * 0.05)
    name_size = int(TH * 0.105)
    while name_size > 24:
        f_n = font(SERIF_BOLD, name_size)
        if x + d.textlength("Asian Food Take Out", font=f_n) <= safe_right:
            break
        name_size -= 2
    d.text((x, y), "Asian Food Take Out", font=f_n, fill=CREAM)
    y += f_n.size * 1.25
    f_h = font(SANS_BOLD, int(TH * 0.042))
    draw_tracked(d, (x, y), "AT HASTY MARKET", f_h, BRASS, tracking=TH * 0.012)
    y += f_h.size * 2.5

    f_s = font(SANS_BOLD, int(TH * 0.062))
    d.text((x, y), SITE, font=f_s, fill=BRASS_SOFT)
    y += f_s.size * 1.35
    f_p = font(SERIF_BOLD, int(TH * 0.062))
    d.text((x, y), PHONE, font=f_p, fill=CREAM)
    y += f_p.size * 1.35
    f_a = font(SANS, int(TH * 0.038))
    d.text((x, y), ADDRESS, font=f_a, fill=(190, 182, 170))

    for label, fnt in (("site", f_s), ("phone", f_p), ("address", f_a)):
        txt = {"site": SITE, "phone": PHONE, "address": ADDRESS}[label]
        assert x + d.textlength(txt, font=fnt) <= safe_right + 2, f"card: {label} outside safe area"

    bg.save(OUT / "05-business-card-with-bleed.jpg", quality=96, dpi=(300, 300))
    bg.crop((BLEED, BLEED, BLEED + TW, BLEED + TH)).save(
        OUT / "05-business-card-trim.jpg", quality=96, dpi=(300, 300))
    print(f"  05-business-card  {W}x{H} (bleed) and {TW}x{TH} (trim)")


print("building sign options\n")
print(" ROAD — read from a moving car")
road_sign("p4-roadsign.png", "ROAD-A-vietnamese.jpg",
          "VIETNAMESE", "SUBS", "BURGERS · PIZZA · POUTINE")
road_sign("p3-mixed.png", "ROAD-B-everything.jpg",
          "ASIAN FOOD", "& MORE", "SUBS · BURGERS · PIZZA · POUTINE")

print("\n WINDOW — read standing at the glass")
window_sign("p1-asian.png", "WINDOW-A-asian.jpg",
            "MADE FRESH TO ORDER",
            ["Vietnamese", "Take Out"],
            ["Banh Mi Subs  ·  Fresh Rolls",
             "Pad Thai  ·  Vermicelli  ·  Noodle Soup"])
window_sign("p2-comfort.png", "WINDOW-B-comfort.jpg",
            "NOW SERVING",
            ["Burgers", "& More"],
            ["Burgers  ·  Hot Dogs  ·  Pizza",
             "Poutine  ·  Fries"])

print()
business_card("card-bg.png")
print("\ndone — marketing/out/")
