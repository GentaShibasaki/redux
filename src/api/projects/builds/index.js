const router = require("express").Router({ mergeParams: true });
const { store } = require("../../../../redux/redux_build");
const { triggerBuild } = require("../../../util/build");

router.get("/", (req, res) => {
  const { projectId } = req.params;
  // TODO Get and return all builds of given project
  const buldsInf = store.getState();
  const builds = { builds: "" };
  builds.builds = !buldsInf[projectId] ? [] : buldsInf[projectId];
  res.status(200).json(builds);
  // res.status(418).json({ message: "Not Implemented" });
});

router.post("/", (req, res) => {
  const { projectId } = req.params;
  // TODO Trigger a new build for a project. Return immediately with status 200 (don't wait for build to finish).
  triggerBuild(projectId);
  res.status(200).send();
  // res.status(418).json({ message: "Not Implemented" });
});

router.get("/latest", (req, res) => {
  const { projectId } = req.params;
  // TODO Retrieve the latest build of a project
  const latestBuildsInf = store.getState()[projectId].pop();
  res.status(200).json(latestBuildsInf);
});

router.get("/:buildId", (req, res) => {
  const { projectId, buildId } = req.params;
  // TODO Retrieve a single build from a project
  const buildsInf = store.getState()[projectId][buildId];
  res.status(200).json(buildsInf);
  // res.status(418).json({ message: "Not Implemented" });
});

module.exports = router;
