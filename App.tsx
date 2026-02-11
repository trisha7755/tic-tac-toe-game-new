
import React, { useState } from 'react';
import Board from './components/Board';
import GameInfo from './components/GameInfo';
import ResetButton from './components/ResetButton';
import { calculateWinner } from './utils/gameLogic';
import type { SquareValue } from './types';

const App: React.FC = () => {
  const [board, setBoard] = useState<SquareValue[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  const winnerInfo = calculateWinner(board);
  const winner = winnerInfo ? winnerInfo.winner : null;
  const winningLine = winnerInfo ? winnerInfo.line : [];

  const isDraw = !winner && board.every(square => square !== null);

  const handleClick = (i: number): void => {
    if (winner || board[i]) {
      return;
    }
    const newBoard = board.slice();
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const handleReset = (): void => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  let status: string;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = 'It\'s a Draw!';
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 font-sans">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-5xl font-bold tracking-tighter text-cyan-400">Tic Tac Toe</h1>
        <GameInfo status={status} />
        <Board squares={board} onClick={handleClick} winningLine={winningLine} />
        <ResetButton onClick={handleReset} />
      </div>
    </main>
  );
};

export default App;
