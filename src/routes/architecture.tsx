import { createFileRoute } from '@tanstack/react-router'
import { ArchitecturePage } from '../components/pages/ArchitecturePage'

export const Route = createFileRoute('/architecture')({
  component: ArchitecturePage,
})

export { ArchitecturePage } 