import React, {useEffect, useRef, useState} from 'react';
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
import * as appConstants from '../../constant';
import {fetchInventoryData, setSelectedInventoryItem, showInventoryDialog} from "../../redux";
import {useDispatch, useSelector} from "react-redux";
import {fetchStockcard, showStockCardDialog} from "../../redux/invFxn/InvFxnActions";
import StockCardDialog from "./StockcardDialog";

const AppInventoryTable = () => {
    const dispatch = useDispatch();

    const inventoryData = useSelector(state => state.invFxnReducer.inventoryDataList);
    const showUomDialog = useSelector(state => state.uomFxnReducer.showUomDialog);
    const inventoryDataLoading = useSelector(state => state.invFxnReducer.inventoryDataLoading);

    const [selectedItem, setSelectedItem] = useState(null);

    const gridRef = useRef(null);
    const toolbarOptions = [
        {text: 'Add', id: "addInventory"},
        {text: 'Edit', id: "editInventory", disabled: true},
        {text: "Stockcard", id: "invStockcard", disabled: true},
        {text: 'UoM', id: "mngUomId"},
        {text: 'ExcelExport', id: "exportInventoryList"},
        {text: 'Search'}
    ];
    useEffect(() => {
        dispatch(fetchInventoryData());
    }, [dispatch]);
    useEffect(() => {
        if (inventoryDataLoading && gridRef) {
            gridRef.current.showSpinner();
        } else if (!inventoryDataLoading && gridRef) {
            gridRef.current.refresh();
            gridRef.current.hideSpinner();
        }
    }, [dispatch, inventoryDataLoading]);

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

    const handleRowSelected = args => {
        if (gridRef) {
            const selectedRecords = gridRef.current.getSelectedRecords();
            if (selectedRecords.length > 0) {
                setSelectedInventoryItem(selectedRecords[0]);
                gridRef.current.toolbarModule.enableItems(['editInventory'], true);
                gridRef.current.toolbarModule.enableItems(['invStockcard'], true);
            }
        }
    };
    const handleRowDeselect = () => {
        setSelectedInventoryItem(null);
        if (gridRef) {
            gridRef.current.toolbarModule.enableItems(['editInventory'], false);
            gridRef.current.toolbarModule.enableItems(['invStockcard'], false);
        }
    };
    const handleToolbarClick = (args) => {
        if (args.item.id === "addInventory") {
            dispatch(showInventoryDialog(true, appConstants.ADD_ITEM_CONSTANT));
        }

        if (args.item.id === "invStockcard") {
            if (gridRef.current.getSelectedRecords().length > 0) {
                dispatch(setSelectedInventoryItem(gridRef.current.getSelectedRecords()[0]));
                dispatch(fetchStockcard(gridRef.current.getSelectedRecords()[0]));
                dispatch(showStockCardDialog(true));
            }
        }

        if (gridRef && args.item.id === "editInventory") {
            if (gridRef.current.getSelectedRecords().length > 0) {
                setSelectedInventoryItem(gridRef.current.getSelectedRecords()[0]);
                dispatch(showInventoryDialog(true, appConstants.EDIT_ITEM_CONSTANT));
            } else {
                alert("Select Item to edit");
            }
        }

        if (gridRef && args.item.id === "mngUomId") {
            dispatch(showUomDialog(true, appConstants.ADD_ITEM_CONSTANT));
        }

        if (gridRef && args.item.id === "exportInventoryList") {
            gridRef.current.excelExport();
        }
    };

    const dateTemplate = args => {
        if (args.createDate)
            return <div>{new Date(args.createDate[0], args.createDate[1], args.createDate[2]).toDateString()}</div>
        else
            return <div></div>
    };

    const uomTemplate = args => {
        if (args.uom)
            return <div>{args.uom.uomShort}</div>
        else
            return <div></div>
    };

    const inventoryGroupTemplate = args => {
        if (args.inventoryGroup)
            return <div>{args.inventoryGroup.groupName}</div>
        else
            return <div></div>
    };

    return (
        <>
            <GridComponent
                ref={gridRef}
                dataSource={inventoryData}
                pageSettings={pageSettings}
                allowPaging={false}
                rowSelected={handleRowSelected}
                height="350"
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
                    <ColumnDirective field="uom" width={100} headerText="Uom" template={uomTemplate}/>
                    <ColumnDirective field="currQty" textAlign="Right" headerText="Quantity"/>
                    <ColumnDirective field="minQty" textAlign="Right" headerText="Min. Qty"/>
                    <ColumnDirective field="maxQty" textAlign="Right" headerText="Max. Qty"/>
                    <ColumnDirective field="inventoryGroup" headerText="Group" template={inventoryGroupTemplate}/>
                    <ColumnDirective field="createDate" headerText="Created" template={dateTemplate}/>
                    <ColumnDirective field="activeStatus" headerText="Status"/>
                </ColumnsDirective>
                <Inject
                    services={[Page, Selection, Toolbar, Search, ExcelExport, VirtualScroll, Sort, Filter]}/>
            </GridComponent>
            <StockCardDialog/>
        </>
    )
};


export default AppInventoryTable;