export interface LearningTask {
  id: string;
  type: "vocabulary" | "grammar" | "listening" | "reading" | "review";
  title: string;
  description: string;
  duration: number;
  priority: "high" | "medium" | "low";
  completed: boolean;
}

export interface WeakArea {
  category: string;
  score: number;
  target: number;
  suggestions: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface StudyPlan {
  date: string;
  tasks: LearningTask[];
  totalDuration: number;
  completedTasks: number;
}

export interface LearningStats {
  totalWords: number;
  masteredWords: number;
  streakDays: number;
  totalStudyTime: number;
  averageAccuracy: number;
  weeklyProgress: number[];
}

export const generateDailyPlan = (): StudyPlan => {
  const tasks: LearningTask[] = [
    {
      id: "1",
      type: "review",
      title: "复习昨日单词",
      description: "使用SRS系统复习待复习单词",
      duration: 15,
      priority: "high",
      completed: false,
    },
    {
      id: "2",
      type: "vocabulary",
      title: "学习新单词",
      description: "学习10个新单词",
      duration: 20,
      priority: "high",
      completed: false,
    },
    {
      id: "3",
      type: "grammar",
      title: "语法练习",
      description: "完成语法练习题",
      duration: 15,
      priority: "medium",
      completed: false,
    },
    {
      id: "4",
      type: "listening",
      title: "听力训练",
      description: "场景对话练习",
      duration: 10,
      priority: "medium",
      completed: false,
    },
    {
      id: "5",
      type: "reading",
      title: "新闻精读",
      description: "阅读一篇外刊文章",
      duration: 15,
      priority: "low",
      completed: false,
    },
  ];

  return {
    date: new Date().toISOString().split("T")[0],
    tasks,
    totalDuration: tasks.reduce((sum, t) => sum + t.duration, 0),
    completedTasks: 0,
  };
};

export const weakAreas: WeakArea[] = [
  {
    category: "现在完成时",
    score: 0,
    target: 80,
    suggestions: [
      "复习现在完成时的基本结构：have/has + 过去分词",
      "练习区分现在完成时和一般过去时",
      "完成10道现在完成时练习题",
    ],
  },
  {
    category: "商务词汇",
    score: 0,
    target: 80,
    suggestions: [
      "重点记忆：negotiate, pragmatic, resilient, meticulous",
      "阅读商务场景文章，积累词汇",
      "使用单词卡片每天复习15分钟",
    ],
  },
  {
    category: "听力辨音",
    score: 0,
    target: 75,
    suggestions: [
      "每天听15分钟英语播客",
      "练习机场、餐厅等场景的对话",
      "使用0.75倍速反复听难句",
    ],
  },
  {
    category: "定语从句",
    score: 0,
    target: 75,
    suggestions: [
      "复习关系代词：who, which, that, whose",
      "区分限制性和非限制性定语从句",
      "完成定语从句专项练习",
    ],
  },
];

export const achievements: Achievement[] = [
  {
    id: "1",
    title: "初学者",
    description: "完成第一天的学习计划",
    icon: "🌱",
    unlocked: false,
  },
  {
    id: "2",
    title: "坚持者",
    description: "连续学习7天",
    icon: "🔥",
    unlocked: false,
  },
  {
    id: "3",
    title: "词汇达人",
    description: "掌握100个单词",
    icon: "📚",
    unlocked: false,
  },
  {
    id: "4",
    title: "语法大师",
    description: "完成所有初级语法课程",
    icon: "🎯",
    unlocked: false,
  },
  {
    id: "5",
    title: "听力专家",
    description: "完成所有听力场景练习",
    icon: "🎧",
    unlocked: false,
  },
  {
    id: "6",
    title: "阅读能手",
    description: "精读20篇文章",
    icon: "📰",
    unlocked: false,
  },
  {
    id: "7",
    title: "完美 streak",
    description: "连续学习30天",
    icon: "🏆",
    unlocked: false,
  },
  {
    id: "8",
    title: "学霸",
    description: "单日学习超过2小时",
    icon: "⭐",
    unlocked: false,
  },
];

export const learningStats: LearningStats = {
  totalWords: 0,
  masteredWords: 0,
  streakDays: 0,
  totalStudyTime: 0,
  averageAccuracy: 0,
  weeklyProgress: [0, 0, 0, 0, 0, 0, 0],
};

export const getPersonalizedAdvice = (): string[] => {
  const advice: string[] = [];
  
  advice.push("欢迎开始你的英语学习之旅！建议从「词汇积累」模块开始，每天学习10个新单词。");
  advice.push("语法学习推荐从「一般现在时」和「一般过去时」开始，打好基础后再进阶。");
  advice.push("记得每天使用「智能复习」功能，艾宾浩斯遗忘曲线会帮你安排最佳复习时间。");
  advice.push("完成每日学习计划可以解锁成就，坚持7天即可获得「坚持者」成就！");
  
  return advice;
};
