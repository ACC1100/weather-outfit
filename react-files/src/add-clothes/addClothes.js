import React from 'react';
import ReactDOM from 'react-dom';
import {Text, ChakraProvider, theme, Button, VStack, StackDivider, Box, Grid} from '@chakra-ui/react';

function clothesText(text) {
    return <Text fontSize="md">{text}</Text>
}

function addClothes() {
    return (
        <div>
            {clothesText("hi")}
            {clothesText("asd")}
        </div>
    )
}

export default addClothes;