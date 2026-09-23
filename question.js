const questionBank = [
  {
    id: "q_printf_001",
    skill: "printf",
    type: "output_prediction",
    level: "understand",
    stem: "下面程序运行后，最可能的输出是什么？",
    code: '#include <stdio.h>\nint main() {\n  printf("Hello");\n  return 0;\n}',
    options: ["Hello", "Hello World", "0", "编译错误"],
    answer: 0,
    misconceptions: ["漏看输出内容", "误解 return 0 的作用"],
    explanation: "printf 负责输出双引号内的文本；这里没有换行符，也没有其他输出。",
    nextStep: "重做 printf 输出预测题，再进入主动回忆。"
  },
  {
    id: "q_main_001",
    skill: "main_function",
    type: "concept",
    level: "recognize",
    stem: "C 程序的入口函数通常是？",
    options: ["start()", "main()", "begin()", "run()"],
    answer: 1,
    misconceptions: ["混淆入口函数名称"],
    explanation: "大多数 C 程序从 main 函数开始执行。",
    nextStep: "记忆 main 函数是程序入口。"
  },
  {
    id: "q_error_001",
    skill: "syntax_error",
    type: "find_error",
    level: "apply",
    stem: "这段程序可能存在什么问题？",
    code: '#include <stdio.h>\nint main() {\n  printf("Hello")\n  return 0;\n}',
    options: ["缺少分号", "缺少头文件", "缺少变量", "没有错误"],
    answer: 0,
    misconceptions: ["忽略语句结束符"],
    explanation: "printf 语句末尾缺少分号，会导致编译错误。",
    nextStep: "练习识别漏分号错误。"
  }
];
