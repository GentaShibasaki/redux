const router = require("express").Router();
const builds = require("./builds");
const {
  store,
  addProject,
  //  addProjectDataById,
  patchProjectDataById,
  deleteProjectDataById,
} = require("../../../redux/redux");

router.get("/", (req, res) => {
  // TODO retrieve and send all projects
  const obj = { projects: "" };
  obj.projects = store.getState();
  res.status(200).json(obj);
  // res.status(418).json({ message: "Not Implemented" });
});

router.post("/", (req, res) => {
  const project = req.body; // project data
  // TODO Add new pro;ject, give it an id and send it back.
  const action = addProject(project);

  res.status(201).json(store.dispatch(action).task);
  // res.status(418).json({ message: "Not Implemented" });
});

router.get("/:projectId", (req, res) => {
  const { projectId } = req.params;
  // TODO retrieve and send project with given id
  //  const action = addProjectDataById(projectId);

  // res.status(200).json(store.dispatch(action).task);

  res
    .status(200)
    .json(
      ...store
        .getState()
        .filter((projectInfo) => projectInfo.name === projectId)
    );

  // res.status(418).json({ message: "Not Implemented" });
});

router.patch("/:projectId", (req, res) => {
  const { projectId } = req.params;
  const project = req.body;
  // TODO edit a projects information. Make sure to validate whats being sent!

  const action = patchProjectDataById(projectId, project);

  store.dispatch(action);

  res.status(200).json(store.getState());
  // res.status(418).json({ message: "Not Implemented" });
});

router.delete("/:projectId", (req, res) => {
  const { projectId } = req.params;

  // TODO delete project, return status 200 with no body on success
  const action = deleteProjectDataById(projectId);
  store.dispatch(action);
  res.status(200).json(store.getState());
  // res.status(418).json({ message: "Not Implemented" });
});

router.use("/:projectId/builds", builds);

module.exports = router;
