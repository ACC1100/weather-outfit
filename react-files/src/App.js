import React, { useState, useEffect } from 'react'; ////

import {ChakraProvider, Button, VStack, StackDivider, Box, Grid} from '@chakra-ui/react';

import AddClothes from "./add-clothes/addClothes";
import MyClothes from "./my-clothes/myClothes";
import Gallery from "./gallery/gallery";
import Navbar from "./navbar/navbar";

import {theme} from '@chakra-ui/react';
// import theme2 from "./theme";

function getContent(page) {
  if (page === "") {
    // return (
    //   <AddClothes/>
    // )
  } else if (page === "my-clothes") {
    return (
      <>
        {/* <AddClothes/> */}
        <MyClothes/>
      </> 
    )
  } else if (page === "gallery") {
    return (
      <Gallery/>
  )
  }
}

function App() {
  const [arg1, setArg1] = useState(5);
  const [page, setPage] = useState('my-clothes');

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

  return (
    // <ChakraProvider theme={theme2}>
    <ChakraProvider theme={theme}>
      <Box bgGradient="linear(to-l, #ffffff, #FFFFE0)">
      <Navbar page={page} testf={setPage}/>
        {getContent(page)}
      </Box>
    </ChakraProvider>
  )
}

export default App;