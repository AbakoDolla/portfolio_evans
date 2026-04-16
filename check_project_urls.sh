#!/bin/bash
# Script pour ajouter et vérifier les URLs des projets

echo "🚀 Vérification des URLs des projets..."
echo "========================================"
echo ""

# Vérifier src/config/projectsUrls.ts
if [ -f "src/config/projectsUrls.ts" ]; then
    echo "✅ Fichier de configuration trouvé: src/config/projectsUrls.ts"
    echo ""
    echo "📋 Projets configurés:"
    grep -oP "'\K[^']*(?=': {)" src/config/projectsUrls.ts | nl
    echo ""
    
    echo "🌐 Projets EN LIGNE (status: 'live'):"
    grep -B 2 "status: 'live'" src/config/projectsUrls.ts | grep -oP "'[^']*'" | head -1 | tr -d "'" || echo "Aucun projet en ligne"
    echo ""
    
    echo "⏳ Projets EN DÉVELOPPEMENT (status: 'development'):"
    grep -B 2 "status: 'development'" src/config/projectsUrls.ts | grep -oP "'[^']*'" | tr -d "'" || echo "Aucun projet en dev"
    echo ""
    
else
    echo "❌ Fichier src/config/projectsUrls.ts non trouvé!"
fi

echo "========================================"
echo "📝 Instructions pour ajouter une URL:"
echo "========================================"
echo "1. Ouvrez src/config/projectsUrls.ts"
echo "2. Trouvez le projet souhaité"
echo "3. Remplissez le champ 'website' avec l'URL"
echo "4. Changez 'status' à 'live'"
echo ""
echo "Exemple:"
echo "  'ember-grill': {"
echo "    website: 'https://ember-grill.netlify.app',  ← Ajoutez ici"
echo "    status: 'live',  ← Changez à 'live'"
echo "  },"
echo ""
