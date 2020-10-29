import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Form, Icon, Input, Label, Modal, Segment} from "semantic-ui-react";
import {putUomData, showUomDialog} from "../../redux";

const UomDialog = () => {
    const dialogOpen = useSelector(state => state.uomFxnReducer.showUomDialog);
    const dialogType = useSelector(state => state.uomFxnReducer.uomDialogType);
    const uomPutError = useSelector(state => state.uomFxnReducer.uomPutError);

    const [uomId, setUomId] = useState(null);
    const [uomName, setUomName] = useState("");
    const [uomShort, setUomShort] = useState("");

    const dispatch = useDispatch();

    const handleDialogShown = () => {
        console.log("Uom dialog shown");
    };

    const clearFields = () => {
        setUomId(null);
        setUomName("");
        setUomShort("");
    };

    const handleSave = () => {
        let uom = {
            id: uomId,
            uomName: uomName,
            uomShort: uomShort
        };
        dispatch(putUomData(uom));
        if (uomPutError && uomPutError.length > 0) {
            console.log(uomPutError)
        } else {
            dispatch(showUomDialog(false));
        }
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
                <Segment style={{width: "100%"}} secondary>
                    <Form>
                        <Form.Group>
                            <Input type="text" labelPosition="left" size="mini" value={uomName}
                                   onChange={(e) => setUomName(e.target.value)}>
                                <Label basic>Name</Label>
                                <input/>
                            </Input>
                            <Input type="text" labelPosition="left" size="mini" value={uomShort}
                                   style={{width: "100px"}} onChange={(e) => setUomShort(e.target.value)}>
                                <Label basic>ShortName</Label>
                                <input/>
                            </Input>
                        </Form.Group>
                    </Form>
                </Segment>
            </Modal.Content>
            <Modal.Actions>
                <Button.Group>
                    <Button icon secondary size="mini" onClick={clearFields}>
                        <Icon name="cancel"/>
                        Cancel
                    </Button>
                    <Button icon primary size="mini" onClick={handleSave}>
                        <Icon name="check"/>
                        Save
                    </Button>
                </Button.Group>
            </Modal.Actions>
        </Modal>
    )
};

export default UomDialog;