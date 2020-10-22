import React, {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Modal, Segment} from "semantic-ui-react";
import {showStockCardDialog} from "../../redux/invFxn/InvFxnActions";
import {GridComponent} from "@syncfusion/ej2-react-grids";

const StockCardDialog = () => {
    const dispatch = useDispatch();
    const gridRef = useRef();
    const dialogShow = useSelector(state => state.invFxnReducer.showStockCardDialog);
    const selectedInventory = useSelector(state => state.invFxnReducer.selectedInventoryItem);
    const stockCardList = useSelector(state => state.invFxnReducer.fetchStockCardData);

    const pageSettings = {
        pageCount: 4,
        pageSizes: true
    };
    const filterType = {
        type: 'Excel'
    };
    const selectionSetting = {
        type: 'Single',
        model: 'Row'
    };

    return (
        <Modal open={dialogShow}
               onClose={() => dispatch(showStockCardDialog(false))}
               closeOnEscape={true}
               closeOnDimmerClick={false}
               closeIcon={true}
               size="small">
            <Modal.Header>
                {"Stockcard: " + (selectedInventory ? selectedInventory.invName + " (" + selectedInventory.invRef + ")" : "None")}
            </Modal.Header>
            <Modal.Content>
                <Segment.Group>
                    <Segment secondary>
                        <GridComponent
                            ref={gridRef}
                            dataSource={stockCardList}
                            pageSettings={pageSettings}
                            allowPaging={false}
                            //rowSelected={handleRowSelected}
                            height="200"
                            //rowDeselected={handleRowDeselect}
                            //allowSorting={true}
                            //toolbar={toolbarOptions}
                            //toolbarClick={handleToolbarClick}
                            //enableColumnVirtualization={true}
                            //enableVirtualization={true}
                            filterSettings={filterType}
                            allowFiltering={true}
                            //allowExcelExport={true}
                            selectionSettings={selectionSetting}>

                        </GridComponent>
                    </Segment>
                </Segment.Group>
            </Modal.Content>
        </Modal>
    )

};

export default StockCardDialog;