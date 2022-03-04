import React, {Component} from 'react'





state = {
    userInputContainerClicked: false,
    searchTerm: "",

    passingTags: {
      search: {
        inputTerm: ""
      },
      color: {
        chinese: false,
        korean: false,
        japanese: false,
        vietnamese: false,
        spicy: false,
        noodles: false,
        rice: false,
        instant: false,
        vegan: false,
        soup: false,
        glutenfree: false,
        frozen: false,
        vegetarian: false,
        filipino: false
      }

    }
  };

allFilterClickListener = (e, filterProp) => {
  console.log("FILTER clicked", e.target.dataset.name);
  const name = e.target.dataset.name;
  this.setState(prevState => ({
    passingTags: {
      ...prevState.passingTags,
      [filterProp]: {
        ...prevState.passingTags[filterProp],
        [name]: !prevState.passingTags[filterProp][name]
      }
    }
  }));
};
