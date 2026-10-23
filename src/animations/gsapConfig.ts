import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Single place where GSAP plugins are registered and motion tokens live.
 * Import gsap / ScrollTrigger / useGSAP from here, never directly, so the
 * plugins are always registered exactly once.
 */
gsap.registerPlugin(ScrollTrigger, useGSAP)

export const EASE = {
  out: 'power2.out',
  strong: 'power3.out',
  /** Reserved for a few dramatic reveals (hero, headline masks). */
  expo: 'expo.out',
} as const

export const DURATION = {
  hover: 0.3,
  card: 0.7,
  section: 0.8,
  text: 0.9,
  image: 1.1,
} as const

export const STAGGER = {
  tight: 0.08,
  base: 0.12,
} as const

/** Media queries for gsap.matchMedia(). Motion only runs when allowed. */
export const MEDIA = {
  motionOk: '(prefers-reduced-motion: no-preference)',
  desktopMotion: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
  finePointer: '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
} as const

/**
 * Reveal start position. Content already in view on load starts above this
 * line, so it reveals immediately. Every page ends with the footer (taller
 * than the remaining 12%), so the last revealed block can always reach it.
 * (Avoid clamp() here: it pins in-view triggers to exactly 0 and they would
 * wait for the first scroll.)
 */
export const REVEAL_START = 'top 88%'

export { gsap, ScrollTrigger, useGSAP }
