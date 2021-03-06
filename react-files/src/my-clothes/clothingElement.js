import React from 'react';
import { Text, ChakraProvider, theme, Button, VStack, Flex, Box, Grid, Image, Center } from '@chakra-ui/react';
import shirt from './shirt.png';
import deleteSymbol from './delete.png';
import './myClothes.css';

const ClothingElement = ({ id, index_i, index_j}) => {
  return (
    <Box className='imageGrow' id={id} borderWidth='1px' borderRadius='20px' m='20px'
      onMouseOver={(event) => {
        console.log('here', index_i, index_j)
      }}
      onMouseOut={(event) => {
        console.log('left', index_i, index_j)
      }}
    >
      <Center>
        <Image className='imagex' index_i={index_i} index_j={index_j} borderRadius='20px' demo
          onMouseOver={(event) => {
            // console.log('here', i, j, event.target.getAttribute('image_i'), event.target.getAttribute('image_j'));
            console.log('here', index_i, index_j)
          }}
          onMouseOut={() => {
            console.log('left');
          }}
          boxSize="150px" objectFit="contain" src={shirt} alt='' />
      </Center>
      <Image className='deleteButton' position='absolute' top='-15px' left='-10px' boxSize="35px" src={deleteSymbol} alt='' display='none' />
    </Box>
  )
}

export default ClothingElement;