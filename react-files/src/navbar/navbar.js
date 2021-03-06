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
            borderColor="black"
            borderRadius="5px"
        >
            {/* <Text fontSize="3xl">Test title</Text> */}
            <Heading as="h2" size="xl" 
                bgGradient="linear(to-l, #7928CA, #FF0080)" 
                bgClip="text" 
                borderWidth="2px"
                borderColor="black"
                p="5px"
                borderRadius="5px"
                >
                    Sweater Weather
            </Heading>


            <Box w="50%"/>
            {/* <Button onClick={() => {props.testf("")}}>
                temp add
            </Button> */}


            <Button isDisabled={props.page==='gallery'} onClick={() => {props.testf("gallery")}}>
                Generate outfits
            </Button>
            <Button isDisabled={props.page==='my-clothes'} onClick={() => {props.testf("my-clothes")}}>
                My clothes
            </Button>
        </HStack>
    )
}

export default Navbar;