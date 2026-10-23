import type { OriginalProject, WorkCategory, WorkItem } from '../types/content'

/**
 * Portfolio + original projects.
 *
 * Sources supplied by the client:
 * - Raaz Wali Raat: https://www.youtube.com/@Raazwaliraat/videos
 * - Panga Toonz:    https://www.youtube.com/@Pangatoonz
 *
 * Titles below are the published YouTube titles (cleaned of SEO tags).
 * Descriptions only restate what each title and channel description say.
 *
 * To add a video: copy an entry, set a unique `id`, paste the YouTube ID
 * (the part after "watch?v="), choose a category, and set status: 'approved'.
 */

export const workCategories: { id: WorkCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: '2d-animation', label: '2D Animation' },
  { id: '3d-animation', label: '3D Animation' },
  { id: 'product-animation', label: 'Product Animation' },
  { id: 'video-editing', label: 'Video Editing' },
  { id: 'promotional', label: 'Promotional Content' },
]

export const categoryLabel = (id: WorkCategory): string =>
  workCategories.find((c) => c.id === id)?.label ?? id

const RAAZ = 'Raaz Wali Raat'
const PANGA = 'Panga Toonz'

export const workItems: WorkItem[] = [
  {
    id: 'panga-toonz-dandia',
    status: 'approved',
    featured: true,
    title: 'Rinku Tony Ki Dandia',
    category: '3d-animation',
    description: 'A Navratri special episode of Panga Toonz, the desi comedy series in 3D animation.',
    youtubeId: '6REn-I_gkRY',
    projectSlug: 'panga-toonz',
    source: PANGA,
  },
  {
    id: 'raaz-kaalnetri',
    status: 'approved',
    featured: true,
    title: 'Kaalnetri',
    category: '2d-animation',
    description: 'Ek shrapit pishachini: a 2D animated Hindi horror story from Raaz Wali Raat.',
    youtubeId: 'i1eYKDln1u8',
    projectSlug: 'raaz-wali-raat',
    source: RAAZ,
    advisory: '18+',
  },
  {
    id: 'panga-toonz-makdaman',
    status: 'approved',
    featured: true,
    title: 'Pinky Chirkut aur Hero Makdaman Ki Entry',
    category: '3d-animation',
    description: 'The full-part Makdaman video from Panga Toonz, the desi comedy series in 3D animation.',
    youtubeId: 'BZZ_sTI_ooM',
    projectSlug: 'panga-toonz',
    source: PANGA,
  },
  {
    id: 'raaz-kaalchakra-trailer',
    status: 'approved',
    featured: true,
    title: 'Kaalchakra: Official Trailer',
    category: 'promotional',
    description: 'The official trailer for Kaalchakra, a Raaz Wali Raat horror story.',
    youtubeId: 'kc4FHnDFg6s',
    projectSlug: 'raaz-wali-raat',
    source: RAAZ,
    advisory: '18+',
  },
  {
    id: 'panga-toonz-ganpati',
    status: 'approved',
    featured: true,
    title: 'Ganpati Visarjan Ki Dhamakedar Episode',
    category: '3d-animation',
    description: 'A festive Ganpati Visarjan episode of Panga Toonz in 3D animation.',
    youtubeId: 'YtG7_G9lzOU',
    projectSlug: 'panga-toonz',
    source: PANGA,
  },
  {
    id: 'raaz-vikraal',
    status: 'approved',
    featured: true,
    title: 'Vikraal',
    category: '2d-animation',
    description: 'An animated horror story from Raaz Wali Raat.',
    youtubeId: 'EpkBGucmx8o',
    projectSlug: 'raaz-wali-raat',
    source: RAAZ,
    advisory: '18+',
  },
  {
    id: 'raaz-kaalchakra',
    status: 'approved',
    title: 'Kaalchakra',
    category: '2d-animation',
    description: 'The full Kaalchakra horror story, animated in 2D for Raaz Wali Raat.',
    youtubeId: 'VFi3RRMqnsw',
    projectSlug: 'raaz-wali-raat',
    source: RAAZ,
    advisory: '18+',
  },
  {
    id: 'panga-toonz-zoo-safari',
    status: 'approved',
    title: 'Zoo Safari Ki Masti Aur Hungama',
    category: '3d-animation',
    description: 'A zoo safari adventure episode of Panga Toonz.',
    youtubeId: 'sQmVGY3WeKM',
    projectSlug: 'panga-toonz',
    source: PANGA,
  },
  {
    id: 'raaz-karnrakshasi-1',
    status: 'approved',
    title: 'Karnrakshasi: Part 1',
    category: '2d-animation',
    description: 'Part one of the two-part Karnrakshasi horror story from Raaz Wali Raat.',
    youtubeId: 'eQZMCXSngnc',
    projectSlug: 'raaz-wali-raat',
    source: RAAZ,
    advisory: '18+',
  },
  {
    id: 'panga-toonz-car-race',
    status: 'approved',
    title: 'Kiske Hath Aayegi Jeet? 3 Car Race Dhamaka',
    category: '3d-animation',
    description: 'A three-car race episode of Panga Toonz in 3D animation.',
    youtubeId: 'AcIlBkDe4Q8',
    projectSlug: 'panga-toonz',
    source: PANGA,
  },
  {
    id: 'raaz-haunted-highway-trailer',
    status: 'approved',
    title: 'Haunted Highway: Official Trailer',
    category: 'promotional',
    description: 'The official trailer for Haunted Highway, a Raaz Wali Raat horror story.',
    youtubeId: '1O9qBccQQkQ',
    projectSlug: 'raaz-wali-raat',
    source: RAAZ,
    advisory: '18+',
  },
  {
    id: 'raaz-bhram',
    status: 'approved',
    title: 'Bhram Ek Chalawa',
    category: '2d-animation',
    description: 'A Hindi horror story animated in 2D for Raaz Wali Raat.',
    youtubeId: 'WucbntAipEA',
    projectSlug: 'raaz-wali-raat',
    source: RAAZ,
    advisory: '18+',
  },
  {
    id: 'panga-toonz-janmashtami',
    status: 'approved',
    title: 'Janmashtami Special Masti',
    category: '3d-animation',
    description: 'A Janmashtami festival special episode of Panga Toonz.',
    youtubeId: 'ldmmcyRpMCg',
    projectSlug: 'panga-toonz',
    source: PANGA,
  },
  {
    id: 'raaz-adhuri-chai',
    status: 'approved',
    title: 'Adhuri Chai',
    category: '2d-animation',
    description: 'A ghost story animated in 2D for Raaz Wali Raat.',
    youtubeId: 'LaaUW5-bi5Q',
    projectSlug: 'raaz-wali-raat',
    source: RAAZ,
    advisory: '18+',
  },
]

export const originalProjects: OriginalProject[] = [
  {
    slug: 'raaz-wali-raat',
    status: 'approved',
    title: 'Raaz Wali Raat',
    tagline: 'Hindi horror stories, animated in 2D.',
    format: '2D animated horror anthology',
    overview: [
      'Raaz Wali Raat is a Hindi 2D animated channel of long-form horror and ghost stories, made for viewers aged 18 and over.',
      'Each story stands on its own, from cursed pishachinis to haunted highways, and several are released with their own official trailers.',
    ],
    posterVideoId: 'VFi3RRMqnsw',
    trailer: { youtubeId: 'kc4FHnDFg6s', title: 'Kaalchakra: Official Trailer' },
    channelUrl: 'https://www.youtube.com/@Raazwaliraat',
    facts: [
      { label: 'Format', value: '2D animation' },
      { label: 'Genre', value: 'Horror & ghost stories' },
      { label: 'Language', value: 'Hindi' },
      { label: 'Audience', value: '18+' },
      { label: 'Platform', value: 'YouTube' },
    ],
    characters: [],
    episodes: [
      { youtubeId: 'i1eYKDln1u8', title: 'Kaalnetri: Ek Shrapit Pishachini' },
      { youtubeId: 'Obajy4nJpaU', title: 'Kapaal Kriya' },
      { youtubeId: 'EpkBGucmx8o', title: 'Vikraal' },
      { youtubeId: 'VFi3RRMqnsw', title: 'Kaalchakra' },
      { youtubeId: 'WucbntAipEA', title: 'Bhram Ek Chalawa' },
      { youtubeId: 'eQZMCXSngnc', title: 'Karnrakshasi: Part 1' },
      { youtubeId: 'WaQc7Kek10o', title: 'Karnrakshasi: Part 2' },
      { youtubeId: '6hGbu1mKA74', title: 'Kankaal Ki Dulhan' },
      { youtubeId: 'LaaUW5-bi5Q', title: 'Adhuri Chai' },
      { youtubeId: 'r1n6fancKJ8', title: 'The Last Letter' },
    ],
    gallery: [],
    advisory: '18+',
  },
  {
    slug: 'panga-toonz',
    status: 'approved',
    title: 'Panga Toonz',
    tagline: 'Desi comedy in full 3D.',
    format: '3D animated comedy series',
    overview: [
      'Panga Toonz is a desi comedy series in 3D animation: school stories, family comedy, funny situations, crazy adventures and pranks.',
      'Episodes follow Kaddu, Paddu, Pinki and their friends, from festival specials to multi-part adventures.',
    ],
    posterVideoId: 'YtG7_G9lzOU',
    featuredVideo: { youtubeId: 'BZZ_sTI_ooM', title: 'Pinky Chirkut aur Hero Makdaman Ki Entry' },
    channelUrl: 'https://www.youtube.com/@Pangatoonz',
    facts: [
      { label: 'Format', value: '3D animation' },
      { label: 'Genre', value: 'Family comedy' },
      { label: 'Language', value: 'Hindi' },
      { label: 'Platform', value: 'YouTube' },
    ],
    // Names from the channel description. Add descriptions/images once approved.
    characters: [{ name: 'Kaddu' }, { name: 'Paddu' }, { name: 'Pinki' }],
    episodes: [
      { youtubeId: 'ppOco6q4KFM', title: 'Pinky Ne Tod Di Remote' },
      { youtubeId: '6REn-I_gkRY', title: 'Navratri Special: Rinku Tony Ki Dandia' },
      { youtubeId: 'sQmVGY3WeKM', title: 'Zoo Safari Ki Masti Aur Hungama' },
      { youtubeId: 'YtG7_G9lzOU', title: 'Ganpati Visarjan Ki Dhamakedar Episode' },
      { youtubeId: 'ldmmcyRpMCg', title: 'Janmashtami Special Masti' },
      { youtubeId: 'AcIlBkDe4Q8', title: 'Kiske Hath Aayegi Jeet? 3 Car Race Dhamaka' },
      { youtubeId: 'BZZ_sTI_ooM', title: 'Pinky Chirkut aur Hero Makdaman Ki Entry' },
      { youtubeId: 'a5wfeoWVRMM', title: '15 August Ki Tayyari' },
    ],
    gallery: [],
  },
  {
    // DRAFT: the client asked for Dhamal Nagar to be supported, but no approved
    // synopsis, poster, characters or episodes have been supplied yet.
    slug: 'dhamal-nagar',
    status: 'draft',
    title: 'Dhamal Nagar',
    tagline: 'Awaiting approved project details.',
    format: 'Original animated project',
    overview: [
      'Project synopsis pending from ANICX MEDIA. Add the approved description, poster, trailer, characters and episode links in src/data/projects.ts, then set status to "approved".',
    ],
    facts: [],
    characters: [],
    episodes: [],
    gallery: [],
  },
]
