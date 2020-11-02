import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Dropdown, Form, Input, Label, Modal, Segment, TextArea} from "semantic-ui-react";
import {fetchInventoryData, fetchPartnerData, fetchVendOrders, showVendOrdDialog} from "../../redux";
import * as appConsts from '../../constant';
import VendGrnInputTable from "./VendGrnInputTable";

const VendGrnDialog = () => {
    const dispatch = useDispatch();
    const showDialog = useSelector(state => state.vendOrdReducer.dialogShown);
    const dialogType = useSelector(state => state.vendOrdReducer.docType);
    const vendorList = useSelector(state => state.partnerFxnReducer.fetchDataList);
    const vendorOrderList=useSelector(state=>state.vendOrdReducer.fetchDataList);
    const itemList=useSelector(state=>state.invFxnReducer.inventoryDataList);
    const modalRef = useRef(null);


    //Value cache
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [selectedOrder, setSelectedOrder]=useState(null);
    const [vendorAddress, setVendorAddress] = useState("");
    const [detailList] = useState([
        {id: 0, item: null, description: 'Description', dueDate: null, quantity: 0},
        {id: 1, item: null, description: 'Description', dueDate: null, quantity: 0},
        {id: 2, item: null, description: 'Description', dueDate: null, quantity: 0},
        {id: 3, item: null, description: 'Description', dueDate: null, quantity: 0},
        {id: 4, item: null, description: 'Description', dueDate: null, quantity: 0},
        {id: 5, item: null, description: 'Description', dueDate: null, quantity: 0},
        {id: 6, item: null, description: 'Description', dueDate: null, quantity: 0},
        {id: 7, item: null, description: 'Description', dueDate: null, quantity: 0},
        {id: 8, item: null, description: 'Description', dueDate: null, quantity: 0},
        {id: 9, item: null, description: 'Description', dueDate: null, quantity: 0},
        {id: 10, item: null, description: 'Description', dueDate: null, quantity: 0}
    ]);
    //End value cache


    useEffect(() => {
        dispatch(fetchPartnerData(appConsts.SUPPLER_TYPE));
        dispatch(fetchInventoryData());
        dispatch(fetchVendOrders());
    }, [dispatch]);

    useEffect(() => {
        let addContent = "";
        if (selectedVendor) {
            let partner = vendorList.filter(a => a.id === selectedVendor);
            if (partner && partner.length > 0) {
                addContent += partner[0].partnerRef ? partner[0].partnerRef + "\n" : '';
                addContent += partner[0].partnerName ? partner[0].partnerName + "\n" : '';
                addContent += partner[0].partnerAddress ? 'Address:\t' + partner[0].partnerAddress + "\n" : '';
                addContent += partner[0].partnerEmail ? 'Email:\t\t' + partner[0].partnerEmail + "\n" : '';
                addContent += partner[0].partnerTel ? 'Tel:\t\t\t' + partner[0].partnerTel + "\n" : '';
            }
        }
        setVendorAddress(addContent);
    }, [selectedVendor, vendorList]);

    const vendorDataMap = vendorList => {
        return vendorList.map(a => {
            return {
                key: a.id,
                value: a.id,
                text: a.partnerName
            }
        });
    };

    const vendorOrdersMap=orders=>{
        return orders.map(a=>{
            console.log(a);
            return {
                key: a.id,
                value: a.id,
                text: a.docRef
            }
        })
    };

    return (

        <>
            {console.log(itemList)}
            <Modal open={showDialog}
                   triggerRef={modalRef}
                   closeOnDimmerClick={false}
                   closeOnEscape={false}
                   closeIcon={true}
                   size={"large"}
                   onClose={() => dispatch(showVendOrdDialog(false, appConsts.ADD_ITEM_CONSTANT))}>
                <Modal.Header>
                    {dialogType} Vendor Goods Receipt
                </Modal.Header>
                <Modal.Content>
                    <Form>
                        <Segment.Group>
                            <Segment.Group compact horizontal style={{padding: "5"}}>
                                <Segment secondary clearing basic padded={false}>
                                    <Form.Field width={12}>
                                        <Input labelPosition="left" type="date" size="mini" width={7}>
                                            <Label basic>Vendor</Label>
                                            <Dropdown placeholder="Select Supplier"
                                                      selection
                                                      onChange={(e, {value}) => setSelectedVendor(value)}
                                                      value={selectedVendor}
                                                      selectOnBlur={true}
                                                      clearable
                                                      options={vendorDataMap(vendorList)}
                                                      selectOnNavigation={true}/>
                                        </Input>
                                    </Form.Field>
                                    <Form.Field width={10}>
                                        <TextArea rows={5} value={vendorAddress} disabled style={{fontSize: '12px'}}/>
                                    </Form.Field>
                                </Segment>
                                <Segment secondary clearing padded={false}>
                                    <Form.Field width={10} style={{float: 'right', margin: '0 0 0.2em 0',}}>
                                        <Input labelPosition="left" type="date" size="mini" width={7}>
                                            <Label basic>Date</Label>
                                            <input/>
                                        </Input>
                                    </Form.Field>
                                    <Form.Field width={10} style={{float: 'right', margin: '0 0 0.2em 0',}}>
                                        <Input labelPosition="left" type="date" size="mini" width={7}>
                                            <Label basic>Order #</Label>
                                            <Dropdown placeholder="Select"
                                                      selection
                                                      onChange={(e, {value}) => setSelectedOrder(value)}
                                                      value={selectedOrder}
                                                      selectOnBlur={true}
                                                      clearable
                                                      options={vendorOrdersMap(vendorOrderList)}
                                                      selectOnNavigation={true}/>
                                        </Input>
                                    </Form.Field>
                                </Segment>
                            </Segment.Group>
                            <Segment>
                                <VendGrnInputTable invList={itemList} data={detailList} />
                            </Segment>
                        </Segment.Group>
                    </Form>
                </Modal.Content>
                <Modal.Actions>

                </Modal.Actions>
            </Modal>
        </>
    )
};

export default VendGrnDialog;