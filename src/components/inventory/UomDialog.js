import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {Icon, Modal, List, Grid, Segment, Label, Input, Form, Button} from "semantic-ui-react";
import {putUomData, showUomDialog, fetchUomData} from "../../redux";

const UomDialog=()=>{
    const dialogOpen=useSelector(state=>state.uomFxnReducer.showUomDialog);
    const dialogType=useSelector(state=>state.uomFxnReducer.uomDialogType);
    const uomList=useSelector(state=>state.uomFxnReducer.uomDataList);

    const [uomId, setUomId]=useState(null);
    const [uomName, setUomName]=useState("");
    const [uomShort, setUomShort]=useState("");

    const dispatch=useDispatch();

    useEffect(()=>{
        function fetchUoms(){
            dispatch(fetchUomData());
        }
        fetchUoms();
    }, []);

    const handleDialogShown=()=>{
        console.log("Uom dialog shown");
    };


    const uomListItem=item=>{
        return (
            <List.Item key={item.id}>
                <List.Header as="a" name={item.id} onClick={(e)=>handleUomClick(e)}>{item.uomName +" ("+item.uomShort+")"}</List.Header>
            </List.Item>
        )
    };

    const handleUomClick=(e)=>{
        let uom=uomList.filter(a=>a.id===parseInt(e.target.name))[0];
        if(uom){
            setUomId(uom.id);
            setUomName(uom.uomName);
            setUomShort(uom.uomShort);
        }else{
            setUomId(null);
            setUomName("");
            setUomShort("");
        }
    };

    const clearFields=()=>{
        setUomId(null);
        setUomName("");
        setUomShort("");
    };

    const handleSave=()=>{
        let uom={
            id:uomId,
            uomName: uomName,
            uomShort: uomShort
        };
        dispatch(putUomData(uom));
    };

    return (
        <Modal open={dialogOpen}
               onClose={() => dispatch(showUomDialog(false))}
               onOpen={handleDialogShown}
               closeOnEscape={true}
               closeOnDimmerClick={false}
               closeIcon={true}
               size="small">
            <Modal.Header>
                <Icon name="archive"/>
                {dialogType} Uom
            </Modal.Header>
            <Modal.Content>
                <Grid container>
                    <Grid.Row columns={1}>
                        <Segment style={{width:"100%"}} secondary>
                            <Form>
                                <Form.Group>
                                    <Input type="text" labelPosition="left" size="mini" value={uomName}
                                           onChange={(e)=>setUomName(e.target.value)}>
                                        <Label basic>Name</Label>
                                        <input/>
                                    </Input>
                                    <Input type="text" labelPosition="left" size="mini" value={uomShort}
                                           style={{width:"100px"}} onChange={(e)=>setUomShort(e.target.value)}>
                                        <Label basic>ShortName</Label>
                                        <input/>
                                    </Input>
                                </Form.Group>
                                <Button.Group>
                                    <Button icon size="mini" onClick={clearFields}>
                                        <Icon name="cancel"/>
                                    </Button>
                                    <Button icon positive size="mini" onClick={handleSave}>
                                        <Icon name="check"/>
                                    </Button>
                                </Button.Group>
                            </Form>
                        </Segment>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Segment style={{width:"100%"}} secondary>
                            <List divided relaxed>
                                {uomList.map(item=>uomListItem(item))}
                            </List>
                        </Segment>
                    </Grid.Row>
                </Grid>
            </Modal.Content>
        </Modal>
    )
};

export default UomDialog;