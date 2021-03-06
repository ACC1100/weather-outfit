import React from 'react';
import { Text, Box, Image, Center } from '@chakra-ui/react';
import './myClothes.css';

import pic0 from '../pictures/beanie.png';
import pic1 from '../pictures/blouse.png';
import pic2 from '../pictures/boots.png';
import pic3 from '../pictures/cap.png';
import pic4 from '../pictures/chino.png';
import pic5 from '../pictures/coat.png';
import pic6 from '../pictures/crop top.png';
import pic7 from '../pictures/heels.png';
import pic8 from '../pictures/hoodie.png';
import pic9 from '../pictures/jacket.png';
import pic10 from '../pictures/jeans.png';
import pic11 from '../pictures/long sleeve shirt.png';    
import pic12 from '../pictures/long sleeve t-shirt.png';  
import pic13 from '../pictures/other hat.png';
import pic14 from '../pictures/pants.png';
import pic15 from '../pictures/raincoat.png';
import pic16 from '../pictures/short sleeve shirt.png';   
import pic17 from '../pictures/short sleeve t-shirt.png'; 
import pic18 from '../pictures/shorts.png';
import pic19 from '../pictures/skirt.png';
import pic20 from '../pictures/sneaker.png';
import pic21 from '../pictures/sweater.png';
import pic22 from '../pictures/tights.png';


const ClothingElement2 = (props) => {
  // const images = importAll(require.context('./pictures', false, '/\.png/'));
  const images = {'beanie': pic0, 'blouse': pic1, 'boots': pic2, 'cap': pic3, 'chino': pic4, 'coat': pic5, 'crop top': pic6, 'heels': pic7, 'hoodie': pic8, 'jacket': pic9, 'jeans': pic10, 'long sleeve shirt': pic11, 'long sleeve t-shirt': pic12, 'other hat': pic13, 'pants': pic14, 'raincoat': pic15, 'short sleeve shirt': pic16, 'short sleeve t-shirt': pic17, 'shorts': pic18, 'skirt': pic19, 'sneaker': pic20, 'sweater': 
  pic21, 'tights': pic22, }

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
            objectFit='contain' src={images[type]} alt='' bg={colour} />
        </Center>
        <br/>
        <Text>{type}</Text>
        <Text>{colour}</Text>
        <br/>
      </Box>
    )
}

export default ClothingElement2;