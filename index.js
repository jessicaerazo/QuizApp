/* Create an object that will questions, correct ans & wrong ans*/
const QUESTIONS = [
    {
        text: 'What must you always do on the opening HTML tag?',
        choices: [
          {text: 'set the lang attribute.', answer: true},
          {text: 'capitalize the HTML tag', answer: false},
          {text: 'use the stict command', answer: false},
          {text: 'set the meta tag', answer: false}
        ]
      },
    {
        text: 'What is the one caveat about the header role in terms of web accessibilty?',
        choices: [
          {text: 'You do not need to define a role attribute.', answer: false},
          {text: 'You need to have one no matter what or it will break your program.', answer: false},
          {text: 'You need to have a role attribute.', answer: false},
          {text: 'There should only be one banner per page.', answer: true},
        ]
      },
      {
        text: 'What is Semantic HTML?',
        choices: [
          {text: 'The names of the HTML elements we choose help browsers, web-crawlers, screen readers, and project collaborators to better understand our content.', answer: true},
          {text: 'A variable that can be accessed anywhere in your code.', answer: false},
          {text: 'is the side effect.', answer: false},
          {text: 'is a variable that will always return the same value if it\'s provided with the same inputs.', answer: false}
        ]
      },
 
    {
      text: 'What id an Element in HTML?',
      choices:[
        
        {text: 'It is used to mark off the beginning and end of an element.',  answer: false},
        {text: 'HTML element usually consists of some content (could be plain text or additional HTML elements) wrapped by opening and closingtags.',  answer: true},
        {text: 'Commonly shortened to a11y.',  answer: false},
        {text: 'Dictates how programs execute different sets of instructions based on differing conditions.',  answer: false}
      ]
    },
    {
        text:  'What is variable scope?',
        choices: [
          {text: 'A variable that can be accessed anywhere in your code.',  answer: false},
          {text: 'is the side effect.',  answer: false},
          {text: 'is a variable that will always return the same value if it\'s provided with the same inputs.',  answer: false},
          {text: 'A set of rules that define which parts of your code can access a particular variable.',  answer: true}
        ]
      },
    

    {
      text: 'Why global variables are to be avoided?',
      choices: [
        {text: 'because it looks unprofessional.', answer: false},
        {text: 'because all variables become objects.', answer: false},
        {text: 'side effects, code becomes bug prone and harder to collaborate on.', answer: true},
        {text: 'You must use es6 syntax in your entire program.', answer: false}
      ]
    },
    {
      text: 'What are the two common jQuery traversal methods?',
      choices: [
        {text: '.children() and .parent()', answer: false},
        {text: '.fadeIn()', answer: false},
        {text: '.find() and .parent()', answer: true},
        {text: '.hide()', answer: false},
      ]
    },
    {
      text: 'What is one way to avoid unintended global variables?',
      choices: [
        {text: 'Set the lang attribute', answer: false},
        {text: 'using javascript \'use strict\';  at the top of your js file.', answer: true},
        {text: 'Using media queries', answer: false},
        {text: 'review code very well', answer: false},
      ]
    },
    {
      text: 'What is Hoisting in javascript?',
      choices: [
        {text: 'A mechanism where variables and function declarations are moved to the top of their scope before code execution.', answer: true},
        {text: 'A mechanism where variables and function declarations types are changed.', answer: false},
        {text: 'A mechanism where variables and function declarations are moved to the bottom of their scope before code execution.', answer: false},
        {text: 'A mechanism where variables and function declarations are moved to the middle of their scope before code execution.', answer: false},
      ]
    },
    {
      text: 'What is Type coercion?',
      choices: [
        {text: 'is the process of converting value from one type to another.', answer: false},
        {text: 'is when we use == instead of === .', answer: false},
        {text: 'Refers to those not-obvious type casts that happen as a side-effect of different operations.', answer: false},
        {text: 'All of the above', answer: true},
      ]
    }
  ];

let currentQuestion = 0;
let score = 0;

function handleStartButton(){
    $('.js-start-button').on('click', function(){
        $('#start-section').hide();
        $('#qAndA-section').show();
        $('.footer').show();
        renderScoreCount();
        renderQandA();
        handleCheckIfRadioSelected();
        renderCurrentQuestionCount();
    });
}

function getQuestion(){
    return`${QUESTIONS[currentQuestion].text}`;
}

function getAnswers(){
    let answerString = "";
    QUESTIONS[currentQuestion].choices.forEach(function(choice,index){
        answerString += `<label for="answer-${index}"><input type="radio" name="answer" value=${index} id="answer-${index}" required/>${choice.text}</label>`;
    });
    return answerString;
}

function renderCurrentQuestionCount(){
    return $('.js-current-question-num').html(currentQuestion+1);
}

function renderQandA(){
        $('#question-section').html(getQuestion());
        $('#answers-section').html(getAnswers());
}

function renderResults(){
    $('#js-results-section').html(`<h2>Results</h2><h3>You got ${score} correct out of 10</h3><button type="submit" class="js-restart-btn restart-btn">Retry Quiz</button>`);
}

function restartQuiz(){
    $('#js-results-section').on('click','.js-restart-btn', function(){
        score = 0;
        currentQuestion = 0;
        $('#start-section').show();
        $('#js-results-section').hide();
    });
}

function evaluateAnswer(answerIndex){
    return QUESTIONS[currentQuestion].choices[answerIndex].answer;
}

function renderScoreCount(){
    return $('.js-current-score-num').html(score);
}

function renderFeedback(answerIndex){
    let feedbackText = "";
    let correctAnswerText = "";

   QUESTIONS[currentQuestion].choices.forEach(function(choice,index){
       if(choice.answer){
        correctAnswerText += `${choice.text}`;
        }
    });

    const isCorrect = evaluateAnswer(answerIndex);
    if(isCorrect){
        score++;
        feedbackText = "<h2><img src=\"img/checkmark.svg\" alt=\"you got a correct icon\" />Good Job! You got it correct.</h2>";
        renderScoreCount();
        $('#feedback-section').html(feedbackText).removeClass('incorrect-feedback').addClass('correct-feedback');
    }
    else{
        feedbackText = `<h2><img src=\"img/warning.svg\" alt=\"you got a incorrect wrong icon\" />Incorrect. <span>The right answer is: ${correctAnswerText}</span> </h2>`;
        $('#feedback-section').html(feedbackText).removeClass('correct-feedback').addClass('incorrect-feedback');
    }
}

function renderNextQuestionButton(){
    return $('.js-next-question').html('<button class="js-next-btn next-btn">Next</button>');
}

function disableCheckedValues(answerIndex) {
    $('input[type="radio"]:not(:checked)').prop("disabled", true); 
    $('input[type="radio"]:not(:checked)').parent().addClass("disabled");
}

function handleCheckIfRadioSelected(){
    $('input[type="radio"]').on('click', function(){
        $('.js-check-answer-btn').prop("disabled", false);
       $('.js-check-answer-btn').removeClass('check-answer-btn-disabled').addClass('check-answer-btn');
    });
}

function handleSubmitButton(){
    $('form').on('submit', function(event){
        event.preventDefault();
        const answerIndex = $('input[type=radio]:checked').val();
        renderFeedback(answerIndex);
        $('.js-check-answer-btn').hide();
        disableCheckedValues(answerIndex);
        renderNextQuestionButton();
        currentQuestion++;
    });
}

function clearFeedback(){
    $('#feedback-section').html("");
}

function handleNextQuestionButton(){
    $('.js-next-question').on('click', function(event){
        event.preventDefault();
        $('.js-next-btn').hide(); 
        $('.js-check-answer-btn').removeClass('check-answer-btn').addClass('check-answer-btn-disabled');
        $('.js-check-answer-btn').prop("disabled", true);
        $('.js-check-answer-btn').show();
        clearFeedback();
        if(currentQuestion < QUESTIONS.length){
            renderQandA();
            handleCheckIfRadioSelected();
            renderCurrentQuestionCount();
        }
        else {
            renderResults();
            $('#qAndA-section').hide();
            $('#js-results-section').show();
        }
    });
}

function makeCheckAnswerActive() {
    $('input[type="radio"]').on('click', function() {
        $('.check-answer-btn').removeClass('disabled');
    });  
}

function initalizeQuizApp(){
    handleStartButton();
    handleCheckIfRadioSelected();
    handleSubmitButton();
    handleNextQuestionButton();
    restartQuiz();
}

$(initalizeQuizApp);
