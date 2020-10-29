import React, {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Grid, Modal, Segment, Form, Input, Label} from "semantic-ui-react";
import {showVendOrdDialog} from "../../redux";
import * as appConsts from '../../constant';

const VendOrderDialog = () => {
    const dispatch = useDispatch();
    const showDialog = useSelector(state => state.vendOrdReducer.dialogShown);
    const dialogType = useSelector(state => state.vendOrdReducer.docType);
    const modalRef = useRef(null);

    return (
        <>
            <Modal open={showDialog}
                   triggerRef={modalRef}
                   closeOnDimmerClick={false}
                   closeOnEscape={true}
                   closeIcon={true}
                   size={"large"}
                   onClose={() => dispatch(showVendOrdDialog(false, appConsts.ADD_ITEM_CONSTANT))}>
                <Modal.Header>
                    {dialogType} Vendor Order
                </Modal.Header>
                <Modal.Content>
                    <Form>
                        <Segment>
                            <Grid columns={2} stackable>
                                <Grid.Column verticalAlign="top">
                                    Supplier Detail
                                </Grid.Column>
                                <Grid.Column verticalAlign="top" textAlign="right">
                                    <Segment raised>
                                        <Form.Field inline>
                                            <Label size="mini">Date</Label>
                                            <Input size="mini" type="date"/>
                                        </Form.Field>
                                    </Segment>
                                </Grid.Column>
                            </Grid>
                        </Segment>
                    </Form>
                </Modal.Content>
                <Modal.Actions>

                </Modal.Actions>
            </Modal>
        </>
    )
};

export default VendOrderDialog;