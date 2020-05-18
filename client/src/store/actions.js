import axios from "axios";

const RecipieAdd = (payload) => ({
  type: "ADDRECIPIE",
  payload: payload,
});

const RecipieGet = (payload) => ({
  type: "GETRECIPIE",
  payload: payload,
});

const DeleteRecipie = (payload, id) => ({
  type: "DELETERECIPIE",
  payload: payload,
  id: id,
});

//Dispatching through middleware
export const RecipeGetDispatcher = () => {
  return (dispatch) => {
    axios
      .get("/api/items")
      .then((res) => {
        dispatch(RecipieGet(res.data));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};

export const deleteRecipeDispatcher = (del_id) => {
  return (dispatch) => {
    axios
      .delete(`/api/items/${del_id}`)
      .then((res) => dispatch(DeleteRecipie(null, del_id)));
  };
};

export const addRecipeDispatcher = (recipe_data) => {
  return (dispatch) => {
    axios
      .post("/api/items", recipe_data)
      .then((res) => dispatch(RecipieAdd(res.data)));
  };
};
