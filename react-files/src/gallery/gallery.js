import { Box, VStack, Button, Input, Center } from '@chakra-ui/react';
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
        formality: 'smart'
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
            console.log(event.target.value);
          }} />
          <Button colorScheme="teal" size="lg" isFullWidth={true} onClick={() => fetchingSuitableOutfits()}>
              Generate
          </Button>
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
