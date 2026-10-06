const addBook = document.getElementById("add-book-button");
const dialog = document.getElementById("book-dialog");
const container = document.getElementById("container");
const form = document.getElementById("book-form");

const themeToggle = document.getElementById("themeToggle");
const cancelButton = document.getElementById("cancel-button");
const clearLibraryButton = document.getElementById("clearLibraryBtn");


const myLibrary = [];

// ADDING BOOK TO THE OBJECT //
function Book(title, author, pages, read){
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function(){
  this.read = !this.read;
};


function addBookToLibrary(title, author, pages, read){
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

// DISPLAYING THE BOOK IN THE SCREEN //
function displayLibrary(array){
  container.replaceChildren();
  
  for(let i = 0; i < array.length; i++){
    const book = array[i];

    const card = document.createElement("div");
    card.classList.add("book-card");
    card.dataset.bookId = book.id;

    const title = document.createElement("h3");
    title.textContent = `Title: ${book.title}`;
    title.classList.add("book-title")
    card.appendChild(title);

    const author = document.createElement("p");
    author.textContent = `Author: ${book.author}`;
    author.classList.add("book-author")
    card.appendChild(author);

    const pages = document.createElement("p");
    pages.textContent = `Pages: ${book.pages}`;
    pages.classList.add("book-pages");
    card.appendChild(pages);


    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer");
    card.appendChild(cardFooter);

    const label = document.createElement("label");
    label.classList.add("checkbox-container");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = book.read;

    checkbox.addEventListener("change",function(){
      book.toggleRead();
      displayLibrary(myLibrary);
    }
    )
    label.append(checkbox, " Read Status");

    cardFooter.appendChild(label);
    // DIALOG CONTROLS //
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("btn-remove")
    cardFooter.appendChild(removeButton);

      removeButton.addEventListener("click", function(){
        const currentBookId = card.dataset.bookId;

        const index = myLibrary.findIndex(function(book){
        return book.id === currentBookId;
        });

        myLibrary.splice(index,1);
        displayLibrary(myLibrary);

      });
    
    container.appendChild(card);
  }
};

// FORM //

form.addEventListener("submit", function(event){
event.preventDefault();
const title = document.getElementById("title").value;
const author = document.getElementById("author").value;
const pages = Number(document.getElementById("pages").value);
const read = document.getElementById("read").checked;

addBookToLibrary(title, author, pages, read);
displayLibrary(myLibrary);
form.reset();
dialog.close();
});


addBook.addEventListener("click", function(){
  dialog.showModal();
})

cancelButton.addEventListener("click",function(){
  form.reset();
  dialog.close();
})

themeToggle.addEventListener("click",function(){
  const currentTheme = document.body.dataset.theme;

  if (currentTheme === "dark"){
    document.body.dataset.theme = "light";
  } else {
    document.body.dataset.theme = "dark";
  }
})

clearLibraryButton.addEventListener("click",function(){
  myLibrary.splice(0, myLibrary.length);

  displayLibrary(myLibrary);
})

displayLibrary(myLibrary);