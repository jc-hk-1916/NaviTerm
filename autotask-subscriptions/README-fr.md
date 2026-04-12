# Scripts NaviTerm AutoTask

**[🇫🇷 Français](README-fr.md) | [🇺🇸 English](README.md) | [🇨🇳 中文](README-zh.md) | [🇪🇸 Español](README-es.md) | [🇩🇪 Deutsch](README-de.md) | [🇯🇵 日本語](README-ja.md) | [🇷🇺 Русский](README-ru.md)**

---

**Dépôt officiel de scripts d'automatisation pour NaviTerm**

Une collection complète de scripts d'automatisation pour la surveillance des serveurs, les vérifications de santé des API et les tâches de maintenance système. Propulsé par le moteur AutoTask de NaviTerm avec support pour les flux de travail SSH, HTTP et hybrides.

## 🚀 Démarrage Rapide

### S'abonner en 3 Étapes

1. Ouvrez l'application **NaviTerm**
2. Naviguez vers **AutoTask** → **Abonnements**
3. Ajoutez un abonnement avec l'une des URLs ci-dessous

## 💬 Rejoignez Notre Communauté

- 📢 [Canal Telegram](https://t.me/NavitermNews) - Recevez les dernières mises à jour, les sorties de fonctionnalités et les annonces importantes
- 💬 [Groupe de Discussion Telegram](https://t.me/NaviTermCommunity) - Connectez-vous avec d'autres utilisateurs, partagez des astuces et échangez des expériences

## 📋 Abonnements Disponibles

### Suite de Surveillance SSH
Surveillez vos serveurs avec des vérifications de santé complètes.

**Format de Configuration Standard:**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/ssh-monitoring.conf
```

**Format Cron Simple:**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/ssh-monitoring-simple.conf
```

**Format Cron Étendu:**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/ssh-monitoring-extended.conf
```

### Suite de Surveillance API
Surveillez vos APIs et services web.

**Format de Configuration Standard:**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/api-monitoring.conf
```

**Format Cron Simple:**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/api-monitoring-simple.conf
```

### Suite Complète (Recommandé)
Tous les scripts en un seul abonnement (format JSON).

```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/complete-suite.json
```

## 📦 Contenu

Ce dépôt fournit 13 scripts d'exemple démontrant les capacités complètes de NaviTerm AutoTask:

### Scripts SSH (8 exemples)

**🔍 Surveillance (5 scripts)**
- **Vérification de Santé du Serveur** (`scripts/ssh/monitoring/server-health-check.js`)
  - Surveillance complète du CPU, de la mémoire et du disque
  - Seuils d'alerte configurables
  - Notifications automatiques

- **Alerte d'Espace Disque** (`scripts/ssh/monitoring/disk-alert.js`)
  - Surveillance de l'utilisation du disque
  - Alertes de seuil configurables
  - Support multi-hôte

- **Moniteur de Mémoire** (`scripts/ssh/monitoring/memory-monitor.js`)
  - Surveillance de l'utilisation de la mémoire en temps réel
  - Seuils d'alerte configurables
  - Suivi des données historiques

- **Moniteur de Processus** (`scripts/ssh/monitoring/process-monitor.js`)
  - Surveiller l'état des processus critiques
  - Alertes automatiques lorsque les processus s'arrêtent
  - Liste de processus personnalisable

- **Suivi des Données Historiques** (`scripts/ssh/monitoring/historical-data-tracker.js`)
  - Suivre les métriques du serveur en utilisant le stockage persistant
  - Enregistrer les données historiques de charge
  - Calculer les statistiques (moyenne, maximum, minimum)
  - Nettoyage automatique des anciennes données

**📊 Informations Système (1 script)**
- **Informations Système** (`scripts/ssh/system/system-info.js`)
  - Collecter des informations système complètes
  - OS, noyau, CPU, mémoire, etc.
  - Générer des rapports système périodiques

**🌐 Vérification Réseau (2 scripts)**
- **Vérification de Connectivité Réseau** (`scripts/ssh/network/connectivity-check.js`)
  - Test ping de plusieurs cibles
  - Alertes automatiques de défaillance réseau
  - Surveillance de la qualité de connexion

- **Test de Connexion SSH** (`scripts/ssh/network/ssh-connection-test.js`)
  - Tester toutes les connexions d'hôtes SSH configurés
  - Vérifier la capacité d'exécution des commandes
  - Alertes automatiques pour les connexions échouées
  - Générer des rapports de test de connexion

### Scripts HTTP (4 exemples)

**📡 Surveillance API (2 scripts)**
- **Vérification de Santé API** (`scripts/http/api-monitoring/api-health-check.js`)
  - Surveiller plusieurs endpoints API (utilisant des APIs réelles)
  - API JSONPlaceholder (https://jsonplaceholder.typicode.com)
  - HTTPBin (https://httpbin.org)
  - API GitHub (https://api.github.com)
  - Example.com (https://example.com)
  - Mesure du temps de réponse
  - Détection automatique des défaillances et notifications

- **Moniteur de Temps de Réponse API** (`scripts/http/api-monitoring/response-time-monitor.js`)
  - Mesurer les temps de réponse API
  - Analyse des tendances du temps de réponse
  - Alertes automatiques de réponse lente
  - Stockage des données historiques

**📥 Collection de Données (1 script)**
- **Collecteur de Données** (`scripts/http/data-collection/data-collector.js`)
  - Collecter des données de plusieurs APIs
  - Stockage automatique des données
  - Alertes d'échec de collecte
  - Support d'analyse de données JSON

**🔗 Intégration Tierce (1 script)**
- **Intégration Webhook** (`scripts/http/integrations/webhook-integration.js`)
  - Intégration webhook générique
  - Supporte Slack, Discord, DingTalk, etc.
  - Rapports d'état automatiques
  - Format de message configurable

### Scripts Hybrides (1 exemple)

**🔄 Combinaison SSH + HTTP**
- **Rapport d'État du Serveur** (`scripts/hybrid/server-status-report.js`)
  - Collecter les métriques du serveur via SSH
  - Rapporter à la plateforme de surveillance via HTTP
  - Utilise httpbin.org pour les tests
  - Endpoint de rapport configurable

## ✅ APIs Réelles Fonctionnelles

Tous les scripts d'exemple utilisent des APIs publiques réelles:

| API | Objectif | URL |
|-----|----------|-----|
| JSONPlaceholder | API REST factice gratuite | https://jsonplaceholder.typicode.com |
| HTTPBin | Tests de requêtes HTTP | https://httpbin.org |
| API GitHub | API publique | https://api.github.com |
| Example.com | Domaine de test | https://example.com |

## 📖 Documentation

Documentation complète disponible en plusieurs langues:

| Langue | Démarrage Rapide | Référence API |
|--------|------------------|---------------|
| 🇺🇸 English | [Quick Start](examples/QUICK-START.md) | [API Reference](examples/API-REFERENCE.md) |
| 🇨🇳 中文 | [快速开始](examples/QUICK-START-zh.md) | [API参考](examples/API-REFERENCE-zh.md) |

## 🤝 Contribuer

Nous accueillons les contributions de la communauté! Vous pouvez participer de les manières suivantes:

- 📝 **Soumettre de Nouveaux Scripts** - Partagez vos scripts d'automatisation
- 🔧 **Améliorer les Scripts Existants** - Corriger les bugs ou optimiser les fonctionnalités
- 🎨 **Ajouter des Icônes** - Concevoir de meilleures icônes
- 🌐 **Traduire la Documentation** - Supporter plus de langues

### Comment Contribuer

1. Forkez ce dépôt
2. Créez votre branche de fonctionnalité: `git checkout -b feature/amazing-script`
3. Validez vos modifications: `git commit -m 'feat: add amazing script'`
4. Poussez vers la branche: `git push origin feature/amazing-script`
5. Soumettez une Pull Request

**Guide Détaillé:** [CONTRIBUTING.md](CONTRIBUTING.md)

### Exigences de Qualité des Scripts

- ✅ Utiliser des APIs réelles et fonctionnelles (éviter les APIs d'exemple)
- ✅ Inclure la gestion des erreurs et la journalisation
- ✅ Fournir des commentaires détaillés
- ✅ Suivre le style de code existant
- ✅ Tester les scripts pour s'assurer qu'ils fonctionnent

### Signalement de Problèmes

Vous avez trouvé un problème? Veuillez le signaler dans GitHub Issues:

- 💬 Discussions: [GitHub Discussions](https://github.com/jc-hk-1916/NaviTerm/discussions)
- 🐛 Problèmes: [GitHub Issues](https://github.com/jc-hk-1916/NaviTerm/issues)

---

**Fait avec ❤️ par l'Équipe NaviTerm**
