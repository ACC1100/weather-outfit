import React from 'react';
import { Text, Box, Image, Center } from '@chakra-ui/react';
import './myClothes.css';
import top from '../my-clothes/pictures/top.png'

// function importAll(r) {
//   let images = {};
//   r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
//   return images;
// }



const ClothingElement2 = (props) => {
  // const images = importAll(require.context('./pictures', false, '/\.png/'));

  var type;
  var colour;

  if (props.inputType == "index") {
    // return (
    //   <Box key={props.clothingJSON.type} borderWidth='1px' height='auto' m='20px' textAlign='center'>
    //     <Center>
    //       <Image className='imagex'
    //         // objectFit='contain' src={"../pictures/" + props.clothingJSON.type} alt='' bg={props.clothingJSON.colour} />
    //         objectFit='contain' src={top} alt='' bg={props.masterList.colours[props.clothingJSON.colour]} />
    //     </Center>
    //     <br/>
    //     <Text>{props.masterList.types[props.clothingJSON.type].name}</Text>
    //     <Text>{props.masterList.colours[props.clothingJSON.colour]}</Text>
    //     <br/>
    //   </Box>
    // )

    type = props.masterList.types[props.clothingJSON.type].name;
    colour = props.masterList.colours[props.clothingJSON.colour];
  } else if (props.inputType == "string") {
    // return <div></div>
    // return (
    //   <Box key={props.clothingJSON.type} borderWidth='1px' height='auto' m='20px' textAlign='center'>
    //     <Center>
    //       <Image className='imagex'
    //         // objectFit='contain' src={"../pictures/" + props.clothingJSON.type} alt='' bg={props.clothingJSON.colour} />
    //         objectFit='contain' src={top} alt='' bg={} />
    //     </Center>
    //     <br/>
    //     <Text>{props.masterList.types[props.clothingJSON.type].name}</Text>
    //     <Text>{props.masterList.colours[props.clothingJSON.colour]}</Text>
    //     <br/>
    //   </Box>
    // )
    type = props.clothingJSON.type;
    colour = props.clothingJSON.colour;
  }

  return (
      <Box key={type} borderWidth='1px' height='auto' m='20px' textAlign='center'>
        <Center>
          <Image className='imagex'
            // objectFit='contain' src={"../pictures/" + props.clothingJSON.type} alt='' bg={props.clothingJSON.colour} />
            // objectFit='contain' src={images[type + ".png"]} alt='' bg={colour} />
            objectFit='contain' src={top} alt='' bg={colour} />
        </Center>
        <br/>
        <Text>{type}</Text>
        <Text>{colour}</Text>
        <br/>
      </Box>
    )
}

export default ClothingElement2;