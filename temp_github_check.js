const https = require('https');

const options = {
  hostname: 'api.github.com',
  path: '/users/AbakoDolla/repos?sort=updated&per_page=10',
  headers: {
    'User-Agent': 'Node.js'
  }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    try {
      const repos = JSON.parse(data);
      console.log('=== VOS REPOSITORIES GITHUB ===\n');
      repos.forEach((repo, index) => {
        console.log(`📁 ${index + 1}. ${repo.name}`);
        console.log(`📝 Description: ${repo.description || '❌ Aucune description'}`);
        console.log(`🌐 Language: ${repo.language || 'Non spécifié'}`);
        console.log(`🏷️ Topics: ${repo.topics?.join(', ') || 'Aucun'}`);
        console.log(`⭐ Stars: ${repo.stargazers_count}`);
        console.log(`🔗 URL: ${repo.html_url}`);
        console.log(`📅 Dernière MAJ: ${new Date(repo.updated_at).toLocaleDateString('fr-FR')}`);
        console.log('---');
      });
    } catch (e) {
      console.error('Erreur de parsing JSON:', e.message);
    }
  });
}).on('error', (err) => {
  console.error('Erreur de requête:', err.message);
});