import React ,{useState, useEffect}from 'react'
import {useCustomers} from '../context/CustomersProvider';
import StickyHeadTable from './StickyHeadTable';

export default function Customers() {
    let list=useCustomers(); 

    console.log('prateek')
    return (
        <div>
           <StickyHeadTable customers={list} />
        </div>
    )
}
