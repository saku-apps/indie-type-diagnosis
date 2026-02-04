// ===================================
// IndieType診断 - 質問データ
// ===================================

const QUESTIONS = [
    {
        id: 1,
        text: "個人開発を始めた（始めたい）理由は？",
        options: [
            { emoji: "💰", text: "収益を得て自由になりたい", value: "builder" },
            { emoji: "🎨", text: "作りたいものがある", value: "creator" },
            { emoji: "📚", text: "スキルアップ・成長したい", value: "learner" },
            { emoji: "🌟", text: "影響力を持ちたい", value: "influencer" }
        ]
    },
    {
        id: 2,
        text: "開発で一番重視することは？",
        options: [
            { emoji: "⚡", text: "スピード（早くリリース）", value: "speed" },
            { emoji: "✨", text: "クオリティ（完璧に仕上げる）", value: "quality" },
            { emoji: "💡", text: "アイデア（斬新さ・独自性）", value: "idea" },
            { emoji: "📊", text: "数字（ユーザー数・収益）", value: "metrics" }
        ]
    },
    {
        id: 3,
        text: "1週間で開発に使える時間は？",
        options: [
            { emoji: "🕐", text: "5時間以下", value: "parttime" },
            { emoji: "🕑", text: "5〜15時間", value: "sidejob" },
            { emoji: "🕒", text: "15時間以上", value: "fulltime" }
        ]
    },
    {
        id: 4,
        text: "好きな開発領域は？",
        options: [
            { emoji: "🖥️", text: "Webアプリ・サービス", value: "web" },
            { emoji: "📱", text: "モバイルアプリ", value: "mobile" },
            { emoji: "🔧", text: "ツール・CLI・自動化", value: "tool" },
            { emoji: "🤖", text: "AI・機械学習", value: "ai" }
        ]
    },
    {
        id: 5,
        text: "失敗したプロジェクトへの向き合い方は？",
        options: [
            { emoji: "🔄", text: "すぐ次に切り替える", value: "pivot" },
            { emoji: "🔍", text: "原因を深く分析する", value: "analyze" },
            { emoji: "💪", text: "諦めずに続ける", value: "persistent" },
            { emoji: "📝", text: "学びとして記録・共有する", value: "document" }
        ]
    },
    {
        id: 6,
        text: "理想の成功イメージは？",
        options: [
            { emoji: "🏝️", text: "不労所得で自由な生活", value: "passive" },
            { emoji: "🚀", text: "大きくスケールする事業", value: "scale" },
            { emoji: "👥", text: "コミュニティを作って影響を与える", value: "community" },
            { emoji: "🏆", text: "技術力で認められる", value: "recognition" }
        ]
    }
];
