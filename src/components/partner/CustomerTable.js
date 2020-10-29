import React, {useEffect, useRef} from 'react';
import {ColumnDirective, ColumnsDirective, GridComponent, Page, Selection, Toolbar, Search, Inject, ExcelExport} from "@syncfusion/ej2-react-grids";
import {useDispatch, useSelector} from "react-redux";
import {fetchPartnerData, setSelectedPartnerItem, showPartnerDialog} from "../../redux";
import * as appConstants from "../../constant";
import * as tableConsts from '../templates/TableTemplates';

const CustomerTable = () => {
    const gridRef = useRef();
    const dispatch = useDispatch();
    const customerData = useSelector(state => state.partnerFxnReducer.fetchDataList);
    const filterType = {
        type: "Excel"
    };
    const selectionSetting = {
        type: 'Single',
        model: 'Row'
    };
    const toolbarOptions = [
        {text: 'Add', id: "addMenuId"},
        {text: 'Edit', id: "editMenuId"},
        {text: 'ExcelExport', id: "exportListId"},
        {text: 'Search'}
    ];

    //const dateFormatOption={type: 'date', format:'dd/MM/yyyy'};

    useEffect(() => {
        dispatch(fetchPartnerData(appConstants.CUSTOMER_TYPE))
    }, [gridRef, dispatch]);

    const handleToolbarClick=args=>{
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
            <GridComponent
                dataSource={customerData}
                allowPaging={false}
                height="400"
                enableColumnVirtualization={true}
                enableVirtualization={false}
                filterSettings={filterType}
                allowFiltering={true}
                allowExcelExport={true}
                selectionSettings={selectionSetting}
                toolbar={toolbarOptions}
                toolbarClick={handleToolbarClick}
                ref={gridRef}>
                <Inject services={[Page, Selection, Toolbar, Search, ExcelExport]}/>
                <ColumnsDirective>
                    <ColumnDirective field="id" headerText="Id" isPrimaryKey={true} visible={false}/>
                    <ColumnDirective field="partnerRef" headerText="Ref#"/>
                    <ColumnDirective field="partnerName" headerText="Name"/>
                    <ColumnDirective field="partnerEmail" headerText="@"/>
                    <ColumnDirective field="partnerTel" headerText="Tel"/>
                    <ColumnDirective field="activeStatus" headerText="Status" template={tableConsts.statusTemplate} />
                    <ColumnDirective field="createDate" headerText="Created" template={tableConsts.dateTemplate} />
                </ColumnsDirective>
            </GridComponent>
    )
};

export default CustomerTable;