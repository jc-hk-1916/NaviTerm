// System Information Script
// Collect server system information

// ==================== Script Start ====================
console.log('[System Info] Starting collection...');

$ssh.getHosts((hosts) => {
    if (hosts.length === 0) {
        console.error('[System Info] No configured hosts found');
        $done(JSON.stringify({ error: 'No hosts configured' }));
        return;
    }

    console.log(`[System Info] Found ${hosts.length} hosts`);

    let results = [];
    let completed = 0;

    hosts.forEach(host => {
        // Collect system information
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
                    console.warn(`[${host.name}] ${key}: Failed to get`);
                }

                commandsCompleted++;
                if (commandsCompleted === totalCommands) {
                    results.push(hostInfo);

                    // Print system information
                    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
                    console.log(`[${host.name}] System Information:`);
                    console.log(`  Hostname: ${hostInfo.hostname}`);
                    console.log(`  OS: ${hostInfo.os}`);
                    console.log(`  Kernel: ${hostInfo.kernel}`);
                    console.log(`  Uptime: ${hostInfo.uptime}`);
                    console.log(`  CPU: ${hostInfo.cpu}`);
                    console.log(`  Memory: ${hostInfo.memory}`);
                    console.log(`  Disk: ${hostInfo.disk}`);

                    completed++;
                    if (completed === hosts.length) {
                        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
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
