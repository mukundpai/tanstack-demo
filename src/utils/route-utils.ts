import { Route, RouteComponent } from '@tanstack/react-router'
import { z } from 'zod' // We'll use Zod for schema validation

export function createRouteWithSearch<T extends z.ZodType>(
  parentRoute: Route,
  path: string,
  searchSchema: T,
  component: RouteComponent
) {
  return new Route({
    getParentRoute: () => parentRoute,
    path,
    validateSearch: (search: Record<string, unknown>) => {
      return searchSchema.parse(search)
    },
    component,
  })
} 