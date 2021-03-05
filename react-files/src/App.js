import React, { useState, useEffect } from 'react'; ////

import {ChakraProvider, theme, Button, VStack, StackDivider, Box, Grid} from '@chakra-ui/react';

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


  if (page === "") {
    return (
      <ChakraProvider theme={theme}>
        <Navbar testf={setPage}/>
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
        <VStack
          spacing={10}
          align="stretch"
        >
          <Box h="40px" bg="yellow.200">
            Category 1
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
              <Box w="100%" h="10" bg="blue.500" />
              <Box w="100%" h="10" bg="blue.500" />
              <Box w="100%" h="10" bg="blue.500" />
              <Box w="100%" h="10" bg="blue.500" />
              <Box w="100%" h="10" bg="blue.500" />
            </Grid>
          </Box>
          <Box h="40px" bg="tomato">
            Category 2
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
              <Box w="100%" h="10" bg="blue.500" />
              <Box w="100%" h="10" bg="blue.500" />
              <Box w="100%" h="10" bg="blue.500" />
              <Box w="100%" h="10" bg="blue.500" />
              <Box w="100%" h="10" bg="blue.500" />
            </Grid>
          </Box>
          <Box h="40px" bg="pink.100">
            Category 3
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
              <Box w="100%" h="10" bg="blue.500" />
              <Box w="100%" h="10" bg="blue.500" />
              <Box w="100%" h="10" bg="blue.500" />
              <Box w="100%" h="10" bg="blue.500" />
              <Box w="100%" h="10" bg="blue.500" />
            </Grid>
          </Box>
        </VStack>
      </ChakraProvider>
        
    )
  }

}

export default App;