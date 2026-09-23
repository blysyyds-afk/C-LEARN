function getProgress() {
  const defaultProgress = {
    level: "入门阶段",
    todayTask: "完成第 1 课主动回忆练习",
    continuousDays: 7,
    todayMinutes: 22,
    totalMinutes: 180,
    skills: ["printf", "main_function"],
    accuracy: 75,
    totalQuestions: 40,
    retryRate: 60,
    completedTasks: [],
    wrongBook: [],
    reviewQueue: ["第 1 天复习：printf 输出预测", "第 3 天复习：主动回忆默写"]
  };

  const saved = localStorage.getItem("cLearnProgress");
  return saved ? JSON.parse(saved) : defaultProgress;
}

function saveProgress(progress) {
  localStorage.setItem("cLearnProgress", JSON.stringify(progress));
}

function loadProgress() {
  getProgress();
}
