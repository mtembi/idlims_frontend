import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Dimmer, Loader, Grid, Icon, Input, Label, Modal, Segment, TextArea, Checkbox, Form, Button} from "semantic-ui-react";
import {putPartnerData, showPartnerDialog} from "../../redux";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import * as appConstants from '../../constant';

const PartnerDialog = () => {

    const dialogShown = useSelector(state => state.partnerFxnReducer.showDialog);
    const dialogType = useSelector(state => state.partnerFxnReducer.dialogType);
    const partnerType=useSelector(state=>state.partnerFxnReducer.partnerType);
    const putLoading=useSelector(state=>state.partnerFxnReducer.putLoading);
    const putError=useSelector(state=>state.partnerFxnReducer.putError);

    const dispatch = useDispatch();

    const [custId, setCustId]=useState(null);
    const [custRef, setCustRef] = useState("");
    const [custName, setCustName] = useState("");
    const [custAddress, setCustAddress] = useState("");
    const [custTel, setCustTel] = useState("");
    const [custEmail, setCustEmail] = useState("");
    const [custCreated, setCustCreated] = useState(new Date());
    const [custActive, setCustActive] = useState(true);

    const handleSave=()=>{
        //validator
        let cust={
            id: custId,
            partner_address: custAddress,
            partner_name: custName,
            partner_ref: custRef,
            partner_email: custEmail,
            partner_tel: custTel,
            partner_type: appConstants.CUSTOMER_TYPE,
            create_date: custCreated,
            active_status: custActive
        };

        dispatch(putPartnerData(cust));

        if(putError.length > 0){
            alert("Error found: "+putError);
        }else{
            dispatch(showPartnerDialog(false));
        }

    };

    return (
        <Modal open={dialogShown}
               onClose={() => dispatch(showPartnerDialog(false))}
               closeOnEscape={true}
               closeOnDimmerClick={false}
               closeIcon={true}
               size="small">
            <Dimmer active={putLoading}>
                <Loader indeterminate>Saving Customer</Loader>
            </Dimmer>
            <Modal.Header>
                <Icon name="cart plus"/>
                {dialogType+" "+partnerType}
            </Modal.Header>
            <Modal.Content>
                <Segment.Group>
                    <Segment>
                        <Grid>
                            <Grid.Row columns={2} style={{padding: "5px"}}>
                                <Grid.Column width={5}>
                                    <Input type="text" labelPosition="left" size="mini" value={custRef}
                                           onChange={(e) => setCustRef(e.target.value)}>
                                        <Label basic>Ref#</Label>
                                        <input/>
                                    </Input>
                                </Grid.Column>
                                <Grid.Column width={11}>
                                    <Input fluid type="text" labelPosition="left" size="mini" value={custName}
                                           onChange={(e) => setCustName(e.target.value)}>
                                        <Label basic>Name</Label>
                                        <input/>
                                    </Input>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                    <Segment>
                        <Grid>
                            <Grid.Row style={{padding: "5px"}}>
                                <Label>Contact Details</Label>
                            </Grid.Row>
                            <Grid.Row columns={2} style={{padding: "5px"}}>
                                <Grid.Column>
                                    <Input fluid type="text" labelPosition="left" size="mini" value={custTel}
                                           onChange={(e) => setCustTel(e.target.value)}>
                                        <Label basic>Telephone</Label>
                                        <input/>
                                    </Input>
                                </Grid.Column>
                                <Grid.Column>
                                    <Input fluid type="text" labelPosition="left" size="mini" value={custEmail}
                                           onChange={(e) => setCustEmail(e.target.value)}>
                                        <Label basic>Email</Label>
                                        <input/>
                                    </Input>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={1}>
                                <Grid.Column>
                                    <Form>
                                        <Form.Field>
                                            <TextArea rows={3} value={custAddress} placeholder="Address" label="Address"
                                                      onChange={(e) => setCustAddress(e.target.value)}
                                                      style={{width: "100%"}}/>
                                        </Form.Field>
                                    </Form>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                    <Segment>
                        <Grid>
                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    <Checkbox toggle checked={custActive} toggle={true}
                                              onChange={() => setCustActive(!custActive)}
                                              label={custActive ? "Active" : "Disabled"}/>
                                </Grid.Column>
                                <Grid.Column>
                                    <SemanticDatepicker label="Created"
                                                        size="mini"
                                                        clearable={true}
                                                        datePickerOnly={true}
                                                        clearIcon={true} value={custCreated}
                                                        onChange={(e, data) => setCustCreated(data.value)}/>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </Segment.Group>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    content="Save"
                    labelPosition='right'
                    icon='checkmark'
                    size="mini"
                    onClick={handleSave}
                    positive
                />
                <Button color='black'
                        icon="times"
                        size="mini"
                        secondary
                        labelPosition="right"
                        onClick={()=>dispatch(showPartnerDialog(false))}
                        content="Cancel"/>
            </Modal.Actions>
        </Modal>
    )
};

export default PartnerDialog;