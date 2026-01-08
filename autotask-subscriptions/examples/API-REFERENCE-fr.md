# Référence API NaviTerm AutoTask

**[Autres langues](README.md)** | 🇫🇷 Français

Référence complète de toutes les API JavaScript disponibles dans NaviTerm AutoTask.

---

## Table des Matières

- [Opérations SSH](#opérations-ssh)
- [Client HTTP](#client-http)
- [Notifications](#notifications)
- [Stockage Persistant](#stockage-persistant)
- [Variables d'Exécution](#variables-dexécution)
- [Préférences](#préférences)
- [Variables d'Environnement](#variables-denvironnement)
- [Environnement Système](#environnement-système)
- [Utilitaires de Date](#utilitaires-de-date)
- [Journalisation](#journalisation)
- [Contrôle de Script](#contrôle-de-script)

---

## Opérations SSH

### `$ssh.exec(hostId, command, callback)`

Exécuter une commande SSH sur un hôte distant.

**Paramètres:**
- `hostId` (string): ID de l'hôte depuis les hôtes configurés
- `command` (string): Commande shell à exécuter
- `callback` (function): Fonction de rappel avec résultat

**Signature du callback:**
```javascript
(result) => {
    // result.success (boolean): Statut d'exécution de la commande
    // result.output (string): Sortie de la commande
    // result.exitCode (number): Code de sortie
    // result.error (string): Message d'erreur (si échec)
}
```

**Exemple:**
```javascript
$ssh.exec('host-123', 'uptime', (result) => {
    if (result.success) {
        console.log('Temps de fonctionnement:', result.output);
    } else {
        console.error('Erreur:', result.error);
    }
});
```

### `$ssh.getHosts(callback)`

Obtenir tous les hôtes SSH configurés.

**Paramètres:**
- `callback` (function): Fonction de rappel avec tableau d'hôtes

**Signature du callback:**
```javascript
(hosts) => {
    // hosts est un tableau d'objets hôte:
    // - id (string): ID de l'hôte
    // - name (string): Nom de l'hôte
    // - host (string): Nom d'hôte ou IP
    // - port (number): Port SSH
    // - username (string): Nom d'utilisateur SSH
    // - group (string): Groupe d'hôte (optionnel)
}
```

**Exemple:**
```javascript
$ssh.getHosts((hosts) => {
    console.log(`Trouvé ${hosts.length} hôtes`);
    hosts.forEach(host => {
        console.log(`- ${host.name} (${host.host})`);
    });
});
```

### `$ssh.connect(hostId, callback)`

Établir une connexion SSH à un hôte.

**Paramètres:**
- `hostId` (string): ID de l'hôte
- `callback` (function): Rappel avec résultat de connexion

**Exemple:**
```javascript
$ssh.connect('host-123', (success, error) => {
    if (success) {
        console.log('Connecté avec succès');
    } else {
        console.error('Échec de connexion:', error);
    }
});
```

### `$ssh.disconnect(hostId)`

Se déconnecter de l'hôte SSH.

**Paramètres:**
- `hostId` (string): ID de l'hôte

**Exemple:**
```javascript
$ssh.disconnect('host-123');
```

### `$ssh.isConnected(hostId)`

Vérifier si connecté à un hôte.

**Paramètres:**
- `hostId` (string): ID de l'hôte

**Retourne:** `boolean`

**Exemple:**
```javascript
if ($ssh.isConnected('host-123')) {
    console.log('Déjà connecté');
}
```

---

## Client HTTP

### `$httpClient.get(urlOrOptions, callback)`

Envoyer une requête HTTP GET.

**Paramètres:**
- `urlOrOptions` (string | object): Chaîne URL ou objet d'options
- `callback` (function): Rappel avec réponse

**Objet d'options:**
```javascript
{
    url: 'https://api.example.com/data',
    headers: {
        'Authorization': 'Bearer token',
        'Content-Type': 'application/json'
    }
}
```

**Signature du callback:**
```javascript
(error, response, body) => {
    // error (string): Message d'erreur (null si succès)
    // response (object): Objet de réponse avec status et headers
    // body (string): Corps de la réponse
}
```

**Exemple:**
```javascript
$httpClient.get('https://api.example.com/data', (error, response, body) => {
    if (error) {
        console.error('Échec de la requête:', error);
        return;
    }
    console.log('Statut:', response.status);
    console.log('Corps:', body);
});
```

### `$httpClient.post(urlOrOptions, callback)`

Envoyer une requête HTTP POST.

**Exemple:**
```javascript
$httpClient.post({
    url: 'https://api.example.com/data',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ key: 'value' })
}, (error, response, body) => {
    if (!error && response.status === 200) {
        console.log('Succès:', body);
    }
});
```

### `$httpClient.put(urlOrOptions, callback)`

Envoyer une requête HTTP PUT. Même signature que POST.

### `$httpClient.delete(urlOrOptions, callback)`

Envoyer une requête HTTP DELETE. Même signature que GET.

### `$httpClient.head(urlOrOptions, callback)`

Envoyer une requête HTTP HEAD. Même signature que GET.

### `$httpClient.patch(urlOrOptions, callback)`

Envoyer une requête HTTP PATCH. Même signature que POST.

### `$task.fetch(options)`

Client HTTP basé sur les Promises.

**Paramètres:**
- `options` (object): Options de requête

**Options:**
```javascript
{
    url: 'https://api.example.com/data',
    method: 'GET',  // GET, POST, PUT, DELETE, etc.
    headers: {
        'Authorization': 'Bearer token'
    },
    body: 'corps de requête'
}
```

**Retourne:** Promise avec objet de réponse

**Objet de réponse:**
```javascript
{
    status: 200,
    headers: { ... },
    body: 'corps de réponse'
}
```

**Exemple:**
```javascript
$task.fetch({
    url: 'https://api.example.com/data',
    method: 'GET'
})
.then(response => {
    console.log('Statut:', response.status);
    console.log('Corps:', response.body);
})
.catch(error => {
    console.error('Erreur:', error.error);
});
```

---

## Notifications

### `$notification.post(title, subtitle, body, options)`

Envoyer une notification système.

**Paramètres:**
- `title` (string): Titre de la notification
- `subtitle` (string): Sous-titre de la notification
- `body` (string): Corps de la notification
- `options` (object): Paramètres optionnels

**Options:**
```javascript
{
    url: 'https://example.com',  // URL à ouvrir au clic
    'open-url': 'https://example.com'  // Clé alternative
}
```

**Exemple:**
```javascript
$notification.post(
    'Alerte Serveur',
    'Utilisation CPU Élevée',
    'L\'utilisation CPU est à 95%',
    { url: 'https://monitoring.example.com' }
);
```

### `$notify(title, subtitle, body, options)`

API de notification alternative. Même signature que `$notification.post`.

---

## Stockage Persistant

### `$persistentStore.write(value, key)`

Sauvegarder des données de manière permanente.

**Paramètres:**
- `value` (string): Valeur à sauvegarder
- `key` (string): Clé de stockage

**Retourne:** `boolean` (statut de succès)

**Exemple:**
```javascript
const data = JSON.stringify({ count: 42 });
$persistentStore.write(data, 'my-data');
```

### `$persistentStore.read(key)`

Lire les données sauvegardées.

**Paramètres:**
- `key` (string): Clé de stockage

**Retourne:** `string | null`

**Exemple:**
```javascript
const data = $persistentStore.read('my-data');
if (data) {
    const obj = JSON.parse(data);
    console.log('Compteur:', obj.count);
}
```

### `$persistentStore.allKeys()`

Obtenir toutes les clés de stockage.

**Retourne:** Tableau de chaînes

**Exemple:**
```javascript
const keys = $persistentStore.allKeys();
console.log('Clés stockées:', keys);
```

### `$persistentStore.remove(key)`

Supprimer une clé du stockage.

**Paramètres:**
- `key` (string): Clé de stockage

**Retourne:** `boolean`

**Exemple:**
```javascript
$persistentStore.remove('my-data');
```

### `$persistentStore.clear()`

Effacer toutes les données stockées.

**Exemple:**
```javascript
$persistentStore.clear();
```

---

## Variables d'Exécution

Variables temporaires qui existent uniquement pendant l'exécution du script.

### `$variables.set(key, value)`

Définir une variable d'exécution.

**Paramètres:**
- `key` (string): Nom de la variable
- `value` (string): Valeur de la variable

**Retourne:** `boolean`

**Exemple:**
```javascript
$variables.set('counter', '10');
```

### `$variables.get(key)`

Obtenir une variable d'exécution.

**Paramètres:**
- `key` (string): Nom de la variable

**Retourne:** `string | null`

**Exemple:**
```javascript
const counter = $variables.get('counter');
console.log('Compteur:', counter);
```

### `$variables.has(key)`

Vérifier si la variable existe.

**Paramètres:**
- `key` (string): Nom de la variable

**Retourne:** `boolean`

**Exemple:**
```javascript
if ($variables.has('counter')) {
    console.log('Le compteur existe');
}
```

### `$variables.allKeys()`

Obtenir tous les noms de variables.

**Retourne:** Tableau de chaînes

### `$variables.remove(key)`

Supprimer une variable.

**Paramètres:**
- `key` (string): Nom de la variable

**Retourne:** `boolean`

### `$variables.clear()`

Effacer toutes les variables.

---

## Préférences

Similaire au stockage persistant mais conçu pour les préférences utilisateur.

### `$prefs.setValueForKey(value, key)`

Définir une valeur de préférence.

**Paramètres:**
- `value` (string): Valeur de préférence
- `key` (string): Clé de préférence

**Retourne:** `boolean`

### `$prefs.valueForKey(key)`

Obtenir une valeur de préférence.

**Paramètres:**
- `key` (string): Clé de préférence

**Retourne:** `string | null`

### `$prefs.removeValueForKey(key)`

Supprimer une préférence.

**Paramètres:**
- `key` (string): Clé de préférence

**Retourne:** `boolean`

### `$prefs.removeAllValues()`

Effacer toutes les préférences.

---

## Variables d'Environnement

### `$env.get(key, defaultValue)`

Obtenir une variable d'environnement.

**Paramètres:**
- `key` (string): Nom de la variable
- `defaultValue` (string): Valeur par défaut si non trouvée

**Retourne:** `string | null`

**Exemple:**
```javascript
const apiKey = $env.get('API_KEY', 'default-key');
```

### `$env.set(key, value)`

Définir une variable d'environnement.

**Paramètres:**
- `key` (string): Nom de la variable
- `value` (string): Valeur de la variable

**Retourne:** `boolean`

### `$env.remove(key)`

Supprimer une variable d'environnement.

**Paramètres:**
- `key` (string): Nom de la variable

**Retourne:** `boolean`

### `$env.allKeys()`

Obtenir tous les noms de variables d'environnement.

**Retourne:** Tableau de chaînes

### `$env.all()`

Obtenir toutes les variables d'environnement comme objet.

**Retourne:** Objet avec paires clé-valeur

**Exemple:**
```javascript
const allEnv = $env.all();
console.log('Environnement:', allEnv);
```

---

## Environnement Système

### `$environment`

Objet en lecture seule avec informations système.

**Propriétés:**
- `system` (string): "iOS" ou "macOS"
- `version` (string): Version de l'application
- `language` (string): Code de langue du système
- `deviceName` (string): Nom de l'appareil

**Exemple:**
```javascript
console.log('Système:', $environment.system);
console.log('Version:', $environment.version);
console.log('Langue:', $environment.language);
console.log('Appareil:', $environment.deviceName);
```

---

## Utilitaires de Date

### `$date.now()`

Obtenir la date/heure actuelle avec millisecondes.

**Retourne:** Chaîne au format "YYYY-MM-DD HH:mm:ss.SSS"

**Exemple:**
```javascript
const now = $date.now();
console.log('Maintenant:', now);  // "2024-01-15 14:30:45.123"
```

### `$date.nowSimple()`

Obtenir la date/heure actuelle sans millisecondes.

**Retourne:** Chaîne au format "YYYY-MM-DD HH:mm:ss"

**Exemple:**
```javascript
const now = $date.nowSimple();
console.log('Maintenant:', now);  // "2024-01-15 14:30:45"
```

### `$date.format(formatString)`

Formater la date/heure actuelle avec format personnalisé.

**Paramètres:**
- `formatString` (string): Chaîne de format de date (optionnel, par défaut: "yyyy-MM-dd HH:mm:ss")

**Retourne:** Chaîne de date formatée

**Exemple:**
```javascript
const date = $date.format('yyyy-MM-dd');
console.log('Date:', date);  // "2024-01-15"

const time = $date.format('HH:mm:ss');
console.log('Heure:', time);  // "14:30:45"
```

### `$date.timestamp()`

Obtenir l'horodatage actuel en millisecondes.

**Retourne:** Number (millisecondes depuis epoch)

**Exemple:**
```javascript
const ts = $date.timestamp();
console.log('Horodatage:', ts);  // 1705329045123
```

---

## Journalisation

### `console.log(message)`

Enregistrer un message normal.

**Paramètres:**
- `message` (string): Message de journal

**Exemple:**
```javascript
console.log('[Info] Script démarré');
```

### `console.warn(message)`

Enregistrer un message d'avertissement.

**Paramètres:**
- `message` (string): Message d'avertissement

**Exemple:**
```javascript
console.warn('[Avertissement] Utilisation CPU élevée détectée');
```

### `console.error(message)`

Enregistrer un message d'erreur.

**Paramètres:**
- `message` (string): Message d'erreur

**Exemple:**
```javascript
console.error('[Erreur] Échec de connexion');
```

---

## Contrôle de Script

### `$done(result)`

Terminer l'exécution du script et retourner le résultat.

**Paramètres:**
- `result` (string): Données de résultat (généralement chaîne JSON)

**Exemple:**
```javascript
$done(JSON.stringify({
    success: true,
    data: { count: 42 }
}));
```

**Important:** Appelez toujours `$done()` à la fin de votre script, surtout pour les opérations asynchrones.

---

## Meilleures Pratiques

### 1. Gestion des Erreurs

Gérez toujours les erreurs dans les callbacks:

```javascript
$ssh.exec(hostId, command, (result) => {
    if (!result.success) {
        console.error('Échec de commande:', result.error);
        $notification.post('Erreur', result.error, '');
        $done(JSON.stringify({ error: result.error }));
        return;
    }
    // Traiter le cas de succès
});
```

### 2. Opérations Asynchrones

Suivez les opérations asynchrones pour assurer que `$done()` est appelé correctement:

```javascript
let completed = 0;
const total = hosts.length;

hosts.forEach(host => {
    checkHost(host, (result) => {
        completed++;
        if (completed === total) {
            $done(JSON.stringify({ results }));
        }
    });
});
```

### 3. Journalisation

Utilisez une journalisation structurée avec préfixes:

```javascript
console.log('[Vérification Santé] Démarrage...');
console.warn('[Vérification Santé] CPU Élevé: 95%');
console.error('[Vérification Santé] Échec de connexion');
```

---

## Exemples

### Script SSH Complet

```javascript
console.log('[Vérification Disque] Démarrage...');

$ssh.getHosts((hosts) => {
    if (hosts.length === 0) {
        console.error('[Vérification Disque] Aucun hôte configuré');
        $done(JSON.stringify({ error: 'Aucun hôte' }));
        return;
    }

    let results = [];
    let completed = 0;

    hosts.forEach(host => {
        $ssh.exec(host.id, "df -h / | tail -1 | awk '{print $5}'", (result) => {
            if (result.success) {
                const usage = parseInt(result.output.trim());
                results.push({ host: host.name, usage });

                if (usage > 90) {
                    $notification.post(
                        'Alerte Disque',
                        host.name,
                        `Utilisation disque: ${usage}%`
                    );
                }
            }

            completed++;
            if (completed === hosts.length) {
                $done(JSON.stringify({ results }));
            }
        });
    });
});
```

### Script HTTP Complet

```javascript
console.log('[Vérification API] Démarrage...');

const endpoints = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://httpbin.org/status/200'
];

let results = [];
let completed = 0;

endpoints.forEach(url => {
    const startTime = $date.timestamp();

    $httpClient.get(url, (error, response, body) => {
        const endTime = $date.timestamp();
        const responseTime = endTime - startTime;

        results.push({
            url,
            healthy: !error && response.status === 200,
            responseTime
        });

        completed++;
        if (completed === endpoints.length) {
            const unhealthy = results.filter(r => !r.healthy);
            if (unhealthy.length > 0) {
                $notification.post(
                    'Alerte API',
                    `${unhealthy.length} point(s) de terminaison en panne`,
                    ''
                );
            }
            $done(JSON.stringify({ results }));
        }
    });
});
```

---

## Besoin d'Aide?

- **Démarrage Rapide**: [QUICK-START-fr.md](QUICK-START-fr.md)
- **GitHub**: https://github.com/jc-hk-1916/NaviTerm

---

**Bon Codage! 🚀**
