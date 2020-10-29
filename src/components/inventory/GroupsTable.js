import React, {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchInvGroup, setSelectedInvGroupItem, showInvGroupDialog} from "../../redux";
import {EDIT_ITEM_CONSTANT} from "../../constant";
import * as TableTemplate from '../templates/TableTemplates';
import {ColumnDirective, ColumnsDirective, GridComponent} from "@syncfusion/ej2-react-grids";

const GroupsTable = () => {
    const dispatch = useDispatch();

    const grpsData = useSelector(state => state.invGrpFxnReducer.invGroupList);
    const dataLoading = useSelector(state => state.invGrpFxnReducer.invGroupListLoading);
    const gridRef = useRef(null);

    useEffect(() => {
        dispatch(fetchInvGroup());
    }, [dispatch]);

    useEffect(() => {
        if (dataLoading && gridRef)
            gridRef.current.showSpinner();
        else {
            gridRef.current.refresh();
            gridRef.current.hideSpinner();
        }
    }, [dispatch, dataLoading]);

    const toolbarOptions = [
        {text: 'Add', id: "addGroup"},
        {text: 'Edit', id: "editGroup", disabled: true},
        {text: 'ExcelExport', id: "exportGrpList"},
        {text: 'Search'}
    ];

    const handleRowSelected = args => {
        if (gridRef) {
            const selectedRecords = gridRef.current.getSelectedRecords();
            if (selectedRecords.length > 0) {
                dispatch(setSelectedInvGroupItem(selectedRecords[0]));
                gridRef.current.toolbarModule.enableItems(['editGroup'], true);
            }
        }
    };

    const handleRowDeselect = args => {
        dispatch(setSelectedInvGroupItem(null));
        gridRef.current.toolbarModule.enableItems(['editGroup'], false);
    };

    const handleToolbarClick = args => {
        console.log("toolbar clicked", args);
        if (args.item.id === "addGroup") {
            dispatch(showInvGroupDialog(true));
        }
        if (args.item.id === "editGroup") {
            dispatch(showInvGroupDialog(true, EDIT_ITEM_CONSTANT));
        }
    };

    return (
        <>
            <GridComponent ref={gridRef}
                           dataSource={grpsData}
                           allowPaging={TableTemplate.allowPaging}
                           rowSelected={handleRowSelected}
                           rowDeselected={handleRowDeselect}
                           height={300}
                           allowSorting={TableTemplate.allowSorting}
                           toolbar={toolbarOptions}
                           toolbarClick={handleToolbarClick}
                           enableColumnVirtualization={TableTemplate.columnVirtualization}
                           enableVirtualization={TableTemplate.enableVirtual}
                           filterSettings={TableTemplate.filterSettings}
                           allowFiltering={TableTemplate.allowFiltering}
                           selectionSettings={TableTemplate.selectionSettings}
                           allowExcelExport={TableTemplate.allowExcelExport}>
                <ColumnsDirective>
                    <ColumnDirective field="id" headerText="Id" visible={false}/>
                    <ColumnDirective field="groupName"/>
                </ColumnsDirective>
            </GridComponent>
        </>
    )

};


export default GroupsTable;