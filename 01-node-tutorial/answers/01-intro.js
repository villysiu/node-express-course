// const now = new Date();
const hours = new Date().getHours();


if (hours < 12) {
  console.log('Good morning!');
} else if (hours < 18) {
  console.log('Good afternoon!');
} else if (hours < 21) {
  console.log('Good evening!');
} else {
  console.log('Good night!');
}

console.log('Have a good day!');
