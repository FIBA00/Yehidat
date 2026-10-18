# Gallery Guide

The gallery and the hero slideshow show photos from one folder. You don't list
photos in code. Adding, removing, or renaming a photo is a file operation followed
by one command.

---

## 1. How it works

```
src/assets/gallery/            originals (any size). NOT committed to git.
        │
        │  npm run gallery
        ▼
public/images/gallery/         responsive WebP + AVIF variants. Committed.
src/data/gallery.json          manifest: alt text, sizes, file list. Committed.
        │
        │  imported by src/data/gallery.js
        ▼
Gallery section (carousel)     all photos, lazy-loaded
Hero slideshow                 the first 6 photos (HERO_LIMIT in gallery.js)
```

The originals stay out of git because they are large (a client photo can be
several MB, and 40 of them would bloat the repository). Only the converted files
are committed, so the deployed site doesn't need the originals.

---

## 2. Adding photos

1. Copy the photos into `src/assets/gallery/`.
2. Run:

   ```bash
   npm run gallery
   ```

3. Check the output. It should end with a line like `Finished: 40/40 converted.`
4. Commit the changes in `public/images/gallery/` and `src/data/gallery.json`.
   Don't commit `src/assets/gallery/`. It is ignored automatically.
5. Build and deploy as usual.

No code changes are needed.

### Removing photos

Delete the file from `src/assets/gallery/` and run `npm run gallery` again. The
`--prune` flag in that command deletes the converted files of removed photos, so
they don't stay on the site. Commit the result.

### Renaming or reordering

Photos appear in filename order. Use two-digit numbers at the start of the name:

```
01-birthday-rooftop.jpg
02-anniversary-table.jpg
...
40-just-because.jpg
```

Numbers are sorted as text, so `1-` and `10-` would sort wrongly. Always use
`01`, `02`, ... `40`.

The number is removed from the displayed text, so `02-anniversary-table.jpg`
shows as "Anniversary table".

---

## 3. Alt text (descriptions for screen readers and search)

Each photo gets alt text, which is read by screen readers and used by search
engines. There are two ways to set it.

**From the filename (default).** `01-birthday-rooftop.jpg` becomes
"Birthday rooftop".

**From a sidecar file (better).** Create a `.txt` file with the same name:

```
src/assets/gallery/01-birthday-rooftop.jpg
src/assets/gallery/01-birthday-rooftop.txt    ← first line is the alt text
```

The `.txt` content might be:

```
Rooftop birthday with golden balloons and a custom cake
```

Use a sentence that describes the photo. Avoid the name of the client unless
they have agreed to it.

---

## 4. Image rules

| Rule | Why |
| ---- | --- |
| Use JPG, PNG, WebP, TIFF, or BMP | Other formats are ignored. |
| Any size works | Large originals are resized automatically. Very small images (narrower than 480px) are used at their original width. |
| Phone photos work | Rotation metadata (EXIF) is applied, so photos taken sideways come out upright. |
| Don't rely on the original's quality | Output quality is set in `convert_images.py` (`WEBP_QUALITY`, `AVIF_QUALITY`). |

Each photo produces 6 files: 480px, 800px, and 1200px, in WebP and AVIF. The
browser downloads only the size that fits the screen.

---

## 5. Performance

- **Lazy loading.** Gallery photos load only when they come near the visible
  part of the carousel. The first screen is not slowed down by the rest.
- **Responsive sizes.** Phones get the 480px file, desktops the 800px or 1200px.
- **Crawlers.** Every gallery photo is in the page HTML with its alt text, so
  search engines can read the descriptions without running JavaScript.

With 40 photos, about 15 are loaded at a time, so the page stays fast.

---

## 6. Hero slideshow

The hero rotates through the first `HERO_LIMIT` photos (6 by default, set in
`src/data/gallery.js`). To feature certain photos there, give them the lowest
numbers, or change `HERO_LIMIT`.

---

## 7. Troubleshooting

| Symptom | Cause | Fix |
| ------- | ----- | --- |
| "No gallery photos yet" on the site | `src/data/gallery.json` has no items | Add photos to `src/assets/gallery`, run `npm run gallery`, commit the output. |
| `npm run gallery` says `cwebp` or `avifenc` is missing | Encoders not installed | Run `sudo apt-get install -y webp libavif-bin` (Linux) or install them with Homebrew on macOS: `brew install webp libavif`. |
| `npm run gallery` says `No module named PIL` | Pillow not installed | Run `pip install pillow`. |
| A photo is sideways | The camera didn't store rotation info | Rotate the original and run the command again. |
| A removed photo still shows | Converted files weren't pruned | Run `npm run gallery` (it prunes by default), then commit. |
| The photo list is out of order | Numbers not zero-padded | Rename to `01-`, `02-`, ... `40-`. |
| Image alt text reads oddly | Filename-derived text | Add a `.txt` sidecar with the same name. |

---

## 8. Checklist before publishing new photos

- [ ] Photos are in `src/assets/gallery/` with ordering numbers
- [ ] Important photos have a `.txt` alt text
- [ ] `npm run gallery` finished with no `✗` lines
- [ ] `public/images/gallery/` and `src/data/gallery.json` are committed
- [ ] `src/assets/gallery/` is not in the commit (run `git status` to check)
- [ ] The site builds: `pnpm run build`
