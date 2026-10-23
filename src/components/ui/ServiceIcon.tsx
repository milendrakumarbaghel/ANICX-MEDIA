import { Box, Brush, Clapperboard, Megaphone, MonitorPlay, Package, PenTool, Users, type LucideIcon } from 'lucide-react'
import type { ServiceIcon as ServiceIconName } from '../../types/content'

const icons: Record<ServiceIconName, LucideIcon> = {
  brush: Brush,
  box: Box,
  package: Package,
  clapperboard: Clapperboard,
  megaphone: Megaphone,
  users: Users,
  'pen-tool': PenTool,
  'monitor-play': MonitorPlay,
}

export function ServiceIcon({ name, size = 22, className }: { name: ServiceIconName; size?: number; className?: string }) {
  const Icon = icons[name]
  return <Icon size={size} strokeWidth={1.6} className={className} aria-hidden="true" />
}
