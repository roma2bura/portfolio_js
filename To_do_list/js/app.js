const toggleList = document.querySelector('button#toggleList');
const listDiv = document.querySelector('div.list');
const addItemInput = document.querySelector('input.addItemInput');
const addItemButton = document.querySelector('button.addItemButton');
const listUl = listDiv.querySelector('ul'); // so we target only ul which are inside listDiv not the whole document
const lis = listUl.children; // we access all li elements.

// creating func to add buttons inside li.
function attachListItemButtons (li) {
    let gotovo = document.createElement('button');
    gotovo.className = 'sdelal';
    gotovo.textContent = 'Complete';
    li.appendChild(gotovo);
    
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
        if (event.target.className == 'sdelal') { // if target button with class remove reached then following codes apply
            let li = event.target.parentNode;
            li.style.textDecoration = "line-through"; // pzdc dolgo bilo poka vchihlil))
        }
    }
    if (event.target.tagName == 'BUTTON') { // if target button reached then following codes apply
        if (event.target.className == 'remove') { // if target button with class remove reached then following codes apply
            let li = event.target.parentNode;
            let ul = li.parentNode;
            ul.removeChild(li);
        }
    }
});

addItemButton.addEventListener('click', () => {
    let ul = document.getElementsByTagName('ul')[0];
    let li = document.createElement('li'); // creating new element
    li.textContent = addItemInput.value; // li is going to hold the input.
    attachListItemButtons(li); // calling function which adding buttons
    ul.appendChild(li); // var ul adding what contains in var li
    addItemInput.value = ''; // to clear the value in string
});


// HIDE SHOW BTN
toggleList.addEventListener('click', () => {
    if (listDiv.style.display == 'none') {   // if current status is none then run block in other scenario then run none
        toggleList.textContent = 'Hide list'; // to hide list.
        listDiv.style.display = 'block';
    } else {
        listDiv.style.display = 'none'; // to hide list when clicking
        toggleList.textContent = 'Show list'; // to show list.
    }
});

