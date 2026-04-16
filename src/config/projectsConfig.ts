/**
 * Guide d'utilisation du composant Projects amélioré
 * 
 * Features:
 * 1. Icônes adaptées pour chaque type de projet (Restaurant, Livraison, Vote, Portfolio, Streaming)
 * 2. Badges de type de projet avec emojis
 * 3. Support pour les URLs de sites web en ligne
 * 4. Meilleure mise en forme avec grille de boutons
 * 5. Integration avec GitHub API pour fetch automatique
 */

// Configuration des URLs des projets
// => Voir src/config/projectsUrls.ts

// Comment ajouter une URL à un projet:
// 1. Ouvrez src/config/projectsUrls.ts
// 2. Remplissez le champ "website" avec l'URL de votre site
// 3. Changez "status" à "live" pour afficher le badge
// 4. Exemple:
//    'ember-grill': {
//      website: 'https://ember-grill.netlify.app',
//      status: 'live',
//    }

// Icônes disponibles par type de projet:


// Boutons disponibles pour chaque lien:
const LINK_BUTTONS = {
  github: {
    label: 'Code',
    icon: 'Github',
    color: 'primary',
  },
  demo: {
    label: 'Demo',
    icon: 'ExternalLink',
    color: 'secondary',
  },
  website: {
    label: 'Site',
    icon: 'Globe',
    color: 'accent',
  },
};

// Couleurs par type de projet:
const PROJECT_COLORS = {
  restaurant: 'accent',    // Orange/Fire
  delivery: 'secondary',   // Blue
  voting: 'primary',       // Cyan
  portfolio: 'primary',    // Cyan
  streaming: 'accent',     // Fire
  security: 'secondary',   // Green
};

// Statuts possibles:
const PROJECT_STATUS = {
  completed: 'Terminé',
  'in-progress': 'En cours',
  concept: 'Concept',
};

export {
  
  LINK_BUTTONS,
  PROJECT_COLORS,
  PROJECT_STATUS,
};
