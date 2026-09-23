// 全局学习数据管理
const CLEARN_DATA = {
    // 初始化数据
    init() {
        if (!localStorage.getItem('clearn_data')) {
            localStorage.setItem('clearn_data', JSON.stringify({
                username: '新同学',
                studyDays: 0,
                finishedLessons: 0,
                rightRate: 0,
                totalQuestions: 0,
                rightQuestions: 0,
                progress: {
                    base: 0,
                    process: 0,
                    function: 0
                },
                wrongQuestions: [],
                chart: [0,0,0,0,0,0,0]
            }));
        }
        return JSON.parse(localStorage.getItem('clearn_data'));
    },

    // 保存数据
    save(data) {
        localStorage.setItem('clearn_data', JSON.stringify(data));
    },

    // 添加错题
    addWrongQuestion(question, chapter, answer) {
        const data = this.init();
        // 去重
        const exist = data.wrongQuestions.find(q => q.question === question);
        if (!exist) {
            data.wrongQuestions.push({
                question,
                chapter,
                rightAnswer: answer,
                time: new Date().toLocaleDateString()
            });
            this.save(data);
        }
    },

    // 更新正确率
    updateRate(isRight) {
        const data = this.init();
        data.totalQuestions++;
        if (isRight) data.rightQuestions++;
        data.rightRate = data.totalQuestions === 0 ? 0 : 
            Math.round((data.rightQuestions / data.totalQuestions) * 100) + '%';
        this.save(data);
        this.renderHome();
    },

    // 渲染首页数据
    renderHome() {
        const data = this.init();
        const usernameEl = document.getElementById('username');
        const daysEl = document.getElementById('studyDays');
        const lessonEl = document.getElementById('finishedLesson');
        const rateEl = document.getElementById('rightRate');
        
        if (usernameEl) usernameEl.textContent = data.username;
        if (daysEl) daysEl.textContent = data.studyDays;
        if (lessonEl) lessonEl.textContent = data.finishedLessons;
        if (rateEl) rateEl.textContent = data.rightRate;

        // 渲染进度条
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

    // 渲染错题本
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
                    <p style="color:#007a2f; margin-top:4px;">正确答案：${item.rightAnswer}</p>
                </div>
                <button class="retry-btn" onclick="CLEARN_DATA.removeWrong(${index})">移除</button>
            `;
            listEl.appendChild(div);
        });
    },

    // 移除错题
    removeWrong(index) {
        const data = this.init();
        data.wrongQuestions.splice(index, 1);
        this.save(data);
        this.renderErrorBook();
    }
};

// 页面加载时渲染对应数据
document.addEventListener('DOMContentLoaded', function() {
    CLEARN_DATA.init();
    CLEARN_DATA.renderHome();
    CLEARN_DATA.renderErrorBook();
});

// 用户名编辑
document.addEventListener('click', function(e) {
    if (e.target.id === 'username') {
        const data = CLEARN_DATA.init();
        const newName = prompt('请输入你的昵称：', data.username);
        if (newName && newName.trim()) {
            data.username = newName.trim();
            CLEARN_DATA.save(data);
            e.target.textContent = newName.trim();
        }
    }
});

// 全局选项作答函数
function selectOption(el, isRight, question, chapter, answer) {
    const siblings = el.parentElement.children;
    for (let i = 0; i < siblings.length; i++) {
        siblings[i].style.background = '#fff';
        siblings[i].style.color = '#1d2129';
        siblings[i].style.borderColor = '#e5e6eb';
        siblings[i].style.pointerEvents = 'none';
    }
    
    if (isRight) {
        el.style.background = '#e8ffea';
        el.style.color = '#007a2f';
        el.style.borderColor = '#00b42a';
    } else {
        el.style.background = '#ffece8';
        el.style.color = '#b52520';
        el.style.borderColor = '#f53f3f';
        // 记录错题
        if (question && chapter) {
            CLEARN_DATA.addWrongQuestion(question, chapter, answer);
        }
    }

    // 更新正确率
    CLEARN_DATA.updateRate(isRight);

    // 检查是否是最后一题，完成后跳转下一模块
    const questionBlock = el.closest('.content-card');
    const allQuestions = questionBlock.querySelectorAll('.question-block');
    const currentQuestion = el.closest('.question-block');
    const isLast = Array.from(allQuestions).indexOf(currentQuestion) === allQuestions.length - 1;
    
    if (isLast) {
        setTimeout(() => {
            const nextSection = questionBlock.nextElementSibling;
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // 弹出完成提示
                const tip = document.createElement('div');
                tip.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%);background:#00b42a;color:#fff;padding:10px 20px;border-radius:8px;z-index:999;box-shadow:0 4px 12px rgba(0,180,42,0.3);';
                tip.textContent = '本部分完成，已进入下一模块';
                document.body.appendChild(tip);
                setTimeout(() => tip.remove(), 2000);
            }
        }, 800);
    }
}

// 展开收起题目
function toggleQuiz(num) {
    const quiz = document.getElementById('quiz' + num);
    quiz.style.display = quiz.style.display === 'none' ? 'block' : 'none';
}
