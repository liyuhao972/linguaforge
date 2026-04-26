import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Headphones, Newspaper, BarChart3, ArrowRight, Brain, Flame, Target, Clock, ChevronRight, Award, Zap, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { generateDailyPlan, weakAreas, achievements, learningStats, getPersonalizedAdvice } from "@/data/teacherAgent";

const modules = [
    {
      title: "词汇积累",
      description: "3D翻转单词卡片，SRS记忆模式，9大主题分类",
      icon: GraduationCap,
      path: "/vocabulary",
      color: "bg-amber",
      stats: `${learningStats.totalWords} 词`,
    },
    {
      title: "语法教学",
      description: "9色语法标注，互动例句，30个核心语法主题",
      icon: BookOpen,
      path: "/grammar",
      color: "bg-coral",
      stats: "0/30 单元",
    },
    {
      title: "听说训练",
      description: "6大真实场景，录音模拟，发音反馈",
      icon: Headphones,
      path: "/listening",
      color: "bg-teal",
      stats: "0/6 场景",
    },
    {
      title: "新闻精读",
      description: "精选外刊文章，语法拆解，理解测验",
      icon: Newspaper,
      path: "/reading",
      color: "bg-deepBlue",
      stats: "0 篇",
    },
    {
      title: "智能复习",
      description: "艾宾浩斯遗忘曲线，最佳复习窗口",
      icon: BarChart3,
      path: "/review",
      color: "bg-lavender",
      stats: "0 待复习",
    },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function Home() {
  const [streak] = useState(learningStats.streakDays);
  const [dailyGoal] = useState({ current: 0, target: 60 });
  const dailyPlan = generateDailyPlan();
  const advice = getPersonalizedAdvice();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-parchment pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber/10 text-amber text-sm font-medium mb-6">
                <Flame className="w-4 h-4" />
                <span>连续学习 {streak} 天</span>
              </div>
              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-ink leading-tight mb-6">
                锻造你的
                <br />
                <span className="text-amber">英语能力</span>
              </h1>
              <p className="text-base sm:text-lg text-inkLight max-w-lg mb-8">
                基于艾宾浩斯遗忘曲线的智能学习平台，融合词汇、语法、听说、精读四大核心模块，让英语学习更高效、更科学。
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                <Link
                  to="/vocabulary"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber text-white rounded-lg font-medium hover:bg-amber/90 transition-colors"
                >
                  开始学习
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/review"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-surface text-ink rounded-lg font-medium hover:bg-border transition-colors"
                >
                  <Clock className="w-4 h-4" />
                  今日复习 ({dailyGoal.current}/{dailyGoal.target} 分钟)
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white rounded-2xl shadow-xl p-6 border border-border">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-ink">学习仪表盘</h3>
                  <div className="flex items-center gap-1 text-sm text-muted">
                    <Target className="w-4 h-4" />
                    <span>今日目标</span>
                  </div>
                </div>

                {/* Progress Ring */}
                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-40 h-40">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="#E5E1DA"
                        strokeWidth="8"
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="#F2A93B"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${(dailyGoal.current / dailyGoal.target) * 264} 264`}
                        initial={{ strokeDashoffset: 264 }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-ink">{Math.round((dailyGoal.current / dailyGoal.target) * 100)}%</span>
                      <span className="text-sm text-muted">已完成</span>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-surface rounded-lg">
                    <div className="text-2xl font-bold text-sage">{learningStats.masteredWords}</div>
                    <div className="text-xs text-muted">已掌握词汇</div>
                  </div>
                  <div className="text-center p-3 bg-surface rounded-lg">
                    <div className="text-2xl font-bold text-coral">{learningStats.masteredWords}</div>
                    <div className="text-xs text-muted">待复习</div>
                  </div>
                  <div className="text-center p-3 bg-surface rounded-lg">
                    <div className="text-2xl font-bold text-teal">{learningStats.totalStudyTime}h</div>
                    <div className="text-xs text-muted">总学习时长</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Daily Plan Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-ink mb-2">今日学习计划</h2>
              <p className="text-sm sm:text-base text-inkLight">根据你的学习进度和遗忘曲线智能生成</p>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-2xl font-bold text-amber">{dailyPlan.completedTasks}/{dailyPlan.tasks.length}</div>
              <div className="text-sm text-muted">已完成任务</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dailyPlan.tasks.map((task, i) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-4 rounded-xl border transition-all ${
                  task.completed
                    ? "bg-sage/5 border-sage/20"
                    : "bg-white border-border hover:shadow-md"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    task.type === "vocabulary" ? "bg-amber/10" :
                    task.type === "grammar" ? "bg-coral/10" :
                    task.type === "listening" ? "bg-teal/10" :
                    task.type === "reading" ? "bg-deepBlue/10" :
                    "bg-lavender/10"
                  }`}>
                    {task.type === "vocabulary" ? <GraduationCap className="w-4 h-4 text-amber" /> :
                     task.type === "grammar" ? <BookOpen className="w-4 h-4 text-coral" /> :
                     task.type === "listening" ? <Headphones className="w-4 h-4 text-teal" /> :
                     task.type === "reading" ? <Newspaper className="w-4 h-4 text-deepBlue" /> :
                     <BarChart3 className="w-4 h-4 text-lavender" />}
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    task.priority === "high" ? "bg-coral/10 text-coral" :
                    task.priority === "medium" ? "bg-amber/10 text-amber" :
                    "bg-sage/10 text-sage"
                  }`}>
                    {task.priority === "high" ? "高" : task.priority === "medium" ? "中" : "低"}
                  </span>
                </div>
                <h3 className="font-semibold text-ink mb-1">{task.title}</h3>
                <p className="text-sm text-inkLight mb-3">{task.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted">{task.duration} 分钟</span>
                  {task.completed ? (
                    <span className="text-xs text-sage font-medium">已完成</span>
                  ) : (
                    <Link
                      to={`/${task.type === "review" ? "review" : task.type}`}
                      className="text-xs text-amber font-medium flex items-center gap-1"
                    >
                      开始 <ChevronRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-12"
          >
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-4">
              五大核心模块
            </h2>
            <p className="text-inkLight max-w-2xl mx-auto">
              全方位提升英语能力，从词汇积累到语法掌握，从听说训练到文章精读
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, i) => {
              const Icon = module.icon;
              return (
                <motion.div
                  key={module.path}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={i + 1}
                >
                  <Link
                    to={module.path}
                    className="group block bg-white rounded-xl p-6 border border-border hover:border-amber/50 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-lg ${module.color} flex items-center justify-center`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm font-medium text-muted bg-surface px-2 py-1 rounded-full">
                        {module.stats}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg text-ink mb-2 group-hover:text-amber transition-colors">
                      {module.title}
                    </h3>
                    <p className="text-sm text-inkLight mb-4">
                      {module.description}
                    </p>
                    <div className="flex items-center text-sm text-amber font-medium">
                      进入学习
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Teacher Agent Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lavender/10 text-lavender text-sm font-medium mb-6">
                <Brain className="w-4 h-4" />
                <span>AI 智能导师</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-4">
                你的专属英语老师
              </h2>
              <p className="text-inkLight mb-6">
                Teacher Agent 基于你的学习数据，动态调整学习计划。它会分析你的薄弱环节，推送针对性练习，并在最佳记忆窗口期提醒复习。
              </p>
              
              {/* Weak Areas */}
              <div className="bg-surface rounded-xl p-6 mb-6">
                <h3 className="font-semibold text-ink mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-coral" />
                  薄弱环节
                </h3>
                <div className="space-y-3">
                  {weakAreas.map((area) => (
                    <div key={area.category}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-inkLight">{area.category}</span>
                        <span className="text-sm font-medium text-ink">{area.score}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              area.score < 50 ? "bg-coral" :
                              area.score < 70 ? "bg-amber" :
                              "bg-sage"
                            }`}
                            style={{ width: `${area.score}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted w-10">目标 {area.target}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Personalized Advice */}
              <div className="bg-amber/5 rounded-xl p-6 border border-amber/20">
                <h3 className="font-semibold text-ink mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber" />
                  个性化建议
                </h3>
                <ul className="space-y-2">
                  {advice.map((item, i) => (
                    <li key={i} className="text-sm text-inkLight flex items-start gap-2">
                      <span className="text-amber mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <div className="space-y-6">
              {/* Agent Status Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-6 border border-border"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-lavender/10 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-lavender" />
                  </div>
                  <div>
                    <div className="font-semibold text-ink">Teacher Agent</div>
                    <div className="text-xs text-muted">在线 · 正在分析你的学习数据</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-surface rounded-lg p-4">
                    <div className="text-sm font-medium text-ink mb-2">今日学习建议</div>
                    <p className="text-sm text-inkLight">
                      根据你的遗忘曲线，今天有 <span className="text-coral font-medium">23</span> 个单词处于临界复习期。建议优先复习「商务词汇」分类，你的掌握度只有 62%。
                    </p>
                  </div>

                  <div className="bg-surface rounded-lg p-4">
                    <div className="text-sm font-medium text-ink mb-2">学习统计</div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-2 bg-white rounded-lg">
                        <div className="text-lg font-bold text-ink">{learningStats.averageAccuracy}%</div>
                        <div className="text-xs text-muted">平均正确率</div>
                      </div>
                      <div className="text-center p-2 bg-white rounded-lg">
                        <div className="text-lg font-bold text-ink">{learningStats.totalStudyTime}h</div>
                        <div className="text-xs text-muted">总学习时长</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber/5 border border-amber/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-amber mb-1">
                      <Flame className="w-4 h-4" />
                      连续打卡挑战
                    </div>
                    <p className="text-sm text-inkLight">
                      再坚持 3 天即可达成「10天 streak」成就！今日任务：完成 30 分钟学习 + 15 个单词复习。
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Achievements */}
              <div className="bg-white rounded-xl border border-border p-6">
                <h3 className="font-semibold text-ink mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber" />
                  成就系统
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`text-center p-2 sm:p-3 rounded-lg transition-colors ${
                        achievement.unlocked
                          ? "bg-amber/10"
                          : "bg-surface opacity-50"
                      }`}
                      title={achievement.description}
                    >
                      <div className="text-xl sm:text-2xl mb-1">{achievement.icon}</div>
                      <div className="text-xs font-medium text-ink">{achievement.title}</div>
                      {achievement.unlocked && (
                        <div className="text-xs text-muted mt-1">已解锁</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Progress */}
              <div className="bg-white rounded-xl border border-border p-6">
                <h3 className="font-semibold text-ink mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-teal" />
                  本周学习趋势
                </h3>
                <div className="flex items-end gap-2 h-24">
                  {learningStats.weeklyProgress.map((progress, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full bg-amber rounded-t-md transition-all"
                        style={{ height: `${progress}%` }}
                      />
                      <span className="text-xs text-muted">
                        {["一", "二", "三", "四", "五", "六", "日"][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
