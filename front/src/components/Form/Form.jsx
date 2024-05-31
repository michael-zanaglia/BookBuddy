import React, { useEffect, useState } from "react";
import Inputs from "./Inputs/Inputs";
import Button from "./Button/Button";
import { fetchPost } from "../../utils/fetch";
import { set } from "mongoose";

export default function Form() {
    const [putMsg, setMsg] = useState(null)
    const [preview, setPrev] = useState(null)
    const [formDatas, setFormDatas] = useState(null)
    const [forms, setForms] = useState(null)
    const [validate, setValidate] = useState(false)

    const handleForm = async(e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        let imgForm = formData.get("iconLivre");
        console.log(imgForm)
        if (imgForm.name !== '') {
            console.log(imgForm.name)
            //imgForm = URL.createObjectURL(imgForm);
            console.log(imgForm)
            const reader = new FileReader();
            reader.onloadend = () => {
                setPrev(reader.result);
                setFormDatas(formData);
                setForms(form);
                setValidate(true);
            };      
            reader.readAsDataURL(imgForm);
            console.log(preview)
        } else {
            setPrev('None');
            setFormDatas(formData);
            setForms(form);
            setValidate(true);
        }
    } 

    useEffect(() => {

        async function goToMongo(){
            const titleForm = formDatas.get("title");
            const authorForm = formDatas.get("author");
            const pageForm = formDatas.get("pageNumber");
            const stateForm = formDatas.get("state");
            const category = formDatas.get("category");
            if (titleForm !== '' && authorForm !== '' && pageForm !== '' && stateForm !== '') {
                console.log("CEST PASSE")
                const takeBack = await fetchPost(titleForm, authorForm, stateForm, pageForm, preview, category);
                setMsg(takeBack.msg);
                console.log(takeBack, "BIEN RECU")
                forms.reset()
            } else {
                const takeBack = true;
                setMsg(takeBack);
                console.log(takeBack, "BIEN RECU")
            };  
        }
        
        if (validate) {
          goToMongo()  
          setValidate(false)
        }
        
        
        
    }, [validate, preview, forms, formDatas])

    return (
        <>
            <form className="addBook" onSubmit={handleForm}>
                <h1>Ajouter vos livres préférés!</h1>
                <Inputs msg={putMsg}/>
                <Button msg={putMsg}/>
            </form>
        
            {preview ? <img src={preview} alt="cc"/> : null}
        </>
    )
}