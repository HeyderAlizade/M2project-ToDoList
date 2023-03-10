// VARIABLE AND CONSTANT
const form = document.querySelector('form');
const list = document.querySelector('ul');
const addDiv = document.querySelector('.add-button');
const text = document.querySelector('.text');
const listNum = document.querySelector('.list-num');
let li = document.getElementsByTagName('li');
let textDelImg = document.querySelector('.text-delete-img');
let matrix = [];
const divList = document.querySelector('.div-list');
const listDelBtn = document.getElementsByClassName('list-delete-button');
const sortBtn = document.querySelector('.sort-image');
let dataText;


// ADD EVENT LISTENERS

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  dataText = data.get('text');
  addToMatrix();
})


textDelImg.addEventListener('mousedown', clearText);








// FUNCTIONS

function refreshMatrix(){
    matrix.length == 0 ? divList.style.display = 'none' : divList.style.display = 'block';

    list.innerHTML ='';
    for(key of matrix){
        list.insertAdjacentHTML('beforeend',`<li class="tasks__item" draggable="true"><span class="list-text">${key}</span><div class="text-delete-img list-delete-button">X</div></span></li>`);
    }

    listNumChange();
    deleteList();
    sortBtn.innerHTML = `<img src="image/sort-off-2.png" alt="sort">`

    

}

function addToMatrix(){
    if (dataText.trim().length != 0){ 
        matrix.push(dataText)
        addDiv.innerHTML = 'Добавленно';
        addDiv.classList.add('click-add-button');
        
        
        setTimeout(() =>{
            addDiv.innerHTML = `<span>Добавить</span><div class="add-button-circle"><span>+</span></div>`;
            addDiv.classList.remove('click-add-button');
        }, 1000);
        clearText();
    }  else {
            addDiv.innerHTML = 'Пустая строка';
            addDiv.classList.add('click-add-button-error');
            
            setTimeout(() =>{
                addDiv.innerHTML = `<span>Добавить</span><div class="add-button-circle"><span>+</span></div>`;
                addDiv.classList.remove('click-add-button-error');
            }, 1000)
        }
        refreshMatrix()

}   
    
function listNumChange(){
    listNum.innerHTML = 'Всего задач: ' + matrix.length; 
}

function clearText(){
    text.value = '';
}

 function deleteList(){
    for(element of listDelBtn){
    element.addEventListener('mousedown', (evt) => {
        let parent = evt.target.parentNode;
        parent.parentNode.removeChild(parent);
        listToMatrix();
        refreshMatrix();
    })
  };
}

function listToMatrix(){
    matrix = []
    for(let i=0; i<li.length; i++){
        let temp = li[i].textContent.split('')
        temp.pop();
        temp = temp.join('');
        matrix.push(temp)
    }
}



// SORT

sortBtn.addEventListener('click', sortAsc);

function sortAsc(event){
  if(matrix.length > 1){
    matrix.sort((a, b) => a.localeCompare(b));
    refreshMatrix();
    sortBtn.innerHTML = ` <img src="image/sort-on-1.png" alt="sort">`;
    sortBtn.removeEventListener('click', sortAsc);
    sortBtn.addEventListener('click', sortDesc)
  }
}

function sortDesc(event){
  matrix.sort((a, b) => b.localeCompare(a));
  refreshMatrix();
  sortBtn.innerHTML = ` <img src="image/sort-on-2.png" alt="sort">`;
  sortBtn.removeEventListener('click', sortDesc);
  sortBtn.addEventListener('click', sortAsc)
}




//      DRAG & DROP--------------------------------------------------------------

list.addEventListener(`dragstart`, (evt) => {
    evt.target.classList.add(`selected`);
  })
  
list.addEventListener(`dragend`, (evt) => {
    evt.target.classList.remove(`selected`);
  });



  const getNextElement = (cursorPosition, currentElement) => {
    const currentElementCoord = currentElement.getBoundingClientRect();
    const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;
  
    const nextElement = (cursorPosition < currentElementCenter) ?
        currentElement :
        currentElement.nextElementSibling;
  
    return nextElement;
  };


  list.addEventListener(`dragover`, (evt) => {
    evt.preventDefault();
  
    const activeElement = list.querySelector(`.selected`);
    const currentElement = evt.target;
    const isMoveable = activeElement !== currentElement &&
      currentElement.classList.contains(`tasks__item`);
  
    if (!isMoveable) {
      return;
    }
  
    const nextElement = getNextElement(evt.clientY, currentElement);
  
    if (
      nextElement && 
      activeElement === nextElement.previousElementSibling ||
      activeElement === nextElement
    ) {
      return;
    }
  
    list.insertBefore(activeElement, nextElement);

    listToMatrix()
    refreshMatrix();
  });




