import React from 'react';
import { Text, Box, Image, Center } from '@chakra-ui/react';
import top from './pictures/top.png';
import middlewear from './pictures/middlewear.png';
import outerwear from './pictures/outerwear.png';
import bottom from './pictures/bottom.png';
import footwear from './pictures/shoe.png';
import headwear from './pictures/headwear.png';
import deleteSymbol from './pictures/delete.png';
import './myClothes.css';

const ClothingElement = ({ id, index_i, index_j }) => {
  const pictures = [top, middlewear, outerwear, bottom, footwear, headwear];
  return (
    <Box className='imageGrow' id={id} borderWidth='1px' height='auto' borderRadius='20px' m='20px' textAlign='center'>
      <Center>
        <Image className='imagex' index_i={index_i} index_j={index_j} borderRadius='20px'  pt='10px'
          objectFit='contain' boxSize='150px' src={pictures[index_i]} alt='' />
      </Center>
      <br/>
      <Text>Short-sleeve T-shirt</Text>
      <Text>Light blue</Text>
      <br/>
      <Image className='deleteButton' position='absolute' top='-15px' left='-10px' boxSize="35px" src={deleteSymbol} alt='' display='none' />
    </Box>
    // <Box className='imageGrow' id={id} borderWidth='1px' borderRadius='20px' m='20px' p='10'>
    //   <Center>
    //     <Image className='imagex' index_i={index_i} index_j={index_j} borderRadius='20px'
    //       boxSize="150px" objectFit="contain" src={shirt} alt='' />
    //   </Center>
    //   <Text>{[id]}</Text>
    //   <Image className='deleteButton' position='absolute' top='-15px' left='-10px' boxSize="35px" src={deleteSymbol} alt='' display='none' />
    // </Box>
  )
}

export default ClothingElement;