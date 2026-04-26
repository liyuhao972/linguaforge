import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Headphones, Play, Pause, RotateCcw, Mic, Volume2, CheckCircle, XCircle } from "lucide-react";
import { scenarios, dialogues, comprehensionQuestions } from "@/data/listening";

export default function Listening() {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simulated waveform animation
  useEffect(() => {
    if (!isPlaying || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#2CB5A0";
      const bars = 50;
      const barWidth = canvas.width / bars;

      for (let i = 0; i < bars; i++) {
        const height = Math.random() * canvas.height * 0.8;
        ctx.fillRect(i * barWidth, (canvas.height - height) / 2, barWidth - 1, height);
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [isPlaying]);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRecord = () => {
    setIsRecording(!isRecording);
  };

  const handleQuizAnswer = (questionId: string, answerIndex: number) => {
    setQuizAnswers({ ...quizAnswers, [questionId]: answerIndex });
  };

  const handleShowResults = () => {
    setShowResults(true);
  };

  const handleRestart = () => {
    setShowQuiz(false);
    setQuizAnswers({});
    setShowResults(false);
    setCurrentLine(0);
    setIsPlaying(false);
  };

  if (selectedScenario) {
    const scenario = scenarios.find((s) => s.id === selectedScenario);
    const dialogue = dialogues[selectedScenario] || [];
    const questions = comprehensionQuestions[selectedScenario] || [];

    if (!scenario) return null;

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <button
            onClick={() => setSelectedScenario(null)}
            className="flex items-center gap-2 text-inkLight hover:text-ink transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            返回场景列表
          </button>
          <span className="text-sm text-muted">{scenario.title}</span>
        </div>

        {!showQuiz ? (
          <>
            {/* Dialogue */}
            <div className="bg-white rounded-xl border border-border p-6 mb-8">
              <h2 className="font-semibold text-ink mb-6">对话练习</h2>
              <div className="space-y-4">
                {dialogue.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: line.speaker === "You" ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex gap-4 ${line.speaker === "You" ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        line.speaker === "Agent" || line.speaker === "Barista" || line.speaker === "Interviewer"
                          ? "bg-teal/10 text-teal"
                          : line.speaker === "You"
                          ? "bg-amber/10 text-amber"
                          : "bg-surface text-muted"
                      }`}
                    >
                      {line.speaker === "You" ? (
                        <Volume2 className="w-5 h-5" />
                      ) : (
                        <Headphones className="w-5 h-5" />
                      )}
                    </div>
                    <div
                      className={`max-w-[80%] p-4 rounded-xl ${
                        line.speaker === "You"
                          ? "bg-amber/10 text-ink"
                          : "bg-surface text-ink"
                      } ${index === currentLine ? "ring-2 ring-amber" : ""}`}
                    >
                      <p className="text-sm font-medium mb-1">{line.speaker}</p>
                      <p className="mb-2">{line.text}</p>
                      <p className="text-sm text-muted">{line.translation}</p>
                      {line.grammarNotes && (
                        <p className="text-xs text-amber mt-2">💡 {line.grammarNotes}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Audio Player */}
            <div className="bg-white rounded-xl border border-border p-4 mb-8">
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePlay}
                  className="w-12 h-12 rounded-full bg-teal flex items-center justify-center text-white hover:bg-teal/90 transition-colors"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <div className="flex-1">
                  <canvas
                    ref={canvasRef}
                    width={400}
                    height={60}
                    className="w-full h-[60px] rounded-lg bg-surface"
                  />
                </div>
              </div>
            </div>

            {/* Recording */}
            <div className="bg-white rounded-xl border border-border p-6 mb-8">
              <div className="flex flex-col items-center">
                <button
                  onClick={handleRecord}
                  className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                    isRecording
                      ? "bg-coral animate-pulse-ring"
                      : "bg-surface hover:bg-border"
                  }`}
                >
                  <Mic className={`w-8 h-8 ${isRecording ? "text-white" : "text-inkLight"}`} />
                </button>
                <p className="mt-4 text-sm text-muted">
                  {isRecording ? "正在录音..." : "点击开始录音"}
                </p>
              </div>
            </div>

            {/* Start Quiz Button */}
            <div className="flex justify-center">
              <button
                onClick={() => setShowQuiz(true)}
                className="px-6 py-3 bg-amber text-white rounded-lg font-medium hover:bg-amber/90 transition-colors"
              >
                开始理解测验
              </button>
            </div>
          </>
        ) : !showResults ? (
          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="font-semibold text-ink mb-6">理解测验</h2>
            <div className="space-y-6">
              {questions.map((question, qIndex) => (
                <div key={question.id}>
                  <p className="text-ink mb-4">
                    {qIndex + 1}. {question.question}
                  </p>
                  <div className="space-y-2">
                    {question.options.map((option, oIndex) => (
                      <button
                        key={oIndex}
                        onClick={() => handleQuizAnswer(question.id, oIndex)}
                        className={`w-full p-3 rounded-lg border text-left transition-colors ${
                          quizAnswers[question.id] === oIndex
                            ? "bg-amber/10 border-amber"
                            : "border-border hover:bg-surface"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={handleShowResults}
                disabled={Object.keys(quizAnswers).length < questions.length}
                className="px-6 py-3 bg-amber text-white rounded-lg font-medium hover:bg-amber/90 transition-colors disabled:opacity-50"
              >
                查看结果
              </button>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl border border-border p-6"
          >
            <h2 className="font-semibold text-ink mb-6">测验结果</h2>
            <div className="space-y-4">
              {questions.map((question, qIndex) => {
                const isCorrect = quizAnswers[question.id] === question.correctAnswer;
                return (
                  <div key={question.id} className={`p-4 rounded-lg ${isCorrect ? "bg-sage/10" : "bg-coral/10"}`}>
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="font-medium text-ink">{qIndex + 1}. {question.question}</p>
                        <p className="text-sm text-inkLight mt-1">
                          你的答案: {question.options[quizAnswers[question.id]]}
                        </p>
                        {!isCorrect && (
                          <p className="text-sm text-sage mt-1">
                            正确答案: {question.options[question.correctAnswer]}
                          </p>
                        )}
                        <p className="text-sm text-muted mt-2">{question.explanation}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center mt-6 gap-4">
              <button
                onClick={handleRestart}
                className="px-6 py-3 bg-surface text-ink rounded-lg font-medium hover:bg-border transition-colors"
              >
                重新练习
              </button>
              <button
                onClick={() => setSelectedScenario(null)}
                className="px-6 py-3 bg-amber text-white rounded-lg font-medium hover:bg-amber/90 transition-colors"
              >
                选择新场景
              </button>
            </div>
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-2">听说训练</h1>
        <p className="text-sm sm:text-base text-inkLight">模拟真实场景，提升听说能力</p>
      </div>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {scenarios.map((scenario) => (
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedScenario(scenario.id)}
          >
            <div className="text-5xl sm:text-6xl mb-4">{scenario.emoji}</div>
            <h3 className="font-semibold text-ink mb-2">{scenario.title}</h3>
            <p className="text-sm text-inkLight mb-4">{scenario.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {scenario.vocabulary.slice(0, 3).map((vocab) => (
                <span key={vocab} className="px-2 py-1 bg-surface rounded-full text-xs text-muted">
                  {vocab}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  scenario.difficulty === "初级"
                    ? "bg-sage/10 text-sage"
                    : scenario.difficulty === "中级"
                    ? "bg-amber/10 text-amber"
                    : "bg-coral/10 text-coral"
                }`}
              >
                {scenario.difficulty}
              </span>
              <span className="text-xs text-muted">{scenario.duration}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
