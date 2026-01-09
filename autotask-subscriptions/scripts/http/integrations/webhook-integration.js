// Webhook Integration Script
// Generic webhook integration example - can be used with Slack, Discord, DingTalk, etc.

// ==================== Configuration ====================
// Webhook URL (using HTTPBin for testing)
const WEBHOOK_URL = 'https://httpbin.org/post';

// For real usage, replace with your webhook URL:
// Slack: https://hooks.slack.com/services/YOUR/WEBHOOK/URL
// Discord: https://discord.com/api/webhooks/YOUR/WEBHOOK/URL
// DingTalk: https://oapi.dingtalk.com/robot/send?access_token=YOUR_TOKEN

// ==================== Script Start ====================
console.log('[Webhook Integration] Starting...');

// Collect system status information
$ssh.getHosts((hosts) => {
    if (hosts.length === 0) {
        console.warn('[Webhook Integration] No SSH hosts found, sending test message');
        sendWebhook({
            title: 'NaviTerm AutoTask Test',
            message: 'This is a test message',
            timestamp: $date.nowSimple(),
            status: 'info'
        });
        return;
    }

    console.log(`[Webhook Integration] Found ${hosts.length} hosts, collecting status...`);

    let hostStatuses = [];
    let completed = 0;

    hosts.forEach(host => {
        // Get host status
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
                // Build message
                let message = `Server Status Report\n\n`;
                hostStatuses.forEach(h => {
                    if (h.status === 'online') {
                        message += `✓ ${h.name}: Uptime ${h.uptime}\n`;
                    } else {
                        message += `✗ ${h.name}: Error - ${h.error}\n`;
                    }
                });

                sendWebhook({
                    title: 'Server Status Report',
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
    // Build webhook payload
    const payload = {
        text: `${data.title}\n\n${data.message}\n\nTime: ${data.timestamp}`,
        timestamp: $date.timestamp(),
        data: data
    };

    console.log('[Webhook Integration] Sending message to:', WEBHOOK_URL);

    $httpClient.post({
        url: WEBHOOK_URL,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }, (error, response, body) => {
        if (!error && (response.status === 200 || response.status === 201)) {
            console.log('✓ [Webhook Integration] Message sent successfully');
            console.log(`  Response: ${response.status}`);

            // If using HTTPBin for testing, display returned data
            if (WEBHOOK_URL.includes('httpbin.org')) {
                try {
                    const responseData = JSON.parse(body);
                    console.log('  HTTPBin test response:');
                    console.log(`    Received data: ${JSON.stringify(responseData.json)}`);
                } catch (e) {
                    // Ignore parsing errors
                }
            }

            $done(JSON.stringify({
                success: true,
                message: 'Webhook sent successfully',
                data: data
            }));
        } else {
            console.error('✗ [Webhook Integration] Message send failed');
            console.error(`  Error: ${error || 'HTTP ' + response.status}`);

            $notification.post(
                'Webhook Alert',
                'Message send failed',
                error || `HTTP ${response.status}`
            );

            $done(JSON.stringify({
                success: false,
                error: error || `HTTP ${response.status}`
            }));
        }
    });
}
