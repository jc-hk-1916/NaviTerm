# Guide de Démarrage Rapide

**[Autres langues](README.md)** | 🇫🇷 Français

Commencez avec NaviTerm AutoTask en 5 minutes !

---

## Étape 1 : Ajoutez Votre Premier Abonnement

### Option A : Suite Complète (Recommandé)

1. Ouvrez l'application **NaviTerm**
2. Naviguez vers **AutoTask** → **Abonnements**
3. Appuyez sur **Ajouter un Abonnement** (bouton +)
4. Remplissez le formulaire :
   - **Nom** : `Suite d'Automatisation Complète`
   - **URL** :
     ```
     https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/complete-suite.json
     ```
   - **Mise à Jour Automatique** : `0 6 * * *` (Quotidien à 6h00)
5. Appuyez sur **Ajouter**

✅ Terminé ! Vous avez maintenant 11 scripts d'exemple prêts à l'emploi.

---

## Étape 2 : Configurez Votre Premier Script

### Exemple : Vérification de la Santé du Serveur

1. Allez dans **AutoTask** → **Scripts**
2. Trouvez **Server Health Check**
3. Modifiez les seuils en haut :
   ```javascript
   const CPU_THRESHOLD = 80;      // Alerte quand CPU > 80%
   const MEMORY_THRESHOLD = 85;   // Alerte quand Mémoire > 85%
   const DISK_THRESHOLD = 90;     // Alerte quand Disque > 90%
   ```
4. Enregistrez le script

---

## Expressions Cron Courantes

| Expression | Signification |
|------------|---------------|
| `*/5 * * * *` | Toutes les 5 minutes |
| `0 * * * *` | Toutes les heures |
| `0 */6 * * *` | Toutes les 6 heures |
| `0 8 * * *` | Quotidien à 8h00 |
| `0 0 * * 0` | Hebdomadaire le dimanche |

---

## API Principales

```javascript
// SSH
$ssh.exec(hostId, command, callback)
$ssh.getHosts(callback)

// HTTP
$httpClient.get(url, callback)
$httpClient.post(options, callback)

// Notifications
$notification.post(title, subtitle, body)

// Stockage
$persistentStore.write(value, key)
$persistentStore.read(key)

// Terminer
$done(result)
```

---

## URLs d'Abonnement

**Suite Complète :**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/complete-suite.json
```

**Surveillance SSH :**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/ssh-monitoring-simple.conf
```

**Surveillance API :**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/api-monitoring-simple.conf
```

---

**Bonne Automatisation ! 🚀**
