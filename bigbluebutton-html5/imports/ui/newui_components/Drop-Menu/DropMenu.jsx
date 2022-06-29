import React from "react";
import PropTypes from "prop-types";
import { defineMessages, injectIntl } from "react-intl";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Divider } from "@material-ui/core";

import Icon from "/imports/ui/components/icon/component";
import Button from "/imports/ui/components/button/component";

import { ENTER, SPACE } from "/imports/utils/keyCodes";

import { styles } from "./styles";

import ChatIcon from "./icons/ChatIcon";
import DesktopIcon from "./icons/DesktopIcon";
import PenIcon from "./icons/PenIcon";
import PromoteIcon from "./icons/PromoteIcon";
import RemoveIcon from "./icons/RemoveIcon";
import Micoff from "./icons/Micoff";

const intlMessages = defineMessages({
    close: {
        id: 'app.dropdown.close',
        description: 'Close button label',
    },
});

//Used to switch to mobile view
const MAX_WIDTH = 640;

class DropMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
        };

        this.opts = props.opts;
        this.autoFocus = false;

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.renderIcon = this.renderIcon.bind(this);
    }

    handleClick(event) {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose(event) {
        const { onCloseCallback } = this.props;
        this.setState({ anchorEl: null }, onCloseCallback());

        if (event) {
            event.persist();

            if (event.type === 'click') {
                setTimeout(() => {
                    document.activeElement.blur();
                }, 0);
            }
        }
    };

    renderIcon(icon) {
        switch (icon) {
            case "mute":
                return <Micoff/>
            case "chat":
                return <ChatIcon />
            case "presentation":
                return <DesktopIcon />
            case "pen_tool":
                return <PenIcon />
            case "promote":
                return <PromoteIcon />
            case "circle_close":
                return <RemoveIcon />
            default:
                return <Icon iconName={icon} className={styles.iconStyle} key="icon" />
        }
    }

    makeMenuItems() {
        const { actions, selectedEmoji } = this.props;

        return actions?.map(a => {
            const { dataTest, label, onClick, key, disabled } = a;
            const itemClasses = [styles.menuitem, a?.className];

            if (key?.toLowerCase()?.includes(selectedEmoji?.toLowerCase())) itemClasses.push(styles.emojiSelected);

            return [
                a.dividerTop && <Divider disabled />,
                <div className={styles.dropMenuItem}
                    disabled={disabled}
                    onClick={(event) => {
                        onClick();
                        const close = !key.includes('setstatus') && !key.includes('back');
                        // prevent menu close for sub menu actions
                        if (close) this.handleClose(event);
                    }}
                >
                    <div style={{ display: 'flex', flexFlow: 'row', width: '100%', alignItems: 'center' }}>
                        {/* {a.icon ? <Icon iconName={a.icon} key="icon" /> : null} */}
                        {a.icon ? this.renderIcon(a.icon) : null}
                        <div className={styles.option}>{label}</div>
                        {a.iconRight ? <Icon iconName={a.iconRight} key="iconRight" className={styles.iRight} /> : null}
                    </div>
                </div>,
                // <MenuItem
                //   key={label}
                //   data-test={dataTest || key}
                //   className={itemClasses.join(' ')}
                //   disableRipple={true}
                //   disableGutters={true}
                //   disabled={disabled}
                //   style={{ paddingLeft: '4px',paddingRight: '4px',paddingTop: '8px', paddingBottom: '8px', marginLeft: '4px', marginRight: '4px' }}
                //   onClick={(event) => {
                //     onClick();
                //     const close = !key.includes('setstatus') && !key.includes('back');
                //     // prevent menu close for sub menu actions
                //     if (close) this.handleClose(event);
                //   }}>
                //   <div style={{ display: 'flex', flexFlow: 'row', width: '100%' }}>
                //     {a.icon ? <Icon iconName={a.icon} key="icon" /> : null}
                //     <div className={styles.option}>{label}</div>
                //     {a.iconRight ? <Icon iconName={a.iconRight} key="iconRight" className={styles.iRight} /> : null}
                //   </div>
                // </MenuItem>,
                a.divider && <Divider disabled />
            ];
        });
    }

    render() {
        const { anchorEl } = this.state;
        const { trigger, intl, wide, classes } = this.props;
        const actionsItems = this.makeMenuItems();
        const menuClasses = classes || [];
        menuClasses.push(styles.menu);
        if (wide) menuClasses.push(styles.wide);

        return (
            <>
                <div
                    onClick={(e) => {
                        e.persist();
                        this.opts.autoFocus = !(['mouse', 'touch'].includes(e.nativeEvent.pointerType));
                        this.handleClick(e);
                    }}
                    onKeyPress={(e) => {
                        e.persist();
                        if (e.which !== ENTER) return null;
                        this.handleClick(e);
                    }}
                    accessKey={this.props?.accessKey}
                >
                    {trigger}
                </div>

                <Menu
                    {...this.opts}
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    className={menuClasses.join(' ')}
                    style={{ zIndex: 9999 }}
                >
                    {actionsItems}
                    {anchorEl && window.innerWidth < MAX_WIDTH &&
                        <Button
                            className={styles.closeBtn}
                            label={intl.formatMessage(intlMessages.close)}
                            size="lg"
                            color="default"
                            onClick={this.handleClose}
                        />
                    }
                </Menu>
            </>
        );
    }
}

export default injectIntl(DropMenu);

DropMenu.defaultProps = {
    opts: {
        id: "default-dropdown-menu",
        autoFocus: false,
        keepMounted: true,
        transitionDuration: 0,
        elevation: 3,
        getContentAnchorEl: null,
        fullwidth: "true",
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        transformorigin: { vertical: 'top', horizontal: 'right' },
    },
    onCloseCallback: () => { },
    wide: false,
};

DropMenu.propTypes = {
    intl: PropTypes.shape({
        formatMessage: PropTypes.func.isRequired,
    }).isRequired,

    trigger: PropTypes.element.isRequired,

    actions: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func,
        icon: PropTypes.string,
        iconRight: PropTypes.string,
        disabled: PropTypes.bool,
        divider: PropTypes.bool,
        dividerTop: PropTypes.bool,
        accessKey: PropTypes.string,
    })).isRequired,

    onCloseCallback: PropTypes.func,

    wide: PropTypes.bool,
};
