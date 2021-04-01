import React from 'react';
import styled from 'styled-components';

const FlexItem = styled.div`

label{
  text-align:left;
    font-size:1em;
    margin: 1em 0;
}
`;

const Select = styled.select`
    color: #8a8a8a;
    display: block;
    width: 100%;
    height: 44px;
    padding: 5px 5%;
    border: 1px solid #ccc;
    border-radius: 27px;
    background-clip: padding-box;
    background-color: #fff;
    font-family: 'HelveticaNeue','Arial', sans-serif;
    font-size: 105%;
    letter-spacing: .8px;
`;

const SelectBox = (props) => {
    
 return(
    <FlexItem>
       <label className="product__label">{props.label}</label>
        <Select value={props.value} id={props.id} name={props.name} onChange={(event) => props.select(event.target.value)}>
            {props.options.map((option) => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
        </Select>
   </FlexItem>
 )
}

export default SelectBox;