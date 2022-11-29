import React from 'react';
import { FlexPlugin } from '@twilio/flex-plugin';

import MonitorTaskInfo from './components/MonitorTaskInfo/MonitorTaskInfo';

const PLUGIN_NAME = 'TaskCompleteViaTeamviewPlugin';

export default class TaskCompleteViaTeamviewPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex, manager) {
    const options = { sortOrder: -1 };
    flex.Supervisor.TaskInfoPanel.Content.add(
      <MonitorTaskInfo key='monitor-task-info-key' />,
      options,
    );
  }
}
