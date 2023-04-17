import { useCallback, useState } from "react";
import axios from 'axios';
import { initializeApp } from "firebase/app";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";
import firebaseConfig from "../firebaseConfig";

const useSearch = (props) => {
    const { searchQuery } = props;
    const [ searchResult, setSearchResult ] = useState([]);
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const search = useCallback(() => {
        //console.log(searchQuery);
        if(searchQuery) {
            axios
            .get(`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`, {
                headers: {
                    Accept: 'application/json'
                }
            })
            .then((res) => {
                //console.log(res);
                setSearchResult(res?.data?.query?.search);
                var d = new Date
                var dformat = [d.getDate(),
                          (d.getMonth()+1),
                           d.getFullYear()].join('/') +' ' +
                          [d.getHours(),
                           d.getMinutes(),
                           d.getSeconds()].join(':');
                addDoc(collection(db, "searches"), {
                    id: Array.from(Array(28), () => Math.floor(Math.random() * 36).toString(36)).join(''),
                    query: searchQuery,
                    created_at: dformat
                });
            })
            .catch((err) => console.log(err));
        }
    },[searchQuery, searchResult]);

    return {
        search,
        searchResult
    }
}

export default useSearch;