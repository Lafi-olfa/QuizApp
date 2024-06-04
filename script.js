var questions=[
    {
        question: "Quelle est la capitale de la France ?",
        options: [
            {text :"Berlin", correct:false},
            {text :"Madrid", correct:false},
            {text :"Paris", correct:true},
            {text :"Rome", correct:false},
            ],
    },
    {
        question:"Quelle est la plus grande planète de notre système solaire ?",
        options: [
            {text :"Terre", correct:false},
            {text :"Jupiter", correct:true},
            {text :"Mars", correct:false},
            {text :"Saturne", correct:false},
            ],
    },
    {
        question: "Quelle est la formule chimique de l'eau ?",
        options: [
            {text :"H₂O₂", correct:false},
            {text :"CO₂", correct:false},
            {text :"H₂O", correct:true},
            {text :"CH₄", correct:false},
            ],
    }
];
const questionElement = document.getElementById('question');
const answerButton = document.getElementById('answer-button');
const nextBtn = document.getElementById('next-btn');

let currentQuestionIndex =0;
let score =0;
startQuiz=()=>{
    currentQuestionIndex = 0;
    score=0;
    nextBtn.innerHTML='Next';
    showQuestion()
}
showQuestion=()=>{
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo= currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo+ '. '+ currentQuestion.question ;
    currentQuestion.options.forEach((answer)=>{
        const button= document.createElement('button');
        button.innerHTML= answer.text;
        button.classList.add('btn');
        answerButton.appendChild(button)
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer)
    })
}
resetState=()=>{
    nextBtn.style.display='none';
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild)
    }
}
selectAnswer=(event)=>{
    let clickedEl = event.currentTarget;
    let isCorrect= clickedEl.dataset.correct === "true";
    if(isCorrect){
        clickedEl.classList.add('correct');
        score++;
    } else {
        clickedEl.classList.add('incorrect')
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true;
    })
    nextBtn.style.display= 'block'
}

showScore=()=>{
    resetState();
    questionElement.innerHTML= `yous score is: ${score}.`
    nextBtn.innerHTML = "Play again!";
    nextBtn.style.display= 'block'
}

handleNextButton=()=>{
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore()
    }
}
nextBtn.addEventListener('click', ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz()
    }
})
startQuiz()