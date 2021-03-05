import React from 'react';
import ReactDOM from 'react-dom';
import {HStack, Button, Box, Text} from "@chakra-ui/react"

function navbar() {
    return (
        <HStack spacing="24px" padding="10px" bg="black">
            <Text >Test</Text>
            <Box w="50%"/>
            <Button>
            asd
            </Button>
            <Button>
            asd
            </Button>
        </HStack>
    )
}

export default navbar;