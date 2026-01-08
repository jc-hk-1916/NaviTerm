/**
 * Disk Space Alert
 * Monitors disk usage and sends alerts when threshold is exceeded
 *
 * Configuration:
 * - THRESHOLD: Disk usage threshold (%)
 * - MOUNT_POINT: Mount point to monitor (default: /)
 *
 * @author NaviTerm AutoTask
 * @version 1.0.0
 */

const THRESHOLD = 85;
const MOUNT_POINT = '/';

console.log('[Disk Alert] Starting disk space monitoring...');

$ssh.getHosts((hosts) => {
    if (hosts.length === 0) {
        console.error('[Disk Alert] No hosts configured');
        $notification.post('Disk Alert Failed', 'No hosts configured', '');
        $done(JSON.stringify({ error: 'No hosts found' }));
        return;
    }

    console.log(`[Disk Alert] Monitoring ${hosts.length} host(s)...`);

    let results = [];
    let completed = 0;

    hosts.forEach(host => {
        checkDiskUsage(host, (result) => {
            results.push(result);
            completed++;

            if (completed === hosts.length) {
                finishCheck(results);
            }
        });
    });
});

function checkDiskUsage(host, callback) {
    console.log(`[Disk Alert] Checking ${host.name}...`);

    const command = `df -h ${MOUNT_POINT} | tail -1 | awk '{print $5}' | tr -d '%'`;

    $ssh.exec(host.id, command, (result) => {
        if (!result.success) {
            console.error(`[Disk Alert] Failed to check ${host.name}: ${result.error}`);
            callback({
                host: host.name,
                error: result.error || 'Command execution failed'
            });
            return;
        }

        const usage = parseInt(result.output.trim());

        if (isNaN(usage)) {
            console.error(`[Disk Alert] Invalid output from ${host.name}: ${result.output}`);
            callback({
                host: host.name,
                error: 'Invalid disk usage output'
            });
            return;
        }

        console.log(`[Disk Alert] ${host.name}: ${usage}% used`);

        callback({
            host: host.name,
            usage: usage,
            threshold: THRESHOLD,
            mountPoint: MOUNT_POINT,
            alert: usage > THRESHOLD
        });
    });
}

function finishCheck(results) {
    const alerts = results.filter(r => r.alert && !r.error);
    const errors = results.filter(r => r.error);

    if (alerts.length > 0) {
        const message = alerts.map(r =>
            `${r.host}: ${r.usage}% (${r.mountPoint})`
        ).join('\n');

        console.warn(`[Disk Alert] High disk usage detected:\n${message}`);
        $notification.post(
            'Disk Space Alert',
            `${alerts.length} host(s) exceed ${THRESHOLD}%`,
            ''
        );
    } else if (errors.length === 0) {
        console.log('[Disk Alert] All hosts have sufficient disk space');
    }

    if (errors.length > 0) {
        console.error(`[Disk Alert] ${errors.length} host(s) failed to check`);
    }

    $done(JSON.stringify({
        total: results.length,
        alerts: alerts.length,
        errors: errors.length,
        details: results
    }));
}
