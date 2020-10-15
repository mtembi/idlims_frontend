import React, {useEffect, useRef} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {ColumnDirective, ColumnsDirective, GridComponent, Inject, Page, Selection, Toolbar, Search, ExcelExport, VirtualScroll, Sort, Filter} from "@syncfusion/ej2-react-grids";
import {fetchTxnDocData} from "../../redux";
import * as appConstants from '../../constant';

const GrnTable=()=>{
    const dispatch=useDispatch();
    const docList=useSelector(state=>state.txnFxnReducer.fetchDataList);


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
        dispatch(fetchTxnDocData(appConstants.DOC_GRN));
    }, []);
    const handleRowSelected = () => {

    };
    const handleRowDeselect = () => {
        selectedRecord = null;
    };

    const handleToolbarClick=args=>{

    };

    return (
                    <GridComponent
                        ref={gridRef}
                        dataSource={docList}
                        pageSettings={pageSettings}
                        allowPaging={false}
                        height="350"
                        rowSelected={handleRowSelected}
                        rowDeselected={handleRowDeselect}
                        allowSorting={true}
                        toolbar={toolbarOptions}
                        toolbarClick={handleToolbarClick}
                        enableColumnVirtualization={true}
                        enableVirtualization={true}
                        allowExcelExport={true}
                        allowFiltering={true}
                        selectionSettings={selectionSetting}>
                        <ColumnsDirective>
                            <ColumnDirective field="id" headerText="Id" width="80" isPrimaryKey={true}/>
                            <ColumnDirective field="doc_ref" headerText="Ref#"/>
                            <ColumnDirective field="partner" headerText="Supplier"/>
                            <ColumnDirective field="partner_doc_ref" headerText="Supplier Ref"/>
                            <ColumnDirective field="txn_date" headerText="Txn Date"/>
                            <ColumnDirective field="doc_status" headerText="Status"/>
                            <ColumnDirective field="create_date" headerText="Created"/>
                        </ColumnsDirective>
                        <Inject services={[Page, Selection, Toolbar, Search, ExcelExport, VirtualScroll, Sort, Filter]}/>
                    </GridComponent>
    )
};

export default GrnTable;