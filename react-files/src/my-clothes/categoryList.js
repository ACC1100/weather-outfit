import React from 'react';
import ClothingElement from './clothingElement';
import { Text, ChakraProvider, theme, Button, VStack, Flex, Box, Grid, Image, Center } from '@chakra-ui/react';

const CategoryList = ({ categories, deleteid }) => {
  let counter = 0;
  let output = []
  var i;
  for (i = 0; i < 6; i++) {
    if (categories.length > 0) {
      var j;
      let category = [];
      for (j = 0; j < categories[i].length; j++) {
        category.push(
          <ClothingElement
            key={categories[i][j]}
            id={categories[i][j]}
            index_i={i}
            index_j={j}
            deleteid={deleteid}
          />
        )
        counter++
      }
      output.push(
        <div>
          <Text fontSize="3xl">Top</Text>
          <Grid templateColumns="repeat(7, auto)" mx='150px' justifyContent='center'>
            {category}
          </Grid>
        </div>
      )
    }
  }
  // return (
  //   <div>
  //     {
  //       categories.map((cat, index) => {
  //         return (
  //           <div>
  //             <Grid templateColumns="repeat(7, auto)" mx='150px' justifyContent='center'>
  //               {
  //                 cat.map((clothing, clothing_index) => {
  //                   return (
  //                     <ClothingElement
  //                       id={categories[index][clothing_index]}
  //                       index_i={index}
  //                       index_j={clothing_index}
  //                       deleteid={deleteid}
  //                     />
  //                   )
  //                 })
  //               }
  //             </Grid>
  //           </div>
  //         )
  //       })
  //     }
  //   </div>
  // )
  // return (
  //   <div>
  //     {
  //       categories.map((cat, index) => {
  //         <div>
  //           text22222
  //         </div>
  //       })
  //     }
  //   </div>
  // )
  return (
    <div>
      {output}
    </div>
  )
}

export default CategoryList;