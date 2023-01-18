let notes = [];
let noteid = 1000;

//todo: More Options!

let localMemo = window.localStorage;
const NoteContainer = document.querySelector("#lab4Notes");
const Notes = [];
const tempNote = document.querySelector("#lab4NoteTemp");
const addNoteBtn = document.querySelector("#lab4AddNewNote");

addNoteBtn.addEventListener("click",addNote)

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
        this.content = this.dom.querySelector(".noteContent");
        this.title = this.dom.querySelector(".noteTitle");
        this.tagsContainer = this.dom.querySelector(".tagsContainer");

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
    //todo: togglePin
}
function deleteNote(){
    //todo: for Note container run from Note
}
function searchData(){
    
}
function saveNote(Note) {

}