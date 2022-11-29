# Complete the task via Teams view Plugin

This plugin customizes the behavior of [Twilio Flex](https://www.twilio.com/flex). Specifically, it adds the option to change task status to 'Completed' from 'Wrapping':

![Complete task](./img/screen-shot.png?raw=true)

The choices available as CallerId are phone numbers that have already been purchased in the Flex project and are available for use with Voice.

## Configuration

The plugin consists of two parts: the Flex Plugin and the Serverless Function.
The Serverless Function is called from within the Flex Plugin.

## Setup function

```bash
% git clone https://github.com/mobilebiz/plugin-task-complete-via-teamview.git
% cd plugin-task-complete-via-teamview
% cd task-complete

# If you use npm
% npm install
# If you use yarn
% yarn install

# Deploy
% npm run deploy

...

✔ Serverless project successfully deployed

Deployment Details
Domain: task-complete-XXXX-dev.twil.io
Service:
   task-complete (ZS...)
Environment:
   dev (ZE...)
Build SID:
   ZB...
Runtime:
   node14
View Live Logs:
   https://www.twilio.com/console/functions/editor/ZS.../environment/ZE...
Functions:
   https://task-complete-XXXX-dev.twil.io/task-complete
Assets:
```

When the deployment is complete, record the "Domain:" shown in the results. Such as "task-complete-XXXX-dev.twil.io".

## Setup Flex Plugin

```bash
% cd ..
% cp .env.sample .env
```

Update the copied .env file with an editor. The contents to be updated are as follows.

| Key                      | Value                                                              |
| :----------------------- | :----------------------------------------------------------------- |
| FLEX_APP_FUNCTION_DOMAIN | task-complete-XXXX-dev.twil.io(Change XXXX to your configuration.) |

### Change I18N

The standard language setting is Japanese, but if you want to use it in English, change the 4th line of `src/components/MonitorTaskInfo.jsx` as follows.

```javascript
import CS from '../../i18n/EN'; // i18n Character set.
```

### Deploy

Installation is done with the following command.

```bash
# If you use npm
% npm install
# If you use yarn
% yarn install
```

## Local test

```bash
% npm start
```

## Build & Deploy

```bash
# Build & Deploy
% npm run build && npm run deploy
```

## Release

Once deployed, you can manually release your plugin via the Flex UI or via

```bash
twilio flex:plugins:release --plugin plugin-name@version --name "name" --description "description"
```

Note: Common packages like `React`, `ReactDOM`, `Redux` and `ReactRedux` are not bundled with the build because they are treated as external dependencies so the plugin will depend on Flex to provide them globally.
