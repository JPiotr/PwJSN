let noteid = 1000;

let localMemo = window.localStorage;
const NoteContainer = document.querySelector("#lab4Notes");
const Notes = [];
const tempNote = document.querySelector("#lab4NoteTemp");
const addNoteBtn = document.querySelector("#lab4AddNewNote");
const searchBar = document.querySelector("#searchBar");

addNoteBtn.addEventListener("click",addNote);
searchBar.addEventListener('input',searchData);

class Note {
    title = '';
    content = '';
    color = '#FFFFFF';
    pin = false;
    timestamp = undefined;
    tags = [];
    alertDate = undefined;
    parent = NoteContainer;
    // borderColor = "#FFFFFF";
    id = 0;

    constructor(title, content, color, pin) {
        this.title = title;
        this.content = content;
        this.pin = pin;
        this.timestamp = Date.now();
        this.date = new Date();
        this.id = noteid;
        noteid ++;
        this.color = color;
        // this.borderColor = this.color + "80";
        if(pin === true){
            this.id -= 1000;
        }
    }

    addTag(tag){
        this.tags.push(tag);
    }

}

class NoteDOM {
    dom = document.createElement("div");
    pin = document.createElement("input");
    btn = document.createElement("button");
    content = document.createElement("input");
    title = document.createElement("input");
    tagsContainer = document.createElement("div");
    Note = new Note("",false,"","");
    color = document.querySelector("#lab4NoteColor").value;

    constructor(note = null) {

        this.dom = tempNote.cloneNode(true);
        this.dom.id = "";
        this.dom.style.backgroundColor = this.color;

        // this.dom.style.borderColor = this.Note.borderColor;
        this.pin = this.dom.querySelector(".notePin");
        this.pin.addEventListener('click',togglePin);

        this.btn = this.dom.querySelector(".deleteNote");
        this.btn.addEventListener('click',deleteNote);


        this.content = this.dom.querySelector(".noteContent");
        // this.content.addEventListener("input",updateContent);

        this.date = this.dom.querySelector(".noteDate");
        // this.date.addEventListener("input",updateDate);

        this.title = this.dom.querySelector(".noteTitle");
        // this.title.addEventListener("input",updateTitle);

        this.tagsContainer = this.dom.querySelector(".noteTags");
        // this.tagsContainer.addEventListener("input",updateTags);

        if(note != null){
            this.Note = note;
        }
        else {
            if(this.pin.checked){
                this.Note = new Note(
                    this.title.value,
                    this.content.value,
                    this.color,
                    true,
                )
            }
            else{
                this.Note = new Note(
                    this.title.value,
                    this.content.value,
                    this.color,
                    false,
                )
            }
        }
        this.dom.id = "N"+this.Note.id;
        if(this.date.value == ""){
            this.date.value = this.Note.date.getFullYear() +"-"+ this.Note.date.getMonth()+1 +"-"+ this.Note.date.getDate();
        }
        else{
            this.Note.date = new Date(this.date.value);
        }
        this.Note.tags.push(...this.tagsContainer.value.split(','));

        NoteContainer.append(this.dom);
    }
}

function updateNotesUI(){
    let sortedNotes = Notes.sort((a,b) => {if(a.Note.id > b.Note.id){return 1}if (a.Note.id < b.Note.id){return -1} return 0});
    NoteContainer.innerHTML = "";
    for (const note of sortedNotes) {
        NoteContainer.append(note.dom);
    }
}

function addNote(){
    Notes.push(new NoteDOM())
    updateNotesUI()
}

function togglePin(){
    let note = Notes.find(x => x.dom.id == this.parentElement.parentElement.id);

    if(!this.checked){
        note.Note.id += 1000;
    }
    else{
        note.Note.id -= 1000;
    }
    note.dom.id = "N"+note.Note.id;
    updateNotesUI()
    // console.log(this.parentElement.parentElement.id);
}
function searchData(){
    if(this.value == ""){
        updateNotesUI()
        return;
    }
    let sortedNotes = Notes.filter(p =>
        p.Note.title.includes(this.value) ||
        p.Note.content.includes(this.value) ||
        p.Note.date.toLocaleDateString().includes(this.value)
        //todo: sorting by tags
        // ||
        // this.value.includes(...p.Note.tags)
    );
    NoteContainer.innerHTML = "";
    for (const note of sortedNotes) {
        NoteContainer.append(note.dom);
    }
}
function deleteNote(){
    let note = Notes.findIndex(x => x.dom.id == this.parentElement.parentElement.id);
    Notes.splice(note,1);
    updateNotesUI()
}
function saveNote(Note) {

}

// function updateTitle(){
//     let note = Notes.find(x => x.dom.id == this.parentElement.parentElement.id);
//     note.Note.title = this.value;
//     updateNotesUI()
// }
// function updateContent(){
//     let note = Notes.find(x => x.dom.id == this.parentElement.parentElement.id);
//     note.Note.content = this.value;
//     updateNotesUI()
// }
// function updateDate(){
//     let note = Notes.find(x => x.dom.id == this.parentElement.parentElement.id);
//     note.Note.date = new Date(this.date.value);
//     updateNotesUI()
// }
// function updateTags(){
//     let note = Notes.find(x => x.dom.id == this.parentElement.parentElement.id);
//     note.Note.tags = [];
//     note.Note.tags = note.Note.tags.push(...this.tagsContainer.value.split(','));
//     updateNotesUI()
// }

//todo: add some async save and load notes