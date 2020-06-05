const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const addButton = document.getElementById("addButton");

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

let LIST, id;

let data = localStorage.getItem("item");

if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadItems(LIST);
} else {
    LIST = [];
    id = 0;
}

function loadItems(array) {
    array.forEach(function (item) {
        addItem(item.name, item.id, item.done, item.trash)
    });
}

clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

const options = { weekday: 'long', month: 'short', day: 'numeric' };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-us", options);

function addItem(item, id, done, trash) {
    if (trash) {
        return;
    }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const text = `<li class="item">
    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
    <p class="text ${LINE}">${item}</p>
    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>             
            </li>`;

    const position = "beforeend";

    list.insertAdjacentHTML(position, text);
}

document.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        const item = input.value;

        if (item) {
            addItem(item, id, false, false);
            LIST.push(
                {
                    name: item,
                    id: id,
                    done: false,
                    trash: false
                }
            );

            localStorage.setItem("item", JSON.stringify(LIST));
            input.value = "";
            id++;
        }
    }
});

addButton.addEventListener("click", function (event) {
    const item = input.value;

    if (item) {
        addItem(item, id, false, false);
        LIST.push(
            {
                name: item,
                id: id,
                done: false,
                trash: false
            }
        );

        localStorage.setItem("item", JSON.stringify(LIST));
        input.value = "";
        id++;
    }
});

function completeItem(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeItem(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

list.addEventListener("click", function (event) {
    const element = event.target;
    const elementJob = element.attributes.job.value;

    console.log(elementJob);

    if (elementJob === "complete") {
        completeItem(element);
    }
    else if (elementJob === "delete") {
        removeItem(element);
    }

    localStorage.setItem("item", JSON.stringify(LIST));
});
