const redux = require("redux");

//Actions
const addBuilds = (projectId, status) => ({
  type: "ADD_BUILD",
  projectId,
  status,
});

const updateBuilds = (projectId, buildNumber, buildStatus, output) => ({
  type: "UPDATE_BUILD",
  projectId,
  buildNumber,
  buildStatus,
  output,
});

//store
const initialState = {};

//reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_BUILD":
      if (Object.getOwnPropertyNames(state).includes(action.projectId)) {
        state[action.projectId] = [
          ...state[action.projectId],
          {
            status: action.status,
            buildNumber: state[action.projectId].length,
          },
        ];
        return state;
      }
      state[action.projectId] = [
        {
          status: action.status,
          buildNumber: 0,
        },
      ];
      return state;

    case "UPDATE_BUILD":
      if (!action.buildStatus) {
        state[action.projectId][action.buildNumber - 1].status = "Running";
      } else {
        state[action.projectId][action.buildNumber - 1].status =
          action.buildStatus;
        state[action.projectId][action.buildNumber - 1].output = action.output;
      }
      return state;
  }
  return state;
};

const store = redux.createStore(reducer, initialState);

module.exports = {
  store,
  addBuilds,
  updateBuilds,
};
