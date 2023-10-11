export class Quiz 
{
    private score: number = null;
    private currentQuestionIndex: number = null;
    private restartButton: HTMLButtonElement = null;
    private questionText: HTMLParagraphElement = null;
    private scoreText: HTMLSpanElement = null;
    private answerButtons: NodeListOf<HTMLButtonElement> = null;

    private questions: 
    {
        question: string;
        answers: string[];
        correct: number;
    }[];

    constructor(contentDiv:HTMLElement) 
    {
        this.score = 0;
        this.currentQuestionIndex = 0;
       
        this.scoreText = contentDiv.querySelector("#score") as HTMLSpanElement; 
        this.restartButton = contentDiv.querySelector("#restart-btn") as HTMLButtonElement;
        this.questionText = contentDiv.querySelector("#question-text") as HTMLParagraphElement;
        this.answerButtons = contentDiv.querySelectorAll(".answer-btn") as NodeListOf<HTMLButtonElement>;
      
       this.restartButton.addEventListener("click", () => this.restartQuiz());

        this.questions = [
            {
                question: "What is 2 + 2?",
                answers: ["3", "4", "5", "6"],
                correct: 1,
            },
            {
                question: "What is the capital of France?",
                answers: ["London", "Berlin", "Paris", "Madrid"],
                correct: 2,
            },
            {
                question: "Which programming language is this quiz written in?",
                answers: ["HTML", "TypeScript", "CSS","Sass"],
                correct: 1,
            },
        ];
        this.initialize();
    }

    private initialize() 
    {
        this.loadQuestion();
        this.setupAnswerHandlers();
    }

    private restartQuiz() 
    {
        this.score = 0;
        this.currentQuestionIndex = 0;

        this.loadQuestion();
        this.updateScoreText();

        this.restartButton.style.display = "none";

        for (let i = 0; i < this.answerButtons.length; i++) {
            this.answerButtons[i].style.display = "block";
        }
    }

    private loadQuestion() 
    {
        let currentQuestion = this.questions[this.currentQuestionIndex];
        this.questionText.textContent = currentQuestion.question;

        for (let i = 0; i < this.answerButtons.length; i++) {
            this.answerButtons[i].textContent = currentQuestion.answers[i];
        }
    }

    private setupAnswerHandlers() 
    {
        for (let i = 0; i < this.answerButtons.length; i++) {
            this.answerButtons[i].addEventListener("click", () => this.checkAnswer(i));
        }
    }

    private checkAnswer(selectedIndex: number) 
    {
        let currentQuestion = this.questions[this.currentQuestionIndex];
        if (selectedIndex === currentQuestion.correct) {
            this.score++;
        }

        this.currentQuestionIndex++;
        if (this.currentQuestionIndex < this.questions.length) 
        {
            this.loadQuestion();
        } 
        else 
        {
            this.quizCompleted();
        }

        this.updateScoreText();
    }

    private updateScoreText() 
    {
        this.scoreText.textContent = this.score.toString();
    }

    private quizCompleted() 
    {
        this.questionText.textContent = `Quiz Completed! Your Score: ${this.score} out of ${this.questions.length}`;
        for (let i = 0; i < this.answerButtons.length; i++) {
            this.answerButtons[i].style.display = "none";
        }
        this.restartButton.style.display = "block";
    }
}