let myLibrary = [new Book("J.K. Rowling","Harry Potter", 290, true),new Book("J.K. Rowling","Harry Potter 2", 124, true)];

function Book(author,title,pages,read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

Book.prototype.setReadStatus = function(){
    
}

function addBookToLibrary() {
    const book = new Book(author.value,title.value, pages.value, read.value);
    myLibrary.push(book);

    const row = document.createElement("tr");

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Delete";
    removeBtn.setAttribute("row_id",book["title"]+book["author"]);
    removeBtn.addEventListener("click",removeBookFromLibrary);
    
    for (let property in book){
        if(book.hasOwnProperty(property)){
            let td = document.createElement("td");
            td.textContent = book[property];
            row.appendChild(td);
        }
    }

    row.appendChild(removeBtn);
    row.id = book["title"]+book["author"];
    tableOfBooks.appendChild(row);
}

function removeBookFromLibrary(){
    myLibrary.filter(book =>{
        if (book["title"]+book["author"]==this.getAttribute("row_id")){
           let bookIndex = myLibrary.indexOf(book);
           myLibrary.splice(bookIndex,1);
        }
    })

    const childToRemove = document.getElementById(this.getAttribute("row_id"));
    tableOfBooks.removeChild(childToRemove);
}

function displayLibrary(){

    myLibrary.forEach(book=>{
        const row = document.createElement("tr");
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Delete";
        removeBtn.setAttribute("row_id",book["title"]+book["author"]);
        removeBtn.addEventListener("click",removeBookFromLibrary);

        for (let property in book){
            if(book.hasOwnProperty(property)){
                let td = document.createElement("td");
                td.textContent = book[property];
                row.appendChild(td);
            }
        }
    
        row.appendChild(removeBtn);
        row.id = book["title"]+book["author"];
        tableOfBooks.appendChild(row);
    })

}

const author = document.getElementById("author_name");
const title = document.getElementById("book_title");
const pages = document.getElementById("book_pages");
const read = document.getElementById("book_read");

const tableOfBooks = document.querySelector(".table-book");
const btn = document.querySelector("button");
btn.addEventListener("click",addBookToLibrary);

displayLibrary();