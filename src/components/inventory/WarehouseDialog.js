import React, {useState} from "react";
import {Button, Form, Icon, Input, Label, Modal, Segment} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import {pushWhData, showWhDialog} from "../../redux/whFxn/WhFxnActions";
import * as appConsts from '../../constant';
import * as uiDefs from '../templates/UiDefaults';
import {showNotification} from "../../redux";

const WarehouseDialog = () => {
    const dispatch = useDispatch();
    const showDialog = useSelector(state => state.whFxnReducer.showWhDialog);
    const dialogType = useSelector(state => state.whFxnReducer.dialogType);
    // const checkExistLoad = useSelector(state => state.whFxnReducer.checkExistLoading);
    // const checkExistRes = useSelector(state => state.whFxnReducer.checkExistResult);
    // const pushDataLoad = useSelector(state => state.whFxnReducer.pushWhLoading);
    // const pushDataError = useSelector(state => state.whFxnReducer.pushWhError);
    const [whName, setWhName] = useState("");



    const handleSave = () => {
        if (whName.length > 0) {
            let wh={
                whName: whName
            };
            dispatch(pushWhData(wh));
        } else {
            dispatch(showNotification("Required: Warehouse name", "warning"));
        }
    };

    const clearFields = () => {
        setWhName("");
        dispatch(showWhDialog(false, appConsts.ADD_ITEM_CONSTANT));
    };

    return (
        <Modal open={showDialog}
               onClose={() => dispatch(showWhDialog(false, appConsts.ADD_ITEM_CONSTANT))}
               closeOnEscape={true}
               closeOnDimmerClick={false}
               closeIcon={true}
               size="small">
            <Modal.Header>
                <Icon name="archive"/>
                {dialogType} Warehouse
            </Modal.Header>
            <Modal.Content>
                <Segment style={{width: "100%"}} secondary>
                    <Form>
                        <Form.Group>
                            <Input type="text" labelPosition="left" size="mini" value={whName}
                                   onChange={(e) => setWhName(e.target.value)}>
                                <Label basic>Name</Label>
                                <input/>
                            </Input>
                        </Form.Group>
                    </Form>
                </Segment>
            </Modal.Content>
            <Modal.Actions>
                <Button.Group>
                    <Button icon primary size="mini" onClick={handleSave}>
                        <Icon name={uiDefs.SAVE_ICON}/>
                        Save
                    </Button>
                    <Button icon size="mini" secondary onClick={clearFields}>
                        <Icon name={uiDefs.CANCEL_ICON}/>
                        Close
                    </Button>
                </Button.Group>
            </Modal.Actions>
        </Modal>
    )
};

export default WarehouseDialog;