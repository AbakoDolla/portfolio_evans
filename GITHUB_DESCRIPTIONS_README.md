# 🤖 Application Automatique des Descriptions GitHub

Ce projet contient des scripts pour analyser automatiquement vos repositories GitHub et appliquer des descriptions professionnelles adaptées à chaque projet.

## 📋 Prérequis

- Node.js installé
- Un Personal Access Token GitHub avec permissions `repo`

## 🔑 Configuration du Token GitHub

### Étape 1 : Créer un Personal Access Token

1. Allez sur [GitHub.com](https://github.com) et connectez-vous
2. Cliquez sur votre photo de profil → **Settings**
3. Dans la sidebar, cliquez sur **Developer settings**
4. Cliquez sur **Personal access tokens** → **Tokens (classic)**
5. Cliquez sur **Generate new token (classic)**
6. Donnez un nom descriptif (ex: "Portfolio Auto-Descriptions")
7. Sélectionnez la portée : cochez **`repo`** (accès complet aux repositories)
8. Cliquez sur **Generate token**
9. **⚠️ IMPORTANT :** Copiez le token immédiatement (vous ne pourrez plus le voir après)

### Étape 2 : Configurer le Token

**Option A : Variable d'environnement (recommandé)**
```bash
export GITHUB_TOKEN=votre_token_ici
```

**Option B : Fichier .env**
```bash
echo "GITHUB_TOKEN=votre_token_ici" > .env
```

## 🚀 Utilisation

### Analyse des repositories

```bash
node deep_analyze_github.js
```

Ce script :
- Analyse le code de chaque repository
- Détecte les technologies utilisées
- Identifie le type de projet (portfolio, app de livraison, système de vote, etc.)
- Génère des descriptions adaptées

### Application automatique des descriptions

```bash
node apply_descriptions.js
```

**⚠️ IMPORTANT :** Assurez-vous que votre `GITHUB_TOKEN` est configuré avant de lancer ce script.

### Utilisation du script batch (Windows)

```bash
apply_descriptions.bat
```

## 📁 Fichiers générés

- `github_descriptions.json` : Descriptions générées pour chaque repository
- `apply_descriptions.bat` : Script batch Windows pour faciliter l'utilisation

## 🎯 Types de projets détectés

Le script détecte automatiquement :

- **Portfolio** : Sites web personnels, CV interactifs
- **Delivery App** : Applications de livraison et logistique
- **Voting System** : Systèmes de vote électronique sécurisés
- **Restaurant App** : Applications de gestion de restaurant
- **Streaming Platform** : Plateformes de streaming en direct

## 🔧 Technologies détectées

- React, Vue, Angular
- Node.js, Python, Java
- TypeScript, JavaScript
- Tailwind CSS, Bootstrap
- Vite, Next.js, Nuxt
- Docker, Kubernetes
- Et bien d'autres...

## 📊 Résultats

Après exécution, vos repositories GitHub auront des descriptions professionnelles comme :

```
🚀 Portfolio professionnel - Développeur Full-Stack & Cybersécurité

Portfolio interactif moderne présentant mes compétences en développement web...
```

## 🛡️ Sécurité

- Le token GitHub n'est jamais stocké dans les fichiers
- Utilisez uniquement des tokens avec les permissions minimales nécessaires
- Supprimez le token si vous ne l'utilisez plus

## 🆘 Dépannage

### Erreur "Bad credentials"
- Vérifiez que votre token est correct
- Assurez-vous que le token a la permission `repo`

### Erreur "Repository not found"
- Vérifiez que le nom du repository est correct
- Assurez-vous que vous avez accès au repository

### Erreur de rate limit
- L'API GitHub limite les requêtes (5000 par heure pour les tokens authentifiés)
- Le script fait automatiquement des pauses entre les requêtes

## 📝 Personnalisation

Vous pouvez modifier les descriptions dans `github_descriptions.json` avant de les appliquer, ou personnaliser la logique de génération dans `deep_analyze_github.js`.

---

**🎉 Profitez de vos repositories GitHub avec des descriptions professionnelles !**