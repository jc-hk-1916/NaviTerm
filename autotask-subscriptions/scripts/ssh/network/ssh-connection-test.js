// SSH Connection Test
// Description: Test if SSH connections are working properly
// Author: NaviTerm Team
// Version: 1.0.0

// ==================== Configuration ====================
const CONFIG = {
    // No configuration needed, will test all configured hosts
};

// ==================== Script Start ====================
console.log('[SSH Connection Test] Starting SSH connection tests...');

// Get all hosts
$ssh.getHosts((hosts) => {
    if (hosts.length === 0) {
        console.error('[SSH Connection Test] No hosts configured');
        $notification.post('SSH Test Failed', 'No hosts configured', '');
        $done(JSON.stringify({ error: 'No hosts configured' }));
        return;
    }

    console.log(`[SSH Connection Test] Found ${hosts.length} host(s) to test`);

    let testedCount = 0;
    let successCount = 0;
    let failedHosts = [];

    // Test connection for each host
    hosts.forEach((host, index) => {
        console.log(`[SSH Connection Test] Testing connection to ${host.name} (${host.host}:${host.port})...`);

        // Use $ssh.connect() API to test connection
        $ssh.connect(host.id, (result) => {
            testedCount++;

            if (result.success) {
                console.log(`[SSH Connection Test] ✓ ${host.name}: Connection established`);

                // After successful connection, verify with a simple command
                $ssh.exec(host.id, "echo 'Connection OK'", (execResult) => {
                    if (execResult.success) {
                        console.log(`[SSH Connection Test] ✓ ${host.name}: Command execution successful`);
                        successCount++;
                    } else {
                        console.error(`[SSH Connection Test] ✗ ${host.name}: Connected but command failed - ${execResult.error}`);
                        failedHosts.push({
                            name: host.name,
                            host: host.host,
                            port: host.port,
                            error: 'Command execution failed',
                            details: execResult.error
                        });
                    }

                    // Check if all hosts have been tested
                    checkComplete();
                });
            } else {
                console.error(`[SSH Connection Test] ✗ ${host.name}: Connection failed - ${result.error}`);
                failedHosts.push({
                    name: host.name,
                    host: host.host,
                    port: host.port,
                    error: 'Connection failed',
                    details: result.error
                });

                // Check if all hosts have been tested
                checkComplete();
            }
        });
    });

    // Check if testing is complete
    function checkComplete() {
        if (testedCount === hosts.length) {
            // All hosts tested
            const summary = `Tested: ${testedCount}, Success: ${successCount}, Failed: ${failedHosts.length}`;
            console.log(`[SSH Connection Test] Test complete - ${summary}`);

            if (failedHosts.length > 0) {
                const failedNames = failedHosts.map(h => h.name).join(', ');
                $notification.post(
                    'SSH Connection Test',
                    `${failedHosts.length} host(s) failed: ${failedNames}`,
                    ''
                );
            } else {
                $notification.post(
                    'SSH Connection Test',
                    `All ${successCount} host(s) connected successfully`,
                    ''
                );
            }

            $done(JSON.stringify({
                total: hosts.length,
                success: successCount,
                failed: failedHosts.length,
                failedHosts: failedHosts,
                summary: summary
            }));
        }
    }
});
