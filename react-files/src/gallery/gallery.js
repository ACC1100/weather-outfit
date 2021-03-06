import { Box, VStack, Button, Input, Center } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react'; ////

import Slider from "react-slick";
import "./slick/slick.css"; 
import "./slick/slick-theme.css";

function getMenu() {
    return (
        <Center>
            <VStack spacing={8} w="80%">
                <Input placeholder="location" size="lg" variant="filled"/>
                <Button colorScheme="teal" size="lg" isFullWidth={true}>
                    Generate
                </Button>
            </VStack>
        </Center>
    )
}

function getGalleryItems() {
    var output = [];

    

}

function Gallery() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

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
