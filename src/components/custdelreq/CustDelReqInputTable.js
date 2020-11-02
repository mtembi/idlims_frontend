import React, {useState} from "react";
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';
import * as PropTypes from 'prop-types';
import {AllCommunityModules} from "@ag-grid-community/all-modules";
import {AgGridReact} from "@ag-grid-community/react";
import {AutocompleteSelectCellEditor} from "ag-grid-autocomplete-editor";
import NumericEditor from "../editors/NumericEditor";

const CustDelReqInputTable = props => {

    const [gridApi, setGridApi] = useState(null);
    const getInvDataFormatted = () => {
        return props.invList.map(a => {
            return a.invName;
        });
    };
    const modules = AllCommunityModules;
    const columnDefs = [
        {
            field: "item",
            headerName: "Item",
            width: 120,
            editable: true,
            cellEditor: AutocompleteSelectCellEditor,
            cellEditorParams: {
                selectData: props.invList.map(a=>{
                    console.log(a);
                    return {
                        label: a.invName,
                        value: a,
                    }
                }),
                placeHolder: "Select item"
            },
            valueFormatter: (params)=>{
                if (params.value) {
                    return params.value.label || params.value.invName || params.value;
                }
                return "";
            }
        },
        {
            field: "description",
            headerName: "Description",
            width: 200,
            editable: false,
        },
        {
            field: "quantity",
            headerName: "Available Qty",
            width: 100,
            editable: false,
            cellEditor: 'numericEditor'
        },
        {
            field: "quantity",
            headerName: "Qty",
            width: 100,
            editable: true,
            cellEditor: 'numericEditor'
        }
    ];

    const defaultCellStyle = {
        fontSize: '1rem',
        lineHeight: '1.5rem',
    };
    const defaultColumnDef = {
        editable: false,
        flex: 1,
        minWidth: 100,
        filter: false,
        resizable: true,
        sortable: false,
        cellStyle: defaultCellStyle
    };

    const onGridReady = params => {
        setGridApi(params.api);
        //TODO should access column api???
    };

    const rowClassRules = {
        fontSize: 9,
    };


    return (
        <div className="ag-theme-alpine" style={{height: 250, width: '100%'}}>
            <AgGridReact modules={modules}
                         rowHeight={27}
                         frameworkComponents={{
                             numericEditor: NumericEditor,
                         }}
                         gridOptions={{
                             columnDefs: columnDefs,
                             defaultColDef: defaultColumnDef,
                             rowData: props.data,
                         }}
                         rowClass={rowClassRules}
                         onGridReady={onGridReady}/>
        </div>
    )
};

CustDelReqInputTable.propTypes = {
    data: PropTypes.array.isRequired,
    invList: PropTypes.array.isRequired
};

export default CustDelReqInputTable;