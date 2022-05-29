let myLibrary = [new Book("J.K. Rowling","Harry Potter", 290, true),new Book("J.K. Rowling","Harry Potter 2", 124, true)];

function Book(author,title,pages,read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

Book.prototype.setReadStatus = function(){
}

function openFormWindow(){
    inputContainer.classList.remove("hide");
}

function closeFormWindow(){
    inputContainer.classList.add("hide");
    author.value="";
    title.value="";
    pages.value="";
    read.value="";
}

function addBookToLibrary(){
    const book = new Book(author.value,title.value, pages.value, read.value);
    myLibrary.push(book);
    addBookToTableRow(book);
    closeFormWindow();
}

function removeBookFromLibrary(){
    myLibrary.filter(book =>{
        if (book["title"]+book["author"]==this.getAttribute("row_id")){
           let bookIndex = myLibrary.indexOf(book);
           myLibrary.splice(bookIndex,1);
        }
    })
   removeBookFromTableRow(this);
}

function displayLibrary(){

    myLibrary.forEach(book=>{
       addBookToTableRow(book);
    })
}

function addBookToTableRow(book){
    const tableRow = document.createElement("tr");
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("removeBtn");
    removeBtn.setAttribute("row_id",book["title"]+book["author"]);
    removeBtn.addEventListener("click",removeBookFromLibrary);
    
    for (let property in book){
        if(book.hasOwnProperty(property)){
            let td = document.createElement("td");
            td.textContent = book[property];
            tableRow.appendChild(td);
        }
        
    }

    tableRow.appendChild(removeBtn);
    tableRow.id = book["title"]+book["author"];
    tableOfBooks.appendChild(tableRow);
}

function removeBookFromTableRow(e){
    const childToRemove = document.getElementById(e.getAttribute("row_id"));
    tableOfBooks.removeChild(childToRemove);
}

const author = document.getElementById("author_name");
const title = document.getElementById("book_title");
const pages = document.getElementById("book_pages");
const read = document.getElementById("book_read");

const layout = document.querySelector(".grid-layout-wrapper");
const tableOfBooks = document.querySelector(".table-book");
const addBtn = document.querySelector(".addBtn");
addBtn.addEventListener("click",addBookToLibrary);

const inputContainer = document.querySelector(".input-container")

const showInputContainerBtn = document.querySelector(".show-input-container");
showInputContainerBtn.addEventListener("click",openFormWindow);

displayLibrary();