const redux = require("redux");

//Actions
const addProject = (task) => ({
  type: "addProject",
  task,
});

const patchProjectDataById = (pjId, pjInfo) => ({
  type: "patchProjectDataById",
  pjId,
  pjInfo,
});

const deleteProjectDataById = (pjId) => ({
  type: "deleteProjectDataById",
  pjId,
});

//reducer

const reducer = (state = [], action) => {
  switch (action.type) {
    case "addProject": {
      return [...state, action.task];
    }
    case "patchProjectDataById": {
      for (let i = 0; i < state.length; i++) {
        if (state[i].name === action.pjId) {
          state[i].buildCommand = action.pjInfo.buildCommand;
          state[i].language = action.pjInfo.language;
        }
      }
      return state;
    }
    case "deleteProjectDataById": {
      return state.filter((projectInfo) => !(projectInfo.name === action.pjId));
    }
  }
  return state;
};

//store
const initialState = [];
const store = redux.createStore(reducer, initialState);

//module exorts
module.exports = {
  store,
  addProject,
  patchProjectDataById,
  deleteProjectDataById,
};
//  addProjectDataById,
