import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, CheckCircle, XCircle, Lightbulb, ChevronRight, Award } from "lucide-react";
import { grammarLessons, quizQuestions, grammarColors } from "@/data/grammar";

// 为语法颜色添加bg和text映射
const colorStyleMap: Record<string, { bg: string; text: string }> = {
  noun: { bg: "bg-amber/10", text: "text-amber" },
  verb: { bg: "bg-coral/10", text: "text-coral" },
  adjective: { bg: "bg-sage/10", text: "text-sage" },
  adverb: { bg: "bg-lavender/10", text: "text-lavender" },
  preposition: { bg: "bg-teal/10", text: "text-teal" },
  conjunction: { bg: "bg-amber/10", text: "text-amber" },
  pronoun: { bg: "bg-cyan/10", text: "text-cyan" },
  article: { bg: "bg-violet/10", text: "text-violet" },
  interjection: { bg: "bg-pink/10", text: "text-pink" },
};

export default function Grammar() {
  const [showColors, setShowColors] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleQuiz = (answerIndex: number) => {
    setQuizAnswer(answerIndex);
    setShowExplanation(true);
    if (answerIndex === quizQuestions[currentQuizIndex].correctAnswer) {
      setCorrectCount(correctCount + 1);
    }
  };

  const handleNext = () => {
    if (currentQuizIndex < quizQuestions.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setQuizAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuizIndex(0);
    setQuizAnswer(null);
    setShowExplanation(false);
    setCorrectCount(0);
    setQuizComplete(false);
  };

  const exampleSentence = [
    { word: "The", type: "article" },
    { word: "quick", type: "adjective" },
    { word: "brown", type: "adjective" },
    { word: "fox", type: "noun" },
    { word: "jumps", type: "verb" },
    { word: "over", type: "preposition" },
    { word: "the", type: "article" },
    { word: "lazy", type: "adjective" },
    { word: "dog", type: "noun" },
  ];

  const currentQuestion = quizQuestions[currentQuizIndex];

  if (selectedLesson) {
    const lesson = grammarLessons.find((l) => l.id === selectedLesson);
    if (!lesson) return null;

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <button
            onClick={() => setSelectedLesson(null)}
            className="flex items-center gap-2 text-inkLight hover:text-ink transition-colors"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            返回课程列表
          </button>
          <span className="text-sm text-muted">{lesson.title}</span>
        </div>

        <div className="bg-white rounded-xl border border-border p-4 sm:p-8 mb-8">
          <h2 className="font-display text-2xl font-bold text-ink mb-4">{lesson.title}</h2>
          <p className="text-inkLight mb-6">{lesson.description}</p>

          <div className="mb-6">
            <h3 className="font-semibold text-ink mb-3">涵盖主题</h3>
            <div className="flex flex-wrap gap-2">
              {lesson.topics.map((topic) => (
                <span key={topic} className="px-3 py-1 bg-surface rounded-full text-sm text-inkLight">
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-surface rounded-lg p-4">
            <p className="text-sm text-muted mb-1">示例</p>
            <p className="text-ink italic">{lesson.example}</p>
          </div>
        </div>

        {/* Quiz Section */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="font-semibold text-ink mb-6">练习测试</h2>

          {quizComplete ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <Award className="w-16 h-16 text-amber mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-ink mb-2">练习完成！</h3>
              <p className="text-inkLight mb-4">
                你答对了 {correctCount} / {quizQuestions.length} 道题
              </p>
              <div className="w-full bg-surface rounded-full h-4 mb-6">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(correctCount / quizQuestions.length) * 100}%` }}
                  className="h-full bg-amber rounded-full"
                />
              </div>
              <button
                onClick={handleRestart}
                className="px-6 py-3 bg-amber text-white rounded-lg font-medium hover:bg-amber/90 transition-colors"
              >
                重新测试
              </button>
            </motion.div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted">
                  题目 {currentQuizIndex + 1} / {quizQuestions.length}
                </span>
                <span className="text-sm text-amber font-medium">
                  {correctCount} 正确
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <p className="text-lg text-ink mb-6">{currentQuestion.question}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    {currentQuestion.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => !showExplanation && handleQuiz(index)}
                        disabled={showExplanation}
                        className={`p-4 rounded-lg border text-left font-medium transition-all ${
                          quizAnswer === index
                            ? index === currentQuestion.correctAnswer
                              ? "bg-sage/10 border-sage text-sage"
                              : "bg-coral/10 border-coral text-coral"
                            : showExplanation && index === currentQuestion.correctAnswer
                            ? "bg-sage/10 border-sage text-sage"
                            : "border-border hover:bg-surface"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>

                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-surface rounded-lg p-4 mb-6"
                    >
                      {quizAnswer === currentQuestion.correctAnswer ? (
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-sage">正确！</p>
                            <p className="text-sm text-inkLight">{currentQuestion.explanation}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start gap-3">
                          <XCircle className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-coral">不正确</p>
                            <p className="text-sm text-inkLight">{currentQuestion.explanation}</p>
                            <p className="text-sm text-amber mt-2">
                              <Lightbulb className="w-4 h-4 inline mr-1" />
                              {currentQuestion.hint}
                            </p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {showExplanation && (
                    <div className="flex justify-end">
                      <button
                        onClick={handleNext}
                        className="px-6 py-3 bg-amber text-white rounded-lg font-medium hover:bg-amber/90 transition-colors"
                      >
                        {currentQuizIndex < quizQuestions.length - 1 ? "下一题" : "查看结果"}
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-2">语法教学</h1>
        <p className="text-sm sm:text-base text-inkLight">通过颜色编码和互动练习，深入理解英语语法结构</p>
      </div>

      {/* Grammar Legend */}
      <div className="bg-white rounded-xl border border-border p-4 sm:p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
          <h2 className="font-semibold text-ink">语法颜色图例</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowColors(!showColors)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                showColors ? "bg-amber text-white" : "bg-surface text-inkLight"
              }`}
            >
              颜色
            </button>
            <button
              onClick={() => setShowLabels(!showLabels)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                showLabels ? "bg-amber text-white" : "bg-surface text-inkLight"
              }`}
            >
              标签
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {grammarColors.map((color) => {
            const styles = colorStyleMap[color.type] || { bg: "bg-surface", text: "text-ink" };
            return (
              <div key={color.type} className={`flex items-center gap-2 px-3 py-2 rounded-lg ${styles.bg}`}>
                <div className={`w-3 h-3 rounded-full ${styles.text.replace("text-", "bg-")}`} />
                <span className={`text-sm font-medium capitalize ${styles.text}`}>{color.type}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Example */}
      <div className="bg-white rounded-xl border border-border p-4 sm:p-6 mb-8">
        <h2 className="font-semibold text-ink mb-4">互动例句</h2>
        <div className="flex flex-wrap gap-2 items-center justify-center py-4 sm:py-8">
          {exampleSentence.map((item, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative inline-flex flex-col items-center px-2 py-1 rounded-md transition-colors ${
                showColors ? (colorStyleMap[item.type]?.bg || "bg-surface") : "bg-surface"
              }`}
            >
              <span className={`text-base sm:text-lg font-medium ${
                showColors ? (colorStyleMap[item.type]?.text || "text-ink") : "text-ink"
              }`}>
                {item.word}
              </span>
              {showLabels && (
                <span className="text-xs text-muted mt-1">{item.type}</span>
              )}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {grammarLessons.map((lesson) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedLesson(lesson.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-deepBlue/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-deepBlue" />
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  lesson.difficulty === "beginner"
                    ? "bg-sage/10 text-sage"
                    : lesson.difficulty === "intermediate"
                    ? "bg-amber/10 text-amber"
                    : "bg-coral/10 text-coral"
                }`}
              >
                {lesson.difficulty === "beginner" ? "初级" : lesson.difficulty === "intermediate" ? "中级" : "高级"}
              </span>
            </div>

            <h3 className="font-semibold text-ink mb-2">{lesson.title}</h3>
            <p className="text-sm text-inkLight mb-4">{lesson.description}</p>

            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted">进度</span>
                <span className="font-medium text-ink">{lesson.progress}%</span>
              </div>
              <div className="h-2 bg-surface rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber rounded-full transition-all"
                  style={{ width: `${lesson.progress}%` }}
                />
              </div>
            </div>

            <p className="text-sm text-muted mt-3 italic">{lesson.example}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
