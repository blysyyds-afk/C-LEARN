# 自动创建目录
New-Item -ItemType Directory -Path css, js, assets -Force

# ========== 1. index.html ==========
@"
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>C-Learn · 学习工作台</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <header class="navbar">
    <div class="brand">
      <img src="assets/mascot.png" alt="布偶猫吉祥物" class="brand-logo" />
      <span class="brand-name">C-Learn</span>
    </div>
    <nav>
      <a href="index.html" class="active">工作台</a>
      <a href="course.html">课程</a>
      <a href="practice.html">练习</a>
      <a href="wrong-book.html">错题本</a>
      <a href="review.html">复习</a>
      <a href="profile.html">我的</a>
    </nav>
  </header>

  <main class="dashboard">
    <section class="hero">
      <div class="hero-text">
        <h1>把自学完成成闭环</h1>
        <p>诊断 · 理解 · 动手 · 回忆 · 纠错 · 复习</p>
      </div>
      <div class="status-card">
        <h2>当前学习状态</h2>
        <p>水平：<span id="level-text">入门阶段</span></p>
        <p>今日任务：<span id="today-task">完成第 1 课主动回忆练习</span></p>
        <p>本周目标：建立最小 C 程序框架能力</p>
        <button class="btn btn-primary" onclick="location.href='lesson.html'">开始今日学习</button>
      </div>
    </section>

    <section class="stats-grid">
      <div class="stat-card"><h3>连续学习</h3><p class="stat-number" id="stat-continuous-days">0</p><p class="stat-label">天</p></div>
      <div class="stat-card"><h3>今日学习</h3><p class="stat-number" id="stat-today-minutes">0</p><p class="stat-label">分钟</p></div>
      <div class="stat-card"><h3>已掌握知识点</h3><p class="stat-number" id="stat-skills">0</p><p class="stat-label">个</p></div>
      <div class="stat-card"><h3>题目正确率</h3><p class="stat-number" id="stat-accuracy">0%</p><p class="stat-label">近 10 题</p></div>
    </section>

    <section class="workbench">
      <div class="today-tasks">
        <h2>今日学习路径</h2>
        <ul id="task-list">
          <li data-task="diagnosis">课前诊断</li>
          <li data-task="explain">原理讲解</li>
          <li data-task="practice">引导练习</li>
          <li data-task="recall">主动回忆</li>
          <li data-task="review">错因复习</li>
        </ul>
      </div>
      <div class="review-queue">
        <h2>复习队列</h2>
        <div id="review-list"><p class="empty">暂无待复习内容，完成练习后自动加入。</p></div>
      </div>
    </section>

    <section class="milestone-section">
      <h2>学习里程碑</h2>
      <div class="milestone-bar">
        <div class="milestone-item active"><span class="dot"></span><span>输出与变量</span></div>
        <div class="milestone-item"><span class="dot"></span><span>交互式小程序</span></div>
        <div class="milestone-item"><span class="dot"></span><span>条件与循环</span></div>
        <div class="milestone-item"><span class="dot"></span><span>命令行项目</span></div>
        <div class="milestone-item"><span class="dot"></span><span>函数与数组</span></div>
      </div>
    </section>
  </main>

  <footer class="footer"><p>C-Learn · 面向自学者的任务化学习系统</p></footer>
  <script src="js/progress.js"></script>
  <script src="js/app.js"></script>
</body>
</html>
"@ | Set-Content -Path index.html -Encoding UTF8

# ========== 2. course.html ==========
@"
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>课程 · C 语言入门闭环</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <header class="navbar">
    <div class="brand">
      <img src="assets/mascot.png" alt="布偶猫吉祥物" class="brand-logo" />
      <span class="brand-name">C-Learn</span>
    </div>
    <nav>
      <a href="index.html">工作台</a>
      <a href="course.html" class="active">课程</a>
      <a href="practice.html">练习</a>
      <a href="wrong-book.html">错题本</a>
      <a href="review.html">复习</a>
      <a href="profile.html">我的</a>
    </nav>
  </header>

  <main class="course-page">
    <aside class="course-sidebar">
      <h2>C 语言入门闭环</h2>
      <ul>
        <li class="active">第 1 课：写出最小 C 程序</li>
        <li>第 2 课：理解变量与赋值</li>
        <li>第 3 课：输入与输出交互</li>
        <li>第 4 课：条件判断</li>
        <li>第 5 课：循环结构</li>
        <li>第 6 课：数组基础</li>
        <li>第 7 课：函数封装</li>
      </ul>
    </aside>

    <section class="course-content">
      <h1>第 1 课：写出最小 C 程序</h1>
      <p class="lesson-duration">建议学习时长：25 分钟</p>
      <div class="lesson-steps">
        <div class="step-card"><h3>1. 课前诊断</h3><p>判断你是否已经理解程序入口、输出语句和基础结构。</p><a href="lesson.html" class="btn btn-primary">开始诊断</a></div>
        <div class="step-card"><h3>2. 原理讲解</h3><p>用生活化比喻解释 C 程序的最小结构。</p></div>
        <div class="step-card"><h3>3. 关键拆解</h3><p>逐行解释头文件、main 函数、printf 和 return。</p></div>
        <div class="step-card"><h3>4. 引导练习</h3><p>按提示完成第一个可运行程序。</p></div>
        <div class="step-card"><h3>5. 主动回忆</h3><p>不看提示，补全程序骨架和输出语句。</p></div>
        <div class="step-card"><h3>6. 错因讲解</h3><p>识别漏分号、缺少入口函数、头文件错误等常见问题。</p></div>
      </div>
    </section>
  </main>
  <script src="js/app.js"></script>
</body>
</html>
"@ | Set-Content -Path course.html -Encoding UTF8

# ========== 3. lesson.html ==========
@"
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>学习课 · 写出最小 C 程序</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <header class="navbar">
    <div class="brand">
      <img src="assets/mascot.png" alt="布偶猫吉祥物" class="brand-logo" />
      <span class="brand-name">C-Learn</span>
    </div>
    <nav>
      <a href="index.html">工作台</a>
      <a href="course.html">课程</a>
      <a href="lesson.html" class="active">学习</a>
      <a href="practice.html">练习</a>
      <a href="wrong-book.html">错题本</a>
      <a href="review.html">复习</a>
      <a href="profile.html">我的</a>
    </nav>
  </header>

  <main class="lesson-page">
    <aside class="lesson-sidebar">
      <h2>学习步骤</h2>
      <ul>
        <li class="active" data-step="diagnosis">课前诊断</li>
        <li data-step="explain">原理讲解</li>
        <li data-step="breakdown">关键拆解</li>
        <li data-step="practice">引导练习</li>
        <li data-step="recall">主动回忆</li>
        <li data-step="task">独立任务</li>
        <li data-step="error">错因讲解</li>
        <li data-step="review">间隔复习</li>
      </ul>
    </aside>

    <section class="lesson-main">
      <div id="lesson-content">
        <h1>课前诊断</h1>
        <p>用 2–3 道题判断你的当前基础。</p>
        <div class="question-card">
          <p class="question-stem">1. C 程序的入口函数通常是？</p>
          <ul class="options">
            <li><button class="option-btn" data-answer="false">start()</button></li>
            <li><button class="option-btn" data-answer="true">main()</button></li>
            <li><button class="option-btn" data-answer="false">begin()</button></li>
            <li><button class="option-btn" data-answer="false">run()</button></li>
          </ul>
          <p class="feedback" id="feedback-1"></p>
        </div>
        <div class="question-card">
          <p class="question-stem">2. printf 的主要作用是？</p>
          <ul class="options">
            <li><button class="option-btn" data-answer="false">输入数据</button></li>
            <li><button class="option-btn" data-answer="true">输出信息</button></li>
            <li><button class="option-btn" data-answer="false">定义变量</button></li>
            <li><button class="option-btn" data-answer="false">结束程序</button></li>
          </ul>
          <p class="feedback" id="feedback-2"></p>
        </div>
        <button class="btn btn-primary" onclick="finishTask('diagnosis')">完成诊断</button>
      </div>
    </section>

    <aside class="lesson-partner">
      <img src="assets/mascot.png" alt="布偶猫学习伙伴" />
      <p>先独立思考，不要急着查答案。</p>
    </aside>
  </main>
  <script src="js/progress.js"></script>
  <script src="js/app.js"></script>
</body>
</html>
"@ | Set-Content -Path lesson.html -Encoding UTF8

# ========== 4. practice.html ==========
@"
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>练习 · printf 专项训练</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <header class="navbar">
    <div class="brand">
      <img src="assets/mascot.png" alt="布偶猫吉祥物" class="brand-logo" />
      <span class="brand-name">C-Learn</span>
    </div>
    <nav>
      <a href="index.html">工作台</a>
      <a href="course.html">课程</a>
      <a href="practice.html" class="active">练习</a>
      <a href="wrong-book.html">错题本</a>
      <a href="review.html">复习</a>
      <a href="profile.html">我的</a>
    </nav>
  </header>

  <main class="practice-page">
    <section class="practice-header">
      <h1>printf 专项训练</h1>
      <p>输出预测 · 填空 · 找错 · 默写 · 代码排序</p>
    </section>
    <div class="practice-layout">
      <div class="question-list">
        <div class="practice-card" data-type="output_prediction">
          <h3>输出预测</h3>
          <pre><code>#include &lt;stdio.h&gt;
int main() {
  printf("Hi");
  return 0;
}</code></pre>
          <p>程序运行后输出是什么？</p>
          <input type="text" placeholder="输入你的答案" />
          <button class="btn btn-primary">提交</button>
        </div>
        <div class="practice-card" data-type="fill_blank">
          <h3>代码填空</h3>
          <pre><code>#include &lt;stdio.h&gt;
int main() {
  ________("Hello");
  return 0;
}</code></pre>
          <p>补全输出语句。</p>
          <input type="text" placeholder="输入缺失代码" />
          <button class="btn btn-primary">提交</button>
        </div>
        <div class="practice-card" data-type="find_error">
          <h3>找错练习</h3>
          <pre><code>#include &lt;stdio.h&gt;
int main() {
  printf("Hello")
  return 0;
}</code></pre>
          <p>这段程序可能存在什么问题？</p>
          <input type="text" placeholder="描述错误位置和原因" />
          <button class="btn btn-primary">提交</button>
        </div>
      </div>
      <aside class="practice-sidebar">
        <div class="tip-card">
          <img src="assets/mascot.png" alt="布偶猫学习伙伴" />
          <p>提交后会记录对错，并自动进入复习队列。</p>
        </div>
      </aside>
    </div>
  </main>
  <script src="js/app.js"></script>
</body>
</html>
"@ | Set-Content -Path practice.html -Encoding UTF8

# ========== 5. wrong-book.html ==========
@"
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>错题本 · 错因教学</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <header class="navbar">
    <div class="brand">
      <img src="assets/mascot.png" alt="布偶猫吉祥物" class="brand-logo" />
      <span class="brand-name">C-Learn</span>
    </div>
    <nav>
      <a href="index.html">工作台</a>
      <a href="course.html">课程</a>
      <a href="practice.html">练习</a>
      <a href="wrong-book.html" class="active">错题本</a>
      <a href="review.html">复习</a>
      <a href="profile.html">我的</a>
    </nav>
  </header>

  <main class="wrong-book-page">
    <h1>错题本</h1>
    <p>错题不是收藏，而是自动教学队列。</p>
    <div id="wrong-list">
      <div class="wrong-card">
        <div class="wrong-meta">
          <span>知识点：printf</span>
          <span>题型：输出预测</span>
          <span>错因：漏看输出内容</span>
        </div>
        <h3>我错在哪里？</h3>
        <p>误把输出内容当成 Hello World，忽略了程序中实际只有 "Hello"。</p>
        <h3>正确思路？</h3>
        <p>先找所有输出语句，再逐句判断显示结果。</p>
        <h3>下次怎么判断？</h3>
        <p>先看 printf 双引号里的内容，再判断是否有换行或其他输出。</p>
        <div class="review-schedule">
          <span class="review-node">第 1 天</span>
          <span class="review-node">第 3 天</span>
          <span class="review-node">第 7 天</span>
        </div>
      </div>
    </div>
  </main>
  <script src="js/app.js"></script>
</body>
</html>
"@ | Set-Content -Path wrong-book.html -Encoding UTF8

# ========== 6. review.html ==========
@"
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>复习 · 间隔重复</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <header class="navbar">
    <div class="brand">
      <img src="assets/mascot.png" alt="布偶猫吉祥物" class="brand-logo" />
      <span class="brand-name">C-Learn</span>
    </div>
    <nav>
      <a href="index.html">工作台</a>
      <a href="course.html">课程</a>
      <a href="practice.html">练习</a>
      <a href="wrong-book.html">错题本</a>
      <a href="review.html" class="active">复习</a>
      <a href="profile.html">我的</a>
    </nav>
  </header>

  <main class="review-page">
    <h1>间隔复习计划</h1>
    <p>连续两次正确后降低频率，多次错误则退回前置概念。</p>
    <div class="review-timeline">
      <div class="review-stage">
        <h3>第 1 天复习</h3>
        <ul><li>printf 输出预测</li><li>最小程序结构</li></ul>
      </div>
      <div class="review-stage">
        <h3>第 3 天复习</h3>
        <ul><li>主动回忆默写</li><li>常见错误识别</li></ul>
      </div>
      <div class="review-stage">
        <h3>第 7 天复习</h3>
        <ul><li>综合改写练习</li><li>程序骨架排序</li></ul>
      </div>
    </div>
  </main>
  <script src="js/app.js"></script>
</body>
</html>
"@ | Set-Content -Path review.html -Encoding UTF8

# ========== 7. profile.html ==========
@"
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>个人中心 · 学习报告</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <header class="navbar">
    <div class="brand">
      <img src="assets/mascot.png" alt="布偶猫吉祥物" class="brand-logo" />
      <span class="brand-name">C-Learn</span>
    </div>
    <nav>
      <a href="index.html">工作台</a>
      <a href="course.html">课程</a>
      <a href="practice.html">练习</a>
      <a href="wrong-book.html">错题本</a>
      <a href="review.html">复习</a>
      <a href="profile.html" class="active">我的</a>
    </nav>
  </header>

  <main class="profile-page">
    <section class="profile-header">
      <img src="assets/mascot.png" alt="布偶猫头像" class="avatar" />
      <h1>自学者</h1>
      <p>当前阶段：入门到独立完成程序</p>
    </section>

    <section class="profile-stats">
      <div class="stat-card"><h3>连续学习</h3><p class="stat-number" id="profile-continuous">0</p><p class="stat-label">天</p></div>
      <div class="stat-card"><h3>总学习时长</h3><p class="stat-number" id="profile-minutes">0</p><p class="stat-label">分钟</p></div>
      <div class="stat-card"><h3>已完成题目</h3><p class="stat-number" id="profile-questions">0</p><p class="stat-label">道</p></div>
      <div class="stat-card"><h3>错题二次正确率</h3><p class="stat-number" id="profile-retry">0%</p><p class="stat-label">复习表现</p></div>
    </section>

    <section class="ability-section">
      <h2>能力曲线</h2>
      <div class="ability-bars">
        <div class="ability-item"><span>程序结构</span><div class="bar"><div class="bar-fill" style="width: 60%"></div></div></div>
        <div class="ability-item"><span>输出语句</span><div class="bar"><div class="bar-fill" style="width: 70%"></div></div></div>
        <div class="ability-item"><span>错误识别</span><div class="bar"><div class="bar-fill" style="width: 40%"></div></div></div>
      </div>
    </section>
  </main>
  <script src="js/progress.js"></script>
  <script src="js/app.js"></script>
</body>
</html>
"@ | Set-Content -Path profile.html -Encoding UTF8

# ========== 8. css/style.css ==========
@"
* { margin: 0; padding: 0; box-sizing: border-box; }
:root {
  --primary: #4f7cff; --primary-light: #eaf1ff; --secondary: #a8c0ff;
  --bg: #f7faff; --card: #ffffff; --text: #1f2a44; --text-light: #5b6b8c;
  --success: #34c759; --warning: #ff9500; --danger: #ff6b6b; --border: #e4ecf7;
}
body {
  font-family: "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
  background: var(--bg); color: var(--text); line-height: 1.6;
}
.navbar {
  display: flex; justify-content: space-between; align-items: center;
  padding: 16px 40px; background: var(--card); border-bottom: 1px solid var(--border);
  position: sticky; top: 0; z-index: 100;
}
.brand { display: flex; align-items: center; gap: 10px; }
.brand-logo { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; background: var(--primary-light); }
.brand-name { font-size: 20px; font-weight: 700; color: var(--primary); }
nav a { margin-left: 24px; text-decoration: none; color: var(--text-light); font-weight: 500; }
nav a:hover, nav a.active { color: var(--primary); }
main { padding: 40px; max-width: 1400px; margin: 0 auto; }
h1, h2, h3 { color: var(--text); margin-bottom: 16px; }
p { color: var(--text-light); margin-bottom: 12px; }
.btn {
  padding: 10px 20px; border: none; border-radius: 10px; cursor: pointer;
  font-weight: 600; text-decoration: none; display: inline-block;
}
.btn-primary { background: var(--primary); color: white; }
.btn-primary:hover { background: #3f67e0; }
.hero { display: grid; grid-template-columns: 1.3fr 1fr; gap: 30px; margin-bottom: 40px; }
.hero-text h1 { font-size: 42px; margin-bottom: 10px; }
.hero-text p { font-size: 18px; margin-bottom: 30px; }
.status-card {
  background: var(--card); padding: 30px; border-radius: 20px;
  box-shadow: 0 8px 24px rgba(79, 124, 255, 0.08);
}
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 40px; }
.stat-card {
  background: var(--card); padding: 24px; border-radius: 16px; text-align: center;
  box-shadow: 0 4px 16px rgba(79, 124, 255, 0.06);
}
.stat-number { font-size: 32px; font-weight: 700; color: var(--primary); margin: 8px 0; }
.stat-label { font-size: 14px; color: var(--text-light); }
.workbench { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 40px; }
.today-tasks, .review-queue {
  background: var(--card); padding: 24px; border-radius: 16px;
  box-shadow: 0 4px 16px rgba(79, 124, 255, 0.06);
}
#task-list { list-style: none; }
#task-list li {
  padding: 12px 16px; border-radius: 10px; margin-bottom: 8px;
  background: var(--primary-light); cursor: pointer;
}
#task-list li:hover { background: var(--secondary); color: white; }
.empty { color: var(--text-light); font-size: 14px; }
.milestone-section {
  background: var(--card); padding: 24px; border-radius: 16px;
  box-shadow: 0 4px 16px rgba(79, 124, 255, 0.06);
}
.milestone-bar { display: flex; justify-content: space-between; align-items: center; }
.milestone-item { display: flex; flex-direction: column; align-items: center; gap: 8px; color: var(--text-light); }
.milestone-item .dot { width: 14px; height: 14px; border-radius: 50%; background: var(--border); }
.milestone-item.active .dot { background: var(--primary); }
.course-page { display: grid; grid-template-columns: 260px 1fr; gap: 30px; }
.course-sidebar { background: var(--card); padding: 24px; border-radius: 16px; height: fit-content; }
.course-sidebar ul { list-style: none; }
.course-sidebar li { padding: 12px; border-radius: 10px; margin-bottom: 8px; cursor: pointer; }
.course-sidebar li.active { background: var(--primary); color: white; }
.lesson-steps { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
.step-card {
  background: var(--card); padding: 24px; border-radius: 16px;
  box-shadow: 0 4px 16px rgba(79, 124, 255, 0.06);
}
.lesson-page { display: grid; grid-template-columns: 220px 1fr 220px; gap: 30px; }
.lesson-sidebar, .lesson-partner { background: var(--card); padding: 24px; border-radius: 16px; height: fit-content; }
.lesson-sidebar ul { list-style: none; }
.lesson-sidebar li { padding: 10px; border-radius: 8px; margin-bottom: 6px; cursor: pointer; }
.lesson-sidebar li.active { background: var(--primary-light); color: var(--primary); }
.lesson-main {
  background: var(--card); padding: 40px; border-radius: 20px;
  box-shadow: 0 8px 24px rgba(79, 124, 255, 0.08);
}
.question-card { background: var(--bg); padding: 24px; border-radius: 16px; margin-bottom: 20px; }
.options { list-style: none; margin-top: 12px; }
.option-btn {
  display: block; width: 100%; text-align: left; padding: 12px 16px;
  margin-bottom: 8px; border: 1px solid var(--border); border-radius: 10px;
  background: white; cursor: pointer;
}
.option-btn:hover { border-color: var(--primary); }
.feedback { margin-top: 12px; font-weight: 600; }
.practice-layout { display: grid; grid-template-columns: 1fr 260px; gap: 30px; }
.practice-card {
  background: var(--card); padding: 24px; border-radius: 16px; margin-bottom: 20px;
  box-shadow: 0 4px 16px rgba(79, 124, 255, 0.06);
}
.practice-card pre {
  background: var(--bg); padding: 16px; border-radius: 10px;
  overflow-x: auto; margin-bottom: 12px;
}
.practice-card input {
  width: 100%; padding: 12px; border: 1px solid var(--border);
  border-radius: 10px; margin: 12px 0;
}
.tip-card { background: var(--card); padding: 24px; border-radius: 16px; text-align: center; }
.tip-card img { width: 80px; height: 80px; border-radius: 50%; margin-bottom: 12px; }
.wrong-card {
  background: var(--card); padding: 24px; border-radius: 16px; margin-bottom: 20px;
  box-shadow: 0 4px 16px rgba(79, 124, 255, 0.06);
}
.wrong-meta { display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
.wrong-meta span {
  background: var(--primary-light); color: var(--primary);
  padding: 6px 12px; border-radius: 20px; font-size: 14px;
}
.review-schedule { display: flex; gap: 12px; margin-top: 16px; }
.review-node {
  background: var(--primary); color: white;
  padding: 8px 16px; border-radius: 20px; font-size: 14px;
}
.review-timeline { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.review-stage {
  background: var(--card); padding: 24px; border-radius: 16px;
  box-shadow: 0 4px 16px rgba(79, 124, 255, 0.06);
}
.review-stage ul { list-style: none; }
.review-stage li { padding: 10px; background: var(--primary-light); border-radius: 10px; margin-bottom: 8px; }
.profile-header { text-align: center; margin-bottom: 40px; }
.avatar {
  width: 100px; height: 100px; border-radius: 50%; object-fit: cover;
  background: var(--primary-light); margin-bottom: 16px;
}
.profile-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 40px; }
.ability-section { background: var(--card); padding: 24px; border-radius: 16px; }
.ability-item { margin-bottom: 16px; }
.bar { width: 100%; height: 12px; background: var(--bg); border-radius: 10px; margin-top: 8px; }
.bar-fill { height: 100%; background: var(--primary); border-radius: 10px; }
.footer {
  text-align: center; padding: 24px; color: var(--text-light);
  border-top: 1px solid var(--border); margin-top: 40px;
}
"@ | Set-Content -Path css/style.css -Encoding UTF8

# ========== 9. js/app.js ==========
@"
document.addEventListener("DOMContentLoaded", function () {
  loadProgress();
  initTaskList();
  initOptionButtons();
  renderReviewQueue();
  updateDashboardStats();
  updateProfileStats();
});

function initTaskList() {
  const tasks = document.querySelectorAll("#task-list li");
  tasks.forEach(task => {
    task.addEventListener("click", function () {
      const taskName = this.getAttribute("data-task");
      completeTask(taskName);
      this.style.background = "var(--success)";
      this.style.color = "white";
    });
  });
}

function initOptionButtons() {
  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", function () {
      const correct = this.getAttribute("data-answer") === "true";
      const feedback = this.closest(".question-card").querySelector(".feedback");
      if (correct) {
        this.style.background = "var(--success)";
        this.style.color = "white";
        feedback.textContent = "回答正确！";
        feedback.style.color = "var(--success)";
      } else {
        this.style.background = "var(--danger)";
        this.style.color = "white";
        feedback.textContent = "回答错误，请注意理解概念。";
        feedback.style.color = "var(--danger)";
        addToWrongBook(this);
      }
    });
  });
}

function completeTask(taskName) {
  const progress = getProgress();
  if (!progress.completedTasks.includes(taskName)) progress.completedTasks.push(taskName);
  saveProgress(progress);
}

function addToWrongBook(btn) {
  const progress = getProgress();
  const questionText = btn.closest(".question-card").querySelector(".question-stem").textContent;
  progress.wrongBook.push({ question: questionText, time: Date.now() });
  saveProgress(progress);
}

function renderReviewQueue() {
  const progress = getProgress();
  const reviewList = document.getElementById("review-list");
  if (!reviewList) return;
  if (progress.reviewQueue.length === 0) {
    reviewList.innerHTML = '<p class="empty">暂无待复习内容，完成练习后自动加入。</p>';
    return;
  }
  reviewList.innerHTML = "";
  progress.reviewQueue.forEach(item => {
    const div = document.createElement("div");
    div.className = "review-item";
    div.textContent = item;
    reviewList.appendChild(div);
  });
}

function updateDashboardStats() {
  const progress = getProgress();
  if (document.getElementById("stat-continuous-days")) {
    document.getElementById("stat-continuous-days").textContent = progress.continuousDays;
    document.getElementById("stat-today-minutes").textContent = progress.todayMinutes;
    document.getElementById("stat-skills").textContent = progress.skills.length;
    document.getElementById("stat-accuracy").textContent = progress.accuracy + "%";
  }
}

function updateProfileStats() {
  const progress = getProgress();
  if (document.getElementById("profile-continuous")) {
    document.getElementById("profile-continuous").textContent = progress.continuousDays;
    document.getElementById("profile-minutes").textContent = progress.totalMinutes;
    document.getElementById("profile-questions").textContent = progress.totalQuestions;
    document.getElementById("profile-retry").textContent = progress.retryRate + "%";
  }
}
"@ | Set-Content -Path js/app.js -Encoding UTF8

# ========== 10. js/progress.js ==========
@"
function getProgress() {
  const defaultProgress = {
    level: "入门阶段", todayTask: "完成第 1 课主动回忆练习",
    continuousDays: 7, todayMinutes: 22, totalMinutes: 180,
    skills: ["printf", "main_function"], accuracy: 75, totalQuestions: 40, retryRate: 60,
    completedTasks: [], wrongBook: [],
    reviewQueue: ["第 1 天复习：printf 输出预测", "第 3 天复习：主动回忆默写"]
  };
  const saved = localStorage.getItem("cLearnProgress");
  return saved ? JSON.parse(saved) : defaultProgress;
}
function saveProgress(progress) {
  localStorage.setItem("cLearnProgress", JSON.stringify(progress));
}
function loadProgress() { getProgress(); }
"@ | Set-Content -Path js/progress.js -Encoding UTF8

# ========== 11. js/data.js ==========
@"
const courseData = {
  courseId: "c_c_basic", title: "C 语言入门闭环",
  modules: [{
    id: "module_1", title: "建立最小程序能力",
    lessons: [{
      id: "lesson_1", title: "写出最小 C 程序", duration: 25,
      completionStandard: [
        "能说出最小程序各部分作用", "能不看提示写出基础程序骨架",
        "能改写输出内容", "能识别常见错误"
      ],
      steps: ["diagnosis", "explain", "breakdown", "practice", "recall", "task", "error", "review"]
    }]
  }]
};
"@ | Set-Content -Path js/data.js -Encoding UTF8

# ========== 12. js/questions.js ==========
@"
const questionBank = [
  {
    id: "q_printf_001", skill: "printf", type: "output_prediction", level: "understand",
    stem: "下面程序运行后，最可能的输出是什么？",
    code: '#include <stdio.h>\nint main() {\n  printf("Hello");\n  return 0;\n}',
    options: ["Hello", "Hello World", "0", "编译错误"], answer: 0,
    misconceptions: ["漏看输出内容", "误解 return 0 的作用"],
    explanation: "printf 负责输出双引号内的文本；这里没有换行符，也没有其他输出。",
    nextStep: "重做 printf 输出预测题，再进入主动回忆。"
  },
  {
    id: "q_main_001", skill: "main_function", type: "concept", level: "recognize",
    stem: "C 程序的入口函数通常是？",
    options: ["start()", "main()", "begin()", "run()"], answer: 1,
    misconceptions: ["混淆入口函数名称"],
    explanation: "大多数 C 程序从 main 函数开始执行。",
    nextStep: "记忆 main 函数是程序入口。"
  },
  {
    id: "q_error_001", skill: "syntax_error", type: "find_error", level: "apply",
    stem: "这段程序可能存在什么问题？",
    code: '#include <stdio.h>\nint main() {\n  printf("Hello")\n  return 0;\n}',
    options: ["缺少分号", "缺少头文件", "缺少变量", "没有错误"], answer: 0,
    misconceptions: ["忽略语句结束符"],
    explanation: "printf 语句末尾缺少分号，会导致编译错误。",
    nextStep: "练习识别漏分号错误。"
  }
];
"@ | Set-Content -Path js/questions.js -Encoding UTF8

Write-Host "✅ 所有文件生成完成！"
Write-Host "请把布偶猫图片改名为 mascot.png 放入 assets 文件夹"
Write-Host "然后直接上传整个文件夹到 GitHub 仓库开启 Pages 即可访问"
pause
