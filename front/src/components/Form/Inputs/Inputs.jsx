import React from "react";

function Inputs( { msg, prv } ){
    let style = {
        overflow : 'hidden',
        width : '100px',
        height : '100px'
    }
    return (
        <>
            <div className="label-form">
                <label htmlFor="title">*Titre de L'oeuvre :</label>
                <input type="text" id="title-form" name="title" placeholder="Titre..."/>
                {msg === 11000 ? <p id="alert">L'oeuvre existe deja dans notre base de donnée !</p>: <p></p>}
            </div>
            
            <div className="flex-form">
                <div className="label-form">
                    <label htmlFor="author">*Nom de l'auteur :</label> 
                    <input type="text" id="author-form" name="author" placeholder="Auteur..."/> 
                    {msg === 11000 ? <p id="alert">L'oeuvre existe deja dans notre base de donnée !</p>: <p></p>}       
                </div>
                <div className="label-form">
                    <label htmlFor="state">*Statut du livre :</label>
                    <input type="text" id="state-form" name="state" placeholder="à lire/en cours/finis..."/>
                </div>
                
            </div>
            <div className="flex-form">
                <div className="label-form">
                    <label htmlFor="pageNumber">*Nbr pages :</label>
                    <input type="text" id="numPage-form" name="pageNumber"/>
                    {msg === 'NaN' ? <p id="alert">Entrez un caractère numérique</p>: <p></p>}
                </div>
                <div className="download-box-form"><input type="file" id="download" name="iconLivre" accept="image/png, image/jpeg, image/jpg"/></div>
                <select name="category" id="category">
                    <option value="">--Category--</option>
                    <option value="Autofiction">Autofiction</option>
                    <option value="Bande-déssinée">Bande-déssinée</option>
                    <option value="Biographie">Biographie</option>
                    <option value="Essai">Essai</option>
                    <option value="Light Novel">Light Novel</option>
                    <option value="Littérature pour enfants">Littérature pour enfants</option>
                    <option value="Livre académique et éducatif">Livre académique et éducatif</option>
                    <option value="Livre religieux et spirituel">Livre religieux et spirituel</option>
                    <option value="Manuel et guide pratique">Manuel et guide pratique</option>
                    <option value="Manga">Manga</option>
                    <option value="Nouvelle">Nouvelle</option>
                    <option value="Poésie">Poésie</option>
                    <option value="Roman">Roman</option>
                    <option value="Roman documentaire">Roman documentaire</option> 
                    <option value="Théâtre">Théâtre</option>
                </select>
            </div>
        </>
        
    )
}

export default Inputs;