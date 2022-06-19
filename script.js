const questions = [
    {
        question:'Сколько букв в алфавите?',
        answers: [32, 34, 35, 33],
        correct: 4,
    },
    {
        question:'Какое название у самого большого амфитеатра Древнего Рима?',
        answers: ['Верона', 'Картахена', 'Колизей', 'Дельфы'],
        correct: 3,
    },
    {
        question:'Сколько рёбр у человека?',
        answers:[24, 22, 23, 25],
        correct: 1,
    },
    {
        question:'Кто такой Винстон Черчиль?',
        answers: ['Президент Америки','Канцлер Германии', 'Вице-премьер Польши', 'Премьер-министр Великобритании' ],
        correct: 4,
    },
    {
        question:'Столица Черногории?',
        answers: ['Вена','Подгорица','Сараево','Скопье'],
        correct: 2,
    },
    {
        question:'Сколько зубов у взрослого человека?',
        answers: [32, 30, 31, 35],
        correct: 1,
    },
    {
        question:'Что является сумой всех сторон?',
        answers: ['Площадь','Периметр','Дискриминант','Радиус'],
        correct: 2,
    },
    {
        question:'Кто прорубил окно в Европу?',
        answers: ['Александр второй','Ну я вопросы?','Пётр первый','Екатерина вторая'],
        correct: 3,
    },
    {
        question:'Сколько костей у взрослого человека?',
        answers: ['Около 200','Около 150','Около 230','Около 270'],
        correct: 1,
    },
    {
        question:'Известный код из "Матрицы" на самом деле обозначает?',
        answers: ['Математическую задачу','Рекламу хлеба','Песню исполнителя "Emenem"','Рецепт суши'],
        correct: 4,
    },
    {
        question:'С какого возраста начинается долгожительство?',
        answers: ['85 лет','80 лет','23 года','90 лет'],
        correct: 4,
    },
    {
        question:'Как называется линия без концов?',
        answers: ['Отрезок','Луч','Вектор','Прямая'],
        correct: 2,
    },
    {
        question:'Мои года - моё...?',
        answers: ['Богатство','Дело','Страдание','Золото'],
        correct: 1,
    },
    {
        question:'Сколько километров в одной миле?',
        answers: ['1,8 км','2,0 км','1,6 км','2,2 км'],
        correct: 3,
    },
    {
        question:'Как называется врач который лечит вены на ногах?',
        answers: ['Флеболог','Ортопед','Хирург','Гастроэнтеролог'],
        correct: 1,
    },
    {
        question:'Какое число является чёртовой дюжиной?',
        answers: [12, 13, 11, 14],
        correct: 2,
    },
    {
        question:'Какая особая река течёт в ЮАР?',
        answers: ['Ораньжевая','Жёлтая','Зелёная','Розовая'],
        correct: 1,
    },
    {
        question:'Сколько стран в мире на 2022?',
        answers: ['251 страна','248 страны','249 стран','250 стран'],
        correct: 1,
    },
    {
        question:'Какого цвета зеркало?',
        answers: ['Белого','Чёрного','Серебряного','Зелёного'],
        correct: 4,
    },
    {
        question:'Как обозначается Мышьяк в таблице Менделеева?',
        answers: ['Ac','At','As','Au'],
        correct: 3,
    },
]

const questionContainer = document.querySelector('#question')
const answerBoardContainer = document.querySelector('#choiceBoard')
const inputContainer = document.querySelector('#input')
const btnContainer = document.querySelector('#input__text')

let score = 0
let questionIndex = 0

clearPage()
showQuestion()
inputContainer.onclick = checkAnswer

function clearPage() {
    questionContainer.innerHTML = ''
    answerBoardContainer.innerHTML = ''
}

function showQuestion() {

    //Вопросы
    const questionTemplate = '<p class="quiz">%Quiz%</p>'
    const titleHtml = questionTemplate.replace('%Quiz%', questions[questionIndex]['question'])
    questionContainer.innerHTML = titleHtml

    //Ответы
    let answerNumber = 1
    for (answerText of questions[questionIndex]['answers']) {
        const answerTemplate = 
            `<li class="choice__string">
                <label class="choice">
                    <input type="radio" value="%number%" name="answer_input"/>
                    <span>%Go%</span>
                </label>
            </li>`

        const answersHtml = answerTemplate
            .replace('%Go%', answerText)
            .replace('%number%', answerNumber)

        answerBoardContainer.innerHTML += answersHtml
        answerNumber++
    }
}

function checkAnswer() {
    const checkedRadio = answerBoardContainer.querySelector('input[type="radio"]:checked')
    if (!checkedRadio) {
        inputContainer.blur()
        return
    }
    //Узнаём ответ пользователя
    const userAnswer = parseInt(checkedRadio.value)

    questions[questionIndex]['correct']
    if (userAnswer === questions[questionIndex]['correct']) {
        score++
    }
    if (questionIndex !== questions.length -1) {
        questionIndex++
        clearPage()
        showQuestion()
    } else {
        clearPage()
        showResults()
    }
}

function showResults() {
    const resultsTemplate = `<p class="title">%title%</p>`
    
    let title

    if(score === questions.length) {
        title = `Поздравляю, вы набрали ${score} из ${questions.length} это максимум, это хороший результат`
    } else if ((score * 100) / questions.length >= 50) {
        title = `Неплохо, вы набрали ${score} из ${questions.length} это больше половины, это нормальный результат`
    } else {
        title = `Нужно стараться, вы набрали ${score} из ${questions.length} это меньше половины, это не очень хороший результат`
    }

    const finalMessage = resultsTemplate.replace('%title%', title)

    questionContainer.innerHTML = finalMessage
    
    inputContainer.blur()
    btnContainer.innerHTML = 'Перезапустить'
    inputContainer.onclick = () => history.go()
}

