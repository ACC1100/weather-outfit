import React from 'react';
import { Text, Box, Image, Center } from '@chakra-ui/react';
import './myClothes.css';



const ClothingElement2 = (clothingJSON) => {
  return (
    <Box className='imageGrow' key={clothingJSON.type} borderWidth='1px' height='auto' m='20px' textAlign='center'>
      <Center>
        <Image className='imagex'
          objectFit='contain' src={clothingJSON.index} alt='' bg={clothingJSON.colour} />
      </Center>
      <br/>
      <Text>{clothingJSON.type}</Text>
      <Text>{clothingJSON.colour}</Text>
      <br/>
    </Box>
  )
}

export default ClothingElement2;