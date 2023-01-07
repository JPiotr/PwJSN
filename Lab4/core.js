let notes = [];
let noteid = 1000;
class Note {
    title = '';
    content = '';
    color = '#FFFFFF';
    pin = false;
    timestamp = undefined;
    tags = [];
    alertDate = undefined;
    parent = document;
    id = 0;

    constructor(title, content, color, pin, Parent) {
        this.title = title;
        this.content = content;
        this.pin = pin;
        this.timestamp = Date.now();
        this.parent = Parent;
        this.id = noteid;
        noteid ++;
        this.color = color;
        if(pin === true){
            this.id -= 1000;
        }
    }

    addTag(tag){
        this.tags.push(tag);
    }


}

class NoteDOM {
    Note = new Note("test","test","#000",false,document);
    container = "<div class='noteContainer' style='background-color: "
        + this.Note.color +
        "'>" +
        "<input type='checkbox' class='pin'>" +
        "<input class='alertDate' type='date'/>" +
        "<input class='textArea' type='text'/>" +
        "<div class='tags'></div>" +
        "</div>"

    doc = document.createElement('div');

    constructor(Note = null) {
        if(Note != null){
            this.Note = Note;
        }

        this.container = "<div class='noteContainer' style='background-color: "
            + this.Note.color +
            "'>" +
            "<input type='checkbox' class='pin'>" +
            "<input class='alertDate' type='date'/>" +
            "<input class='textArea' type='text'/>" +
            "<div class='tags'></div>" +
            "</div>";

        this.doc = document.createElement('div');
        this.doc.innerHTML = this.container;
    }
}

function addNodes(){
    notes.sort((a,b) => {if(a.id > b.id){return 1}if (a.id < b.id){return -1} return 0})
    for (const note in notes) {
        document.getElementById('body').append(note.doc);
    }
}