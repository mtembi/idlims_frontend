import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Dropdown, Form, Input, Label, Modal, Segment, TextArea} from "semantic-ui-react";
import {fetchInventoryData, fetchPartnerData, showCustTxnDialog} from "../../redux";
import * as appConsts from '../../constant';
import CustDelReqInputTable from "./CustDelReqInputTable";

const CustDelReqDialog = () => {
    const dispatch = useDispatch();
    const showDialog = useSelector(state => state.custTxnFxnReducer.dialogShown);
    const dialogType = useSelector(state => state.custTxnFxnReducer.docType);
    const custList = useSelector(state => state.partnerFxnReducer.fetchDataList);
    const itemList = useSelector(state => state.invFxnReducer.inventoryDataList);
    const modalRef = useRef(null);


    //Value cache
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [customerAddress, setCustomerAddress] = useState("");
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
        dispatch(fetchPartnerData(appConsts.CUSTOMER_TYPE));
        dispatch(fetchInventoryData());
    }, [dispatch]);

    useEffect(() => {
        let addContent = "";
        if (selectedCustomer) {
            let partner = custList.filter(a => a.id === selectedCustomer);
            if (partner && partner.length > 0) {
                addContent += partner[0].partnerRef ? partner[0].partnerRef + "\n" : '';
                addContent += partner[0].partnerName ? partner[0].partnerName + "\n" : '';
                addContent += partner[0].partnerAddress ? 'Address:\t' + partner[0].partnerAddress + "\n" : '';
                addContent += partner[0].partnerEmail ? 'Email:\t\t' + partner[0].partnerEmail + "\n" : '';
                addContent += partner[0].partnerTel ? 'Tel:\t\t\t' + partner[0].partnerTel + "\n" : '';
            }
        }
        setCustomerAddress(addContent);
    }, [selectedCustomer, custList]);

    const partnerDataMap = list => {
        return list.map(a => {
            return {
                key: a.id,
                value: a.id,
                text: a.partnerName
            }
        });
    };

    return (

        <>
            <Modal open={showDialog}
                   triggerRef={modalRef}
                   closeOnDimmerClick={false}
                   closeOnEscape={false}
                   closeIcon={true}
                   size={"large"}
                   onClose={() => dispatch(showCustTxnDialog(false, appConsts.ADD_ITEM_CONSTANT))}>
                <Modal.Header>
                    {dialogType} Delivery Request
                </Modal.Header>
                <Modal.Content>
                    <Form>
                        <Segment.Group>
                            <Segment.Group compact horizontal style={{padding: "5"}}>
                                <Segment secondary clearing basic padded={false}>
                                    <Form.Field width={12}>
                                        <Input labelPosition="left" type="date" size="mini" width={7}>
                                            <Label basic>Vendor</Label>
                                            <Dropdown placeholder="Select Customer"
                                                      selection
                                                      onChange={(e, {value}) => setSelectedCustomer(value)}
                                                      value={selectedCustomer}
                                                      selectOnBlur={true}
                                                      clearable
                                                      options={partnerDataMap(custList)}
                                                      selectOnNavigation={true}/>
                                        </Input>
                                    </Form.Field>
                                    <Form.Field width={10}>
                                        <TextArea rows={5} value={customerAddress} disabled style={{fontSize: '12px'}}/>
                                    </Form.Field>
                                </Segment>
                                <Segment secondary clearing padded={false}>
                                    <Form.Field width={10} style={{float: 'right', margin: '0 0 0.2em 0',}}>
                                        <Input labelPosition="left" type="text" size="mini" width={7} >
                                            <Label basic>Ref#</Label>
                                            <input/>
                                        </Input>
                                    </Form.Field>
                                    <Form.Field width={10} style={{float: 'right', margin: '0 0 0.2em 0',}}>
                                        <Input labelPosition="left" type="date" size="mini" width={7}>
                                            <Label basic>Date</Label>
                                            <input/>
                                        </Input>
                                    </Form.Field>
                                    <Form.Field width={10} style={{float: 'right', margin: '0 0 0.2em 0',}}>
                                        <Input labelPosition="left" type="text" size="mini" width={7}>
                                            <Label basic>PO#</Label>
                                            <input/>
                                        </Input>
                                    </Form.Field>
                                    <Form.Field width={10} style={{float: 'right', margin: '0 0 0.2em 0',}}>
                                        <Input labelPosition="left" type="date" size="mini">
                                            <Label basic>PO Date</Label>
                                            <input/>
                                        </Input>
                                    </Form.Field>
                                </Segment>
                            </Segment.Group>
                            <Segment>
                                <CustDelReqInputTable invList={itemList} data={detailList}/>
                            </Segment>
                        </Segment.Group>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button.Group>
                        <Button primary>Save</Button>
                        <Button secondary>Cancel</Button>
                    </Button.Group>
                </Modal.Actions>
            </Modal>
        </>
    )
};

export default CustDelReqDialog;