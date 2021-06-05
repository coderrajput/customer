import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';


const CustomerContext= React.createContext();


export function useCustomers() {
    return useContext(CustomerContext);
}

function sortArray(){

}

function findTotal(lists){
    let fetchLists=[...lists];
    if(fetchLists.length>0){

        fetchLists.forEach(element => {

          

                let bids= element.bids;
                let sum=0;
                let amount=[];
               
                if(bids.length>0){
                    bids.forEach(el=>{
                         amount.push(parseInt(el.amount));
                    });

                  
                                element.minimum= Math.min(...amount);
                                element.maximum= Math.max(...amount);
                                 amount.forEach(el1=>{sum+=el1});
                                element.total=sum;
                }
                else{
                    element.minimum= 0;
                    element.maximun= 0;
                    element.total=0;
                    
                }
                element.hasPremium=element.hasPremium.toString();
                element.bid=element.maximum;
                
               
        });

        return fetchLists;
    }
}

export default function CustomersProvider(props) {

    let [customers,setCustomers]=useState([]);

    let [loading,setLoading]= useState(true);

    useEffect(()=>{
        let list=[];
        axios.get('https://intense-tor-76305.herokuapp.com/merchants').then((response)=>{
                if(response.status===200){
                    
                    list=[...findTotal(response.data)];  
                    //console.log(list) 
                    setCustomers(list);
                    setLoading(false);
                   
                }
        })
    },[]);
    return (
        <CustomerContext.Provider value={customers}>
            {props.children}
        </CustomerContext.Provider>
    )
}
