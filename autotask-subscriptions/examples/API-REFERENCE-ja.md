# NaviTerm AutoTask APIリファレンス

**[他の言語](README.md)** | 🇯🇵 日本語

NaviTerm AutoTaskで利用可能なすべてのJavaScript APIの完全なリファレンス。

---

## 目次

- [SSH操作](#ssh操作)
- [HTTPクライアント](#httpクライアント)
- [通知](#通知)
- [永続ストレージ](#永続ストレージ)
- [ランタイム変数](#ランタイム変数)
- [環境設定](#環境設定)
- [環境変数](#環境変数)
- [システム環境](#システム環境)
- [日付ユーティリティ](#日付ユーティリティ)
- [ログ記録](#ログ記録)
- [スクリプト制御](#スクリプト制御)

---

## SSH操作

### `$ssh.exec(hostId, command, callback)`

リモートホストでSSHコマンドを実行します。

**パラメータ:**
- `hostId` (string): 設定済みホストのホストID
- `command` (string): 実行するシェルコマンド
- `callback` (function): 結果を受け取るコールバック関数

**コールバックシグネチャ:**
```javascript
(result) => {
    // result.success (boolean): コマンド実行ステータス
    // result.output (string): コマンド出力
    // result.exitCode (number): 終了コード
    // result.error (string): エラーメッセージ(失敗時)
}
```

**例:**
```javascript
$ssh.exec('host-123', 'uptime', (result) => {
    if (result.success) {
        console.log('稼働時間:', result.output);
    } else {
        console.error('エラー:', result.error);
    }
});
```

### `$ssh.getHosts(callback)`

設定済みのすべてのSSHホストを取得します。

**パラメータ:**
- `callback` (function): ホスト配列を受け取るコールバック関数

**コールバックシグネチャ:**
```javascript
(hosts) => {
    // hostsはホストオブジェクトの配列:
    // - id (string): ホストID
    // - name (string): ホスト名
    // - host (string): ホスト名またはIP
    // - port (number): SSHポート
    // - username (string): SSHユーザー名
    // - group (string): ホストグループ(オプション)
}
```

**例:**
```javascript
$ssh.getHosts((hosts) => {
    console.log(`${hosts.length}個のホストが見つかりました`);
    hosts.forEach(host => {
        console.log(`- ${host.name} (${host.host})`);
    });
});
```

### `$ssh.connect(hostId, callback)`

ホストへのSSH接続を確立します。

**パラメータ:**
- `hostId` (string): ホストID
- `callback` (function): 接続結果を受け取るコールバック

**例:**
```javascript
$ssh.connect('host-123', (success, error) => {
    if (success) {
        console.log('接続に成功しました');
    } else {
        console.error('接続に失敗しました:', error);
    }
});
```

### `$ssh.disconnect(hostId)`

SSHホストから切断します。

**パラメータ:**
- `hostId` (string): ホストID

**例:**
```javascript
$ssh.disconnect('host-123');
```

### `$ssh.isConnected(hostId)`

ホストに接続されているか確認します。

**パラメータ:**
- `hostId` (string): ホストID

**戻り値:** `boolean`

**例:**
```javascript
if ($ssh.isConnected('host-123')) {
    console.log('既に接続されています');
}
```

---

## HTTPクライアント

### `$httpClient.get(urlOrOptions, callback)`

HTTP GETリクエストを送信します。

**パラメータ:**
- `urlOrOptions` (string | object): URL文字列またはオプションオブジェクト
- `callback` (function): レスポンスを受け取るコールバック

**オプションオブジェクト:**
```javascript
{
    url: 'https://api.example.com/data',
    headers: {
        'Authorization': 'Bearer token',
        'Content-Type': 'application/json'
    }
}
```

**コールバックシグネチャ:**
```javascript
(error, response, body) => {
    // error (string): エラーメッセージ(成功時はnull)
    // response (object): ステータスとヘッダーを含むレスポンスオブジェクト
    // body (string): レスポンスボディ
}
```

**例:**
```javascript
$httpClient.get('https://api.example.com/data', (error, response, body) => {
    if (error) {
        console.error('リクエストに失敗しました:', error);
        return;
    }
    console.log('ステータス:', response.status);
    console.log('ボディ:', body);
});
```

### `$httpClient.post(urlOrOptions, callback)`

HTTP POSTリクエストを送信します。

**例:**
```javascript
$httpClient.post({
    url: 'https://api.example.com/data',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ key: 'value' })
}, (error, response, body) => {
    if (!error && response.status === 200) {
        console.log('成功:', body);
    }
});
```

### `$httpClient.put(urlOrOptions, callback)`

HTTP PUTリクエストを送信します。POSTと同じシグネチャです。

### `$httpClient.delete(urlOrOptions, callback)`

HTTP DELETEリクエストを送信します。GETと同じシグネチャです。

### `$httpClient.head(urlOrOptions, callback)`

HTTP HEADリクエストを送信します。GETと同じシグネチャです。

### `$httpClient.patch(urlOrOptions, callback)`

HTTP PATCHリクエストを送信します。POSTと同じシグネチャです。

### `$task.fetch(options)`

Promise ベースのHTTPクライアント。

**パラメータ:**
- `options` (object): リクエストオプション

**オプション:**
```javascript
{
    url: 'https://api.example.com/data',
    method: 'GET',  // GET, POST, PUT, DELETE, etc.
    headers: {
        'Authorization': 'Bearer token'
    },
    body: 'リクエストボディ'
}
```

**戻り値:** レスポンスオブジェクトを含むPromise

**レスポンスオブジェクト:**
```javascript
{
    status: 200,
    headers: { ... },
    body: 'レスポンスボディ'
}
```

**例:**
```javascript
$task.fetch({
    url: 'https://api.example.com/data',
    method: 'GET'
})
.then(response => {
    console.log('ステータス:', response.status);
    console.log('ボディ:', response.body);
})
.catch(error => {
    console.error('エラー:', error.error);
});
```

---

## 通知

### `$notification.post(title, subtitle, body, options)`

システム通知を送信します。

**パラメータ:**
- `title` (string): 通知タイトル
- `subtitle` (string): 通知サブタイトル
- `body` (string): 通知本文
- `options` (object): オプション設定

**オプション:**
```javascript
{
    url: 'https://example.com',  // クリック時に開くURL
    'open-url': 'https://example.com'  // 代替キー
}
```

**例:**
```javascript
$notification.post(
    'サーバーアラート',
    'CPU使用率が高い',
    'CPU使用率が95%です',
    { url: 'https://monitoring.example.com' }
);
```

### `$notify(title, subtitle, body, options)`

代替通知API。`$notification.post`と同じシグネチャです。

---

## 永続ストレージ

### `$persistentStore.write(value, key)`

データを永続的に保存します。

**パラメータ:**
- `value` (string): 保存する値
- `key` (string): ストレージキー

**戻り値:** `boolean` (成功ステータス)

**例:**
```javascript
const data = JSON.stringify({ count: 42 });
$persistentStore.write(data, 'my-data');
```

### `$persistentStore.read(key)`

保存されたデータを読み取ります。

**パラメータ:**
- `key` (string): ストレージキー

**戻り値:** `string | null`

**例:**
```javascript
const data = $persistentStore.read('my-data');
if (data) {
    const obj = JSON.parse(data);
    console.log('カウント:', obj.count);
}
```

### `$persistentStore.allKeys()`

すべてのストレージキーを取得します。

**戻り値:** 文字列の配列

**例:**
```javascript
const keys = $persistentStore.allKeys();
console.log('保存されたキー:', keys);
```

### `$persistentStore.remove(key)`

ストレージからキーを削除します。

**パラメータ:**
- `key` (string): ストレージキー

**戻り値:** `boolean`

**例:**
```javascript
$persistentStore.remove('my-data');
```

### `$persistentStore.clear()`

保存されたすべてのデータをクリアします。

**例:**
```javascript
$persistentStore.clear();
```

---

## ランタイム変数

スクリプト実行中のみ存在する一時変数。

### `$variables.set(key, value)`

ランタイム変数を設定します。

**パラメータ:**
- `key` (string): 変数名
- `value` (string): 変数値

**戻り値:** `boolean`

**例:**
```javascript
$variables.set('counter', '10');
```

### `$variables.get(key)`

ランタイム変数を取得します。

**パラメータ:**
- `key` (string): 変数名

**戻り値:** `string | null`

**例:**
```javascript
const counter = $variables.get('counter');
console.log('カウンター:', counter);
```

### `$variables.has(key)`

変数が存在するか確認します。

**パラメータ:**
- `key` (string): 変数名

**戻り値:** `boolean`

**例:**
```javascript
if ($variables.has('counter')) {
    console.log('カウンターが存在します');
}
```

### `$variables.allKeys()`

すべての変数名を取得します。

**戻り値:** 文字列の配列

### `$variables.remove(key)`

変数を削除します。

**パラメータ:**
- `key` (string): 変数名

**戻り値:** `boolean`

### `$variables.clear()`

すべての変数をクリアします。

---

## 環境設定

永続ストレージに似ていますが、ユーザー設定用に設計されています。

### `$prefs.setValueForKey(value, key)`

設定値を設定します。

**パラメータ:**
- `value` (string): 設定値
- `key` (string): 設定キー

**戻り値:** `boolean`

### `$prefs.valueForKey(key)`

設定値を取得します。

**パラメータ:**
- `key` (string): 設定キー

**戻り値:** `string | null`

### `$prefs.removeValueForKey(key)`

設定を削除します。

**パラメータ:**
- `key` (string): 設定キー

**戻り値:** `boolean`

### `$prefs.removeAllValues()`

すべての設定をクリアします。

---

## 環境変数

### `$env.get(key, defaultValue)`

環境変数を取得します。

**パラメータ:**
- `key` (string): 変数名
- `defaultValue` (string): 見つからない場合のデフォルト値

**戻り値:** `string | null`

**例:**
```javascript
const apiKey = $env.get('API_KEY', 'default-key');
```

### `$env.set(key, value)`

環境変数を設定します。

**パラメータ:**
- `key` (string): 変数名
- `value` (string): 変数値

**戻り値:** `boolean`

### `$env.remove(key)`

環境変数を削除します。

**パラメータ:**
- `key` (string): 変数名

**戻り値:** `boolean`

### `$env.allKeys()`

すべての環境変数名を取得します。

**戻り値:** 文字列の配列

### `$env.all()`

すべての環境変数をオブジェクトとして取得します。

**戻り値:** キーと値のペアを含むオブジェクト

**例:**
```javascript
const allEnv = $env.all();
console.log('環境:', allEnv);
```

---

## システム環境

### `$environment`

システム情報を含む読み取り専用オブジェクト。

**プロパティ:**
- `system` (string): "iOS" または "macOS"
- `version` (string): アプリバージョン
- `language` (string): システム言語コード
- `deviceName` (string): デバイス名

**例:**
```javascript
console.log('システム:', $environment.system);
console.log('バージョン:', $environment.version);
console.log('言語:', $environment.language);
console.log('デバイス:', $environment.deviceName);
```

---

## 日付ユーティリティ

### `$date.now()`

ミリ秒付きの現在の日時を取得します。

**戻り値:** "YYYY-MM-DD HH:mm:ss.SSS" 形式の文字列

**例:**
```javascript
const now = $date.now();
console.log('現在:', now);  // "2024-01-15 14:30:45.123"
```

### `$date.nowSimple()`

ミリ秒なしの現在の日時を取得します。

**戻り値:** "YYYY-MM-DD HH:mm:ss" 形式の文字列

**例:**
```javascript
const now = $date.nowSimple();
console.log('現在:', now);  // "2024-01-15 14:30:45"
```

### `$date.format(formatString)`

カスタム形式で現在の日時をフォーマットします。

**パラメータ:**
- `formatString` (string): 日付形式文字列(オプション、デフォルト: "yyyy-MM-dd HH:mm:ss")

**戻り値:** フォーマットされた日付文字列

**例:**
```javascript
const date = $date.format('yyyy-MM-dd');
console.log('日付:', date);  // "2024-01-15"

const time = $date.format('HH:mm:ss');
console.log('時刻:', time);  // "14:30:45"
```

### `$date.timestamp()`

ミリ秒単位の現在のタイムスタンプを取得します。

**戻り値:** Number (エポックからのミリ秒)

**例:**
```javascript
const ts = $date.timestamp();
console.log('タイムスタンプ:', ts);  // 1705329045123
```

---

## ログ記録

### `console.log(message)`

通常のメッセージをログに記録します。

**パラメータ:**
- `message` (string): ログメッセージ

**例:**
```javascript
console.log('[情報] スクリプトを開始しました');
```

### `console.warn(message)`

警告メッセージをログに記録します。

**パラメータ:**
- `message` (string): 警告メッセージ

**例:**
```javascript
console.warn('[警告] 高いCPU使用率を検出しました');
```

### `console.error(message)`

エラーメッセージをログに記録します。

**パラメータ:**
- `message` (string): エラーメッセージ

**例:**
```javascript
console.error('[エラー] 接続に失敗しました');
```

---

## スクリプト制御

### `$done(result)`

スクリプトの実行を終了し、結果を返します。

**パラメータ:**
- `result` (string): 結果データ(通常はJSON文字列)

**例:**
```javascript
$done(JSON.stringify({
    success: true,
    data: { count: 42 }
}));
```

**重要:** 特に非同期操作の場合、スクリプトの最後に必ず`$done()`を呼び出してください。

---

## ベストプラクティス

### 1. エラー処理

コールバックで常にエラーを処理します:

```javascript
$ssh.exec(hostId, command, (result) => {
    if (!result.success) {
        console.error('コマンドに失敗しました:', result.error);
        $notification.post('エラー', result.error, '');
        $done(JSON.stringify({ error: result.error }));
        return;
    }
    // 成功ケースを処理
});
```

### 2. 非同期操作

`$done()`が正しく呼び出されるように非同期操作を追跡します:

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

### 3. ログ記録

プレフィックス付きの構造化ログを使用します:

```javascript
console.log('[ヘルスチェック] 開始中...');
console.warn('[ヘルスチェック] 高いCPU: 95%');
console.error('[ヘルスチェック] 接続に失敗しました');
```

---

## 例

### 完全なSSHスクリプト

```javascript
console.log('[ディスクチェック] 開始中...');

$ssh.getHosts((hosts) => {
    if (hosts.length === 0) {
        console.error('[ディスクチェック] ホストが設定されていません');
        $done(JSON.stringify({ error: 'ホストなし' }));
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
                        'ディスクアラート',
                        host.name,
                        `ディスク使用率: ${usage}%`
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

### 完全なHTTPスクリプト

```javascript
console.log('[APIチェック] 開始中...');

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
                    'APIアラート',
                    `${unhealthy.length}個のエンドポイントがダウンしています`,
                    ''
                );
            }
            $done(JSON.stringify({ results }));
        }
    });
});
```

---

## ヘルプが必要ですか?

- **クイックスタート**: [QUICK-START-ja.md](QUICK-START-ja.md)
- **GitHub**: https://github.com/jc-hk-1916/NaviTerm

---

**コーディングを楽しんでください! 🚀**
