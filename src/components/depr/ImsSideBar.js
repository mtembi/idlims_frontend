import React from "react";
import {Menu, Segment, Sidebar, Dropdown} from "semantic-ui-react";
import {sideBarToggled} from "../../redux";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";

const ImsSideBar=()=>{
    const dispatch=useDispatch();
    const showSideBar=useSelector(state=>state.uxReducer.showSideBar);
    const isLoggedIn=useSelector(state=>state.userFxnReducer.isLoggedIn);
    const history=useHistory();

    return (
        isLoggedIn?
            <Sidebar
                animation={"push"}
                icon={"labeled"}
                inverted
                onHide={()=>{dispatch(sideBarToggled())}}
                vertical
                visible={showSideBar}
                width="wide"
                as={Menu}>
                <Segment.Group>
                    <Segment inverted>
                        <Menu inverted>

                            <Dropdown item text='More'>
                                <Dropdown.Menu>
                                    <Dropdown.Item inverted icon='edit' text='Edit Profile' />
                                    <Dropdown.Item icon='globe' text='Choose Language' />
                                    <Dropdown.Item icon='settings' text='Account Settings' />
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu>
                    </Segment>
                </Segment.Group>
            </Sidebar>:''
    )
};

export default ImsSideBar;