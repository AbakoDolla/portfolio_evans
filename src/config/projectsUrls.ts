/**
 * Configuration des URLs des projets en ligne
 * Mettez à jour ces URLs avec les adresses réelles de vos sites déployés
 */

export const projectUrls = {
  'ember-grill': {
    name: 'Ember Grill',
    description: 'Application de gestion restaurant moderne',
    website: 'https://brazafish.netlify.app/', // À adapter
    github: 'https://github.com/AbakoDolla/ember-grill',
    demo: '', // Peut être identique à website
    status: 'development',
  },
  'portfolio_evans': {
    name: 'Portfolio Evans',
    description: 'Portfolio professionnel Full-Stack & Cybersécurité',
    website: 'https://Portfolio-evans-abah.vercel.app', // À adapter
    github: 'https://github.com/AbakoDolla/portfolio_evans',
    demo: 'https://Portfolio-evans-abah.vercel.app', // Peut être identique à website
    status: 'live',
  },
  'colisgo-express': {
    name: 'ColisGo Express',
    description: 'Plateforme collaborative de livraison urbaine',
    website: '', // À mettre à jour quand déployé
    github: 'https://github.com/AbakoDolla/colisgo-express',
    demo: '',
    status: 'development',
  },
  'voteflow-ict': {
    name: 'VoteFlow ICT',
    description: 'Plateforme de vote électronique sécurisée',
    website: '', // À mettre à jour quand déployé
    github: 'https://github.com/AbakoDolla/voteflow-ict',
    demo: '',
    status: 'development',
  },
  'star-live-studio': {
    name: 'Star Live Studio',
    description: 'Site web professionnel d\'entreprise multi-services',
    website: 'https://star-live-co.vercel.app', // À adapter
    github: 'https://github.com/AbakoDolla/star-live-studio',
    demo: '',
    status: 'live',
  },
};

export type ProjectKey = keyof typeof projectUrls;

/**
 * Récupère les URLs d'un projet
 * @param projectKey - Clé du projet
 * @returns Objet contenant les URLs du projet
 */
export const getProjectUrls = (projectKey: ProjectKey) => {
  return projectUrls[projectKey];
};

/**
 * Récupère tous les projets avec statut "live"
 */
export const getLiveProjects = () => {
  return Object.entries(projectUrls)
    .filter(([_, data]) => data.status === 'live' && data.website)
    .map(([key, data]) => ({ key, ...data }));
};

/**
 * Récupère tous les projets en développement
 */
export const getDevelopmentProjects = () => {
  return Object.entries(projectUrls)
    .filter(([_, data]) => data.status === 'development')
    .map(([key, data]) => ({ key, ...data }));
};
