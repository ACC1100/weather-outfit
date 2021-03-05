import React, { useState, useEffect } from 'react'; ////
import ReactDOM from 'react-dom';
import {Text, ChakraProvider, theme, Button, VStack, StackDivider, Box, Grid} from '@chakra-ui/react';

import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from "@chakra-ui/react"

import { useDisclosure } from "@chakra-ui/react"

// function clothesText(text) {
//     return <Text fontSize="md">{text}</Text>
// }

// function addClothes() {
//     return (
//         <div>
//             {clothesText("hi")}
//             {clothesText("asd")}
//         </div>
//     )
// }

function AddClothes() {
    const [size, setSize] = React.useState("md")
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    const handleClick = (newSize) => {
      setSize(newSize)
      onOpen()
    }
  
    const sizes = ["xs", "sm", "md", "lg", "xl", "full"]
  
    return (
      <>
        {sizes.map((size) => (
          <Button
            onClick={() => handleClick(size)}
            key={size}
            m={4}
          >{`Open ${size} Drawer`}</Button>
        ))}
  
        <Drawer onClose={onClose} isOpen={isOpen} size={size}>
          <DrawerOverlay>
            <DrawerContent>
              <DrawerHeader>{`${size} drawer contents`}</DrawerHeader>
              <DrawerBody>
                {size === "full"
                  ? `You're trapped 😆 , refresh the page to leave or press 'Esc' key.`
                  : null}
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </>
    )
  }

export default AddClothes;