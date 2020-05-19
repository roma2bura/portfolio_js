// ВСЕ ПРАВА ЗАЩИЩЕНЫ СЦУКА

const toggleList = document.querySelector('button#toggleList');
const listDiv = document.querySelector('div.list');
const addItemInput = document.querySelector('input.addItemInput');
const addItemButton = document.querySelector('button.addItemButton');
const listUl = listDiv.querySelector('ul'); // so we target only ul which are inside listDiv not the whole document
const lis = listUl.children; // we access all li elements.

// creating func to add buttons inside li.
function attachListItemButtons (li) {
    let gotovo = document.createElement('button');
    gotovo.className = 'btn btn-warning sdelal float-right';
    gotovo.textContent = 'Complete';
    li.appendChild(gotovo);
    
    let remove = document.createElement('button');
    remove.className = 'btn btn-danger remove float-right mr-2';
    remove.textContent = 'Remove';
    li.appendChild(remove);
    
}

// looping adding buttons to li element, calling func.
for (i = 0; i < lis.length; i ++) {
    attachListItemButtons(lis[i]);
}


listUl.addEventListener('click', (event) => {    // to access each item in collection
    if (event.target.tagName == 'BUTTON') { // if target button reached then following codes apply
        if (event.target.className == 'btn btn-warning sdelal float-right') { // if target button with class remove reached then following codes apply
            let li = event.target.parentNode;
            li.style.textDecoration = "line-through"; // pzdc dolgo bilo poka vchihlil))
        }
    }
    if (event.target.tagName == 'BUTTON') { // if target button reached then following codes apply
        if (event.target.className == 'btn btn-danger remove float-right mr-2') { // if target button with class remove reached then following codes apply
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
    li.classList.add("list-group-item");     
    li.classList.add("col");
    li.classList.add("px-md-5");
    li.classList.add("p-3");
    li.classList.add("bg-light");
    li.classList.add("text-uppercase");
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

