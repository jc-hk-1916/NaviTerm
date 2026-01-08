# Contributing Guide

Thank you for your interest in contributing to the NaviTerm AutoTask Scripts repository!

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Commit Standards](#commit-standards)

---

## Code of Conduct

We are committed to providing a friendly, safe, and welcoming environment for all. By participating in this project, you agree to abide by the following guidelines:

- Be respectful of differing viewpoints and experiences
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

---

## How to Contribute

### 1. Reporting Issues

Found a bug or have a suggestion? Please create an Issue:

1. Search existing Issues to avoid duplicates
2. Provide detailed information and reproduction steps
3. Include error messages and logs if applicable

### 2. Submitting Code

#### Fork and Clone

```bash
# Fork the repository to your account
git clone https://github.com/YOUR_USERNAME/NaviTerm.git
cd NaviTerm/autotask-subscriptions
```

#### Create Branch

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Or bug fix branch
git checkout -b fix/bug-description
```

#### Make Changes

1. Write code
2. Add detailed comments
3. Test scripts
4. Update documentation

#### Commit Changes

```bash
# Stage changes
git add .

# Commit (follow commit standards)
git commit -m "feat: add new monitoring script"

# Push to your fork
git push origin feature/your-feature-name
```

#### Create Pull Request

1. Visit your forked repository
2. Click "New Pull Request"
3. Provide a clear description of your changes
4. Wait for review

---

## Development Workflow

### Script Development

#### 1. Choose Script Type

- **SSH Scripts**: Server monitoring, system management
- **HTTP Scripts**: API monitoring, data collection
- **Hybrid Scripts**: SSH + HTTP combined

#### 2. Script Structure

```javascript
// Script Name
// Description: What it does
// Author: Your Name
// Version: 1.0.0

// ==================== Configuration ====================
const CONFIG = {
    // Configuration items
};

// ==================== Script Start ====================
console.log('[Script Name] Starting...');

// Main logic
function main() {
    // Implementation
}

// Error handling
function handleError(error) {
    console.error('✗ Error:', error);
    $notification.post('Error', 'Script failed', error);
}

// Execute
try {
    main();
} catch (error) {
    handleError(error);
}
```

#### 3. Test Script

Test in NaviTerm:

1. Create new script
2. Paste code
3. Run manually
4. Check output and errors
5. Test edge cases

---

## Code Standards

### JavaScript Style

```javascript
// ✅ Good Example
const API_URL = 'https://api.example.com';

function checkHealth() {
    $httpClient.get(API_URL, (error, response, body) => {
        if (!error && response.status === 200) {
            console.log('✓ API is healthy');
        } else {
            console.error('✗ API is unhealthy');
        }
    });
}

// ❌ Bad Example
const url='https://api.example.com'  // Missing semicolon, no comments

function check(){  // Unclear naming
    $httpClient.get(url,(e,r,b)=>{  // Unclear parameter names
        if(!e&&r.status==200){  // Missing spaces
            console.log('ok')  // Unclear logging
        }
    })
}
```

### Naming Conventions

- **Constants**: `UPPER_SNAKE_CASE`
- **Variables**: `camelCase`
- **Functions**: `camelCase`
- **File names**: `kebab-case.js`

### Comment Standards

```javascript
// ✅ Detailed comments
// Check server health status
function checkServerHealth() {
    // Implementation
}

// ✅ Configuration description
const THRESHOLD = 80;  // Alert threshold (percentage)

// ❌ Missing comments
function checkServerHealth() {
    // ...
}
```

### Error Handling

```javascript
// ✅ Complete Error Handling
$ssh.exec(hostId, command, (result) => {
    if (result.success) {
        console.log('✓ Success:', result.output);
        processResult(result.output);
    } else {
        console.error('✗ Failed:', result.error);
        $notification.post(
            'Script Error',
            'Command failed',
            result.error
        );
        $done(JSON.stringify({
            success: false,
            error: result.error
        }));
    }
});

// ❌ Missing Error Handling
$ssh.exec(hostId, command, (result) => {
    console.log(result.output);
    processResult(result.output);
});
```

---

## Commit Standards

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation update
- `style`: Code formatting
- `refactor`: Refactoring
- `test`: Testing
- `chore`: Build/tooling

### Examples

```bash
# New feature
feat(ssh): add disk space monitoring script

# Bug fix
fix(http): correct API endpoint URL in health check

# Documentation
docs: update contributing guide with examples

# Multi-line commit
feat(monitoring): add comprehensive server health check

- Monitor CPU, memory, and disk usage
- Configurable alert thresholds
- Automatic notifications
```

---

## Review Process

### PR Review Criteria

Your PR will be reviewed based on:

1. **Code Quality**
   - Follows code standards
   - Includes error handling
   - Has clear comments

2. **Functionality**
   - Script works correctly
   - No obvious bugs
   - Edge cases handled

3. **Documentation**
   - Updates relevant docs
   - Includes usage instructions
   - Comments complete

4. **Testing**
   - Tested and verified
   - Test results provided

### Review Timeline

- Usually reviewed within 2-5 business days
- Complex PRs may take longer
- We'll provide feedback as soon as possible

---

## Getting Help

Need help?

- 💬 [GitHub Discussions](https://github.com/jc-hk-1916/NaviTerm/discussions)
- 🐛 [GitHub Issues](https://github.com/jc-hk-1916/NaviTerm/issues)
- 📖 [Documentation](examples/)

---

## License

By contributing, you agree that your contributions will be licensed under the same license as this project.

---

**Thank you for contributing!** 🎉
