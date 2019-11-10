// <- original array
var n = getRandomInt(25); //<- original array length
if (n === 0)
    n = 10;
let gridInput = Array(n).fill(getRandomInt(2)).map(() => Array(n).fill(getRandomInt(2)));
let timeout = 100;
for (let row = 0; row < n; row++)
    for (let col = 0; col < n; col++)
        gridInput[row][col] = getRandomInt(2);


let visitedArr = new Array(n).fill(false).map(() => new Array(n).fill(false));
var adjacentArray = [];
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

var [r, c] = [gridInput[0].length, gridInput.length];
var m = Array(r).fill(getRandomInt(2)).map(() => Array(c).fill(getRandomInt(2)));
var grid = clickableGrid(gridInput[0].length, gridInput.length, function (el, row, col, i, evenyType) {
    var columnIndex = col;
    el.innerHTML = gridInput[row][col];
    entry(row, col, el, evenyType);

});
function fillElement({ i: i, j: j }, classToFill) {
    let table = document.getElementsByClassName("grid")[0];
    let rows = table.getElementsByTagName("tr");
    let cols = rows[i].getElementsByTagName("td");
    cols[j].className = classToFill;

}
const fillBlockWithUsed = ({ i: i, j: j }) => {
    let table = document.getElementsByClassName("grid")[0];
    let rows = table.getElementsByTagName("tr");
    let cols = rows[i].getElementsByTagName("td");
    timeout += 100;
    setTimeout(function () {
        cols[j].className = "used";
    }, timeout);
}

let finalCount = temparr = originalMatrix = [];

const resetAllValues = () => {
    resetTheValuesInBoxes();
    resetArrays();
    timeout = 100;
}
const resetArrays = () => {
    visitedArr = new Array(n).fill(false).map(() => new Array(n).fill(false));
    temparr = [];
    finalCount = [];
}
const resetTheValuesInBoxes = () => {
    let table = document.getElementsByClassName("grid")[0];
    let rows = table.getElementsByTagName("tr");
    for (let row = 0; row < rows.length; row++) {
        let cols = rows[row].getElementsByTagName("td");
        for (let col = 0; col < cols.length; col++) {
            if (gridInput[row][col] == 1)
                fillElement({ i: row, j: col }, "block")
            cols[col].innerHTML = "";
        }
    }
}
const printFinalResult = (maxCount) => {
    var paragraph = document.getElementById("output");
    paragraph.innerText = "Final Count is " + maxCount;
}

const entry = (i, j, el, evenyType) => {
    resetAllValues();
    pushInitialElement(i, j);
    //setElementToVisited(i,j);
    if (isEmptyBlock(i, j)) {
        return
    }
    while (hasMoreElements()) {
        let topElement = getTopOfStack();
        if (!isVisited(topElement.i, topElement.j)) {
            setElementToVisited(topElement.i, topElement.j);
            fillBlockWithUsed(topElement, "used")
            finalCount.push(topElement);
            traverse_Possible_Adjacent_Nodes(topElement.i, topElement.j);
            if (evenyType == 'click') el.innerHTML = finalCount.length;
        }
    }
    printFinalResult(finalCount.length);
    console.log(finalCount);
}
const isEmptyBlock = (i, j) => (gridInput[i][j] === 0)
const pushInitialElement = (i, j) => temparr.push({ i: i, j: j })
const isVisited = (i, j) => visitedArr[i][j];
const pushToTempArr = (i, j) => { if (isValid(i, j)) temparr.push({ i: i, j: j }) }

const tryLeft = (i, j) => { j--; pushToTempArr(i, j); }
const tryRight = (i, j) => { j++; pushToTempArr(i, j); }
const tryTop = (i, j) => { i--; pushToTempArr(i, j); }
const tryBottom = (i, j) => { i++; pushToTempArr(i, j); }

const setElementToVisited = (i, j) => visitedArr[i][j] = true;

const isValid = (i, j) => {
    if (i >= 0 && j >= 0 && i < n && j < n)
        if (!isVisited(i, j))
            if (gridInput[i][j] === 1)
                return true;
    return false;
}

const traverse_Possible_Adjacent_Nodes = (i, j) => {
    tryBottom(i, j);
    tryTop(i, j);
    tryLeft(i, j);
    tryRight(i, j);
}

const getTopOfStack = () => temparr.pop();
const hasMoreElements = () => temparr.length ? true : false;

function load() {
    document.body.appendChild(grid);
}

function clickableGrid(rows, cols, callback) {
    var i = 0;
    var grid = document.createElement('table');
    grid.className = 'grid';
    for (var r = 0; r < rows; ++r) {
        var tr = grid.appendChild(document.createElement('tr'));
        for (var c = 0; c < cols; ++c) {
            var cell = tr.appendChild(document.createElement('td'));
            if (gridInput[r][c] === 1) {
                cell.className = 'block';
                i = 1;
            } else i = 0;
            // cell.innerHTML = gridInput[r][c];
            cell.addEventListener('click', (function (el, r, c, i) {
                return function () {
                    callback(el, r, c, i, "click");
                }
            })(cell, r, c, i), false);
            cell.addEventListener('mouseover', (function (el, r, c, i) {
                return function () {
                    callback(el, r, c, i, "mouseover");
                }
            })(cell, r, c, i), false);
        }
    }
    return grid;
}