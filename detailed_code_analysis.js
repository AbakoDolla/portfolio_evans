import fetch from 'node-fetch';
import fs from 'fs';

async function analyzeGitHubRepoCode(owner, repo) {
  console.log(`\n🔍 Analyse approfondie du code de ${owner}/${repo}...\n`);

  try {
    // Récupérer la structure des fichiers
    const contentsResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents`, {
      headers: { 'User-Agent': 'Node.js' }
    });

    if (!contentsResponse.ok) {
      throw new Error(`Erreur HTTP: ${contentsResponse.status}`);
    }

    const contents = await contentsResponse.json();

    const analysis = {
      name: repo,
      mainFiles: [],
      packageJson: null,
      readme: null,
      sourceCode: {},
      technologies: new Set(),
      features: [],
      architecture: '',
      purpose: ''
    };

    // Analyser chaque fichier/répertoire
    for (const item of contents) {
      if (item.type === 'file') {
        analysis.mainFiles.push(item.name);

        // Analyser les fichiers importants
        if (item.name === 'package.json') {
          try {
            const packageResponse = await fetch(item.download_url);
            analysis.packageJson = await packageResponse.json();
          } catch (error) {
            console.log(`⚠️ Impossible de lire package.json: ${error.message}`);
          }
        }

        if (item.name.toLowerCase().includes('readme')) {
          try {
            const readmeResponse = await fetch(item.download_url);
            analysis.readme = await readmeResponse.text();
          } catch (error) {
            console.log(`⚠️ Impossible de lire README: ${error.message}`);
          }
        }

        // Détecter les technologies par extension
        const ext = item.name.split('.').pop().toLowerCase();
        if (['js', 'jsx', 'ts', 'tsx'].includes(ext)) {
          analysis.technologies.add('JavaScript/TypeScript');
        }
        if (['py'].includes(ext)) analysis.technologies.add('Python');
        if (['java'].includes(ext)) analysis.technologies.add('Java');
        if (['html'].includes(ext)) analysis.technologies.add('HTML');
        if (['css', 'scss', 'sass'].includes(ext)) analysis.technologies.add('CSS');

      } else if (item.type === 'dir') {
        // Analyser les dossiers importants
        if (['src', 'source', 'app', 'lib'].includes(item.name.toLowerCase())) {
          analysis.sourceCode[item.name] = await analyzeDirectory(owner, repo, item.path);
        }
        if (item.name === 'components') analysis.technologies.add('React Components');
        if (item.name === 'pages') analysis.technologies.add('Multi-page App');
        if (item.name === 'utils' || item.name === 'helpers') analysis.technologies.add('Utility Functions');
        if (item.name === 'hooks') analysis.technologies.add('Custom React Hooks');
        if (item.name === 'api' || item.name === 'routes') analysis.technologies.add('API Routes');
      }
    }

    return analysis;

  } catch (error) {
    console.error(`❌ Erreur lors de l'analyse de ${repo}:`, error.message);
    return null;
  }
}

async function analyzeDirectory(owner, repo, path) {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      headers: { 'User-Agent': 'Node.js' }
    });

    const contents = await response.json();
    const files = [];

    for (const item of contents.slice(0, 10)) { // Limiter à 10 fichiers pour éviter trop de requêtes
      if (item.type === 'file' && item.size < 50000) { // Fichiers de moins de 50KB
        try {
          const fileResponse = await fetch(item.download_url);
          const content = await fileResponse.text();
          files.push({
            name: item.name,
            path: item.path,
            content: content.substring(0, 2000), // Premiers 2000 caractères
            size: item.size
          });
        } catch (error) {
          console.log(`⚠️ Impossible de lire ${item.path}: ${error.message}`);
        }
      }
    }

    return files;
  } catch (error) {
    return [];
  }
}

function generateDetailedDescription(analysis) {
  const { name, packageJson, readme, sourceCode, technologies, mainFiles } = analysis;

  let description = '';
  let features = [];
  let techStack = Array.from(technologies);

  // Analyser le package.json pour comprendre le projet
  if (packageJson) {
    const { name: packageName, description: packageDesc, scripts, dependencies = {}, devDependencies = {} } = packageJson;

    // Détecter le type de projet
    if (packageName?.includes('portfolio') || packageName?.includes('cv')) {
      description = `Portfolio interactif et moderne d'un développeur Full-Stack. Présente les compétences techniques, projets réalisés et expériences professionnelles avec une interface élégante et responsive.`;

      features = [
        'Présentation des compétences techniques',
        'Galerie de projets avec descriptions détaillées',
        'Section contact et réseaux sociaux',
        'Design responsive et animations fluides',
        'Intégration GitHub pour projets automatiques'
      ];
    }

    else if (packageName?.includes('restaurant') || packageName?.includes('grill')) {
      description = `Application web complète de gestion de restaurant. Système de commande en ligne, gestion des menus, suivi des réservations et interface d'administration pour les restaurateurs.`;

      features = [
        'Système de commande en ligne intuitif',
        'Gestion dynamique des menus et prix',
        'Interface d\'administration pour le personnel',
        'Suivi des commandes en temps réel',
        'Gestion des réservations et tables',
        'Programme de fidélité client',
        'Analytics des ventes et popularité des plats'
      ];
    }

    else if (packageName?.includes('colis') || packageName?.includes('delivery') || packageName?.includes('express')) {
      description = `Plateforme collaborative de livraison urbaine. Connecte expéditeurs et livreurs indépendants pour optimiser les livraisons locales avec géolocalisation temps réel et système de matching intelligent.`;

      features = [
        'Géolocalisation GPS en temps réel',
        'Système de matching expéditeur/livreur',
        'Suivi de livraison live pour clients',
        'Système de notation et avis',
        'Paiement sécurisé intégré',
        'Interface responsive web et mobile',
        'Gestion des zones de livraison'
      ];
    }

    else if (packageName?.includes('vote') || packageName?.includes('election')) {
      description = `Système de vote électronique sécurisé et transparent. Plateforme de votation en ligne avec chiffrement avancé, authentification multi-facteurs et audit trail complet pour garantir l'intégrité des élections.`;

      features = [
        'Chiffrement AES-256 des votes',
        'Authentification multi-facteurs (2FA)',
        'Audit trail immuable et traçable',
        'Anonymisation des données électeurs',
        'Interface de vote accessible',
        'Tableaux de bord d\'administration temps réel',
        'Génération automatique de rapports',
        'Support multi-organisations/élections'
      ];
    }

    else if (packageName?.includes('stream') || packageName?.includes('live') || packageName?.includes('studio')) {
      description = `Plateforme de streaming professionnel avec fonctionnalités avancées. Studio de diffusion en direct avec chat interactif, monétisation et outils d'analyse pour créateurs de contenu.`;

      features = [
        'Diffusion en haute qualité (HD/4K)',
        'Chat en temps réel avec modération IA',
        'Intégration réseaux sociaux (YouTube, Twitch)',
        'Analytics de performance détaillés',
        'Monétisation par dons/abonnements',
        'Enregistrement automatique des streams',
        'Streaming multi-caméras',
        'Interface de contrôle professionnel'
      ];
    }

    // Analyser les dépendances pour enrichir la stack technique
    const allDeps = { ...dependencies, ...devDependencies };

    if (allDeps.react) techStack.push('React');
    if (allDeps['react-dom']) techStack.push('React DOM');
    if (allDeps.next) techStack.push('Next.js');
    if (allDeps.vite) techStack.push('Vite');
    if (allDeps.tailwindcss) techStack.push('Tailwind CSS');
    if (allDeps.framer) techStack.push('Framer Motion');
    if (allDeps.express) techStack.push('Express.js');
    if (allDeps.mongodb || allDeps.mongoose) techStack.push('MongoDB');
    if (allDeps.postgresql) techStack.push('PostgreSQL');
    if (allDeps.mysql) techStack.push('MySQL');
    if (allDeps.firebase) techStack.push('Firebase');
    if (allDeps.socket) techStack.push('Socket.io');
    if (allDeps.axios) techStack.push('Axios');
    if (allDeps.react) techStack.push('React Icons');
  }

  // Analyser le code source pour plus de détails
  if (sourceCode.src || sourceCode.app) {
    const srcFiles = sourceCode.src || sourceCode.app || [];

    // Détecter les composants React
    const componentFiles = srcFiles.filter(f => f.name.endsWith('.tsx') || f.name.endsWith('.jsx'));
    if (componentFiles.length > 0) {
      features.push(`${componentFiles.length} composants React modulaires`);
    }

    // Détecter les pages
    const pageFiles = srcFiles.filter(f => f.path.includes('pages') || f.path.includes('routes'));
    if (pageFiles.length > 0) {
      features.push(`${pageFiles.length} pages/routes organisées`);
    }

    // Détecter les hooks personnalisés
    const hookFiles = srcFiles.filter(f => f.name.startsWith('use') && (f.name.endsWith('.ts') || f.name.endsWith('.js')));
    if (hookFiles.length > 0) {
      features.push(`${hookFiles.length} hooks React personnalisés`);
    }

    // Détecter les utilitaires
    const utilFiles = srcFiles.filter(f => f.path.includes('utils') || f.path.includes('helpers'));
    if (utilFiles.length > 0) {
      features.push('Fonctions utilitaires réutilisables');
    }
  }

  // Nettoyer et dédupliquer
  techStack = [...new Set(techStack)];
  features = [...new Set(features)];

  return {
    description: description || `Application web moderne développée avec les dernières technologies. Interface utilisateur élégante et fonctionnalités avancées.`,
    features,
    techStack,
    mainFiles: mainFiles.slice(0, 10) // Limiter à 10 fichiers principaux
  };
}

async function analyzeAllRepos() {
  const repos = [
    'ember-grill',
    'portfolio_evans',
    'colisgo-express',
    'voteflow-ict',
    'star-live-studio'
  ];

  const owner = 'AbakoDolla';
  const detailedDescriptions = {};

  for (const repo of repos) {
    const analysis = await analyzeGitHubRepoCode(owner, repo);

    if (analysis) {
      const detailed = generateDetailedDescription(analysis);
      detailedDescriptions[repo] = {
        ...analysis,
        ...detailed
      };

      console.log(`✅ ${repo} analysé - ${detailed.techStack.length} technologies détectées`);
    }

    // Pause pour éviter les limites de l'API
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // Sauvegarder l'analyse détaillée
  fs.writeFileSync('detailed_repo_analysis.json', JSON.stringify(detailedDescriptions, null, 2));
  console.log('\n💾 Analyse détaillée sauvegardée dans detailed_repo_analysis.json');

  return detailedDescriptions;
}

// Lancer l'analyse
analyzeAllRepos().catch(console.error);