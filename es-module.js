// Глобальные переменные
let colors = ['', '#777']; // Подсветка выбора нет/есть
let run; // статус работы
let _quest = document.querySelector('#quest'); // элемент вопроса
let _title = document.querySelector('#title'); // элемент заголовка
let _help = document.querySelector('#help'); // элемент подсказки


const init = function () { // инициализация
    run = true; // запускаем приложение
    _title.innerHTML = es.title; // Заголовок
    _help.innerHTML = 'Кликни на картинку для сброса.';
    print_dialog(es.start); // печатает первый вопрос и ответы к нему
};

const print_dialog = function (post) { // варианты ответов
    document
        .querySelectorAll('.line') // все по имени класса
        .forEach(line => line.hidden = true); // делаем скрытыми элементы таблицы

    let answers = es.dict[post]; // узнаем текущие ответы

    if (typeof answers === 'undefined') { // если уже достигнут листок дерева
        run = false; // остановка работы ЭС
        _quest.innerHTML = `Выбор сделан -> ${post.toUpperCase()}`

        document.getElementById('img').src = "img/" + post + ".jpg"; // Вывод выбор и изображения

    }

    else {
        if (answers.length === 0) { // если нет ответов на вопрос
            run = false; // остановить работу ЭС
            _quest.innerHTML = `Для категории "${post}" нет выбора.`;
        }
        else {  // публикуем вопрос и варианты ответов
            _quest.innerHTML = `Сделайте выбор из категории<br>"${post}":`;
            answers
                .forEach((answer, index) => {
                    document.querySelector('#answer' + String(index)).innerHTML = answer;
                    document.querySelector('.line' + String(index)).hidden = false;
                });
        }
    }
}

// Обработка событий
document // при загрузке страницы
    .addEventListener("DOMContentLoaded", init);


document // при клике по ячейке таблицы
    .querySelectorAll('#dialog .answer') // найти массив ячеек таблицы с ответами
    .forEach(td_answer => { // для каждой ячейки назначить обработчики событий
        td_answer.addEventListener("click", () => print_dialog(td_answer.innerHTML)); // Поведение ячеек при наведении курсора
        td_answer.addEventListener('mouseenter', () => td_answer.style.backgroundColor = colors[1]);
        td_answer.addEventListener('mouseleave', () => td_answer.style.backgroundColor = colors[0]);
    });
