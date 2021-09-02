//when you click the ADD NOTE button
showNotes();
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let Myobj = {
        title: addTitle.value,
        Txt: addTxt.value
    }
    notesObj.push(Myobj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    console.log(notesObj);
    showNotes();
})
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
     <div class=" noteCard my-2 mx-2 card border-warning border-4" style="width: 18rem;">
        <div class="card-body ">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.Txt}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary border-dark border-3">Delete notes</button>
        </div>
     </div>
`;
    })
    let notesElm = document.getElementById("notes");
    if (notesObj.length !== 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = "<b><i>Notes collection section is empty plz write some text and click on the Add Note button to add your notes</i></b>";
    }
}
function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
    let inputval = search.value.toLowerCase();
    let noteCard = document.getElementsByClassName("noteCard");
    Array.from(noteCard).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if (cardTxt.includes(inputval)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
});