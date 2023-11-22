
    document.addEventListener("DOMContentLoaded", function () {

 const p1name = localStorage.getItem('p1name') || 'Player 1'; // Default to 'Player 1' if not found
const p2name = localStorage.getItem('p2name') || 'Player 2'; // Default to 'Player 2' if not found

// Update the h1 elements with player names
document.getElementById('p1name').innerText = `${p1name} Score`;
document.getElementById('p2name').innerText = `${p2name} Score`;

    const backgroundColorVariable = "#c84478"
    

        let playedBoard = [
            [3, 1, 3, 1, 3, 1, 3, 1, 3, 1],
            [1, 3, 1, 3, 1, 3, 1, 3, 1, 3],
            [3, 1, 3, 1, 3, 1, 3, 1, 3, 1],
            [1, 3, 1, 3, 1, 3, 1, 3, 1, 3],
            [3, 0, 3, 0, 3, 0, 3, 0, 3, 0],
            [0, 3, 0, 3, 0, 3, 0, 3, 0, 3],
            [3, 2, 3, 2, 3, 2, 3, 2, 3, 2],
            [2, 3, 2, 3, 2, 3, 2, 3, 2, 3],
            [3, 2, 3, 2, 3, 2, 3, 2, 3, 2],
            [2, 3, 2, 3, 2, 3, 2, 3, 2, 3]
        ];

        let player = 1;
        let selRow = null
        let selCol = null

        let selectedPiece = null;

        const board = createBoard(playedBoard);
        let player1Score = 0;
        let player2Score = 0;


        // Selectors for score elements
        
        const player1ScoreElement = document.getElementById("player1-score-value");
        const player2ScoreElement = document.getElementById("player2-score-value");

        // Update score elements
        function updateScores(player1Score, player2Score) {

        const row = [];
        element = 0;
        let comptage1 =0;
        let comptage2 =0;
        
        playedBoard.forEach(row => {
            row.forEach(element => {
                
                if (element == 1 || element == 7 ){
                    
                    comptage1++
                    
                    
                    player2Score = 20 - comptage1
                }
                
            })
        })
        playedBoard.forEach (row => {
            row.forEach(element => {
                
                if (element == 2 || element == 8){
                    
                    comptage2++
                     
                    player1Score = 20 - comptage2

                   /*if ( player1Score = )
                   */
                }
                
            })
        })

        if (player1Score == 20){
            setInterval( alert('Bravo vous avez gagné '), 1000)
        }

        if (player2Score == 20){
            setInterval( alert('Bravo vous avez gagné '), 1000)
            
        }
        player1ScoreElement.textContent = player1Score;
        player2ScoreElement.textContent = player2Score;
        
        }
        //updateScores(player1Score,player2Score);
        // Create the board using the predefined matrix
        function createBoard(matrix) {
            const board = [];
            const boardElement = document.getElementById("board");
        
            for (let row = 0; row < matrix.length; row++) {
                const rowArray = [];
                for (let col = 0; col < matrix[row].length; col++) {
                    const cell = document.createElement("div");
                    cell.classList.add("cell");
        
                    // Check if the cell needs the "dark" class
                    if ((row + col) % 2 === 1) {
                        cell.classList.add("dark");
                    }
        
                    // Add pieces for players
                    if (matrix[row][col] === 1) {
                        const piece = document.createElement("div");
                        piece.classList.add("piece", "player1");
                        cell.appendChild(piece);
                    } else if (matrix[row][col] === 2) {
                        const piece = document.createElement("div");
                        piece.classList.add("piece", "player2");
                        cell.appendChild(piece);
                    }
                    else if (matrix[row][col] === 7) {
                        const piece = document.createElement("div");
                        piece.classList.add("piece", "player1k");
                        cell.appendChild(piece);

                    }else if (matrix[row][col] === 8) {
                        const piece = document.createElement("div");
                        piece.classList.add("piece", "player2k");
                        cell.appendChild(piece);
                    }
                    rowArray.push(cell);
                    boardElement.appendChild(cell);
        
                    // Add click event listener to cells
                    cell.addEventListener("click", () => handleCellClick(row, col));

                }
                board.push(rowArray);
            }
        class PieceSelector{
                selectedPiece(row, col){
                    if(this.selectedPiece){
                        this.selectedPiece.classlist.remove("selected");
                    }
                    
                    const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
                    this.selectedPiece = cell.querySelector(".piece");
                    
                    if (this.selectedPiece){
                        this.selectedPiece.classList.add("selected");

                        console.log(`selected piece at row ${row}, colum ${col}`)
                    }
                }
                getSelectedPiecePosition(){
                if (this.selectedPiece){
                    const row = parseInt(this.selectedPiece.parentElement.dataset.row, 10);
                const col = parseInt(this.selectedPiece.parentElement.dataset.col, 10)
                return {row,col};
                }else{
                    return null;
                }
            }
        } 
        const pieceSelector = new PieceSelector();

    function CreatCellClickHandler(row, col){
        return function (){
            pieceSelector.selectPiece(row, col);
            };
        }

  

    //pieceSelector = new PieceSelector();

        function creatCellClickHandler(row, col){
            pieceSelector.selectPiece(row, col);
        }  
            return board;
        }

        function updateBoard(matrix) {
            let boardElement = document.getElementById("board");
            while (boardElement.firstChild) {
                boardElement.firstChild.remove();
            }
            createBoard(matrix);
        }


        // Handle cell click event
        function handleCellClick(row, col) {
    //console.log( "L-152.row = " + row + "\n" + "      col = " + col )
    if (playedBoard[row][col] === 1) {

        } else if (playedBoard[row][col] === 2) {
            player2Score++;
        }

        // Highlight the selected piece
        //highlightSelectedPiece(row, col);

        move(row, col);
        updateBoard(playedBoard);

        globalScore = player1Score + player2Score;

        //Update the UI with new scores
        updateScores(player1Score, player2Score);}


        /*/ Function to highlight the selected piece
function highlightSelectedPiece(row, col) {
    // Remove border from previously selected piece
    if (selectedPiece) {
        selectedPiece.style.border = 'none';
    }

    // Access the DOM element of the selected piece
    const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
    selectedPiece = cell.querySelector(".piece");

    // Add border to highlight the selected piece
    if (selectedPiece) {
        selectedPiece.style.border = '1px solid red';
    }
}

        */
        function move(row, col){
            console.log( "selRow = " + selRow + " selCol = " + selCol + "\n" +
                         "   row = " +    row + "    col = " +    col + "\n" +
                         "tab[9] = " + playedBoard[9] )
            if( selRow == null )
            {
                selRow = row
                selCol = col
            }
            else if( validMove(selRow, selCol, row, col, player) )
            {
                if( playedBoard[selRow][ selCol ] === 2 && row == 0)
                {
                    playedBoard[selRow][selCol] = 8
                    console.log( "reine bleu" )
                
                }
                else if( playedBoard[selRow][selCol] === 1 && row == 9 )
                {
                    playedBoard[row][col] = 7
                    console.log( "reine rouge" )
                }
                else
                {
                    playedBoard[row][col] = playedBoard[selRow][selCol]
                }
                
                playedBoard[selRow][selCol] = 0 
                
                selRow = null
                selCol = null
                player = player === 1 ? 2 : 1;
                player === 1 ? bgcolor = "#c84478" : bgcolor = "#3d125b"
                document.body.style.backgroundColor = bgcolor;
            }
            else
            {
                selRow = null
                selCol = null
                console.log("Mouvement impossible")
            }
       
        }

   
    function validMove(oriRow, oriCol, desRow, desCol, player) {
        switch ( playedBoard[oriRow][oriCol] ) {
            // redPion
            case 1:
                return validMovePion(oriRow, oriCol, desRow, desCol, player)
            break;
            // bluePion
            case 2:
                return validMovePion(oriRow, oriCol, desRow, desCol, player)
            break;
            // RedQueen
            case 7:
                return validMoveQueen(oriRow, oriCol, desRow, desCol, player)
            break;
            // blueQueen
            case 8:
                return validMoveQueen(oriRow, oriCol, desRow, desCol, player)
            break;

        return true
        }
    }
    function validMovePion(oriRow, oriCol, desRow, desCol, player){
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
                console.log(oriRow, oriCol)
                // return player === 1 ? desRow > oriRow && playedBoard[midRow][midCol] === 2 : desRow < oriRow && playedBoard[midRow][midCol] === 1;

                if (player === 1) {
                    if( desRow > oriRow && playedBoard[midRow][midCol] === 2 || 
                        desRow > oriRow && playedBoard[midRow][midCol] === 8    ){
                        if( desCol > oriCol )
                            playedBoard[desRow - 1][desCol - 1] = 0
                        else
                            playedBoard[desRow - 1][desCol + 1] = 0
                            updateScores(player1Score);
                        return true
                    }

                } else if(desRow < oriRow && playedBoard[midRow][midCol] === 1 || 
                          desRow < oriRow && playedBoard[midRow][midCol] === 7    ){
                    if( desCol > oriCol )
                        playedBoard[desRow + 1][desCol - 1] = 0
                    else
                        playedBoard[desRow + 1][desCol + 1] = 0
                        updateScores(player2Score);
                    
                    return true
                }
            }
        }
        return false
    }

    function validMoveQueen(oriRow, oriCol, desRow, desCol, player) {
        // Check if the piece at the origin cell belongs to the current player or is the player's queen
        if (playedBoard[oriRow][oriCol] !== player && playedBoard[oriRow][oriCol] !== player + 6) {
            console.log("Invalid move: not your piece");
            return false;
        }
    
        // Check if it's a regular move (not a capture)
        if (Math.abs(desRow - oriRow) !== Math.abs(desCol - oriCol)) {
            console.log("Invalid move: not diagonal");
            return false;
        }
    
        // Check if the destination cell is empty
        if (playedBoard[desRow][desCol] !== 0) {
            console.log("Invalid move: destination cell not empty");
            return false;
        }
    
        // Determine the direction of movement (up or down, left or right)
        const stepRow = desRow > oriRow ? 1 : -1;
        const stepCol = desCol > oriCol ? 1 : -1;
    
        // Initialize variables to count opponent and same player pieces
        let row = oriRow + stepRow;
        let col = oriCol + stepCol;
        let opponentPieceCount = 0;
        let samePlayerPieceCount = 0;
    
        // Loop through the path and count opponent and same player pieces
        let stockRow = null;
        let stockCol = null;
        while (row !== desRow && col !== desCol) {
            // Check the color of the piece in the current cell
            const currentPiece = playedBoard[row][col];
    
            // Check if there is an opponent's piece in the way
            if ((player === 1 && (currentPiece === 2 || currentPiece === 8)) ||
                (player === 2 && (currentPiece === 1 || currentPiece === 7))) {
                stockRow = row;
                stockCol = col;

                opponentPieceCount++;

            } else if (currentPiece === player || currentPiece === player + 6) {
                samePlayerPieceCount++;
            }
    
            // Move to the next cell
            row += stepRow;
            col += stepCol;
        }
    
        // Invalidate the move if there is any same player piece in the path
        if (samePlayerPieceCount > 0) {
            console.log("Invalid move: same player piece in the path");
            return false;
        }
    
        // Allow the move if there is at most one opponent piece in the path
        if( opponentPieceCount  > 1 )
            return false

        playedBoard[stockRow][stockCol] = 0
        return true
    }

    function validMoveQueenT(oriRow, oriCol, desRow, desCol, player) {
        console.log("validMoveQueen")
        /* player check
        if( player == 1 && playedBoard[oriRow][oriCol] != 7)
            return false
        if( player == 2 && playedBoard[oriRow][oriCol] != 8)
            return false
        */

        while ( oriRow <= desRow && oriCol <= desCol) {
            console.log(playedBoard[oriRow][oriCol]);
            oriRow++;
            oriCol++;
            //if(console.log(playedBoard[oriRow][oriCol]);
        }


        return true
    }
});

  /*  function validMoveReine(oriRow, oriCol, desRow, desCol, player){
        if (oriRow === desRow && oriCol === desCol) {
            return false;
        }

        if (playedBoard[desRow][desCol] !== 0) {
            return false;
        }

        if (Math.abs(desRow - oriRow) === Math.abs(desCol - oriCol)) {
            // Check if it's a regular move (not a capture)
         
            if (Math.abs(desRow - oriRow) === 2) {
                const midRow = (oriRow + desRow) / 2;
                const midCol = (oriCol + desCol) / 2;
                console.log(oriRow, oriCol)
                // return player === 1 ? desRow > oriRow && playedBoard[midRow][midCol] === 2 : desRow < oriRow && playedBoard[midRow][midCol] === 1;

                if (player === 1) {
                    if( desRow > oriRow && playedBoard[midRow][midCol] === 2 ){
                        if( desCol > oriCol )
                            playedBoard[desRow - 1][desCol - 1] = 0
                        else
                            playedBoard[desRow - 1][desCol + 1] = 0
                            updateScores(player1Score);
                        return true
                    }

                } else if(desRow < oriRow && playedBoard[midRow][midCol] === 1){
                    if( desCol > oriCol )
                        playedBoard[desRow + 1][desCol - 1] = 0
                    else
                        playedBoard[desRow + 1][desCol + 1] = 0
                        updateScores(player2Score);
                    
                    return true
                }
            }
        }
        return false
    }*/


        ///////////////////////////////////////////////////////////////////////

        // function validMove(oriRow, oriCol, desRow, desCol, player) {
        //     if (oriRow === desRow && oriCol === desCol) {
        //         return false;
        //     }
        
        //     if (playedBoard[desRow][desCol] !== 0) {
        //         return false;
        //     }
        
        //     if (Math.abs(desRow - oriRow) === Math.abs(desCol - oriCol)) {
        //         // Check if it's a regular move (not a capture)
        //         if (Math.abs(desRow - oriRow) === 1) {
        //             // Check the directionality of the move
        //             if (player === 1) {
        //                 return desRow > oriRow;
        //             } else {
        //                 return desRow < oriRow;
        //             }
        //         }
        
        //         if (Math.abs(desRow - oriRow) === 2) {
        //             const midRow = (oriRow + desRow) / 2;
        //             const midCol = (oriCol + desCol) / 2;
        
        //             if (player === 1) {
        //                 return desRow > oriRow && playedBoard[midRow][midCol] === 2 
        //             } else {
        //                 return desRow < oriRow && playedBoard[midRow][midCol] === 1;
        //             }
        //         }
        //     }
        
        //     return false;
        // }


    /*/

            class PieceSelector {
                constructor(){
                    this.selectedPiece = null;
                }
                selectedPiece(row, col){
                    if(this.selectedPiece){
                        this.selectedPiece.classlist.remove("selected");
                    }
                    
                    const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
                    this.selectedPiece = cel querySelector(".piece");
                    
                    if (this.selectedPiece){
                        this.selectedPiece.classList.add("selected");

                        console.log(`selected piece at row ${row}, colum ${col}`)
                    }
                }
                getSelectedPiecePosition(){
                if (this.selectedPiece){
                    const row = parseInt(this.selectedPiece.parentElement.dataset.row, 10);
                const col = parseInt(this.selectedPiece.parentElement.dataset.col, 10)
                return {row,col};
                }else{
                    return null;
                }
            }
        } 
        const pieceSelector = new peceSelector();

    function creatCellClickHandler(row, col){
        return function (){
            pieceSelector.selectPiece(row, col);
            };
        }
        cell.addEventListene("click", createCellClickHandler(row, col));  
        */

        /*
        
        */
/*
    function validMove( oriRow, oriCol, desRow, desCol ){
        console.log("L-152 playedBoard[row][col] = " + oriRow + " " + oriCol)
        console.log("L-152 playedBoard " + playedBoard[oriRow][oriCol])
        
        
        switch ( playedBoard[oriRow][oriCol] ) {
            // pion rouge
            case 1:
                // decendre uniquement en diagonal et les pion ne peuvent pas ce marcher dessu
                // check row
                *//*
                for(let r = oriRow; r < desRol; r++)
                {
                    for(let c = oriCol; x < desCol; c++)
                    {
                        if( !playedBoard[c][r] == 0 )
                            return false
                    }

                    for(let c = oriCol; x < x; x++)
                    {
                        if( !playedBoard[c][r] == 0 )
                            return false
                    }
                }
                *//*
                return false
            break;
            // pion bleu
            case 2:
                // monte uniquement en diagonal et les pion ne peuvent pas ce marcher dessu
                console.log("o-" + oriRow + " d-" + desRow)
                    for(let r = oriRow; r < desRow; r--)
                    {
                        console.log("premier for (ligne) " + r)

                            for(let c = oriCol; c < desCol; c++)
                            {
                                console.log("deuxieme for (colone) = " + r)
                                if( !playedBoard[c][r] == 0)
                                    return false
                            }
                            for(let c = oriCol; c > desCol; c--)
                            {
                                console.log("troisieme for (colone) = " + r)
                                if( !playedBoard[c][r] == 0)
                                return false   
                            }  
                    }
                return true
            break;
        }

        return false
    }
*/
/*
  function validMoveQueen(oriRow, oriCol, desRow, desCol, player) {
    // Check if it's a regular move (not a capture)
    if (Math.abs(desRow - oriRow) !== Math.abs(desCol - oriCol)) {
        console.log("Invalid move: not diagonal");
        return false;
    }

    // Check if the destination cell is empty
    if (playedBoard[desRow][desCol] !== 0) {
        console.log("Invalid move: destination cell not empty");
        return false;
    }
/*
        if (player === 1) {
            if( desRow > oriRow && playedBoard[midRow][midCol] === 2 ){
                if( desCol > oriCol )
                    playedBoard[desRow - 1][desCol - 1] = 0
                else
                    playedBoard[desRow - 1][desCol + 1] = 0
                    updateScores(player1Score);
                return true
            }

        } else if(desRow < oriRow && playedBoard[desRow - 1][desCol - 1] === 1){
            if( desCol > oriCol )
                playedBoard[desRow + 1][desCol - 1] = 0
            else
                playedBoard[desRow + 1][desCol + 1] = 0
                updateScores(player2Score);
            
            return true
        }
*/
/*
        // Check if the path is clear (no pieces in between)
        const stepRow = desRow > oriRow ? 1 : -1;
        const stepCol = desCol > oriCol ? 1 : -1;
        let row = oriRow + stepRow;
        let col = oriCol + stepCol;
        let pieceCount = 0;
        
        while (row !== desRow && col !== desCol) {
            // check combien de pieces blue sur le trajet a faire
            if (player == 1){
                if (playedBoard[row][col] === 2 ||  playedBoard[row][col] == 8) {
                    if (pieceCount > 1){
                        console.log("something went wrong 1");
                        return false; // There's a piece in the way
                    }
                }
                else if(playedBoard[row][col] === 1 ||  playedBoard[row][col] == 7) 
                {
                    console.log("something went wrong 2");
                    return false;
                }
            }
            if (player == 2){
                if (playedBoard[row][col] === 1 ||  playedBoard[row][col] == 7) {
                    if (pieceCount > 1){
                        console.log("something went wrong 3");
                        return false; // There's a piece in the way
                    }
                }
                else if(playedBoard[row][col] === 2 ||  playedBoard[row][col] == 8) 
                {
                    console.log("something went wrong 4");
                    return false;
                }
            }
            row += stepRow;
            col += stepCol;
        }

        return true;
    }
*/

/*
        //////////////////////////////////////////////////////////////////////////////////////////////////////

        // function validMoveT( oriRow, oriCol, desRow, desCol ){
        //     console.log("L-152 playedBoard[row][col] = " + oriRow + " " + oriCol)
        //     console.log("L-152 playedBoard " + playedBoard[oriRow][oriCol])

        //     switch ( playedBoard[oriRow][oriCol] ) {
        //         // pion rouge
        //         case 1:
        //             // decendre uniquement en diagonal et les pion ne peuvent pas ce marcher dessu
        //             // check row
        //             for(let r = oriRow; r < desRol; r++)
        //             {

        //                 for(let c = oriCol; c < desCol; c++)
        //                 {
        //                     if( !playedBoard[c][r] == 0 )
        //                         return false
        //                 }
    
        //                 for(let c = oriCol; x < x; x++)
        //                 {
        //                     if( !playedBoard[c][r] == 0 )
        //                         return false
        //                 }
        //             }
        //             return true
        //         break;
        //         // pion bleu
        //         case 2:
        //             // monte uniquement en diagonal et les pion ne peuvent pas ce marcher dessu
        //             console.log("o-" + oriRow + " d-" + desRow)
        //                 for(let r = oriRow; r < desRow; r--)
        //                 {
        //                     console.log("premier for (ligne) " + r)
    
        //                         for(let c = oriCol; c < desCol; c++)
        //                         {
        //                             console.log("deuxieme for (colone) = " + r)
        //                             if( !playedBoard[c][r] == 0)
        //                                 return false
        //                         }
        //                         for(let c = oriCol; c > desCol; c--)
        //                         {
        //                             console.log("troisieme for (colone) = " + r)
        //                             if( !playedBoard[c][r] == 0)
        //                             return false   
        //                         }  
        //                 }
        //             return true
        //         break;
        //     }

        //     return false
        // }

        //////////////////////////////////////////////////////////////////////////////////////////////////////

        /*
            [3, 0, 3, 0, 3, 0, 3, 0, 3, 0],
            [1, 3, 1, 3, 1, 3, 1, 3, 1, 3],
            [3, 0, 3, 0, 3, 0, 3, 0, 3, 0],
            [1, 3, 1, 3, 1, 3, 1, 3, 1, 3],
            [3, 0, 3, 0, 3, 0, 3, 0, 3, 0],
            [0, 3, 0, 3, 0, 3, 0, 3, 0, 3],
            [3, 2, 3, 2, 3, 0, 3, 0, 3, 0],
            [2, 3, 2, 3, 2, 3, 0, 3, 0, 3],
            [3, 2, 3, 2, 3, 0, 3, 1, 3, 0],
            [8, 3, 2, 3, 2, 3, 0, 3, 7, 3]
        */
 
