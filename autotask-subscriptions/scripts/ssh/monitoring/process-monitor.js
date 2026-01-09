// Process Monitoring Script
// Monitor critical processes and check if they are running

// ==================== Configuration ====================
// List of processes to monitor
const CRITICAL_PROCESSES = [
    'nginx',
    'mysql',
    'redis-server',
    'sshd'
];

// ==================== Script Start ====================
console.log('[Process Monitor] Starting...');

$ssh.getHosts((hosts) => {
    if (hosts.length === 0) {
        console.error('[Process Monitor] No configured hosts found');
        $done(JSON.stringify({ error: 'No hosts configured' }));
        return;
    }

    console.log(`[Process Monitor] Found ${hosts.length} hosts`);

    let allResults = [];
    let hostsCompleted = 0;

    hosts.forEach(host => {
        let processResults = [];
        let processesCompleted = 0;

        CRITICAL_PROCESSES.forEach(processName => {
            // Check if process is running
            const command = `pgrep -x ${processName} > /dev/null && echo "running" || echo "stopped"`;

            $ssh.exec(host.id, command, (result) => {
                if (result.success) {
                    const isRunning = result.output.trim() === 'running';
                    const status = isRunning ? 'OK' : 'STOPPED';

                    processResults.push({
                        process: processName,
                        status: status,
                        running: isRunning
                    });

                    console.log(`[${host.name}] ${processName}: ${status}`);

                    // If process stopped, send alert
                    if (!isRunning) {
                        $notification.post(
                            'Process Alert',
                            host.name,
                            `Critical process stopped: ${processName}`
                        );
                    }
                } else {
                    console.error(`[${host.name}] ${processName}: Check failed`);
                    processResults.push({
                        process: processName,
                        status: 'ERROR',
                        error: result.error
                    });
                }

                processesCompleted++;
                if (processesCompleted === CRITICAL_PROCESSES.length) {
                    allResults.push({
                        host: host.name,
                        processes: processResults,
                        timestamp: $date.nowSimple()
                    });

                    hostsCompleted++;
                    if (hostsCompleted === hosts.length) {
                        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
                        console.log('[Process Monitor] Check complete');

                        // Count stopped processes
                        let totalStopped = 0;
                        allResults.forEach(hostResult => {
                            const stopped = hostResult.processes.filter(p => p.status === 'STOPPED').length;
                            totalStopped += stopped;
                        });

                        if (totalStopped > 0) {
                            console.warn(`⚠️  ${totalStopped} processes stopped`);
                        }

                        $done(JSON.stringify({
                            success: true,
                            results: allResults,
                            summary: {
                                totalHosts: hosts.length,
                                totalProcesses: CRITICAL_PROCESSES.length * hosts.length,
                                stoppedProcesses: totalStopped
                            }
                        }));
                    }
                }
            });
        });
    });
});
