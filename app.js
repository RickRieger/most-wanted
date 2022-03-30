/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

'use strict';
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
  // promptFor() is a custom function defined below that helps us prompt and validate input more easily
  // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
  let searchType = promptFor(
    "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
    yesNo
  ).toLowerCase();
  let searchResults;
  // Routes our application based on the user's input
  switch (searchType) {
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchResults = searchByTrait(people);
      break;
    default:
      // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
      app(people);
      break;
  }
  // Calls the mainMenu() only AFTER we find the SINGLE PERSON
  mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
  // A check to verify a person was found via searchByName() or searchByTrait()
  if (!person[0]) {
    alert('Could not find that individual.');
    // Restarts app() from the very beginning
    return app(people);
  }
  let displayOption = prompt(
    `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
  );
  // Routes our application based on the user's input
  switch (displayOption) {
    case 'info':
      // HINT: Look for a person-object stringifier utility function to help
      let personInfo = findPersonInfo(person[0]);
      alert(personInfo);
      break;
    case 'family':
      let personFamily = findPersonFamily(person[0], people);
      alert(personFamily);
      break;
    case 'descendants':
      let personDescendants = findPersonDescendants(person[0], people);
      personDescendants = addRelationShip(personDescendants, 'Descendant');
      displayPeople(personDescendants);
      break;
    case 'restart':
      // Restart app() from the very beginning
      app(people);
      break;
    case 'quit':
      // Stop application execution
      return;
    default:
      // Prompt user again. Another instance of recursion
      return mainMenu(person, people);
  }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
  let firstName = promptFor(
    "What is the person's first name?",
    chars
  ).toLowerCase();
  let lastName = promptFor(
    "What is the person's last name?",
    chars
  ).toLowerCase();

  // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
  let foundPerson = people.filter(function (person) {
    if (
      person.firstName.toLowerCase() === firstName &&
      person.lastName.toLowerCase() === lastName
    ) {
      return true;
    }
  });
  return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
  if (people[0].relationship) {
    alert(
      people
        .map(function (person) {
          return `${person.relationship}: ${person.firstName} ${person.lastName}`;
        })
        .join('\n')
    );
  } else {
    alert(
      people
        .map(function (person) {
          return `${person.firstName} ${person.lastName}`;
        })
        .join('\n')
    );
  }
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
  let personInfo = `First Name: ${person.firstName}\n`;
  personInfo += `Last Name: ${person.lastName}\n`;
  personInfo += `Gender: ${person.gender}\n`;
  personInfo += `DOB: ${person.dob}\n`;
  personInfo += `Height: ${person.height}\n`;
  personInfo += `Weight: ${person.weight}\n`;
  personInfo += `Eye Color: ${person.eyeColor}\n`;
  personInfo += `Occupation: ${person.occupation}\n`;
  personInfo += `Parents: ${person.parents}\n`;
  personInfo += `Current Spouse: ${person.currentSpouse}`;
  alert(personInfo);
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
  return input.toLowerCase() === 'yes' || input.toLowerCase() === 'no';
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
  return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁

function findPersonInfo(person) {
  return displayPerson(person);
}

function addRelationShip(arr, relationship) {
  arr.forEach((person) => {
    person.relationship = relationship;
  });
  return arr;
}

function findPersonFamily(person, people) {
  let family = [];
  let spouse = people.filter(function (per) {
    return per.id === person.currentSpouse;
  });
  spouse = addRelationShip(spouse, 'Spouse');

  let parents = people.filter(function (per) {
    return person.parents.includes(per.id);
  });

  parents = addRelationShip(parents, 'Parent');

  let siblings = people.filter(function (per) {
    if (per !== person) {
      return person.parents.includes(per.parents[0] || per.parents[1]);
    }
  });
  siblings = addRelationShip(siblings, 'Sibling');

  family = [...spouse, ...parents, ...siblings];

  displayPeople(family);
}

function findPersonDescendants(person, people, descendants = []) {
  let array = people.filter(function (per) {
    return per.parents.includes(person.id);
  });

  if(array.length ===0) return [person]

  descendants = [person];

  array.forEach((person) => {
    descendants = [...descendants, ...findPersonDescendants(person, people)] 
  });

//   if(array.length === 0){
//       if(descendants.length === 0){
//           alert(`${person.firstName} ${person.lastName} doesn't have any descendants.`);
//           app(people)
//       }
//       return descendants
//   }


//   handle elsewhere;
//   descendants = addRelationShip(descendants, 'Descendant');
//   displayPeople(descendants);

  return descendants;
}

function searchByTrait(people) {
  let userSearch = prompt(
    'Enter your search criteria - if searching multiple criteria, separate with a semicolon.\nSee available search criteria below (note that the search is case sensitive):\nid\nfirstName\nlastName\ngender\ndob\nheight\nweight\neyeColor\noccupation\nparents\ncurrentSpouse\nSingle-Criteria Example: \nweight 199 \nMulti-Criteria Example: \nweight 199;eyeColor brown;occupation assistant'
  );
  userSearch = userSearch.split(/;| /);

  //Original method of multi-search:
  let results = people.filter((person) => {
    return person[userSearch[0]] == userSearch[1];
  });

  if (userSearch.length > 2) {
    for (let i = 2; i < userSearch.length; i = i + 2) {
      results = results.filter((person) => {
        return person[userSearch[i]] == userSearch[i + 1];
      });
    }
  }

  //Newer method of multi-search (after research) below: iterates through people and only adds them to the results array if they hit all criteria

  // let searchCriteria = {}
  // for(let i =0; i< userSearch.length; i= i+2){
  //     searchCriteria[userSearch[i]] = userSearch[i+1]
  // }
  // //console.log(searchCriteria);

  // let results = [];

  // results = people.filter(function(person) {
  //     for (var key in searchCriteria) {
  //         if (person[key] === undefined || person[key] != searchCriteria[key])
  //         return false;
  //     }
  //     return true;
  //     });

  if (results.length === 0) {
    alert(
      "We didn't find any matching results. Please try new search criteria. Double check your search criteria for spelling."
    );
    searchByTrait(people);
  }
  displayPeople(results);
}
