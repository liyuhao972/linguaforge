export interface Article {
  id: string;
  title: string;
  source: string;
  author: string;
  date: string;
  difficulty: string;
  excerpt: string;
  category: string;
  grammarCount: number;
  vocabCount: number;
  readTime: string;
}

export interface VocabWord {
  word: string;
  phonetic: string;
  partOfSpeech: string;
  meaning: string;
  context: string;
}

export interface GrammarAnalysis {
  structure: string;
  count: number;
  examples: string[];
}

export const articles: Article[] = [
  {
    id: "1",
    title: "The Future of Remote Work",
    source: "BBC",
    author: "Sarah Johnson",
    date: "2026-04-15",
    difficulty: "中级",
    excerpt: "As companies worldwide adapt to new ways of working, the future of remote work remains a topic of intense debate among business leaders, employees, and policymakers alike.",
    category: "Business",
    grammarCount: 12,
    vocabCount: 8,
    readTime: "5 min",
  },
  {
    id: "2",
    title: "Climate Change: A Global Challenge",
    source: "The Guardian",
    author: "Michael Chen",
    date: "2026-04-10",
    difficulty: "高级",
    excerpt: "Scientists have warned that without immediate action, the effects of climate change will become irreversible, threatening ecosystems and human societies worldwide.",
    category: "Science",
    grammarCount: 15,
    vocabCount: 12,
    readTime: "7 min",
  },
  {
    id: "3",
    title: "The Art of Mindful Living",
    source: "NYT",
    author: "Emma Williams",
    date: "2026-04-08",
    difficulty: "初级",
    excerpt: "In our fast-paced world, finding moments of peace and mindfulness has become more important than ever for maintaining mental health and well-being.",
    category: "Culture",
    grammarCount: 8,
    vocabCount: 6,
    readTime: "4 min",
  },
  {
    id: "4",
    title: "AI Revolution in Healthcare",
    source: "BBC",
    author: "Dr. James Liu",
    date: "2026-04-05",
    difficulty: "中级",
    excerpt: "Artificial intelligence is transforming healthcare delivery, from diagnostic imaging to personalized treatment plans, promising more accurate and efficient patient care.",
    category: "Tech",
    grammarCount: 10,
    vocabCount: 9,
    readTime: "6 min",
  },
  {
    id: "5",
    title: "Sustainable Tourism on the Rise",
    source: "The Times",
    author: "Lisa Anderson",
    date: "2026-04-01",
    difficulty: "中级",
    excerpt: "Travelers are increasingly seeking eco-friendly destinations and sustainable travel options, driving a major shift in the tourism industry.",
    category: "World",
    grammarCount: 11,
    vocabCount: 7,
    readTime: "5 min",
  },
  {
    id: "6",
    title: "The Science of Sleep",
    source: "NYT",
    author: "Dr. Robert Park",
    date: "2026-03-28",
    difficulty: "初级",
    excerpt: "New research reveals the critical importance of quality sleep for cognitive function, emotional regulation, and overall physical health.",
    category: "Science",
    grammarCount: 9,
    vocabCount: 8,
    readTime: "4 min",
  },
];

export const articleContents: Record<string, string> = {
  "1": `As companies worldwide adapt to new ways of working, the future of remote work remains a topic of intense debate among business leaders, employees, and policymakers alike.

The COVID-19 pandemic accelerated a trend that was already gaining momentum, forcing organizations to embrace distributed teams and digital collaboration tools. What began as a temporary measure has evolved into a permanent shift for many companies.

However, this transformation is not without its challenges. While some employees thrive in the flexibility of working from home, others struggle with the isolation and blurred boundaries between personal and professional life.

Recent studies suggest that a hybrid approach—combining remote work with periodic office presence—may offer the best of both worlds. This model allows for the autonomy and focus that remote work provides while maintaining the social connections and collaborative energy of in-person interactions.

As we look to the future, it is clear that the nature of work has been fundamentally altered. The question is no longer whether remote work is viable, but how we can optimize it to benefit both individuals and organizations.`,

  "2": `Scientists have warned that without immediate action, the effects of climate change will become irreversible, threatening ecosystems and human societies worldwide.

The latest report from the Intergovernmental Panel on Climate Change (IPCC) paints a stark picture of what lies ahead if global temperatures continue to rise at current rates. Rising sea levels, extreme weather events, and biodiversity loss are just some of the consequences we face.

However, the report also offers hope. It emphasizes that we still have time to act, provided we make significant changes to our energy systems, transportation, and agricultural practices within the next decade.

Countries around the world are setting ambitious targets for carbon neutrality. The European Union aims to be climate-neutral by 2050, while China has pledged to peak emissions before 2030 and achieve carbon neutrality by 2060.

Individual actions matter too. From reducing meat consumption to using public transportation, every choice contributes to the collective effort needed to address this global challenge.`,

  "3": `In our fast-paced world, finding moments of peace and mindfulness has become more important than ever for maintaining mental health and well-being.

Mindfulness, the practice of being present and fully engaged with whatever we're doing, has gained significant attention in recent years. Research shows that regular mindfulness practice can reduce stress, improve focus, and enhance emotional regulation.

The benefits extend beyond mental health. Studies have found that mindfulness can lower blood pressure, improve sleep quality, and even boost immune function. It's no wonder that major corporations, from Google to Goldman Sachs, have implemented mindfulness programs for their employees.

Starting a mindfulness practice doesn't require special equipment or extensive training. Simple breathing exercises, mindful walking, or even mindful eating can be effective entry points.

The key is consistency. Even five minutes of daily practice can yield noticeable benefits over time. As the ancient proverb says, "The best time to plant a tree was 20 years ago. The second best time is now."`,
};

export const vocabWords: Record<string, VocabWord[]> = {
  "1": [
    { word: "adapt", phonetic: "/əˈdæpt/", partOfSpeech: "verb", meaning: "适应；调整", context: "companies adapt to new ways of working" },
    { word: "momentum", phonetic: "/məˈmen.təm/", partOfSpeech: "noun", meaning: "势头；动力", context: "trend that was already gaining momentum" },
    { word: "distributed", phonetic: "/dɪˈstrɪb.ju.tɪd/", partOfSpeech: "adjective", meaning: "分布式的；分散的", context: "distributed teams and digital collaboration" },
    { word: "hybrid", phonetic: "/ˈhaɪ.brɪd/", partOfSpeech: "adjective", meaning: "混合的", context: "hybrid approach combining remote and office" },
    { word: "autonomy", phonetic: "/ɔːˈtɒn.ə.mi/", partOfSpeech: "noun", meaning: "自主性", context: "autonomy and focus that remote work provides" },
  ],
  "2": [
    { word: "irreversible", phonetic: "/ˌɪr.ɪˈvɜː.sə.bəl/", partOfSpeech: "adjective", meaning: "不可逆的", context: "effects will become irreversible" },
    { word: "biodiversity", phonetic: "/ˌbaɪ.əʊ.daɪˈvɜː.sɪ.ti/", partOfSpeech: "noun", meaning: "生物多样性", context: "biodiversity loss are consequences we face" },
    { word: "neutrality", phonetic: "/njuːˈtræl.ə.ti/", partOfSpeech: "noun", meaning: "中性；中立", context: "targets for carbon neutrality" },
    { word: "ambitious", phonetic: "/æmˈbɪʃ.əs/", partOfSpeech: "adjective", meaning: "雄心勃勃的", context: "ambitious targets for carbon neutrality" },
    { word: "emissions", phonetic: "/ɪˈmɪʃ.ənz/", partOfSpeech: "noun", meaning: "排放物", context: "pledged to peak emissions before 2030" },
  ],
  "3": [
    { word: "mindfulness", phonetic: "/ˈmaɪnd.fəl.nəs/", partOfSpeech: "noun", meaning: "正念；专注", context: "practice of mindfulness has gained attention" },
    { word: "regulation", phonetic: "/ˌreɡ.juˈleɪ.ʃən/", partOfSpeech: "noun", meaning: "调节；管理", context: "enhance emotional regulation" },
    { word: "implement", phonetic: "/ˈɪm.plɪ.ment/", partOfSpeech: "verb", meaning: "实施；执行", context: "implemented mindfulness programs" },
    { word: "consistent", phonetic: "/kənˈsɪs.tənt/", partOfSpeech: "adjective", meaning: "一致的；持续的", context: "The key is consistency" },
    { word: "yield", phonetic: "/jiːld/", partOfSpeech: "verb", meaning: "产生；产出", context: "can yield noticeable benefits" },
  ],
};

export const grammarAnalysis: Record<string, GrammarAnalysis[]> = {
  "1": [
    { structure: "定语从句", count: 3, examples: ["trend that was already gaining momentum", "flexibility of working from home", "autonomy that remote work provides"] },
    { structure: "被动语态", count: 2, examples: ["has been fundamentally altered", "can be optimized"] },
    { structure: "现在完成时", count: 4, examples: ["has evolved", "has gained", "has become", "has been altered"] },
  ],
  "2": [
    { structure: "条件句", count: 2, examples: ["if global temperatures continue", "provided we make significant changes"] },
    { structure: "被动语态", count: 3, examples: ["are setting", "has been pledged", "be addressed"] },
    { structure: "将来时", count: 5, examples: ["will become", "will face", "aims to be", "pledged to peak", "needed to address"] },
  ],
  "3": [
    { structure: "动名词", count: 3, examples: ["finding moments", "maintaining mental health", "being present"] },
    { structure: "现在完成时", count: 3, examples: ["has gained", "has found", "have implemented"] },
    { structure: "比较级", count: 2, examples: ["more important than ever", "better entry points"] },
  ],
};

export const categories = ["All", "World", "Business", "Science", "Culture", "Opinion", "Tech", "科技", "环境", "商业", "健康"];
