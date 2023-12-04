document.addEventListener( "DOMContentLoaded", function() {

    const p1name = localStorage.getItem( 'p1name' ) || 'Player 1' // Default to 'Player 1' if not found
    const p2name = localStorage.getItem( 'p2name' ) || 'Player 2' // Default to 'Player 2' if not found

    // Update the h1 elements with player names
    document.getElementById( 'p1name' ).innerText = `${ p1name } Score`
    document.getElementById( 'p2name' ).innerText = `${ p2name } Score`

    const backgroundColorVariable = "#c84478"

    // 0 empty scare
    // 1 p1 Checker
    // 2 p2 Checker
    // 3 black scare
    // 4 p1 movement possibility
    // 5 p2 movement possibility 
    // 7 p1 queen
    // 8 p2 queen
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
    ]

    let player = 1

    let selRow = null
    let selCol = null
    let eatRow = null
    let eatCol = null

    const board = createBoard( playedBoard )
    let player1Score = 0
    let player2Score = 0

    // Selectors for score elements
    const player1ScoreElement = document.getElementById( "player1-score-value" )
    const player2ScoreElement = document.getElementById( "player2-score-value" )

    // Update score elements
    function updateScores( player1Score, player2Score ) {

        const row = []

        element = 0

        let cptPiecesP1 = 0
        let cptPiecesP2 = 0

        playedBoard.forEach( row => {
            row.forEach( element => {
      
                if( element == 1 || element == 7 ){
                    cptPiecesP1++
                    player2Score = 20 - cptPiecesP1
                }

                if( element == 2 || element == 8 ){
                    cptPiecesP2++
                    player1Score = 20 - cptPiecesP2
                }
            })
        })

        if ( player1Score == 20 ){
            setInterval( alert( 'Bravo vous avez gagné ' ), 1000 )
        }

        if ( player2Score == 20 ){
            setInterval( alert( 'Bravo vous avez gagné ' ), 1000 )

        }
        console.log( "player1Score = " + player1Score + "\nplayer2Score = " + player2Score )
        player1ScoreElement.textContent = player1Score
        player2ScoreElement.textContent = player2Score
    }

    function createBoard( matrix ){
        const board = []
        const boardElement = document.getElementById( "board" )

        for( let row = 0; row < matrix.length; row++ ) {
            const rowArray = []
            for( let col = 0; col < matrix[row].length; col++ ) {
                const cell = document.createElement( "div" )
                cell.classList.add( "cell" )

                // Check if the cell needs the "dark" class
                if( ( row + col ) % 2 === 1 ) {
                    cell.classList.add( "dark" )
                }

                // Add pieces for players
                if( matrix[row][col] === 1 ) {
                    const piece = document.createElement( "div" )
                    piece.classList.add( "piece", "player1" )
                    cell.appendChild( piece )
                }
                else if( matrix[row][col] === 2 ) {
                    const piece = document.createElement( "div" )
                    piece.classList.add( "piece", "player2" )
                    cell.appendChild( piece )
                }
                else if( matrix[row][col] === 7 ) {
                    const piece = document.createElement( "div" )
                    piece.classList.add( "piece", "player1k" )
                    cell.appendChild( piece )

                }
                else if( matrix[row][col] === 8 ) {
                    const piece = document.createElement( "div" )
                    piece.classList.add( "piece", "player2k" )
                    cell.appendChild( piece )
                }
                else if( matrix[row][col] === 4 ) {
                    const piece = document.createElement( "div" )
                    piece.classList.add( "piece", "player1m" )
                    cell.appendChild( piece )
                }
                else if( matrix[row][col] === 5 ) {
                    const piece = document.createElement( "div" )
                    piece.classList.add( "piece", "player2m" )
                    cell.appendChild( piece )
                }
                
                rowArray.push( cell )
                boardElement.appendChild( cell )

                // Add click event listener to cells
                cell.addEventListener( "click", () => handleCellClick( row, col ) )
            }
            board.push( rowArray )
        }
        class PieceSelector{
                selectedPiece( row, col ) {
                    if( this.selectedPiece ) {
                        this.selectedPiece.classlist.remove( "selected" )
                    }

                    const cell = document.querySelector( `.cell[data-row="${row}"][data-col="${col}"]` )
                    this.selectedPiece = cell.querySelector( ".piece" )

                    if (this.selectedPiece){
                        this.selectedPiece.classList.add( "selected" )

                        console.log( `selected piece at row ${row}, colum ${col}` )
                    }
                }
                getSelectedPiecePosition() {
                if( this.selectedPiece ){
                    const row = parseInt( this.selectedPiece.parentElement.dataset.row, 10 )
                const col = parseInt( this.selectedPiece.parentElement.dataset.col, 10 )
                return {row,col}
                }
                else {
                    return null
                }
            }
        }
        const pieceSelector = new PieceSelector()

        return board
    }

    function updateBoard( matrix ) {
        let boardElement = document.getElementById( "board" )
        while ( boardElement.firstChild ) {
            boardElement.firstChild.remove()
        }
        createBoard( matrix )
    }

    // Handle cell click event
    function handleCellClick( row, col ) {
            move( row, col )
            updateBoard( playedBoard )

            globalScore = player1Score + player2Score

            //Update the UI with new scores
            updateScores( player1Score, player2Score )
    }

    function move( row, col ) {
        console.log( "selRow   = " + selRow + " selCol = " + selCol + "\n" +
                     "   row   = " +    row + "    col = " +    col + "\n"   )

        if( selRow != null || selCol != null )
            console.log( "selected = " + playedBoard[selRow][selCol] )

        // check if the selected piece is a piece
        if( playedBoard[row][col] == 3 || playedBoard[row][col] == 0 && selRow == null && selCol == null )
        {
            console.log( playedBoard[row][col] + " n'est pas un pion" )
        }
        // check if the player try to play his piece
        else if( playedBoard[row][col] !== player     &&
                 playedBoard[row][col] !== player + 3 &&
                 playedBoard[row][col] !== player     &&
                 playedBoard[row][col] !== player + 6    )
        {
            console.log( playedBoard[row][col] + " n'est pas votre pion" )
        }
        // save the selected piece and check her mouvement
        else if( selRow == null && selCol == null )
        {
            selRow = row
            selCol = col

            for( let r = 0; r < playedBoard.length; r++ )
                for( let c = 0; c < playedBoard[r].length; c++ )
                    if( playedBoard[selRow][selCol] == 1 && validMove( selRow, selCol, r, c, player ) )
                        playedBoard[r][c] = 4
                    else if( playedBoard[selRow][selCol] == 2 && validMove( selRow, selCol, r, c, player ) )
                        playedBoard[r][c] = 5
                    else if( playedBoard[selRow][selCol] == 7 && validMoveQueen( selRow, selCol, r, c, player ) )
                        playedBoard[r][c] = 4
                    else if( playedBoard[selRow][selCol] == 8 && validMoveQueen( selRow, selCol, r, c, player ) )
                        playedBoard[r][c] = 5
        }
        // mouve the piece
        else if( validMove( selRow, selCol, row, col, player ) )
        {
            for( let r = 0; r < playedBoard.length; r++ )
                for( let c = 0; c < playedBoard[r].length; c++ )
                    if( playedBoard[r][c] == 4 || playedBoard[r][c] == 5 )
                    playedBoard[r][c] = 0

            if( playedBoard[selRow][ selCol ] === 2 && row == 0 )
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
                if( eatRow != null && eatCol != null ) {
                    playedBoard[eatRow][eatCol] = 0
                    eatRow = null
                    eatCol = null
                }
                playedBoard[row][col] = playedBoard[selRow][selCol]
            }
            playedBoard[selRow][selCol] = 0 

            selRow = null
            selCol = null
            // change background color based on the player's turn
            player = player === 1 ? 2 : 1
            player === 1 ? bgcolor = "#c84478" : bgcolor = "#3d125b"
            document.body.style.backgroundColor = bgcolor
        }
        else
        {
            for( let r = 0; r < playedBoard.length; r++ )
                for( let c = 0; c < playedBoard[r].length; c++ )
                    if( playedBoard[r][c] == 4 || playedBoard[r][c] == 5 )
                    playedBoard[r][c] = 0
            console.log( "Mouvement impossible" + playedBoard[selRow][selCol] + playedBoard[row][col] )
            selRow = null
            selCol = null
        }
    }

    function validMove( oriRow, oriCol, desRow, desCol, player ) {
        switch( playedBoard[oriRow][oriCol] ) {
            // redChecker
            case 1:
                return validMoveChecker( oriRow, oriCol, desRow, desCol, player )
            // blueChecker
            case 2:
                return validMoveChecker( oriRow, oriCol, desRow, desCol, player )
            // RedQueen
            case 7:
                return validMoveQueen( oriRow, oriCol, desRow, desCol, player )
            // blueQueen
            case 8:
                return validMoveQueen( oriRow, oriCol, desRow, desCol, player )

        return false
        }
    }

    function validMoveChecker( oriRow, oriCol, desRow, desCol, player ){
        if( oriRow === desRow && oriCol === desCol ) {
            return false
        }

        if( playedBoard[desRow][desCol] !== 0 && playedBoard[desRow][desCol] !== 4 && playedBoard[desRow][desCol] !== 5 )
            return false

        if( Math.abs( desRow - oriRow ) === Math.abs( desCol - oriCol ) ) {
            // Check if it's a regular move (not a capture)
            if( Math.abs( desRow - oriRow ) === 1 ) {
                // Check the directionality of the move
                return player === 1 ? desRow > oriRow : desRow < oriRow
            }

            if( Math.abs(desRow - oriRow) === 2 ) {
                const midRow = ( oriRow + desRow ) / 2
                const midCol = ( oriCol + desCol ) / 2

                if( player === 1 ) {
                    if( desRow > oriRow && playedBoard[midRow][midCol] === 2 || 
                        desRow > oriRow && playedBoard[midRow][midCol] === 8    ) {
                        eatRow = midRow
                        eatCol = midCol
                        return true
                    }
                }
                else if( desRow < oriRow && playedBoard[midRow][midCol] === 1 || 
                         desRow < oriRow && playedBoard[midRow][midCol] === 7    ) {
                    eatRow = midRow
                    eatCol = midCol
                    console.log( "eatRow = " + eatRow + " eatCol = " + eatCol)
                    return true
                }
            }
        }
        return false
    }

    function validMoveQueen( oriRow, oriCol, desRow, desCol, player ) {
        // Check the directionality of the move
        if( Math.abs( desRow - oriRow ) !== Math.abs( desCol - oriCol ) ) {
            return false
        }

        // Check if the destination cell is empty
        if( playedBoard[desRow][desCol] !== 0 && playedBoard[desRow][desCol] !== 4 && playedBoard[desRow][desCol] !== 5 )
            return false

        // Determine the direction of movement
        const stepRow = desRow > oriRow ? 1 : -1
        const stepCol = desCol > oriCol ? 1 : -1

        // Initialize variables to count opponent and same player pieces
        let row = oriRow + stepRow
        let col = oriCol + stepCol
        let opponentPieceCount = 0
        let samePlayerPieceCount = 0
    
        // Loop through the path and count opponent and same player pieces
        while( row !== desRow && col !== desCol ) {
            // Check the color of the piece in the current cell
            const currentPiece = playedBoard[row][col]

            // Check if there is an opponent's piece in the way
            if( ( player === 1 && ( currentPiece === 2 || currentPiece === 8 ) ) ||
                ( player === 2 && ( currentPiece === 1 || currentPiece === 7 ) )    ) {
                eatRow = row
                eatCol = col

                opponentPieceCount++
            }
            else if( currentPiece === player || currentPiece === player + 6 ) {
                samePlayerPieceCount++
            }

            // Move to the next cell
            row += stepRow
            col += stepCol
        }

        // Invalidate the move if there is any same player piece in the path
        if( samePlayerPieceCount > 0 ) {
            return false
        }

        // Allow the move if there is at most one opponent piece in the path
        if( opponentPieceCount  > 1 )
            return false

        return true
    }
});
