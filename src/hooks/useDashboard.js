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
import { useEffect, useState } from "react";

const useDashboard = () => {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const [lastOneDayData, setLastOneDayData] = useState([]);
    const [lastOneHourData, setLastOneHourData] = useState([]);

    useEffect(() => {
        const fetchLastOneDayData = async () => {
            let d = new Date
            let endOneDay = [d.getDate(),
                      (d.getMonth()+1),
                       d.getFullYear()].join('/') +' ' +
                      [d.getHours(),
                       d.getMinutes(),
                       d.getSeconds()].join(':');
            let d1 = new Date();
            d1.setDate(d1.getDate()-1);
            let startOneDay = [d1.getDate(),
                (d1.getMonth()+1),
                d1.getFullYear()].join('/') +' ' +
                [d1.getHours(),
                 d1.getMinutes(),
                 d1.getSeconds()].join(':');
            const q = query(collection(db, "searches"), where("created_at", ">=", startOneDay), where('created_at', '<=', endOneDay));
            const docs = await getDocs(q);
            const finalPayload = formatPayload(docs.docs);
            setLastOneDayData(finalPayload);
        }
        const fetchLastOneHourData = async () => {
            let d = new Date
            let endOneHour = [d.getDate(),
                      (d.getMonth()+1),
                       d.getFullYear()].join('/') +' ' +
                      [d.getHours(),
                       d.getMinutes(),
                       d.getSeconds()].join(':');
            let d1 = new Date();
            d1.setHours(d1.getHours()-1);
            let startOneHour = [d1.getDate(),
                (d1.getMonth()+1),
                d1.getFullYear()].join('/') +' ' +
                [d1.getHours(),
                 d1.getMinutes(),
                 d1.getSeconds()].join(':');
            const q = query(collection(db, "searches"), where("created_at", ">=", startOneHour), where('created_at', '<=', endOneHour));
            const docs = await getDocs(q);
            const finalPayload = formatPayload(docs.docs);
            setLastOneHourData(finalPayload);
        }

        fetchLastOneDayData();
        fetchLastOneHourData();
    },[JSON.stringify(lastOneDayData)]);

    const formatPayload = (docs) => {
        var filteredPayload = [];
        docs.forEach((doc) => {
            var data = doc._document.data.value.mapValue.fields;
            var obj = {
                id: data.id.stringValue,
                query: data.query.stringValue,
                created_at: data.created_at.stringValue
            }
            filteredPayload.push(obj);
        });
        return filteredPayload;
    }
    return {
        lastOneDayData,
        lastOneHourData
    }
}

export default useDashboard;