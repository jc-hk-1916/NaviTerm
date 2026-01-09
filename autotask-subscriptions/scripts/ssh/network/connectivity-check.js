// Network Connectivity Check Script
// Check server network connectivity

// ==================== Configuration ====================
// Target hosts to test
const TEST_HOSTS = [
    '8.8.8.8',           // Google DNS
    '1.1.1.1',           // Cloudflare DNS
    'github.com',        // GitHub
    'google.com'         // Google
];

// ==================== Script Start ====================
console.log('[Network Check] Starting...');

$ssh.getHosts((hosts) => {
    if (hosts.length === 0) {
        console.error('[Network Check] No configured hosts found');
        $done(JSON.stringify({ error: 'No hosts configured' }));
        return;
    }

    console.log(`[Network Check] Found ${hosts.length} hosts`);

    let allResults = [];
    let hostsCompleted = 0;

    hosts.forEach(host => {
        let connectivityResults = [];
        let testsCompleted = 0;

        TEST_HOSTS.forEach(testHost => {
            // Ping test
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

                    // If unreachable, send alert
                    if (!isReachable) {
                        $notification.post(
                            'Network Alert',
                            host.name,
                            `Cannot reach: ${testHost}`
                        );
                    }
                } else {
                    console.error(`[${host.name}] ${testHost}: Test failed`);
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
                        console.log('[Network Check] Check complete');

                        // Count failed connections
                        let totalFailed = 0;
                        allResults.forEach(hostResult => {
                            const failed = hostResult.connectivity.filter(c => !c.reachable).length;
                            totalFailed += failed;
                        });

                        if (totalFailed > 0) {
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
