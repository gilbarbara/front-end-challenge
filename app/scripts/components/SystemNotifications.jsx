import React from 'react';
import { autobind } from 'core-decorators';
import { shouldComponentUpdate } from 'utils/helpers';

import { hideAlert } from 'actions';

let hideTimeout;

export default class SystemNotifications extends React.Component {
  static propTypes = {
    app: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
  };

  shouldComponentUpdate = shouldComponentUpdate;

  componentDidUpdate() {
    if (this.props.app.notifications.visible && this.props.app.notifications.withTimeout) {
      window.clearTimeout(hideTimeout);

      hideTimeout = setTimeout(() => {
        this.hideNotification();
      }, 3500);
    }
  }

  hideNotification() {
    this.props.dispatch(hideAlert());
  }

  @autobind
  onClick() {
    window.clearTimeout(hideTimeout);
    this.hideNotification();
  }

  render() {
    const notifications = this.props.app.notifications;

    const classes = `app__notifications${(notifications.visible ? ' active' : '')}${(notifications.status ? ` ${notifications.status}` : '')}`;
    const iconClass = {
      success: 'i-thumbs-up',
      warning: 'i-exclamation-circle',
      info: 'i-info-circle',
      error: 'i-thumbs-down'
    };

    return (
      <div key="SystemNotification" className={classes} onClick={this.onClick}>
        <div>
          <i className={iconClass[notifications.status]} />
          <div className="app__notifications__message">{notifications.message}</div>
        </div>
      </div>
    );
  }
}
