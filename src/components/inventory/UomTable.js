import React, {useEffect, useRef, useState} from "react";
import {fetchUomData, setSelectedUomItem, showUomDialog} from "../../redux";
import {useDispatch, useSelector} from "react-redux";
import * as appConstants from '../../constant';
import * as TableTemplate from '../templates/TableTemplates';
import {ColumnsDirective, GridComponent, ColumnDirective} from "@syncfusion/ej2-react-grids";

const UomTable = () => {
    const dispatch = useDispatch();
    const uomData = useSelector(state => state.uomFxnReducer.uomDataList);
    const uomLoading = useSelector(state => state.uomFxnReducer.uomDataLoading);
    const gridRef = useRef(null);
    const [selectedUom, setSelectedUom] = useState(null);

    useEffect(() => {
        dispatch(fetchUomData);
    }, [dispatch]);

    useEffect(() => {
        if (uomLoading && gridRef)
            gridRef.current.showSpinner();
        else {
            gridRef.current.refresh();
            gridRef.current.hideSpinner();
        }
    }, [dispatch, uomLoading]);

    const toolbarOptions = [
        {text: 'Add', id: "addUom"},
        {text: 'Edit', id: "editUom", disabled: true},
        {text: 'ExcelExport', id: "exportUomList"},
        {text: 'Search'}
    ];

    const handleRowSelected = args => {
        if (gridRef) {
            const selectedRecords = gridRef.current.getSelectedRecords();
            if (selectedRecords.length > 0) {
                setSelectedUom(selectedRecords[0]);
                gridRef.current.toolbarModule.enableItems(['editUom'], true);
            }
        }
    };

    const handleRowDeselect = args => {
        setSelectedUom(null);
        gridRef.current.toolbarModule.enableItems(['editUom'], false);
    };

    const handleToolbarClick = args => {
        if (args.item.id === "addUom") {
            dispatch(showUomDialog(true, appConstants.ADD_ITEM_CONSTANT));
        }
        if (args.item.id === "editUom") {
            dispatch(setSelectedUomItem(selectedUom));
            dispatch(showUomDialog(true, appConstants.EDIT_ITEM_CONSTANT));
        }
    };


    return (
        <>
            <GridComponent ref={gridRef}
                           pageSettings={TableTemplate.pageSettings}
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
                           allowExcelExport={TableTemplate.allowExcelExport}
                           dataSource={uomData}>
                <ColumnsDirective>
                    <ColumnDirective field="id" headerText="Id" visible={false} isPrimaryKey={true}/>
                    <ColumnDirective field="uomName" headerText="Name"/>
                    <ColumnDirective field="uomShort" headerText="Prefix"/>
                </ColumnsDirective>
            </GridComponent>
        </>
    );
};

export default UomTable;