import React, { useEffect, useState } from 'react';
import { Text, ChakraProvider, theme, Button, VStack, Flex, Box, Grid, Image, Center} from '@chakra-ui/react';
import shirt from './shirt.png';
import CategoryList from './categoryList';

function MyClothes() {
  const [categories, setCategories] = useState([[],[],[],[],[],[]]);

  useEffect(() => {
    fetchClothing();
    // console.log('2nd :', output1);
    // let output2 = createClothingElement(output1);
    // let output3 = generateClothing(output2);
  }, []);

  function fetchClothing() {
    let output = [];
    fetch('/hello', {
      method: "POST",
      headers: {
        "content_type": "application/json",
      }
    }).then(response => response.json())
      .then(data => {
        console.log('data: ', data.result);
        var i;
        for (i = 0; i < 6; i++) {
          output.push(data.result[i]);
          // categories.push(data.result[i]);
        }
        setCategories('returning ', data.result);
        // return data.result
        // console.log('categories: ', categories);
      })
    // console.log('op', output)
    // return output
  }

  // const createClothingElement = async () => {
  //   const clothing = await fetchClothing();
  //   console.log('never here ');
  //   let output = [];
  //   var i;
  //   for (i = 0; i < 6; i++) {
  //     var j;
  //     for (j = 0; j < clothing[i].length; j++) {
  //       output.push(
          
  //       )
  //     }
  //   }
  //   return output
  // }

  // function clicked() {
  //   console.log(categories);
  // }

  // const generateClothing = () => {
  //   let clothingElements = createClothingElement();
  //   let output = [];
  //   var i;
  //   for (i = 0; i < 6; i++) {
  //     output.push(
  //       <div>
  //         <Text fontSize="3xl">Top</Text>
  //         <Grid templateColumns="repeat(7, 180px)" px="50px" pt='20px' justifyContent='center'>
  //           {clothingElements[i]}
  //         </Grid>
  //       </div>
  //     )
  //   }
  //   return (
  //     <div>
  //       <VStack spacing={10} align="stretch">
  //         {output}
  //       </VStack>
  //     </div>
  //   )
  // }
  // let clothingElementMade = createClothingElement(fetchedClothing);
  // console.log('2', clothingElementMade);
  // let returnOutput = generateClothing(clothingElementMade);
  // console.log('3', returnOutput);
  // const returnedClothes = 
  return (
    <div>
      {/* <Button onClick={generateClothing}>
        Click Me
      </Button>
      Test */}
      <CategoryList categories={categories} />
    </div>
  )
}

export default MyClothes;