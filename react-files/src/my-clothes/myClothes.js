import React, { useEffect, useState } from 'react';
import { Text, ChakraProvider, theme, Button, VStack, Flex, Box, Grid, Image, Center, useUpdateEffect} from '@chakra-ui/react';
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
        setCategories(data.result);
        // return data.result
        setCategories([[2, 4, 5, 14, 15, 24, 25, 35, 34, 45], [0, 3, 6], [8, 13], [1, 7], [11, 12], [9, 10]])
      })
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

  function showdata() {
    console.log(fetchClothing());
    console.log('cats: ', categories);
  }

  function deleteElement(id) {
    console.log('old cat', categories)
    console.log('id ', id)
    
    let deletedValue = categories[id[0]].splice(id[1], 1)
    console.log('dv', deletedValue)
    // categories[id[0]] = sublist;
    // console.log('sublist', sublist);
    console.log('new cat', categories);
    setCategories(categories);
  }


  return !categories.length ?
      <h1>Loading!!</h1> :
    (
    <div>
      <Button onClick={() => {
        showdata();
      }}>
        Click Me
      </Button>
      Test
      <CategoryList key={sum(categories)} categories={categories} deleteid={deleteElement}/>
    </div>
  ) 
}

function sum(categories) {
  let counter = 0;
  for (var i = 0; i < categories.length; i++) {
    counter = counter + categories[i].length;
  }
  return counter;
}

export default MyClothes;