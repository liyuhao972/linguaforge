export interface GrammarLesson {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  progress: number;
  example: string;
  topics: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hint: string;
  type: "choice" | "fill" | "reorder";
}

export interface GrammarColor {
  type: string;
  color: string;
  label: string;
  description: string;
  bg?: string;
  text?: string;
}

// 9色语法标注系统
export const grammarColors: GrammarColor[] = [
  { type: "noun", color: "#F2A93B", label: "名词", description: "表示人、事物、地点或抽象概念" },
  { type: "verb", color: "#E05263", label: "动词", description: "表示动作或状态" },
  { type: "adjective", color: "#7CC67A", label: "形容词", description: "修饰名词，描述性质或特征" },
  { type: "adverb", color: "#9B8AFB", label: "副词", description: "修饰动词、形容词或其他副词" },
  { type: "preposition", color: "#2CB5A0", label: "介词", description: "表示位置、方向、时间等关系" },
  { type: "conjunction", color: "#F97316", label: "连词", description: "连接词、短语或句子" },
  { type: "pronoun", color: "#06B6D4", label: "代词", description: "代替名词使用" },
  { type: "article", color: "#8B5CF6", label: "冠词", description: "限定名词（a/an/the）" },
  { type: "interjection", color: "#EC4899", label: "感叹词", description: "表达强烈情感" },
];

// 30个语法单元 - 从初级到高级全覆盖
export const grammarLessons: GrammarLesson[] = [
  // 初级 (1-10)
  {
    id: "1",
    title: "一般现在时",
    description: "表示经常性、习惯性的动作或状态",
    difficulty: "beginner",
    progress: 0,
    example: "She works in a hospital. / Water boils at 100°C.",
    topics: ["第三人称单数", "频率副词", "习惯动作"],
  },
  {
    id: "2",
    title: "一般过去时",
    description: "表示过去发生的动作或状态",
    difficulty: "beginner",
    progress: 0,
    example: "I visited Paris last summer. / She was happy yesterday.",
    topics: ["规则动词", "不规则动词", "时间状语"],
  },
  {
    id: "3",
    title: "一般将来时",
    description: "表示将来要发生的动作或状态",
    difficulty: "beginner",
    progress: 0,
    example: "I will call you tomorrow. / She is going to study abroad.",
    topics: ["will", "be going to", "将来时间表达"],
  },
  {
    id: "4",
    title: "现在进行时",
    description: "表示正在进行的动作",
    difficulty: "beginner",
    progress: 0,
    example: "They are playing football now. / I am studying English.",
    topics: ["be + doing", "现在进行表将来", "状态动词"],
  },
  {
    id: "5",
    title: "过去进行时",
    description: "表示过去某一时刻正在进行的动作",
    difficulty: "beginner",
    progress: 0,
    example: "I was reading when she called. / They were having dinner at 8pm.",
    topics: ["was/were + doing", "时间状语从句", "背景描述"],
  },
  {
    id: "6",
    title: "冠词",
    description: "不定冠词a/an和定冠词the的用法",
    difficulty: "beginner",
    progress: 0,
    example: "A university / An hour / The sun / The tallest building",
    topics: ["不定冠词", "定冠词", "零冠词"],
  },
  {
    id: "7",
    title: "名词单复数",
    description: "可数名词和不可数名词的用法",
    difficulty: "beginner",
    progress: 0,
    example: "One child, two children / Some advice / A piece of furniture",
    topics: ["规则复数", "不规则复数", "不可数名词"],
  },
  {
    id: "8",
    title: "形容词和副词",
    description: "形容词修饰名词，副词修饰动词、形容词或其他副词",
    difficulty: "beginner",
    progress: 0,
    example: "She is very beautiful. / He runs extremely fast.",
    topics: ["形容词位置", "副词位置", "比较级和最高级"],
  },
  {
    id: "9",
    title: "介词",
    description: "表示时间、地点、方向等关系的词",
    difficulty: "beginner",
    progress: 0,
    example: "The book is on the table. / I will meet you at 3pm.",
    topics: ["时间介词", "地点介词", "介词短语"],
  },
  {
    id: "10",
    title: "情态动词",
    description: "can, could, may, might, must, should等",
    difficulty: "beginner",
    progress: 0,
    example: "You must finish your homework. / It might rain tomorrow.",
    topics: ["能力", "可能性", "义务和建议"],
  },
  // 中级 (11-20)
  {
    id: "11",
    title: "现在完成时",
    description: "表示过去发生并与现在有联系的动作",
    difficulty: "intermediate",
    progress: 0,
    example: "I have lived here for 10 years. / She has just left.",
    topics: ["have/has + done", "for/since", "just/already/yet"],
  },
  {
    id: "12",
    title: "过去完成时",
    description: "表示在过去某一时间之前已经完成的动作",
    difficulty: "intermediate",
    progress: 0,
    example: "When I arrived, the train had already left.",
    topics: ["had + done", "时间先后", "间接引语"],
  },
  {
    id: "13",
    title: "将来完成时",
    description: "表示在将来某一时间之前会完成的动作",
    difficulty: "intermediate",
    progress: 0,
    example: "By next year, I will have graduated.",
    topics: ["will have done", "by + 时间", "完成时态对比"],
  },
  {
    id: "14",
    title: "被动语态",
    description: "强调动作的承受者而非执行者",
    difficulty: "intermediate",
    progress: 0,
    example: "The book was written by Hemingway. / English is spoken worldwide.",
    topics: ["be + done", "不同时态的被动", "by短语"],
  },
  {
    id: "15",
    title: "条件句",
    description: "真实条件句和虚拟条件句",
    difficulty: "intermediate",
    progress: 0,
    example: "If it rains, I will stay home. / If I were rich, I would travel.",
    topics: ["第一条件句", "第二条件句", "第三条件句"],
  },
  {
    id: "16",
    title: "定语从句",
    description: "用关系代词或关系副词引导的从句",
    difficulty: "intermediate",
    progress: 0,
    example: "The man who lives next door is a doctor. / The city where I was born.",
    topics: ["关系代词", "关系副词", "限制性与非限制性"],
  },
  {
    id: "17",
    title: "名词性从句",
    description: "主语从句、宾语从句、表语从句和同位语从句",
    difficulty: "intermediate",
    progress: 0,
    example: "What he said surprised me. / I believe that he is honest.",
    topics: ["that从句", "wh-从句", "whether/if"],
  },
  {
    id: "18",
    title: "状语从句",
    description: "时间、原因、目的、结果、让步等从句",
    difficulty: "intermediate",
    progress: 0,
    example: "Although it was raining, we went out. / I study hard so that I can pass.",
    topics: ["时间状语", "原因状语", "让步状语", "目的状语"],
  },
  {
    id: "19",
    title: "虚拟语气",
    description: "表示与事实相反或不可能实现的愿望",
    difficulty: "intermediate",
    progress: 0,
    example: "I wish I were taller. / If only I had studied harder!",
    topics: ["wish", "if only", "would rather", "as if"],
  },
  {
    id: "20",
    title: "间接引语",
    description: "转述他人的话语",
    difficulty: "intermediate",
    progress: 0,
    example: 'He said that he was tired. / She asked if I was coming.',
    topics: ["陈述句转述", "疑问句转述", "祈使句转述", "时态变化"],
  },
  // 高级 (21-30)
  {
    id: "21",
    title: "倒装句",
    description: "为了强调或语法需要而改变正常语序",
    difficulty: "advanced",
    progress: 0,
    example: "Never have I seen such beauty. / Hardly had I arrived when it rained.",
    topics: ["否定词前置", "so/neither倒装", "地点状语前置"],
  },
  {
    id: "22",
    title: "强调句",
    description: "用It is/was...that结构强调句子成分",
    difficulty: "advanced",
    progress: 0,
    example: "It was John who broke the window. / It is today that we must act.",
    topics: ["It is...that", "助动词强调", "what从句强调"],
  },
  {
    id: "23",
    title: "独立主格",
    description: "带有自己主语的非谓语动词结构",
    difficulty: "advanced",
    progress: 0,
    example: "Weather permitting, we will go hiking. / All things considered, it's a good deal.",
    topics: ["名词+分词", "with复合结构", "独立主格功能"],
  },
  {
    id: "24",
    title: "非谓语动词",
    description: "不定式、动名词和分词的用法",
    difficulty: "advanced",
    progress: 0,
    example: "To err is human. / I enjoy swimming. / The broken window needs repair.",
    topics: ["不定式", "动名词", "现在分词", "过去分词"],
  },
  {
    id: "25",
    title: "主谓一致",
    description: "主语和谓语动词在人称和数上的一致",
    difficulty: "advanced",
    progress: 0,
    example: "The team is winning. / Neither he nor I am going. / Ten miles is a long walk.",
    topics: ["集体名词", "就近原则", "数量词", "从句主语"],
  },
  {
    id: "26",
    title: "省略与替代",
    description: "为了避免重复而省略或替代句子成分",
    difficulty: "advanced",
    progress: 0,
    example: "If possible, come early. / I like tea, but Mary coffee. / So do I.",
    topics: ["省略句", "替代词", "so/neither", "比较级省略"],
  },
  {
    id: "27",
    title: "复杂句型分析",
    description: "多重从句嵌套和长难句解析",
    difficulty: "advanced",
    progress: 0,
    example: "What surprised me was that he denied what he had said before.",
    topics: ["多重从句", "嵌套结构", "长难句拆解"],
  },
  {
    id: "28",
    title: "情态动词高级用法",
    description: "情态动词的特殊含义和推测用法",
    difficulty: "advanced",
    progress: 0,
    example: "He must have forgotten. / You needn't have worried. / She can't be serious.",
    topics: ["推测用法", "needn't have", "would have done", "半情态动词"],
  },
  {
    id: "29",
    title: "时态呼应",
    description: "主从句时态的协调和呼应规则",
    difficulty: "advanced",
    progress: 0,
    example: "I knew he was busy. / She said she had finished. / I will tell him when he comes.",
    topics: ["时态一致", "时间状语从句", "条件状语从句"],
  },
  {
    id: "30",
    title: "特殊句式",
    description: "存在句、分裂句、拟声句等特殊结构",
    difficulty: "advanced",
    progress: 0,
    example: "There is a book on the table. / What I need is a good rest.",
    topics: ["There be句型", "分裂句", "拟声句", "感叹句"],
  },
];

// 60道语法练习题 - 覆盖所有单元
export const quizQuestions: QuizQuestion[] = [
  // 一般现在时
  {
    id: "q1",
    question: "She _____ to the gym every morning.",
    options: ["go", "goes", "going", "went"],
    correctAnswer: 1,
    explanation: "一般现在时第三人称单数，动词后加-es。",
    hint: "注意主语是第三人称单数she",
    type: "choice",
  },
  {
    id: "q2",
    question: "Water _____ at 100 degrees Celsius.",
    options: ["boil", "boils", "boiled", "boiling"],
    correctAnswer: 1,
    explanation: "客观真理用一般现在时，water是不可数名词，动词用第三人称单数。",
    hint: "客观真理永远用一般现在时",
    type: "choice",
  },
  // 一般过去时
  {
    id: "q3",
    question: "I _____ to Paris last summer.",
    options: ["go", "went", "have gone", "am going"],
    correctAnswer: 1,
    explanation: "last summer表示过去时间，用一般过去时。go的过去式是went。",
    hint: "last summer是过去时间标志",
    type: "choice",
  },
  {
    id: "q4",
    question: "She _____ happy when she heard the news.",
    options: ["is", "was", "were", "been"],
    correctAnswer: 1,
    explanation: "heard是过去时，主句也用过去时。she对应was。",
    hint: "heard提示过去时态",
    type: "choice",
  },
  // 现在完成时
  {
    id: "q5",
    question: "I _____ in this city for 10 years.",
    options: ["live", "lived", "have lived", "am living"],
    correctAnswer: 2,
    explanation: "for 10 years表示从过去持续到现在的动作，用现在完成时。",
    hint: "for + 时间段 = 现在完成时标志",
    type: "choice",
  },
  {
    id: "q6",
    question: "She has just _____ the report.",
    options: ["finish", "finishes", "finished", "finishing"],
    correctAnswer: 2,
    explanation: "现在完成时结构：have/has + 过去分词。just常与现在完成时连用。",
    hint: "has + 过去分词",
    type: "choice",
  },
  // 被动语态
  {
    id: "q7",
    question: "The letter _____ yesterday.",
    options: ["is sent", "was sent", "sent", "sends"],
    correctAnswer: 1,
    explanation: "yesterday表示过去，被动语态结构：be + 过去分词。",
    hint: "yesterday + 被动语态",
    type: "choice",
  },
  {
    id: "q8",
    question: "English _____ all over the world.",
    options: ["speaks", "is spoken", "spoke", "speaking"],
    correctAnswer: 1,
    explanation: "客观事实用一般现在时的被动语态：is/am/are + 过去分词。",
    hint: "客观事实 + 被动",
    type: "choice",
  },
  // 定语从句
  {
    id: "q9",
    question: "The man _____ lives next door is a doctor.",
    options: ["who", "which", "whose", "whom"],
    correctAnswer: 0,
    explanation: "先行词是the man（人），关系代词在从句中作主语，用who。",
    hint: "人 + 主语 = who",
    type: "choice",
  },
  {
    id: "q10",
    question: "This is the city _____ I was born.",
    options: ["which", "where", "that", "who"],
    correctAnswer: 1,
    explanation: "先行词是the city（地点），关系副词where在从句中作地点状语。",
    hint: "地点 + 状语 = where",
    type: "choice",
  },
  // 条件句
  {
    id: "q11",
    question: "If it _____ tomorrow, I will stay home.",
    options: ["rains", "rain", "will rain", "rained"],
    correctAnswer: 0,
    explanation: "第一条件句：if从句用一般现在时，主句用will + 动词原形。",
    hint: "第一条件句：if一般现在，主句will",
    type: "choice",
  },
  {
    id: "q12",
    question: "If I _____ rich, I would buy a yacht.",
    options: ["am", "were", "was", "be"],
    correctAnswer: 1,
    explanation: "第二条件句：if从句用一般过去时（be动词一律用were），主句用would + 动词原形。",
    hint: "第二条件句：if + 过去式，were用于所有人称",
    type: "choice",
  },
  // 虚拟语气
  {
    id: "q13",
    question: "I wish I _____ taller.",
    options: ["am", "were", "was", "be"],
    correctAnswer: 1,
    explanation: "wish后的从句用虚拟语气，表示与现在事实相反，be动词一律用were。",
    hint: "wish + 过去式（be用were）",
    type: "choice",
  },
  {
    id: "q14",
    question: "If only I _____ harder for the exam!",
    options: ["study", "studied", "had studied", "have studied"],
    correctAnswer: 2,
    explanation: "If only表示与过去事实相反的愿望，用过去完成时had + done。",
    hint: "与过去相反 = had + done",
    type: "choice",
  },
  // 间接引语
  {
    id: "q15",
    question: 'He said, "I am tired." → He said that he _____ tired.',
    options: ["is", "was", "were", "be"],
    correctAnswer: 1,
    explanation: "间接引语中，主句是过去时said，从句时态要倒退：一般现在时→一般过去时。",
    hint: "直接引语变间接引语，时态倒退",
    type: "choice",
  },
  {
    id: "q16",
    question: 'She asked, "Are you coming?" → She asked if I _____.',
    options: ["am coming", "was coming", "were coming", "come"],
    correctAnswer: 1,
    explanation: "一般疑问句变间接引语用if/whether。时态倒退：现在进行时→过去进行时。",
    hint: "一般疑问句 → if + 陈述句语序",
    type: "choice",
  },
  // 倒装句
  {
    id: "q17",
    question: "_____ have I seen such a beautiful sunset.",
    options: ["Always", "Often", "Never", "Sometimes"],
    correctAnswer: 2,
    explanation: "否定词Never置于句首，句子需要部分倒装：助动词have提前。",
    hint: "否定词开头 = 部分倒装",
    type: "choice",
  },
  {
    id: "q18",
    question: "Hardly _____ the house when it started to rain.",
    options: ["I left", "did I leave", "I had left", "had I left"],
    correctAnswer: 3,
    explanation: "Hardly...when结构：hardly后接过去完成时的倒装，when后接一般过去时。",
    hint: "Hardly + had + 主语 + done...when",
    type: "choice",
  },
  // 强调句
  {
    id: "q19",
    question: "It was _____ broke the window.",
    options: ["him who", "he who", "his that", "him that"],
    correctAnswer: 1,
    explanation: "强调句结构：It is/was + 被强调部分 + who/that + 其余部分。强调人用who。",
    hint: "It is/was...who/that",
    type: "choice",
  },
  {
    id: "q20",
    question: "_____ that we should act now.",
    options: ["It is urgent", "Urgent is it", "Is it urgent", "Urgent it is"],
    correctAnswer: 0,
    explanation: "正常语序即可，It is + 形容词 + that从句是常见的强调/评价结构。",
    hint: "It is + adj + that 从句",
    type: "choice",
  },
  // 非谓语动词
  {
    id: "q21",
    question: "_____ is human.",
    options: ["To err", "Erring", "Err", "Erred"],
    correctAnswer: 0,
    explanation: "不定式作主语：To err is human = To make mistakes is human. 这是固定表达。",
    hint: "不定式可以作主语",
    type: "choice",
  },
  {
    id: "q22",
    question: "I enjoy _____ in the morning.",
    options: ["swim", "to swim", "swimming", "swam"],
    correctAnswer: 2,
    explanation: "enjoy后接动名词作宾语：enjoy doing something。",
    hint: "enjoy + doing",
    type: "choice",
  },
  // 主谓一致
  {
    id: "q23",
    question: "The team _____ playing well this season.",
    options: ["is", "are", "were", "be"],
    correctAnswer: 0,
    explanation: "team作为整体时，谓语用单数；强调个体时用复数。这里指整体表现。",
    hint: "集体名词整体 = 单数",
    type: "choice",
  },
  {
    id: "q24",
    question: "Neither he nor I _____ going to the party.",
    options: ["am", "is", "are", "be"],
    correctAnswer: 0,
    explanation: "neither...nor遵循就近原则，谓语与最近的主语I一致，用am。",
    hint: "就近原则：nor后的主语决定谓语",
    type: "choice",
  },
  // 情态动词高级
  {
    id: "q25",
    question: "He _____ have forgotten. The meeting is tomorrow.",
    options: ["must", "can't", "should", "needn't"],
    correctAnswer: 1,
    explanation: "can't have done表示对过去的否定推测：不可能做了某事。",
    hint: "can't have done = 不可能做了",
    type: "choice",
  },
  {
    id: "q26",
    question: "You _____ have worried. Everything was fine.",
    options: ["mustn't", "needn't", "shouldn't", "couldn't"],
    correctAnswer: 1,
    explanation: "needn't have done表示做了不必要的事：本不必做但做了。",
    hint: "needn't have done = 本不必做",
    type: "choice",
  },
  // 状语从句
  {
    id: "q27",
    question: "_____ it was raining, we went out for a walk.",
    options: ["Because", "Although", "If", "Since"],
    correctAnswer: 1,
    explanation: "although表示让步：尽管下雨，我们还是出去了。前后语义转折。",
    hint: "让步 = although/though/even though",
    type: "choice",
  },
  {
    id: "q28",
    question: "I study hard _____ I can get good grades.",
    options: ["because", "so that", "although", "while"],
    correctAnswer: 1,
    explanation: "so that引导目的状语从句，表示为了...，以便...。",
    hint: "so that = 为了，以便",
    type: "choice",
  },
  // 冠词
  {
    id: "q29",
    question: "She is _____ university student.",
    options: ["a", "an", "the", "不填"],
    correctAnswer: 0,
    explanation: "university以辅音音素/j/开头，用a。注意不是看字母u，而是看音素。",
    hint: "a + 辅音音素，an + 元音音素",
    type: "choice",
  },
  {
    id: "q30",
    question: "_____ sun rises in the east.",
    options: ["A", "An", "The", "不填"],
    correctAnswer: 2,
    explanation: "世界上独一无二的事物（太阳、月亮、地球等）前用定冠词the。",
    hint: "独一无二 = the",
    type: "choice",
  },
  // 形容词副词比较级
  {
    id: "q31",
    question: "She is _____ than her sister.",
    options: ["more taller", "much taller", "very taller", "tallest"],
    correctAnswer: 1,
    explanation: "taller已经是比较级，用much修饰加强程度。more不能修饰比较级。",
    hint: "much/even/far + 比较级",
    type: "choice",
  },
  {
    id: "q32",
    question: "This is _____ book I have ever read.",
    options: ["the most interesting", "most interesting", "more interesting", "interesting"],
    correctAnswer: 0,
    explanation: "最高级前必须加the。多音节形容词最高级用the most + 形容词。",
    hint: "the + most + 多音节形容词",
    type: "choice",
  },
  // 名词性从句
  {
    id: "q33",
    question: "_____ he said surprised everyone.",
    options: ["What", "That", "Which", "How"],
    correctAnswer: 0,
    explanation: "what引导主语从句，在从句中作said的宾语，表示他说的话。",
    hint: "what = the thing that",
    type: "choice",
  },
  {
    id: "q34",
    question: "I don't know _____ he will come or not.",
    options: ["if", "whether", "that", "what"],
    correctAnswer: 1,
    explanation: "whether...or not是固定搭配，if不能与or not直接连用。",
    hint: "whether...or not",
    type: "choice",
  },
  // 省略与替代
  {
    id: "q35",
    question: "If _____ , come early.",
    options: ["it is possible", "possible", "is possible", "it possible"],
    correctAnswer: 1,
    explanation: "if possible是if it is possible的省略形式，是常见省略结构。",
    hint: "if possible = if it is possible",
    type: "choice",
  },
  {
    id: "q36",
    question: "I like tea, but Mary _____ coffee.",
    options: ["likes", "does", "is", "has"],
    correctAnswer: 0,
    explanation: "完整形式是Mary likes coffee。在对比结构中，省略重复部分。",
    hint: "省略重复动词，保留不同宾语",
    type: "choice",
  },
  // 过去完成时
  {
    id: "q37",
    question: "When I arrived, the train _____.",
    options: ["left", "has left", "had left", "was leaving"],
    correctAnswer: 2,
    explanation: "arrived是过去时，火车离开在arrived之前，即过去的过去，用过去完成时。",
    hint: "过去的过去 = 过去完成时",
    type: "choice",
  },
  {
    id: "q38",
    question: "She _____ the report before the meeting started.",
    options: ["didn't finish", "hadn't finished", "hasn't finished", "wasn't finishing"],
    correctAnswer: 1,
    explanation: "started是过去时，finish在started之前且未完成，用过去完成时的否定。",
    hint: "过去完成时否定：hadn't + done",
    type: "choice",
  },
  // 将来时
  {
    id: "q39",
    question: "Look at those clouds! It _____.",
    options: ["will rain", "is going to rain", "rains", "rained"],
    correctAnswer: 1,
    explanation: "有迹象表明即将发生的事，用be going to。will用于临时决定或预测。",
    hint: "有迹象 = be going to",
    type: "choice",
  },
  {
    id: "q40",
    question: "By next year, I _____ my degree.",
    options: ["will finish", "will have finished", "have finished", "finished"],
    correctAnswer: 1,
    explanation: "by next year表示到将来某一时间为止完成的动作，用将来完成时will have done。",
    hint: "by + 将来时间 = 将来完成时",
    type: "choice",
  },
  // 独立主格
  {
    id: "q41",
    question: "_____, we went hiking.",
    options: ["Weather permits", "Weather permitting", "Weather permitted", "Weather is permitting"],
    correctAnswer: 1,
    explanation: "独立主格结构：名词 + 现在分词，表示条件。weather是permit的逻辑主语。",
    hint: "名词 + 分词 = 独立主格",
    type: "choice",
  },
  {
    id: "q42",
    question: "With the work _____, we went home.",
    options: ["do", "done", "doing", "did"],
    correctAnswer: 1,
    explanation: "with + 名词 + 过去分词构成独立主格，表示工作被完成。",
    hint: "with + 名词 + 分词",
    type: "choice",
  },
  // 存在句
  {
    id: "q43",
    question: "There _____ a book and two pens on the desk.",
    options: ["is", "are", "were", "be"],
    correctAnswer: 0,
    explanation: "there be句型遵循就近原则，a book是单数，用is。",
    hint: "there be就近原则",
    type: "choice",
  },
  {
    id: "q44",
    question: "There _____ many reasons for this decision.",
    options: ["is", "are", "was", "be"],
    correctAnswer: 1,
    explanation: "many reasons是复数，用are。",
    hint: "复数主语 = are",
    type: "choice",
  },
  // 分裂句
  {
    id: "q45",
    question: "_____ I need is a good rest.",
    options: ["What", "That", "Which", "How"],
    correctAnswer: 0,
    explanation: "what引导主语从句，在从句中作need的宾语。What I need = The thing that I need。",
    hint: "What I need = The thing that I need",
    type: "choice",
  },
  {
    id: "q46",
    question: "It was in Paris _____ we first met.",
    options: ["where", "that", "which", "when"],
    correctAnswer: 1,
    explanation: "强调句结构：It was + 被强调部分（地点）+ that + 其余部分。强调地点用that。",
    hint: "强调句：It was...that",
    type: "choice",
  },
  // 时态呼应
  {
    id: "q47",
    question: "I will tell him when he _____.",
    options: ["will come", "comes", "came", "is coming"],
    correctAnswer: 1,
    explanation: "时间状语从句中，主句将来时，从句用一般现在时代替将来时。",
    hint: "时间/条件从句：主将从现",
    type: "choice",
  },
  {
    id: "q48",
    question: "She said she _____ me the next day.",
    options: ["will call", "would call", "calls", "called"],
    correctAnswer: 1,
    explanation: "间接引语中，主句said是过去时，从句will要变为would。",
    hint: "will → would",
    type: "choice",
  },
  // 特殊句式
  {
    id: "q49",
    question: "_____ a wonderful day it is!",
    options: ["What", "How", "So", "Such"],
    correctAnswer: 0,
    explanation: "感叹句：What + a/an + 形容词 + 名词 + 主语 + 谓语！",
    hint: "What + a/an + adj + n",
    type: "choice",
  },
  {
    id: "q50",
    question: "_____ beautiful the sunset is!",
    options: ["What", "How", "So", "Such"],
    correctAnswer: 1,
    explanation: "感叹句：How + 形容词/副词 + 主语 + 谓语！",
    hint: "How + adj/adv",
    type: "choice",
  },
  // 动名词 vs 不定式
  {
    id: "q51",
    question: "I remember _____ the door.",
    options: ["to lock", "locking", "lock", "locked"],
    correctAnswer: 1,
    explanation: "remember doing = 记得做过某事（已做）。remember to do = 记得要做某事（未做）。",
    hint: "remember doing = 记得做过",
    type: "choice",
  },
  {
    id: "q52",
    question: "I forgot _____ my keys.",
    options: ["to bring", "bringing", "bring", "brought"],
    correctAnswer: 0,
    explanation: "forget to do = 忘记要做某事（未做）。forget doing = 忘记做过某事（已做但忘了）。",
    hint: "forget to do = 忘记要做",
    type: "choice",
  },
  // 复合形容词
  {
    id: "q53",
    question: "It was a _____ journey.",
    options: ["five-hours", "five-hour", "five hours", "five hour's"],
    correctAnswer: 1,
    explanation: "复合形容词：数词-名词单数，作定语修饰名词。a five-hour journey = a journey of five hours。",
    hint: "数词-名词单数 = 复合形容词",
    type: "choice",
  },
  {
    id: "q54",
    question: "She is a _____ girl.",
    options: ["ten-years-old", "ten-year-old", "ten years old", "ten years' old"],
    correctAnswer: 1,
    explanation: "复合形容词作定语：a ten-year-old girl。作表语：She is ten years old。",
    hint: "定语用连字符，表语不用",
    type: "choice",
  },
  // 反意疑问句
  {
    id: "q55",
    question: "You are coming, _____?",
    options: ["are you", "aren't you", "do you", "don't you"],
    correctAnswer: 1,
    explanation: "反意疑问句：前肯后否。are的否定形式是aren't。",
    hint: "前肯后否，前否后肯",
    type: "choice",
  },
  {
    id: "q56",
    question: "He never smokes, _____?",
    options: ["does he", "doesn't he", "is he", "isn't he"],
    correctAnswer: 0,
    explanation: "never是否定词，前否后肯。smokes是实义动词，用does提问。",
    hint: "never = 否定，前否后肯",
    type: "choice",
  },
  // 双重否定
  {
    id: "q57",
    question: "I can't _____ agree with you more.",
    options: ["not", "hardly", "never", "不填"],
    correctAnswer: 3,
    explanation: "can't agree more = 完全同意（字面：不能再同意了）。不需要再加否定词。",
    hint: "can't...more = 最高级含义",
    type: "choice",
  },
  {
    id: "q58",
    question: "There is _____ wrong with the machine.",
    options: ["nothing", "anything", "something", "everything"],
    correctAnswer: 0,
    explanation: "There is nothing wrong = 完全没问题。",
    hint: "nothing wrong = 没问题",
    type: "choice",
  },
  // 习语搭配
  {
    id: "q59",
    question: "I am _____ duty today.",
    options: ["in", "on", "at", "for"],
    correctAnswer: 1,
    explanation: "on duty = 值班，是固定搭配。",
    hint: "on duty = 值班（固定搭配）",
    type: "choice",
  },
  {
    id: "q60",
    question: "The meeting is _____ Monday morning.",
    options: ["in", "on", "at", "during"],
    correctAnswer: 1,
    explanation: "具体某天的上午/下午/晚上用on。in用于月份/年份，at用于具体时刻。",
    hint: "on + 具体某天",
    type: "choice",
  },
];

// 按单元分组的练习题
export const quizByLesson: Record<string, QuizQuestion[]> = {
  "1": quizQuestions.slice(0, 2),    // 一般现在时
  "2": quizQuestions.slice(2, 4),    // 一般过去时
  "3": [],                           // 一般将来时
  "4": [],                           // 现在进行时
  "5": [],                           // 过去进行时
  "6": quizQuestions.slice(28, 30),  // 冠词
  "7": [],                           // 名词单复数
  "8": quizQuestions.slice(30, 32),  // 形容词副词
  "9": quizQuestions.slice(58, 60),  // 介词
  "10": [],                          // 情态动词
  "11": quizQuestions.slice(4, 6),   // 现在完成时
  "12": quizQuestions.slice(36, 38), // 过去完成时
  "13": quizQuestions.slice(38, 40), // 将来完成时
  "14": quizQuestions.slice(6, 8),   // 被动语态
  "15": quizQuestions.slice(10, 12), // 条件句
  "16": quizQuestions.slice(8, 10),  // 定语从句
  "17": quizQuestions.slice(32, 34), // 名词性从句
  "18": quizQuestions.slice(26, 28), // 状语从句
  "19": quizQuestions.slice(12, 14), // 虚拟语气
  "20": quizQuestions.slice(14, 16), // 间接引语
  "21": quizQuestions.slice(16, 18), // 倒装句
  "22": quizQuestions.slice(18, 20), // 强调句
  "23": quizQuestions.slice(40, 42), // 独立主格
  "24": quizQuestions.slice(20, 22), // 非谓语动词
  "25": quizQuestions.slice(22, 24), // 主谓一致
  "26": quizQuestions.slice(34, 36), // 省略与替代
  "27": [],                          // 复杂句型
  "28": quizQuestions.slice(24, 26), // 情态动词高级
  "29": quizQuestions.slice(46, 48), // 时态呼应
  "30": quizQuestions.slice(42, 46), // 特殊句式
};
