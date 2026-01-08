// System Information Script
// 收集服务器系统信息
// Collect server system information

// ==================== 脚本开始 Script Start ====================
console.log('[系统信息] 开始收集...');
console.log('[System Info] Starting collection...');

$ssh.getHosts((hosts) => {
    if (hosts.length === 0) {
        console.error('[系统信息] 未找到配置的主机');
        console.error('[System Info] No configured hosts found');
        $done(JSON.stringify({ error: 'No hosts configured' }));
        return;
    }

    console.log(`[系统信息] 找到 ${hosts.length} 个主机`);
    console.log(`[System Info] Found ${hosts.length} hosts`);

    let results = [];
    let completed = 0;

    hosts.forEach(host => {
        // 收集系统信息 Collect system information
        const commands = {
            hostname: 'hostname',
            os: 'cat /etc/os-release | grep PRETTY_NAME | cut -d= -f2 | tr -d \\"',
            kernel: 'uname -r',
            uptime: 'uptime -p',
            cpu: 'lscpu | grep "Model name" | cut -d: -f2 | xargs',
            memory: 'free -h | grep Mem | awk \'{print $2}\'',
            disk: 'df -h / | tail -1 | awk \'{print $2}\''
        };

        let hostInfo = {
            host: host.name,
            timestamp: $date.nowSimple()
        };
        let commandsCompleted = 0;
        const totalCommands = Object.keys(commands).length;

        Object.keys(commands).forEach(key => {
            $ssh.exec(host.id, commands[key], (result) => {
                if (result.success) {
                    hostInfo[key] = result.output.trim();
                } else {
                    hostInfo[key] = 'N/A';
                    console.warn(`[${host.name}] ${key}: 获取失败 Failed to get`);
                }

                commandsCompleted++;
                if (commandsCompleted === totalCommands) {
                    results.push(hostInfo);

                    // 打印系统信息 Print system information
                    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
                    console.log(`[${host.name}] 系统信息 System Information:`);
                    console.log(`  主机名 Hostname: ${hostInfo.hostname}`);
                    console.log(`  操作系统 OS: ${hostInfo.os}`);
                    console.log(`  内核 Kernel: ${hostInfo.kernel}`);
                    console.log(`  运行时间 Uptime: ${hostInfo.uptime}`);
                    console.log(`  CPU: ${hostInfo.cpu}`);
                    console.log(`  内存 Memory: ${hostInfo.memory}`);
                    console.log(`  磁盘 Disk: ${hostInfo.disk}`);

                    completed++;
                    if (completed === hosts.length) {
                        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
                        console.log('[系统信息] 收集完成');
                        console.log('[System Info] Collection complete');

                        $done(JSON.stringify({
                            success: true,
                            results: results,
                            summary: {
                                totalHosts: hosts.length,
                                timestamp: $date.nowSimple()
                            }
                        }));
                    }
                }
            });
        });
    });
});
