import React, { useEffect, useState } from 'react';
import CategoryList from './categoryList';

function MyClothes() {
  // const [categories, setCategories] = useState([[], [], [], [], [], []]);
  const [clothingInfo, setClothingInfo] = useState([]);

  useEffect(() => {
    fetchClothing();
    // console.log('never run again');
  }, []);

  function fetchClothing() {
    let output = [];
    // fetch('/hello', {
    //   method: "POST",
    //   headers: {
    //     "content_type": "application/json",
    //   }
    // }).then(response => response.json())
    //   .then(data => {
    //     console.log('data: ', data.result);
    //     // setCategories(data.result);
    //     // setCategories([[2, 4, 5, 14, 15, 24, 25, 35, 34, 45], [0, 3, 6], [8, 13], [1, 7], [11, 12], [9, 10]])
    //   })
    //   .then(
    //     fetch('/readfile', {
    //       method: "POST",
    //       headers: {
    //         "content_type": "application/json",
    //       }
    //     }).then(response => response.json())
    //       .then(data => {
    //         console.log('read data: ', data.result.clothes);
    //         setClothingInfo(data.result.clothes);
    //       })
    //   )
    fetch('/readfile', {
      method: "POST",
      headers: {
        "content_type": "application/json",
      }
    }).then(response => response.json())
      .then(data => {
        console.log('read data: ', data.result.clothes);
        setClothingInfo(data.result.clothes);
    })
  }

  // function showdata() {
  //   console.log('cats: ', categories);
  //   return categories;
  // }

  // return (!categories.length || ! clothingInfo.length) ?
  return (! clothingInfo.length) ?
      <h1>Loading!!</h1> :
    (
    <div>
      {/* <Button onClick={() => {
        showdata();
      }}>
        Click Me
      </Button> */}
        {/* <CategoryList categories={categories} clothingInfo={clothingInfo} /> */}
        <CategoryList clothingInfo={clothingInfo} />
    </div>
  ) 
}

export default MyClothes;