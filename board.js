const screen_width = 512;
const screen_height = 512;
const tileSize = 64;

let board = new Array(8);
for (let i = 0; i < board.length; i++) {
    board[i] = new Array(8);
}

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
            if (board[y][x] === 0) {
                let isLight = (y + x) % 2 !== 0;
                let squarecolor = (isLight) ? black : white;
                fill(squarecolor);
                
                square(x * tileSize, y * tileSize, tileSize);
            }
        }
    }
}

function placePiece(piece, x, y) {
    if(piece.toString() === piece.toUpperCase()) {
        fill(255);
    } else {
        fill(0);
    }

    piece = correctPieceToUnicode(piece);

    textSize(32);
    text(piece, (x * tileSize) + 16, (y * tileSize) + 48);
}

function correctPieceToUnicode(piece) {
    piece = piece.toUpperCase();
    switch (piece) {
        case 'P': return '♙'; break; //White pawn
        case 'R': return '♖'; break; //White rock
        case 'N': return '♘'; break; //White knight
        case 'B': return '♗'; break; //White bishop
        case 'Q': return '♕'; break; //White queen
        case 'K': return '♔'; break; //White king
    }
}

function loadFromFen(fenstring) {
    let x = 0;
    let y = 0;
    for (let i = 0; i < fenstring.length; i++) {
        let c = fenstring.charAt(i);
        switch (c) {
            case 'p': placePiece('p', x, y); x = x + 1; break; //Black pawn
            case 'r': placePiece('r', x, y); x = x + 1; break; //Black rock
            case 'n': placePiece('n', x, y); x = x + 1; break; //Black knight
            case 'b': placePiece('b', x, y); x = x + 1; break; //Black bishop
            case 'q': placePiece('q', x, y); x = x + 1; break; //Black queen
            case 'k': placePiece('k', x, y); x = x + 1; break; //Black king

            case 'P': placePiece('P', x, y); x = x + 1; break; //White pawn
            case 'R': placePiece('R', x, y); x = x + 1; break; //White rock
            case 'N': placePiece('N', x, y); x = x + 1; break; //White knight
            case 'B': placePiece('B', x, y); x = x + 1; break; //White bishop
            case 'Q': placePiece('Q', x, y); x = x + 1; break; //White queen
            case 'K': placePiece('K', x, y); x = x + 1; break; //White king

            case '1': break;
            case '2': x = 1; break;
            case '3': x = 2; break;
            case '4': x = 3; break;
            case '5': x = 4; break;
            case '6': x = 5; break;
            case '7': x = 6; break;
            case '8': x = 7; break;

            case '/': y = y + 1; x = 0; break; //Newline
        }
    }
}