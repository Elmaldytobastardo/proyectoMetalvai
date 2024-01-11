import React from 'react'
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css";

const Datagrid = (props) => {
  return (

    <>

<div className="ag-theme-quartz w-[51rem] lg:h-full " >
    <AgGridReact rowData={props.rowData} 
    columnDefs={props.columnDefs} 
    pagination={true} 
    paginationPageSize={10} 
    paginationAutoPageSize={true} />
</div>

    </>
   


  )
}

export default Datagrid