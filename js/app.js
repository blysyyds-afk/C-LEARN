// 用户名编辑功能
const usernameEl = document.getElementById('username');
if (usernameEl) {
    const savedName = localStorage.getItem('clearn_username');
    if (savedName) {
        usernameEl.textContent = savedName;
    }

    usernameEl.addEventListener('click', function() {
        const newName = prompt('请输入你的昵称：', usernameEl.textContent);
        if (newName && newName.trim()) {
            usernameEl.textContent = newName.trim();
            localStorage.setItem('clearn_username', newName.trim());
        }
    });
}

// 学习数据初始化为0
const studyData = {
    days: 0,
    lessons: 0,
    rightRate: 0,
    chart: [0, 0, 0, 0, 0, 0, 0]
};

// 渲染能力曲线
function renderChart() {
    const chartArea = document.getElementById('chartArea');
    if (!chartArea) return;
    
    chartArea.innerHTML = '';
    studyData.chart.forEach(value => {
        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        bar.style.height = value + '%';
        chartArea.appendChild(bar);
    });
}

renderChart();
