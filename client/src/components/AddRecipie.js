import React, { useState } from "react";
import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { addRecipeDispatcher } from "../store/actions";
import { useDispatch } from "react-redux";
import axios from "axios";

const AddRecipie = () => {
  const [title, setTitle] = useState(null);
  const [name, setFilename] = useState(null);
  const [ingredients, setIngredients] = useState(null);
  const [imageLink, setImageLink] = useState(null);
  const [redirectionLink, setRedirectionLink] = useState(null);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFilename(e.target.files[0].name);
    setImageLink(e.target.files[0]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let postRecipe = new FormData();
    postRecipe.append("title", title);
    postRecipe.append("ingredients", ingredients);
    postRecipe.append("redirection", redirectionLink);
    postRecipe.append("thumbnail", imageLink);
    dispatch(addRecipeDispatcher(postRecipe));
  };
  return (
    <div>
      <Container>
        <h2 className="my-4">Add Recipie Form</h2>
        <Form
          className="add-recipie-form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <FormGroup>
            <Label>Recipie Title</Label>
            <Input
              type="text"
              placeholder="Add recipie title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Recipie Ingredients</Label>
            <Input
              type="text"
              placeholder="Add recipie ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Image Link</Label>
            <Input
              type="file"
              placeholder="Add Image Link"
              onChange={handleChange}
              name="thumbnail"
            />
          </FormGroup>
          <FormGroup>
            <Label>Redirection Link To Recipie</Label>
            <Input
              type="text"
              placeholder="Add Redirection Link"
              value={redirectionLink}
              onChange={(e) => setRedirectionLink(e.target.value)}
            />
          </FormGroup>

          <Button type="submit" className="btn-info">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default AddRecipie;
