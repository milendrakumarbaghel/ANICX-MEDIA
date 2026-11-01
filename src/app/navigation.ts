export interface NavItem {
  label: string
  to: string
}

export const mainNav: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Our Work', to: '/portfolio' },
  { label: 'Academy', to: '/academy' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export const primaryHeaderAction = {
  label: 'Start a Project',
  to: '/contact?enquiry=project#enquiry',
}
