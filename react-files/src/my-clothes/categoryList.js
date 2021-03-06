import React from 'react';
import ClothingElement from './clothingElement';
import { Text, ChakraProvider, theme, Button, VStack, Flex, Box, Grid, Image, Center } from '@chakra-ui/react';

const CategoryList = ({ categories }) => {
  let counter = 0;
  let output = []
  var i;
  for (i = 0; i < 6; i++) {
    var j;
    let category = [];
    for (j = 0; j < categories[i].length; j++) {
      category.push(
        <ClothingElement
          id={counter}
          index_i={i}
          index_j={j}
        />
      )
      counter++
    }
    output.push(
      <div>
        <Text fontSize="3xl">Top</Text>
        <Grid templateColumns="repeat(7, 180px)" px="50px" pt='20px' justifyContent='center'>
          {category}
        </Grid>
      </div>
    )
  }
  
  return (
    <div>
      {output}
    </div>
  )
}

export default CategoryList;