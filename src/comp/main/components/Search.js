import { collection, getDocs, query, where } from 'firebase/firestore';
import { useState } from 'react';
import {BsSearch} from 'react-icons/bs';
import { db } from '../../../firebase/Firebase';

const Search = ({setResult}) => {
    const [search,setSearch]=useState("");

    const searchUser=async(e)=>{
        if(e.code==="Enter"){
            const resultArray=[];
            console.log(search);
            const parms=search.toLowerCase();
            const q=query(collection(db,"user"),where("name","==",parms));
            const response=await getDocs(q);
            console.log(response.docs);
            if(response.docs.length!==0){
                response.forEach((doc)=>{
                    resultArray.push(doc.data());
                })
            }

            setResult(resultArray);
            setSearch("");
        }
   
    }
    return ( 
        <div className="contact-head">
            <div className="box" onKeyDown={searchUser}>
                <label htmlFor="search"><BsSearch/></label>
                <input type="text" placeholder='Search user'
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                />
            </div>
        </div>
    );
}
 
export default Search;