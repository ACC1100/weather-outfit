import React from 'react';
import { Text, ChakraProvider, theme, Button, VStack, Flex, Box, Grid, Image, Center } from '@chakra-ui/react';
import shirt from './shirt.png';

const ClothingElement = ({ id, index_i, index_j}) => {
  return (
    <Box id={id} w="160px" h="160px" borderWidth='2px' mx='20px' my='10px'>
      <Center>
        <Image index_i={index_i} index_j={index_j}
          onMouseOver={(event) => {
            // console.log('here', i, j, event.target.getAttribute('image_i'), event.target.getAttribute('image_j'));
            console.log('here')
          }}
          onMouseOut={() => {
            console.log('left');
          }}
          boxSize="150px" objectFit="contain" src={shirt} alt='' />
      </Center>
    </Box>
  )
}

export default ClothingElement;