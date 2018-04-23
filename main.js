var str = '{"1": {"18 \u0410\u043f\u0440\u0435\u043b\u044c \u0421\u0440\u0435\u0434\u0430": "-23"}, "2": {"19 \u0410\u043f\u0440\u0435\u043b\u044c \u0427\u0435\u0442\u0432\u0435\u0440\u0433": "17"}, "3": {"20 \u0410\u043f\u0440\u0435\u043b\u044c \u041f\u044f\u0442\u043d\u0438\u0446\u0430": "14"}, "4": {"21 \u0410\u043f\u0440\u0435\u043b\u044c \u0421\u0443\u0431\u0431\u043e\u0442\u0430": "16"}, "5": {"22 \u0410\u043f\u0440\u0435\u043b\u044c \u0412\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435": "16"}, "6": {"23 \u0410\u043f\u0440\u0435\u043b\u044c \u041f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a": "-12"}, "7": {"24 \u0410\u043f\u0440\u0435\u043b\u044c \u0412\u0442\u043e\u0440\u043d\u0438\u043a": "12"}, "8": {"25 \u0410\u043f\u0440\u0435\u043b\u044c \u0421\u0440\u0435\u0434\u0430": "15"}, "9": {"26 \u0410\u043f\u0440\u0435\u043b\u044c \u0427\u0435\u0442\u0432\u0435\u0440\u0433": "18"}, "10": {"27 \u0410\u043f\u0440\u0435\u043b\u044c \u041f\u044f\u0442\u043d\u0438\u0446\u0430": "20"}}';

// function loadJSON(callback) {

//   var xobj = new XMLHttpRequest();
//   xobj.overrideMimeType("application/json");
//   xobj.open('GET', 'http://test.local/JSON/data.json', true);
//   xobj.onreadystatechange = function () {
//     if (xobj.readyState == 4 && xobj.status == "200") {
//       // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
//       callback(xobj.responseText);
//     }
//   };
//   xobj.send(null);
// }

// //usage:
// function init() {
//   loadJSON(function (response) {
//     // Parse JSON string into object
//     var actual_JSON = JSON.parse(response);
//     console.log(actual_JSON);
//   });
// }

// ни хуя себе (это для гитхаба)


// В переменную result записываем вывод после обработки json
var result = "";
// Это наши стили для ячеек. Объявили переменную здесь, чтобы не объявлять в дальнейшем, при парсинге
var bg_style = "";

// Функция для раскрашивания ячеек. Принимает на вход два аргумента. is_turn - если true, то функция возвращает новые стили и белый цвет шрифта. Если false, то функция возвращает пустую строку и ячейки не раскрашиваются. temperature - температура из json
function tdBackground(is_turn, temperature) {
  // если передан true
  if (is_turn === true) {
    // умножаем температуру на 11. Число 11 выбрано экспериментально. Эта переменная будет служить для передачи цвета.
    var color = Math.floor(11*temperature);
    // если цвет отрицательный или 0, то будем менять синие оттенки
    if (color < 1) {
      // мы же умножали на температуру, а в стилях оттенки положительные (0 - 255)
      color *= -1;
      // вернем строку со стилями
      return "background:rgb(100,100,"+color+");color:#fff;";
    } else {
      // если цвет положительный (выше 1 градуса), то меняем красные оттенки
      return "background:rgb("+color+",100,100);color:#fff;";
    }
  } else {
    // если передан параметр false, не встраиваем эти новомодные стили
    return "";
  }
}

// Парсим JSON, раскладываем по dom-элементам. В переменную event передаем наш JSON (str) и функцию, которая его обработает

var event = JSON.parse(str, function (key, value) {
  // в JSON есть другие объекты. Выходит, что при парсинге, каждая вторая строка содержит в себе объект. Если мы попадаем на такую строку, она нам никак не нужна. Проверяем, если value не объект, то продолжаем.
  if (typeof (value) != "object") {
    // создаем <tr> (строка html)
    var tr = document.createElement('tr');
    // запишем стили. Если это не нужно, можно установить параметр false
    bg_style = tdBackground(true,value);
    // Запишем в строку две ячейки (<td>...</td> <td>...</td>)
    tr.innerHTML = "<td>" + key + "</td><td class='text-center' style='font-weight:bold;" + bg_style + "'>" + value + " °С</td>";
    // Добавим элемент в наш DOM. Встраиваем в <tbody> последним элементом.
    tbody.appendChild(tr);
  }
});