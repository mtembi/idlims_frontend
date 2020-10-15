import React, {useRef, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    ColumnDirective,
    ColumnsDirective,
    GridComponent,
    Inject,
    Page,
    Selection,
    Toolbar,
    Search,
    ExcelExport
} from "@syncfusion/ej2-react-grids";
import {fetchPartnerData, showPartnerDialog, setSelectedPartnerItem} from "../../redux";
import * as appConstants from "../../constant";

const CustomerTable = () => {
    const gridRef = useRef(null);
    const partnerDataList = useSelector(state => state.partnerFxnReducer.fetchDataList);
    const fetchLoading = useSelector(state => state.partnerFxnReducer.fetchDataLoading);


    const dispatch = useDispatch();

    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        setTimeout(dispatch(fetchPartnerData(appConstants.CUSTOMER_TYPE)), 2000);
    }, []);


    const pageSettings = {
        pageCount: 4,
        pageSizes: true
    };

    const filterType = {
        type: "Excel"
    };

    const toolbarOptions = [
        {text: 'Add', id: "addMenuId"},
        {text: 'Edit', id: "editMenuId"},
        {text: 'ExcelExport', id: "exportListId"},
        {text: 'Search'}
    ];

    const handleRowSelected = args => {
        if (gridRef) {
            let selectedRecords = gridRef.current.getSelectedRecords();
            console.log("Selected recs",selectedRecords);
            if (selectedRecords.length > 0) {
                let selItem=selectedRecords[0];
                setSelectedItem(selItem);
                gridRef.current.toolbarModule.enableItems(["editMenuId"], true);
            }
        }
    };

    const handleRowDeselect = args => {
        setSelectedItem(null);
        if (gridRef) {
            gridRef.current.toolbarModule.enableItems(["editMenuId"], false);
        }
    };

    const selectionSetting = {
        type: 'Single',
        model: 'Row'
    };

    const handleToolbarClick = args => {
        if (args.item.id === "addMenuId") {
            dispatch(showPartnerDialog(true, appConstants.CUSTOMER_TYPE, appConstants.ADD_ITEM_CONSTANT));
        }
        if (gridRef && args.item.id === "editMenuId") {
            let selectedRecords=gridRef.current.getSelectedRecords();
            if (selectedRecords.length > 0) {
                dispatch(setSelectedPartnerItem(selectedRecords[0]));
                dispatch(showPartnerDialog(true, appConstants.EDIT_ITEM_CONSTANT));
            } else {
                alert("Select customer to edit");
            }
        }
    };

    return (
        fetchLoading ?
            <div>Loading data</div> :
            <div className="control-pane">
                <div className="control-section">
                    <GridComponent
                        ref={gridRef}
                        dataSource={partnerDataList}
                        pageSettings={pageSettings}
                        allowPaging={false}
                        height="400"
                        rowSelected={handleRowSelected}
                        allowSorting={true}
                        rowDeselected={handleRowDeselect}
                        toolbar={toolbarOptions}
                        toolbarClick={handleToolbarClick}
                        enableColumnVirtualization={true}
                        enableVirtualization={false}
                        filterSettings={filterType}
                        allowFiltering={true}
                        allowExcelExport={true}
                        selectionSettings={selectionSetting}>
                        <Inject services={[Page, Selection, Toolbar, Search, ExcelExport]}/>
                        <ColumnsDirective>
                            <ColumnDirective field="id" headerText="Id" width="80" isPrimaryKey={true}/>
                            <ColumnDirective field="partner_ref" headerText="Ref#"/>
                            <ColumnDirective field="partner_name" headerText="Name"/>
                            <ColumnDirective field="partner_email" headerText="@"/>
                            <ColumnDirective field="partner_tel" headerText="Tel"/>
                            <ColumnDirective field="active_status" headerText="Status"/>
                            <ColumnDirective field="create_date" headerText="Date"/>
                        </ColumnsDirective>

                    </GridComponent>
                </div>
            </div>
    )
};

export default CustomerTable;