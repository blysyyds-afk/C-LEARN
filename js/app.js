// 语言管理
const LANG = {
    init() {
        const saved = localStorage.getItem('clearn_lang') || 'bilingual';
        this.set(saved);
        this.bindEvents();
    },
    set(mode) {
        const body = document.body;
        body.classList.remove('lang-zh-only', 'lang-en-only');
        if (mode === 'zh') body.classList.add('lang-zh-only');
        else if (mode === 'en') body.classList.add('lang-en-only');
        localStorage.setItem('clearn_lang', mode);
        this.updateButtons(mode);
    },
    updateButtons(mode) {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === mode) btn.classList.add('active');
        });
    },
    bindEvents() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => this.set(btn.dataset.lang));
        });
    }
};

// 全局学习数据管理
const CLEARN_DATA = {
    init() {
        if (!localStorage.getItem('clearn_data')) {
            localStorage.setItem('clearn_data', JSON.stringify({
                username: '新同学',
                studyDays: 0,
                studyMinutes: 0,
                finishedLessons: 0,
                rightRate: 0,
                totalQuestions: 0,
                rightQuestions: 0,
                unlockedChapters: [1],
                finishedChapters: [],
                chapterRates: {},
                progress: { base: 0, process: 0, function: 0 },
                wrongQuestions: [],
                chart: [0,0,0,0,0,0,0],
                tasksDone: [],
                lastStudyDate: ''
            }));
        }
        return JSON.parse(localStorage.getItem('clearn_data'));
    },
    save(data) {
        localStorage.setItem('clearn_data', JSON.stringify(data));
    },

    // 累计学习时长 & 天数
    addStudyTime(minutes) {
        const data = this.init();
        const today = new Date().toDateString();
        if (data.lastStudyDate !== today) {
            data.studyDays++;
            data.lastStudyDate = today;
        }
        data.studyMinutes += minutes;
        this.save(data);
        this.renderHome();
    },

    // 解锁下一章（正确率≥80%才解锁）
    tryUnlockNext(chapter) {
        const data = this.init();
        const rate = data.chapterRates[chapter] ? 
            Math.round((data.chapterRates[chapter].right / data.chapterRates[chapter].total) * 100) : 0;
        
        if (rate >= 80) {
            const next = chapter + 1;
            if (next <= 10 && !data.unlockedChapters.includes(next)) {
                data.unlockedChapters.push(next);
                if (!data.finishedChapters.includes(chapter)) {
                    data.finishedChapters.push(chapter);
                    data.finishedLessons++;
                }
                // 更新对应大模块进度
                if (chapter === 1 || chapter === 2) data.progress.base = Math.min(100, chapter * 50);
                if (chapter === 3 || chapter === 4) data.progress.process = Math.min(100, (chapter-2) * 50);
                if (chapter >= 5) data.progress.function = Math.min(100, (chapter-4) * 16.7);
                this.save(data);
                return true;
            }
        }
        return false;
    },

    // 添加错题+解析
    addWrongQuestion(question, chapter, answer, explanation) {
        const data = this.init();
        const exist = data.wrongQuestions.find(q => q.question === question);
        if (!exist) {
            data.wrongQuestions.unshift({ 
                question, chapter, rightAnswer: answer, explanation,
                time: new Date().toLocaleDateString() 
            });
            this.save(data);
            this.renderAllErrors();
        }
    },

    // 更新单章正确率
    updateChapterRate(chapter, isRight) {
        const data = this.init();
        if (!data.chapterRates[chapter]) {
            data.chapterRates[chapter] = { total: 0, right: 0 };
        }
        data.chapterRates[chapter].total++;
        if (isRight) data.chapterRates[chapter].right++;
        
        data.totalQuestions++;
        if (isRight) data.rightQuestions++;
        data.rightRate = data.totalQuestions === 0 ? 0 : 
            Math.round((data.rightQuestions / data.totalQuestions) * 100) + '%';
        
        const dayIndex = Math.min(6, data.studyDays);
        data.chart[dayIndex] = Math.min(100, data.chart[dayIndex] + (isRight ? 8 : 3));
        
        this.save(data);
        this.renderHome();
        this.renderChart();
        return Math.round((data.chapterRates[chapter].right / data.chapterRates[chapter].total) * 100);
    },

    // 渲染首页
    renderHome() {
        const data = this.init();
        const usernameEl = document.getElementById('username');
        const daysEl = document.getElementById('studyDays');
        const lessonEl = document.getElementById('finishedLesson');
        const rateEl = document.getElementById('rightRate');
        const timeEl = document.getElementById('studyMinutes');
        
        if (usernameEl) usernameEl.textContent = data.username;
        if (daysEl) daysEl.textContent = data.studyDays;
        if (lessonEl) lessonEl.textContent = data.finishedLessons;
        if (rateEl) rateEl.textContent = data.rightRate;
        if (timeEl) timeEl.textContent = data.studyMinutes;

        const progressBars = document.querySelectorAll('.progress-fill');
        if (progressBars.length >= 3) {
            progressBars[0].style.width = data.progress.base + '%';
            progressBars[0].parentElement.previousElementSibling.children[1].textContent = Math.round(data.progress.base) + '%';
            progressBars[1].style.width = data.progress.process + '%';
            progressBars[1].parentElement.previousElementSibling.children[1].textContent = Math.round(data.progress.process) + '%';
            progressBars[2].style.width = data.progress.function + '%';
            progressBars[2].parentElement.previousElementSibling.children[1].textContent = Math.round(data.progress.function) + '%';
        }

        this.renderTasks();
        this.renderForgetList();
    },

    // 渲染遗忘曲线（只显示已解锁章节）
    renderForgetList() {
        const data = this.init();
        const list = document.getElementById('forgetList');
        if (!list) return;
        
        const chapterNames = {
            1: '入门语法', 2: '数据类型运算', 3: 'if分支逻辑',
            4: '循环结构', 5: '函数参数', 6: '数组基础'
        };
        
        let html = '';
        data.unlockedChapters.forEach(ch => {
            if (ch > 6) return;
            const rate = data.chapterRates[ch] ? 
                Math.round((data.chapterRates[ch].right / data.chapterRates[ch].total) * 100) : 0;
            let level = '高危';
            let levelClass = '';
            if (rate >= 80) { level = '低危'; levelClass = 'medium'; }
            else if (rate >= 60) { level = '中危'; levelClass = 'medium'; }
            
            html += `
            <li>
                <span>${chapterNames[ch]}</span>
                <span class="level ${levelClass}">${level}</span>
            </li>`;
        });
        
        if (html === '') {
            html = '<li><span>暂无学习记录</span><span class="level medium">--</span></li>';
        }
        list.innerHTML = html;
    },

    // 渲染任务状态
    renderTasks() {
        const data = this.init();
        document.querySelectorAll('.task-list li').forEach((li, index) => {
            const dot = li.querySelector('.task-dot');
            if (!dot) return;
            if (data.tasksDone.includes(index)) {
                dot.classList.add('done');
            } else {
                dot.classList.remove('done');
            }
        });
    },

    completeTask(index) {
        const data = this.init();
        if (!data.tasksDone.includes(index)) {
            data.tasksDone.push(index);
            this.save(data);
            this.renderTasks();
        }
    },

    // 渲染能力曲线
    renderChart() {
        const data = this.init();
        const chartArea = document.getElementById('chartArea');
        if (!chartArea) return;
        chartArea.innerHTML = '';
        data.chart.forEach((val) => {
            const bar = document.createElement('div');
            bar.className = 'chart-bar';
            bar.style.height = val + '%';
            chartArea.appendChild(bar);
        });
    },

    // 三处错题同步渲染
    renderAllErrors() {
        this.renderErrorBook();
        this.renderLessonErrors();
        this.renderHomeErrors();
    },

    renderErrorBook() {
        const data = this.init();
        const listEl = document.getElementById('wrongList');
        const emptyEl = document.getElementById('emptyState');
        const countEl = document.getElementById('wrongCount');
        if (!listEl) return;

        if (data.wrongQuestions.length === 0) {
            emptyEl.style.display = 'block';
            listEl.style.display = 'none';
            if (countEl) countEl.textContent = 0;
            return;
        }
        emptyEl.style.display = 'none';
        listEl.style.display = 'flex';
        if (countEl) countEl.textContent = data.wrongQuestions.length;
        listEl.innerHTML = '';
        data.wrongQuestions.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'error-item';
            div.innerHTML = `
                <div class="error-info">
                    <h4>${item.chapter}</h4>
                    <p>${item.question}</p>
                    <p style="color:#4a6fa5; margin-top:4px;">正确答案：${item.rightAnswer}</p>
                    <p style="color:#6b7280; margin-top:4px; font-size:12px;">解析：${item.explanation}</p>
                </div>
                <button class="retry-btn" onclick="CLEARN_DATA.removeWrong(${index})">移除</button>
            `;
            listEl.appendChild(div);
        });
    },

    renderLessonErrors() {
        const data = this.init();
        const container = document.getElementById('lessonErrorList');
        if (!container) return;
        if (data.wrongQuestions.length === 0) {
            container.innerHTML = '<p style="color:#86909c; text-align:center; padding:20px 0;">暂无错题记录</p>';
            return;
        }
        let html = '';
        data.wrongQuestions.slice(0, 5).forEach(item => {
            html += `
            <div class="error-item">
                <div class="error-info">
                    <h4>${item.chapter}</h4>
                    <p>${item.question}</p>
                    <p style="color:#4a6fa5; margin-top:4px;">正确答案：${item.rightAnswer}</p>
                    <p style="color:#6b7280; margin-top:4px; font-size:12px;">解析：${item.explanation}</p>
                </div>
            </div>`;
        });
        container.innerHTML = html;
    },

    renderHomeErrors() {
        const data = this.init();
        const container = document.getElementById('homeErrorList');
        if (!container) return;
        if (data.wrongQuestions.length === 0) {
            container.innerHTML = `
            <div class="error-item">
                <div class="error-info">
                    <h4>暂无错题记录</h4>
                    <p>完成练习后错题将自动收录</p>
                </div>
                <button class="retry-btn" onclick="location.href='practice.html'">去练习</button>
            </div>`;
            return;
        }
        let html = '';
        data.wrongQuestions.slice(0, 2).forEach(item => {
            html += `
            <div class="error-item">
                <div class="error-info">
                    <h4>${item.chapter}</h4>
                    <p>${item.question}</p>
                </div>
            </div>`;
        });
        container.innerHTML = html;
    },

    removeWrong(index) {
        const data = this.init();
        data.wrongQuestions.splice(index, 1);
        this.save(data);
        this.renderAllErrors();
    },

    renderChapterLocks() {
        const data = this.init();
        document.querySelectorAll('.lesson-card[data-chapter]').forEach(card => {
            const ch = parseInt(card.dataset.chapter);
            if (data.unlockedChapters.includes(ch)) {
                card.classList.remove('locked');
                const lock = card.querySelector('.lock-icon');
                if (lock) lock.remove();
            }
        });
    }
};

// 页面初始化
document.addEventListener('DOMContentLoaded', function() {
    LANG.init();
    CLEARN_DATA.init();
    CLEARN_DATA.renderHome();
    CLEARN_DATA.renderChart();
    CLEARN_DATA.renderAllErrors();
    CLEARN_DATA.renderChapterLocks();

    setInterval(() => {
        CLEARN_DATA.addStudyTime(1);
    }, 60000);
});

// 用户名编辑
document.addEventListener('click', function(e) {
    if (e.target.id === 'username') {
        const data = CLEARN_DATA.init();
        const newName = prompt('请输入你的昵称 / Enter your nickname:', data.username);
        if (newName && newName.trim()) {
            data.username = newName.trim();
            CLEARN_DATA.save(data);
            e.target.textContent = newName.trim();
        }
    }
    if (e.target.closest('.task-list li')) {
        const li = e.target.closest('.task-list li');
        const list = li.parentElement;
        const index = Array.from(list.children).indexOf(li);
        CLEARN_DATA.completeTask(index);
    }
});

// 打开章节练习
function openQuiz(num) {
    const data = CLEARN_DATA.init();
    if (!data.unlockedChapters.includes(num)) {
        alert('请先完成前一章节练习（正确率≥80%）解锁 / Complete previous chapter with ≥80% accuracy');
        return;
    }
    for (let i = 1; i <= 10; i++) {
        const q = document.getElementById('quiz' + i);
        if (q) q.style.display = 'none';
    }
    document.getElementById('quiz' + num).style.display = 'block';
    document.getElementById('quiz' + num).scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// 全局选项作答
function selectOption(el, isRight, chapter, question, chapterName, answer, explanation) {
    const siblings = el.parentElement.children;
    for (let i = 0; i < siblings.length; i++) {
        siblings[i].style.background = '#fff';
        siblings[i].style.color = '#3a3f47';
        siblings[i].style.borderColor = '#e5e6eb';
        siblings[i].style.pointerEvents = 'none';
    }
    
    if (isRight) {
        el.style.background = '#e8f5ea';
        el.style.color = '#2d7a42';
        el.style.borderColor = '#6b9e7d';
    } else {
        el.style.background = '#f5e9e8';
        el.style.color = '#a85c54';
        el.style.borderColor = '#c17c74';
        if (question && chapterName) {
            CLEARN_DATA.addWrongQuestion(question, chapterName, answer, explanation);
        }
    }

    // 显示本题解析
    const block = el.closest('.question-block');
    let exp = block.querySelector('.question-explanation');
    if (!exp) {
        exp = document.createElement('div');
        exp.className = 'question-explanation';
        exp.style.cssText = 'margin-top:12px; padding:10px 14px; background:#f0f4f9; border-radius:6px; font-size:13px; color:#3a5070;';
        exp.innerHTML = '<strong>解析：</strong>' + explanation;
        block.appendChild(exp);
    }

    const currentRate = CLEARN_DATA.updateChapterRate(chapter, isRight);

    // 检查当前模块是否全部做完
    const questionBlock = el.closest('.content-card');
    const allQuestions = questionBlock.querySelectorAll('.question-block');
    let allDone = true;
    allQuestions.forEach(q => {
        if (!q.querySelector('li[style*="pointer-events: none"]')) {
            allDone = false;
        }
    });

    if (allDone) {
        setTimeout(() => {
            if (chapter >= 1) {
                const unlocked = CLEARN_DATA.tryUnlockNext(chapter);
                CLEARN_DATA.renderChapterLocks();
                
                if (unlocked) {
                    const tip = document.createElement('div');
                    tip.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%);background:#4a6fa5;color:#fff;padding:12px 24px;border-radius:8px;z-index:999;box-shadow:0 4px 12px rgba(74,11,165,0.3);font-size:14px;';
                    tip.textContent = '🎉 正确率达标！已解锁下一章，跳转学习中...';
                    document.body.appendChild(tip);
                    setTimeout(() => {
                        tip.remove();
                        location.href = 'lesson.html';
                    }, 1500);
                    return;
                } else {
                    const tip = document.createElement('div');
                    tip.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%);background:#c17c74;color:#fff;padding:12px 24px;border-radius:8px;z-index:999;box-shadow:0 4px 12px rgba(193,124,116,0.3);font-size:14px;';
                    tip.textContent = `本章正确率 ${currentRate}%，需≥80%解锁下一章`;
                    document.body.appendChild(tip);
                    setTimeout(() => tip.remove(), 2000);
                }
            }

            const nextSection = questionBlock.nextElementSibling;
            if (nextSection && nextSection.classList.contains('content-card')) {
                nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                const tip = document.createElement('div');
                tip.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%);background:#6b9e7d;color:#fff;padding:10px 20px;border-radius:8px;z-index:999;';
                tip.textContent = '本部分完成 / Section completed';
                document.body.appendChild(tip);
                setTimeout(() => tip.remove(), 2000);
            }
        }, 800);
    }
}

function toggleQuiz(num) {
    openQuiz(num);
}
