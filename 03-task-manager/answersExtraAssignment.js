/////////////////////////// CHALLENGES ////////////////////////////////////////

// Each challenge will be related to this array of names. It will pose a
// problem related to these names, and then implement the solution. The
// challenges are:

// For an extra assignment, you may implement these yourself! Include your
// changes to this file with your MR for week 3.

const names = [
  'Dimitry SantiAgo',
  'Carlos d. Perez',
  'tam  person',
  'Mariana Gomez',
  'Amy You'
];


// - Create a new array with only each person's last name
  const getLastName = names.map(name => name.match(/\b(\w+)$/)[1]);
  // console.log(getLastName);

// - Filter names that don't match the format "<first> <last>"
//   - Should remove Tam because she has a double-space
//   - Should remove Carlow because he has a middle-name
//   - Should also remove names like:
//     - "Timothy      Cook"
//     - "Nick_Masters"
//     - "Timmy-Turner"
//     - "Billy\nBob"
//     - etc.

const regex = /^[A-Za-z]+\s[A-Za-z]+$/;

const removeInvalidNames = names.filter(name => regex.test(name));
// console.log(removeInvalidNames);

// - Create a new array where everyone's name is converted to "Title Case"
//   - The first character of each word should be uppercase
//   - All other characters in the word should be lowercase
//   - expected output is ['Dimitry Santiago', 'Carlos D. Perez', 'Tam Person', ...]

const titleCaseNamesHelper = name => {
  let wordArr = name.split(' ');
  let updatedWordArr = [];
  for(let word of wordArr){
    if(!word) 
      continue;
    
    updatedWordArr.push(word.slice(0, 1).toUpperCase() + word.slice(1));
  }
  return updatedWordArr.join(" ");
}
const titleCaseNames = names.map(name => titleCaseNamesHelper(name));
// console.log(titleCaseNames);

// - Last Challenge:
//     Remove names with the wrong format
//     AND change it to "Title Case"
//     AND remove people whose last name ends with z
//     AND write a message asking them to sign up
const endsWithZ = /z$/;
const removeWrongFormat = removeInvalidNames 
                          .filter(name => !endsWithZ.test(name))
                          .map(name => titleCaseNamesHelper(name))
                          .map(name => `Hello ${name}, sign up now.`);

// console.log(removeWrongFormat);