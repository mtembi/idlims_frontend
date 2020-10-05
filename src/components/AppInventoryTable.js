import React, {useEffect, useRef} from 'react';
import {
    ColumnDirective,
    ColumnsDirective,
    ExcelExport,
    Filter,
    GridComponent,
    Inject,
    Page,
    Search,
    Selection,
    Sort,
    Toolbar,
    VirtualScroll
} from "@syncfusion/ej2-react-grids";
import * as appConstants from '../constant';
import {fetchInventoryData, showInventoryDialog, setSelectedInventoryItem, showUomDialog} from "../redux";
import {connect, useSelector} from "react-redux";

const AppInventoryTable = ({toggleInventoryDialog, showUomDialog, setSelectedInventoryItem, invReducer, fetchInventoryData}) => {
    const gridRef = useRef(null);
    const toolbarOptions = [
        {text: 'Add', id: "addInventory"},
        {text: 'Edit', id: "editInventory"},
        {text: 'UoM', id: "mngUomId"},
        {text: 'ExcelExport', id: "exportInventoryList"},
        {text: 'Search'}
    ];
    useEffect(() => {
        setTimeout(fetchInventoryData(), 2000);
    }, []);



    const pageSettings = {
        pageCount: 4,
        pageSizes: true
    };
    const filterType = {
        type: 'Excel'
    };
    const selectionSetting = {
        type: 'Single',
        model: 'Row'
    };

    const invListUpd=useSelector(state=> state.invFxnReducer.putInventoryLoading);
    useEffect(()=>{
        console.log("Use Effect", "Inv List Changed");
    });

    const handleRowSelected = args => {
        if (gridRef) {
            const selectedRecords = gridRef.current.getSelectedRecords();
            if (selectedRecords.length > 0) {
                setSelectedInventoryItem(selectedRecords[0]);
                gridRef.current.toolbarModule.enableItems(['editInventory'], true);
            }
        }
    };
    const handleRowDeselect = () => {
        setSelectedInventoryItem(null);
        if(gridRef) {
            gridRef.current.toolbarModule.enableItems(['editInventory'], false);
        }
    };
    const handleToolbarClick = (args) => {
        if (args.item.id === "addInventory") {
            toggleInventoryDialog(true, appConstants.ADD_ITEM_CONSTANT);
        }

        if(gridRef && args.item.id==="editInventory") {
            if (gridRef.current.getSelectedRecords().length > 0) {
                setSelectedInventoryItem(gridRef.current.getSelectedRecords()[0]);
                toggleInventoryDialog(true, appConstants.EDIT_ITEM_CONSTANT);
            } else {
                alert("Select Item to edit");
            }
        }

        if(gridRef && args.item.id==="mngUomId"){
            showUomDialog(true, appConstants.ADD_ITEM_CONSTANT);
        }

        if(gridRef && args.item.id==="exportInventoryList"){
            gridRef.current.excelExport();
        }
    };

    return (
        invReducer.inventoryDataLoading ?
            <div>Loading data</div> :
            <div className="control-pane">
                <div className="control-section">
                    <GridComponent
                        ref={gridRef}
                        dataSource={invReducer.inventoryDataList}
                        pageSettings={pageSettings}
                        allowPaging={false}
                        rowSelected={handleRowSelected}
                        height="400"
                        rowDeselected={handleRowDeselect}
                        allowSorting={true}
                        toolbar={toolbarOptions}
                        toolbarClick={handleToolbarClick}
                        enableColumnVirtualization={true}
                        enableVirtualization={true}
                        filterSettings={filterType}
                        allowFiltering={true}
                        allowExcelExport={true}
                        selectionSettings={selectionSetting}>
                        <ColumnsDirective>
                            <ColumnDirective field="id" headerText="Id" width="80" isPrimaryKey={true}/>
                            <ColumnDirective field="invRef" headerText="Ref#"/>
                            <ColumnDirective field="invName" headerText="Name"/>
                            <ColumnDirective field="uom" headerText="Uom"/>
                            <ColumnDirective field="invCurrQty" textAlign="Right" headerText="Quantity"/>
                            <ColumnDirective field="invMinQty" textAlign="Right" headerText="Min. Qty"/>
                            <ColumnDirective field="invMaxQty" textAlign="Right" headerText="Max. Qty"/>
                            <ColumnDirective field="createDate" headerText="Created"/>
                            <ColumnDirective field="activeStatus" headerText="Status"/>
                        </ColumnsDirective>
                        <Inject
                            services={[Page, Selection, Toolbar, Search, ExcelExport, VirtualScroll, Sort, Filter]}/>
                    </GridComponent>
                </div>
            </div>
    )
};

const mapDispatchToProps = dispatch => {
    return {
        toggleInventoryDialog: (show, type) => dispatch(showInventoryDialog(show, type)),
        fetchInventoryData: () => dispatch(fetchInventoryData()),
        setSelectedInventoryItem: item => dispatch(setSelectedInventoryItem(item)),
        showUomDialog: (show, type)=>dispatch(showUomDialog(show, type)),
    }
};

const mapStateToProps = state => {
    return {
        invReducer: state.invFxnReducer,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppInventoryTable);