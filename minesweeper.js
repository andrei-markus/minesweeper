document.getElementById('Field').hidden = true;
var size
var minesNum
var fieldMap
var isTileVisible
var minesList
var mineRate = 0.15;

function StartGame(Size) {
    size = Size;
    minesNum = Math.floor((size * size) * mineRate);
    SwapGameMenu();
    generateField();
    addMines();
    addTips();
    drawField();

}

function ClickOnTile(x,y){
    if(isTileVisible[x][y]){
        return;
    }
    if (fieldMap[x][y] == 'B') {
        openTile(x,y);
        alert('Game Over');
    }
    else{
        if(!isTileVisible[x][y]){
            openTile(x,y);
        }
    }
}

//TODO
function SelectTile(x,y) {
    var elementID = x + '-' + y;

    if(isTileVisible[x][y] && !(document.getElementById(elementID).innerHTML == 'A')){
        return;
    }

    if (!isTileVisible[x][y]) {
        isTileVisible[x][y] = true;
        document.getElementById(elementID).innerHTML = 'A';
        document.getElementById(elementID).className = 'fieldtile-B';
    }
    else{
        isTileVisible[x][y] = false;
        document.getElementById(elementID).innerHTML = '0';
        document.getElementById(elementID).className = 'fieldtile-0';
    }
    
}

function SwapGameMenu() {

    if (document.getElementById('StartMenu').hidden == true) {
        document.getElementById('StartMenu').hidden = false;
        document.getElementById('Field').hidden = true;
    }
    else {
        document.getElementById('StartMenu').hidden = true;
        document.getElementById('Field').hidden = false;
    }
}

function drawField() {
    fieldHTML = "";
    for (let row = 0; row < size; row++) {
        fieldHTML += '<div>';

        for (let column = 0; column < size; column++) {
            fieldHTML += '<button id="' + column + '-' + row + '" '
                + 'class="fieldtile-A'
                + '" '
                + 'onclick="ClickOnTile(' +  column + ',' + row + ')" '
                + 'oncontextmenu="SelectTile(' +  column + ',' + row + ');return false;" '
                + '>'
                + 0
                + '</button>';
        }

        fieldHTML += '</div>';
    }
    document.getElementById('Field').innerHTML = fieldHTML;
}

function generateField() {
    fieldMap = Array(size).fill(null).map(() => Array(size).fill(0));
    isTileVisible = Array(size).fill(null).map(() => Array(size).fill(false));
}

function addMines() {
    minesList = new Array(minesNum);
    for (let mine = 0; mine < minesNum; mine++) {
        var x = Math.floor(Math.random() * size);
        var y = Math.floor(Math.random() * size);
        if (!(fieldMap[x][y] == 'B')) {
            fieldMap[x][y] = 'B';
            minesList[mine] = [x, y];
        }
        else {
            mine--;
        }

    }
}

function addTips() {
    for (let i = 0; i < minesList.length; i++) {
        mine = minesList[i];

        //x-1
        if (mine[0] > 0) {
            if (mine[1] > 0) {
                if (!(fieldMap[mine[0] - 1][mine[1] - 1] == 'B')) {
                    fieldMap[mine[0] - 1][mine[1] - 1] = fieldMap[mine[0] - 1][mine[1] - 1] * 1 + 1;
                }
            }
            if (!(fieldMap[mine[0] - 1][mine[1]] == 'B')) {
                fieldMap[mine[0] - 1][mine[1]] = fieldMap[mine[0] - 1][mine[1]] * 1 + 1;
            }
            if (mine[1] < size - 1) {
                if (!(fieldMap[mine[0] - 1][mine[1] + 1] == 'B')) {
                    fieldMap[mine[0] - 1][mine[1] + 1] = fieldMap[mine[0] - 1][mine[1] + 1] * 1 + 1;
                }
            }
        }

        //x
        if (mine[1] > 0) {
            if (!(fieldMap[mine[0]][mine[1] - 1] == 'B')) {
                fieldMap[mine[0]][mine[1] - 1] = fieldMap[mine[0]][mine[1] - 1] * 1 + 1;
            }
        }
        if (mine[1] < size - 1) {
            if (!(fieldMap[mine[0]][mine[1] + 1] == 'B')) {
                fieldMap[mine[0]][mine[1] + 1] = fieldMap[mine[0]][mine[1] + 1] * 1 + 1;
            }
        }

        //x-1
        if (mine[0] < size - 1) {
            if (mine[1] > 0) {
                if (!(fieldMap[mine[0] + 1][mine[1] - 1] == 'B')) {
                    fieldMap[mine[0] + 1][mine[1] - 1] = fieldMap[mine[0] + 1][mine[1] - 1] * 1 + 1;
                }
            }
            if (!(fieldMap[mine[0] + 1][mine[1]] == 'B')) {
                fieldMap[mine[0] + 1][mine[1]] = fieldMap[mine[0] + 1][mine[1]] * 1 + 1;
            }
            if (mine[1] < size - 1) {
                if (!(fieldMap[mine[0] + 1][mine[1] + 1] == 'B')) {
                    fieldMap[mine[0] + 1][mine[1] + 1] = fieldMap[mine[0] + 1][mine[1] + 1] * 1 + 1;
                }
            }
        }

    }
}

function openTile(x,y) {
    var elementID = x + '-' + y;
    isTileVisible[x][y] = true;
    document.getElementById(elementID).innerHTML = fieldMap[x][y];
    document.getElementById(elementID).className = 'fieldtile-' + fieldMap[x][y];

    if (fieldMap[x][y] > 0 || fieldMap[x][y] == 'B') {
        return;
    }
    //x-1
    if (x > 0) {
        if (y > 0) {
            if (!isTileVisible[x - 1][y - 1]) {
                openTile(x - 1, y - 1);
            }
        }
        if (!isTileVisible[x - 1][y]) {
            openTile(x - 1, y);
        }
        if (y < size - 1) {
            if (!isTileVisible[x - 1][y + 1]) {
                openTile(x - 1, y + 1);
            }
        }
    }

    //x
    if (y > 0) {
        if (!isTileVisible[x][y - 1]) {
            openTile(x, y - 1);
        }
    }
    if (y < size - 1) {
        if (!isTileVisible[x][y + 1]) {
            openTile(x, y + 1);
        }
    }

    //x-1
    if (x < size - 1) {
        if (y > 0) {
            if (!isTileVisible[x + 1][y - 1]) {
                openTile(x + 1, y - 1);
            }
        }
        if (!isTileVisible[x + 1][y]) {
            openTile(x + 1, y);
        }
        if (y < size - 1) {
            if (!isTileVisible[x + 1][y + 1]) {
                openTile(x + 1, y + 1);
            }
        }
    }
}