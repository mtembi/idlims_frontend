import React, {useEffect, useRef, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {connect} from "react-redux";
import {fetchUomData, putInventoryData, showInventoryDialog} from "../../redux";
import {Button, Checkbox, Dropdown, Form, Grid, Icon, Input, Modal, Ref, Segment, TextArea} from "semantic-ui-react";
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';


const InventoryDialog = () => {
    const dispatch=useDispatch();
    const uomList=useSelector(state=>state.uomFxnReducer.uomDataList);
    const uomListLoading=useSelector(state=>state.uomFxnReducer.uomDataLoading);
    const showDialog=useSelector(state=>state.invFxnReducer.showInventoryDialog);
    const dialogType=useSelector(state=>state.invFxnReducer.inventoryDialogType);


    const dlgRef = useRef(null);

    const handleDialogOpen = (args) => {
        console.log("Inventory dialog opened");
    };

    const getUomText=(id)=>{
        if(id && id!==0) {
            let uoms = uomList.filter(a => a.id === id);
            return uoms[0].uomName + "("+uoms[0].uomShort+")";
        }else
            return "Unit of Measure";
    };

    const [invRef, setInvRef] = useState("");
    const [invName, setInvName] = useState("");
    const [invDesc, setInvDesc] = useState("");
    const [invUom, setInvUom]=useState(null);
    const [currQty, setCurrQty]=useState(0);
    const [minQty, setMinQty]=useState(0);
    const [maxQty, setMaxQty]=useState(0);
    const [invActive, setInvActive]=useState(true);
    const [invCreated, setInvCreated]=useState(new Date());

    const validateData=()=>{
        return true;
    };

    const handleSave=()=>{
        let isValid=validateData();
        if(typeof isValid === Boolean && isValid) {
            let inv = {
                id: null,
                invRef: invRef,
                invName: invName,
                invDesc: invDesc,
                uom: uomList.filter(a => a.id === invUom)[0],
                createDate: invCreated,
                activeStatus: invActive,
                invMinQty: minQty,
                invMaxQty: maxQty,
                invCurrQty: currQty
            };

            dispatch(putInventoryData(inv));
            dispatch(showInventoryDialog(false));
        }else{
            alert(isValid);
        }
    };

    useEffect(() => {
        dispatch(fetchUomData());
    }, []);

    return (
        <Ref innerRef={dlgRef}>
            <Modal
                open={showDialog}
                onClose={() => dispatch(showInventoryDialog(false))}
                onOpen={handleDialogOpen}
                closeOnEscape={true}
                closeOnDimmerClick={false}
                closeIcon={true}

                size="small">
                <Modal.Header>
                    <Icon name="archive"/>
                    {dialogType} Inventory
                </Modal.Header>
                <Modal.Content>
                    <Grid container>
                        <Grid.Row columns={1}>
                            <Segment style={{width: "100%"}} secondary>
                                <Form>
                                    <Form.Field>
                                        <Input style={{width: 200}} fluid size="mini"
                                               type="text" label="Ref#" value={invRef}
                                               onChange={(e) => setInvRef(e.target.value)}/>
                                    </Form.Field>
                                    <Form.Field>
                                        <Input fluid size="mini"
                                               type="text" label="Name" value={invName}
                                               onChange={(e) => setInvName(e.target.value)}/>
                                    </Form.Field>
                                    <Form.Field>
                                        <TextArea rows={2} value={invDesc} label="Description" placeholder="Description"
                                                  onChange={(e) => setInvDesc(e.target.value)}/>
                                    </Form.Field>
                                </Form>
                            </Segment>
                        </Grid.Row>
                        <Grid.Row columns={2}>
                            <Grid.Column style={{padding:0}}>
                                <Segment loading={uomListLoading ? true : false} secondary>
                                    <Form>
                                        <Form.Field>
                                            <Dropdown fluid selection clearable deburr search labeled text={invUom===null?"Unit of Measure":getUomText(invUom)}
                                                      options={uomList.map(uom=>{
                                                          return (
                                                              {
                                                                  key: uom.id,
                                                                  value: uom.id,
                                                                  text: uom.uomName
                                                              }
                                                          )
                                                      })} lazyLoad wrapSelection={true}
                                                      value={invUom} onChange={(e, {value})=>{console.log(e, value); setInvUom(value)}}
                                                   label="Unit of Measure" />
                                        </Form.Field>
                                        <Form.Field>
                                            <Input fluid size="mini"
                                                   type="number" label="Available Quantity" value={currQty}
                                                   onChange={(e) => setCurrQty(e.target.value)}/>
                                        </Form.Field>
                                        <Form.Field>
                                            <Input fluid size="mini"
                                                   type="number" label="Min. Quantity" value={minQty}
                                                   onChange={(e) => setMinQty(e.target.value)}/>
                                        </Form.Field>
                                        <Form.Field>
                                            <Input fluid size="mini"
                                                   type="text" label="Max. Quantity" value={maxQty}
                                                   onChange={(e) => setMaxQty(e.target.value)}/>
                                        </Form.Field>
                                    </Form>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column style={{paddingRight:0}}>
                                <Segment  secondary>
                                    <Form>
                                        <Form.Field>
                                            <Checkbox toggle checked={invActive} toggle={true}
                                                      onChange={()=>setInvActive(!invActive)}
                                                      label={invActive?"Active":"Disabled"}/>
                                        </Form.Field>
                                        <Form.Field>

                                            <SemanticDatepicker label="Created" clearable={true} datePickerOnly={true}
                                                                clearIcon={true} value={invCreated}
                                                                onChange={(e, data)=>setInvCreated(data.value)} />
                                        </Form.Field>
                                    </Form>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        content="Save"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={handleSave}
                        positive
                    />
                    <Button color='black' icon="times" labelPosition="right"
                            onClick={()=>dispatch(showInventoryDialog(false))}
                            content="Cancel"/>
                </Modal.Actions>
            </Modal>
        </Ref>
    )
};


export default InventoryDialog;

