#!/usr/bin/env node
/**
 * 📊 Affichage de la configuration des projets
 * Ce script affiche comment les projets seront affichés
 */

const projectsConfiguration = {
  "ember-grill": {
    title: "Ember Grill",
    type: "restaurant",
    icon: "🍽️",
    color: "accent (🔥 Orange)",
    status: "Terminé",
    buttons: ["🐙 Code", "📤 Demo", "🌐 Site"],
    description: "Application complète de gestion restaurant...",
    techStack: ["React", "TypeScript", "Supabase", "Tailwind"]
  },
  "portfolio_evans": {
    title: "Portfolio Evans",
    type: "portfolio",
    icon: "👤",
    color: "primary (💎 Cyan)",
    status: "Terminé",
    buttons: ["🐙 Code", "📤 Demo", "🌐 Site"],
    description: "Portfolio professionnel Full-Stack & Cybersécurité...",
    techStack: ["React", "TypeScript", "Framer Motion"]
  },
  "colisgo-express": {
    title: "ColisGo Express",
    type: "delivery",
    icon: "📦",
    color: "secondary (💙 Bleu)",
    status: "Terminé",
    buttons: ["🐙 Code", "📤 Demo", "🌐 Site"],
    description: "Plateforme collaborative de livraison urbaine...",
    techStack: ["React", "TypeScript", "Supabase"]
  },
  "voteflow-ict": {
    title: "VoteFlow ICT",
    type: "voting",
    icon: "🗳️",
    color: "primary (💎 Cyan)",
    status: "Terminé",
    buttons: ["🐙 Code", "📤 Demo", "🌐 Site"],
    description: "Plateforme de vote électronique institutionnelle...",
    techStack: ["React", "TypeScript", "Vitest"]
  },
  "star-live-studio": {
    title: "Star Live Studio",
    type: "streaming",
    icon: "🎬",
    color: "accent (🔥 Orange)",
    status: "Terminé",
    buttons: ["🐙 Code", "📤 Demo", "🌐 Site"],
    description: "Site web professionnel d'entreprise multi-services...",
    techStack: ["React", "TypeScript", "Framer Motion"]
  }
};

console.log("\n");
console.log("╔════════════════════════════════════════════════════════════════════════════════╗");
console.log("║                     📊 APERÇU DES PROJETS CONFIGURÉS                          ║");
console.log("║                                                                                ║");
console.log("║              Avec icônes adaptées, badges de type et URLs intégrés             ║");
console.log("╚════════════════════════════════════════════════════════════════════════════════╝");
console.log("\n");

Object.entries(projectsConfiguration).forEach(([key, project], index) => {
  console.log(`${index + 1}. ${project.icon} ${project.title.toUpperCase()}`);
  console.log(`   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`   Type: ${project.type.toUpperCase()}`);
  console.log(`   Status: ${project.status}`);
  console.log(`   Couleur: ${project.color}`);
  console.log(`   Boutons: ${project.buttons.join(" | ")}`);
  console.log(`   Desc: ${project.description}`);
  console.log(`   Tech: ${project.techStack.join(", ")}`);
  console.log("\n");
});

console.log("════════════════════════════════════════════════════════════════════════════════");
console.log("\n📱 AFFICHAGE RESPONSIVE:\n");

console.log("┌─ MOBILE (< 640px) ────────────────────────────────┐");
console.log("│                                                   │");
console.log("│  🍽️ Ember Grill [Terminé] [🍽️ Restaurant]       │");
console.log("│  Application complète...                          │");
console.log("│  React TypeScript Supabase...                    │");
console.log("│                                                   │");
console.log("│  [🐙] [📤] [🌐]  ← Icônes uniquement            │");
console.log("│                                                   │");
console.log("└─────────────────────────────────────────────────-─┘");
console.log("\n");

console.log("┌─ DESKTOP (> 640px) ────────────────────────────────┐");
console.log("│                                                    │");
console.log("│  🍽️ Ember Grill [Terminé] [🍽️ Restaurant]        │");
console.log("│  Application complète de gestion restaurant...    │");
console.log("│  React TypeScript Supabase Tailwind CSS...       │");
console.log("│                                                    │");
console.log("│  [🐙 Code] [📤 Demo] [🌐 Site]  ← Full display   │");
console.log("│                                                    │");
console.log("└────────────────────────────────────────────────────┘");

console.log("\n");
console.log("════════════════════════════════════════════════════════════════════════════════");
console.log("\n🎨 COULEURS PAR TYPE DE PROJET:\n");

const colorMap = {
  "restaurant": "🔥 Accent (Orange/Fire)",
  "delivery": "💙 Secondary (Bleu)",
  "voting": "💎 Primary (Cyan)",
  "portfolio": "💎 Primary (Cyan)",
  "streaming": "🔥 Accent (Orange/Fire)",
  "security": "💙 Secondary (Vert/Bleu)",
  "tool": "💎 Primary (Cyan)"
};

Object.entries(colorMap).forEach(([type, color]) => {
  console.log(`  ${type.toUpperCase().padEnd(12)} → ${color}`);
});

console.log("\n");
console.log("════════════════════════════════════════════════════════════════════════════════");
console.log("\n🔗 BOUTONS D'ACCÈS:\n");

console.log("  [🐙 Code]  → Lien GitHub du repository");
console.log("  [📤 Demo]  → Démonstration interactive / Deploy");
console.log("  [🌐 Site] → Site web LIVE en production (NEW!)");

console.log("\n");
console.log("════════════════════════════════════════════════════════════════════════════════");
console.log("\n✨ ICÔNES VISIBLES:\n");

const iconsMap = {
  "🍽️ Utensils": "Restaurant",
  "📦 Truck": "Livraison",
  "🗳️ Vote": "Vote électronique",
  "👤 User": "Portfolio",
  "🎬 RadioTower": "Streaming",
  "🔒 Lock": "Sécurité",
  "🛠️ Zap": "Outils génériques",
  "🌐 Globe": "Site web (nouveau)"
};

Object.entries(iconsMap).forEach(([icon, desc]) => {
  console.log(`  ${icon.padEnd(20)} - ${desc}`);
});

console.log("\n");
console.log("════════════════════════════════════════════════════════════════════════════════");
console.log("\n📋 CONFIGURATION:\n");

console.log("  1. Icônes adaptées  ✅");
console.log("  2. Badges de type   ✅");
console.log("  3. URLs intégrés    ✅");
console.log("  4. Responsive       ✅");
console.log("  5. Config centralisée ✅");

console.log("\n");
console.log("════════════════════════════════════════════════════════════════════════════════");
console.log("\n🚀 PROCHAINES ÉTAPES:\n");

console.log("  1. Configurer les URLs dans src/config/projectsUrls.ts");
console.log("  2. Lancer: npm run dev");
console.log("  3. Tester dans le navigateur");
console.log("  4. Déployer vos sites web");
console.log("  5. Mettre à jour les URLs");

console.log("\n");
console.log("════════════════════════════════════════════════════════════════════════════════");
console.log("\n✅ Toutes les améliorations sont prêtes !\n");
