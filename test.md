## Function to handle click on a piece

fonction handlePieceClick(piece){

# no piece is selected 
if(!selectedPiece){
selectedPiece = piece;
piece.classlList.add('selected');
}
# piece is alredy selected
else{
    const cell = piece.parentElement;
    const selectedCelle = selectedPrice.parentElement;

    const pieceType = selectedPiece.classlsit.contains('player1') ? 1
    
}

}

function handlePieceClick(piece) {
        if (!selectedPiece) {
            selectedPiece = piece;
            piece.classList.add("selected");
        } else {

         const cell = piece.parentElement;
         const selectedCell = selectedPiece.parentElement;
         const pieceType = selectedPiece.classList.contains("player1") ? "b" : "w";
         const isMoveValid = isMoveValidForKing(selectedCell, cell);

         if (isMoveValid) {

            cell.appendChild(selectedPiece);
            selectedPiece.classList.remove("selected");
            selectedPiece = null;
        } else {
            selectedPiece.classList.remove("selected");
            selectedPiece = piece;
            selectedPiece.classList.add("selected");
        }
    }
}



function validMove(oriRow, oriCol, desRow, desCol, player) {


    if (oriRow === desRow && oriCol === desCol) {
        return false;
    }
        
    if (playedBoard[desRow][desCol] !== 0) {
        return false;
    }

    
    if (Math.abs(desRow - oriRow) === Math.abs(desCol - oriCol)) {
        // Check if it's a regular move (not a capture)
        if (Math.abs(desRow - oriRow) === 1) {
            // Check the directionality of the move
            return player === 1 ? desRow > oriRow : desRow < oriRow;
        }

     
        if (Math.abs(desRow - oriRow) === 2) {
            const midRow = (oriRow + desRow) / 2;
            const midCol = (oriCol + desCol) / 2;

            return player === 1 ? desRow > oriRow && playedBoard[midRow][midCol] === 2 : desRow < oriRow && playedBoard[midRow][midCol] === 1;
        }
    }

    return false;
}
