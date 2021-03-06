import React, { useState, useEffect } from 'react'; ////

import {ChakraProvider, theme, Button, VStack, StackDivider, Box, Grid} from '@chakra-ui/react';

import AddClothes from "./add-clothes/addClothes";
import MyClothes from "./my-clothes/myClothes";
import Navbar from "./navbar/navbar";

function getContent(page) {
  if (page === "") {
    return (
        <AddClothes/>
    )
  } else if (page === "my-clothes") {
    return (
        <MyClothes/>
    )
  } else if (page === "gallery") {
    // return (
        // <MyClothes/>
  // )
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
    <ChakraProvider theme={theme}>
      <Navbar page={page} testf={setPage}/>
      {getContent(page)}
    </ChakraProvider>
  )
}

export default App;