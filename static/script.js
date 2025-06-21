var editingBookId = document.getElementById("book-id") ;
// selecting add button , popup overlay , popup
var add = document.getElementById("add-popup")
var popover = document.querySelector(".pop-overlay")
var popup  = document.querySelector(".pop_box")
var cancelpop = document.getElementById("cancel-popup")

var saveBook = document.getElementById("save-book");
var container = document.querySelector(".container")
var title = document.getElementById("book-title")
var author = document.getElementById("author")
var year = document.getElementById("year")
var dis = document.getElementById("Description")


add.addEventListener("click",function(){
    editingBookId.value = "",
    title.value = "";
    author.value = "";
    year.value = "";
    dis.value = "";
    popover.style.display="block"
    popup.style.display="block"
})

cancelpop.addEventListener("click",function(event ){
    event.preventDefault()
    popover.style.display="none"
    popup.style.display="none"
})

// select container , add book , book input , author , discription


saveBook.addEventListener("click",async function(event){
    event.preventDefault()
    
    const bookData = {
        title:title.value,
        author:author.value,
        year:year.value,
        description:dis.value
    };
// saveBook.addEventListener("click", function(event) {
//     event.preventDefault();
//     alert("Save button clicked");  // For debugging
// });
    // if editing
    if (editingBookId){
        const res = await fetch(`/books/${editingBookId}`,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(bookData)
        });
        if (res.ok){
            location.reload();
        }
    }
    else{
        const res = await fetch('/books',{
           method:"POST",
           headers:{"Content-Type":"application/json"},
           body:JSON.stringify(bookData)
        });
        if (res.ok){
             const newBook = await res.json();
             createBookCard(newBook); // show new card
            }
    }
    popover.style.display="none"
    popup.style.display="none"
});

  function createBookCard(book){
    var div  = document.createElement("div")
    div.setAttribute("class","box-container")
    div.innerHTML=` <h2>${book.title}</h2>
            <h5>${book.author}</h5>
            <h5>${book.year}</h5>
            <p>${book.description} </p>
            `;

const deleteBtn = document.createElement("button");
deleteBtn.textContent = "Delete";
deleteBtn.classList.add("del");
deleteBtn.addEventListener("click", () => deleteBook(book.id));

var editBtn = document.createElement("button");
editBtn.textContent = "Edit";
editBtn.classList.add("edit");
editBtn.addEventListener("click", () => editBook(book.id));

div.appendChild(deleteBtn);
div.appendChild(editBtn);
container.appendChild(div);
  }
            
  function editBook(id){
                
    fetch(`/books/${id}`)
            .then(res => res.json())
            .then(book => {
                editingBookId = book.id;
                title.value = book.title;
                author.value = book.author;
                year.value = book.year;
                dis.value = book.description;

                popover.style.display = "block";
                popup.style.display = "block";
            });
    }
            
        

function deleteBook(id){
    fetch(`/books/${id}`,{
        method:"DELETE"
    }).then(()=>{
        location.reload();
    });
    
}
// Fetch and show all books on page load
window.onload = async function () {
    const res = await fetch('/books');
    const books = await res.json();

    books.forEach(book => {
        createBookCard(book);
    });
};
