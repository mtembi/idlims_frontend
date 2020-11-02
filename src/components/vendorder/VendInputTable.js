import React, {useRef, useState} from "react";
import * as PropTypes from 'prop-types';
import {ColumnDirective, ColumnsDirective, GridComponent, Edit} from "@syncfusion/ej2-react-grids";
import {Inject} from "@syncfusion/ej2-react-base";

const VendInputTable = (props) => {

    const gridRef = useRef(null);


    const selectionSettings = {
        persistSelection: true,
        type: "Multiple",
        checkboxOnly: true
    };
    const editSettings = {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
    };

    const [dReady, setDReady] = useState(false);
    const [stTime, setStTime] = useState(null);
    const [isDataChanged, setIsDataChanged] = useState(false);

    const onLoad = args => {
        console.log(gridRef.current.load);
        console.log(args);
    };

    const onDataBound=()=> {
        clearTimeout(this.clrIntervalFun);
        clearInterval(this.intervalFun);
        this.dtTime = true;
    };

    const handleRowSelected = args => {
        console.log(args);
    };

    return (
        <GridComponent id="overviewgrid"
                       dataSource={props.data}
                       editSettings={editSettings}
                       enableHover={true}
                       enableVirtualization={true}
                       rowHeight={25}
                       height='150'
                       ref={gridRef}
            //actionComplete={this.onComplete.bind(this)}
                       load={onLoad}
            //queryCellInfo={this.onQueryCellInfo.bind(this)}
            //dataBound={true}
            //filterSettings={this.Filter}
                       rowSelected={handleRowSelected}
                       allowFiltering={false}
                       allowSorting={false}
                       allowSelection={true}
                       selectionSettings={selectionSettings}>
            <Inject services={[Edit]}/>
            <ColumnsDirective>
                <ColumnDirective field="id" headerText="Id" visible={false} isPrimaryKey={true}/>
                <ColumnDirective field="item" headerText="Item" width={100}/>
                <ColumnDirective field="description" headerText="Description" width={300}/>
                <ColumnDirective field="dueDate" headerText="Due Date" width={100}/>
                <ColumnDirective field="quantity" headerText="Qty" width={100}/>
            </ColumnsDirective>
        </GridComponent>
    )
};

VendInputTable.propTypes = {
    data: PropTypes.array.isRequired
};

export default VendInputTable;