// ===================================
// IndieType診断 - メインアプリケーション
// ===================================

class IndieTypeDiagnosis {
    constructor() {
        this.currentQuestion = 0;
        this.answers = [];
        this.resultType = null;

        this.init();
    }

    init() {
        // DOM要素の取得
        this.screens = {
            start: document.getElementById('start-screen'),
            question: document.getElementById('question-screen'),
            result: document.getElementById('result-screen')
        };

        this.elements = {
            startBtn: document.getElementById('start-btn'),
            progressFill: document.getElementById('progress-fill'),
            progressText: document.getElementById('progress-text'),
            questionText: document.getElementById('question-text'),
            optionsContainer: document.getElementById('options-container'),
            resultCard: document.getElementById('result-card'),
            resultIcon: document.getElementById('result-icon'),
            resultType: document.getElementById('result-type'),
            resultCatchcopy: document.getElementById('result-catchcopy'),
            resultDescription: document.getElementById('result-description'),
            resultProducts: document.getElementById('result-products'),
            resultStyle: document.getElementById('result-style'),
            statSpeed: document.getElementById('stat-speed'),
            statQuality: document.getElementById('stat-quality'),
            statCreativity: document.getElementById('stat-creativity'),
            shareBtn: document.getElementById('share-btn'),
            retryBtn: document.getElementById('retry-btn')
        };

        this.bindEvents();
    }

    bindEvents() {
        this.elements.startBtn.addEventListener('click', () => this.startDiagnosis());
        this.elements.shareBtn.addEventListener('click', () => this.shareToX());
        this.elements.retryBtn.addEventListener('click', () => this.retry());
    }

    showScreen(screenName) {
        Object.values(this.screens).forEach(screen => {
            screen.classList.remove('active');
        });
        this.screens[screenName].classList.add('active');
    }

    startDiagnosis() {
        this.currentQuestion = 0;
        this.answers = [];
        this.showScreen('question');
        this.renderQuestion();
    }

    renderQuestion() {
        const question = QUESTIONS[this.currentQuestion];
        const progress = ((this.currentQuestion + 1) / QUESTIONS.length) * 100;

        // プログレスバー更新
        this.elements.progressFill.style.width = `${progress}%`;
        this.elements.progressText.textContent = `${this.currentQuestion + 1} / ${QUESTIONS.length}`;

        // 質問テキスト更新
        this.elements.questionText.textContent = question.text;

        // オプション生成
        this.elements.optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.innerHTML = `
                <span class="option-emoji">${option.emoji}</span>
                <span class="option-text">${option.text}</span>
            `;
            button.addEventListener('click', () => this.selectOption(option.value));

            // アニメーション用の遅延
            button.style.opacity = '0';
            button.style.transform = 'translateX(20px)';
    setTimeout(() => {
        button.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        button.style.opacity = '1';
        button.style.transform = 'translateX(0)';
        // アニメーション完了後にインラインスタイルを削除してCSSの:hoverを有効化
        setTimeout(() => {
            button.style.transform = '';
            button.style.transition = '';
        }, 300);
    }, index * 80);

            this.elements.optionsContainer.appendChild(button);
        });

        // 質問エリアのアニメーション
        const questionArea = document.getElementById('question-area');
        questionArea.style.animation = 'none';
        questionArea.offsetHeight; // リフロー
        questionArea.style.animation = 'slideIn 0.4s ease';
    }

    selectOption(value) {
        this.answers.push(value);
        this.currentQuestion++;

        if (this.currentQuestion < QUESTIONS.length) {
            this.renderQuestion();
        } else {
            this.showResult();
        }
    }

    showResult() {
        // 結果を計算
        const typeKey = calculateResultType(this.answers);
        this.resultType = RESULT_TYPES[typeKey];

        // 結果画面に反映
        this.elements.resultIcon.textContent = this.resultType.icon;
        this.elements.resultType.textContent = this.resultType.type;
        this.elements.resultCatchcopy.textContent = this.resultType.catchcopy;
        this.elements.resultDescription.textContent = this.resultType.description;
        this.elements.resultStyle.textContent = this.resultType.style;

        // おすすめプロダクト
        this.elements.resultProducts.innerHTML = '';
        this.resultType.products.forEach(product => {
            const li = document.createElement('li');
            li.textContent = product;
            this.elements.resultProducts.appendChild(li);
        });

        // ステータスバー（アニメーション）
        this.showScreen('result');

        setTimeout(() => {
            this.elements.statSpeed.style.width = `${this.resultType.stats.speed}%`;
            this.elements.statQuality.style.width = `${this.resultType.stats.quality}%`;
            this.elements.statCreativity.style.width = `${this.resultType.stats.creativity}%`;
        }, 300);
    }

    shareToX() {
        const text = `🎯 私の個人開発タイプは...

${this.resultType.icon} ${this.resultType.type}！

${this.resultType.catchcopy}
${this.resultType.description.substring(0, 60)}...

あなたも診断してみて👇

#個人開発タイプ診断 #個人開発`;

        const url = encodeURIComponent(window.location.href);
        const encodedText = encodeURIComponent(text);

        window.open(
            `https://twitter.com/intent/tweet?text=${encodedText}&url=${url}`,
            '_blank',
            'width=550,height=420'
        );
    }

    retry() {
        // ステータスバーをリセット
        this.elements.statSpeed.style.width = '0%';
        this.elements.statQuality.style.width = '0%';
        this.elements.statCreativity.style.width = '0%';

        this.showScreen('start');
    }
}

// アプリケーション初期化
document.addEventListener('DOMContentLoaded', () => {
    new IndieTypeDiagnosis();
});
