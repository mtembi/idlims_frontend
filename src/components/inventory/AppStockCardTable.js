import React, {useRef, useEffect} from 'react';
import {ColumnDirective, ColumnsDirective, GridComponent, Inject, Page, Selection, Toolbar, Search, ExcelExport} from "@syncfusion/ej2-react-grids";

const AppStockCardTable = () => {
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
                    inventory: {
                        id: i,
                        invRef: "Item" + i,
                        invName: 'Item Name' + i,
                        invDesc: "Some Long Text about the item",
                        invCurrQty: Math.round(Math.random() * 1000),
                        invMinQty: 10,
                        invMaxQty: 1000,
                        createDate: [2019, 10, 10],
                        activeStatus: true,
                        uom: {id: i, uomName: "Kilogram", uomShort: "Kg"}
                    },
                    warehouse: {id: i, wh_name: "WH" + i, active_status: true},
                    uom: {id: i, uomName: "Kilogram", uomShort: "Kg"},
                    qty_in: Math.round(Math.random() * 1000),
                    qty_out: Math.round(Math.random() * 1000),
                    txn_date: [2020, 10, 10]
                }
            )
        }
    }, []);
    const handleRowSelected = () => {
        //TODO remove this; removes browser warning
        console.log(selectedRecord);
    };
    const handleRowDeselect = () => {
        selectedRecord = null;
    };

    return (
        <div className="control-pane">
            <div className="control-section">
                <GridComponent
                    ref={gridRef}
                    dataSource={dummyData}
                    pageSettings={pageSettings}
                    allowPaging={true}
                    rowSelected={handleRowSelected}
                    rowDeselected={handleRowDeselect}
                    toolbar={toolbarOptions}
                    enableColumnVirtualization={true}
                    enableVirtualization={true}
                    allowExcelExport={true}
                    selectionSettings={selectionSetting}>
                    <ColumnsDirective>
                        <ColumnDirective field="id" headerText="Id" width="80" isPrimaryKey={true}/>
                        <ColumnDirective field="inventory" headerText="Item" foreignKeyField={"id"} foreignKeyValue={"invName"}/>
                        <ColumnDirective field="uom" headerText="Uom"/>
                        <ColumnDirective field="qty_in" textAlign="Right" headerText="In"/>
                        <ColumnDirective field="qty_out" textAlign="Right" headerText="Out"/>
                        <ColumnDirective field="txn_date" textAlign="Right" headerText="Date"/>
                    </ColumnsDirective>
                    <Inject services={[Page, Selection, Toolbar, Search, ExcelExport]}/>
                </GridComponent>
            </div>
        </div>

    )
};

export default AppStockCardTable;