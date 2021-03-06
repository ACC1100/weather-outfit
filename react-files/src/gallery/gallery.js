import { Box, VStack, Button, Input, Center, FormLabel, RadioGroup, HStack, Radio, useRadio, Grid } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import ClothingElement2 from '../my-clothes/clothingElement2';

import Slider from "react-slick";
import "./slick/slick.css"; 
import "./slick/slick-theme.css";


function Gallery() {
  const [location, setLocation] = useState('');
  const [formalityInput, setFormalityInput] = useState('');
  const [outfits, setOutfits] = useState('');

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
        console.log('read data: ', data.result);
        setMasterList(data.result);
        // console.log(formData);
      })
  }
  useEffect(() => {
    getMasterList();
    console.log('got master list')
  }, []);
  ///////

  function galleryOutfit(outfitList, masterList) {
    //output: [box, box]
    // outfitList, masterList, clothingJSON
    console.log('outfitlist', outfitList);
    let output = [];
    // for each outfit
    for (var i = 0; i < outfitList.length; i++) {
      let temp_outfit = []
      // for each clothing 
      for (var j = 0; j < outfitList[i].length; j++) {
        if (outfitList[i][j].clothes > 0) {
          temp_outfit.push(
            <ClothingElement2 masterList={masterList} clothingJSON={{type: 'long sleeve shirt', colour: 'black'}} inputType='string' />
          )
        }
      }
      for (var k = 0; k < 6; k++) {
        output.push(
          <Grid templateColumns="repeat(3, 200px)" justifyContent='center'>
            {temp_outfit}
          </Grid>
        )
      }
    }
    return output
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  function fetchingSuitableOutfits() {
    fetch('/getoutfit', {
      method: "POST",
      headers: {
        "content_type": "application/json",
      },
      body: JSON.stringify({
        address: location,
        formality: formalityInput
      })
    }).then(response => response.json())
      .then(data => {
        if (data.result === "invalid location") {
          console.log('no outfits');
        } else {
          console.log('outfits: ', data.result);
          setOutfits(data.result)
        }
      })
  }

  const getMenu = () => {
    return (
      <Center>
        <VStack spacing={8} w="80%">
          <Input placeholder="Location" size="lg" variant="filled" onChange={(event) => {
            setLocation(event.target.value);
            // console.log(event.target.value);
          }} />
          <Button colorScheme="teal" size="lg" isFullWidth={true} onClick={() => {
            console.log(location, formalityInput);
            if (location && formalityInput) {
              fetchingSuitableOutfits();
            } else {
              console.log('INPUT STUFF');
            }
          }}>
            Generate
          </Button>
          <Box w="100%">
            <FormLabel htmlFor="formality">Formality</FormLabel>
            <RadioGroup id="formality" colorScheme="green" onChange={(event) => {
              // console.log('e', event);
              setFormalityInput(event);
            }}>
              <HStack justify="space-evenly">
                <Radio value="casual">Casual</Radio>
                <Radio value="smart">Smart-Casual</Radio>
                <Radio value="formal">Formal</Radio>
              </HStack>
            </RadioGroup>
          </Box>
        </VStack>
      </Center>
    )
  }

  return (!masterList) ?
    <h1>Loading!!</h1> :
    (
      <>
        <Box p="2%">
          {getMenu()}
        </Box>
          <>
            <Center>
              <Box w="60%" borderRadius="20px" borderWidth='2px' >
                <Slider {...settings}>
                {
                  (!outfits) ? <Box w="20%" h="570px" borderRadius="20px"/> : (
                    // <Box w="20%" h="500px" borderRadius="20px">asd</Box>
                    // <Box w="20%" h="500px" borderRadius="20px">123</Box>
                    galleryOutfit(outfits, masterList).map((outfit) => {
                      return (
                        <Box w="20%" h="570px" borderRadius="20px">
                          {outfit}
                        </Box>
                      )
                    })
                  )
                }
                </Slider>
              </Box>
            </Center>
          </> 
      </>
    )
}

export default Gallery;
