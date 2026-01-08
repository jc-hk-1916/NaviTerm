#!/bin/bash
# 从 Flaticon 下载专业图标
# Download professional icons from Flaticon

cd "$(dirname "$0")"

echo "开始下载图标..."
echo "Downloading icons..."
echo ""

# 下载图标
curl -L -o server-health.png "https://cdn-icons-png.flaticon.com/128/2920/2920277.png"
curl -L -o disk-alert.png "https://cdn-icons-png.flaticon.com/128/2920/2920349.png"
curl -L -o memory-monitor.png "https://cdn-icons-png.flaticon.com/128/2920/2920324.png"
curl -L -o process-monitor.png "https://cdn-icons-png.flaticon.com/128/2920/2920230.png"
curl -L -o system-info.png "https://cdn-icons-png.flaticon.com/128/2920/2920235.png"
curl -L -o network-check.png "https://cdn-icons-png.flaticon.com/128/2920/2920249.png"
curl -L -o api-health.png "https://cdn-icons-png.flaticon.com/128/2920/2920272.png"
curl -L -o response-time.png "https://cdn-icons-png.flaticon.com/128/2920/2920231.png"
curl -L -o data-collector.png "https://cdn-icons-png.flaticon.com/128/2920/2920240.png"
curl -L -o webhook.png "https://cdn-icons-png.flaticon.com/128/2920/2920239.png"
curl -L -o status-report.png "https://cdn-icons-png.flaticon.com/128/2920/2920246.png"

echo ""
echo "✅ 图标下载完成！"
echo "✅ Icons downloaded successfully!"
echo "📁 位置 Location: $(pwd)"
