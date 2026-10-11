function player(marker) {

   return {
      marker

   }

}

const plyr1 = player("X")
const plyr2 = player("O")

const gameboard = (() => {

   const board = ["", "", "", "", "", "", "", "", ""]
   let NoOfIdxFilled = 0;

   const placeMarker = (marker, i) => {

      if (i >= 0 && i < 9 && board[i].length == 0) {

         board[i] = marker;
         NoOfIdxFilled++;

      }

   }

   const NoOfboxesFilled = () => {

      return NoOfIdxFilled;

   }

   const currentBoardState = () => {

      let copyofboard = [...board];
      return copyofboard;


   }

   const reset = () => {

      for (let i = 0; i < 9; i++) {

         board[i] = "";

      }
      NoOfIdxFilled = 0;

   }

   return {
      placeMarker,
      currentBoardState,
      NoOfboxesFilled,
      reset
   }

})();

const game = ((plyr1, plyr2, gameboard) => {

   let turn = 0;
   let gameflag = 1;
   const text = document.querySelector(".turn");

   const playRound = (i) => {

      let currentidxfilled = gameboard.NoOfboxesFilled()

      if (gameflag == 1) {
         if (turn == 0) {

            gameboard.placeMarker(plyr1.marker, i)

            if (gameboard.currentBoardState()[i].length != 0 && currentidxfilled != gameboard.NoOfboxesFilled()) {

               game.WinDetection();
               if (gameflag == 1) {
                  turn = 1;
                  text.textContent = `Player O's Turn`
               }


            }


         }
         else if (turn == 1) {


            gameboard.placeMarker(plyr2.marker, i)

            if (gameboard.currentBoardState()[i].length != 0 && currentidxfilled != gameboard.NoOfboxesFilled()) {

               game.WinDetection();
               if (gameflag == 1) {
                  turn = 0;
                  text.textContent = `Player X's Turn`

               }

            }

         }
      }
   }

   const WinDetection = () => {

      let gameXboard = gameboard.currentBoardState();

      if (gameXboard[0].length != 0 && gameXboard[1].length != 0 && gameXboard[2].length != 0) {

         if (gameXboard[0] == gameXboard[1] && gameXboard[1] == gameXboard[2]) {
            console.log(`player ${gameXboard[0]} wins`)
            text.textContent = `Player ${gameXboard[0]} wins`
            gameflag = 0;
            turn = 0;
            return;
         }

      }

      if (gameXboard[3].length != 0 && gameXboard[4].length != 0 && gameXboard[5].length != 0) {

         if (gameXboard[3] == gameXboard[4] && gameXboard[4] == gameXboard[5]) {
            console.log(`player ${gameXboard[3]} wins`)
            text.textContent = `Player ${gameXboard[3]} wins`
            gameflag = 0;
            turn = 0;
            return;
         }

      }

      if (gameXboard[6].length != 0 && gameXboard[7].length != 0 && gameXboard[8].length != 0) {

         if (gameXboard[6] == gameXboard[7] && gameXboard[7] == gameXboard[8]) {
            console.log(`player ${gameXboard[6]} wins`)
            text.textContent = `Player ${gameXboard[6]} wins`
            gameflag = 0;
            turn = 0;
            return;
         }

      }

      if (gameXboard[0].length != 0 && gameXboard[3].length != 0 && gameXboard[6].length != 0) {

         if (gameXboard[0] == gameXboard[3] && gameXboard[3] == gameXboard[6]) {
            console.log(`player ${gameXboard[0]} wins`)
            text.textContent = `Player ${gameXboard[0]} wins`
            gameflag = 0;
            turn = 0;
            return;
         }

      }

      if (gameXboard[1].length != 0 && gameXboard[4].length != 0 && gameXboard[7].length != 0) {

         if (gameXboard[1] == gameXboard[4] && gameXboard[4] == gameXboard[7]) {
            console.log(`player ${gameXboard[1]} wins`)
            text.textContent = `Player ${gameXboard[1]} wins`
            gameflag = 0;
            turn = 0;
            return;
         }

      }

      if (gameXboard[2].length != 0 && gameXboard[5].length != 0 && gameXboard[8].length != 0) {

         if (gameXboard[2] == gameXboard[5] && gameXboard[5] == gameXboard[8]) {
            console.log(`player ${gameXboard[2]} wins`)
            text.textContent = `Player ${gameXboard[2]} wins`
            gameflag = 0;
            turn = 0;
            return;
         }

      }

      if (gameXboard[0].length != 0 && gameXboard[4].length != 0 && gameXboard[8].length != 0) {

         if (gameXboard[0] == gameXboard[4] && gameXboard[4] == gameXboard[8]) {
            console.log(`player ${gameXboard[0]} wins`)
            text.textContent = `Player ${gameXboard[0]} wins`
            gameflag = 0;
            turn = 0;
            return;
         }

      }

      if (gameXboard[2].length != 0 && gameXboard[4].length != 0 && gameXboard[6].length != 0) {

         if (gameXboard[2] == gameXboard[4] && gameXboard[4] == gameXboard[6]) {
            console.log(`player ${gameXboard[2]} wins`)
            text.textContent = `Player ${gameXboard[2]} wins`
            gameflag = 0;
            turn = 0;
            return;
         }

      }

      if (gameboard.NoOfboxesFilled() == 9) {

         console.log("match tie");
         text.textContent = `TIE..!!`
         gameflag = 0;
         turn = 0;
         return;
      }




   }

   const restart = () => {
      gameboard.reset();
      turn = 0;
      gameflag = 1;
   };

   return {
      playRound,
      WinDetection,
      restart
   };

})(plyr1, plyr2, gameboard);

const displayController = (() => {

   const cell = document.querySelectorAll(".cell")
   const liveboard = () => {

      const boards = gameboard.currentBoardState();
      let i = 0;
      cell.forEach((eachCell) => {

         eachCell.textContent = `${boards[i++]}`

      })
   }


   const restartButton = document.querySelector(".restart");
   const turnText = document.querySelector(".turn");

   const restart = () => {
      restartButton.addEventListener("click", () => {
         game.restart();
         liveboard();
         turnText.textContent = "Player X's Turn";
      });
   };


   const marker = () => {

      for (let i = 0; i < 9; i++) {

         cell[i].addEventListener("click", () => {

            game.playRound(i);
            liveboard();

         })
      }

   }

   return {
      liveboard,
      restart,
      marker
   }

})();

displayController.marker();
displayController.restart();
