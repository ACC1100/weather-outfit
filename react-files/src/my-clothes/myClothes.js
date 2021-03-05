import React from 'react';
import ReactDOM from 'react-dom';
import { Text, ChakraProvider, theme, Button, VStack, StackDivider, Box, Grid, Image} from '@chakra-ui/react';
import shirt from './shirt.png';

function MyClothes() {
    return (
      <div>
        <VStack
          spacing={10}
          align="stretch"
        >
        <Box h="40px" bg="yellow.200">
            Category 1
          <Grid gridRowStart="2" gridRowEnd="4" gap={6}>
            <Box w="100%" h="10" bg="blue.500">
              <Image boxSize="150px" objectFit="cover" src={shirt} alt=''/>
            </Box>
            <Box w="100%" h="10" bg="blue.500">
              <Image boxSize="150px" objectFit="cover" src={shirt} alt=''/>
            </Box>
            <Box w="100%" h="10" bg="blue.500">
              <Image boxSize="150px" objectFit="cover" src={shirt} alt=''/>
            </Box>
            <Box w="100%" h="10" bg="blue.500">
              <Image boxSize="150px" objectFit="cover" src={shirt} alt=''/>
            </Box>
            <Box w="100%" h="10" bg="blue.500">
              <Image boxSize="150px" objectFit="cover" src={shirt} alt=''/>
            </Box>
            <Box w="100%" h="10" bg="blue.500">
              <Image boxSize="150px" objectFit="cover" src={shirt} alt=''/>
            </Box>
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