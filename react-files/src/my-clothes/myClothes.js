import React from 'react';
import ReactDOM from 'react-dom';
import {Text, ChakraProvider, theme, Button, VStack, StackDivider, Box, Grid} from '@chakra-ui/react';

function MyClothes() {
    return (
      <div>
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
      </div>
    )
}

export default MyClothes;