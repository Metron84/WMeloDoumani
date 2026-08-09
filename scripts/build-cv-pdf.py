#!/usr/bin/env python3
"""
Build public/melo-doumani-cv.pdf straight from src/data/cv.ts.

The site and the downloadable CV read from the same source, so they can never
disagree. Re-run this after any edit to cv.ts:

    python3 scripts/build-cv-pdf.py
"""
import os
import re
import sys

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "src", "data", "cv.ts")
OUT = os.path.join(ROOT, "public", "melo-doumani-cv.pdf")

# --- brand ------------------------------------------------------------------
NAVY = HexColor("#0A111F")
CREAM = HexColor("#F2EDE4")
RED = HexColor("#D8232A")
MUTE = HexColor("#6B7280")
RULE = HexColor("#D5CEC1")

# Archivo and Newsreader are not installed here, so the PDF uses the closest
# available pairing: a grotesque for display, a serif for body.
FONT_CANDIDATES = {
    "Display": [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
    ],
    "DisplayR": [
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    ],
    "Body": [
        "/System/Library/Fonts/Supplemental/Times New Roman.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf",
    ],
    "BodyB": [
        "/System/Library/Fonts/Supplemental/Times New Roman Bold.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf",
    ],
}
for name, candidates in FONT_CANDIDATES.items():
    path = next((p for p in candidates if os.path.isfile(p)), None)
    if not path:
        raise SystemExit(
            f"Missing font for {name}. Tried: {', '.join(candidates)}"
        )
    pdfmetrics.registerFont(TTFont(name, path))

W, H = A4
M = 46          # page margin
COL = 150       # left column width for periods / labels


# --- read cv.ts -------------------------------------------------------------
def load():
    src = open(SRC, encoding="utf-8").read()

    def arr(name):
        m = re.search(r"export const " + name + r"[^=]*=\s*\[(.*?)\n\];", src, re.S)
        return m.group(1) if m else ""

    def chunks(body):
        out, depth, cur = [], 0, ""
        for ch in body:
            if ch == "{":
                depth += 1
                if depth == 1:
                    cur = ""
                    continue
            elif ch == "}":
                depth -= 1
                if depth == 0:
                    out.append(cur)
                    continue
            if depth >= 1:
                cur += ch
        return out

    def objs(name):
        res = []
        for c in chunks(arr(name)):
            d = dict(re.findall(r'(\w+):\s*\n?\s*"((?:[^"\\]|\\.)*)"', c))
            if d:
                res.append({k: v.replace('\\"', '"') for k, v in d.items()})
        return res

    def credits(name):
        res = []
        for c in chunks(arr(name)):
            p = re.search(r'period:\s*"([^"]*)"', c)
            if not p:
                continue
            res.append(
                {
                    "period": p.group(1),
                    "role": re.search(r'role:\s*"([^"]*)"', c).group(1),
                    "org": re.search(r'org:\s*"([^"]*)"', c).group(1),
                    "detail": [
                        d.replace('\\"', '"')
                        for d in re.findall(r'^\s{6}"((?:[^"\\]|\\.)*)",?$', c, re.M)
                    ],
                }
            )
        return res

    def obj(name, field):
        blk = re.search(r"export const " + name + r"\s*=\s*\{(.*?)\n\};", src, re.S).group(1)
        m = re.search(field + r':\s*\n?\s*"((?:[^"\\]|\\.)*)"', blk)
        return m.group(1).replace('\\"', '"') if m else ""

    ident = {
        f: obj("identity", f)
        for f in ["name", "role", "location", "visa", "summary", "email", "phone"]
    }
    metrics = re.findall(
        r'value: "([^"]*)", label: "([^"]*)"',
        re.search(r"metrics: \[(.*?)\n  \]", src, re.S).group(1),
    )
    stack = [
        (g, re.findall(r'"([^"]*)"', i))
        for g, i in re.findall(r'group: "([^"]*)",\s*\n\s*items: \[(.*?)\]', src, re.S)
    ]
    return dict(
        ident=ident,
        experience=credits("experience"),
        films=objs("films"),
        built=objs("built"),
        capability=objs("capability"),
        languages=objs("languages"),
        books=objs("books"),
        papers=objs("papers"),
        links=objs("links"),
        metrics=metrics,
        stack=stack,
        markets=obj("traction", "markets"),
        since=obj("traction", "since"),
    )


# --- drawing helpers --------------------------------------------------------
class Page:
    def __init__(self, c):
        self.c = c
        self.y = H - M

    def space(self, n):
        self.y -= n

    def need(self, n):
        if self.y - n < M + 24:
            self.footer()
            self.c.showPage()
            self.y = H - M

    def footer(self):
        self.c.setFont("DisplayR", 7)
        self.c.setFillColor(MUTE)
        self.c.drawString(M, M - 10, "melodoumani.com")
        self.c.drawRightString(W - M, M - 10, "W. Melo Doumani")

    def rule(self, colour=RULE, weight=0.6):
        self.c.setStrokeColor(colour)
        self.c.setLineWidth(weight)
        self.c.line(M, self.y, W - M, self.y)

    def label(self, text, colour=RED):
        self.need(24)
        self.c.setFont("Display", 7.5)
        self.c.setFillColor(colour)
        self.c.drawString(M, self.y, text.upper())
        self.space(14)

    def heading(self, text):
        self.need(46)
        self.space(6)
        self.rule(NAVY, 1.6)
        self.space(15)
        self.c.setFont("Display", 15)
        self.c.setFillColor(NAVY)
        self.c.drawString(M, self.y, text.upper())
        self.space(17)

    def wrap(self, text, font, size, width, x, leading, colour=NAVY):
        self.c.setFont(font, size)
        self.c.setFillColor(colour)
        words, line = text.split(), ""
        for word in words:
            trial = (line + " " + word).strip()
            if pdfmetrics.stringWidth(trial, font, size) <= width:
                line = trial
            else:
                self.need(leading)
                self.c.setFont(font, size)
                self.c.setFillColor(colour)
                self.c.drawString(x, self.y, line)
                self.space(leading)
                line = word
        if line:
            self.need(leading)
            self.c.setFont(font, size)
            self.c.setFillColor(colour)
            self.c.drawString(x, self.y, line)
            self.space(leading)


def build():
    d = load()
    i = d["ident"]
    c = canvas.Canvas(OUT, pagesize=A4)
    c.setTitle(f"{i['name']} — CV")
    c.setAuthor(i["name"])
    c.setSubject(i["role"])

    # --- masthead -----------------------------------------------------------
    c.setFillColor(NAVY)
    c.rect(0, H - 132, W, 132, fill=1, stroke=0)
    c.setFillColor(RED)
    c.rect(0, H - 136, W, 4, fill=1, stroke=0)

    c.setFont("Display", 30)
    c.setFillColor(CREAM)
    c.drawString(M, H - 62, i["name"].upper())
    c.setFont("DisplayR", 10)
    c.setFillColor(CREAM)
    c.drawString(M, H - 82, i["role"])
    c.setFont("DisplayR", 8.5)
    c.setFillColor(HexColor("#B9B4AA"))
    c.drawString(
        M,
        H - 104,
        f"{i['location']}  ·  {i['visa']}  ·  {i['phone']}  ·  {i['email']}  ·  melodoumani.com",
    )

    p = Page(c)
    p.y = H - 168

    # --- summary ------------------------------------------------------------
    p.wrap(i["summary"], "Body", 10, W - 2 * M, M, 14)
    p.space(6)

    # --- headline numbers ---------------------------------------------------
    p.heading("The Reflective Football, " + d["since"].lower())
    cols, gap = 3, 14
    cw = (W - 2 * M - gap * (cols - 1)) / cols
    rows = [d["metrics"][x : x + cols] for x in range(0, len(d["metrics"]), cols)]
    for row in rows:
        p.need(48)
        top = p.y
        for n, (val, lab) in enumerate(row):
            x = M + n * (cw + gap)
            c.setFont("Display", 17)
            c.setFillColor(RED)
            c.drawString(x, top - 4, val)
            c.setFont("DisplayR", 7.5)
            c.setFillColor(MUTE)
            words, line, yy = lab.split(), "", top - 18
            for word in words:
                trial = (line + " " + word).strip()
                if pdfmetrics.stringWidth(trial, "DisplayR", 7.5) <= cw:
                    line = trial
                else:
                    c.drawString(x, yy, line)
                    yy -= 9
                    line = word
            if line:
                c.drawString(x, yy, line)
        p.space(50)
    p.space(-6)
    c.setFont("DisplayR", 8)
    c.setFillColor(NAVY)
    p.need(14)
    c.drawString(M, p.y, "Top markets: " + d["markets"].replace(" · ", ", "))
    p.space(16)

    # --- experience ---------------------------------------------------------
    p.heading("Experience")
    for e in d["experience"]:
        p.need(56)
        top = p.y
        c.setFont("Display", 8)
        c.setFillColor(MUTE)
        c.drawString(M, top, e["period"].upper())
        c.setFont("Display", 11.5)
        c.setFillColor(NAVY)
        c.drawString(M + COL, top, e["role"])
        c.setFont("DisplayR", 8.5)
        c.setFillColor(RED)
        c.drawString(M + COL, top - 12, e["org"])
        p.space(26)
        for line in e["detail"]:
            p.need(13)
            c.setFillColor(RED)
            c.setFont("Body", 9.5)
            c.drawString(M + COL, p.y, "—")
            p.wrap(line, "Body", 9.5, W - M - (M + COL) - 14, M + COL + 14, 12.5)
            p.space(2)
        p.space(5)

    # --- films --------------------------------------------------------------
    p.heading("Selected films")
    for f in d["films"]:
        p.need(16)
        c.setFont("Display", 8)
        c.setFillColor(MUTE)
        c.drawString(M, p.y, f["club"].upper())
        c.setFont("BodyB", 9.5)
        c.setFillColor(NAVY)
        c.drawString(M + COL, p.y, f["title"])
        c.setFont("Body", 9)
        c.setFillColor(MUTE)
        c.drawRightString(W - M, p.y, f["venue"])
        p.space(15)

    # --- built --------------------------------------------------------------
    p.heading("Built")
    for b in d["built"]:
        p.need(34)
        c.setFont("Display", 8)
        c.setFillColor(RED)
        c.drawString(M, p.y, b["kind"].upper())
        c.setFont("Display", 10.5)
        c.setFillColor(NAVY)
        c.drawString(M + COL, p.y, b["title"])
        p.space(14)
        p.wrap(b["blurb"], "Body", 9, W - M - (M + COL), M + COL, 12)
        p.space(1)
        p.wrap(b["stack"], "DisplayR", 7.5, W - M - (M + COL), M + COL, 10, MUTE)
        p.space(5)

    # --- capability ---------------------------------------------------------
    p.heading("Strategy and research")
    for cap in d["capability"]:
        p.need(30)
        c.setFont("Display", 10)
        c.setFillColor(NAVY)
        c.drawString(M, p.y, cap["name"].upper())
        p.space(13)
        p.wrap(cap["detail"], "Body", 9.5, W - 2 * M, M, 12.5)
        p.space(5)

    # --- toolkit and languages ---------------------------------------------
    p.heading("Toolkit and languages")
    for group, items in d["stack"]:
        p.need(22)
        c.setFont("Display", 8)
        c.setFillColor(RED)
        c.drawString(M, p.y, group.upper())
        p.wrap(", ".join(items), "Body", 9.5, W - M - (M + COL), M + COL, 12)
        p.space(6)
    p.need(22)
    c.setFont("Display", 8)
    c.setFillColor(RED)
    c.drawString(M, p.y, "LANGUAGES")
    p.wrap(
        ", ".join(f"{l['name']} ({l['level'].lower()})" for l in d["languages"]),
        "Body",
        9.5,
        W - M - (M + COL),
        M + COL,
        12,
    )
    p.space(6)

    # --- published ----------------------------------------------------------
    p.heading("Published")
    p.label("Books")
    for b in d["books"]:
        p.need(13)
        c.setFont("Body", 9.5)
        c.setFillColor(NAVY)
        c.drawString(M, p.y, b["title"])
        c.setFont("DisplayR", 7.5)
        c.setFillColor(MUTE)
        c.drawRightString(W - M, p.y, b["meta"])
        p.space(13)
    p.space(6)
    p.label("Papers")
    for pa in d["papers"]:
        p.wrap(pa["title"], "Body", 9.5, W - 2 * M - 60, M, 12.5)
        p.wrap(pa["href"], "DisplayR", 7.5, W - 2 * M, M, 11, MUTE)
        p.space(5)

    # --- close --------------------------------------------------------------
    p.need(40)
    p.space(6)
    p.rule(RED, 2)
    p.space(16)
    c.setFont("Display", 9)
    c.setFillColor(NAVY)
    c.drawString(M, p.y, i["email"].upper() + "   ·   " + i["phone"])
    p.space(12)
    p.wrap(
        "   ·   ".join(l["href"].replace("https://", "") for l in d["links"]),
        "DisplayR",
        8,
        W - 2 * M,
        M,
        11,
        MUTE,
    )

    p.footer()
    c.save()
    print("wrote", OUT, os.path.getsize(OUT) // 1024, "KB")


if __name__ == "__main__":
    if not os.path.exists(SRC):
        sys.exit("cv.ts not found")
    build()
