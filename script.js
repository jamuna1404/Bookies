// selecting add button , popup overlay , popup
var add = document.getElementById("add-popup")
var popover = document.querySelector(".pop-overlay")
var popup  = document.querySelector(".pop_box")

add.addEventListener("click",function(){
    popover.style.display="block"
    popup.style.display="block"
})

var cancelpop = document.getElementById("cancel-popup")

cancelpop.addEventListener("click",function(event ){
    event.preventDefault()
    popover.style.display="none"
    popup.style.display="none"
})

// select container , add book , book input , author , discription

var addbook = document.getElementById("add-book")
var container = document.querySelector(".container")
var tittle = document.getElementById("book-tittle")
var author = document.getElementById("author")
var dis = document.getElementById("Description")

addbook.addEventListener("click",function(event){
    event.preventDefault()
    var div  = document.createElement("div")
    div.setAttribute("class","box-container")
    div.innerHTML=` <h2>${tittle.value}</h2>
            <h5>${author.value}</h5>
            <p>${dis.value} </p>
             <button onclick="deletebook(event)">Delete</button>`
    container.append(div)
    popover.style.display="none"
    popup.style.display="none"
})

function deletebook(event){
    event.target.parentElement.remove()
}
