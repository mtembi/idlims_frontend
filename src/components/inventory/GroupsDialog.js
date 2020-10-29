import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ADD_ITEM_CONSTANT, EDIT_ITEM_CONSTANT} from "../../constant";
import {pushInvGroup, showInvGroupDialog, showNotification} from "../../redux";
import {Button, ButtonGroup, Form, Grid, Icon, Input, Label, Modal, Segment} from "semantic-ui-react";
import * as uiconsts from '../templates/UiDefaults';

const GroupsDialog = () => {


    const allData = useSelector(state => state.invGrpFxnReducer.invGroupList);
    const selectedData = useSelector(state => state.invGrpFxnReducer.selectedInvGroup);
    const dialogType = useSelector(state => state.invGrpFxnReducer.dialogType);
    const dialogOpen = useSelector(state => state.invGrpFxnReducer.showDialog);
    const pushError = useSelector(state => state.invGrpFxnReducer.putInvGrpError);
    //const pushLoading = useSelector(state => state.invGrpFxnReducer.putInvGrpLoading);
    const invGrpDispatch = useDispatch();

    const [grpName, setGrpName] = useState("");

    useEffect(() => {
        if (dialogType === EDIT_ITEM_CONSTANT && selectedData !== null) {
            setGrpName(selectedData.groupName);
        }
    }, [dialogType, selectedData]);

    const handleSave = () => {
        if (grpName && grpName.length > 0) {
            if (allData.filter(a => a.groupName.toLowerCase() === grpName.toLowerCase()).length > 0) {
                invGrpDispatch(showNotification("Duplicate: Group name exists", "warning"));
            } else {
                let grp = {
                    groupName: grpName
                };
                invGrpDispatch(pushInvGroup(grp));
                if (pushError && pushError.length > 0) {
                    invGrpDispatch(showNotification(pushError, "error"));
                } else {
                    invGrpDispatch(showInvGroupDialog(false), ADD_ITEM_CONSTANT);
                    invGrpDispatch(showNotification("New inventory group created", "success"));
                }
            }
        } else {
            invGrpDispatch(showNotification("Required: Group name", "warning"));
        }
    };


    return (
        <Modal onClose={() => invGrpDispatch(showInvGroupDialog(false, ADD_ITEM_CONSTANT))}
               closeOnEscape={true}
               closeOnDimmerClick={false}
               closeIcon={true}
               size={"mini"}
               open={dialogOpen}>
            <Modal.Header>
                <Icon name="gg"/>
                {dialogType} Inventory Group
            </Modal.Header>
            <Modal.Content>
                <Grid container>
                    <Grid.Row columns={1}>
                        <Segment style={{width: "100%"}} secondary>
                            <Form>
                                <Form.Field>
                                    <Input type="text" labelPosition="left" size="mini" value={grpName}
                                           onChange={e => setGrpName(e.target.value)}>
                                        <Label>Group Name</Label>
                                        <input/>
                                    </Input>
                                </Form.Field>
                            </Form>
                        </Segment>
                    </Grid.Row>
                </Grid>
            </Modal.Content>
            <Modal.Actions>
                <ButtonGroup>
                    <Button primary size="tiny" onClick={handleSave}>
                        <Icon name={uiconsts.SAVE_ICON}/>
                        Save
                    </Button>
                    <Button secondary size="tiny"
                            onClick={() => invGrpDispatch(showInvGroupDialog(false, ADD_ITEM_CONSTANT))}>
                        <Icon name={uiconsts.CANCEL_ICON}/>
                        Cancel
                    </Button>
                </ButtonGroup>
            </Modal.Actions>
        </Modal>
    )
};

export default GroupsDialog;