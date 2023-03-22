import React, { Component } from "react";
import { ICellRendererParams } from "ag-grid-community";

interface CellStyle {
  [cssProperty: string]: string | number;
}
export default class CustomPinnedRowRenderer extends Component<
  ICellRendererParams & { style: CellStyle }
> {
  render() {
    //  return <span style={{...this.props.style,fontWeight:"bold"}}>{this.props.value}</span>;
    return <span>{this.props.value}</span>;
  }
}
