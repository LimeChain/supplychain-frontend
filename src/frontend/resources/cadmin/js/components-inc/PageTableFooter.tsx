import React from 'react';
import S from '../../../common/js/utilities/Main';
import { formatPrice } from '../../../common/js/helpers/NumeralHelper';

import '../../css/components-inc/page-table-footer.css';

interface Props {
    totalItems: number;
    totalPrice?: number;
    actions: React.ReactNode,
}

export default class PageTableFooter extends React.Component<Props> {

    static defaultProps: any;

    render() {
        return (
            <div className={'PageTableFooter FlexRow FlexSplit'} >
                <div className={'ItemsCnt FlexRow'} >
                    <div className={'Item'}>Items: <span>{this.props.totalItems}</span></div>
                    {this.props.totalPrice !== S.NOT_EXISTS && (
                        <div className={'Item'}>
                            Total Price: <span>{formatPrice(this.props.totalPrice)}</span>
                        </div>
                    )}
                </div>
                <div className={'StartRight'} >
                    {this.props.actions}
                </div>
            </div>
        )
    }

}

PageTableFooter.defaultProps = {
    totalPrice: S.NOT_EXISTS,
};
