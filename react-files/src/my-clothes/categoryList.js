import React from 'react';
import ClothingElement from './clothingElement';
import { Text, Grid } from '@chakra-ui/react';

const CategoryList = ({ categories }) => {
  let counter = 0;
  let output = []
  let categoryName = ['Top', 'Middlewear', 'Outerwear', 'Bottom', 'Footwear', 'Headwear']
  for (var i = 0; i < 6; i++) {
    // if (categories.length > 0) {
      let category = [];
      for (var j = 0; j < categories[i].length; j++) {
        category.push(
          <ClothingElement
            key={categories[i][j]}
            id={categories[i][j]}
            index_i={i}
            index_j={j}
          />
        )
        counter++
      }
      output.push(
        <div>
          <Text fontSize="3xl">{categoryName[i]}</Text>
          <Grid key={category.length} templateColumns="repeat(auto-fill, 190px)" mx='300px' justifyContent='center'>
            {category}
          </Grid>
        </div>
      )
      console.log('output: ', output)
    // }
  }
  return (
    output
  )
}

function sum(categories) {
  let counter = 0;
  for (var i = 0; i < categories.length; i++) {
    counter = counter + categories[i].length;
  }
  return counter;
}

export default CategoryList;