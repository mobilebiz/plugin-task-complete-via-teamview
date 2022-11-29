import React from 'react';
import axios from 'axios';
import { Manager, withTaskContext } from '@twilio/flex-ui';
import CS from '../../i18n/JP'; // i18n Character set.

import { Theme } from '@twilio-paste/core/theme';
import { Box } from '@twilio-paste/core';
import { Button } from '@twilio-paste/core/button';

// Get environment variables.
const { FLEX_APP_FUNCTIONS_DOMAIN } = process.env;

const MonitorTaskInfo = (props) => {
  const { task } = props;
  const isLight = Manager.getInstance().configuration.theme.isLight; // Get current theme.

  const handleClick = async (e) => {
    e.currentTarget.blur(); // Un focus button.

    if (window.confirm(CS.TaskCompleteConfirmTitle)) {
      try {
        const url = `https://${FLEX_APP_FUNCTIONS_DOMAIN}/task-complete`;
        const body = {
          workspaceSid: task._source.workspace_sid,
          taskSid: task._source.task_sid,
        };
        await axios.post(url, body);
      } catch (err) {
        alert(`ERROR: ${err.message ? err.message : err}`);
      }
    }
  };

  return (
    <Theme.Provider theme={isLight ? 'default' : 'dark'}>
      {task._source.status === 'wrapup' ? (
        <Box paddingLeft='space10' paddingTop='space10' paddingBottom='space40'>
          <Button variant='destructive_secondary' onClick={handleClick}>
            {CS.TaskCompleteButtonTitle}
          </Button>
        </Box>
      ) : (
        ''
      )}
    </Theme.Provider>
  );
};

export default withTaskContext(MonitorTaskInfo);
