import React from "react";

export default function Button( { msg } ){
    let content;
    if (msg === true){
        content = <p id="alert">Veillez à remplir tout les champs obligatoires !</p>
    } else if (msg === 'Added') {
        content = <p id="alert">Ajouter à la BDD</p>
    } else {
        content = <p id="alert"></p>
    }

    return (
        <>
            {content}
            <button id="btn-form" type="submit">Enregistrer</button>
        </>
    )
}