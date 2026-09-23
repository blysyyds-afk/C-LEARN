// ==================== 语言管理 ====================
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

// ==================== 全局学习数据管理 ====================
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

    // 累计学习时长
    addStudyTime(minutes) {
        const data = this.init();
        const today = new Date().toLocaleDateString();
        if (data.lastStudyDate !== today) {
            data.studyDays++;
            data.lastStudyDate = today;
        }
        data.studyMinutes += minutes;
        this.save(data);
        this.renderHome();
    },

    // 解锁下一章
    unlockNextChapter(current) {
        const data = this.init();
        const next = current + 1;
        if (next <= 10 && !data.unlockedChapters.includes(next)) {
            data.unlockedChapters.push(next);
            data.finishedChapters.push(current);
            this.save(data);
        }
    },

    addWrongQuestion(question, chapter, answer) {
        const data = this.init();
        const exist = data.wrongQuestions.find(q => q.question === question);
        if (!exist) {
            data.wrongQuestions.push({ question, chapter, rightAnswer: answer, time: new Date().toLocaleDateString() });
            this.save(data);
        }
    },

    updateRate(isRight) {
        const data = this.init();
        data.totalQuestions++;
        if (isRight) data.rightQuestions++;
        data.rightRate = data.totalQuestions === 0 ? 0 : 
            Math.round((data.rightQuestions / data.totalQuestions) * 100) + '%';
        this.save(data);
        this.renderHome();
    },

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
            progressBars[0].parentElement.previousElementSibling.children[1].textContent = data.progress.base + '%';
            progressBars[1].style.width = data.progress.process + '%';
            progressBars[1].parentElement.previousElementSibling.children[1].textContent = data.progress.process + '%';
            progressBars[2].style.width = data.progress.function + '%';
            progressBars[2].parentElement.previousElementSibling.children[1].textContent = data.progress.function + '%';
        }
    },

    renderErrorBook() {
        const data = this.init();
        const listEl = document.getElementById('wrongList');
        const emptyEl = document.getElementById('emptyState');
        if (!listEl) return;

        if (data.wrongQuestions.length === 0) {
            emptyEl.style.display = 'block';
            listEl.style.display = 'none';
            return;
        }
        emptyEl.style.display = 'none';
        listEl.style.display = 'flex';
        listEl.innerHTML = '';
        data.wrongQuestions.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'error-item';
            div.innerHTML = `
                <div class="error-info">
                    <h4>${item.chapter}</h4>
                    <p>${item.question}</p>
                    <p style="color:#6b9e7d; margin-top:4px;">正确答案：${item.rightAnswer}</p>
                </div>
                <button class="retry-btn pink" onclick="CLEARN_DATA.removeWrong(${index})">移除</button>
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
                    <p style="color:#6b9e7d; margin-top:4px;">正确答案：${item.rightAnswer}</p>
                </div>
            </div>`;
        });
        container.innerHTML = html;
    },

    removeWrong(index) {
        const data = this.init();
        data.wrongQuestions.splice(index, 1);
        this.save(data);
        this.renderErrorBook();
        this.renderLessonErrors();
        const countEl = document.getElementById('wrongCount');
        if (countEl) countEl.textContent = data.wrongQuestions.length;
    },

    // 渲染章节解锁状态
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

// ==================== 页面初始化 ====================
document.addEventListener('DOMContentLoaded', function() {
    LANG.init();
    CLEARN_DATA.init();
    CLEARN_DATA.renderHome();
    CLEARN_DATA.renderErrorBook();
    CLEARN_DATA.renderLessonErrors();
    CLEARN_DATA.renderChapterLocks();

    // 页面停留计时，每分钟累计1分钟学习时长
    setInterval(() => {
        CLEARN_DATA.addStudyTime(1);
    }, 60000);
});

// ==================== 用户名编辑 ====================
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
});

// ==================== 打开章节练习 ====================
function openQuiz(num) {
    const data = CLEARN_DATA.init();
    if (!data.unlockedChapters.includes(num)) {
        alert('请先完成前一章节练习后解锁 / Complete previous chapter first');
        return;
    }
    // 关闭其他章节
    for (let i = 1; i <= 10; i++) {
        const q = document.getElementById('quiz' + i);
        if (q) q.style.display = 'none';
    }
    document.getElementById('quiz' + num).style.display = 'block';
    document.getElementById('quiz' + num).scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ==================== 全局选项作答 ====================
function selectOption(el, isRight, chapter, question, chapterName, answer) {
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
            CLEARN_DATA.addWrongQuestion(question, chapterName, answer);
            CLEARN_DATA.renderLessonErrors();
        }
    }

    CLEARN_DATA.updateRate(isRight);

    // 检查当前模块是否所有题目都做完了
    const questionBlock = el.closest('.content-card');
    const allQuestions = questionBlock.querySelectorAll('.question-block');
    let allDone = true;
    allQuestions.forEach(q => {
        if (!q.querySelector('li[style*="pointer-events: none"]')) {
            allDone = false;
        }
    });

    // 全部做完才跳转 + 解锁下一章
    if (allDone) {
        setTimeout(() => {
            // 解锁下一章
            CLEARN_DATA.unlockNextChapter(chapter);
            CLEARN_DATA.renderChapterLocks();

            // 滚动到下一模块
            const nextSection = questionBlock.nextElementSibling;
            if (nextSection && nextSection.classList.contains('content-card')) {
                nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                const tip = document.createElement('div');
                tip.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%);background:#6b9e7d;color:#fff;padding:10px 20px;border-radius:8px;z-index:999;box-shadow:0 4px 12px rgba(107,158,125,0.3);';
                tip.textContent = '本部分完成 / Section completed';
                document.body.appendChild(tip);
                setTimeout(() => tip.remove(), 2000);
            } else {
                // 整章完成提示
                const tip = document.createElement('div');
                tip.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%);background:#b88690;color:#fff;padding:10px 20px;border-radius:8px;z-index:999;box-shadow:0 4px 12px rgba(184,134,144,0.3);';
                tip.textContent = '🎉 本章完成！已解锁下一章 / Chapter complete!';
                document.body.appendChild(tip);
                setTimeout(() => tip.remove(), 2500);
            }
        }, 800);
    }
}

// ==================== 展开收起题目 ====================
function toggleQuiz(num) {
    openQuiz(num);
}
