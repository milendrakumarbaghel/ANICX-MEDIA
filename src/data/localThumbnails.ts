/**
 * YouTube IDs that have optimised local thumbnails in /public/media/work
 * ({id}-640.webp, {id}-960.webp and {id}-1280.webp).
 *
 * Generate them with:  sh scripts/fetch-thumbnails.sh <youtubeId> [...more ids]
 * then add the IDs here. Videos not listed fall back to YouTube's thumbnail CDN.
 */
export const localThumbnails = new Set<string>([
  '1O9qBccQQkQ',
  '6REn-I_gkRY',
  '6hGbu1mKA74',
  'AcIlBkDe4Q8',
  'BZZ_sTI_ooM',
  'EpkBGucmx8o',
  'LaaUW5-bi5Q',
  'Obajy4nJpaU',
  'VFi3RRMqnsw',
  'WaQc7Kek10o',
  'WucbntAipEA',
  'YtG7_G9lzOU',
  'a5wfeoWVRMM',
  'eQZMCXSngnc',
  'i1eYKDln1u8',
  'kc4FHnDFg6s',
  'ldmmcyRpMCg',
  'ppOco6q4KFM',
  'r1n6fancKJ8',
  'sQmVGY3WeKM',
])
