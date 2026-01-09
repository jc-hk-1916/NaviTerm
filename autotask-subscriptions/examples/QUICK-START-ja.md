# クイックスタートガイド

**[他の言語](README.md)** | 🇯🇵 日本語

NaviTerm AutoTaskを5分で始めましょう！

---

## ステップ1：最初のサブスクリプションを追加

### オプションA：完全スイート（推奨）

1. **NaviTerm** アプリを開く
2. **AutoTask** → **サブスクリプション**に移動
3. **サブスクリプションを追加**（+ ボタン）をタップ
4. フォームに入力：
   - **名前**：`完全自動化スイート`
   - **URL**：
     ```
     https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/complete-suite.json
     ```
   - **自動更新**：`0 6 * * *`（毎日午前6時）
5. **追加**をタップ

✅ 完了！サブスクリプションが追加され、すべてのサンプルスクリプトが利用可能になりました。

---

## ステップ2：最初のスクリプトを設定

### 例：サーバーヘルスチェック

1. **AutoTask** → **スクリプト**に移動
2. **Server Health Check**を見つける
3. 上部のしきい値を変更：
   ```javascript
   const CPU_THRESHOLD = 80;      // CPU > 80%でアラート
   const MEMORY_THRESHOLD = 85;   // メモリ > 85%でアラート
   const DISK_THRESHOLD = 90;     // ディスク > 90%でアラート
   ```
4. スクリプトを保存

---

## 一般的なCron式

| 式 | 意味 |
|----|------|
| `*/5 * * * *` | 5分ごと |
| `0 * * * *` | 毎時 |
| `0 */6 * * *` | 6時間ごと |
| `0 8 * * *` | 毎日午前8時 |
| `0 0 * * 0` | 毎週日曜日 |

---

## 主要API

```javascript
// SSH
$ssh.exec(hostId, command, callback)
$ssh.getHosts(callback)

// HTTP
$httpClient.get(url, callback)
$httpClient.post(options, callback)

// 通知
$notification.post(title, subtitle, body)

// ストレージ
$persistentStore.write(value, key)
$persistentStore.read(key)

// 終了
$done(result)
```

---

## サブスクリプションURL

**完全スイート：**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/complete-suite.json
```

**SSH監視：**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/ssh-monitoring-simple.conf
```

**API監視：**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/api-monitoring-simple.conf
```

---

**自動化を楽しんでください！🚀**
