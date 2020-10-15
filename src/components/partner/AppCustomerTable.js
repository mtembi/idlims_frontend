import React, {useEffect, useRef} from 'react';
import {
    ColumnDirective,
    ColumnsDirective,
    ExcelExport,
    GridComponent,
    Inject,
    Page,
    Search,
    Selection,
    Toolbar, VirtualScroll, Sort, Filter
} from "@syncfusion/ej2-react-grids";

const AppCustomerTable = () => {
    const gridRef = useRef(null);
    const pageSettings = {
        pageCount: 6,
        pageSizes: true
    };
    const selectionSetting = {
        type: 'Single',
        mode: 'Row'
    };
    const toolbarOptions = ['Add', 'Edit', 'Excel', 'Search'];
    const dummyData = [];
    let selectedRecord = null;
    useEffect(() => {
        for (let i = 0; i < 20; i++) {
            dummyData.push(
                {
                    id: i,
                    partner_ref: "CUST" + i,
                    partner_name: "Customer " + i,
                    partner_tel: Math.round(Math.random() * 10000000),
                    active_status: true,
                    create_date: [2020, 10, 10]
                }
            )
        }
    }, []);
    const handleRowSelected = () => {

    };
    const handleRowDeselect = () => {
        selectedRecord = null;
    };

    const handleToolbarClick=()=>{

    };

    return (
        <GridComponent
            ref={gridRef}
            dataSource={dummyData}
            pageSettings={pageSettings}
            allowPaging={false}
            height={"350"}
            rowSelected={handleRowSelected}
            rowDeselected={handleRowDeselect}
            toolbar={toolbarOptions}
            toolbarClick={handleToolbarClick}
            enableColumnVirtualization={true}
            enableVirtualization={true}
            allowFiltering={true}
            allowExcelExport={true}
            selectionSettings={selectionSetting}>
            <ColumnsDirective>
                <ColumnDirective field="id" headerText="Id" width="80" isPrimaryKey={true}/>
                <ColumnDirective field="partner_ref" headerText="Item"/>
                <ColumnDirective field="partner_name" headerText="Uom"/>
                <ColumnDirective field="partner_tel" headerText="In"/>
                <ColumnDirective field="active_status" headerText="Out"/>
                <ColumnDirective field="create_date" headerText="Date"/>
            </ColumnsDirective>
            <Inject services={[Page, Selection, Toolbar, Search, ExcelExport, VirtualScroll, Sort, Filter]}/>
        </GridComponent>
    )
};

export default AppCustomerTable;