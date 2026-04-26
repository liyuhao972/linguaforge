import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Check, X, Volume2, Filter, BookOpen, AlertCircle, TrendingUp } from "lucide-react";
import { vocabularyData, categories } from "@/data/vocabulary";

// 艾宾浩斯遗忘曲线间隔（分钟）
const EBINGHAUS_INTERVALS = [1, 5, 25, 120, 600, 3600, 18000]; // 1分, 5分, 25分, 2小时, 10小时, 2.5天, 12.5天

interface ReviewItem {
  wordId: string;
  word: string;
  meaning: string;
  nextReview: number; // timestamp
  intervalIndex: number; // 当前在EBINGHAUS_INTERVALS中的位置
  incorrectCount: number;
  lastReviewed: number;
}

export default function Vocabulary() {
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [flippedCard, setFlippedCard] = useState<string | null>(null);
  const [studyMode, setStudyMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);
  const [sortMode, setSortMode] = useState<"default" | "difficulty" | "random">("default");
  
  // 错题本状态
  const [reviewQueue, setReviewQueue] = useState<ReviewItem[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<ReviewItem[]>([]);
  const [showWrongAnswerMode, setShowWrongAnswerMode] = useState(false);
  const [wrongAnswerIndex, setWrongAnswerIndex] = useState(0);
  const [showWrongAnswerResult, setShowWrongAnswerResult] = useState(false);
  const [sessionStats, setSessionStats] = useState({ correct: 0, incorrect: 0, streak: 0 });

  // 从 localStorage 加载错题本
  useEffect(() => {
    const saved = localStorage.getItem("linguaforge_wrong_answers");
    if (saved) {
      try {
        setWrongAnswers(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load wrong answers:", e);
      }
    }
  }, []);

  // 保存错题本到 localStorage
  useEffect(() => {
    localStorage.setItem("linguaforge_wrong_answers", JSON.stringify(wrongAnswers));
  }, [wrongAnswers]);

  // 计算当前需要复习的错题（已到复习时间）
  const dueReviews = wrongAnswers.filter(item => item.nextReview <= Date.now());

  // 排序单词
  const getSortedWords = () => {
    let words = vocabularyData.filter((w) => {
      const categoryMatch = selectedCategory === "全部" || w.category === selectedCategory;
      const difficultyMatch = !difficultyFilter || w.difficulty === difficultyFilter;
      return categoryMatch && difficultyMatch;
    });
    
    switch (sortMode) {
      case "difficulty":
        const order = { easy: 0, medium: 1, hard: 2 };
        return [...words].sort((a, b) => order[a.difficulty] - order[b.difficulty]);
      case "random":
        return [...words].sort(() => Math.random() - 0.5);
      default:
        return words; // 保持原始顺序（已打乱）
    }
  };

  const filteredWords = getSortedWords();

  const handleFlip = (id: string) => {
    setFlippedCard(flippedCard === id ? null : id);
  };

  const handleStudy = () => {
    setStudyMode(true);
    setCurrentIndex(0);
    setShowAnswer(false);
    setSessionStats({ correct: 0, incorrect: 0, streak: 0 });
  };

  const handleRate = (rating: "again" | "hard" | "good" | "easy") => {
    const currentWord = filteredWords[currentIndex];
    
    if (rating === "again" || rating === "hard") {
      // 答错了 - 加入错题本
      const existingIndex = wrongAnswers.findIndex(w => w.wordId === currentWord.id);
      const now = Date.now();
      
      if (existingIndex >= 0) {
        // 已存在，更新复习间隔
        const updated = [...wrongAnswers];
        const item = updated[existingIndex];
        item.incorrectCount++;
        item.intervalIndex = Math.min(item.intervalIndex + 1, EBINGHAUS_INTERVALS.length - 1);
        item.nextReview = now + EBINGHAUS_INTERVALS[item.intervalIndex] * 60 * 1000;
        item.lastReviewed = now;
        setWrongAnswers(updated);
      } else {
        // 新错题
        setWrongAnswers([...wrongAnswers, {
          wordId: currentWord.id,
          word: currentWord.word,
          meaning: currentWord.meaning,
          nextReview: now + EBINGHAUS_INTERVALS[0] * 60 * 1000,
          intervalIndex: 0,
          incorrectCount: 1,
          lastReviewed: now,
        }]);
      }
      
      setSessionStats(prev => ({ ...prev, incorrect: prev.incorrect + 1, streak: 0 }));
    } else {
      // 答对了 - 如果之前在错题本，更新或移除
      const existingIndex = wrongAnswers.findIndex(w => w.wordId === currentWord.id);
      if (existingIndex >= 0) {
        const updated = [...wrongAnswers];
        const item = updated[existingIndex];
        item.intervalIndex = Math.min(item.intervalIndex + 1, EBINGHAUS_INTERVALS.length - 1);
        item.nextReview = Date.now() + EBINGHAUS_INTERVALS[item.intervalIndex] * 60 * 1000;
        item.lastReviewed = Date.now();
        
        // 如果已经通过多次复习，从错题本移除
        if (item.intervalIndex >= 3) {
          updated.splice(existingIndex, 1);
        }
        setWrongAnswers(updated);
      }
      
      setSessionStats(prev => ({ ...prev, correct: prev.correct + 1, streak: prev.streak + 1 }));
    }
    
    if (currentIndex < filteredWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      setStudyMode(false);
    }
  };

  // 错题复习模式
  const startWrongAnswerReview = () => {
    const due = wrongAnswers.filter(item => item.nextReview <= Date.now());
    if (due.length === 0) {
      alert("暂时没有需要复习的错题！");
      return;
    }
    setReviewQueue(due);
    setShowWrongAnswerMode(true);
    setWrongAnswerIndex(0);
    setShowWrongAnswerResult(false);
  };

  const handleWrongAnswerRate = (known: boolean) => {
    const currentItem = reviewQueue[wrongAnswerIndex];
    const now = Date.now();
    
    if (known) {
      // 答对了 - 推进间隔
      const updated = wrongAnswers.map(item => {
        if (item.wordId === currentItem.wordId) {
          const newIndex = Math.min(item.intervalIndex + 1, EBINGHAUS_INTERVALS.length - 1);
          return {
            ...item,
            intervalIndex: newIndex,
            nextReview: now + EBINGHAUS_INTERVALS[newIndex] * 60 * 1000,
            lastReviewed: now,
          };
        }
        return item;
      });
      setWrongAnswers(updated);
    } else {
      // 又错了 - 重置间隔
      const updated = wrongAnswers.map(item => {
        if (item.wordId === currentItem.wordId) {
          return {
            ...item,
            intervalIndex: 0,
            nextReview: now + EBINGHAUS_INTERVALS[0] * 60 * 1000,
            lastReviewed: now,
            incorrectCount: item.incorrectCount + 1,
          };
        }
        return item;
      });
      setWrongAnswers(updated);
    }
    
    if (wrongAnswerIndex < reviewQueue.length - 1) {
      setWrongAnswerIndex(wrongAnswerIndex + 1);
      setShowWrongAnswerResult(false);
    } else {
      setShowWrongAnswerMode(false);
      alert(`错题复习完成！本次复习了 ${reviewQueue.length} 个单词。`);
    }
  };

  // 错题复习模式 UI
  if (showWrongAnswerMode) {
    const currentItem = reviewQueue[wrongAnswerIndex];
    return (
      <div className="fixed inset-0 z-50 bg-parchment flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-lg">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted">
                {wrongAnswerIndex + 1} / {reviewQueue.length}
              </span>
              <span className="px-2 py-1 bg-coral/10 text-coral text-xs rounded-full">
                错题复习
              </span>
            </div>
            <button
              onClick={() => setShowWrongAnswerMode(false)}
              className="p-2 hover:bg-surface rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.wordId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-xl p-8 min-h-[300px] flex flex-col items-center justify-center text-center border border-border"
            >
              {!showWrongAnswerResult ? (
                <div className="space-y-4">
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">{currentItem.word}</h2>
                  <p className="text-sm text-muted">这个单词你还记得吗？</p>
                  <div className="mt-4 p-4 bg-surface rounded-lg">
                    <p className="text-sm text-muted mb-1">提示</p>
                    <p className="text-inkLight">{currentItem.meaning.substring(0, 3)}...</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-ink">{currentItem.word}</h3>
                  <p className="text-lg text-amber">{currentItem.meaning}</p>
                  <p className="text-sm text-muted">错误次数: {currentItem.incorrectCount}</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-center">
            {!showWrongAnswerResult ? (
              <div className="grid grid-cols-2 gap-4 w-full">
                <button
                  onClick={() => setShowWrongAnswerResult(true)}
                  className="py-3 bg-amber/10 text-amber rounded-lg font-medium hover:bg-amber/20 transition-colors"
                >
                  我不记得了
                </button>
                <button
                  onClick={() => {
                    setShowWrongAnswerResult(true);
                    setTimeout(() => handleWrongAnswerRate(true), 500);
                  }}
                  className="py-3 bg-sage/10 text-sage rounded-lg font-medium hover:bg-sage/20 transition-colors"
                >
                  我记得
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 w-full">
                <button
                  onClick={() => handleWrongAnswerRate(false)}
                  className="py-3 bg-coral/10 text-coral rounded-lg font-medium hover:bg-coral/20 transition-colors"
                >
                  又忘了 😅
                </button>
                <button
                  onClick={() => handleWrongAnswerRate(true)}
                  className="py-3 bg-sage/10 text-sage rounded-lg font-medium hover:bg-sage/20 transition-colors"
                >
                  记住了 ✅
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (studyMode) {
    const currentWord = filteredWords[currentIndex];
    return (
      <div className="fixed inset-0 z-50 bg-parchment flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-lg">
          <div className="flex items-center justify-between mb-8">
            <span className="text-sm text-muted">
              {currentIndex + 1} / {filteredWords.length}
            </span>
            <button
              onClick={() => setStudyMode(false)}
              className="p-2 hover:bg-surface rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentWord.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-xl p-8 min-h-[400px] flex flex-col items-center justify-center text-center border border-border"
            >
              {!showAnswer ? (
                <div className="space-y-4">
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">{currentWord.word}</h2>
                  <p className="text-base sm:text-lg text-muted">{currentWord.phonetic}</p>
                  <span className="inline-block px-3 py-1 bg-noun/10 text-noun rounded-full text-sm font-medium">
                    {currentWord.partOfSpeech}
                  </span>
                  <div className="mt-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      currentWord.difficulty === "easy" ? "bg-sage/10 text-sage" :
                      currentWord.difficulty === "medium" ? "bg-amber/10 text-amber" :
                      "bg-coral/10 text-coral"
                    }`}>
                      {currentWord.difficulty === "easy" ? "简单" :
                       currentWord.difficulty === "medium" ? "中等" : "困难"}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-ink">{currentWord.meaning}</h3>
                  <p className="text-inkLight italic">{currentWord.example}</p>
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted">分类: {currentWord.category}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-center">
            {!showAnswer ? (
              <button
                onClick={() => setShowAnswer(true)}
                className="px-8 py-3 bg-amber text-white rounded-lg font-medium hover:bg-amber/90 transition-colors"
              >
                显示答案
              </button>
            ) : (
              <div className="grid grid-cols-4 gap-3 w-full">
                <button
                  onClick={() => handleRate("again")}
                  className="py-3 bg-coral/10 text-coral rounded-lg font-medium hover:bg-coral/20 transition-colors"
                >
                  重来
                </button>
                <button
                  onClick={() => handleRate("hard")}
                  className="py-3 bg-amber/10 text-amber rounded-lg font-medium hover:bg-amber/20 transition-colors"
                >
                  困难
                </button>
                <button
                  onClick={() => handleRate("good")}
                  className="py-3 bg-sage/10 text-sage rounded-lg font-medium hover:bg-sage/20 transition-colors"
                >
                  良好
                </button>
                <button
                  onClick={() => handleRate("easy")}
                  className="py-3 bg-teal/10 text-teal rounded-lg font-medium hover:bg-teal/20 transition-colors"
                >
                  简单
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-2">词汇积累</h1>
        <p className="text-sm sm:text-base text-inkLight">通过科学的记忆方法，高效掌握英语词汇</p>
      </div>

      {/* Stats Bar */}
      <div className="bg-white rounded-xl border border-border p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber" />
            <span className="text-sm text-muted">总词汇: <strong className="text-ink">{vocabularyData.length}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-coral" />
            <span className="text-sm text-muted">错题本: <strong className="text-ink">{wrongAnswers.length}</strong></span>
          </div>
          {dueReviews.length > 0 && (
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-sage" />
              <span className="text-sm text-muted">待复习: <strong className="text-coral">{dueReviews.length}</strong></span>
            </div>
          )}
          {sessionStats.correct + sessionStats.incorrect > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted">
                本次: <strong className="text-sage">{sessionStats.correct}</strong> 对 / <strong className="text-coral">{sessionStats.incorrect}</strong> 错
                {sessionStats.streak >= 3 && (
                  <span className="ml-2 text-amber">🔥 {sessionStats.streak} 连胜!</span>
                )}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Wrong Answer Review Button */}
      {dueReviews.length > 0 && (
        <div className="mb-6">
          <button
            onClick={startWrongAnswerReview}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 bg-coral text-white rounded-lg text-sm font-medium hover:bg-coral/90 transition-colors animate-pulse"
          >
            <AlertCircle className="w-4 h-4" />
            错题复习 ({dueReviews.length} 个单词待复习)
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col gap-4 mb-6">
        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-amber text-white"
                  : "bg-surface text-inkLight hover:bg-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Difficulty Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-muted" />
            {["easy", "medium", "hard"].map((diff) => (
              <button
                key={diff}
                onClick={() => setDifficultyFilter(difficultyFilter === diff ? null : diff)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  difficultyFilter === diff
                    ? diff === "easy" ? "bg-sage text-white" :
                      diff === "medium" ? "bg-amber text-white" :
                      "bg-coral text-white"
                    : "bg-surface text-inkLight hover:bg-border"
                }`}
              >
                {diff === "easy" ? "简单" : diff === "medium" ? "中等" : "困难"}
              </button>
            ))}
          </div>

          {/* Sort Mode */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted">排序:</span>
            {[
              { value: "default", label: "默认" },
              { value: "difficulty", label: "难度" },
              { value: "random", label: "随机" },
            ].map((mode) => (
              <button
                key={mode.value}
                onClick={() => setSortMode(mode.value as any)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  sortMode === mode.value
                    ? "bg-deepBlue text-white"
                    : "bg-surface text-inkLight hover:bg-border"
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Study Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <span className="text-sm text-muted">
          共 {filteredWords.length} 个单词
        </span>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={handleStudy}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-amber text-white rounded-lg text-sm font-medium hover:bg-amber/90 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            开始复习
          </button>
          {wrongAnswers.length > 0 && (
            <button
              onClick={startWrongAnswerReview}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-coral text-white rounded-lg text-sm font-medium hover:bg-coral/90 transition-colors"
            >
              <AlertCircle className="w-4 h-4" />
              错题 ({dueReviews.length})
            </button>
          )}
        </div>
      </div>

      {/* Word Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWords.map((word) => (
          <motion.div
            key={word.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative h-64 cursor-pointer"
            onClick={() => handleFlip(word.id)}
          >
            <motion.div
              className="w-full h-full relative preserve-3d"
              animate={{ rotateY: flippedCard === word.id ? 180 : 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front */}
              <div
                className="absolute inset-0 backface-hidden bg-white rounded-xl shadow-md border border-border p-6 flex flex-col items-center justify-center"
                style={{ backfaceVisibility: "hidden" }}
              >
                <h3 className="font-display text-2xl font-bold text-ink mb-2">{word.word}</h3>
                <p className="text-muted mb-2">{word.phonetic}</p>
                <span className="px-3 py-1 bg-noun/10 text-noun rounded-full text-sm font-medium">
                  {word.partOfSpeech}
                </span>
                <div className="mt-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    word.difficulty === "easy" ? "bg-sage/10 text-sage" :
                    word.difficulty === "medium" ? "bg-amber/10 text-amber" :
                    "bg-coral/10 text-coral"
                  }`}>
                    {word.category}
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-muted">
                  <Volume2 className="w-4 h-4" />
                  <span>点击翻转查看释义</span>
                </div>
              </div>

              {/* Back */}
              <div
                className="absolute inset-0 backface-hidden bg-white rounded-xl shadow-md border border-border p-6 flex flex-col justify-center"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <h4 className="font-semibold text-ink mb-2">{word.meaning}</h4>
                <p className="text-sm text-inkLight italic mb-4">{word.example}</p>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sage" />
                  <span className="text-sm text-muted">已掌握</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
