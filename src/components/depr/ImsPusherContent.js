import React from "react";
import {Header, Segment, Sidebar} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import ImsRouteContent from "../ui/ImsRouteContent";

const ImsPusherContent = () => {
    const dispatch = useDispatch();
    const showDimmer = useSelector(state => state.uxReducer.showSideBar);

    return (
        <Sidebar.Pusher dimmed={showDimmer}>
            <Segment.Group>
                <Segment basic>
                    <Header as='h3'>IDL-IMS</Header>
                </Segment>
                <Segment>
                    <ImsRouteContent/>
                </Segment>
            </Segment.Group>
        </Sidebar.Pusher>
    )
};

export default ImsPusherContent;