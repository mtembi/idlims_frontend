import React from "react";
import {Segment} from "semantic-ui-react";
import CustDelReqTable from "../components/custdelreq/CustDelReqTable";


const AppCustDelReqView=()=>{



    return (
        <Segment.Group raised>
            <Segment inverted color="blue">
                <h3>Delivery Requests</h3>
            </Segment>
            <Segment>
                <CustDelReqTable/>
            </Segment>
        </Segment.Group>
    )
};

export default AppCustDelReqView;