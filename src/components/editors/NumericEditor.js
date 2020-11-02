import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";


const KEY_BACKSPACE = 8;
const KEY_DELETE = 46;
const KEY_F2 = 113;
const KEY_ENTER = 13;
const KEY_TAB = 9;


const NumericEditor = forwardRef((props, ref) => {
    const createInitialState = () => {
        let startValue;
        let highlightAllOnFocus = true;

        if (props.keyPress === KEY_BACKSPACE || props.keyPress === KEY_DELETE) {
            startValue = '';
        } else if (props.charPress) {
            startValue = props.charPress;
            highlightAllOnFocus = false;
        } else {
            startValue = props.value;
            if (props.keyPress === KEY_F2) {
                highlightAllOnFocus = false;
            }
        }

        return {
            value: startValue,
            highlightAllOnFocus
        }
    };

    const initialState = createInitialState();

    const [value, setValue] = useState(initialState.value);

    const [highlightAllOnFocus, setHighlightAllOnFocus] = useState(initialState.highlightAllOnFocus);

    const refInput = useRef(null);

    const cancelBeforeStart = props.charPress && (('1234567890').indexOf(props.charPress)) < 0;

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

    const isKeyPressedNumeric = event => {
        const charCode = getCharCodeFromEvent(event);
        const charStr = event.key ? event.key : String.fromCharCode(charCode);
        return isCharNumeric(charStr);
    };

    const deleteOrBackSpace = event => {
        return [KEY_BACKSPACE, KEY_DELETE].indexOf(event.keyCode) > -1;
    };

    const finishedEditingPressed = event => {
        const charCode = getCharCodeFromEvent(event);
        return charCode === KEY_ENTER || charCode === KEY_TAB;
    };

    const onKeyDown = event => {
        console.log(event);
        if (isLeftOrRight(event) || deleteOrBackSpace(event)) {
            event.stopPropagation();
            return;
        }

        if (!finishedEditingPressed(event) && !isKeyPressedNumeric(event)) {
            if (event.preventDefault)
                event.preventDefault();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown);

        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [onKeyDown]);

    useImperativeHandle(ref, () => {
        return {
            afterGuiAttached() {
                const eInput = refInput.current;
                eInput.focus();
                if (highlightAllOnFocus) {
                    eInput.select();
                    setHighlightAllOnFocus(false);
                } else {
                    const length = eInput.value ? eInput.value.length : 0;
                    if (length > 0) {
                        eInput.setSelectionRange(length, length);
                    }
                }
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

    const inputStyle={
        width: '100%',
        height: '27px',
        fontSize: '1rem',
        textAlign:'right',
        border: 'none',
    };

    return (
        <input ref={refInput} value={value} onChange={event => setValue(event.target.value)} style={inputStyle}/>
    )

});

export default NumericEditor;