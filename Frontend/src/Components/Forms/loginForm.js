import React from 'react';

export default function Form(props) {
    return (
        <div>
            <form>
                <label>Email : </label>
                <input type="text" placeholder="Email" name ="email" value={props.userData.email} onChange={props.handleChange}/><br/>
                <label>Password : </label>
                <input type="password" placeholder="Password" name="password" value={props.userData.password} onChange={props.handleChange}/><br/>
                <label>Remember me</label>
                <input type="checkbox" checked={props.userData.isChecked} name="isChecked" onChange={props.handleChangeCheckbox}/><br/>
                <button onClick={props.handleSubmit}>Submit</button>
            </form>
        </div>
    )
}
