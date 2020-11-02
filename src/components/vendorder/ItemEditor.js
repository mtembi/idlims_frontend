import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import * as PropTypes from 'prop-types';

const KEY_BACKSPACE = 8;
const KEY_DELETE = 46;
const KEY_F2 = 113;
const KEY_ENTER = 13;
const KEY_TAB = 9;

const ItemEditor = forwardRef((props, ref) => {
    const createInitialState = () => {
        let startValue = "";

        if (props.charPress) {
            startValue = props.charPress
        } else {
            startValue = props.value;
            if (props.keyPress === KEY_F2) {
                //reqd highlight
            }
        }
        return {
            value: startValue
        }
    };
    const initialState = createInitialState();
    const [value, setValue] = useState(initialState.value);
    const refInput = useRef(null);

    const cancelBeforeStart = props.charPress;

    const isLeftOrRight = event => {
        return [37, 39].indexOf(event.keyCode) > -1;
    };

    const getCharCodeFromEvent = event => {
        event = event || window.event;
        return (typeof event.which === "undefined") ? event.keyCode : event.which;
    };

    const isCharNumeric = charStr => {
        return !!/\d/.test(charStr);
    };

    const isKeyPressedNumeric=event=>{
        const charCode = getCharCodeFromEvent(event);
        const charStr = event.key ? event.key : String.fromCharCode(charCode);
        return isCharNumeric(charStr);
    };

    const finishedEditingPressed = event => {
        const charCode = getCharCodeFromEvent(event);
        return charCode === KEY_ENTER || charCode === KEY_TAB;
    };

    const deleteOrBackSpace = event => {
        return [KEY_BACKSPACE, KEY_DELETE].indexOf(event.keyCode) > -1;
    };

    const onKeyDown=event=>{
        if (isLeftOrRight(event) || deleteOrBackSpace(event)) {
            event.stopPropagation();
            return;
        }

        if (!finishedEditingPressed(event) ) {
            if (event.preventDefault)
                event.preventDefault();
        }
    };

    useEffect(()=>{
        window.addEventListener('keydown', onKeyDown);

        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    });

    useImperativeHandle(ref, () => {
        return {
            afterGuiAttached(params: IAfterGuiAttachedParams): void {
                console.log("ItemEditor: imperative", params);
                const eInput = refInput.current;
                eInput.focus();
            },
            getValue() {
                return value;
            },
            isCancelBeforeStart() {
                return cancelBeforeStart;
            },
            isCancelBeforeEnd() {
                return value > 1000000;
            }
        }
    });

    const inputStyle = {
        width: '100%',
        height: '27px',
        fontSize: '1rem',
        border: 'none'
    };

    return (
        <select ref={refInput} value={value ? value : ""} onChange={event => setValue(event.target.value)}
                style={inputStyle}>
            {
                props.itemList && props.itemList.map(a => {
                    return <option key={a.id} value={a}>a.invName</option>
                })
            }
        </select>
    )
});

ItemEditor.propTypes = {
    itemList: PropTypes.array.isRequired
};

export default ItemEditor;