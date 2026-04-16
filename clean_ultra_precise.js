import fs from 'fs';

// Fonction pour nettoyer et raccourcir les descriptions ultra-précises
function cleanUltraPreciseDescriptions() {
  const descriptions = JSON.parse(fs.readFileSync('ultra_precise_descriptions.json', 'utf8'));
  const cleaned = {};

  for (const [repo, data] of Object.entries(descriptions)) {
    let description = data.description;

    // Supprimer les emojis et caractères spéciaux problématiques
    description = description
      .replace(/🍽️|🚀|📦|🗳️|🎬/g, '')
      .replace(/\n\n/g, ' ') // Remplacer les doubles sauts de ligne par des espaces
      .replace(/\n/g, ' ')   // Remplacer les sauts de ligne par des espaces
      .replace(/\s+/g, ' ')  // Normaliser les espaces multiples
      .trim();

    // Raccourcir à 300 caractères maximum (marge de sécurité)
    if (description.length > 300) {
      description = description.substring(0, 297) + '...';
    }

    cleaned[repo] = {
      ...data,
      description: description
    };

    console.log(`${repo}: ${description.length} caractères`);
    console.log(`"${description}"\n`);
  }

  // Sauvegarder les descriptions nettoyées
  fs.writeFileSync('ultra_precise_descriptions_clean.json', JSON.stringify(cleaned, null, 2));
  console.log('\n💾 Descriptions ultra-précises nettoyées sauvegardées dans ultra_precise_descriptions_clean.json');

  return cleaned;
}

// Exécuter le nettoyage
cleanUltraPreciseDescriptions();