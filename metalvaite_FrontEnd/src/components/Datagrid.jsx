import React from 'react'
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  PlusCircleIcon 
} from "@heroicons/react/24/outline";

import {
    Card,
    CardHeader,
    Typography,
    Button,
    Input,
  } from "@material-tailwind/react";
const Datagrid = (props) => {

  
  return (

    <>
    
 <Card className="h-full w-full lg:w-[55rem] ">
  <CardHeader floated={false} shadow={false} className="rounded-none pt-2">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
                {props.nombre}
            </Typography>
       
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
              type='search'
                label="Buscar"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                onChange={props.onSearchTermChange}
              />
            </div>
            <Button className="flex items-center gap-3" color='green' size="sm" onClick={props.desplegableAgregarAbierto}>
              <PlusCircleIcon strokeWidth={2} className="h-4 w-4" /> {props.nomButton}
            </Button>
          </div>
        </div>
      </CardHeader>
<div className="ag-theme-quartz w-full h-full" >
    <AgGridReact rowData={props.filteredRowData} 
    columnDefs={props.columnDefs} 
    pagination={true} 
    paginationPageSize={10} 
    paginationAutoPageSize={true}

   />
</div>
</Card>
    </>
   


  )
}

export default Datagrid