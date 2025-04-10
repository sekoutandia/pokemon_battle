# 🧹 Pokémon Battle

**Pokémon Battle** est une application web développée en **Vue.js** qui permet aux utilisateurs de naviguer dans un Pokédex complet, de consulter les statistiques des Pokémon, de créer leurs propres équipes et de les utiliser dans des combats virtuels.

## 🚀 Fonctionnalités

- 🔍 **Pokedex complet** : Recherche et consultation de tous les Pokémon avec leurs types, statistiques et visuels.
- 🛠️ **Création d’équipes** : Sélectionne jusqu’à 6 Pokémon pour constituer ta team personnalisée.
- ⚔️ **Système de combat** : Affronte d'autres équipes dans un simulateur de combat Pokémon.
- 📂 **Sauvegarde locale** : Tes équipes sont stockées dans le localStorage de ton navigateur.

## 🛠️ Technologies utilisées

- [Vue.js](https://vuejs.org/) — Framework principal
- [TypeScript](https://www.typescriptlang.org/) — Pour une meilleure structure du code
- [Vue Router](https://router.vuejs.org/) — Pour la navigation entre les pages
- [Pinia](https://pinia.vuejs.org/) — Gestion d'état
- [PokéAPI](https://pokeapi.co/) — API utilisée pour récupérer les données des Pokémon

## 📆 Installation

```bash
# Clone le repo
git clone https://github.com/sekoutandia/pokemon_battle.git

# Accède au dossier
cd pokemon_battle

# Installe les dépendances
npm install

# Lance l'application en mode développement
npm run dev
```

## 🖥️ Utilisation

Une fois l'application lancée :
1. Accède au Pokédex pour parcourir ou rechercher un Pokémon.
2. Clique sur un Pokémon pour voir ses détails.
3. Ajoute les Pokémon à ton équipe.
4. Une fois ton équipe prête, passe à la section combat pour tester ta stratégie.

## 📁 Structure du projet

```
pokemon_battle/
├── src/
│   ├── assets/
│   ├── components/
│   ├── views/
│   ├── store/
│   ├── router/
│   └── App.vue
├── public/
├── package.json
└── vite.config.ts
```

## 🥪 À venir

- Mode multijoueur local ou en ligne
- Enregistrement de plusieurs équipes
- IA pour les combats
- Système de niveaux et d’expérience

## 👨‍💻 Auteur

- **Sekou Tandia** – [GitHub](https://github.com/sekoutandia)
