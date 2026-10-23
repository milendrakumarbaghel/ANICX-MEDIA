export interface NavItem {
  label: string
  to: string
}

export const mainNav: NavItem[] = [
  { label: 'Work', to: '/portfolio' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Academy', to: '/academy' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]
