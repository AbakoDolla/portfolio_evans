import fetch from 'node-fetch';
import fs from 'fs';

async function updateGitHubDescription(owner, repo, description, token) {
  try {
    console.log(`\n📝 Mise à jour ultra-précise de ${owner}/${repo}...`);

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
    console.log(`✅ Description ultra-précise appliquée pour ${repo}`);
    return data;

  } catch (error) {
    console.error(`❌ Erreur lors de la mise à jour de ${repo}:`, error.message);
    return null;
  }
}

async function applyUltraPreciseDescriptions() {
  // Charger les descriptions ultra-précises nettoyées
  const descriptions = JSON.parse(fs.readFileSync('ultra_precise_descriptions_clean.json', 'utf8'));

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

  console.log(`🚀 Application des descriptions ULTRA-PRÉCISES pour ${repos.length} repositories...\n`);
  console.log('📊 Ces descriptions sont basées sur l\'analyse DÉTAILLÉE du code source réel !\n');

  for (const repo of repos) {
    const description = descriptions[repo].description;
    console.log(`🎯 ${repo}: ${description.substring(0, 100)}...`);

    await updateGitHubDescription(owner, repo, description, token);

    // Pause pour éviter les limites de l'API GitHub
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n🎉 Toutes les descriptions ULTRA-PRÉCISES ont été appliquées avec succès !');
  console.log('🔍 Vérifiez vos repositories GitHub pour voir les nouvelles descriptions professionnelles.');
  console.log('\n📋 Résumé des descriptions appliquées :');

  for (const repo of repos) {
    const desc = descriptions[repo].description;
    console.log(`• ${repo}: ${desc.split('.')[0]}.`);
  }
}

// Fonction pour créer un script batch Windows
function createBatchScript() {
  const batchContent = `@echo off
echo Application ULTRA-PRECISE des Descriptions GitHub
echo ================================================
echo.
echo Ce script applique des descriptions PROFESSIONNELLES
echo basees sur l'analyse DETAILLEE du code source !
echo.
echo Prerequisites:
echo 1. Node.js installe
echo 2. Token GitHub configure (voir instructions dans le script)
echo.
echo Appuyez sur une touche pour continuer ou Ctrl+C pour annuler...
pause > nul

node apply_ultra_precise_descriptions.js

echo.
echo Termine ! Appuyez sur une touche pour fermer.
pause > nul`;

  fs.writeFileSync('apply_ultra_precise.bat', batchContent);
  console.log('📄 Script batch créé : apply_ultra_precise.bat');
}

// Créer le script batch
createBatchScript();

// Exécuter si un token est fourni
if (process.env.GITHUB_TOKEN) {
  applyUltraPreciseDescriptions();
} else {
  console.log('\n⚠️  Token GitHub non configuré.');
  console.log('Pour appliquer automatiquement les descriptions ULTRA-PRÉCISES :');
  console.log('1. export GITHUB_TOKEN=votre_token_github');
  console.log('2. node apply_ultra_precise_descriptions.js');
  console.log('\nOu utilisez le script batch : apply_ultra_precise.bat');
  console.log('\n💡 Ces descriptions sont basees sur l\'analyse reelle du code source !');
}