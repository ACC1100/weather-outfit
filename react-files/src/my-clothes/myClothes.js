import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Text, ChakraProvider, theme, Button, VStack, Flex, Box, Grid, Image, Center} from '@chakra-ui/react';
import shirt from './shirt.png';
import deleteSymbol from './delete.png';


function showDelete() {
  console.log('test');
}

function hideDelete() {
  console.log('hide');
}

function MyClothes() {
  const [index, setIndex] = useState(0);
  const [index1, setIndex1] = useState(0);
  const [deleteShown, setDeleteShown] = useState(false);

  const readCategories = () => {
    fetch('/hello', {
      method: "POST",
      headers: {
        "content_type": "application/json",
      },
      body: JSON.stringify({
        arg1: arg1
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.result);
        setArg1(data.result);
      })
  }

  const updateIndex = () => {
    setIndex(index + 1);
    setIndex1(index1 + 1);
  }

  const returnBoxes = () => {
    let output = [];
    var i;
    for (i = 0; i < 10; i++) {
      output.push(
        <Box w="160px" h="160px" borderWidth='2px' mx='20px' my='10px'>
          <Center>
            <Image
              key={index}
              onMouseEnter={() => {
                console.log('here');
                setDeleteShown(true);
              }}
              onMouseLeave={() => {
                console.log('left');
                setDeleteShown(false);
              }}
              boxSize="150px" objectFit="contain" src={shirt} alt='' />
          </Center>
          {deleteShown || (
            <Image key={index1} onMouseEnter={() => setDeleteShown(true)} position='relative' top='-170px' left='-10px' boxSize="35px" objectFit="contain" src={deleteSymbol} alt='' display='none' />
          )}  
        </Box>
      )
      updateIndex();
    }
    return output
  }

  // useEffect(() => {
    
  // }, [])

  return (
    <div>
      <VStack
        spacing={10}
        align="stretch"
      >
        <div>
          <Text fontSize="3xl">Top</Text>
          <Grid templateColumns="repeat(7, 180px)" px="50px" pt='20px' justifyContent='center'>
              {returnBoxes()}
          </Grid>
        </div>
        <div>
          <Text fontSize="3xl">Middlewear</Text>
          <Grid templateColumns="repeat(7, 180px)" px="50px" pt='20px' justifyContent='center'>
              {returnBoxes()}
          </Grid>
        </div>
        <div>
          <Text fontSize="3xl">Outer</Text>
          <Grid templateColumns="repeat(7, 180px)" px="50px" pt='20px' justifyContent='center'>
              {returnBoxes()}
          </Grid>
        </div>
        <div>
          <Text fontSize="3xl">Bottom</Text>
          <Grid templateColumns="repeat(7, 180px)" px="50px" pt='20px' justifyContent='center'>
              {returnBoxes()}
          </Grid>
        </div>
        <div>
          <Text fontSize="3xl">Footwear</Text>
          <Grid templateColumns="repeat(7, 180px)" px="50px" pt='20px' justifyContent='center'>
              {returnBoxes()}
          </Grid>
        </div>
        <div>
          <Text fontSize="3xl">Headwear</Text>
          <Grid templateColumns="repeat(7, 180px)" px="50px" pt='20px' justifyContent='center'>
              {returnBoxes()}
          </Grid>
        </div>
      </VStack>
    </div>
  )
}

export default MyClothes;