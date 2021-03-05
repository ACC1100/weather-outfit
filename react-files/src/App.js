import React, { useState, useEffect } from 'react'; ////

import {ChakraProvider, theme, Button} from '@chakra-ui/react';

import addClothes from "./add-clothes/add-clothes";
import navbar from "./navbar/navbar";

function App() {
  const [arg1, setArg1] = useState(5);
  const onButtonSubmit = () => {
    console.log('button clicked');
    fetch('/hello', {
      method: "POST",
      headers: {
        "content_type": "application/json",
      },
      body: JSON.stringify({
        arg1: arg1
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.result);
        setArg1(data.result);
      })
  }

  return (
    <ChakraProvider theme={theme}>
      <div>
        {arg1}
        <Button  onClick={onButtonSubmit}>
          Test
        </Button>
        {/* <addClothes/> */}
        {addClothes()}
      </div>
    </ChakraProvider>
  );
}

export default App;