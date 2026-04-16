import fetch from 'node-fetch';
import fs from 'fs';

async function analyzeGitHubRepo(owner, repo) {
  try {
    console.log(`\n🔍 Analyse de ${owner}/${repo}...\n`);

    // Récupérer les informations du repo
    const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: { 'User-Agent': 'Node.js' }
    });

    if (!repoResponse.ok) {
      throw new Error(`Erreur HTTP: ${repoResponse.status}`);
    }

    const repoData = await repoResponse.json();

    // Récupérer la structure des fichiers (API GitHub Contents)
    const contentsResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents`, {
      headers: { 'User-Agent': 'Node.js' }
    });

    const contents = await contentsResponse.json();

    // Analyser les fichiers principaux
    const analysis = {
      name: repoData.name,
      description: repoData.description,
      language: repoData.language,
      files: [],
      techStack: new Set(),
      features: [],
      type: 'unknown'
    };

    // Analyser chaque fichier/dossier pour détecter le type
    for (const item of contents) {
      if (item.type === 'file') {
        analysis.files.push(item.name);

        // Détecter les technologies
        if (item.name === 'package.json') {
          analysis.techStack.add('Node.js');
          analysis.techStack.add('npm');
        }
        if (item.name === 'tsconfig.json') analysis.techStack.add('TypeScript');
        if (item.name === 'tailwind.config.js') analysis.techStack.add('Tailwind CSS');
        if (item.name === 'vite.config.ts') analysis.techStack.add('Vite');
        if (item.name === 'next.config.js') analysis.techStack.add('Next.js');
        if (item.name === 'requirements.txt') analysis.techStack.add('Python');
        if (item.name === 'Dockerfile') analysis.techStack.add('Docker');
        if (item.name === 'docker-compose.yml') analysis.techStack.add('Docker Compose');

        // Détecter le type basé sur les noms de fichiers
        const fileName = item.name.toLowerCase();
        if (fileName.includes('portfolio') || fileName.includes('cv') || fileName.includes('resume')) {
          analysis.type = 'portfolio';
        }
        if (fileName.includes('colis') || fileName.includes('delivery') || fileName.includes('livraison')) {
          analysis.type = 'delivery-app';
        }
        if (fileName.includes('vote') || fileName.includes('election') || fileName.includes('poll')) {
          analysis.type = 'voting-system';
        }
        if (fileName.includes('restaurant') || fileName.includes('grill') || fileName.includes('menu')) {
          analysis.type = 'restaurant-app';
        }
        if (fileName.includes('stream') || fileName.includes('live') || fileName.includes('studio')) {
          analysis.type = 'streaming-platform';
        }

      } else if (item.type === 'dir') {
        // Analyser les dossiers
        const dirName = item.name.toLowerCase();
        if (dirName.includes('portfolio') || dirName.includes('cv') || dirName.includes('resume')) {
          analysis.type = 'portfolio';
        }
        if (dirName.includes('colis') || dirName.includes('delivery') || dirName.includes('livraison')) {
          analysis.type = 'delivery-app';
        }
        if (dirName.includes('vote') || dirName.includes('election') || dirName.includes('poll')) {
          analysis.type = 'voting-system';
        }
        if (dirName.includes('restaurant') || dirName.includes('grill') || dirName.includes('menu')) {
          analysis.type = 'restaurant-app';
        }
        if (dirName.includes('stream') || dirName.includes('live') || dirName.includes('studio')) {
          analysis.type = 'streaming-platform';
        }
      }
    }

    // Détection basée sur le nom du repo si pas encore détecté
    const repoName = repo.toLowerCase();
    if (analysis.type === 'unknown') {
      if (repoName.includes('portfolio')) {
        analysis.type = 'portfolio';
        analysis.features.push('Site web personnel', 'Présentation de projets', 'CV interactif');
      } else if (repoName.includes('colis') || repoName.includes('delivery')) {
        analysis.type = 'delivery-app';
        analysis.features.push('Système de livraison', 'Géolocalisation', 'Gestion de colis');
      } else if (repoName.includes('vote')) {
        analysis.type = 'voting-system';
        analysis.features.push('Système de vote', 'Authentification', 'Sécurité électorale');
      } else if (repoName.includes('restaurant') || repoName.includes('grill')) {
        analysis.type = 'restaurant-app';
        analysis.features.push('Gestion de restaurant', 'Commandes en ligne', 'Menu digital');
      } else if (repoName.includes('stream') || repoName.includes('live') || repoName.includes('studio')) {
        analysis.type = 'streaming-platform';
        analysis.features.push('Streaming en direct', 'Interface de diffusion', 'Interaction audience');
      }
    }

    // Analyser le package.json si disponible
    const packageJson = contents.find(item => item.name === 'package.json');
    if (packageJson) {
      try {
        const packageResponse = await fetch(packageJson.download_url);
        const packageData = await packageResponse.json();

        // Analyser les dépendances
        const allDeps = { ...packageData.dependencies, ...packageData.devDependencies };

        if (allDeps.react) analysis.techStack.add('React');
        if (allDeps['react-dom']) analysis.techStack.add('React DOM');
        if (allDeps.next) analysis.techStack.add('Next.js');
        if (allDeps.vite) analysis.techStack.add('Vite');
        if (allDeps.tailwindcss) analysis.techStack.add('Tailwind CSS');
        if (allDeps.framer) analysis.techStack.add('Framer Motion');
        if (allDeps.express) analysis.techStack.add('Express.js');
        if (allDeps.mongodb || allDeps.mongoose) analysis.techStack.add('MongoDB');
        if (allDeps.postgresql) analysis.techStack.add('PostgreSQL');

        // Analyser le type de projet basé sur le nom du package
        const packageName = packageData.name?.toLowerCase() || '';
        if (packageName.includes('portfolio')) {
          analysis.type = 'portfolio';
          analysis.features.push('Site web personnel', 'Présentation de projets', 'CV interactif');
        } else if (packageName.includes('colis') || packageName.includes('delivery')) {
          analysis.type = 'delivery-app';
          analysis.features.push('Système de livraison', 'Géolocalisation', 'Gestion de colis');
        } else if (packageName.includes('vote')) {
          analysis.type = 'voting-system';
          analysis.features.push('Système de vote', 'Authentification', 'Sécurité électorale');
        } else if (packageName.includes('restaurant') || packageName.includes('grill')) {
          analysis.type = 'restaurant-app';
          analysis.features.push('Gestion de restaurant', 'Commandes en ligne', 'Menu digital');
        } else if (packageName.includes('stream') || packageName.includes('live') || packageName.includes('studio')) {
          analysis.type = 'streaming-platform';
          analysis.features.push('Streaming en direct', 'Interface de diffusion', 'Interaction audience');
        }

      } catch (error) {
        console.log(`⚠️ Impossible d'analyser package.json: ${error.message}`);
      }
    }

    return analysis;

  } catch (error) {
    console.error(`❌ Erreur lors de l'analyse de ${repo}:`, error.message);
    return null;
  }
}

async function generateDescriptions() {
  const repos = [
    'ember-grill',
    'portfolio_evans',
    'colisgo-express',
    'voteflow-ict',
    'star-live-studio'
  ];

  const owner = 'AbakoDolla';
  const descriptions = {};

  for (const repo of repos) {
    const analysis = await analyzeGitHubRepo(owner, repo);

    if (analysis) {
      let description = '';

      switch (analysis.type) {
        case 'portfolio':
          description = `🚀 Portfolio professionnel - Développeur Full-Stack & Cybersécurité

Portfolio interactif moderne présentant mes compétences en développement web, cybersécurité et automatisation Python. Interface élégante avec animations fluides et design responsive.

🎯 Compétences présentées :
• Développement Web (${Array.from(analysis.techStack).join(', ')})
• Cybersécurité & Ethical Hacking
• Automatisation Python & OSINT
• Architecture réseau & VPN

✨ Fonctionnalités :
${analysis.features.map(f => `• ${f}`).join('\n')}

🛠️ Technologies : ${Array.from(analysis.techStack).join(', ')}
🎨 Design : UI/UX moderne avec animations`;
          break;

        case 'delivery-app':
          description = `📦 Plateforme de livraison collaborative - ColisGo Express

Solution innovante de livraison urbaine connectant expéditeurs et livreurs indépendants. Optimise les livraisons locales avec géolocalisation temps réel.

⚡ Fonctionnalités principales :
${analysis.features.map(f => `• ${f}`).join('\n')}
• Géolocalisation GPS en temps réel
• Matching intelligent expéditeur/livreur
• Suivi de livraison live
• Système de notation et avis
• Paiement sécurisé intégré

🎯 Cible : Livraison urbaine collaborative
🛠️ Technologies : ${Array.from(analysis.techStack).join(', ')}
📱 Support : Web & Mobile`;
          break;

        case 'voting-system':
          description = `🗳️ Système de vote électronique sécurisé - VoteFlow ICT

Plateforme de vote en ligne sécurisée pour organisations et élections. Garantit l'intégrité des votes avec chiffrement avancé et traçabilité complète.

🔐 Sécurité renforcée :
• Chiffrement AES-256 des votes
• Authentification multi-facteurs (2FA)
• Audit trail complet et immuable
• Anonymisation des données électeurs
• Conformité RGPD et normes électorales

📊 Fonctionnalités :
${analysis.features.map(f => `• ${f}`).join('\n')}
• Interface de vote intuitive et accessible
• Tableaux de bord d'administration temps réel
• Génération automatique de rapports
• Support multi-organisations/élections
• Archivage sécurisé des résultats

🛡️ Technologies : ${Array.from(analysis.techStack).join(', ')}
🏛️ Usage : Élections, votes associatifs, sondages sécurisés`;
          break;

        case 'restaurant-app':
          description = `🔥 Application de gestion restaurant moderne - Ember Grill

Solution complète de digitalisation pour restaurants. Gestion des commandes, menus dynamiques, et expérience client améliorée.

🍽️ Fonctionnalités :
${analysis.features.map(f => `• ${f}`).join('\n')}
• Système de commande en ligne responsive
• Gestion dynamique des menus et prix
• Suivi en temps réel des commandes
• Interface d'administration pour le personnel
• Intégration paiement sécurisé (Stripe)
• Gestion des réservations
• Programme de fidélité intégré

👨‍🍳 Pour restaurateurs :
• Augmentation du chiffre d'affaires
• Réduction des erreurs de commande
• Amélioration de l'expérience client
• Analytics des ventes et popularité des plats

🛠️ Technologies : ${Array.from(analysis.techStack).join(', ')}
📱 Plateforme : Web Application`;
          break;

        case 'streaming-platform':
          description = `🎬 Plateforme de streaming professionnel - Star Live Studio

Studio de streaming en direct complet avec fonctionnalités avancées pour créateurs de contenu. Interface de diffusion, interaction audience et monétisation.

🎭 Fonctionnalités streaming :
${analysis.features.map(f => `• ${f}`).join('\n')}
• Diffusion en haute qualité (HD/4K)
• Chat en temps réel avec modération IA
• Intégration réseaux sociaux (YouTube, Twitch, etc.)
• Analytics de performance détaillés
• Monétisation par dons/abonnements
• Enregistrement automatique des streams
• Streaming multi-caméras

🎯 Pour créateurs :
• Streamers professionnels
• Enseignants et formateurs
• Entreprises (webinaires, présentations)
• Événements en direct

🛠️ Technologies : ${Array.from(analysis.techStack).join(', ')}
🎬 Support : WebRTC, HLS, DASH`;
          break;

        default:
          description = `💻 Projet de développement - ${analysis.name}

Application développée avec les dernières technologies web. Interface moderne et fonctionnalités avancées.

🛠️ Technologies utilisées : ${Array.from(analysis.techStack).join(', ')}
🌐 Type : Application Web
📁 Language principal : ${analysis.language}`;
      }

      descriptions[repo] = {
        description: description,
        techStack: Array.from(analysis.techStack),
        features: analysis.features,
        type: analysis.type
      };

      console.log(`✅ ${repo} analysé - Type: ${analysis.type}`);
    }
  }

  // Sauvegarder les descriptions dans un fichier
  fs.writeFileSync('github_descriptions.json', JSON.stringify(descriptions, null, 2));
  console.log('\n💾 Descriptions sauvegardées dans github_descriptions.json');

  return descriptions;
}

// Générer les descriptions
generateDescriptions().catch(console.error);