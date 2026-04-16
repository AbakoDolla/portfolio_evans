import fetch from 'node-fetch';
import fs from 'fs';

async function verifyDescriptions(owner) {
  try {
    console.log(`🔍 Vérification des descriptions pour ${owner}...\n`);

    // Charger les descriptions ultra-précises nettoyées
    const expectedDescriptions = JSON.parse(fs.readFileSync('ultra_precise_descriptions_clean.json', 'utf8'));

    const repos = Object.keys(expectedDescriptions);
    let successCount = 0;
    let totalCount = repos.length;

    for (const repo of repos) {
      try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
          headers: { 'User-Agent': 'Node.js' }
        });

        if (!response.ok) {
          console.log(`❌ ${repo}: Erreur HTTP ${response.status}`);
          continue;
        }

        const data = await response.json();
        const currentDescription = data.description || '';
        const expectedDescription = expectedDescriptions[repo].description;

        if (currentDescription.trim() === expectedDescription.trim()) {
          console.log(`✅ ${repo}: Description appliquée correctement`);
          successCount++;
        } else if (currentDescription.length > 0) {
          console.log(`⚠️  ${repo}: Description différente`);
          console.log(`   Attendue: ${expectedDescription.substring(0, 50)}...`);
          console.log(`   Actuelle: ${currentDescription.substring(0, 50)}...`);
        } else {
          console.log(`❌ ${repo}: Aucune description`);
        }

      } catch (error) {
        console.log(`❌ ${repo}: Erreur - ${error.message}`);
      }

      // Pause pour éviter les limites de l'API
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log(`\n📊 Résumé: ${successCount}/${totalCount} descriptions appliquées correctement`);

    if (successCount === totalCount) {
      console.log('🎉 Toutes les descriptions ont été appliquées avec succès !');
    } else if (successCount > 0) {
      console.log('⚠️ Certaines descriptions n\'ont pas été appliquées. Vérifiez les erreurs ci-dessus.');
    } else {
      console.log('❌ Aucune description n\'a été appliquée. Lancez d\'abord apply_descriptions.js');
    }

  } catch (error) {
    console.error('❌ Erreur lors de la vérification:', error.message);
  }
}

// Utilisation
const owner = 'AbakoDolla';
verifyDescriptions(owner);