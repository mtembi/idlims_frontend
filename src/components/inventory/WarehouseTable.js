import React, {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as TableConstant from '../templates/TableTemplates';
import * as appConsts from '../../constant';
import {
    GridComponent,
    Inject,
    Page,
    Selection,
    Toolbar,
    Search,
    ExcelExport,
    VirtualScroll,
    Sort,
    Filter,
    ColumnsDirective, ColumnDirective
} from "@syncfusion/ej2-react-grids";
import {fetchWhData, showWhDialog} from "../../redux";

const WarehouseTable = () => {
    const gridRef = useRef(null);
    const dispatch = useDispatch();
    const whData = useSelector(state => state.whFxnReducer.fetchDataList);
    const whDataLoading = useSelector(state => state.whFxnReducer.fetchDataLoading);

    useEffect(() => {
        dispatch(fetchWhData());
    }, [dispatch]);

    useEffect(() => {
        if (whDataLoading)
            gridRef.current.showSpinner();
        else{
            gridRef.current.refresh();
            gridRef.current.hideSpinner();
        }
    }, [whDataLoading, dispatch]);

    const handleRowSelect = args => {

    };

    const handleRowDeselect = args => {

    };

    const handleToolbarClick = args => {
        if (args.item.id === "addWhId") {
            dispatch(showWhDialog(true, appConsts.ADD_ITEM_CONSTANT));
        }
        if (args.item.id === "editWhId") {
            dispatch(showWhDialog(true, appConsts.EDIT_ITEM_CONSTANT));
        }
    };

    const toolbarConstant = [
        {text: "Add", id: "addWhId"},
        {text: "Edit", id: "editWhId", disabled: true},
        {text: "Search"}
    ];

    return (
        <>
            <GridComponent ref={gridRef}
                           dataSource={whData}
                           allowPaging={TableConstant.allowPaging}
                           rowSelected={handleRowSelect}
                           rowDeselected={handleRowDeselect}
                           height={300}
                           allowSorting={TableConstant.allowSorting}
                           toolbar={toolbarConstant}
                           toolbarClick={handleToolbarClick}
                           enableColumnVirtualization={TableConstant.columnVirtualization}
                           enableVirtualization={TableConstant.enableVirtual}
                           filterSettings={TableConstant.filterSettings}
                           allowFiltering={TableConstant.allowFiltering}
                           selectionSettings={TableConstant.selectionSettings}
                           allowExcelExport={TableConstant.allowExcelExport}>
                <ColumnsDirective>
                    <ColumnDirective field="id" name="Id" visible={false}/>
                    <ColumnDirective field="whName" name="Name"/>
                    <ColumnDirective field="activeStatus" name="Status"/>
                    <ColumnDirective field="createDate" name="Created"/>
                </ColumnsDirective>
                <Inject
                    services={[Page, Selection, Toolbar, Search, ExcelExport, VirtualScroll, Sort, Filter]}/>
            </GridComponent>
        </>
    )
};

export default WarehouseTable;