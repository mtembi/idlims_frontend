import React, {useEffect, useRef} from "react";
import {
    ColumnsDirective,
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
    ColumnDirective
} from "@syncfusion/ej2-react-grids";
import {useDispatch, useSelector} from "react-redux";
import * as TableTemplate from '../templates/TableTemplates';
import VendOrderDialog from "./VendOrderDialog";
import * as appConst from '../../constant';
import {fetchVendOrders, showVendOrdDialog} from "../../redux";

const VendOrderTable = () => {
    const gridRef = useRef(null);
    const vndOrdDispatch=useDispatch();

    const ordersData = useSelector(state => state.vendOrdReducer.fetchDataList);

    useEffect(()=>{
        vndOrdDispatch(fetchVendOrders());
    }, [vndOrdDispatch]);

    const toolbarOptions=[
        {text: "New", id: "newOrderId"},
        {text: "Edit", id: "editOrderId", disabled: true},
        {text: "Search"},
    ];

    const handleRowSelect=args=>{

    };

    const handleRowDeselect=args=>{

    };

    const handleToolbarClick=args=>{
        if(args.item.id==="newOrderId"){
            vndOrdDispatch(showVendOrdDialog(true, appConst.ADD_ITEM_CONSTANT));
        }
        if(args.item.id==="editOrderId"){
            vndOrdDispatch(showVendOrdDialog(true, appConst.EDIT_ITEM_CONSTANT));
        }
    };

    return (
        <>
            <GridComponent ref={gridRef}
                           dataSource={ordersData}
                           allowPaging={TableTemplate.allowPaging}
                           rowSelected={handleRowSelect}
                           rowDeselected={handleRowDeselect}
                           height={350}
                           allowSorting={TableTemplate.allowSorting}
                           toolbarClick={handleToolbarClick}
                           toolbar={toolbarOptions}
                           enableColumnVirtualization={TableTemplate.columnVirtualization}
                           enableVirtualization={TableTemplate.enableVirtual}
                           filterSettings={TableTemplate.filterSettings}
                           allowFiltering={TableTemplate.allowFiltering}
                           selectionSettings={TableTemplate.selectionSettings}
                           allowExcelExport={TableTemplate.allowExcelExport}>
                <ColumnsDirective>
                    <ColumnDirective field="id" headerText="Id" isPrimaryKey={true} visible={false}/>
                    <ColumnDirective field="docRef" headerText="Ref#" width={120}/>
                    <ColumnDirective field="partner" headerText="Supplier" width={200} template={TableTemplate.partnerTemplate}/>
                    <ColumnDirective field="docType" headerText="Type" width={140}/>
                    <ColumnDirective field="txnDate" headerText="Date" template={TableTemplate.dateTemplate} width={140}/>
                    <ColumnDirective field="docStatus" headerText="Status" template={TableTemplate.docStatusTemplate} width={100}/>
                </ColumnsDirective>
                <Inject
                    services={[Page, Selection, Toolbar, Search, ExcelExport, VirtualScroll, Sort, Filter]}/>
            </GridComponent>
            <VendOrderDialog/>
        </>
    )
};

export default VendOrderTable;