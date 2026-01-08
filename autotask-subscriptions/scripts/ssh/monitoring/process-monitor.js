// Process Monitor Script
// 监控关键进程是否运行
// Monitor critical processes to ensure they are running

// ==================== 配置 Configuration ====================
// 要监控的进程列表 List of processes to monitor
const CRITICAL_PROCESSES = [
    'nginx',
    'mysql',
    'redis-server',
    'sshd'
];

// ==================== 脚本开始 Script Start ====================
console.log('[进程监控] 开始执行...');
console.log('[Process Monitor] Starting...');

$ssh.getHosts((hosts) => {
    if (hosts.length === 0) {
        console.error('[进程监控] 未找到配置的主机');
        console.error('[Process Monitor] No configured hosts found');
        $done(JSON.stringify({ error: 'No hosts configured' }));
        return;
    }

    console.log(`[进程监控] 找到 ${hosts.length} 个主机`);
    console.log(`[Process Monitor] Found ${hosts.length} hosts`);

    let allResults = [];
    let hostsCompleted = 0;

    hosts.forEach(host => {
        let processResults = [];
        let processesCompleted = 0;

        CRITICAL_PROCESSES.forEach(processName => {
            // 检查进程是否运行 Check if process is running
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

                    // 如果进程停止,发送告警 Send alert if process is stopped
                    if (!isRunning) {
                        $notification.post(
                            '进程告警 Process Alert',
                            host.name,
                            `关键进程已停止: ${processName}\nCritical process stopped: ${processName}`
                        );
                    }
                } else {
                    console.error(`[${host.name}] ${processName}: 检查失败 Check failed`);
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
                        console.log('[进程监控] 检查完成');
                        console.log('[Process Monitor] Check complete');

                        // 统计停止的进程 Count stopped processes
                        let totalStopped = 0;
                        allResults.forEach(hostResult => {
                            const stopped = hostResult.processes.filter(p => p.status === 'STOPPED').length;
                            totalStopped += stopped;
                        });

                        if (totalStopped > 0) {
                            console.warn(`⚠️  ${totalStopped} 个进程已停止`);
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
