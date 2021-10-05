function createUser(pseudo, password, mail){
    db.user.insert({
        "pseudo": pseudo,
        "password": password,
        "mail": mail,
    })
}

function listUser(){
    db.user.find({})
}

function modifyUser(pseudo, password, mail){
    db.user.update({
        "pseudo": pseudo,
        "password": password,
        "mail": mail,
    })
}

function deleteUser(){
    db.user.remove({})
}