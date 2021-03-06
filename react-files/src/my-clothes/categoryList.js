import React, { useEffect, useState } from 'react';
import ClothingElement from './clothingElement';
import ClothingElement2 from './clothingElement2';

import { Text, Grid } from '@chakra-ui/react';

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
        output.push(
          <div key={i}>
            {/* <Text fontSize="3xl">{categoryName[i]}</Text> */}
            <Text fontSize="3xl">{masterList.categories[i]}</Text>
            <Grid key={i} templateColumns="repeat(auto-fill, 200px)" mx='300px' justifyContent='center'>
              {category}
            </Grid>
          </div>
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