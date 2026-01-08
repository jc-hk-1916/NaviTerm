// Memory Monitor Script
// 监控服务器内存使用情况并在超过阈值时发送告警
// Monitors server memory usage and sends alerts when thresholds are exceeded

// ==================== 配置 Configuration ====================
const MEMORY_THRESHOLD = 85;  // 内存使用率告警阈值 (%) Memory usage alert threshold (%)
const CHECK_INTERVAL = '0 */2 * * *';  // 每2小时检查一次 Check every 2 hours

// ==================== 脚本开始 Script Start ====================
console.log('[内存监控] 开始执行...');
console.log('[Memory Monitor] Starting...');

$ssh.getHosts((hosts) => {
    if (hosts.length === 0) {
        console.error('[内存监控] 未找到配置的主机');
        console.error('[Memory Monitor] No configured hosts found');
        $done(JSON.stringify({ error: 'No hosts configured' }));
        return;
    }

    console.log(`[内存监控] 找到 ${hosts.length} 个主机`);
    console.log(`[Memory Monitor] Found ${hosts.length} hosts`);

    let results = [];
    let completed = 0;

    hosts.forEach(host => {
        // 获取内存使用情况 Get memory usage
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

                console.log(`[${host.name}] 内存使用率: ${memoryUsage}% - ${status}`);
                console.log(`[${host.name}] Memory usage: ${memoryUsage}% - ${status}`);

                // 如果超过阈值,发送通知 Send notification if threshold exceeded
                if (memoryUsage > MEMORY_THRESHOLD) {
                    $notification.post(
                        '内存告警 Memory Alert',
                        host.name,
                        `内存使用率: ${memoryUsage}% (阈值: ${MEMORY_THRESHOLD}%)\nMemory usage: ${memoryUsage}% (Threshold: ${MEMORY_THRESHOLD}%)`
                    );
                }
            } else {
                console.error(`[${host.name}] 检查失败: ${result.error}`);
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
                console.log('[内存监控] 检查完成');
                console.log('[Memory Monitor] Check complete');
                console.log(`总计: ${results.length} 个主机`);
                console.log(`Total: ${results.length} hosts`);

                const warnings = results.filter(r => r.status === 'WARNING').length;
                if (warnings > 0) {
                    console.warn(`⚠️  ${warnings} 个主机内存使用率过高`);
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
