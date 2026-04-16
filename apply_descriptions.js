import fetch from 'node-fetch';
import fs from 'fs';

async function updateGitHubDescription(owner, repo, description, token) {
  try {
    console.log(`\n📝 Mise à jour de ${owner}/${repo}...`);

    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `token ${token}`,
        'User-Agent': 'Node.js',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description: description,
        homepage: '' // Peut être ajouté plus tard si nécessaire
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Erreur HTTP ${response.status}: ${error}`);
    }

    const data = await response.json();
    console.log(`✅ Description mise à jour pour ${repo}`);
    return data;

  } catch (error) {
    console.error(`❌ Erreur lors de la mise à jour de ${repo}:`, error.message);
    return null;
  }
}

async function applyDescriptionsAutomatically() {
  // Charger les descriptions générées
  const descriptions = JSON.parse(fs.readFileSync('github_descriptions_clean.json', 'utf8'));

  // Demander le token GitHub (vous devrez le fournir)
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.error('❌ GITHUB_TOKEN non trouvé dans les variables d\'environnement');
    console.log('\n🔑 Pour utiliser ce script, vous devez :');
    console.log('1. Créer un Personal Access Token sur GitHub (Settings > Developer settings > Personal access tokens)');
    console.log('2. Donner les permissions "repo" (accès complet aux repositories privés et publics)');
    console.log('3. Définir la variable d\'environnement : export GITHUB_TOKEN=votre_token_ici');
    console.log('4. Ou créer un fichier .env avec : GITHUB_TOKEN=votre_token_ici');
    return;
  }

  const owner = 'AbakoDolla';
  const repos = Object.keys(descriptions);

  console.log(`🚀 Application automatique des descriptions pour ${repos.length} repositories...\n`);

  for (const repo of repos) {
    const description = descriptions[repo].description;
    await updateGitHubDescription(owner, repo, description, token);

    // Pause pour éviter de dépasser les limites de l'API GitHub
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n🎉 Toutes les descriptions ont été appliquées avec succès !');
  console.log('🔍 Vérifiez vos repositories GitHub pour voir les nouvelles descriptions.');
}

// Fonction pour créer un script batch Windows
function createBatchScript() {
  const batchContent = `@echo off
echo Application automatique des descriptions GitHub
echo ==============================================
echo.
echo Ce script va appliquer les descriptions generees a vos repositories GitHub
echo.
echo Prerequisites:
echo 1. Node.js installe
echo 2. Token GitHub configure (voir instructions dans le script)
echo.
echo Appuyez sur une touche pour continuer ou Ctrl+C pour annuler...
pause > nul

node apply_descriptions.js

echo.
echo Termine ! Appuyez sur une touche pour fermer.
pause > nul`;

  fs.writeFileSync('apply_descriptions.bat', batchContent);
  console.log('📄 Script batch créé : apply_descriptions.bat');
}

// Créer le script batch
createBatchScript();

// Exécuter si un token est fourni
if (process.env.GITHUB_TOKEN) {
  applyDescriptionsAutomatically();
} else {
  console.log('\n⚠️  Token GitHub non configuré.');
  console.log('Pour appliquer automatiquement les descriptions :');
  console.log('1. export GITHUB_TOKEN=votre_token_github');
  console.log('2. node apply_descriptions.js');
  console.log('\nOu utilisez le script batch : apply_descriptions.bat');
}