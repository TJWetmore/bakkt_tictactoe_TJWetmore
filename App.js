import React, { useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button} from 'react-native';


export default function App() {

  const [board, setBoard] = useState((Array(9).fill('unpressed')));

  const [turn, setTurn] = useState(true);

  const [winner, setWinner] = useState(false);

  const [scores, setScores] = useState({'Green' : 0, 'Red' : 0})

  let player = turn ? 'Green' : 'Red';


  const checkWinner = (tempBoard) => {
    console.log('checkign winners', tempBoard)
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winningCombos.length; i++) {
      console.log(board[i])
      const [a, b, c] = winningCombos[i];
      console.log(tempBoard[a] , tempBoard[b] , tempBoard[c] )
      if ((tempBoard[a] || tempBoard[b] || tempBoard[c]) !== 'unpressed' && tempBoard[a] === tempBoard[b] && tempBoard[a] === tempBoard[c]) {
        return (tempBoard[a])
      }
    }
    return false;

  }

  const boardClick = async (id) => {
    if (board[id] === 'unpressed') {
      let newBoard = [...board];
      newBoard[id] = player;
      

      const boardWinner = checkWinner(newBoard);
      if (boardWinner){
        setWinner(boardWinner)
        setScores(scores => ({...scores, [boardWinner] : scores[boardWinner] + 1 }))

        console.log(scores)
      }
      setBoard(newBoard);

      setTurn(!turn);
    }

  }

  const resetBoard = () => {
    setBoard(Array(9).fill('unpressed'))

    if (winner === false ) setTurn(!turn)
    
    winner === 'Green' ? setTurn(false) : setTurn(true)
    
    setWinner(false)
  }


  return (
    <>
    <View style={styles.boardContainer}>
    <Text>
        {winner ? 
          <Text style={ winner === 'Green' ? {color : 'green', fontSize: 20, padding: 20, fontWeight: "bold" } : {color : 'red', fontSize: 20, padding: 20, fontWeight: "bold" } }>{winner} Won!!! </Text>
        :
          <Text style={ turn ? {color : 'green', fontSize: 20, padding: 20, fontWeight: "bold" } : {color : 'red', fontSize: 20, padding: 20, fontWeight: "bold" } }>{player}'s turn </Text>
        }
        </Text>
        <Button
          title="Reset Board"
          color="#f194ff"
          onPress={() => resetBoard()}
        />
      <View style={styles.board} pointerEvents={winner ? 'none' : 'auto'}>
        <View style={styles.row}>
            <TouchableOpacity style={styles[board[0]]} onPress={() => boardClick(0)} />
            <TouchableOpacity style={styles[board[1]]} onPress={() => boardClick(1)} />
            <TouchableOpacity style={styles[board[2]]} onPress={() => boardClick(2)} />
        </View>
        <View style={styles.row}>
            <TouchableOpacity style={styles[board[3]]} onPress={() => boardClick(3)} />
            <TouchableOpacity style={styles[board[4]]} onPress={() => boardClick(4)} />
            <TouchableOpacity style={styles[board[5]]} onPress={() => boardClick(5)} />
        </View>
        <View style={styles.row}>
            <TouchableOpacity style={styles[board[6]]} onPress={() => boardClick(6)} />
            <TouchableOpacity style={styles[board[7]]} onPress={() => boardClick(7)} />
            <TouchableOpacity style={styles[board[8]]} onPress={() => boardClick(8)} />
        </View>
      </View>
    </View>

      <View style={styles.scoreContainer}>
        <Text>
          <Text style={{fontSize: 20, padding: 20, fontWeight: "bold"}}> Scores</Text>
        </Text>
        <Button
          title="Reset Scores"
          color="#f194ff"
          onPress={() => setScores({Green : 0, Red : 0})}
        />
        <View style={styles.splitCells}>
          <Text style={{color : 'green', fontSize: 20, padding: 20, fontWeight: "bold"}}> Green Score: {scores.Green}</Text>
          <Text style={{color : 'red', fontSize: 20, padding: 20, fontWeight: "bold"}}> Red Score: {scores.Red}</Text>
        </View>
      </View>

    </>
  );
}

const styles = StyleSheet.create({
  boardContainer: {
    width: '100%',
    flex: 4,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  board: {
    borderWidth: 3,
    borderColor: 'powderblue',
    width: 300,
    height: 300,
    alignContent: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Green: {
    margin: 5, 
    backgroundColor: 'green',
    flexDirection: "row",
    width: 80,
    height: 80,
  },
  Red: {
    margin: 5, 
    backgroundColor: 'red',
    flexDirection: "row",
    width: 80,
    height: 80,
  },
  unpressed: {
    margin: 5, 
    backgroundColor: 'powderblue',
    flexDirection: "row",
    width: 80,
    height: 80,
  },
  scoreContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center'
  },
  splitCells: {
    flexDirection: "row",
    alignContent: "space-between",
    flex: 3,
    backgroundColor: "#fff",
  },
});
