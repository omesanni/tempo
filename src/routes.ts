import { lazy } from 'react';

export default [
  {
    path: '/teams',
    component: lazy(() => import('./views/teams/Teams')),
  },
  {
    path: '/teams/:id',
    component: lazy(() => import('./views/team/Team')),
  },
];
