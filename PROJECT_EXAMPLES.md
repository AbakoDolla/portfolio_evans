/**
 * Exemples d'utilisation des nouvelles fonctionnalités du composant Projects
 */

// ============================================================
// EXEMPLE 1: Configuration d'URL pour un projet en ligne
// ============================================================

// AVANT (sans site web):
export const projectExample1Before = {
  title: "Ember Grill",
  type: "restaurant",
  links: {
    github: "https://github.com/AbakoDolla/ember-grill",
    // Pas de site web
  }
};

// APRÈS (avec site web):
export const projectExample1After = {
  title: "Ember Grill",
  type: "restaurant",
  links: {
    github: "https://github.com/AbakoDolla/ember-grill",
    website: "https://ember-grill.netlify.app", // 👈 NOUVEAU
    demo: "https://ember-grill.netlify.app"
  }
};

// ============================================================
// EXEMPLE 2: Types de projets disponibles
// ============================================================

export const projectTypesExample = {
  restaurant: {
    icon: "Utensils",
    badge: "🍽️ Restaurant",
    color: "accent",
    examples: ["Ember Grill"]
  },
  delivery: {
    icon: "Truck",
    badge: "📦 Livraison",
    color: "secondary",
    examples: ["ColisGo Express"]
  },
  voting: {
    icon: "Vote",
    badge: "🗳️ Vote",
    color: "primary",
    examples: ["VoteFlow ICT"]
  },
  portfolio: {
    icon: "User",
    badge: "👤 Portfolio",
    color: "primary",
    examples: ["Portfolio Evans"]
  },
  streaming: {
    icon: "RadioTower",
    badge: "🎬 Streaming",
    color: "accent",
    examples: ["Star Live Studio"]
  },
  security: {
    icon: "Lock",
    badge: "🔒 Sécurité",
    color: "secondary",
    examples: ["Pentest Metasploitable2"]
  },
  tool: {
    icon: "Zap",
    badge: "🛠️ Outil",
    color: "primary",
    examples: ["VPN WireGuard", "Outils OSINT"]
  }
};

// ============================================================
// EXEMPLE 3: Affichage des projets avec statut
// ============================================================

export const projectsStatusExample = [
  {
    title: "Ember Grill",
    type: "restaurant",
    status: "completed",
    badge: "✅ Terminé",
    display: "🍽️ Ember Grill [✅ Terminé] [🍽️ Restaurant]"
  },
  {
    title: "ColisGo Express",
    type: "delivery",
    status: "in-progress",
    badge: "⏳ En cours",
    display: "📦 ColisGo Express [⏳ En cours] [📦 Livraison]"
  },
  {
    title: "LYNX - Assistant IA",
    type: "tool",
    status: "concept",
    badge: "💡 Concept",
    display: "🛠️ LYNX [💡 Concept] [🛠️ Outil]"
  }
];

// ============================================================
// EXEMPLE 4: Boutons d'accès aux projets
// ============================================================

export const projectLinksExample = {
  "Ember Grill": {
    buttons: [
      {
        type: "github",
        label: "Code",
        icon: "Github",
        url: "https://github.com/AbakoDolla/ember-grill",
        color: "primary"
      },
      {
        type: "demo",
        label: "Demo",
        icon: "ExternalLink",
        url: "https://ember-grill.netlify.app",
        color: "secondary"
      },
      {
        type: "website",
        label: "Site",
        icon: "Globe",
        url: "https://ember-grill.netlify.app",
        color: "accent"
      }
    ]
  }
};

// ============================================================
// EXEMPLE 5: Configuration complète dans projectsUrls.ts
// ============================================================

export const fullProjectConfigExample = `
// src/config/projectsUrls.ts

export const projectUrls = {
  'ember-grill': {
    name: 'Ember Grill',
    description: 'Application de gestion restaurant moderne',
    website: 'https://ember-grill.netlify.app',  // 👈 Votre domaine en ligne
    github: 'https://github.com/AbakoDolla/ember-grill',
    demo: 'https://ember-grill.netlify.app',     // Généralement identique à website
    status: 'live',  // 'live' ou 'development'
  },
  'portfolio_evans': {
    name: 'Portfolio Evans',
    description: 'Portfolio professionnel Full-Stack & Cybersécurité',
    website: 'https://evan-portfolio.vercel.app',
    github: 'https://github.com/AbakoDolla/portfolio_evans',
    demo: 'https://evan-portfolio.vercel.app',
    status: 'live',
  },
  'colisgo-express': {
    name: 'ColisGo Express',
    description: 'Plateforme collaborative de livraison urbaine',
    website: '', // À remplir quand déployé
    github: 'https://github.com/AbakoDolla/colisgo-express',
    demo: '',
    status: 'development',
  },
  // ... autres projets
};
`;

// ============================================================
// EXEMPLE 6: Comment utiliser la configuration
// ============================================================

export const usageExample = `
// Dans vos composants:
import { projectUrls } from '@/config/projectsUrls';

function MyComponent() {
  // Récupérer les URLs d'un projet
  const emberGrillUrls = projectUrls['ember-grill'];
  
  // Afficher le site web
  <a href={emberGrillUrls.website}>
    Visiter Ember Grill
  </a>

  // Vérifier si le site est en ligne
  if (emberGrillUrls.status === 'live') {
    return <ProjectLiveStatus />;
  }
}
`;

// ============================================================
// EXEMPLE 7: Personnalisation des couleurs
// ============================================================

export const colorCustomizationExample = `
// Dans Projects.tsx

const getColor = (repositoryType: Project["type"]): "primary" | "secondary" | "accent" => {
  switch (repositoryType) {
    case 'restaurant':
      return 'accent';      // 🔥 Orange/Fire
    case 'delivery':
      return 'secondary';   // 💙 Bleu
    case 'voting':
      return 'primary';     // 💎 Cyan
    case 'portfolio':
      return 'primary';     // 💎 Cyan
    case 'streaming':
      return 'accent';      // 🔥 Orange/Fire
    case 'security':
      return 'secondary';   // 💙 Bleu
    default:
      return 'primary';
  }
};
`;

// ============================================================
// EXEMPLE 8: Affichage responsive des boutons
// ============================================================

export const responsiveButtonsExample = `
// Mobile (< 640px)
// Affiche uniquement les icônes:
// [ 🐙 ] [ 📤 ] [ 🌐 ]

// Tablette (640px - 1024px)
// Affiche icônes + labels:
// [ 🐙 Code ] [ 📤 Demo ] [ 🌐 Site ]

// Desktop (> 1024px)
// Affiche tous les éléments:
// [ 🐙 Code ] [ 📤 Demo ] [ 🌐 Site ]
`;

export const responsiveCSSExample = `
// Dans les classes du composant:

<Button 
  size="sm" 
  className="w-full text-xs gap-1 hover:bg-primary/10"
>
  <Github className="w-3.5 h-3.5" />
  <span className="hidden sm:inline">Code</span>  {/* ← Caché sur mobile */}
</Button>
`;

// ============================================================
// EXEMPLE 9: Ajouter un nouveau type de projet
// ============================================================

export const addNewTypeExample = `
// Étape 1: Importer l'icône dans Projects.tsx
import { MyNewIcon } from 'lucide-react';

// Étape 2: Ajouter le type dans l'interface Project
interface Project {
  // ... autres champs
  type?: "restaurant" | "delivery" | "voting" | "portfolio" | "streaming" | "mytype"; // ← NEW
}

// Étape 3: Mettre à jour getIcon()
const getIcon = (repositoryType: Project["type"]): React.ElementType => {
  switch (repositoryType) {
    // ... autres cas
    case 'mytype':
      return MyNewIcon;
    default:
      return SiReact;
  }
};

// Étape 4: Mettre à jour getColor()
const getColor = (repositoryType: Project["type"]): "primary" | "secondary" | "accent" => {
  switch (repositoryType) {
    // ... autres cas
    case 'mytype':
      return 'primary'; // ou 'secondary' ou 'accent'
    default:
      return 'primary';
  }
};

// Étape 5: Ajouter le badge dans le rendu
<span className="text-xs px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground font-mono">
  {project.type === 'mytype' && '🆕 Mon Type'}
</span>
`;

// ============================================================
// EXPORTS
// ============================================================

export default {
  before: projectExample1Before,
  after: projectExample1After,
  types: projectTypesExample,
  status: projectsStatusExample,
  links: projectLinksExample,
  config: fullProjectConfigExample,
  usage: usageExample,
  colors: colorCustomizationExample,
  responsive: responsiveButtonsExample,
  newType: addNewTypeExample,
};
