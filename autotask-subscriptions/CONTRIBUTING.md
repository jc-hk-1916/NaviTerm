# 贡献指南 / Contributing Guide

感谢您对 NaviTerm AutoTask 脚本仓库的关注！

Thank you for your interest in contributing to the NaviTerm AutoTask Scripts repository!

## 📋 目录 / Table of Contents

- [行为准则](#行为准则--code-of-conduct)
- [如何贡献](#如何贡献--how-to-contribute)
- [开发流程](#开发流程--development-workflow)
- [代码规范](#代码规范--code-standards)
- [提交规范](#提交规范--commit-standards)

---

## 行为准则 / Code of Conduct

我们致力于为所有人提供友好、安全和包容的环境。参与本项目即表示您同意遵守以下准则：

We are committed to providing a friendly, safe, and welcoming environment for all. By participating in this project, you agree to abide by the following guidelines:

- 尊重不同的观点和经验 / Be respectful of differing viewpoints and experiences
- 接受建设性批评 / Accept constructive criticism gracefully
- 关注对社区最有利的事情 / Focus on what is best for the community
- 对其他社区成员表示同理心 / Show empathy towards other community members

---

## 如何贡献 / How to Contribute

### 1. 报告问题 / Reporting Issues

发现 bug 或有建议？请创建 Issue：

Found a bug or have a suggestion? Please create an Issue:

1. 搜索现有 Issues，避免重复 / Search existing Issues to avoid duplicates
2. 使用 Issue 模板 / Use the Issue template
3. 提供详细信息和复现步骤 / Provide detailed information and reproduction steps

### 2. 提交代码 / Submitting Code

#### Fork 和 Clone

```bash
# Fork 仓库到您的账号
# Fork the repository to your account

# Clone 到本地
# Clone to local
git clone https://github.com/YOUR_USERNAME/NaviTerm.git
cd NaviTerm/autotask-subscriptions
```

#### 创建分支 / Create Branch

```bash
# 创建功能分支
# Create feature branch
git checkout -b feature/your-feature-name

# 或 bug 修复分支
# Or bug fix branch
git checkout -b fix/bug-description
```

#### 进行更改 / Make Changes

1. 编写代码 / Write code
2. 添加注释（中英文）/ Add comments (Chinese & English)
3. 测试脚本 / Test scripts
4. 更新文档 / Update documentation

#### 提交更改 / Commit Changes

```bash
# 添加更改
# Stage changes
git add .

# 提交（遵循提交规范）
# Commit (follow commit standards)
git commit -m "feat: add new monitoring script"

# 推送到您的 Fork
# Push to your fork
git push origin feature/your-feature-name
```

#### 创建 Pull Request

1. 访问您的 Fork 仓库 / Visit your forked repository
2. 点击 "New Pull Request" / Click "New Pull Request"
3. 填写 PR 模板 / Fill in the PR template
4. 等待审核 / Wait for review

---

## 开发流程 / Development Workflow

### 脚本开发 / Script Development

#### 1. 选择脚本类型 / Choose Script Type

- **SSH 脚本** / SSH Scripts: 服务器监控、系统管理
- **HTTP 脚本** / HTTP Scripts: API 监控、数据收集
- **混合脚本** / Hybrid Scripts: SSH + HTTP 组合

#### 2. 脚本结构 / Script Structure

```javascript
// 脚本名称 / Script Name
// 描述：做什么用的 / Description: What it does
// 作者 / Author: Your Name
// 版本 / Version: 1.0.0

// ==================== 配置 Configuration ====================
const CONFIG = {
    // 配置项 / Configuration items
};

// ==================== 脚本开始 Script Start ====================
console.log('[脚本名称] 开始执行...');
console.log('[Script Name] Starting...');

// 主要逻�� / Main logic
function main() {
    // 实现代码 / Implementation
}

// 错误处理 / Error handling
function handleError(error) {
    console.error('✗ 错误 Error:', error);
    $notification.post('错误 Error', '脚本执行失败 Script failed', error);
}

// 执行 / Execute
try {
    main();
} catch (error) {
    handleError(error);
}
```

#### 3. 测试脚本 / Test Script

在 NaviTerm 中测试：

Test in NaviTerm:

1. 创建新脚本 / Create new script
2. 粘贴代码 / Paste code
3. 手动运行 / Run manually
4. 检查输出和错误 / Check output and errors
5. 测试边界情况 / Test edge cases

---

## 代码规范 / Code Standards

### JavaScript 风格 / JavaScript Style

```javascript
// ✅ 好的示例 / Good Example
const API_URL = 'https://api.example.com';

function checkHealth() {
    $httpClient.get(API_URL, (error, response, body) => {
        if (!error && response.status === 200) {
            console.log('✓ API 正常 API is healthy');
        } else {
            console.error('✗ API 异常 API is unhealthy');
        }
    });
}

// ❌ 不好的示例 / Bad Example
const url='https://api.example.com'  // 缺少分号，无注释

function check(){  // 命名不清晰
    $httpClient.get(url,(e,r,b)=>{  // 参数名不清晰
        if(!e&&r.status==200){  // 缺少空格
            console.log('ok')  // 日志不清晰
        }
    })
}
```

### 命名规范 / Naming Conventions

- **常量** / Constants: `UPPER_SNAKE_CASE`
- **变量** / Variables: `camelCase`
- **函数** / Functions: `camelCase`
- **文件名** / File names: `kebab-case.js`

### 注释规范 / Comment Standards

```javascript
// ✅ 双语注释 / Bilingual Comments
// 检查服务器健康状态 / Check server health status
function checkServerHealth() {
    // 实现 / Implementation
}

// ✅ 配置说明 / Configuration Description
const THRESHOLD = 80;  // 告警阈值（百分比）/ Alert threshold (percentage)

// ❌ 单语注释 / Single Language
// Check server health
function checkServerHealth() {
    // ...
}
```

### 错误处理 / Error Handling

```javascript
// ✅ 完整的错误处理 / Complete Error Handling
$ssh.exec(hostId, command, (result) => {
    if (result.success) {
        console.log('✓ 执行成功 Success:', result.output);
        processResult(result.output);
    } else {
        console.error('✗ 执行失败 Failed:', result.error);
        $notification.post(
            '脚本错误 Script Error',
            '命令执行失败 Command failed',
            result.error
        );
        $done(JSON.stringify({
            success: false,
            error: result.error
        }));
    }
});

// ❌ 缺少错误处理 / Missing Error Handling
$ssh.exec(hostId, command, (result) => {
    console.log(result.output);
    processResult(result.output);
});
```

---

## 提交规范 / Commit Standards

### 提交消息格式 / Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 类型 / Types

- `feat`: 新功能 / New feature
- `fix`: Bug 修复 / Bug fix
- `docs`: 文档更新 / Documentation update
- `style`: 代码格式 / Code formatting
- `refactor`: 重构 / Refactoring
- `test`: 测试 / Testing
- `chore`: 构建/工具 / Build/tooling

### 示例 / Examples

```bash
# 新功能 / New feature
feat(ssh): add disk space monitoring script

# Bug 修复 / Bug fix
fix(http): correct API endpoint URL in health check

# 文档 / Documentation
docs: update contributing guide with examples

# 多行提交 / Multi-line commit
feat(monitoring): add comprehensive server health check

- Monitor CPU, memory, and disk usage
- Configurable alert thresholds
- Automatic notifications
- Bilingual logging output
```

---

## 审核流程 / Review Process

### PR 审核标准 / PR Review Criteria

您的 PR 将根据以下标准审核：

Your PR will be reviewed based on:

1. **代码质量** / Code Quality
   - 遵循代码规范 / Follows code standards
   - 包含错误处理 / Includes error handling
   - 有清晰的注释 / Has clear comments

2. **功能性** / Functionality
   - 脚本正常工作 / Script works correctly
   - 无明显 bug / No obvious bugs
   - 边界情况处理 / Edge cases handled

3. **文档** / Documentation
   - 更新相关文档 / Updates relevant docs
   - 包含使用说明 / Includes usage instructions
   - 双语注释完整 / Bilingual comments complete

4. **测试** / Testing
   - 已测试验证 / Tested and verified
   - 提供测试结果 / Test results provided

### 审核时间 / Review Timeline

- 通常在 2-5 个工作日内审核 / Usually reviewed within 2-5 business days
- 复杂的 PR 可能需要更长时间 / Complex PRs may take longer
- 我们会尽快提供反馈 / We'll provide feedback as soon as possible

---

## 获取帮助 / Getting Help

需要帮助？

Need help?

- 💬 [GitHub Discussions](https://github.com/jc-hk-1916/NaviTerm/discussions)
- 🐛 [GitHub Issues](https://github.com/jc-hk-1916/NaviTerm/issues)
- 📖 [文档 / Documentation](examples/)

---

## 许可证 / License

通过贡献代码，您同意您的贡献将按照与本项目相同的许可证进行许可。

By contributing, you agree that your contributions will be licensed under the same license as this project.

---

**感谢您的贡献！/ Thank you for contributing!** 🎉
