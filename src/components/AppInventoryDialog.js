import React, {useRef, useEffect, useState} from 'react';
import {DialogComponent, AnimationSettingsModel} from "@syncfusion/ej2-react-popups";
import {showInventoryDialog, fetchUomData} from "../redux";
import {connect} from "react-redux";
import {Grid, TextField} from "@material-ui/core";
import {NumericTextBoxComponent, TextBoxComponent} from "@syncfusion/ej2-react-inputs";
import {ComboBoxComponent} from "@syncfusion/ej2-react-dropdowns";
import {makeStyles} from "@material-ui/core/styles";

const setStyle = makeStyles((theme) => ({
    root: {
        marginTop: "0.5rem",
    },
    inputText: {
        marginLeft: theme.spacing(1),
        flex: 1,
        backgroundColor: "#ffffff",
        borderRadius: "0.4em",
        border: "0.1em solid #808080",
        fontSize: "12px",
        paddingLeft: "0.5em"
    },
    textMatUI: {
        height: "34px",
        padding: "0 0 0 12px"
    }
}));

const AppInventoryDialog = ({invFxnReducer, uomReducer, toggleInventoryDialog, fetchUomList}) => {
    const classes = setStyle();
    const [winWidth, setWinWidth] = useState(710);
    const animSettings = {
        effect: 'None'
    };
    const buttonModel = [
        {
            buttonModel: {content: "Save", isPrimary: true, cssClass: "e-flat"}, "click": () => {
                console.log("ok Clicked")
            }
        },
        {
            buttonModel: {content: "Cancel", isPrimary: false, cssClass: "e-flat"}, "click": () => {
                toggleInventoryDialog(false)
            }
        },
    ];
    const theDialogWidth = () => {
        return winWidth > 700 ? "60%" : "90%";
    };

    const [invRefNum, setInvRefNum] = useState("");
    const [invName, setInvName] = useState("");
    const [invDesc, setInvDesc] = useState("");
    const [selectedUomId, setSelectedUomId] = useState(null);
    const [currQty, setCurrQty] = useState(0);

    const dlgRef = useRef(null);
    const invRefFieldRef = useRef(null);
    const invNameFieldRef = useRef(null);
    const uomComboRef = useRef(null);
    const currQtyRef = useRef(null);

    const uomComboFields = {text: "uomName", value: "id"};

    useEffect(() => {
        fetchUomList();

        console.log(invFxnReducer.selectedInventoryItem);
    }, []);

    const floatFocus = args => {
        args.target.parentElement.classList.add('e-input-focus');
    };
    const floatBlur = args => {
        args.target.parentElement.classList.remove('e-input-focus');
    };

    const handleUserInput = (args) => {
        console.log(args.currentTarget);
        switch (args.target.name) {
            case "invRefNum":
                setInvRefNum(args.target.value);

            default:
                console.log(args)
        }
    };

    const getContent = () => {
        return (
            <>
                <div className="control-pane">
                    <div className="control-section input-content-wrapper">
                        <div className="row">
                            <div className="col-xs-4 col-sm-4 col-lg-4 col-md-4">
                                a col
                            </div>
                            <div className="col-xs-8 col-sm-8 col-lg-8 col-md-8">
                                an col
                            </div>
                        </div>
                        <div className="row">
                            one row
                        </div>
                    </div>
                </div>
            </>
        )
    };
    useEffect(() => {
        setWinWidth(window.innerWidth);
        console.log(winWidth);
    }, [window.innerWidth]);

    return (
        uomReducer.uomDataLoading ?
            <div>Loading</div> :
            <DialogComponent
                ref={dlgRef}
                animationSettings={animSettings}
                enableResize={true}
                width={theDialogWidth()}
                buttons={buttonModel}
                content={getContent}
                target="#appTarget"
                visible={invFxnReducer.showInventoryDialog}
                showCloseIcon={true}
                isModal={true}
                header={invFxnReducer.inventoryDialogType + " Inventory"}
                close={() => {
                    toggleInventoryDialog()
                }}>

            </DialogComponent>
    )
};

const mapStateToProps = state => {
    return {
        invFxnReducer: state.invFxnReducer,
        uomReducer: state.uomFxnReducer
    }
};

const mapDispatchToProps = dispatch => {
    return {
        toggleInventoryDialog: () => {
            dispatch(showInventoryDialog(false))
        },
        fetchUomList: () => {
            dispatch(fetchUomData())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppInventoryDialog);