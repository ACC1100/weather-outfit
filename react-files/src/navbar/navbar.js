import ReactDOM from 'react-dom';
import {HStack, Button, Box, Text} from "@chakra-ui/react"

import React, { useState, useEffect } from 'react'; ////

// function getButton(location) {
//   const [page, setPage] = useState('');

// }

function Navbar(props) {
    return (
        <HStack spacing="24px" padding="10px" bg="black">
            <Text fontSize="3xl">Test title</Text>
            <Box w="50%"/>
            <Button isDisabled={props.page===''} onClick={() => {props.testf("")}}>
                Generate outfits
            </Button>
            <Button isDisabled={props.page==='my-clothes'} onClick={() => {props.testf("my-clothes")}}>
                My clothes
            </Button>
        </HStack>
    )
}

export default Navbar;