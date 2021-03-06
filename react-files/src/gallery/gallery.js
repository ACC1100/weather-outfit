import { Box, VStack, Button, Input, Center, FormLabel, RadioGroup, HStack, Radio } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react'; ////

import Slider from "react-slick";
import "./slick/slick.css"; 
import "./slick/slick-theme.css";

function getGalleryItems() {
  // var output = [];
  // const submitForm = () => {
  //   var newData = formData;
  //   newData['colour'] = ogColours[newData['colour']];
  //   newData['type'] = types[newData['type']];

  //   fetch('/add', {
  //   method: "POST",
  //   headers: {
  //       "content_type": "application/json",
  //   },
  //   body: JSON.stringify(newData)
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //   console.log(data.result);
  //   })
  // }
}

function Gallery() {
  const [location, setLocation] = useState('');
  const [formalityInput, setFormalityInput] = useState('');

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
        console.log('outfits: ', data.result[0]);
        console.log(data.result[0].length);
        // setCategories(data.result);
        // setCategories([[2, 4, 5, 14, 15, 24, 25, 35, 34, 45], [0, 3, 6], [8, 13], [1, 7], [11, 12], [9, 10]])
      })
  }

  const getMenu = () => {
    return (
      <Center>
        <VStack spacing={8} w="80%">
          <Input placeholder="location" size="lg" variant="filled" onChange={(event) => {
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

  return (
    <>
      <Box p="2%">
        {getMenu()}
      </Box>

      <>
        <Center>
          <Box w="60%" borderRadius="20px">
            <Slider {...settings}>
              <Box w="20%" h="500px" bg="black" borderRadius="20px">asd</Box>
              <Box w="20%" h="500px" bg="black" borderRadius="20px">123</Box>
            </Slider>
          </Box>
        </Center>
      </>
    </>
  )
}

export default Gallery;
