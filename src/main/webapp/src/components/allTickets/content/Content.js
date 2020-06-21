import React from 'react';
import './Content.css';
import RenderTableData from './RenderTableData.js';

const Content = (props) => {
    return (
            <RenderTableData users = {props.users}
                             history = {props.history}
                             checkUser = {props.checkUser}
                             checkAll = {props.checkAll}
                             flag = {props.flag}
                             checkedItems = {props.checkedItems}/>
    )
}

export default Content;

