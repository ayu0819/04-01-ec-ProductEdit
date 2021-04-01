import React from 'react';
import styled from 'styled-components';

const Area = styled.textarea`
    color: #8a8a8a;
    width: 100%;
    height: 10em;
    padding: 1em;
    border: 1px solid #ccc;
    border-radius: 15px;
    background-clip: padding-box;
    background-color: #fff;
    font-size: 105%;
    letter-spacing: .8px;
    margin: 1em 0 0 0;
`;

const Areas = styled.div`
  label{
    text-align: left !important;
    margin: 1em 0;
    font-size:1em;
}
`;

const TextArea = (props) => {
 return(
<>
<label className="product__label">{props.label}</label>
    <Area id="textarea" autocomplete={"off"} name="textarea" cols="40" rows="4" maxlength="20" onChange={props.onChange} value={props.value} label={props.label} />
</>
 )
}

export default TextArea;