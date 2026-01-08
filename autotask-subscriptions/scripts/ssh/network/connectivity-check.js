// Network Connectivity Check Script
// 检查服务器网络连接性
// Check server network connectivity

// ==================== 配置 Configuration ====================
// 要测试的目标主机 Hosts to test connectivity
const TEST_HOSTS = [
    '8.8.8.8',           // Google DNS
    '1.1.1.1',           // Cloudflare DNS
    'github.com',        // GitHub
    'google.com'         // Google
];

// ==================== 脚本开始 Script Start ====================
console.log('[网络检查] 开始执行...');
console.log('[Network Check] Starting...');

$ssh.getHosts((hosts) => {
    if (hosts.length === 0) {
        console.error('[网络检查] 未找到配置的主机');
        console.error('[Network Check] No configured hosts found');
        $done(JSON.stringify({ error: 'No hosts configured' }));
        return;
    }

    console.log(`[网络检查] 找到 ${hosts.length} 个主机`);
    console.log(`[Network Check] Found ${hosts.length} hosts`);

    let allResults = [];
    let hostsCompleted = 0;

    hosts.forEach(host => {
        let connectivityResults = [];
        let testsCompleted = 0;

        TEST_HOSTS.forEach(testHost => {
            // Ping测试 Ping test
            const command = `ping -c 3 -W 2 ${testHost} > /dev/null 2>&1 && echo "OK" || echo "FAIL"`;

            $ssh.exec(host.id, command, (result) => {
                if (result.success) {
                    const status = result.output.trim();
                    const isReachable = status === 'OK';

                    connectivityResults.push({
                        target: testHost,
                        status: status,
                        reachable: isReachable
                    });

                    const icon = isReachable ? '✓' : '✗';
                    console.log(`[${host.name}] ${icon} ${testHost}: ${status}`);

                    // 如果无法连接,发送告警 Send alert if unreachable
                    if (!isReachable) {
                        $notification.post(
                            '网络告警 Network Alert',
                            host.name,
                            `无法连接到: ${testHost}\nCannot reach: ${testHost}`
                        );
                    }
                } else {
                    console.error(`[${host.name}] ${testHost}: 测试失败 Test failed`);
                    connectivityResults.push({
                        target: testHost,
                        status: 'ERROR',
                        error: result.error
                    });
                }

                testsCompleted++;
                if (testsCompleted === TEST_HOSTS.length) {
                    allResults.push({
                        host: host.name,
                        connectivity: connectivityResults,
                        timestamp: $date.nowSimple()
                    });

                    hostsCompleted++;
                    if (hostsCompleted === hosts.length) {
                        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
                        console.log('[网络检查] 检查完成');
                        console.log('[Network Check] Check complete');

                        // 统计失败的连接 Count failed connections
                        let totalFailed = 0;
                        allResults.forEach(hostResult => {
                            const failed = hostResult.connectivity.filter(c => !c.reachable).length;
                            totalFailed += failed;
                        });

                        if (totalFailed > 0) {
                            console.warn(`⚠️  ${totalFailed} 个连接失败`);
                            console.warn(`⚠️  ${totalFailed} connections failed`);
                        }

                        $done(JSON.stringify({
                            success: true,
                            results: allResults,
                            summary: {
                                totalHosts: hosts.length,
                                totalTests: TEST_HOSTS.length * hosts.length,
                                failedConnections: totalFailed
                            }
                        }));
                    }
                }
            });
        });
    });
});
