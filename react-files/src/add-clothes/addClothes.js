import React, { useState, useEffect } from 'react'; ////
import ReactDOM from 'react-dom';
import {Text, ChakraProvider, theme, Button, StackDivider, Box, Grid} from '@chakra-ui/react';
import {HStack} from '@chakra-ui/react';
import {VStack, Input, FormLabel, Checkbox, CheckboxGroup} from "@chakra-ui/react"

import {InputGroup, InputLeftAddon, InputRightAddon, Select, Textarea} from "@chakra-ui/react"

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

  const firstField = React.useRef() // automatically selects first field

  const handleClick = () => {
    onOpen()
  }

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    var field;
    var value;

    if (Array.isArray(e)) {
      // idk this array checkbox thing doesnt have an ID
      field = "formality";
      value = e;
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

    fetch('/add', {
      method: "POST",
      headers: {
        "content_type": "application/json",
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.result);
    })
  }

  // const sizes = ["xs", "sm", "md", "lg", "xl", "full"]

  return (
    <>
      <Button onClick={() => onOpen()} m={4}>
        Add clothing
      </Button>

      <Drawer placement="right" onClose={onClose} isOpen={isOpen} size={"md"}>
        <DrawerOverlay>
          <DrawerContent>

            <DrawerHeader>Add clothing</DrawerHeader>

            <DrawerBody>
              <VStack spacing="24px">
                <Box w="100%"> 
                  <FormLabel htmlFor="type">Type</FormLabel>
                  <Select id="type" onChange={handleChange} placeholder="Select option">
                    <option value="tshirt">T-shirt</option>
                    <option value="shirt">Shirt</option>
                    <option value="Test">Test</option>
                  </Select>
                </Box>

                <Box w="100%">
                  <FormLabel htmlFor="colour">Colour</FormLabel>
                  <Input
                    ref={firstField}
                    id="colour"
                    placeholder="Please enter user name"
                    onChange={handleChange}
                  />
                </Box>

                <Box w="100%">
                  <FormLabel htmlFor="desc">Formality</FormLabel>
                  <CheckboxGroup id="formality" colorScheme="green" onChange={handleChange}>
                    <HStack>
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