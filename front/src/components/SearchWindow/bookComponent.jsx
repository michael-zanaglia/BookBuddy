import Search from "./Search/Search"
import Content from "./Content/Content"
import React, { useState, useContext, useEffect  } from "react"

//export const FavContext = React.createContext();

export default function BookComponent({ l }){
    const [result, setResult] = useState([])
    const [isFavoris, setIsFavoris] = useState(l)


    function Case() {
        return result.map((element, index) => (
            //Les donnes en favoris proviennent d'un agregate. Il s'agit d'une liste donc les elements n'ont pas le meme type. Il faut donc gerer cela.
            <Content key={index} index={index} datas={l === 0 ? element : element[0]}/>
           
            
        ))
        
    };

    return (
        <>
            <Search getResult={setResult} lk={isFavoris}/> 
            <div className="search-box"> 
                {Case()}
            </div> 
        </>
        
        
    )   
}