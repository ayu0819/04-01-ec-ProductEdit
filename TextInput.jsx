import React from 'react';
import styled from 'styled-components';

const FlexItem = styled.div`
text-align: left;
label{
    font-size:1em;
    margin: 1em 0;
}
`;

const Input = styled.input`
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

const TextInput = (props) => {
 return(
    <FlexItem>
<label className="product__label">{props.label}</label>
  <Input
  placeholder={props.placeholder}
  type={props.type}
  name={props.name}
  id={props.id}
  className={props.class}
  required={props.required}
  autocomplete={props.complete}
  onChange={props.onChange}
  value={props.value}
  />
    </FlexItem>
 )
}

export default TextInput;