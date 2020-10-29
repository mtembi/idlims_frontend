import React, {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GridComponent} from "@syncfusion/ej2-react-grids";
import * as TableTemplate from '../templates/TableTemplates';
import {columnVirtualization} from '../templates/TableTemplates';
import {Dropdown, Form, Segment, SegmentGroup} from "semantic-ui-react";
import {fetchInventoryData} from "../../redux";
import {fetchStockcard} from "../../redux/invFxn/InvFxnActions";


const StockcardTable = () => {
    const dispatch = useDispatch();

    const invList = useSelector(state => state.invFxnReducer.inventoryDataList);
    const stockcardData = useSelector(state => state.invFxnReducer.fetchStockCardData);
    const gridRef = useRef(null);

    useEffect(() => {
        dispatch(fetchInventoryData());
    }, [dispatch]);

    const handleInvSelect = (args) => {
        console.log(args.value);
        dispatch(fetchStockcard(args.value));
    };

    return (
        <>
            <SegmentGroup>
                <Segment secondary raised>
                    <Form>
                        <Form.Group>
                            <Dropdown fluid selection clearable search labeled
                                      onChange={(e, value)=>handleInvSelect(value)}
                                      lazyLoad
                                      wrapSelection
                                      options={invList.map(inv => {
                                          return ({
                                              key: inv.id,
                                              value: inv.id,
                                              text: (inv.invRef + " " + inv.invName)
                                          })
                                      })}>

                            </Dropdown>
                        </Form.Group>
                    </Form>
                </Segment>
                <Segment secondary>
                    <GridComponent ref={gridRef}
                                   dataSource={stockcardData}
                                   pageSettings={TableTemplate.pageSettings}
                                   allowPaging={TableTemplate.allowPaging}
                                   height={300}
                                   allowSorting={TableTemplate.allowSorting}
                                   enableColumnVirtualization={TableTemplate - columnVirtualization}
                                   enableVirtualization={TableTemplate.enableVirtual}
                                   filterSettings={TableTemplate.filterSettings}
                                   allowFiltering={TableTemplate.allowFiltering}
                                   allowExcelExport={TableTemplate.allowExcelExport}
                                   selectionSettings={TableTemplate.selectionSettings}>

                    </GridComponent>
                </Segment>
            </SegmentGroup>
        </>
    )
};

export default StockcardTable;
