function createSubejct(id_user, title){
    db.user.insert({
        "id_user": id_user,
        "title": title,
    })
}

function listSubject(){
    db.user.find({})
}

function modifySubject(id_user, title){
    db.user.update({
        "id_user": id_user,
        "title": title,
    })
}

function deleteSubject(){
    db.user.remove({})
}