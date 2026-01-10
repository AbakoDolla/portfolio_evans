# 📱 Configuration de l'Authentification Biométrique

## 🎯 Vue d'ensemble

Ce portfolio utilise l'API **WebAuthn** pour fournir une authentification biométrique sécurisée utilisant le lecteur d'empreinte digitale de votre appareil (notamment les téléphones Android).

## 🔧 Prérequis

### Navigateurs Supportés
- ✅ **Chrome** (recommandé)
- ✅ **Firefox** (version 60+)
- ✅ **Edge** (version 79+)
- ✅ **Safari** (version 14+)

### Appareils Compatibles
- 📱 **Téléphones Android** avec lecteur d'empreinte
- 📱 **iPhones** avec Face ID/Touch ID
- 💻 **Ordinateurs portables** avec lecteur d'empreinte
- 🖥️ **Ordinateurs de bureau** avec clé de sécurité biométrique

## 🚀 Première Configuration

### 1. Accéder à l'authentification
1. Cliquez **5 fois rapidement** sur la photo de profil
2. La modal d'authentification s'ouvre
3. Choisissez **"Empreinte"**

### 2. Enregistrer votre empreinte
1. Cliquez sur **"Enregistrer l'empreinte"**
2. Le navigateur vous demandera de scanner votre empreinte
3. Suivez les instructions de votre appareil :
   - **Android** : Posez votre doigt sur le capteur
   - **iPhone** : Utilisez Face ID ou Touch ID
4. Attendez la confirmation d'enregistrement

### 3. Confirmation
- ✅ Une icône verte apparaît
- ✅ Le badge "Empreinte enregistrée" s'affiche
- ✅ L'empreinte est maintenant utilisable

## 🔐 Utilisation Quotidienne

### Connexion avec empreinte
1. Cliquez 5 fois sur la photo
2. Choisissez "Empreinte"
3. Cliquez sur "Scanner l'empreinte"
4. Scannez votre empreinte
5. ✅ Accès immédiat au dashboard

### Alternative : Code secret
- Code : `Ab@h2006`
- Utilisable si l'empreinte n'est pas disponible

## 🛠️ Résolution de Problèmes

### "Authentification biométrique non supportée"
**Causes possibles :**
- Navigateur trop ancien
- Appareil sans capteur biométrique
- Contexte non sécurisé (HTTP)

**Solutions :**
- Mettez à jour votre navigateur
- Utilisez Chrome sur Android
- Accédez via HTTPS

### "L'utilisateur a annulé l'opération"
**Causes possibles :**
- Annulation manuelle
- Empreinte non reconnue
- Timeout

**Solutions :**
- Réessayez avec une empreinte propre
- Réenregistrez votre empreinte
- Utilisez le code de secours

### "Erreur de sécurité"
**Causes possibles :**
- Site non en HTTPS
- Permissions refusées

**Solutions :**
- Accédez via HTTPS obligatoirement
- Vérifiez les permissions du navigateur

## 🔒 Sécurité

### Niveau de sécurité
- 🔐 **Cryptographie asymétrique** (WebAuthn)
- 🔐 **Clés stockées localement** sur l'appareil
- 🔐 **Vérification obligatoire** de l'empreinte
- 🔐 **Protection contre le phishing**

### Bonnes pratiques
- 🔄 Réenregistrez périodiquement votre empreinte
- 🔄 Utilisez le code de secours en dernier recours
- 🔄 Maintenez votre navigateur à jour

## 📊 Gestion des Données

### Réinitialisation
- **Empreinte seule** : "Réinitialiser l'empreinte"
- **Toutes les données** : "Effacer tout" dans le dashboard

### Export
- Les données de visite peuvent être exportées en JSON
- Utile pour analyse ou sauvegarde

## 🚀 Notes Techniques

### WebAuthn API
- Standard W3C pour authentification web
- Supporte les authentificateurs platform (intégrés)
- Compatible avec les protocoles FIDO2/WebAuthn

### Stockage local
- Les identifiants sont stockés dans le navigateur
- Non transférables entre appareils
- Supprimés avec les données du navigateur

---

## 📞 Support

En cas de problème persistant :
1. Utilisez le code `Ab@h2006`
2. Contactez l'administrateur
3. Vérifiez la compatibilité de votre appareil

**L'authentification biométrique est conçue pour être rapide, sécurisée et conviviale !** 🚀
