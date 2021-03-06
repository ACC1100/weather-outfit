import ReactDOM from 'react-dom';
import {HStack, Button, Box, Text, Heading} from "@chakra-ui/react"

import React, { useState, useEffect } from 'react'; ////

// function getButton(location) {
//   const [page, setPage] = useState('');

// }

function Navbar(props) {
    var navBG = null;
    var textBG = null

    return (
        <HStack spacing="24px" padding="10px" bg="black" justify="center" bgGradient="linear(to-r, #a5b7bd, #87ceeb, yellow.400)"
            borderWidth="2px"
            borderColor="gray.500"
            borderRadius="5px"
        >
            {/* <Text fontSize="3xl">Test title</Text> */}
            {/* <Box bg="white" borderRadius="5px"> */}
            <Heading as="h2" size="xl" 
                bgGradient="linear(to-l, #7928CA, #FF0080)" 
                bgClip="text" 
                // borderWidth="2px"
                // borderColor="gray.500"
                p="5px"
                px="10px"
                borderRadius="5px"
                >
                    Sweater Weather
            </Heading>
            {/* </Box> */}


            <Box w="50%"/>
            {/* <Button onClick={() => {props.testf("")}}>
                temp add
            </Button> */}


            <Button isDisabled={props.page==='gallery'} onClick={() => {props.testf("gallery")}}
            bg="white"
            color="black"
            borderWidth="1px"
            borderColor="gray.500"
            borderRadius="5px"
            >
                Generate outfits
            </Button>
            <Button isDisabled={props.page==='my-clothes'} onClick={() => {props.testf("my-clothes")}}
            bg="white"
            color="black"
            borderWidth="1px"
            borderColor="gray.500"
            borderRadius="5px"
            >
                My clothes
            </Button>
        </HStack>
    )
}

export default Navbar;