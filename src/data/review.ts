export interface ReviewItem {
  id: string;
  word: string;
  category: string;
  urgency: "high" | "medium" | "low";
  interval: number;
  ease: number;
  lastReviewed: string;
  nextReview: string;
  streak: number;
}

export interface DailyStats {
  date: string;
  reviewed: number;
  newWords: number;
  correctRate: number;
  timeSpent: number;
  retention: number;
}

export const reviewItems: ReviewItem[] = [
  {
    id: "1",
    word: "Serendipity",
    category: "情感",
    urgency: "high",
    interval: 5,
    ease: 2.5,
    lastReviewed: "2026-04-21",
    nextReview: "2026-04-26",
    streak: 3,
  },
  {
    id: "2",
    word: "Resilient",
    category: "商务",
    urgency: "medium",
    interval: 3,
    ease: 2.3,
    lastReviewed: "2026-04-23",
    nextReview: "2026-04-26",
    streak: 5,
  },
  {
    id: "3",
    word: "Eloquent",
    category: "学术",
    urgency: "low",
    interval: 8,
    ease: 2.8,
    lastReviewed: "2026-04-18",
    nextReview: "2026-04-26",
    streak: 7,
  },
  {
    id: "4",
    word: "Paradigm",
    category: "学术",
    urgency: "high",
    interval: 2,
    ease: 1.8,
    lastReviewed: "2026-04-24",
    nextReview: "2026-04-26",
    streak: 1,
  },
  {
    id: "5",
    word: "Ubiquitous",
    category: "科技",
    urgency: "medium",
    interval: 4,
    ease: 2.4,
    lastReviewed: "2026-04-22",
    nextReview: "2026-04-26",
    streak: 4,
  },
  {
    id: "6",
    word: "Ambiguous",
    category: "学术",
    urgency: "low",
    interval: 7,
    ease: 2.7,
    lastReviewed: "2026-04-19",
    nextReview: "2026-04-26",
    streak: 6,
  },
  {
    id: "7",
    word: "Pragmatic",
    category: "商务",
    urgency: "medium",
    interval: 3,
    ease: 2.2,
    lastReviewed: "2026-04-23",
    nextReview: "2026-04-26",
    streak: 2,
  },
  {
    id: "8",
    word: "Meticulous",
    category: "商务",
    urgency: "high",
    interval: 1,
    ease: 1.5,
    lastReviewed: "2026-04-25",
    nextReview: "2026-04-26",
    streak: 0,
  },
];

export const dailyStats: DailyStats[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date("2026-04-01");
  date.setDate(date.getDate() + i);
  return {
    date: date.toISOString().split("T")[0],
    reviewed: Math.floor(Math.random() * 30) + 5,
    newWords: Math.floor(Math.random() * 10) + 1,
    correctRate: Math.floor(Math.random() * 30) + 70,
    timeSpent: Math.floor(Math.random() * 45) + 15,
    retention: Math.floor(Math.random() * 40) + 60,
  };
});

export const ebbinghausData = [
  { day: "第1天", retention: 100, optimal: true },
  { day: "第2天", retention: 55, optimal: false },
  { day: "第3天", retention: 42, optimal: false },
  { day: "第5天", retention: 38, optimal: false },
  { day: "第8天", retention: 35, optimal: true },
  { day: "第12天", retention: 30, optimal: true },
  { day: "第20天", retention: 28, optimal: true },
  { day: "第30天", retention: 25, optimal: false },
  { day: "第45天", retention: 22, optimal: false },
];

export const radarData = [
  { subject: "词汇", A: 80, fullMark: 100 },
  { subject: "语法", A: 65, fullMark: 100 },
  { subject: "听力", A: 70, fullMark: 100 },
  { subject: "阅读", A: 75, fullMark: 100 },
  { subject: "口语", A: 55, fullMark: 100 },
  { subject: "写作", A: 60, fullMark: 100 },
];

export const pieData = [
  { name: "已掌握", value: 156, color: "#7CC67A" },
  { name: "学习中", value: 89, color: "#F2A93B" },
  { name: "待复习", value: 23, color: "#E05263" },
];

export const barData = [
  { name: "Again", count: 12 },
  { name: "Hard", count: 28 },
  { name: "Good", count: 156 },
  { name: "Easy", count: 72 },
];
