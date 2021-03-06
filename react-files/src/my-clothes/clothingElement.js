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

const ClothingElement = ({ id, index_i, index_j, clothingInfo }) => {
  const pictures = [top, middlewear, outerwear, bottom, footwear, headwear];
  return (
    <Box className='imageGrow' id={id} borderWidth='1px' height='auto' m='20px' textAlign='center'>
      <Center>
        <Image className='imagex' index_i={index_i} index_j={index_j}
          objectFit='contain' src={pictures[index_i]} alt='' bg={clothingInfo[id].colour} />
      </Center>
      <br/>
      <Text>{clothingInfo[id].type}</Text>
      <Text>{clothingInfo[id].colour}</Text>
      <br/>
      {/* <Image className='deleteButton' position='absolute' top='-15px' left='-10px' boxSize="35px" src={deleteSymbol} alt='' display='none' /> */}
    </Box>
  )
}

export default ClothingElement;