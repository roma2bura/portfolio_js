const toggleList = document.querySelector('button#toggleList');
const listDiv = document.querySelector('div.list');
const descInput = document.querySelector('input.description');
const descP = document.querySelector('p.description'); // to select only p with class description
const descButton = document.querySelector('button.description'); // always be specific with class not to get problems.
const addItemInput = document.querySelector('input.addItemInput');
const addItemButton = document.querySelector('button.addItemButton');
const listUl = listDiv.querySelector('ul'); // so we target only ul which are inside listDiv not the whole document
const lis = listUl.children; // we access all li elements.


// adding background color to first and last element
listUl.firstElementChild.style.backgroundColor = 'lightskyblue';

listUl.lastElementChild.style.backgroundColor = 'lightsteelblue';

// adding no none show to first and last buttons.

 

// creating func to add buttons inside li.
function attachListItemButtons (li) {
    let up = document.createElement('button');
    up.className = 'up';
    up.textContent = 'Up';
    li.appendChild(up); // append to li element

    let down = document.createElement('button');
    down.className = 'down';
    down.textContent = 'Down';
    li.appendChild(down);

    let remove = document.createElement('button');
    remove.className = 'remove';
    remove.textContent = 'Remove';
    li.appendChild(remove);
}

// looping adding buttons to li element, calling func.
for (i = 0; i < lis.length; i ++) {
    attachListItemButtons(lis[i]);
}


listUl.addEventListener('click', (event) => {    // to access each item in collection
    if (event.target.tagName == 'BUTTON') { // if target button reached then following codes apply
        if (event.target.className == 'remove') { // if target button with class remove reached then following codes apply
            let li = event.target.parentNode;
            let ul = li.parentNode;
            ul.removeChild(li);
        }
        if (event.target.className == 'up') {  // if target button with class up reached then following codes apply
            let li = event.target.parentNode;
            let prevLi = li.previousElementSibling; // get previouse sibling as the ref
            let ul = li.parentNode;
            if (prevLi) {   // if prevLi has some info then following code runs.
                ul.insertBefore(li, prevLi);// passing list items to move
            }
        }
        if (event.target.className == 'down') {  // if target button with class up reached then following codes apply
            let li = event.target.parentNode;
            let nextLi = li.nextElementSibling; // get previouse sibling as the ref
            let ul = li.parentNode;
            if (nextLi) {   // if prevLi has some info then following code runs.
                ul.insertBefore(nextLi, li);// very important here you should change positions.
            }
        }
    }
});


toggleList.addEventListener('click', () => {
    if (listDiv.style.display == 'none') {   // if current status is none then run block in other scenario then run none
        toggleList.textContent = 'Hide list'; // to hide list.
        listDiv.style.display = 'block';
    } else {
        listDiv.style.display = 'none'; // to hide list when clicking
        toggleList.textContent = 'Show list'; // to show list.
    }
});


// descButton.addEventListener('click', () => {
//     descP.innerHTML = descInput.value + ':'; // changing what p contents to input value and plus :
//     descInput.value = ''; // to clear the value in string
// });

addItemButton.addEventListener('click', () => {
    let ul = document.getElementsByTagName('ul')[0];
    let li = document.createElement('li'); // creating new element
    li.textContent = addItemInput.value; // li is going to hold the input.
    attachListItemButtons(li); // calling function which adding buttons
    ul.appendChild(li); // var ul adding what contains in var li
    addItemInput.value = ''; // to clear the value in string
});



