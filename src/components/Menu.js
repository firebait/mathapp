import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const menuStyle = {
  padding: '20px'
};

const labelStyle = {
  color: 'rgb(0, 188, 212)',
  fontSize: '20px'
};

const selectStyle = {
  marginBottom: '30px'
};

const Menu = ({ operation, digits, onOperationChange, onDigitsChange }) => {

  return (
    <div style={menuStyle}>
      <label style={labelStyle}>Operation</label>
      <br />
      <SelectField id="operation" value={operation} onChange={onOperationChange} style={selectStyle}>
        <MenuItem value="addition" primaryText="Addition" />
        <MenuItem value="substraction" primaryText="Substraction" />
      </SelectField>
      <br />
      <label style={labelStyle}>Max Digits</label>
      <br />
      <SelectField id="digits" value={digits} onChange={onDigitsChange}>
        <MenuItem value={1} primaryText="1" />
        <MenuItem value={2} primaryText="2" />
        <MenuItem value={3} primaryText="3" />
        <MenuItem value={4} primaryText="4" />
        <MenuItem value={5} primaryText="5" />
        <MenuItem value={6} primaryText="6" />
        <MenuItem value={7} primaryText="7" />
        <MenuItem value={8} primaryText="8" />
        <MenuItem value={9} primaryText="9" />
        <MenuItem value={10} primaryText="10" />
      </SelectField>
    </div>
  );
}

export default Menu;
