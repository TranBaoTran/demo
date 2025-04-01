import { IoEye, IoEyeOff  } from "react-icons/io5";
import './Auth.css'; 
import { useState } from "react";

const PasswordInput = ({password, warning, setPassword}) => {
    const [isPassSeen, setIsPassSeen] = useState(false)

    return (
        <>
            <div className="pass-input-container">
                <input 
                    type={isPassSeen ? "text" : "password"} 
                    placeholder={warning} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isPassSeen ? 
                (
                    <IoEyeOff className="pass-icon" onClick={() => setIsPassSeen(!isPassSeen)}/>
                ):(
                    <IoEye className="pass-icon" onClick={() => setIsPassSeen(!isPassSeen)}/>
                )}
            </div>
        </>
    )
}

export default PasswordInput