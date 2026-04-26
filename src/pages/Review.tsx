import { useState } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Flame,
  Target,
  TrendingUp,
  Settings,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { reviewItems, dailyStats, ebbinghausData, radarData, pieData, barData } from "@/data/review";

export default function Review() {
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month">("week");
  const [filter, setFilter] = useState("all");
  const [dailyGoal, setDailyGoal] = useState(20);
  const [newWordLimit, setNewWordLimit] = useState(10);

  const urgencyColors: Record<string, string> = {
    high: "border-coral bg-coral/5",
    medium: "border-amber bg-amber/5",
    low: "border-sage bg-sage/5",
  };

  const filteredItems = reviewItems.filter((item) => {
    if (filter === "all") return true;
    if (filter === "overdue") return item.urgency === "high";
    if (filter === "today") return item.urgency === "medium";
    if (filter === "soon") return item.urgency === "low";
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-2">
          智能复习
        </h1>
        <p className="text-sm sm:text-base text-inkLight">
          基于艾宾浩斯遗忘曲线，在最佳记忆窗口期推送复习内容
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {[
          {
            label: "今日待复习",
            value: "23",
            icon: Clock,
            color: "text-coral",
            bg: "bg-coral/10",
          },
          {
            label: "连续打卡",
            value: "7",
            icon: Flame,
            color: "text-amber",
            bg: "bg-amber/10",
          },
          {
            label: "掌握词汇",
            value: "156",
            icon: Target,
            color: "text-sage",
            bg: "bg-sage/10",
          },
          {
            label: "本周学习",
            value: "4.2h",
            icon: TrendingUp,
            color: "text-teal",
            bg: "bg-teal/10",
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-border p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted">{stat.label}</span>
                <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </div>
              <div className="text-2xl font-bold text-ink">{stat.value}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
        {/* Ebbinghaus Curve */}
        <div className="bg-white rounded-xl border border-border p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <h2 className="font-semibold text-ink">遗忘曲线</h2>
            <div className="flex gap-1">
              {(["day", "week", "month"] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    timeRange === range
                      ? "bg-amber text-white"
                      : "bg-surface text-inkLight"
                  }`}
                >
                  {range === "day" ? "1天" : range === "week" ? "1周" : "1月"}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={ebbinghausData}>
              <defs>
                <linearGradient id="retentionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F2A93B" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#F2A93B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E1DA" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E5E1DA",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="retention"
                stroke="#F2A93B"
                fill="url(#retentionGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-4 flex items-center gap-4 text-xs text-muted">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-amber" />
              <span>最佳复习窗口</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-coral" />
              <span>临界区域 (&lt;30%)</span>
            </div>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="bg-white rounded-xl border border-border p-4 sm:p-6">
          <h2 className="font-semibold text-ink mb-6">能力雷达</h2>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#E5E1DA" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
              <Radar
                name="当前水平"
                dataKey="A"
                stroke="#F2A93B"
                fill="#F2A93B"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Review Queue */}
      <div className="bg-white rounded-xl border border-border p-4 sm:p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <h2 className="font-semibold text-ink">复习队列</h2>
          <div className="flex gap-1 flex-wrap">
            {["all", "overdue", "today", "soon"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filter === f
                    ? "bg-amber text-white"
                    : "bg-surface text-inkLight"
                }`}
              >
                {f === "all"
                  ? "全部"
                  : f === "overdue"
                  ? "逾期"
                  : f === "today"
                  ? "今日"
                  : "即将到期"}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border gap-4 ${
                urgencyColors[item.urgency]
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-2 h-12 rounded-full flex-shrink-0 ${
                    item.urgency === "high"
                      ? "bg-coral"
                      : item.urgency === "medium"
                      ? "bg-amber"
                      : "bg-sage"
                  }`}
                />
                <div>
                  <div className="font-medium text-ink">{item.word}</div>
                  <div className="text-sm text-muted">
                    {item.category} · 间隔 {item.interval} 天 · 易度 {item.ease}
                  </div>
                </div>
              </div>
              <button className="w-full sm:w-auto px-4 py-2 bg-amber text-white rounded-lg text-sm font-medium hover:bg-amber/90 transition-colors">
                复习
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Heatmap & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
        {/* Retention Heatmap */}
        <div className="bg-white rounded-xl border border-border p-4 sm:p-6">
          <h2 className="font-semibold text-ink mb-6">留存热力图</h2>
          <div className="grid grid-cols-7 gap-2">
            {dailyStats.slice(0, 35).map((day, index) => (
              <motion.div
                key={day.date}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02 }}
                className="aspect-square rounded-md flex items-center justify-center text-xs font-medium"
                style={{
                  backgroundColor:
                    day.retention > 80
                      ? "#7CC67A"
                      : day.retention > 60
                      ? "#F2A93B"
                      : "#E05263",
                  color: "#fff",
                }}
                title={`${day.date}: ${day.retention}% 留存, ${day.reviewed} 项复习`}
              >
                {day.reviewed}
              </motion.div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-sage" />
              <span>高留存 (&gt;80%)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-amber" />
              <span>中等 (60-80%)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-coral" />
              <span>需复习 (&lt;60%)</span>
            </div>
          </div>
        </div>

        {/* Distribution Charts */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-border p-4 sm:p-6">
            <h2 className="font-semibold text-ink mb-4">掌握度分布</h2>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 text-xs">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center gap-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>
                    {item.name} ({item.value})
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border p-4 sm:p-6">
            <h2 className="font-semibold text-ink mb-4">评分分布</h2>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E1DA" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Bar dataKey="count" fill="#F2A93B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-xl border border-border p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-6">
          <Settings className="w-5 h-5 text-muted" />
          <h2 className="font-semibold text-ink">学习设置</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-inkLight">每日复习目标</span>
              <span className="text-sm font-medium text-ink">{dailyGoal} 个单词</span>
            </div>
            <input
              type="range"
              min={5}
              max={50}
              value={dailyGoal}
              onChange={(e) => setDailyGoal(Number(e.target.value))}
              className="w-full h-2 bg-surface rounded-full appearance-none cursor-pointer accent-amber"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-inkLight">新词上限</span>
              <span className="text-sm font-medium text-ink">{newWordLimit} 个/天</span>
            </div>
            <input
              type="range"
              min={5}
              max={30}
              value={newWordLimit}
              onChange={(e) => setNewWordLimit(Number(e.target.value))}
              className="w-full h-2 bg-surface rounded-full appearance-none cursor-pointer accent-amber"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-inkLight">易度系数初始值</span>
              <span className="text-sm font-medium text-ink">2.5</span>
            </div>
            <input
              type="range"
              min={1.3}
              max={3.0}
              step={0.1}
              defaultValue={2.5}
              className="w-full h-2 bg-surface rounded-full appearance-none cursor-pointer accent-amber"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
