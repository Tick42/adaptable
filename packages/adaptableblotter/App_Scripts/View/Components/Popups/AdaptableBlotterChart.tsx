import { IAdaptableBlotter } from '../../../Api/Interface/IAdaptableBlotter';
import * as React from "react";
import { Modal, Button } from 'react-bootstrap';
import { DistinctCriteriaPairValue } from '../../../Utilities/Enums'
import { AdaptableViewFactory } from '../../AdaptableViewFactory';
import { UIHelper } from '../../UIHelper';
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';
import * as ScreenPopups from '../../../Utilities/Constants/ScreenPopups';
import { ChartDisplayPopupPropsBase } from '../SharedProps/ChartDisplayPopupPropsBase';

export interface IAdaptableBlotterChartProps extends React.ClassAttributes<AdaptableBlotterChart> {
  showChart: boolean;
  onClose?: Function;
  AdaptableBlotter: IAdaptableBlotter;
  showModal: boolean;
}

export class AdaptableBlotterChart extends React.Component<IAdaptableBlotterChartProps, {}> {
  render() {

    let cssClassName: string = StyleConstants.AB_STYLE

    let modalContainer: HTMLElement = UIHelper.getModalContainer(this.props.AdaptableBlotter.BlotterOptions, document);
    let bodyElement: any = AdaptableViewFactory[ScreenPopups.ChartDisplayPopup];

    let commonProps: ChartDisplayPopupPropsBase<this> = {
      getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => this.props.AdaptableBlotter ? this.props.AdaptableBlotter.getColumnValueDisplayValuePairDistinctList(columnId, distinctCriteria) : null,
      Columns: this.props.AdaptableBlotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns,
      ModalContainer: modalContainer,
      cssClassName: cssClassName + StyleConstants.MODAL_BODY,
      BlotterOptions: this.props.AdaptableBlotter.BlotterOptions,
      BlotterApi: this.props.AdaptableBlotter.api,
      ChartService: this.props.AdaptableBlotter.ChartService,
      onClose: this.props.onClose,
      showModal: this.props.showModal
    }

    var body: any = React.createElement(bodyElement, commonProps);

    return (
      <div>
        {this.props.showModal ?
          <Modal show={this.props.showChart} onHide={this.props.onClose} className={cssClassName + StyleConstants.BASE}
            container={modalContainer} >
            <div className={cssClassName + StyleConstants.MODAL_BASE}>
              <Modal.Body className={cssClassName + StyleConstants.MODAL_BODY}>
                <div className="ab_main_chart">
                  {body}
                </div>
              </Modal.Body>
              <Modal.Footer className={cssClassName + StyleConstants.MODAL_FOOTER}>
                <Button className={cssClassName + StyleConstants.MODAL_FOOTER + StyleConstants.CLOSE_BUTTON} onClick={() => this.props.onClose()}>Close</Button>
              </Modal.Footer>
            </div>
          </Modal>
          :
          <div  style={{ marginLeft: '25px', marginBottom: '25px' }}>
            {body}
          </div>

        }
      </div>
    );
  }
}