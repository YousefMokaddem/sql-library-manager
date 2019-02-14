//select all rows that are books
const rows = document.getElementsByClassName('book');
const buttonDiv = document.createElement('div');
buttonDiv.className = 'pages';
const resultsPerPage = 10;
const input = document.getElementById('searchbar');

let list = rows;
showPage(1,list);
appendPageLinks(rows.length);

/*** 
   sets display properties based on the pageNum.
***/
function showPage(pageNum){
    //clear all
    for (let i = 0; i < rows.length; i++){
        rows[i].style.display = 'none';
     }
    //set display to none if not in page range
    for (let i = 0; i < list.length; i++){
        if(i + 1 > (pageNum * resultsPerPage) - resultsPerPage && i < pageNum * resultsPerPage){
            list[i].style.display = '';
        }
    }
 }


/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
/*creates page links based on the int numElements passed into the func*/
function appendPageLinks(numElements){
    //remove old page links
    while(buttonDiv.firstElementChild){
       buttonDiv.removeChild(buttonDiv.firstElementChild);
    }
    //add new page links
    const buttonList = document.createElement('ul');
    for (let i = 0; i < Math.ceil(numElements/resultsPerPage); i++){
       const li = document.createElement('li');
       const a = document.createElement('a');
       a.className = 'button';
       if (i == 0){a.className = 'button active';}
       a.textContent = i + 1;
       li.appendChild(a);
       buttonList.appendChild(li);
    }
    buttonDiv.appendChild(buttonList);
    document.querySelector('body').appendChild(buttonDiv);
 
    buttonDiv.addEventListener('click', (e) =>{
       if(e.target.tagName === 'A'){
          //change active class to clicked link
          for (let i = 0; i < buttonList.children.length; i++){
             buttonList.children[i].firstElementChild.className = 'button';
          }
          e.target.className = 'button active';
          showPage(e.target.textContent, list);
       }
    });
 }


//search function empties the list array and fills it with the results, then calls showPage on the new list
function search(searchString){
    list = [];
    for (let i = 0; i < rows.length; i++){
       if(rows[i].textContent.toLowerCase().search(searchString.toLowerCase()) !== -1){
          list.push(rows[i]);
       }
    }
    appendPageLinks(list.length);
    showPage(1,list);
 }

 //catch user input
input.addEventListener('input', (e) => {
    search(e.target.value);
 });





