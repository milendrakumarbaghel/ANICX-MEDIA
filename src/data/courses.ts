import type { Course, FaqItem, ReferenceVideo } from '../types/content'

/**
 * Animation Academy content.
 *
 * Confirmed so far: ANICX MEDIA offers online animation training.
 *
 * Every course below is a DRAFT outline for layout and review only. It is shown
 * in development and on deploy previews with a "Draft" badge, and hidden in
 * production. To publish a course:
 *   1. Replace the text with the client-approved course content.
 *   2. Fill `format` only with confirmed facts (leave unknown fields out).
 *   3. Set status: 'approved'.
 * Never add fees, durations, schedules or outcomes that the client has not confirmed.
 */
export const courses: Course[] = [
  {
    slug: '3d-character-animation-blender',
    status: 'draft',
    title: '3D Character Animation in Blender',
    category: '3D Animation',
    summary: 'Bring 3D characters to life in Blender, from a ready character to an animated scene.',
    overview:
      'DRAFT OUTLINE: replace with the approved course overview. A practical path through the character workflow used in story-led 3D videos: preparing a character, rigging it, animating it and keeping scenes light enough to render smoothly.',
    skills: ['Blender', 'Rigging', 'Character animation', 'Scene optimisation'],
    objectives: [
      'DRAFT: confirm learning objectives with ANICX MEDIA.',
      'Import and prepare characters in .fbx and .blend formats',
      'Rig characters with Mixamo and Rigify',
      'Apply and export animation at 30 fps, in place',
    ],
    syllabus: [
      { title: 'Choosing and preparing a character', topics: ['Ready-made vs. custom characters', 'Working with .fbx and .blend files', 'Importing into Blender'] },
      { title: 'Rigging', topics: ['Auto-rigging with Mixamo', 'Rigify add-on basics', 'Checking bones and weights'] },
      { title: 'Animating the character', topics: ['Applying animations', 'Export settings (30 fps, in place)', 'Blocking a simple scene'] },
      { title: 'Scene optimisation', topics: ['Keeping scenes light', 'Faster playback and rendering'] },
    ],
    format: {},
    sampleLessons: [],
    faq: [],
  },
  {
    slug: '2d-animation-foundations',
    status: 'draft',
    title: '2D Animation Foundations',
    category: '2D Animation',
    summary: 'Learn the core principles behind story-driven 2D animation.',
    overview:
      'DRAFT OUTLINE: replace with the approved course overview. An introduction to 2D animation for storytelling, from character poses and timing to a finished short scene.',
    skills: ['Animation principles', 'Character posing', 'Timing', 'Storyboarding'],
    objectives: ['DRAFT: confirm learning objectives with ANICX MEDIA.'],
    syllabus: [
      { title: 'Principles of animation', topics: ['Timing and spacing', 'Squash and stretch', 'Anticipation and follow-through'] },
      { title: 'Characters and scenes', topics: ['Posing for emotion', 'Backgrounds and layout'] },
      { title: 'Storyboard to short scene', topics: ['Storyboarding', 'Animatics', 'Final render'] },
    ],
    format: {},
    sampleLessons: [],
    faq: [],
  },
  {
    slug: 'video-editing-for-creators',
    status: 'draft',
    title: 'Video Editing for Reels & YouTube',
    category: 'Video Editing',
    summary: 'Edit engaging videos and reels for YouTube and Instagram.',
    overview:
      'DRAFT OUTLINE: replace with the approved course overview. Editing fundamentals for creators and businesses: structure, pacing, captions, sound and exporting for each platform.',
    skills: ['Editing workflow', 'Pacing', 'Captions', 'Sound design'],
    objectives: ['DRAFT: confirm learning objectives with ANICX MEDIA.'],
    syllabus: [
      { title: 'Editing workflow', topics: ['Organising footage', 'Cutting for story'] },
      { title: 'Short-form content', topics: ['Hooks and pacing', 'Captions and text animation'] },
      { title: 'Finishing', topics: ['Sound and music', 'Colour basics', 'Export settings per platform'] },
    ],
    format: {},
    sampleLessons: [],
    faq: [],
  },
]

/**
 * Style references supplied by the client (third-party channels).
 * These are NOT ANICX MEDIA work and are always shown with a credit.
 * Add the one or two approved videos by setting `youtubeId`, `title`
 * and status: 'approved'.
 */
export const referenceVideos: ReferenceVideo[] = [
  {
    status: 'draft',
    youtubeId: '',
    title: 'Approved reference video #1 (awaiting selection)',
    creator: 'Professor of How',
    creatorUrl: 'https://www.youtube.com/@professorofhow',
    note: 'Character-led explainer style reference.',
  },
  {
    status: 'draft',
    youtubeId: '',
    title: 'Approved reference video #2 (awaiting selection)',
    creator: 'Zack D. Films',
    creatorUrl: 'https://www.youtube.com/@zackdfilms',
    note: '3D storytelling style reference.',
  },
]

/** Academy-wide FAQ. Only approved answers appear in production. */
export const academyFaq: FaqItem[] = [
  {
    status: 'approved',
    question: 'Is the training online?',
    answer: 'Yes. ANICX MEDIA offers online animation training, so you can learn from wherever you are.',
  },
  {
    status: 'approved',
    question: 'How do I find out fees, duration and batch dates?',
    answer:
      'Send a course enquiry using the form on this page. The team will reply with the current details for the course you are interested in.',
  },
  {
    status: 'draft',
    question: 'Do I need prior experience?',
    answer: 'DRAFT: answer to be confirmed by ANICX MEDIA for each course.',
  },
  {
    status: 'draft',
    question: 'What software or computer do I need?',
    answer: 'DRAFT: answer to be confirmed by ANICX MEDIA for each course.',
  },
]
