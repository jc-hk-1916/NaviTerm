// Memory Monitoring Script
// Monitor server memory usage and send alerts when threshold is exceeded

// ==================== Configuration ====================
const MEMORY_THRESHOLD = 85;  // Memory usage alert threshold (%)
const CHECK_INTERVAL = '0 */2 * * *';  // Check every 2 hours

// ==================== Script Start ====================
console.log('[Memory Monitor] Starting...');

$ssh.getHosts((hosts) => {
    if (hosts.length === 0) {
        console.error('[Memory Monitor] No configured hosts found');
        $done(JSON.stringify({ error: 'No hosts configured' }));
        return;
    }

    console.log(`[Memory Monitor] Found ${hosts.length} hosts`);

    let results = [];
    let completed = 0;

    hosts.forEach(host => {
        // Get memory usage
        const command = "free | grep Mem | awk '{printf \"%.0f\", $3/$2 * 100}'";

        $ssh.exec(host.id, command, (result) => {
            if (result.success) {
                const memoryUsage = parseInt(result.output.trim());
                const status = memoryUsage > MEMORY_THRESHOLD ? 'WARNING' : 'OK';

                results.push({
                    host: host.name,
                    memoryUsage: memoryUsage,
                    status: status,
                    timestamp: $date.nowSimple()
                });

                console.log(`[${host.name}] Memory usage: ${memoryUsage}% - ${status}`);

                // If threshold exceeded, send notification
                if (memoryUsage > MEMORY_THRESHOLD) {
                    $notification.post(
                        'Memory Alert',
                        host.name,
                        `Memory usage: ${memoryUsage}% (Threshold: ${MEMORY_THRESHOLD}%)`
                    );
                }
            } else {
                console.error(`[${host.name}] Check failed: ${result.error}`);
                results.push({
                    host: host.name,
                    error: result.error,
                    status: 'ERROR'
                });
            }

            completed++;
            if (completed === hosts.length) {
                console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
                console.log('[Memory Monitor] Check complete');
                console.log(`Total: ${results.length} hosts`);

                const warnings = results.filter(r => r.status === 'WARNING').length;
                if (warnings > 0) {
                    console.warn(`⚠️  ${warnings} hosts with high memory usage`);
                }

                $done(JSON.stringify({
                    success: true,
                    results: results,
                    summary: {
                        total: results.length,
                        warnings: warnings,
                        threshold: MEMORY_THRESHOLD
                    }
                }));
            }
        });
    });
});
