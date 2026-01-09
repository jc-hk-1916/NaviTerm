// Historical Data Tracker
// Description: Track historical server metrics using persistent storage
// Author: NaviTerm Team
// Version: 1.0.0

// ==================== Configuration ====================
const CONFIG = {
    maxHistoryRecords: 100,  // Maximum 100 historical records
    storageKey: 'server-metrics-history'
};

// ==================== Script Start ====================
console.log('[Historical Data Tracker] Starting metric collection...');

// Get all hosts
$ssh.getHosts((hosts) => {
    if (hosts.length === 0) {
        console.error('[Historical Data Tracker] No configured hosts found');
        $done(JSON.stringify({ error: 'No hosts configured' }));
        return;
    }

    const host = hosts[0];  // Use first host as example
    console.log(`[Historical Data Tracker] Collecting metrics from ${host.name}...`);

    // Collect current metrics
    $ssh.exec(host.id, "uptime | awk -F'load average:' '{print $2}' | awk -F',' '{print $1}'", (loadResult) => {
        if (!loadResult.success) {
            console.error('[Historical Data Tracker] Failed to get load average');
            $done(JSON.stringify({ error: 'Failed to collect metrics' }));
            return;
        }

        const currentLoad = parseFloat(loadResult.output.trim());
        const timestamp = new Date().toISOString();

        // Read historical data (using $persistentStore.read API)
        console.log('[Historical Data Tracker] Reading historical data...');
        const historyJson = $persistentStore.read(CONFIG.storageKey);
        let history = [];

        if (historyJson) {
            try {
                history = JSON.parse(historyJson);
                console.log(`[Historical Data Tracker] Found ${history.length} historical records`);
            } catch (e) {
                console.warn('[Historical Data Tracker] Failed to parse historical data, starting fresh');
                history = [];
            }
        } else {
            console.log('[Historical Data Tracker] No historical data found, starting fresh');
        }

        // Add new record
        const newRecord = {
            timestamp: timestamp,
            host: host.name,
            hostId: host.id,
            load: currentLoad
        };

        history.push(newRecord);

        // Limit history size
        if (history.length > CONFIG.maxHistoryRecords) {
            const removed = history.length - CONFIG.maxHistoryRecords;
            history = history.slice(-CONFIG.maxHistoryRecords);
            console.log(`[Historical Data Tracker] Removed ${removed} old records`);
        }

        // Save updated historical data (using $persistentStore.write API)
        console.log('[Historical Data Tracker] Saving updated historical data...');
        $persistentStore.write(CONFIG.storageKey, JSON.stringify(history));

        // Calculate statistics
        const loads = history.map(r => r.load);
        const avgLoad = loads.reduce((a, b) => a + b, 0) / loads.length;
        const maxLoad = Math.max(...loads);
        const minLoad = Math.min(...loads);

        const stats = {
            current: currentLoad,
            average: parseFloat(avgLoad.toFixed(2)),
            max: maxLoad,
            min: minLoad,
            records: history.length
        };

        console.log(`[Historical Data Tracker] Statistics - Current: ${stats.current}, Average: ${stats.average}, Max: ${stats.max}, Min: ${stats.min}`);

        // Send notification
        $notification.post(
            'Metrics Tracked',
            `${host.name} - Load: ${currentLoad} (Average: ${stats.average}, Records: ${history.length})`,
            ''
        );

        // Return result
        $done(JSON.stringify({
            success: true,
            host: host.name,
            currentMetrics: newRecord,
            statistics: stats,
            historySize: history.length
        }));
    });
});
