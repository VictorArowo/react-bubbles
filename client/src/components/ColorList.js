import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialColor = {
  color: '',
  code: { hex: '' }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [addColorForm, setAddColorForm] = useState({
    color: '',
    hex: ''
  });

  const handleChange = e => {
    setAddColorForm({ ...addColorForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('', { color: addColorForm.color, code: { hex: addColorForm.hex } })
      .then(({ data }) => {
        updateColors(data);
      });
  };
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/${colorToEdit.id}`, colorToEdit)
      .then(({ data }) => {
        updateColors(
          colors.map(color => {
            return color.id === data.id ? data : color;
          })
        );
        setColorToEdit(initialColor);
        setEditing(false);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const deleteColor = (color, e) => {
    e.stopPropagation();
    axiosWithAuth()
      .delete(`/${color.id}`)
      .then(({ data }) => {
        updateColors(colors.filter(color => color.id !== data));
        // setEditing(false);
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => deleteColor(color, e)}>
                x
              </span>{' '}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="color"
          placeholder="Color"
          value={addColorForm.color}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="hex"
          placeholder="Hexcode"
          value={addColorForm.hex}
          onChange={handleChange}
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};

export default ColorList;
