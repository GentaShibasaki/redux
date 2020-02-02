const Promise = require("bluebird");
const Queue = require("queue");
const { store, addBuilds, updateBuilds } = require("../../redux/redux_build");

const queue = Queue();
queue.autostart = true;
queue.concurrency = 1;

const buildProject = async (projectId, buildNumber) => {
  await Promise.delay(3000); // Please leave this in to simulate load

  // TODO Set build status to "Running" in app state!
  const update = updateBuilds(projectId, buildNumber);
  store.dispatch(update);

  // super complex build logic following, check out project, run yarn test etc etc
  await Promise.delay(3000); // Do not modify this timing
  const buildStatus = Math.random() > 0.5 ? "Failed" : "Success";
  const output = "Donezo!";
  const updateAgain = updateBuilds(projectId, buildNumber, buildStatus, output);

  store.dispatch(updateAgain);

  // TODO Set build status and output in app state!
};

const triggerBuild = async (projectId) => {
  // TODO add this new build to application state!
  const action = addBuilds(projectId, "Pending");
  store.dispatch(action);

  // You also have to get the new build number assigned to it here.
  const buildNumber = store.getState()[projectId].length;

  queue.push(() => buildProject(projectId, buildNumber));
};

module.exports = {
  triggerBuild,
};
