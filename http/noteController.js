function createNote(id_subject, title, text, image){
    db.note.insert({
        "id_subject": id_subject,
        "title": title,
        "text": text,
        "image": image,
    })
}

function listNote(id_subject){
    db.note.find({
        "id_subject": id_subject,
    })
}

function modifyNote(id_subject, title, text, image){
    db.note.update({
        "id_subject": id_subject,
        "title": title,
        "text": text,
        "image": image,
    })
}

function deleteNote(){
    db.note.remove({})
}