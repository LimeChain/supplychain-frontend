import React from 'react';
import PropTypes from 'prop-types';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import MuiButton from '@material-ui/core/Button';

import './../../css/components-inc/button.css';
import S from '../utilities/Main';

const theme01 = createMuiTheme({
    palette: {
        primary: {
            main: '#3679E0',
        },
        secondary: {
            main: '#3679E026',
            contrastText: '#3679E0',
        },
    },
});

// this is not used
const theme02 = createMuiTheme({
    palette: {
        primary: {
            main: '#6B45BB',
        },
        secondary: {
            main: '#7D42B833',
            contrastText: '#6B45BB',
        },
    },
});

interface Props {
    className?: string;
    type?: Button.TYPE_ROUNDED | Button.TYPE_TEXT_INLINE;
    color?: Button.COLOR_SCHEME_1 | Button.COLOR_SCHEME_2 | Button.COLOR_SCHEME_3 | Button.COLOR_SCHEME_4;
    href?: string,
    onClick?: () => void;
    disabled?: boolean;
    target?: string;
    download?: string;
}

export default class Button extends React.Component<Props> {

    static defaultProps: any;

    static TYPE_ROUNDED: number = 1;
    static TYPE_TEXT_INLINE: number = 2;
    static TYPE_OUTLINE: number = 3;

    static COLOR_SCHEME_1: number = 1;
    static COLOR_SCHEME_2: number = 2;
    static COLOR_SCHEME_3: number = 3;
    static COLOR_SCHEME_4: number = 4;

    cssMuiClassColor() {
        switch (this.props.color) {
            default:
            case Button.COLOR_SCHEME_1:
            case Button.COLOR_SCHEME_3:
                return 'primary';
            case Button.COLOR_SCHEME_2:
            case Button.COLOR_SCHEME_4:
                return 'secondary';
        }
    }

    muiVariant() {
        switch (this.props.type) {
            default:
            case Button.TYPE_ROUNDED:
                return 'contained';
            case Button.TYPE_TEXT_INLINE:
                return 'text';
            case Button.TYPE_OUTLINE:
                return 'outlined';
        }
    }

    muiTheme() {
        switch (this.props.color) {
            case Button.COLOR_SCHEME_1:
            case Button.COLOR_SCHEME_2:
                return theme01;
            default:
                return theme02;
        }
    }

    render() {
        const className = `Button Transition ${this.props.className}`;

        return (
            <ThemeProvider theme={theme01} >
                <ThemeProvider theme={this.muiTheme()} >
                    <MuiButton
                        disableElevation={true}
                        disabled={this.props.disabled}
                        className={className}
                        onClick={this.props.onClick}
                        variant={this.muiVariant()}
                        color={this.cssMuiClassColor()}
                        href={this.props.href}
                        target={this.props.target}
                        download = { this.props.download} >
                        <div className={'ButtonContent FlexColumn'} >
                            {this.props.children}
                        </div>
                    </MuiButton>
                </ThemeProvider>
            </ThemeProvider>
        );
    }

}

Button.defaultProps = {
    'className': S.Strings.EMPTY,
    'type': Button.TYPE_ROUNDED,
    'color': Button.COLOR_SCHEME_1,
    'href': null,
    'disabled': false,
    'onClick': null,
};
