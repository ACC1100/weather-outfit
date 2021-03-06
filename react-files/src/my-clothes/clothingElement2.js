import React from 'react';
import { Text, Box, Image, Center } from '@chakra-ui/react';
import './myClothes.css';
import top from '../my-clothes/pictures/top.png'

const ClothingElement2 = (props) => {
  return (
    <Box key={props.clothingJSON.type} borderWidth='1px' height='auto' m='20px' textAlign='center'>
      <Center>
        <Image className='imagex'
          // objectFit='contain' src={"../pictures/" + props.clothingJSON.type} alt='' bg={props.clothingJSON.colour} />
          objectFit='contain' src={top} alt='' bg={props.masterList.colours[props.clothingJSON.colour]} />
      </Center>
      <br/>
      <Text>{props.masterList.types[props.clothingJSON.type].name}</Text>
      <Text>{props.masterList.colours[props.clothingJSON.colour]}</Text>
      <br/>
    </Box>
  )
}

export default ClothingElement2;