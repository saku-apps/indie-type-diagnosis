// ===================================
// IndieType診断 - 結果データ
// ===================================

const RESULT_TYPES = {
    rocket: {
        icon: "🚀",
        type: "ロケットビルダー型",
        catchcopy: "「スピードこそ正義」",
        description: "あなたは素早くプロダクトを世に出し、フィードバックを得ながら改善していくタイプ。完璧を求めすぎず、まず動くものを作ることができる稀有な才能の持ち主です。",
        products: ["Chrome拡張", "CLIツール", "MVP", "ランディングページ"],
        style: "最小限の機能でリリース → ユーザーの声を聞いて改善するサイクルが得意。週末ハッカソン的なスタイルで次々とアイデアを形にしましょう。",
        stats: { speed: 95, quality: 60, creativity: 70 }
    },
    craftsman: {
        icon: "🎨",
        type: "クラフトマン型",
        catchcopy: "「細部に神は宿る」",
        description: "クオリティを追求する職人タイプ。UIデザインやコードの美しさにこだわり、ユーザーに感動を与えるプロダクトを作り上げることができます。",
        products: ["デザインツール", "UIライブラリ", "ポートフォリオサイト", "高品質アプリ"],
        style: "じっくり時間をかけて磨き上げるスタイル。1つのプロダクトを長期的に育てていくのが向いています。",
        stats: { speed: 50, quality: 95, creativity: 80 }
    },
    visionary: {
        icon: "💡",
        type: "ビジョナリー型",
        catchcopy: "「まだ誰も見ていない未来を作る」",
        description: "斬新なアイデアで新しいカテゴリを開拓するタイプ。既存の常識にとらわれず、独自の視点で課題を解決できるイノベーターです。",
        products: ["AI活用アプリ", "新しいUX", "実験的プロジェクト", "未来型サービス"],
        style: "アイデア先行で動くスタイル。技術トレンドをキャッチしながら、まだ誰もやっていないことに挑戦しましょう。",
        stats: { speed: 70, quality: 65, creativity: 95 }
    },
    growth: {
        icon: "📊",
        type: "グロースハッカー型",
        catchcopy: "「数字がすべてを語る」",
        description: "データドリブンで確実に成果を出すタイプ。ユーザー数やコンバージョンなどの指標を見ながら、論理的に改善を繰り返すことができます。",
        products: ["SaaS", "アナリティクスツール", "マーケティングツール", "自動化システム"],
        style: "仮説を立てて検証するサイクルが得意。A/Bテストやユーザーインタビューを活用して、着実に成長させましょう。",
        stats: { speed: 75, quality: 70, creativity: 65 }
    },
    steady: {
        icon: "🌱",
        type: "コツコツ型",
        catchcopy: "「継続は力なり」",
        description: "限られた時間の中でも着実に前進できるタイプ。派手さはなくても、長期的な視点で確実に成果を積み上げていく力があります。",
        products: ["ニッチツール", "自動化スクリプト", "ブログ・メディア", "情報サイト"],
        style: "毎日少しずつ進めるスタイル。大きな目標を小さなタスクに分解して、着実にこなしていきましょう。",
        stats: { speed: 55, quality: 80, creativity: 60 }
    },
    niche: {
        icon: "🎯",
        type: "ニッチハンター型",
        catchcopy: "「誰も狙わない場所で勝つ」",
        description: "特定の課題を深く解決するタイプ。大手が見過ごすような小さな市場で、熱狂的なファンを獲得できる戦略家です。",
        products: ["業界特化ツール", "専門家向けアプリ", "B2Bサービス", "マニアックなユーティリティ"],
        style: "まず市場調査から始めるスタイル。ターゲットを絞り込んで、その人たちの課題を徹底的に解決しましょう。",
        stats: { speed: 65, quality: 85, creativity: 70 }
    },
    entertainer: {
        icon: "🎪",
        type: "エンターテイナー型",
        catchcopy: "「楽しさは最強のマーケティング」",
        description: "遊び心あふれるプロダクトで注目を集めるタイプ。バズるコンテンツを作る才能があり、プロダクト自体が話題になります。",
        products: ["ジェネレーター系", "ゲーミフィケーションアプリ", "バイラルツール", "診断系サービス"],
        style: "まずバズることを狙うスタイル。SNSでシェアされやすい要素を組み込んで、自然と広がる仕組みを作りましょう。",
        stats: { speed: 80, quality: 60, creativity: 90 }
    },
    explorer: {
        icon: "🔬",
        type: "テックエクスプローラー型",
        catchcopy: "「技術で不可能を可能に」",
        description: "最新技術を活用して差別化するタイプ。新しい技術への好奇心が強く、誰よりも早く新技術をプロダクトに取り入れることができます。",
        products: ["AI連携サービス", "Web3・ブロックチェーン", "AR/VRアプリ", "最新API活用"],
        style: "技術ドリブンで開発するスタイル。新しいAPIやフレームワークが出たら、すぐに試してプロダクトに組み込みましょう。",
        stats: { speed: 70, quality: 75, creativity: 85 }
    }
};

// 回答パターンから結果タイプを判定するロジック
function calculateResultType(answers) {
    // スコア初期化
    const scores = {
        rocket: 0,
        craftsman: 0,
        visionary: 0,
        growth: 0,
        steady: 0,
        niche: 0,
        entertainer: 0,
        explorer: 0
    };

    // Q1: 開発理由
    const q1 = answers[0];
    if (q1 === 'builder') {
        scores.growth += 2;
        scores.niche += 1;
    } else if (q1 === 'creator') {
        scores.craftsman += 2;
        scores.visionary += 1;
    } else if (q1 === 'learner') {
        scores.explorer += 2;
        scores.steady += 1;
    } else if (q1 === 'influencer') {
        scores.entertainer += 2;
        scores.growth += 1;
    }

    // Q2: 重視すること
    const q2 = answers[1];
    if (q2 === 'speed') {
        scores.rocket += 3;
    } else if (q2 === 'quality') {
        scores.craftsman += 3;
    } else if (q2 === 'idea') {
        scores.visionary += 2;
        scores.entertainer += 1;
    } else if (q2 === 'metrics') {
        scores.growth += 3;
    }

    // Q3: 開発時間
    const q3 = answers[2];
    if (q3 === 'parttime') {
        scores.steady += 2;
        scores.niche += 1;
    } else if (q3 === 'sidejob') {
        scores.rocket += 1;
        scores.niche += 1;
    } else if (q3 === 'fulltime') {
        scores.craftsman += 1;
        scores.visionary += 1;
        scores.growth += 1;
    }

    // Q4: 開発領域
    const q4 = answers[3];
    if (q4 === 'web') {
        scores.rocket += 1;
        scores.entertainer += 1;
    } else if (q4 === 'mobile') {
        scores.craftsman += 1;
        scores.growth += 1;
    } else if (q4 === 'tool') {
        scores.niche += 2;
        scores.steady += 1;
    } else if (q4 === 'ai') {
        scores.explorer += 3;
        scores.visionary += 1;
    }

    // Q5: 失敗への向き合い方
    const q5 = answers[4];
    if (q5 === 'pivot') {
        scores.rocket += 2;
        scores.entertainer += 1;
    } else if (q5 === 'analyze') {
        scores.growth += 2;
        scores.niche += 1;
    } else if (q5 === 'persistent') {
        scores.craftsman += 2;
        scores.steady += 1;
    } else if (q5 === 'document') {
        scores.steady += 1;
        scores.entertainer += 1;
    }

    // Q6: 成功イメージ
    const q6 = answers[5];
    if (q6 === 'passive') {
        scores.steady += 2;
        scores.niche += 2;
    } else if (q6 === 'scale') {
        scores.growth += 2;
        scores.visionary += 2;
    } else if (q6 === 'community') {
        scores.entertainer += 2;
        scores.visionary += 1;
    } else if (q6 === 'recognition') {
        scores.explorer += 2;
        scores.craftsman += 2;
    }

    // 最高スコアのタイプを返す
    let maxScore = 0;
    let resultType = 'rocket';

    for (const [type, score] of Object.entries(scores)) {
        if (score > maxScore) {
            maxScore = score;
            resultType = type;
        }
    }

    return resultType;
}
