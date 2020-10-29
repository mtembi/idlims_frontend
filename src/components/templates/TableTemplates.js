import React from "react";
import * as appConst from '../../constant';
import {Label} from "semantic-ui-react";

export const dateTemplate = args => {
    if (args.createDate)
        return <div>{new Date(args.createDate[0], args.createDate[1], args.createDate[2]).toDateString()}</div>
    else
        return <div></div>
};
export const uomTemplate = args => {
    if (args.uom !== null)
        return <div>{args.uom.uomShort}</div>
    else
        return <div></div>
};
export const inventoryGroupTemplate = args => {
    if (args.inventoryGroup)
        return <div>{args.inventoryGroup.groupName}</div>
    else
        return <div></div>
};

export const statusTemplate = args => {
    return <div><input style={{border: "none"}} type="checkbox" checked={args.activeStatus} disabled={true}/></div>
};

export const partnerTemplate = args => {
    console.log(args);
    if (args && args.partner) {
        return <>
            {args.partner.partnerName}{"  "}
            <Label color="blue" size="small">
                {args.partner.partnerRef}
            </Label>
        </>
    } else
        return <span></span>
};

export const docStatusTemplate = args => {
    if (args) {
        switch (args.docStatus) {
            case appConst.DOC_STATUS_ACTIVE:
                return <Label circular color="green" empty size="small"/>
            case appConst.DOC_STATUS_CLOSED:
                return <Label circular color="grey" empty size="small"/>
            case appConst.DOC_STATUS_VOIDED:
                return <Label circular color="red" empty size="small"/>
            default: return <span></span>
        }
    } else {
        return <span></span>
    }
}


export const selectionSettings = {
    type: 'Single',
    model: 'Row'
};
export const filterSettings = {
    type: 'Excel'
};

export const allowFiltering = true;
export const allowPaging = false;
export const allowSorting = true;
export const columnVirtualization = true;
export const enableVirtual = true;
export const allowExcelExport = true;

export const pageSettings = {
    pageCount: 4,
    pageSizes: true
};