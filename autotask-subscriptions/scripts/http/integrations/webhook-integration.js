// Webhook Integration Script
// 通用Webhook集成示例 - 可用于Slack、Discord、钉钉等
// Generic Webhook Integration - Works with Slack, Discord, DingTalk, etc.

// ==================== 配置 Configuration ====================
// Webhook URL (使用HTTPBin进行测试)
// Webhook URL (Using HTTPBin for testing)
const WEBHOOK_URL = 'https://httpbin.org/post';

// 真实使用时,替换为你的Webhook URL
// For real use, replace with your webhook URL:
// Slack: https://hooks.slack.com/services/YOUR/WEBHOOK/URL
// Discord: https://discord.com/api/webhooks/YOUR/WEBHOOK/URL
// 钉钉 DingTalk: https://oapi.dingtalk.com/robot/send?access_token=YOUR_TOKEN

// ==================== 脚本开始 Script Start ====================
console.log('[Webhook集成] 开始执行...');
console.log('[Webhook Integration] Starting...');

// 收集系统状态信息 Collect system status information
$ssh.getHosts((hosts) => {
    if (hosts.length === 0) {
        console.warn('[Webhook集成] 未找到SSH主机,发送测试消息');
        console.warn('[Webhook Integration] No SSH hosts found, sending test message');
        sendWebhook({
            title: 'NaviTerm AutoTask 测试 Test',
            message: '这是一条测试消息 This is a test message',
            timestamp: $date.nowSimple(),
            status: 'info'
        });
        return;
    }

    console.log(`[Webhook集成] 找到 ${hosts.length} 个主机,收集状态...`);
    console.log(`[Webhook Integration] Found ${hosts.length} hosts, collecting status...`);

    let hostStatuses = [];
    let completed = 0;

    hosts.forEach(host => {
        // 获取主机状态 Get host status
        const command = "uptime | awk '{print $3,$4}' | sed 's/,//'";

        $ssh.exec(host.id, command, (result) => {
            if (result.success) {
                hostStatuses.push({
                    name: host.name,
                    uptime: result.output.trim(),
                    status: 'online'
                });
            } else {
                hostStatuses.push({
                    name: host.name,
                    status: 'error',
                    error: result.error
                });
            }

            completed++;
            if (completed === hosts.length) {
                // 构建消息 Build message
                let message = `服务器状态报告 Server Status Report\n\n`;
                hostStatuses.forEach(h => {
                    if (h.status === 'online') {
                        message += `✓ ${h.name}: 运行时间 Uptime ${h.uptime}\n`;
                    } else {
                        message += `✗ ${h.name}: 错误 Error - ${h.error}\n`;
                    }
                });

                sendWebhook({
                    title: '服务器状态报告 Server Status Report',
                    message: message,
                    timestamp: $date.nowSimple(),
                    hostCount: hosts.length,
                    onlineCount: hostStatuses.filter(h => h.status === 'online').length
                });
            }
        });
    });
});

function sendWebhook(data) {
    // 构建Webhook payload
    // Build webhook payload
    const payload = {
        text: `${data.title}\n\n${data.message}\n\n时间 Time: ${data.timestamp}`,
        timestamp: $date.timestamp(),
        data: data
    };

    console.log('[Webhook集成] 发送消息到 Sending message to:', WEBHOOK_URL);

    $httpClient.post({
        url: WEBHOOK_URL,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }, (error, response, body) => {
        if (!error && (response.status === 200 || response.status === 201)) {
            console.log('✓ [Webhook集成] 消息发送成功 Message sent successfully');
            console.log(`  响应 Response: ${response.status}`);

            // 如果使用HTTPBin测试,显示返回的数据
            // If using HTTPBin for testing, show returned data
            if (WEBHOOK_URL.includes('httpbin.org')) {
                try {
                    const responseData = JSON.parse(body);
                    console.log('  HTTPBin 测试响应 Test Response:');
                    console.log(`    接收到的数据 Received data: ${JSON.stringify(responseData.json)}`);
                } catch (e) {
                    // Ignore parse errors
                }
            }

            $done(JSON.stringify({
                success: true,
                message: 'Webhook sent successfully',
                data: data
            }));
        } else {
            console.error('✗ [Webhook集成] 消息发送失败 Message send failed');
            console.error(`  错误 Error: ${error || 'HTTP ' + response.status}`);

            $notification.post(
                'Webhook告警 Webhook Alert',
                '消息发送失败 Message send failed',
                error || `HTTP ${response.status}`
            );

            $done(JSON.stringify({
                success: false,
                error: error || `HTTP ${response.status}`
            }));
        }
    });
}
