import React, { useState, useEffect } from 'react'; ////

import {ChakraProvider, theme, Button, VStack, StackDivider, Box} from '@chakra-ui/react';

import addClothes from "./add-clothes/add-clothes";
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

  const myClothesPage = () => {
    setPage("myClothes");
  }

  if (page === "") {
    return (
      <ChakraProvider theme={theme}>
        {/* {navbar(myClothesPage)} */}
        <Navbar testf={myClothesPage}/>
      <div>
        {arg1}
        <Button onClick={myClothesPage}>
          Test
        </Button>
        {/* <addClothes/> */}
        {addClothes()}
      </div>
      </ChakraProvider>
    )
  } else if (page === "myClothes") {
    return (
      <ChakraProvider theme={theme}>
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          <Box h="40px" bg="yellow.200">
            1
          </Box>
          <Box h="40px" bg="tomato">
            2
          </Box>
          <Box h="40px" bg="pink.100">
            3
          </Box>
        </VStack>
      </ChakraProvider>
        
    )
  }

}

export default App;