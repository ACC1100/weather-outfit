import React, { useEffect, useState } from 'react';
import ClothingElement from './clothingElement';
import ClothingElement2 from './clothingElement2';

import { Text, Grid, Box, Heading} from '@chakra-ui/react';

// const CategoryList = ({ categories, clothingInfo }) => {
function CategoryList ({clothingInfo}) {
  ///////
  const [masterList, setMasterList] = useState(null);
  function getMasterList () {
    fetch('/masterlist', {
      method: "POST",
      headers: {
        "content_type": "application/json",
      }
    }).then(response => response.json())
      .then(data => {
        console.log('read data: ');
        setMasterList(data.result);
        // console.log(formData);
      })
  }
  useEffect(() => {
    getMasterList();
    console.log('got master list')
  }, []);
  ///////

  function getOutput () {
    console.log(clothingInfo)

    let output = [];
    for (var i = 0; i < masterList.categories.length; i++) {
        // console.log('here')
        // console.log(clothingInfo.length)
      // if (categories.length > 0) {
        let category = [];
        // for (var j = 0; j < categories[i].length; j++) {
        for (var j = 0; j < clothingInfo.length; j++) {
          if (clothingInfo[j].category == masterList.categories[i]) {
            category.push(
              // <ClothingElement
              //   key={categories[i][j]}
              //   id={categories[i][j]}
              //   clothingInfo={clothingInfo}
              //   index_i={i}
              //   index_j={j}
              // />
              <ClothingElement2 masterList={masterList} clothingJSON={clothingInfo[j]} inputType="string"></ClothingElement2>
            )
          }
          // counter++
        }

        var boxBG = (i % 2 == 0) ? "gray.100" : "gray.200";
        var topBG = ["red.200", "orange.200", "yellow.200", "green.200", "blue.200", "purple.200"]
        var topColour = ["red.900", "orange.900", "yellow.900", "green.900", "blue.900", "purple.900"]


        output.push(
          <Box key={i} bg={boxBG} m="20px" borderRadius="5px">
            {/* <Text fontSize="3xl">{categoryName[i]}</Text> */}
            

            <Box pl="100px" w="100%" bg={topBG[i]} borderRadius="3px">
              {/* <Text fontSize="3xl">{masterList.categories[i]}</Text> */}
              <Text fontSize="3xl" p="2px"
              // bgColor="black"
              bgColor={topColour[i]}
              bgClip="text" 
              // fontFamily="Verdana"
              >
                {masterList.categories[i]}</Text>
            </Box>

            <Grid key={i} templateColumns="repeat(auto-fill, 200px)" mx='300px' justifyContent='center'>
              {category}
            </Grid>

          </Box>
        )
        // console.log('output: ', output)
      // }
    };

    return output;
  }

  return (!masterList) ?
  <h1>Loading!!</h1> :
  (
    getOutput()
  )
}


export default CategoryList;