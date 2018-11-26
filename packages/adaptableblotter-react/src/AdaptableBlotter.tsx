﻿import * as React from 'react'
import { BlotterFactory, AdaptableBlotterApp } from 'adaptableblotter/factory'
import { IAdaptableBlotter, IAdaptableBlotterOptions } from 'adaptableblotter/types'

// This is the main React Wrapper
// It simply takes an IAdaptableBlotterOptions object and instantiates the appropriate instance of the Adaptable Blotter
export interface AdaptableBlotterProps extends React.ClassAttributes<AdaptableBlotter> {
  AdaptableBlotterOptions: IAdaptableBlotterOptions
  VendorGridName: 'agGrid' | 'Hypergrid'
}

export interface AdaptableBlotterState extends React.ClassAttributes<AdaptableBlotter> {
  AdaptableBlotter: IAdaptableBlotter
}

export default class AdaptableBlotter extends React.Component<
  AdaptableBlotterProps,
  AdaptableBlotterState
> {
  componentWillMount() {
    const { AdaptableBlotterOptions, VendorGridName } = this.props;
    AdaptableBlotterOptions.adaptableBlotterContainer =
      AdaptableBlotterOptions.adaptableBlotterContainer || `adaptableBlotter-${Math.random() * 10000 | 0}`;
    this.setState({
      AdaptableBlotter: BlotterFactory.CreateAdaptableBlotter(
        AdaptableBlotterOptions,
        VendorGridName
      )
    })
  }

  render() {
    return (
      <div id="adaptableBlotter">
        <AdaptableBlotterApp AdaptableBlotter={this.state.AdaptableBlotter} />
      </div>
    )
  }
}
