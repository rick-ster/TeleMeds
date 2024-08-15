import React, { useState } from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
 

const usePasswordToggle = () =>{
    const [visible, setvisibility] =useState(false);
    
    const Icon = (
        <FontAwesomeIcon icon={visible ? "eye-slash" : "eye"} onClick={ () => setvisibility(visiblity =>  !visiblity)} />
    )

    const InputType = visible ? "text" : "password";

    return [InputType, Icon];
}

export default usePasswordToggle;