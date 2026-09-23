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
  if (!progress.completedTasks.includes(taskName)) {
    progress.completedTasks.push(taskName);
  }
  saveProgress(progress);
}

function addToWrongBook(btn) {
  const progress = getProgress();
  const questionText = btn.closest(".question-card").querySelector(".question-stem").textContent;
  progress.wrongBook.push({
    question: questionText,
    time: Date.now()
  });
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
