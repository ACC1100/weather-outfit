import React, { useState, useEffect } from 'react'; ////
import ReactDOM from 'react-dom';
import {Text, ChakraProvider, theme, StackDivider, Box, Grid, Center} from '@chakra-ui/react';
import {HStack} from '@chakra-ui/react';
import {VStack, Input, FormLabel, Checkbox, CheckboxGroup} from "@chakra-ui/react"

import {InputGroup, InputLeftAddon, InputRightAddon, Select, Textarea} from "@chakra-ui/react"
import { Button, ButtonGroup } from "@chakra-ui/react"

// import 

import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from "@chakra-ui/react"

import { useDisclosure } from "@chakra-ui/react"


function AddClothes() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    var field;
    var value;

    if (Array.isArray(e)) {
      field = "formality";
      value = e;
    } else if (e.target.type == "button") {
      field = "colour";
      value = e.target.value;
      // value = colours[value];
    } else {
      field = e.target.id;
      value = e.target.value;
    }

    var newData = formData
    newData[field] = value
    setFormData(newData);
  }

  const submitForm = () => {
    console.log('button clicked');
    console.log(formData);

    var newData = formData;
    newData['colour'] = ogColours[newData['colour']];
    newData['type'] = types[newData['type']];

    fetch('/add', {
      method: "POST",
      headers: {
        "content_type": "application/json",
      },
      body: JSON.stringify(newData)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.result);
    })
  }

  var ogColours = ["black","white","grey","pink","red","orange","beige","yellow","green","light blue","dark blue","purple","brown"]
  var colours = ["black","white","gray.400","pink.200","red.500","orange.500","orange.100","yellow.300","green.500","blue.200","blue.600","purple.500","orange.800"];
  const getColourButtons = () => {
    var buttons = [];

    for (var i = 0; i < colours.length; i++) {
      buttons.push(
        <Button key={i} value={i} bg={colours[i]} size="lg" ratio={1} onClick={handleChange}/>
      )
    }

    return buttons
  }

  var types = ["Short Sleeve T-Shirt", "Long Sleeve T-Shirt", "Short Sleeve Shirt", "Long Sleeve Shirt", "Sweater", "Jacket", "Coat", "Raincoat", "Hoodie", "Jeans", "Chino", "Pants", "Tights/Leggings", "Shorts", "Sneakers", "Runners", "Boots", "Heels", "Raincoat", "Skirt", "Dress", "Blouse", "Crop Top", "Cap", "Sun Hat", "Beanie", "Other Hat",]
  const getClothingOptions = () => {
    var options = [];
    for (var i = 0; i < types.length; i++) {
      options.push(
        <option key={i} value={i}>{types[i]}</option>
      )
    }
    return options
  }
  var rainTypes = ["Jacket", "Coat", "Hoodie", "Sneakers", "Sneakers", "Runners", "Boots"]

  return (
    <>
      <Center>
        <Button onClick={() => onOpen()} m={4} w="80%">
          Add clothing
        </Button>
      </Center>

      <Drawer placement="right" onClose={onClose} isOpen={isOpen} size={"md"}>
        <DrawerOverlay>
          <DrawerContent>

            <DrawerHeader>Add clothing</DrawerHeader>

            <DrawerBody>
              <VStack spacing="24px">
                <Box w="100%"> 
                  <FormLabel htmlFor="type">Type</FormLabel>
                  <Select id="type" onChange={handleChange} placeholder="Select option">
                    {getClothingOptions()}
                  </Select>
                </Box>

                <Box w="100%">
                  <FormLabel htmlFor="colour">Colour</FormLabel>
                  <Grid templateColumns="repeat(6, 1fr)" gap={6} id="colour">
                    {getColourButtons()}
                  </Grid>
                </Box>

                <Box w="100%">
                  <FormLabel htmlFor="formality">Formality</FormLabel>
                  <CheckboxGroup id="formality" colorScheme="green" onChange={handleChange}>
                    <HStack justify="space-evenly">
                      <Checkbox value="casual">Casual</Checkbox>
                      <Checkbox value="smart">Smart-Casual</Checkbox>
                      <Checkbox value="formal">Formal</Checkbox>
                    </HStack>
                  </CheckboxGroup>
                </Box>
              </VStack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={() => submitForm()}>
                Save
              </Button>
            </DrawerFooter>

          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default AddClothes;