exports.handler = async function (context, event, callback) {
  console.log(`🐞 task-complete called.`);

  // CORS settings
  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Got event variables
  const { workspaceSid, taskSid } = event;
  if (!workspaceSid || !taskSid)
    throw new Error('Event variables was not existed.');

  try {
    // Create twilio client
    const twilioClient = context.getTwilioClient();

    // Update task to completed
    await twilioClient.taskrouter.v1
      .workspaces(workspaceSid)
      .tasks(taskSid)
      .update({
        assignmentStatus: 'completed',
      });
    console.log(`🐞 task updated.`);

    response.appendHeader('Content-Type', 'application/json');
    response.setBody({});
    callback(null, response);
  } catch (err) {
    console.error(err.message ? err.message : err);
    response.appendHeader('Content-Type', 'plain/text');
    response.setBody(err);
    callback(null, response);
  }
};
