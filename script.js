var selectedPiece = null; // To store the currently selected piece

// Function to generate the table
function generateTable() {
    var table = document.getElementById("myTable");
    // Loop through rows
    for (var i = 8; i >= 1; i--) {
        var row = document.createElement("tr");
        row.id = "row" + i;
        // Loop through cells
        for (var j = 1; j <= 8; j++) {
            var cell = document.createElement("td");
            cell.id = String.fromCharCode(96 + j) + i;
            // Add event listener to pick or move piece
            cell.addEventListener("click", function(event) {
                var cellId = event.target.id;
                if (!selectedPiece) {
                    pickPiece(cellId);
                } else {
                    movePieceTo(cellId);
                }
            });
            // Set inner HTML of the cell to the appropriate chess piece character
            cell.innerHTML = "<div>" + getStartingPiece(i, j) + "</div>";
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

// Rest of the code remains the same...


function getStartingPiece(row, column) {
    // Black pieces
    if (row === 8) {
        if (column === 1 || column === 8) return '<span class="chess-piece black rook"></span>'; // Rook
        if (column === 2 || column === 7) return '<span class="chess-piece black knight"></span>'; // Knight
        if (column === 3 || column === 6) return '<span class="chess-piece black bishop"></span>'; // Bishop
        if (column === 4) return '<span class="chess-piece black queen"></span>'; // Queen
        if (column === 5) return '<span class="chess-piece black king"></span>'; // King
    } else if (row === 7) {
        return '<span class="chess-piece black pawn"></span>'; // Pawn
    }
    // White pieces
    if (row === 1) {
        if (column === 1 || column === 8) return '<span class="chess-piece white rook"></span>'; // Rook
        if (column === 2 || column === 7) return '<span class="chess-piece white knight"></span>'; // Knight
        if (column === 3 || column === 6) return '<span class="chess-piece white bishop"></span>'; // Bishop
        if (column === 4) return '<span class="chess-piece white queen"></span>'; // Queen
        if (column === 5) return '<span class="chess-piece white king"></span>'; // King
    } else if (row === 2) {
        return '<span class="chess-piece white pawn"></span>'; // Pawn
    }
    // Empty cell
    return "";
}

document.addEventListener("DOMContentLoaded", function () {
    // Call the function to generate the table
    generateTable();
});

function pickPiece(cellId) {
    var cell = document.getElementById(cellId);
    if (cell.innerHTML.trim() !== "") {
        var pieceClass = cell.querySelector('.chess-piece').className;
        var pieceColor = pieceClass.includes('white') ? 'white' : 'black';
        selectedPiece = { class: pieceClass, color: pieceColor, cellId: cellId };
        // Highlight possible moves for the selected piece (to be implemented)
        // For now, let's log the selected piece information
        console.log("Selected Piece:", selectedPiece);
    }
}

function movePieceTo(targetCellId) {
    if (selectedPiece !== null) {
        var targetCell = document.getElementById(targetCellId);
        var startPos = selectedPiece.cellId;
        var endPos = targetCellId;
        if (isValidMove(startPos, endPos)) {
            targetCell.innerHTML = "";
            targetCell.innerHTML = cell.innerHTML;
            selectedPiece = null;
            // Update the board state (to be implemented)
            console.log("Moved " + selectedPiece.class + " from " + startPos + " to " + endPos);
            console.log("Updated Board State:", board);
        } else {
            console.log("Invalid move!");
        }
    }
}


function refresh() {
    var table = document.getElementById("myTable");
    table.innerHTML = "";
    generateTable();
}

function findStartPos(finalPos) {
    // Convert final position to lowercase to handle both upper and lower case
    finalPos = finalPos.toLowerCase();
    var pieces = ['rook', 'knight', 'bishop', 'queen', 'king', 'pawn'];
    // Loop through all cells on the board
    for (var i = 1; i <= 8; i++) {
        for (var j = 1; j <= 8; j++) {
            var startPos = String.fromCharCode(96 + j) + i; // Cell coordinate (e.g., 'e4')
            // Check if the piece in the current cell matches the final position
            for (var k = 0; k < pieces.length; k++) {
                if (document.getElementById(startPos).innerHTML.includes(pieces[k]) && document.getElementById(startPos).innerHTML.includes(finalPos)) {
                    return startPos; // Return the start position if found
                }
            }
        }
    }
    return null; // Return null if start position not found
}

var moves = [
    'd4', 'Nc6',
    'c4', 'Nf6',
    'e3', 'Bg7',
    'Be2', 'O-O',
    'Nh3', 'Nh6',
    'h3', 'h5',
    'O-O', 'd6',
    'Qb3', 'a6',
    'b3', 'h4',
    'Ba3', 'b5',
    'Qc3', 'Ba7',
    'f3', 'h3'
];

var board = {
    'a1': 'R', 'b1': 'N', 'c1': 'B', 'd1': 'Q', 'e1': 'K', 'f1': 'B', 'g1': 'N', 'h1': 'R',
    'a2': 'P', 'b2': 'P', 'c2': 'P', 'd2': 'P', 'e2': 'P', 'f2': 'P', 'g2': 'P', 'h2': 'P',
    'a8': 'r', 'b8': 'n', 'c8': 'b', 'd8': 'q', 'e8': 'k', 'f8': 'b', 'g8': 'n', 'h8': 'r',
    'a7': 'p', 'b7': 'p', 'c7': 'p', 'd7': 'p', 'e7': 'p', 'f7': 'p', 'g7': 'p', 'h7': 'p'
};

function movePiece() {
    var index = 0;
    var interval = setInterval(function() {
        if (index < moves.length) {
            var move = moves[index];
            var startPos = determineStartingPosition(move);
            if (startPos) {
                executeMove(startPos, move);
            } else {
                console.log("Invalid move: " + move);
            }
        } else {
            clearInterval(interval);
            console.log("Game Over!");
        }
        index++;
    }, 2000); // Adjust the delay for each move
}

function determineStartingPosition(endPos) {
    // Iterate through the board to find the starting position based on the piece type and end position
    for (var startPos in board) {
        var piece = board[startPos];
        if (validMove(piece, startPos, endPos)) {
            return startPos;
        }
    }
    return null; // If no valid starting position is found
}
function validMove(piece, startPos, endPos) {
    var pieceType = piece.toUpperCase(); // Get the uppercase piece type
    var fileStart = startPos.charAt(0);
    var fileEnd = endPos.charAt(0);
    var rankStart = parseInt(startPos.charAt(1));
    var rankEnd = parseInt(endPos.charAt(1));

    // Check if the end position is within the board
    if (fileEnd < 'a' || fileEnd > 'h' || rankEnd < 1 || rankEnd > 8) {
        return false;
    }

    // Check if the end position is occupied by own piece
    if (board[endPos] && board[endPos].toLowerCase() === piece.toLowerCase()) {
        return false;
    }

    // Check if the piece can move to the given end position based on its type
    switch (pieceType) {
        case 'P': // Pawn
            // Pawn moves one square forward
            if (fileStart === fileEnd && (rankEnd === rankStart + 1 || (rankStart === 2 && rankEnd === 4))) {
                return true;
            }
            break;
        case 'R': // Rook
            // Rook moves along rank or file
            if (fileStart === fileEnd || rankStart === rankEnd) {
                return true;
            }
            break;
        case 'N': // Knight
            // Knight moves in an L shape
            var fileDiff = Math.abs(fileEnd.charCodeAt(0) - fileStart.charCodeAt(0));
            var rankDiff = Math.abs(rankEnd - rankStart);
            if ((fileDiff === 1 && rankDiff === 2) || (fileDiff === 2 && rankDiff === 1)) {
                return true;
            }
            break;
        case 'B': // Bishop
            // Bishop moves diagonally
            if (Math.abs(fileEnd.charCodeAt(0) - fileStart.charCodeAt(0)) === Math.abs(rankEnd - rankStart)) {
                return true;
            }
            break;
        case 'Q': // Queen
            // Queen combines Rook and Bishop moves
            if (fileStart === fileEnd || rankStart === rankEnd || Math.abs(fileEnd.charCodeAt(0) - fileStart.charCodeAt(0)) === Math.abs(rankEnd - rankStart)) {
                return true;
            }
            break;
        case 'K': // King
            // King moves one square in any direction
            if (Math.abs(fileEnd.charCodeAt(0) - fileStart.charCodeAt(0)) <= 1 && Math.abs(rankEnd - rankStart) <= 1) {
                return true;
            }
            break;
    }
    return false;
}


function executeMove(startPos, endPos) {
    var piece = board[startPos];
    var startCell = document.getElementById(startPos);
    var endCell = document.getElementById(endPos);
    
    // Check if the end position is occupied by an opponent's piece
    var opponentPiece = endCell.innerHTML.trim();
    
    // Move the piece to the target cell
    endCell.innerHTML = startCell.innerHTML;
    startCell.innerHTML = "";

    // Update the board state
    delete board[startPos];
    board[endPos] = piece;

    // If the end position was occupied by an opponent's piece, capture it
    if (opponentPiece !== "") {
        console.log("Captured " + opponentPiece);
    }
}


