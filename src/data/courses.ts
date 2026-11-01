import type { Course, FaqItem, ReferenceVideo } from '../types/content'

/**
 * ANICX Academy courses.
 *
 * Grounded in Developer Brief:
 * - Each course shows: syllabus, level, duration, total live teaching hours, mode,
 *   schedule, fees, required device/software, assignments, feedback process,
 *   final portfolio outcome and cancellation/refund terms.
 * - Unfinalized programmes use "Register Interest" instead of taking payments for undefined courses.
 * - Distinguish training, internship and employment.
 */

export const EMPLOYMENT_DISCLAIMER =
  'Training does not guarantee employment. Candidates may be considered for available internships or jobs after skill assessment.'

export const courses: Course[] = [
  {
    slug: '3d-character-animation-blender',
    status: 'approved',
    title: '3D Character Animation in Blender',
    category: '3D Animation',
    summary: 'Practical 3D character animation workflow in Blender, from character preparation to animated scenes.',
    overview:
      'Learn the practical 3D character workflow used in story-led comedy and cartoon videos: preparing a character, rigging, blocking key poses, timing comedy, and optimizing scenes for smooth rendering.',
    skills: ['Blender', 'Rigging & Weights', 'Keyframe Animation', 'Scene Optimization', 'Lighting & Rendering'],
    objectives: [
      'Navigate Blender and import ready 3D characters in .fbx and .blend formats',
      'Rig characters using auto-rigging and bone weighting techniques',
      'Animate walk cycles, comedy gestures and facial expressions at 30 fps',
      'Optimize 3D scenes for efficient rendering without hardware lockup',
      'Complete a polished character scene for your portfolio',
    ],
    syllabus: [
      {
        title: 'Module 1: Character Setup & Pipeline',
        topics: ['Ready-made vs custom characters', 'Importing FBX/blend files', 'Scale, transforms and topology check'],
      },
      {
        title: 'Module 2: Rigging & Skinning',
        topics: ['Auto-rigging pipelines', 'Bone structure basics', 'Weight painting and deformation cleanup'],
      },
      {
        title: 'Module 3: Animation Fundamentals & Timing',
        topics: ['Blocking key poses', 'In-betweens and breakdowns', 'Pacing and comedic timing for shorts & episodes'],
      },
      {
        title: 'Module 4: Scene Assembly, Lighting & Render',
        topics: ['Camera positioning and framing', 'Light setups for cartoons', 'Render engine settings & export at 1080p/4K'],
      },
    ],
    format: {
      level: 'Beginner to Intermediate',
      duration: '8 Weeks',
      teachingHours: '32 Live Teaching Hours + Guided Lab Sessions',
      mode: 'Online (Interactive live video sessions & screen shares)',
      schedule: 'Weekend batches & weekday evening batches',
      language: 'Hindi & English',
      fee: 'Fee announced per upcoming batch (Register interest for batch dates)',
      requiredDevice: 'Laptop or PC with minimum 8GB RAM (16GB recommended) and dedicated GPU',
      assignments: 'Weekly hands-on scene submissions with instructor review',
      feedback: 'Personalized 1-on-1 video feedback on scene files and motion timing',
      portfolioOutcome: 'Completed 3D character animation showcase reel ready for clients or YouTube',
      cancellationRefund: 'Full refund available up to 48 hours prior to the first live batch session',
    },
    isFinalized: false,
    sampleLessons: [],
    faq: [
      {
        status: 'approved',
        question: 'Do I need prior 3D experience?',
        answer: 'No prior 3D experience is necessary. Basic computer comfort and enthusiasm for animation are all you need to begin.',
      },
      {
        status: 'approved',
        question: 'Will I need expensive software?',
        answer: 'No. Blender is completely free and open-source software used by studios worldwide.',
      },
    ],
  },
  {
    slug: '2d-animation-foundations',
    status: 'approved',
    title: '2D Animation & Storytelling',
    category: '2D Animation',
    summary: 'Master story-driven 2D animation, expressive character acting, timing and storyboards.',
    overview:
      'A practical foundation in 2D animation for online storytelling, from horror folktales to humorous cartoon shorts. Learn character posing, storyboarding, atmospheric backgrounds, and final scene compositing.',
    skills: ['2D Animation Principles', 'Storyboarding', 'Character Posing', 'Background Design', 'Audio Sync'],
    objectives: [
      'Apply core animation principles (squash, stretch, anticipation, timing)',
      'Create readable storyboards and animatics from a written script',
      'Design expressive 2D characters and cohesive atmospheric backgrounds',
      'Sync dialogue, sound effects and background suspense tracks',
    ],
    syllabus: [
      {
        title: 'Module 1: Principles of Motion & Timing',
        topics: ['Timing, spacing and arcs', 'Squash & stretch in digital 2D', 'Anticipation and follow-through'],
      },
      {
        title: 'Module 2: Storyboards & Visual Language',
        topics: ['Translating a story into shots', 'Camera angles and visual tension', 'Creating animatics with timing'],
      },
      {
        title: 'Module 3: Character Posing & Expression',
        topics: ['Silhouette value and readability', 'Facial expressions and emotion', 'Lip-sync and dialogue basics'],
      },
      {
        title: 'Module 4: Backgrounds, Sound & Final Render',
        topics: ['Layered backgrounds for parallax depth', 'Soundtrack integration', 'Master export for YouTube & reels'],
      },
    ],
    format: {
      level: 'Beginner',
      duration: '6 Weeks',
      teachingHours: '24 Live Teaching Hours',
      mode: 'Online Live Classes',
      schedule: 'Evening batches (flexible timing options)',
      language: 'Hindi & English',
      fee: 'Register interest for the upcoming batch details & fee schedule',
      requiredDevice: 'Any laptop or PC capable of running digital drawing/animation tools (drawing tablet recommended)',
      assignments: 'Weekly storyboard and animated scene milestones',
      feedback: 'Direct weekly feedback and live critique sessions',
      portfolioOutcome: 'Original 2D short animated scene for your portfolio',
      cancellationRefund: 'Full refund available up to 48 hours prior to batch commencement',
    },
    isFinalized: false,
    sampleLessons: [],
    faq: [
      {
        status: 'approved',
        question: 'Do I need a drawing tablet?',
        answer: 'While a graphic tablet is helpful for digital sketching, mouse-based vector animation workflows are also supported.',
      },
    ],
  },
  {
    slug: 'video-editing-for-creators',
    status: 'approved',
    title: 'Video Editing for YouTube & Reels',
    category: 'Video Editing',
    summary: 'Fast-paced, engaging video editing techniques for YouTube, Instagram Reels and Shorts.',
    overview:
      'Learn the practical editing methods used by high-engagement creators and commercial brands: jump cuts, narrative flow, sound design, viral caption styling, and color grading.',
    skills: ['Video Editing', 'Pacing & Hooks', 'Sound Design & Foley', 'Animated Subtitles', 'Color Grading'],
    objectives: [
      'Organize raw multi-camera and voice footage systematically',
      'Cut tight hooks that retain viewer attention in the first 3 seconds',
      'Add dynamic captions, zooms, and sound effects',
      'Export crisp, high-bitrate video tailored for YouTube and 9:16 mobile feeds',
    ],
    syllabus: [
      {
        title: 'Module 1: Timeline & Narrative Pacing',
        topics: ['Project organization', 'Rough cut assembly', 'Trimming dead air and building rhythm'],
      },
      {
        title: 'Module 2: Short-Form Dynamics (Reels & Shorts)',
        topics: ['9:16 vertical safe zones', 'Visual hooks in seconds 0–3', 'Fast text callouts & captions'],
      },
      {
        title: 'Module 3: Audio Design & Impact',
        topics: ['Layering sound effects and risers', 'Audio ducking under dialogue', 'Clean voice equalization'],
      },
      {
        title: 'Module 4: Color, Export & Publishing',
        topics: ['LUTs and color correction', 'Export bitrate settings', 'Thumbnail capture and packaging'],
      },
    ],
    format: {
      level: 'All Levels',
      duration: '4 Weeks',
      teachingHours: '16 Live Teaching Hours',
      mode: 'Online Live Sessions',
      schedule: 'Weekend intensive batches',
      language: 'Hindi & English',
      fee: 'Register interest for upcoming batch schedule',
      requiredDevice: 'Laptop or PC capable of running Premiere Pro, DaVinci Resolve or CapCut Desktop',
      assignments: 'Cut 1 full YouTube video and 2 vertical Instagram reels',
      feedback: 'Timeline review and pacing corrections from industry editors',
      portfolioOutcome: '2 published reels and 1 YouTube portfolio sample',
      cancellationRefund: 'Refund eligible prior to batch launch date',
    },
    isFinalized: false,
    sampleLessons: [],
    faq: [],
  },
]

export const academyFaq: FaqItem[] = [
  {
    status: 'approved',
    question: 'Is the training online or offline?',
    answer:
      'Live training is primarily conducted online so students across India can participate. Offline workshops and studio sessions are held periodically in Seoni, Madhya Pradesh.',
  },
  {
    status: 'approved',
    question: 'How do I register for an upcoming batch?',
    answer:
      'Use the Register Interest form on this page or WhatsApp us directly. Our academy coordinator will share upcoming batch dates, timings, and registration details.',
  },
  {
    status: 'approved',
    question: 'Does completion of the course guarantee employment?',
    answer:
      'Training does not guarantee employment. Candidates may be considered for available internships or jobs after skill assessment.',
  },
  {
    status: 'approved',
    question: 'What hardware/computer is required?',
    answer:
      'A modern laptop or PC with Windows, macOS or Linux with at least 8GB RAM (16GB recommended) and a stable internet connection for live video classes.',
  },
]

export const referenceVideos: ReferenceVideo[] = [
  {
    status: 'draft',
    youtubeId: '',
    title: 'Style reference #1',
    creator: 'Zack D. Films',
    creatorUrl: 'https://www.youtube.com/@zackdfilms',
    note: '3D storytelling style reference.',
  },
]
