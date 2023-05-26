import React from 'react';
import cx from 'classnames';
import Toggle from '/imports/ui/components/switch/component';
import { defineMessages, injectIntl } from 'react-intl';
import BaseMenu from '../base/component';
import { styles } from '../styles';

const intlMessages = defineMessages({
  dataSavingLabel: {
    id: 'app.settings.dataSavingTab.label',
    description: 'label for data savings tab',
  },
  webcamLabel: {
    id: 'app.settings.dataSavingTab.webcam',
    description: 'webcam toggle',
  },
  screenShareLabel: {
    id: 'app.settings.dataSavingTab.screenShare',
    description: 'screenshare toggle',
  },
  dataSavingDesc: {
    id: 'app.settings.dataSavingTab.description',
    description: 'description of data savings tab',
  },

  savebuttonLabel: {
    id: 'app.settings.main.save.label',
    description: 'setting save button label',
  }
});

class DataSaving extends BaseMenu {
  constructor(props) {
    super(props);

    this.state = {
      settingsName: 'dataSaving',
      settings: props.settings,
    };

    this.saveSetting = this.saveSetting.bind(this);
  }

  saveSetting() {
    const {changeSetting} = this.props
    changeSetting();
  }

  render() {
    const { intl, showToggleLabel, displaySettingsStatus } = this.props;

    const { viewParticipantsWebcams, viewScreenshare } = this.state.settings;

    return (
      <div className={styles.appFormDiv}>
        <div>
          {/* <h3 className={styles.title}>{intl.formatMessage(intlMessages.dataSavingLabel)}</h3> */}
          <h4 className={styles.subtitle}>{intl.formatMessage(intlMessages.dataSavingDesc)}</h4>
        </div>
        <div className={styles.form}>
          <div className={styles.row}>
            <div className={styles.col} aria-hidden="true">
              <div className={styles.formElement}>
                <label className={styles.label}>
                  {intl.formatMessage(intlMessages.webcamLabel)}
                </label>
              </div>
            </div>
            <div className={styles.col}>
              <div className={cx(styles.formElement, styles.pullContentRight)}>
                {displaySettingsStatus(viewParticipantsWebcams)}
                <Toggle
                  icons={false}
                  defaultChecked={viewParticipantsWebcams}
                  onChange={() => this.handleToggle('viewParticipantsWebcams')}
                  ariaLabelledBy="webcamToggle"
                  ariaLabel={intl.formatMessage(intlMessages.webcamLabel)}
                  showToggleLabel={showToggleLabel}
                />
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col} aria-hidden="true">
              <div className={styles.formElement}>
                <label className={styles.label}>
                  {intl.formatMessage(intlMessages.screenShareLabel)}
                </label>
              </div>
            </div>
            <div className={styles.col}>
              <div className={cx(styles.formElement, styles.pullContentRight)}>
                {displaySettingsStatus(viewScreenshare)}
                <Toggle
                  icons={false}
                  defaultChecked={viewScreenshare}
                  onChange={() => this.handleToggle('viewScreenshare')}
                  ariaLabelledBy="screenShare"
                  ariaLabel={intl.formatMessage(intlMessages.screenShareLabel)}
                  showToggleLabel={showToggleLabel}
                />
              </div>
            </div>
          </div>
          <button className={styles.saveSettingButton} onClick={this.saveSetting}>{intl.formatMessage(intlMessages.savebuttonLabel)}</button>
        </div>
      </div>
    );
  }
}

export default injectIntl(DataSaving);