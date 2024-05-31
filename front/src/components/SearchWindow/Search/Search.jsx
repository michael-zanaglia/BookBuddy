import { useEffect, useState } from "react"
import { fetchGet, fetchGetAll, fetchGetFav } from "../../../utils/fetch";

export default function Search({ getResult, lk }) {
    const [input, setInput] = useState('');

    function handleChange(e){
        setInput(e.target.value)
    }

    useEffect(()=>{
        async function getMyCompletion(){
            let datas = await fetchGet(input);
            console.log(datas.value, "----------------------------");
            getResult(datas.value)
        };
        if (lk === 0){
            if (input !== ''){
                getMyCompletion();
            } else {
                async function getAllData(){
                    let getAll = await fetchGetAll()
                    console.log(getAll.value, "++++++++++++++++++++++++++++");
                    getResult(getAll.value)
                }
                getAllData();
            }; 
        }
       
    }, [input])

    useEffect(() => {
        async function getAllData(){
            let getAll = await fetchGetAll()
            console.log(getAll.value, "^^^^^^^^^^^^^^^");
            getResult(getAll.value)
        }

        async function getAllFav(){
            let getAll = await fetchGetFav()
            console.log(getAll.value, "++++++++++++++++++++++++++++");
            getAll = getAll.value.map(element => element.book)
            console.log(getAll, "+++++++++++++§§§§§§§§§§§§§§");
            getResult(getAll)
        }
        console.log(lk,'???????????????????????????????????????????????????')
        if (lk === 0) {
            getAllData();
        } else {
            getAllFav();
        }
        
    }, [])
    
    return (
        <div className="search-bar-box">
            {lk === 0 ? <input type="text" onChange={handleChange}/> : null}
        </div>
    )
    
}