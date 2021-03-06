import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Text, ChakraProvider, theme, Button, VStack, Flex, Box, Grid, Image, Center} from '@chakra-ui/react';
import shirt from './shirt.png';
import deleteSymbol from './delete.png';
const datajson = require('./test2.json');

function MyClothes() {
  const [categories, setCategories] = useState([]);
  const [clothing, setClothing] = useState([]);

  useEffect(() => {
    fetchClothing();
  }, []);

  const returnBoxes = () => {
    let counter = 0;
    let output = [];
    var i;
    for (i = 0; i < categories.length; i++) {
      let categoryboxes = [];
      var j;
      for (j = 0; j < categories[i].length; j++) {
        //array of images
        categoryboxes.push(
          <Box boxid={counter} w="160px" h="160px" borderWidth='2px' mx='20px' my='10px'>
            <Center>
              <Image image_i={i} image_j={j} imageid={counter}
                onMouseOver={(event) => {
                  console.log('here', i, j, event.target.getAttribute('image_i'), event.target.getAttribute('image_j'));
                  // setIndex(event.target.getAttribute('imageid'));
                  // setDeleteShown([event.target.getAttribute('image_i'), event.target.getAttribute('image_j')]);
                }}
                onMouseOut={() => {
                  console.log('left');
                  // setDeleteShown(null);
                }}
                boxSize="150px" objectFit="contain" src={shirt} alt='' />
            </Center>
            {/* <Image id={counter} onMouseEnter={(event) => {
              console.log('testest', event.target.getAttribute('deleteid'));
            }} position='relative' top='-170px' left='-10px' boxSize="35px" objectFit="contain" src={deleteSymbol} alt='' /> */}
          </Box>
        )
        counter++
      }
      output.push(categoryboxes);
    }
    return output
  }

  const fetchClothing = () => {
    fetch('/hello', {
      method: "POST",
      headers: {
        "content_type": "application/json",
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('data: ', data.result);
        var i;
        for (i = 0; i < 6; i++) {
          categories.push(data.result[i])
        }
        // setCategories(['test']);
        // setCategories(data.result);
        console.log('categories: ', categories);
      })
  }

  const generateClothing = () => {
    if (typeof categories === []) {
      fetchClothing();
      console.log('ever?');
    }
    clothing.push(returnBoxes());
    console.log('gen cats ', categories);
    console.log('gen clothes ', clothing);
    return (
      <div>
        <VStack
          spacing={10}
          align="stretch"
        >
          <div>
            <Text fontSize="3xl">Top</Text>
            <Grid templateColumns="repeat(7, 180px)" px="50px" pt='20px' justifyContent='center'>
                {clothing[0]}
            </Grid>
          </div>
          <div>
            <Text fontSize="3xl">Middlewear</Text>
            <Grid templateColumns="repeat(7, 180px)" px="50px" pt='20px' justifyContent='center'>
                {clothing[1]}
            </Grid>
          </div>
          <div>
            <Text fontSize="3xl">Outer</Text>
            <Grid templateColumns="repeat(7, 180px)" px="50px" pt='20px' justifyContent='center'>
                {clothing[2]}
            </Grid>
          </div>
          <div>
            <Text fontSize="3xl">Bottom</Text>
            <Grid templateColumns="repeat(7, 180px)" px="50px" pt='20px' justifyContent='center'>
                {clothing[3]}
            </Grid>
          </div>
          <div>
            <Text fontSize="3xl">Footwear</Text>
            <Grid templateColumns="repeat(7, 180px)" px="50px" pt='20px' justifyContent='center'>
                {clothing[4]}
            </Grid>
          </div>
          <div>
            <Text fontSize="3xl">Headwear</Text>
            <Grid templateColumns="repeat(7, 180px)" px="50px" pt='20px' justifyContent='center'>
                {clothing[5]}
            </Grid>
          </div>
        </VStack>
      </div>
    )
  }

  // const deleteToRender = (index) => {
  //   console.log(index);
  //   return (
  //     <Box boxid={index} w="160px" h="160px" borderWidth='2px' mx='20px' my='10px'>
  //       <Center>
  //         <Image imageid={index}
  //           onMouseOver={(event) => {
  //             console.log('here', event.target.getAttribute('imageid'));
  //             setIndex(event.target.getAttribute('imageid'));
  //             setDeleteShown([event.target.getAttribute('image_i'), event.target.getAttribute('image_j')]);
  //             renderFunction(index);
  //           }}
  //           onMouseOut={() => {
  //             console.log('left');
  //             setDeleteShown(null);
  //           }}
  //           boxSize="150px" objectFit="contain" src={shirt} alt='' />
  //       </Center>
        // <Image id={index} onMouseEnter={(event) => {
        //   console.log('testest', event.target.getAttribute('deleteid'));
        // }} position='relative' top='-170px' left='-10px' boxSize="35px" objectFit="contain" src={deleteSymbol} alt='' />
  //     </Box>
  //   )
  // }

  return (
    generateClothing()
  );
}

export default MyClothes;