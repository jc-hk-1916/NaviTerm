/**
 * Server Health Check
 * Monitors CPU, Memory, and Disk usage across all configured hosts
 *
 * Configuration (modify as needed):
 * - CPU_THRESHOLD: CPU usage threshold (%)
 * - MEMORY_THRESHOLD: Memory usage threshold (%)
 * - DISK_THRESHOLD: Disk usage threshold (%)
 *
 * @author NaviTerm AutoTask
 * @version 1.0.0
 */

const CPU_THRESHOLD = 80;
const MEMORY_THRESHOLD = 85;
const DISK_THRESHOLD = 90;

console.log('[Health Check] Starting server health check...');

$ssh.getHosts((hosts) => {
    if (hosts.length === 0) {
        console.error('[Health Check] No hosts configured');
        $notification.post('Health Check Failed', 'No hosts configured', '');
        $done(JSON.stringify({ error: 'No hosts found' }));
        return;
    }

    console.log(`[Health Check] Found ${hosts.length} host(s), checking...`);

    let results = [];
    let completed = 0;

    hosts.forEach(host => {
        checkHost(host, (result) => {
            results.push(result);
            completed++;

            if (completed === hosts.length) {
                finishCheck(results);
            }
        });
    });
});

function checkHost(host, callback) {
    console.log(`[Health Check] Checking ${host.name} (${host.host})...`);

    // Check CPU usage
    $ssh.exec(host.id, "top -bn1 | grep 'Cpu(s)' | awk '{print $2}' | cut -d'%' -f1", (cpuResult) => {
        if (!cpuResult.success) {
            callback({ host: host.name, error: 'Failed to get CPU usage' });
            return;
        }

        const cpuUsage = parseFloat(cpuResult.output.trim());

        // Check memory usage
        $ssh.exec(host.id, "free | grep Mem | awk '{print int($3/$2 * 100)}'", (memResult) => {
            if (!memResult.success) {
                callback({ host: host.name, error: 'Failed to get memory usage' });
                return;
            }

            const memUsage = parseInt(memResult.output.trim());

            // Check disk usage
            $ssh.exec(host.id, "df -h / | tail -1 | awk '{print $5}' | tr -d '%'", (diskResult) => {
                if (!diskResult.success) {
                    callback({ host: host.name, error: 'Failed to get disk usage' });
                    return;
                }

                const diskUsage = parseInt(diskResult.output.trim());

                // Analyze results
                const issues = [];
                if (cpuUsage > CPU_THRESHOLD) issues.push(`CPU: ${cpuUsage.toFixed(1)}%`);
                if (memUsage > MEMORY_THRESHOLD) issues.push(`Memory: ${memUsage}%`);
                if (diskUsage > DISK_THRESHOLD) issues.push(`Disk: ${diskUsage}%`);

                callback({
                    host: host.name,
                    cpu: cpuUsage,
                    memory: memUsage,
                    disk: diskUsage,
                    issues: issues,
                    healthy: issues.length === 0
                });
            });
        });
    });
}

function finishCheck(results) {
    const unhealthyHosts = results.filter(r => !r.healthy && !r.error);
    const errorHosts = results.filter(r => r.error);

    if (unhealthyHosts.length > 0) {
        const message = unhealthyHosts.map(h =>
            `${h.host}: ${h.issues.join(', ')}`
        ).join('\n');

        console.warn(`[Health Check] Issues detected:\n${message}`);
        $notification.post('Health Check Alert', `${unhealthyHosts.length} host(s) need attention`, '');
    } else if (errorHosts.length === 0) {
        console.log('[Health Check] All hosts are healthy');
        $notification.post('Health Check OK', 'All hosts are healthy', '');
    }

    if (errorHosts.length > 0) {
        console.error(`[Health Check] ${errorHosts.length} host(s) failed to check`);
    }

    $done(JSON.stringify({
        total: results.length,
        healthy: results.filter(r => r.healthy).length,
        unhealthy: unhealthyHosts.length,
        errors: errorHosts.length,
        details: results
    }));
}
