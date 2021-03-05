import React, { useState, useEffect } from 'react'; ////

import {ChakraProvider, theme, Button, VStack, StackDivider, Box, Grid} from '@chakra-ui/react';

import addClothes from "./add-clothes/addClothes";
import MyClothes from "./my-clothes/myClothes";
import Navbar from "./navbar/navbar";

function App() {
  const [arg1, setArg1] = useState(5);
  const [page, setPage] = useState('');

  // const onButtonSubmit = () => {
  //   console.log('button clicked');
  //   fetch('/hello', {
  //     method: "POST",
  //     headers: {
  //       "content_type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       arg1: arg1
  //     })
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data.result);
  //       setArg1(data.result);
  //     })
  // }


  if (page === "") {
    return (
      <ChakraProvider theme={theme}>
        <Navbar page={page} testf={setPage}/>

          
          <div>
            {arg1}
            <Button onClick={() => {setPage("my-clothes")}}>
              Test
            </Button>
            {/* <addClothes/> */}
            {addClothes()}
          </div>

      </ChakraProvider>
    )
  } else if (page === "my-clothes") {
    return (
      <ChakraProvider theme={theme}>
        <Navbar page={page} testf={setPage}/>
        <MyClothes/>
      </ChakraProvider>
        
    )
  }

}

export default App;