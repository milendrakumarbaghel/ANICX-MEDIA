#!/bin/sh
# Downloads YouTube thumbnails and converts them to optimised WebP files in
# public/media/work ({id}-640.webp and {id}-1280.webp).
#
# Requires `cwebp` (macOS: `brew install webp`).
# Usage: sh scripts/fetch-thumbnails.sh 6REn-I_gkRY i1eYKDln1u8
# Afterwards, add each ID to src/data/localThumbnails.ts.
set -eu

OUT_DIR="$(dirname "$0")/../public/media/work"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT
mkdir -p "$OUT_DIR"

if ! command -v cwebp >/dev/null 2>&1; then
  echo "cwebp not found. Install it first (macOS: brew install webp)." >&2
  exit 1
fi

for id in "$@"; do
  src="$TMP_DIR/$id.jpg"
  if ! curl -fsSL -o "$src" "https://i.ytimg.com/vi/$id/maxresdefault.jpg"; then
    echo "No HD thumbnail for $id, falling back to sddefault" >&2
    curl -fsSL -o "$src" "https://i.ytimg.com/vi/$id/sddefault.jpg"
  fi
  cwebp -quiet -q 80 -resize 1280 0 -metadata none "$src" -o "$OUT_DIR/$id-1280.webp"
  cwebp -quiet -q 78 -resize 640 0 -metadata none "$src" -o "$OUT_DIR/$id-640.webp"
  echo "✓ $id  → add '$id' to src/data/localThumbnails.ts"
done
