const displayController = (()=>{

    const tableOfBooks = document.querySelector(".table-book");
    const inputContainer = document.querySelector(".input-container")
    const showInputContainerBtn = document.querySelector(".show-input-container");
    showInputContainerBtn.addEventListener("click",openFormWindow);
    
    function openFormWindow(){
        inputContainer.classList.remove("hide");
        const form = document.getElementById("book_form");
        form.addEventListener("submit", (e) => {libraryController.addBookToLibrary(e)});   
    }

    function closeFormWindow(){
        inputContainer.classList.add("hide");
    }

    function addBookToTableRow(book){
        
        const tableRow = document.createElement("tr");
        const removeBtn = document.createElement("button");
        const readBtn = document.createElement("button");
        removeBtn.classList.add("removeBtn");
        removeBtn.setAttribute("row_id",book.title + book.author);
        removeBtn.addEventListener("click",libraryController.removeBookFromLibrary);
        readBtn.addEventListener("click",libraryController.changeReadStatus);
        readBtn.setAttribute("row_id",book.title + book.author);
        readBtn.classList.add("read-btn");
        
        if(book.read=="yes"){
            readBtn.textContent="YES";
        }else{
            readBtn.textContent="NO";
            readBtn.classList.add("not-read");
        }
    
        for (let property in book){
            if(book.hasOwnProperty(property)&&property!="read"){
                let td = document.createElement("td");
                if(property=="pages"){
                    td.classList.add("td-small");
                }
                td.textContent = book[property];
                tableRow.appendChild(td);
            }
        }
        let tdReadBtn = document.createElement("td");
        tdReadBtn.classList.add("td-small");
        tdReadBtn.appendChild(readBtn);
        tableRow.appendChild(tdReadBtn);
        
        let tdRemoveBtn = document.createElement("td")
        tdRemoveBtn.classList.add("td-small");
        tdRemoveBtn.appendChild(removeBtn);
        tableRow.appendChild(tdRemoveBtn);
        
        tableRow.id = book.title + book.author;
        tableOfBooks.appendChild(tableRow);
    }

    function removeBookFromTableRow(e){
        const childToRemove = document.getElementById(e.getAttribute("row_id"));
        tableOfBooks.removeChild(childToRemove);
    }

    return {openFormWindow,closeFormWindow,addBookToTableRow,removeBookFromTableRow};
})();

const libraryController = (()=>{

    let myLibrary = [];
    
    function Book(author,title,pages,read) {
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.read = read;
      }

    function addBookToLibrary(e){
        e.preventDefault();
        const author = document.getElementById("author_name");
        const title = document.getElementById("book_title");
        const pages = document.getElementById("book_pages");
        const read = document.querySelector("input[name=read]:checked"); 
    
        const book = new Book(author.value, title.value, pages.value, read.value);
        myLibrary.push(book);
        localStorage.setItem("library",JSON.stringify(myLibrary));
        displayController.addBookToTableRow(book);
        displayController.closeFormWindow();
        author.value="";
        title.value="";
        pages.value="";
    }
    
    function removeBookFromLibrary(){
     
        myLibrary.filter(book =>{
            if (book.title + book.author==this.getAttribute("row_id")){
               let bookIndex = myLibrary.indexOf(book);
               myLibrary.splice(bookIndex,1);
            }
        })
        localStorage.setItem("library",JSON.stringify(myLibrary));
        displayController.removeBookFromTableRow(this);
    }
    
    function changeReadStatus(){
    
        myLibrary.filter(book =>{
            if(book.title + book.author==this.getAttribute("row_id")){
                if(book.read=="yes"){
                    book.read="no";
                    this.textContent="NO";
                    this.classList.add("not-read");
                }else{
                    book.read="yes";
                    this.textContent="YES";
                    this.classList.remove("not-read");
                }
            }
            localStorage.setItem("library",JSON.stringify(myLibrary));
        });
    }

    return{addBookToLibrary,removeBookFromLibrary,changeReadStatus,myLibrary}

})();

const initLocalStorage = (()=>{
    const storage = JSON.parse(localStorage.getItem("library"));
    storage.forEach(book=>{
       displayController.addBookToTableRow(book);
       libraryController.myLibrary.push(book);
    })
})();