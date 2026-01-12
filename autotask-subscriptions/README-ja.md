# NaviTerm AutoTask スクリプト

**[🇯🇵 日本語](README-ja.md) | [🇺🇸 English](README.md) | [🇨🇳 中文](README-zh.md) | [🇪🇸 Español](README-es.md) | [🇫🇷 Français](README-fr.md) | [🇩🇪 Deutsch](README-de.md) | [🇷🇺 Русский](README-ru.md)**

---

**NaviTerm 公式自動化スクリプトリポジトリ**

サーバー監視、APIヘルスチェック、システムメンテナンスタスクのための包括的な自動化スクリプトコレクション。NaviTermのAutoTaskエンジンを搭載し、SSH、HTTP、ハイブリッドワークフローをサポート。

## 🚀 クイックスタート

### 3ステップで購読

1. **NaviTerm**アプリを開く
2. **AutoTask** → **サブスクリプション**に移動
3. 以下のURLのいずれかでサブスクリプションを追加

## 📋 利用可能なサブスクリプション

### SSH監視スイート
包括的なヘルスチェックでサーバーを監視します。

**標準設定フォーマット:**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/ssh-monitoring.conf
```

**シンプルCronフォーマット:**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/ssh-monitoring-simple.conf
```

**拡張Cronフォーマット:**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/ssh-monitoring-extended.conf
```

### API監視スイート
APIとWebサービスを監視します。

**標準設定フォーマット:**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/api-monitoring.conf
```

**シンプルCronフォーマット:**
```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/api-monitoring-simple.conf
```

### 完全スイート（推奨）
すべてのスクリプトを1つのサブスクリプションに（JSON形式）。

```
https://raw.githubusercontent.com/jc-hk-1916/NaviTerm/main/autotask-subscriptions/subscriptions/complete-suite.json
```

## 📦 含まれる内容

このリポジトリは、NaviTerm AutoTaskの完全な機能を示す13のサンプルスクリプトを提供します：

### SSHスクリプト（8例）

**🔍 監視（5スクリプト）**
- **サーバーヘルスチェック** (`scripts/ssh/monitoring/server-health-check.js`)
  - 包括的なCPU、メモリ、ディスク監視
  - 設定可能なアラート閾値
  - 自動通知

- **ディスク容量アラート** (`scripts/ssh/monitoring/disk-alert.js`)
  - ディスク使用量監視
  - 設定可能な閾値アラート
  - マルチホストサポート

- **メモリモニター** (`scripts/ssh/monitoring/memory-monitor.js`)
  - リアルタイムメモリ使用量監視
  - 設定可能なアラート閾値
  - 履歴データ追跡

- **プロセスモニター** (`scripts/ssh/monitoring/process-monitor.js`)
  - 重要なプロセスステータスを監視
  - プロセス停止時の自動アラート
  - カスタマイズ可能なプロセスリスト

- **履歴データトラッカー** (`scripts/ssh/monitoring/historical-data-tracker.js`)
  - 永続ストレージを使用してサーバーメトリクスを追跡
  - 負荷履歴データを記録
  - 統計を計算（平均、最大、最小）
  - 古いデータの自動クリーンアップ

**📊 システム情報（1スクリプト）**
- **システム情報** (`scripts/ssh/system/system-info.js`)
  - 完全なシステム情報を収集
  - OS、カーネル、CPU、メモリなど
  - 定期的なシステムレポートを生成

**🌐 ネットワークチェック（2スクリプト）**
- **ネットワーク接続性チェック** (`scripts/ssh/network/connectivity-check.js`)
  - 複数のターゲットへのPingテスト
  - 自動ネットワーク障害アラート
  - 接続品質監視

- **SSH接続テスト** (`scripts/ssh/network/ssh-connection-test.js`)
  - 設定されたすべてのSSHホスト接続をテスト
  - コマンド実行機能を検証
  - 接続失敗時の自動アラート
  - 接続テストレポートを生成

### HTTPスクリプト（4例）

**📡 API監視（2スクリプト）**
- **APIヘルスチェック** (`scripts/http/api-monitoring/api-health-check.js`)
  - 複数のAPIエンドポイントを監視（実際に動作するAPIを使用）
  - JSONPlaceholder API (https://jsonplaceholder.typicode.com)
  - HTTPBin (https://httpbin.org)
  - GitHub API (https://api.github.com)
  - Example.com (https://example.com)
  - レスポンスタイム測定
  - 自動障害検出と通知

- **APIレスポンスタイムモニター** (`scripts/http/api-monitoring/response-time-monitor.js`)
  - APIレスポンスタイムを測定
  - レスポンスタイムトレンド分析
  - 遅いレスポンスの自動アラート
  - 履歴データストレージ

**📥 データ収集（1スクリプト）**
- **データコレクター** (`scripts/http/data-collection/data-collector.js`)
  - 複数のAPIからデータを収集
  - 自動データストレージ
  - 収集失敗アラート
  - JSONデータ解析サポート

**🔗 サードパーティ統合（1スクリプト）**
- **Webhook統合** (`scripts/http/integrations/webhook-integration.js`)
  - 汎用Webhook統合
  - Slack、Discord、DingTalkなどをサポート
  - 自動ステータスレポート
  - 設定可能なメッセージフォーマット

### ハイブリッドスクリプト（1例）

**🔄 SSH + HTTP組み合わせ**
- **サーバーステータスレポート** (`scripts/hybrid/server-status-report.js`)
  - SSH経由でサーバーメトリクスを収集
  - HTTP経由で監視プラットフォームにレポート
  - テスト用にhttpbin.orgを使用
  - 設定可能なレポートエンドポイント

## ✅ 実際に動作するAPI

すべてのサンプルスクリプトは、実際に利用可能な公開APIを使用しています：

| API | 目的 | URL |
|-----|------|-----|
| JSONPlaceholder | 無料の偽REST API | https://jsonplaceholder.typicode.com |
| HTTPBin | HTTPリクエストテスト | https://httpbin.org |
| GitHub API | 公開API | https://api.github.com |
| Example.com | テストドメイン | https://example.com |

## 📖 ドキュメント

複数の言語で完全なドキュメントが利用可能：

| 言語 | クイックスタート | APIリファレンス |
|------|-----------------|----------------|
| 🇯🇵 日本語 | [クイックスタート](examples/QUICK-START-ja.md) | [APIリファレンス](examples/API-REFERENCE-ja.md) |
| 🇺🇸 English | [Quick Start](examples/QUICK-START.md) | [API Reference](examples/API-REFERENCE.md) |
| 🇨🇳 中文 | [快速开始](examples/QUICK-START-zh.md) | [API参考](examples/API-REFERENCE-zh.md) |
| 🇪🇸 Español | [Inicio Rápido](examples/QUICK-START-es.md) | [Referencia API](examples/API-REFERENCE-es.md) |
| 🇫🇷 Français | [Démarrage Rapide](examples/QUICK-START-fr.md) | [Référence API](examples/API-REFERENCE-fr.md) |
| 🇩🇪 Deutsch | [Schnellstart](examples/QUICK-START-de.md) | [API-Referenz](examples/API-REFERENCE-de.md) |
| 🇷🇺 Русский | [Быстрый Старт](examples/QUICK-START-ru.md) | [Справочник API](examples/API-REFERENCE-ru.md) |

## 🤝 貢献

コミュニティからの貢献を歓迎します！以下の方法で参加できます：

- 📝 **新しいスクリプトを提出** - 自動化スクリプトを共有
- 🔧 **既存のスクリプトを改善** - バグ修正または機能最適化
- 🎨 **アイコンを追加** - より良いアイコンをデザイン
- 🌐 **ドキュメントを翻訳** - より多くの言語をサポート

### 貢献方法

1. このリポジトリをフォーク
2. 機能ブランチを作成：`git checkout -b feature/amazing-script`
3. 変更をコミット：`git commit -m 'feat: add amazing script'`
4. ブランチにプッシュ：`git push origin feature/amazing-script`
5. プルリクエストを提出

**詳細ガイド:** [CONTRIBUTING.md](CONTRIBUTING.md)

### スクリプト品質要件

- ✅ 実際に動作するAPIを使用（サンプルAPIを避ける）
- ✅ エラー処理とログを含める
- ✅ 詳細なコメントを提供
- ✅ 既存のコードスタイルに従う
- ✅ スクリプトをテストして動作を確認

### 問題報告

問題を見つけましたか？GitHub Issuesで報告してください：

- 💬 ディスカッション：[GitHub Discussions](https://github.com/jc-hk-1916/NaviTerm/discussions)
- 🐛 問題：[GitHub Issues](https://github.com/jc-hk-1916/NaviTerm/issues)

---

**NaviTermチームが❤️を込めて作成**
