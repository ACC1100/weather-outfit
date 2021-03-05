import React, { useState, useEffect } from 'react'; ////
import addClothes from "./add-clothes/add-clothes";
import {ChakraProvider, theme,} from '@chakra-ui/react';

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
        <button onClick={onButtonSubmit}>
          Test
        </button>
        {/* <addClothes/> */}
        {addClothes()}
      </div>
    </ChakraProvider>
  );
}

export default App;