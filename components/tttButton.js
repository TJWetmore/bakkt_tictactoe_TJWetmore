import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet} from 'react-native';

const TTTButton = (props) => {

  const {val, click} = props;

  console.log(val, click)

  // console.log(props) 


  const [buttonStyled, setButtonStyle] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState('Green');

  const handleClick = () => {
    setButtonStyle(true)
  }

  return (
    <>
      <TouchableOpacity style={buttonStyled ? styles.pressed : styles.unpressed} activeOpacity={1} >
      </TouchableOpacity>
    </>
  );
}


const styles = StyleSheet.create({
  pressedGreen: {
    height: '10%', 
    width: '10%', 
    margin: 5, 
    backgroundColor: 'green',
    flexDirection: "row",
    width: 80,
    height: 80,
  },
  pressedRed: {
    height: '10%', 
    width: '10%', 
    margin: 5, 
    backgroundColor: 'red',
    flexDirection: "row",
    width: 80,
    height: 80,
  },
  unpressed: {
    height: '10%', 
    width: '10%', 
    margin: 5, 
    backgroundColor: 'powderblue',
    flexDirection: "row",
    width: 80,
    height: 80,
    // flex: {props}
  },
});


export default TTTButton;