import fetch from 'node-fetch';

async function getGitHubRepos() {
  try {
    const response = await fetch('https://api.github.com/users/AbakoDolla/repos?sort=updated&per_page=20', {
      headers: {
        'User-Agent': 'Node.js'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const repos = await response.json();

    console.log('=== ANALYSE DES REPOSITORIES GITHUB ===\n');

    repos.forEach((repo, index) => {
      console.log(`📁 ${index + 1}. ${repo.name}`);
      console.log(`📝 Description actuelle: ${repo.description || '❌ Aucune'}`);
      console.log(`🌐 Language: ${repo.language || 'Non spécifié'}`);
      console.log(`🏷️ Topics: ${repo.topics?.join(', ') || 'Aucun'}`);
      console.log(`⭐ Stars: ${repo.stargazers_count}`);
      console.log(`🔗 URL: ${repo.html_url}`);
      console.log(`📅 Dernière MAJ: ${new Date(repo.updated_at).toLocaleDateString('fr-FR')}`);

      // Analyse du nom pour suggérer une description
      const name = repo.name.toLowerCase();
      let suggestedDescription = '';

      if (name.includes('cyber') || name.includes('security') || name.includes('hack')) {
        suggestedDescription = '🔐 Outil de cybersécurité et tests de pénétration éthiques';
      } else if (name.includes('vpn') || name.includes('wireguard')) {
        suggestedDescription = '🔒 Solution VPN sécurisée avec WireGuard pour connexion privée';
      } else if (name.includes('osint') || name.includes('scrap')) {
        suggestedDescription = '🕵️ Outils de renseignement en sources ouvertes (OSINT)';
      } else if (name.includes('python') || name.includes('script')) {
        suggestedDescription = '🐍 Scripts Python d\'automatisation et analyse de données';
      } else if (name.includes('web') || name.includes('site') || name.includes('app')) {
        suggestedDescription = '🌐 Application web moderne avec interface utilisateur';
      } else if (name.includes('api') || name.includes('backend')) {
        suggestedDescription = '⚙️ API backend robuste et scalable';
      } else {
        suggestedDescription = '💻 Projet de développement logiciel';
      }

      console.log(`💡 Description suggérée: ${suggestedDescription}`);
      console.log('---\n');
    });

  } catch (error) {
    console.error('Erreur:', error.message);
  }
}

getGitHubRepos();