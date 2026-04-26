import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Newspaper, BookOpen, CheckCircle, XCircle, ChevronRight, Volume2, Type, Highlighter, RefreshCw, Globe, AlertCircle } from "lucide-react";
import { articles as staticArticles, articleContents, vocabWords, grammarAnalysis, categories } from "@/data/reading";

// 新闻API接口
interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  source: string;
  author: string;
  date: string;
  difficulty: string;
  category: string;
  grammarCount: number;
  vocabCount: number;
  readTime: string;
  url?: string;
  image?: string;
}

// 使用NewsAPI获取实时新闻（免费版限制：100请求/天）
// 备用：使用GNews或手动维护的精选文章
// const NEWS_API_KEY = ""; // 用户可自行配置
// const USE_REAL_API = false; // 切换为true并配置API key即可使用真实新闻

// 模拟新闻数据 - 每周更新
const mockNewsArticles: NewsArticle[] = [
  {
    id: "news-1",
    title: "AI Revolution Reshapes Global Workforce",
    excerpt: "Artificial intelligence is transforming industries at an unprecedented pace, creating new opportunities while displacing traditional roles.",
    source: "Tech Daily",
    author: "Sarah Chen",
    date: "2026-04-25",
    difficulty: "中级",
    category: "科技",
    grammarCount: 12,
    vocabCount: 28,
    readTime: "8 分钟",
  },
  {
    id: "news-2",
    title: "Climate Summit Reaches Historic Agreement",
    excerpt: "World leaders have committed to ambitious new targets for carbon reduction, marking a turning point in global environmental policy.",
    source: "Global Times",
    author: "James Wilson",
    date: "2026-04-24",
    difficulty: "高级",
    category: "环境",
    grammarCount: 15,
    vocabCount: 32,
    readTime: "10 分钟",
  },
  {
    id: "news-3",
    title: "Space Tourism: The Final Frontier for Travel",
    excerpt: "Commercial space travel is becoming a reality for wealthy tourists, but questions about sustainability and safety remain.",
    source: "Science Weekly",
    author: "Dr. Emily Park",
    date: "2026-04-23",
    difficulty: "中级",
    category: "科技",
    grammarCount: 10,
    vocabCount: 25,
    readTime: "7 分钟",
  },
  {
    id: "news-4",
    title: "Remote Work Culture Redefines Urban Living",
    excerpt: "As hybrid work becomes permanent, cities are experiencing shifts in real estate demand and transportation patterns.",
    source: "Business Insider",
    author: "Michael Brown",
    date: "2026-04-22",
    difficulty: "中级",
    category: "商业",
    grammarCount: 11,
    vocabCount: 26,
    readTime: "8 分钟",
  },
  {
    id: "news-5",
    title: "Mental Health Awareness in the Digital Age",
    excerpt: "Social media platforms are implementing new features to protect users' mental health amid growing concerns about digital addiction.",
    source: "Health Today",
    author: "Dr. Lisa Wang",
    date: "2026-04-21",
    difficulty: "初级",
    category: "健康",
    grammarCount: 8,
    vocabCount: 20,
    readTime: "6 分钟",
  },
  {
    id: "news-6",
    title: "Cryptocurrency Regulation: A Global Challenge",
    excerpt: "Governments worldwide are struggling to create consistent frameworks for regulating digital currencies and blockchain technology.",
    source: "Finance Weekly",
    author: "Robert Kim",
    date: "2026-04-20",
    difficulty: "高级",
    category: "商业",
    grammarCount: 14,
    vocabCount: 30,
    readTime: "9 分钟",
  },
];

// 合并静态文章和新闻文章
const allArticles: NewsArticle[] = [...staticArticles, ...mockNewsArticles];

// 为新闻文章生成模拟内容
const generateNewsContent = (article: NewsArticle): string => {
  const contents: Record<string, string> = {
    "news-1": `The rapid advancement of artificial intelligence is fundamentally reshaping the global workforce, creating both unprecedented opportunities and significant challenges for workers across all industries.

Recent studies indicate that while AI automation may displace approximately 85 million jobs by 2030, it is also expected to create 97 million new roles that require human-AI collaboration. This transformation is not merely about job replacement but rather about the evolution of work itself.

Companies are increasingly investing in reskilling programs to help employees adapt to AI-enhanced workflows. The most successful organizations are those that view AI as a tool for augmentation rather than replacement, focusing on how technology can enhance human creativity and decision-making capabilities.

However, the transition is not without its difficulties. Workers in routine-based positions face the greatest risk of displacement, while those with strong interpersonal and creative skills are likely to see increased demand. Governments and educational institutions must work together to ensure that the workforce is prepared for this new paradigm.

The ethical implications of AI in the workplace also demand careful consideration. Questions about data privacy, algorithmic bias, and the balance between efficiency and human dignity require thoughtful policy frameworks that protect workers while fostering innovation.`,
    "news-2": `In a landmark decision that environmentalists are calling a turning point in the fight against climate change, world leaders have reached a historic agreement at the Global Climate Summit held in Geneva this week.

The agreement commits 195 nations to reducing carbon emissions by 60% below 2020 levels by 2040, a significantly more ambitious target than previous commitments. Developed nations have pledged $500 billion annually to support developing countries in their transition to renewable energy.

Key provisions include a complete phase-out of coal power by 2035, mandatory carbon pricing mechanisms, and strict regulations on deforestation. The agreement also establishes an independent monitoring body to ensure compliance and transparency.

Critics argue that while the targets are commendable, implementation remains the primary challenge. Previous agreements have struggled with enforcement, and some nations have already expressed concerns about the economic impact of rapid decarbonization.

Nevertheless, scientists and activists have praised the agreement as a crucial step toward limiting global warming to 1.5 degrees Celsius. The next decade will be critical in determining whether these commitments translate into meaningful action.`,
    "news-3": `Space tourism, once the realm of science fiction, is rapidly becoming a reality as private companies race to make commercial space travel accessible to wealthy adventurers.

Virgin Galactic, Blue Origin, and SpaceX have all successfully launched civilian passengers into suborbital and orbital space, with ticket prices ranging from $250,000 to $55 million. The industry is projected to generate $8 billion annually by 2030.

Proponents argue that space tourism will drive technological innovation and eventually reduce costs, making space accessible to more people. They also point to the inspirational value of space travel in fostering interest in STEM education.

However, critics raise serious concerns about the environmental impact of rocket launches, which emit significant amounts of black carbon and other pollutants into the upper atmosphere. Additionally, questions about safety regulations and liability remain largely unanswered.

As the industry evolves, balancing the pursuit of commercial opportunities with environmental responsibility and safety will be crucial. The coming years will likely see increased regulatory scrutiny as space tourism transitions from novelty to mainstream travel option.`,
    "news-4": `The permanent adoption of hybrid work models is fundamentally reshaping urban landscapes, as employees no longer need to commute to city centers five days a week.

Real estate markets are experiencing a significant shift, with decreased demand for commercial office space and increased interest in suburban and rural residential properties. Major cities like New York, London, and Tokyo have seen office vacancy rates reach 25%, the highest in decades.

Transportation patterns have also changed dramatically. Rush hour congestion has decreased by an average of 30% in major metropolitan areas, while public transit ridership remains below pre-pandemic levels. Many cities are repurposing office buildings into residential units and mixed-use developments.

The implications extend beyond real estate. Local businesses that depended on office worker foot traffic are struggling to adapt, while suburban restaurants and cafes are seeing increased patronage. Urban planners are reimagining city centers as cultural and social hubs rather than purely commercial districts.

This transformation raises important questions about tax revenue distribution, infrastructure investment, and the future of urban living. Cities that successfully adapt to this new reality may emerge more resilient and livable than before.`,
    "news-5": `Major social media platforms have announced comprehensive new measures to protect users' mental health, responding to mounting evidence of the negative psychological impacts of excessive digital engagement.

Instagram, TikTok, and YouTube are implementing features that allow users to set daily time limits, receive wellness reminders, and access mental health resources directly within their apps. These changes come after numerous studies linked heavy social media use to increased rates of anxiety and depression, particularly among teenagers.

The new features include optional break reminders after extended usage periods, algorithms that reduce the visibility of potentially harmful content, and partnerships with mental health organizations to provide crisis support.

While these initiatives have been welcomed by mental health advocates, some critics argue that they do not address the fundamental business models that rely on maximizing user engagement. They contend that true reform requires structural changes to how these platforms operate.

The effectiveness of these measures will depend on user adoption and the platforms' commitment to prioritizing well-being over engagement metrics. Early data suggests that users who enable wellness features report improved sleep quality and reduced anxiety levels.`,
    "news-6": `The explosive growth of cryptocurrency markets has created a regulatory nightmare for governments worldwide, as they struggle to develop consistent frameworks for digital assets that operate across borders.

The total market capitalization of cryptocurrencies has reached $3 trillion, attracting both institutional investors and retail speculators. However, the decentralized nature of blockchain technology makes traditional regulatory approaches largely ineffective.

Different jurisdictions have adopted vastly different strategies. El Salvador has embraced Bitcoin as legal tender, while China has banned all cryptocurrency transactions. The European Union has implemented comprehensive regulations through MiCA, while the United States continues to rely on a patchwork of federal and state laws.

Key regulatory challenges include preventing money laundering and terrorist financing, protecting consumers from fraud and market manipulation, and addressing the environmental impact of energy-intensive mining operations.

Industry experts argue that clear, consistent regulation is essential for the long-term viability of digital assets. Without it, the sector risks remaining a speculative bubble rather than becoming a legitimate component of the global financial system.`,
  };
  return contents[article.id] || article.excerpt;
};

// 为新闻文章生成词汇列表
const generateNewsVocab = (article: NewsArticle) => {
  const vocabMap: Record<string, Array<{word: string; partOfSpeech: string; meaning: string; context: string}>> = {
    "news-1": [
      { word: "advancement", partOfSpeech: "noun", meaning: "进步；发展；提升", context: "the rapid advancement of AI" },
      { word: "unprecedented", partOfSpeech: "adjective", meaning: "前所未有的；无前例的", context: "unprecedented opportunities" },
      { word: "displace", partOfSpeech: "verb", meaning: "取代；转移；迫使离开", context: "displace approximately 85 million jobs" },
      { word: "reskilling", partOfSpeech: "noun", meaning: "再培训；技能重塑", context: "investing in reskilling programs" },
      { word: "augmentation", partOfSpeech: "noun", meaning: "增强；扩大；增加", context: "AI as a tool for augmentation" },
      { word: "paradigm", partOfSpeech: "noun", meaning: "范例；模式；范式", context: "prepared for this new paradigm" },
      { word: "algorithmic", partOfSpeech: "adjective", meaning: "算法的；规则系统的", context: "algorithmic bias" },
    ],
    "news-2": [
      { word: "landmark", partOfSpeech: "adjective/noun", meaning: "里程碑式的；地标", context: "a landmark decision" },
      { word: "commit", partOfSpeech: "verb", meaning: "承诺；保证；投入", context: "commits 195 nations to reducing" },
      { word: "phase-out", partOfSpeech: "noun", meaning: "逐步淘汰；逐步停止", context: "complete phase-out of coal power" },
      { word: "mandatory", partOfSpeech: "adjective", meaning: "强制的；义务的", context: "mandatory carbon pricing" },
      { word: "compliance", partOfSpeech: "noun", meaning: "遵守；服从；依从", context: "ensure compliance and transparency" },
      { word: "decarbonization", partOfSpeech: "noun", meaning: "脱碳；减少碳排放", context: "rapid decarbonization" },
    ],
    "news-3": [
      { word: "suborbital", partOfSpeech: "adjective", meaning: "亚轨道的；不满一周的", context: "suborbital and orbital space" },
      { word: "proponent", partOfSpeech: "noun", meaning: "支持者；倡导者", context: "Proponents argue that" },
      { word: "inspirational", partOfSpeech: "adjective", meaning: "鼓舞人心的；启发灵感的", context: "inspirational value of space travel" },
      { word: "scrutiny", partOfSpeech: "noun", meaning: "详细审查；仔细观察", context: "increased regulatory scrutiny" },
    ],
    "news-4": [
      { word: "metropolitan", partOfSpeech: "adjective", meaning: "大都市的；大城市的", context: "major metropolitan areas" },
      { word: "repurpose", partOfSpeech: "verb", meaning: "改用途；重新调整", context: "repurposing office buildings" },
      { word: "patronage", partOfSpeech: "noun", meaning: "赞助；光顾；保护", context: "increased patronage" },
      { word: "resilient", partOfSpeech: "adjective", meaning: "有弹性的；有恢复力的", context: "more resilient and livable" },
    ],
    "news-5": [
      { word: "comprehensive", partOfSpeech: "adjective", meaning: "全面的；综合的；详尽的", context: "comprehensive new measures" },
      { word: "mounting", partOfSpeech: "adjective", meaning: "不断增加的；上升的", context: "mounting evidence" },
      { word: "advocate", partOfSpeech: "noun/verb", meaning: "倡导者；拥护；提倡", context: "welcomed by mental health advocates" },
      { word: "contend", partOfSpeech: "verb", meaning: "主张；争辩；竞争", context: "They contend that true reform" },
    ],
    "news-6": [
      { word: "jurisdiction", partOfSpeech: "noun", meaning: "司法管辖区；管辖权", context: "Different jurisdictions" },
      { word: "decentralized", partOfSpeech: "adjective", meaning: "分散的；去中心化的", context: "decentralized nature of blockchain" },
      { word: "patchwork", partOfSpeech: "noun", meaning: "拼凑物；混杂物", context: "a patchwork of federal and state laws" },
      { word: "viability", partOfSpeech: "noun", meaning: "可行性；生存能力；发育能力", context: "long-term viability of digital assets" },
    ],
  };
  return vocabMap[article.id] || [];
};

// 为新闻文章生成语法分析
const generateNewsGrammar = (article: NewsArticle) => {
  const grammarMap: Record<string, Array<{structure: string; count: number; examples: string[]}>> = {
    "news-1": [
      { structure: "现在进行时被动语态", count: 3, examples: ["is being transformed", "are being displaced"] },
      { structure: "将来时被动语态", count: 2, examples: ["will be created", "is expected to create"] },
      { structure: "定语从句", count: 4, examples: ["workers who face", "organizations that view"] },
    ],
    "news-2": [
      { structure: "现在完成时", count: 5, examples: ["have reached", "has pledged", "have struggled"] },
      { structure: "被动语态", count: 6, examples: ["are calling", "has been praised", "be limited"] },
      { structure: "条件状语从句", count: 3, examples: ["While the targets are...", "If these commitments translate..."] },
    ],
    "news-3": [
      { structure: "形式主语", count: 2, examples: ["It is projected that...", "It is crucial that..."] },
      { structure: "定语从句", count: 3, examples: ["companies that view", "questions that remain"] },
    ],
    "news-4": [
      { structure: "现在完成时", count: 4, examples: ["have seen", "has decreased", "are reimagining"] },
      { structure: "比较级", count: 3, examples: ["more resilient", "more livable"] },
    ],
    "news-5": [
      { structure: "现在完成时", count: 4, examples: ["have announced", "have linked", "have welcomed"] },
      { structure: "宾语从句", count: 3, examples: ["argue that they do not", "contend that true reform"] },
    ],
    "news-6": [
      { structure: "现在完成时", count: 5, examples: ["has created", "has reached", "has implemented"] },
      { structure: "被动语态", count: 4, examples: ["are implemented", "be prevented", "be addressed"] },
    ],
  };
  return grammarMap[article.id] || [];
};

export default function Reading() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [showGrammar, setShowGrammar] = useState(true);
  const [showVocab, setShowVocab] = useState(true);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium");
  const [activeTab, setActiveTab] = useState<"featured" | "news">("featured");
  const [lastUpdated, setLastUpdated] = useState("2026-04-25");
  const [wordbook, setWordbook] = useState<Array<{word: string; partOfSpeech: string; meaning: string; context: string; addedAt: string}>>([]);
  const [showWordbookNotification, setShowWordbookNotification] = useState(false);

  // 从 localStorage 加载单词本
  useEffect(() => {
    const saved = localStorage.getItem("linguaforge_wordbook");
    if (saved) {
      try {
        setWordbook(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load wordbook:", e);
      }
    }
  }, []);

  // 保存单词本到 localStorage
  useEffect(() => {
    localStorage.setItem("linguaforge_wordbook", JSON.stringify(wordbook));
  }, [wordbook]);

  const addToWordbook = (word: {word: string; partOfSpeech: string; meaning: string; context: string}) => {
    if (wordbook.some((w) => w.word === word.word)) {
      alert(`「${word.word}」已经在单词本中了！`);
      return;
    }
    setWordbook([...wordbook, { ...word, addedAt: new Date().toISOString() }]);
    setShowWordbookNotification(true);
    setTimeout(() => setShowWordbookNotification(false), 2000);
  };

  const removeFromWordbook = (word: string) => {
    setWordbook(wordbook.filter((w) => w.word !== word));
  };

  // 合并所有文章
  const displayArticles = activeTab === "featured" ? staticArticles : mockNewsArticles;

  const filteredArticles =
    selectedCategory === "All"
      ? displayArticles
      : displayArticles.filter((a) => a.category === selectedCategory);

  const handleWordClick = (word: string) => {
    setSelectedWord(selectedWord === word ? null : word);
  };

  const handleQuiz = (questionId: string, answerIndex: number) => {
    setQuizAnswers({ ...quizAnswers, [questionId]: answerIndex });
  };

  const handleShowResults = () => {
    setShowResults(true);
  };

  const handleRefreshNews = () => {
    // 模拟刷新新闻
    setLastUpdated(new Date().toISOString().split("T")[0]);
    alert("新闻已更新！（演示模式：实际项目中可接入NewsAPI/GNews等实时新闻源）");
  };

  const fontSizeClasses = {
    small: "text-base",
    medium: "text-lg",
    large: "text-xl",
  };

  if (selectedArticle) {
    const article = allArticles.find((a) => a.id === selectedArticle);
    const isNewsArticle = selectedArticle.startsWith("news-");
    
    // 获取内容
    let content: string;
    let vocab: Array<{word: string; partOfSpeech: string; meaning: string; context: string}>;
    let grammar: Array<{structure: string; count: number; examples: string[]}>;
    
    if (isNewsArticle && article) {
      content = generateNewsContent(article);
      vocab = generateNewsVocab(article);
      grammar = generateNewsGrammar(article);
    } else {
      content = articleContents[selectedArticle] || "";
      vocab = vocabWords[selectedArticle] || [];
      grammar = grammarAnalysis[selectedArticle] || [];
    }

    if (!article || !content) return null;

    // 动态生成测验题目
    const quizQuestions = [
      {
        id: "q1",
        question: "What is the main idea of this article?",
        options: [
          "The article discusses temporary changes that will soon reverse",
          "The article presents a significant development with lasting implications",
          "The article argues against the topic being discussed",
          "The article focuses exclusively on historical background",
        ],
        correctAnswer: 1,
        explanation: "文章主要讨论了一个具有深远影响的重要发展。",
      },
      {
        id: "q2",
        question: "According to the article, what is one major challenge mentioned?",
        options: [
          "Lack of public interest in the topic",
          "Implementation difficulties and regulatory concerns",
          "Complete absence of supporting evidence",
          "Universal agreement among all stakeholders",
        ],
        correctAnswer: 1,
        explanation: "文章提到了实施困难和监管方面的担忧。",
      },
    ];

    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <button
            onClick={() => setSelectedArticle(null)}
            className="flex items-center gap-2 text-inkLight hover:text-ink transition-colors"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            返回文章列表
          </button>
          <div className="flex items-center gap-2">
            {isNewsArticle && (
              <span className="px-2 py-1 bg-sage/10 text-sage text-xs rounded-full flex items-center gap-1">
                <Globe className="w-3 h-3" />
                实时新闻
              </span>
            )}
            <span className="text-sm text-muted">{article.source}</span>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap gap-2 mb-6 p-3 sm:p-4 bg-white rounded-xl border border-border">
          <button
            onClick={() => setShowGrammar(!showGrammar)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              showGrammar ? "bg-amber text-white" : "bg-surface text-inkLight"
            }`}
          >
            <Highlighter className="w-4 h-4 inline mr-1" />
            语法颜色
          </button>
          <button
            onClick={() => setShowVocab(!showVocab)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              showVocab ? "bg-amber text-white" : "bg-surface text-inkLight"
            }`}
          >
            <BookOpen className="w-4 h-4 inline mr-1" />
            词汇标注
          </button>
          <div className="flex items-center gap-1 ml-auto">
            <Type className="w-4 h-4 text-muted" />
            {(["small", "medium", "large"] as const).map((size) => (
              <button
                key={size}
                onClick={() => setFontSize(size)}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  fontSize === size ? "bg-amber text-white" : "bg-surface text-inkLight"
                }`}
              >
                {size === "small" ? "A" : size === "medium" ? "A" : "A"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Article Content */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-xl border border-border p-4 sm:p-8">
              <h1 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-ink mb-4">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted mb-6">
                <span>{article.source}</span>
                <span className="hidden sm:inline">·</span>
                <span>{article.author}</span>
                <span className="hidden sm:inline">·</span>
                <span>{article.date}</span>
                <span className="hidden sm:inline">·</span>
                <span>{article.difficulty}</span>
              </div>

              <div className={`prose prose-lg max-w-none ${fontSizeClasses[fontSize]}`}>
                {content.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="mb-4 text-inkLight leading-relaxed">
                    {paragraph.split(" ").map((word, j) => {
                      const cleanWord = word.replace(/[.,!?;:]$/, "").toLowerCase();
                      const vocabWord = vocab.find(
                        (v) => v.word.toLowerCase() === cleanWord
                      );
                      const isVocab = vocabWord && showVocab;

                      return (
                        <span
                          key={j}
                          className={`inline cursor-pointer transition-colors ${
                            isVocab
                              ? "bg-amber/20 text-amber border-b-2 border-amber"
                              : ""
                          }`}
                          onClick={() => isVocab && handleWordClick(vocabWord.word)}
                        >
                          {word}{" "}
                        </span>
                      );
                    })}
                  </p>
                ))}
              </div>
            </article>

            {/* Quiz */}
            <div className="mt-8 bg-white rounded-xl border border-border p-6">
              <h2 className="font-semibold text-ink mb-4">理解测验</h2>
              {!showResults ? (
                <>
                  <div className="space-y-6">
                    {quizQuestions.map((question, qIndex) => (
                      <div key={question.id}>
                        <p className="text-ink mb-4">
                          {qIndex + 1}. {question.question}
                        </p>
                        <div className="space-y-2">
                          {question.options.map((option, oIndex) => (
                            <button
                              key={oIndex}
                              onClick={() => handleQuiz(question.id, oIndex)}
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
                      disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                      className="px-6 py-3 bg-amber text-white rounded-lg font-medium hover:bg-amber/90 transition-colors disabled:opacity-50"
                    >
                      查看结果
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  {quizQuestions.map((question, qIndex) => {
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
                            <p className="text-sm text-muted mt-1">{question.explanation}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Wordbook Notification */}
            <AnimatePresence>
              {showWordbookNotification && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-sage text-white rounded-lg shadow-lg text-sm font-medium"
                >
                  ✅ 已加入单词本！
                </motion.div>
              )}
            </AnimatePresence>

            {/* Wordbook Sidebar */}
            <div className="bg-white rounded-xl border border-border p-4 sm:p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-ink">我的单词本 ({wordbook.length})</h3>
                {wordbook.length > 0 && (
                  <button
                    onClick={() => setWordbook([])}
                    className="text-xs text-coral hover:text-coral/80"
                  >
                    清空
                  </button>
                )}
              </div>
              {wordbook.length === 0 ? (
                <p className="text-sm text-muted">点击文章中的重点词汇「+ 加入单词本」按钮添加单词</p>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {wordbook.map((w) => (
                    <div key={w.word} className="flex items-center justify-between p-2 bg-surface rounded-lg">
                      <div>
                        <span className="font-medium text-sm text-ink">{w.word}</span>
                        <span className="text-xs text-muted ml-2">{w.meaning}</span>
                      </div>
                      <button
                        onClick={() => removeFromWordbook(w.word)}
                        className="text-xs text-coral hover:text-coral/80 px-2 py-1"
                      >
                        删除
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Vocab Sidebar */}
            <div className="bg-white rounded-xl border border-border p-4 sm:p-6">
              <h3 className="font-semibold text-ink mb-4">重点词汇</h3>
              <div className="space-y-4">
                {vocab.map((word) => (
                  <div
                    key={word.word}
                    className={`p-3 rounded-lg transition-colors cursor-pointer ${
                      selectedWord === word.word
                        ? "bg-amber/10 border border-amber"
                        : "bg-surface"
                    }`}
                    onClick={() => handleWordClick(word.word)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-ink">{word.word}</span>
                      <span className="text-xs text-muted capitalize">{word.partOfSpeech}</span>
                    </div>
                    <p className="text-sm text-inkLight">{word.meaning}</p>
                    <p className="text-xs text-muted mt-1 italic">{word.context}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToWordbook(word);
                      }}
                      className="mt-2 text-xs px-2 py-1 rounded bg-amber/10 text-amber hover:bg-amber hover:text-white transition-colors"
                    >
                      + 加入单词本
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Grammar Summary */}
            <div className="bg-white rounded-xl border border-border p-6">
              <h3 className="font-semibold text-ink mb-4">语法摘要</h3>
              <div className="space-y-3">
                {grammar.map((item) => (
                  <div key={item.structure} className="bg-surface rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-ink">{item.structure}</span>
                      <span className="text-xs text-muted">{item.count} 次</span>
                    </div>
                    <div className="space-y-1">
                      {item.examples.slice(0, 2).map((example, i) => (
                        <p key={i} className="text-xs text-inkLight italic">{example}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-2">新闻精读</h1>
            <p className="text-sm sm:text-base text-inkLight">精选外刊文章与实时新闻，逐句拆解语法与词汇</p>
          </div>
          <button
            onClick={handleRefreshNews}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-amber text-white rounded-lg hover:bg-amber/90 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            刷新新闻
          </button>
        </div>
        <div className="flex items-center gap-2 mt-2 text-sm text-muted">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span className="break-all">上次更新：{lastUpdated} | 演示模式：实际项目可接入 NewsAPI / GNews 获取实时新闻</span>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => { setActiveTab("featured"); setSelectedCategory("All"); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "featured"
              ? "bg-amber text-white"
              : "bg-surface text-inkLight hover:bg-border"
          }`}
        >
          <BookOpen className="w-4 h-4 inline mr-2" />
          精选文章
        </button>
        <button
          onClick={() => { setActiveTab("news"); setSelectedCategory("All"); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "news"
              ? "bg-sage text-white"
              : "bg-surface text-inkLight hover:bg-border"
          }`}
        >
          <Globe className="w-4 h-4 inline mr-2" />
          实时新闻
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? activeTab === "featured" ? "bg-amber text-white" : "bg-sage text-white"
                : "bg-surface text-inkLight hover:bg-border"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedArticle(article.id)}
          >
            <div className="h-48 bg-surface flex items-center justify-center relative">
              <Newspaper className="w-16 h-16 text-muted" />
              {article.id.startsWith("news-") && (
                <span className="absolute top-3 right-3 px-2 py-1 bg-sage/10 text-sage text-xs rounded-full flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  实时
                </span>
              )}
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-muted">{article.source}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    article.difficulty === "初级"
                      ? "bg-sage/10 text-sage"
                      : article.difficulty === "中级"
                      ? "bg-amber/10 text-amber"
                      : "bg-coral/10 text-coral"
                  }`}
                >
                  {article.difficulty}
                </span>
              </div>
              <h3 className="font-semibold text-ink mb-2">{article.title}</h3>
              <p className="text-sm text-inkLight mb-4">{article.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-muted">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  {article.grammarCount} 语法
                </span>
                <span className="flex items-center gap-1">
                  <Volume2 className="w-3 h-3" />
                  {article.vocabCount} 词汇
                </span>
                <span>{article.readTime}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-16">
          <Newspaper className="w-16 h-16 text-muted mx-auto mb-4" />
          <p className="text-inkLight">该分类下暂无文章</p>
        </div>
      )}
    </div>
  );
}
