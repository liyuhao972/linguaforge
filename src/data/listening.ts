export interface Scenario {
  id: string;
  title: string;
  description: string;
  emoji: string;
  difficulty: string;
  duration: string;
  vocabulary: string[];
}

export interface DialogueLine {
  speaker: string;
  text: string;
  translation: string;
  grammarNotes?: string;
}

export interface ComprehensionQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const scenarios: Scenario[] = [
  {
    id: "1",
    title: "机场值机",
    description: "办理登机手续、行李托运、座位选择",
    emoji: "✈️",
    difficulty: "中级",
    duration: "5分钟",
    vocabulary: ["check-in", "boarding pass", "luggage", "passport", "gate"],
  },
  {
    id: "2",
    title: "咖啡店点餐",
    description: "点咖啡、询问推荐、支付",
    emoji: "☕",
    difficulty: "初级",
    duration: "3分钟",
    vocabulary: ["espresso", "latte", "cappuccino", "takeaway", "medium roast"],
  },
  {
    id: "3",
    title: "求职面试",
    description: "自我介绍、回答面试问题、询问职位",
    emoji: "💼",
    difficulty: "高级",
    duration: "8分钟",
    vocabulary: ["experience", "qualifications", "strengths", "salary", "benefits"],
  },
  {
    id: "4",
    title: "酒店预订",
    description: "预订房间、询问设施、办理入住",
    emoji: "🏨",
    difficulty: "中级",
    duration: "5分钟",
    vocabulary: ["reservation", "suite", "amenities", "check-in", "checkout"],
  },
  {
    id: "5",
    title: "医生问诊",
    description: "描述症状、询问诊断、开药",
    emoji: "🏥",
    difficulty: "高级",
    duration: "7分钟",
    vocabulary: ["symptoms", "diagnosis", "prescription", "allergy", "dosage"],
  },
  {
    id: "6",
    title: "商务会议",
    description: "讨论项目、提出建议、安排任务",
    emoji: "📊",
    difficulty: "高级",
    duration: "10分钟",
    vocabulary: ["agenda", "deadline", "budget", "proposal", "action items"],
  },
];

export const dialogues: Record<string, DialogueLine[]> = {
  "1": [
    {
      speaker: "Agent",
      text: "Good morning! Welcome to our airline. May I see your passport and ticket, please?",
      translation: "早上好！欢迎乘坐我们的航班。请出示您的护照和机票。",
      grammarNotes: "May I... 用于礼貌请求",
    },
    {
      speaker: "You",
      text: "Sure, here you go. I'm flying to New York today.",
      translation: "当然，给您。我今天要飞往纽约。",
      grammarNotes: "现在进行时表将来计划",
    },
    {
      speaker: "Agent",
      text: "Thank you. Are you checking any bags today?",
      translation: "谢谢。您今天有行李要托运吗？",
      grammarNotes: "现在进行时表安排",
    },
    {
      speaker: "You",
      text: "Yes, I have two suitcases to check. And I'd like a window seat if possible.",
      translation: "是的，我有两个行李箱要托运。如果可能的话，我想要靠窗的座位。",
      grammarNotes: "would like 表示礼貌请求",
    },
    {
      speaker: "Agent",
      text: "Let me check... Yes, we have a window seat available. Here's your boarding pass. Your flight departs from Gate 12 at 10:30 AM.",
      translation: "让我查一下...是的，我们有靠窗座位可用。这是您的登机牌。您的航班上午10:30从12号登机口起飞。",
      grammarNotes: "一般现在时表时刻表",
    },
  ],
  "2": [
    {
      speaker: "Barista",
      text: "Hi there! What can I get for you today?",
      translation: "您好！今天想喝点什么？",
      grammarNotes: "What can I get... 服务用语",
    },
    {
      speaker: "You",
      text: "Hi! I'd like a medium latte, please. Do you have any seasonal specials?",
      translation: "你好！我想要一杯中杯拿铁。你们有什么季节性特饮吗？",
      grammarNotes: "Would like 礼貌点餐",
    },
    {
      speaker: "Barista",
      text: "We do! Our pumpkin spice latte is very popular this time of year. Would you like to try it?",
      translation: "有的！我们的南瓜香料拿铁每年这个时候都很受欢迎。你想试试吗？",
      grammarNotes: "Would you like... 提供建议",
    },
    {
      speaker: "You",
      text: "That sounds great! I'll have that instead. Can I get it to go?",
      translation: "听起来很棒！我要那个代替。可以打包带走吗？",
      grammarNotes: "Will 表决定",
    },
    {
      speaker: "Barista",
      text: "Of course! That's one pumpkin spice latte to go. Anything else?",
      translation: "当然！一杯南瓜香料拿铁打包带走。还要别的吗？",
      grammarNotes: "省略句，完整句子：Is there anything else?",
    },
  ],
  "3": [
    {
      speaker: "Interviewer",
      text: "Good afternoon. Please have a seat. So, tell me a little bit about yourself.",
      translation: "下午好。请坐。那么，介绍一下你自己吧。",
      grammarNotes: "祈使句表礼貌请求",
    },
    {
      speaker: "You",
      text: "Thank you. I'm a software engineer with five years of experience in web development. I've been working with React and Node.js extensively.",
      translation: "谢谢。我是一名软件工程师，有五年网页开发经验。我主要使用React和Node.js。",
      grammarNotes: "现在完成进行时表持续经验",
    },
    {
      speaker: "Interviewer",
      text: "That sounds impressive. What would you say is your greatest strength?",
      translation: "听起来很出色。你认为你最大的优势是什么？",
      grammarNotes: "What would you say... 委婉提问",
    },
    {
      speaker: "You",
      text: "I believe my greatest strength is problem-solving. I enjoy analyzing complex issues and finding efficient solutions.",
      translation: "我认为我最大的优势是解决问题的能力。我喜欢分析复杂问题并找到高效的解决方案。",
      grammarNotes: "动名词作宾语",
    },
    {
      speaker: "Interviewer",
      text: "Excellent. And where do you see yourself in five years?",
      translation: "很好。那么你五年后想达到什么目标？",
      grammarNotes: "Where do you see... 询问未来规划",
    },
  ],
};

export const comprehensionQuestions: Record<string, ComprehensionQuestion[]> = {
  "1": [
    {
      id: "1",
      question: "What does the passenger want?",
      options: [
        "An aisle seat",
        "A window seat",
        "A middle seat",
        "No preference",
      ],
      correctAnswer: 1,
      explanation: "乘客明确说了 'I'd like a window seat if possible.'",
    },
    {
      id: "2",
      question: "How many bags is the passenger checking?",
      options: ["None", "One", "Two", "Three"],
      correctAnswer: 2,
      explanation: "乘客说 'I have two suitcases to check.'",
    },
  ],
  "2": [
    {
      id: "1",
      question: "What does the customer order in the end?",
      options: [
        "Medium latte",
        "Pumpkin spice latte",
        "Espresso",
        "Cappuccino",
      ],
      correctAnswer: 1,
      explanation: "顾客最后说 'I'll have that instead'，指的是南瓜香料拿铁。",
    },
    {
      id: "2",
      question: "How does the customer want their drink?",
      options: [
        "For here",
        "To go",
        "In a mug",
        "With extra sugar",
      ],
      correctAnswer: 1,
      explanation: "顾客问 'Can I get it to go?'",
    },
  ],
  "3": [
    {
      id: "1",
      question: "How many years of experience does the candidate have?",
      options: ["Two", "Three", "Five", "Ten"],
      correctAnswer: 2,
      explanation: "候选人说 'five years of experience'。",
    },
    {
      id: "2",
      question: "What does the candidate say is their greatest strength?",
      options: [
        "Communication",
        "Problem-solving",
        "Leadership",
        "Creativity",
      ],
      correctAnswer: 1,
      explanation: "候选人说 'my greatest strength is problem-solving'。",
    },
  ],
};
