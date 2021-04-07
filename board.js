const screen_width = 512;
const screen_height = 512;
const tileSize = 64; //Size of one square on the board

//Create 2D array of board
let board = new Array(8);
for (let i = 0; i < board.length; i++) {
    board[i] = new Array(8);
}

//Board colors
let white = 200;
let black = 100;

function setup() {
    createCanvas(screen_width, screen_height);
    noStroke();

    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            board[y][x] = 0;
        }
    }
}

function draw() {
    background(200);

    drawBoard();
    loadFromFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
}

function drawBoard() {
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            let isLight = (y + x) % 2 !== 0; //Make every other board piece black or white
            let squarecolor = (isLight) ? black : white;
            fill(squarecolor);

            square(x * tileSize, y * tileSize, tileSize);
        }
    }
}

function placePiece(piece, x, y) {
    if (piece.toString() === piece.toUpperCase()) {
        fill(255);
    } else {
        fill(0);
    }

    piece = correctPieceToUnicode(piece);

    textSize(32);
    text(piece, (x * tileSize) + 16, (y * tileSize) + 48);

    textSize(8);
    text(board[y][x], (x * tileSize) + 28, (y * tileSize) + 56);
}

function correctPieceToUnicode(piece) {
    piece = piece.toUpperCase();
    switch (piece) {
        case 'P': return '♙'; break;
        case 'R': return '♖'; break;
        case 'N': return '♘'; break;
        case 'B': return '♗'; break;
        case 'Q': return '♕'; break;
        case 'K': return '♔'; break;
    }
}

function loadFromFen(fenstring) {
    let x = 0;
    let y = 0;
    for (let i = 0; i < fenstring.length; i++) {
        let c = fenstring.charAt(i);
        switch (c) {
            case 'p': placePiece('p', x, y); board[y][x] = 11; x = x + 1; break; //Black pawn
            case 'r': placePiece('r', x, y); board[y][x] = 14; x = x + 1; break; //Black rock
            case 'n': placePiece('n', x, y); board[y][x] = 13; x = x + 1; break; //Black knight
            case 'b': placePiece('b', x, y); board[y][x] = 12; x = x + 1; break; //Black bishop
            case 'q': placePiece('q', x, y); board[y][x] = 15; x = x + 1; break; //Black queen
            case 'k': placePiece('k', x, y); board[y][x] = 16; x = x + 1; break; //Black king

            case 'P': placePiece('P', x, y); board[y][x] = 21; x = x + 1; break; //White pawn
            case 'R': placePiece('R', x, y); board[y][x] = 24; x = x + 1; break; //White rock
            case 'N': placePiece('N', x, y); board[y][x] = 23; x = x + 1; break; //White knight
            case 'B': placePiece('B', x, y); board[y][x] = 22; x = x + 1; break; //White bishop
            case 'Q': placePiece('Q', x, y); board[y][x] = 25; x = x + 1; break; //White queen
            case 'K': placePiece('K', x, y); board[y][x] = 26; x = x + 1; break; //White king

            case '1': x = x + 1; break;
            case '2': x = x + 2; break;
            case '3': x = x + 3; break;
            case '4': x = x + 4; break;
            case '5': x = x + 5; break;
            case '6': x = x + 6; break;
            case '7': x = x + 7; break;
            case '8': x = x + 8; break;

            case '/': y = y + 1; x = 0; break; //Newline
        }
    }
}