import React from 'react';
import Actions from '../../../common/js/components-inc/Actions';
import Button from '../../../common/js/components-inc/Button';

import SvgEmptyList from '../../../common/svg/empty-list-page.svg';
import SvgAdd from '@material-ui/icons/Add';

import '../../css/components-inc/no-entry-page.css';

interface Props {
    buttonFunction: any,
    subText: string,
    modelName: string,
    buttonText: string,
}

export default class PageView extends React.Component<Props> {

    render() {
        return (
            <div className={'NoEntryPage WhiteBox PageExtend FlexColumn'} >
                <div className={'SVG Icon'} dangerouslySetInnerHTML={{ __html: SvgEmptyList }}></div>
                <div className={'EmptyListHeader'}>Your list with {this.props.modelName}s is empty</div>
                <div className={'EmptyListText'}>{this.props.subText}</div>
                {this.props.buttonFunction === null ? ''
                    : <Actions>
                        <Button onClick={this.props.buttonFunction}>
                            <div className={'FlexRow'}>
                                <div className={'SVG Size ButtonSvg'} ><SvgAdd /></div>

                                {this.props.buttonText}
                            </div>
                        </Button>
                    </Actions>}
            </div>
        )
    }

}
