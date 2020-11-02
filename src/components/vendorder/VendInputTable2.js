import React, {useRef} from "react";
import * as PropTypes from 'prop-types';
import {
    ColumnDirective,
    ColumnsDirective,
    Edit,
    EditSettingsModel,
    GridComponent,
    Inject
} from "@syncfusion/ej2-react-grids";
import {AutoCompleteComponent} from "@syncfusion/ej2-react-dropdowns";
import {NumericTextBoxComponent} from "@syncfusion/ej2-react-inputs";
import {Input} from "semantic-ui-react";


const VendorInputTable2 = (props) => {
    const gridRef=useRef(null);

    //Table settings
    const editOptions: EditSettingsModel={
        allowAdding: true,
        allowDeleting: true,
        allowEditing: true
    };
    const editTemplate=(args: any)=>{
        console.log(args);
        return (<Input value={args.description} size="small" width={10} id="descriptionId"/>)
    };

    const itemFields={
        value: 'id',
        text: 'invName'
    };
    const itemEditTemplate=(args: any)=>{
        console.log(args);
        console.log(props.itemList);
        return (
            <AutoCompleteComponent dataSource={props.itemList} fields={itemFields} value={args.item} />
        )
        // return (<DropDownListComponent id="itemId"
        //                                key={args.id}
        //                                value={args.item}
        //                                floatLabeltype="Always"
        //                                placeHolder="Select Item"
        //                                dataSource={itemList} fields={{text:'invName', value:'id'}} />)
    };
    const qtyEditTemplate=args=>{
        return (
            <NumericTextBoxComponent value={args.quantity} />
        )
    };
    //End table settings

    return (
        <>
            <GridComponent ref={gridRef}
                           rowHeight={28}
                           height={150}
                           enableColumnVirtualization={false}
                           editSettings={editOptions}
                           gridLines="Both"
                           dataSource={props.data}>
                <ColumnsDirective>
                    <ColumnDirective field="id" headerText="Id" isPrimaryKey={true} visible={false}/>
                    <ColumnDirective field="item" headerText="Item" width={120} editType="dropdownedit" editTemplate={itemEditTemplate} />
                    <ColumnDirective field="description" headerText="Description" width={200} editType="textboxedit" editTemplate={editTemplate}/>
                    <ColumnDirective field="dueDate" headerText="Due Date" width={100} editType="datepickeredit" formay="dMy" />
                    <ColumnDirective field="quantity" headerText="Quantity" width={100} editTemplate={qtyEditTemplate} />
                </ColumnsDirective>
                <Inject services={[Edit]}/>
            </GridComponent>
        </>
    )
};

VendorInputTable2.propTypes = {
    data: PropTypes.array.isRequired,
    itemList: PropTypes.array.isRequired
};

export default VendorInputTable2;