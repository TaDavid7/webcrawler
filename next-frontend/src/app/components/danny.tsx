import {useEffect, useState} from 'react';

export interface Props{
    name: string;
    age: string;
}
const Danny: React.FC<Props> = ({name, age}) => {
    const [button, setButton] = ("");
    return (

       <div>
        <button
        
        ></button>
            {name}
            {age}
       </div>
    );
}
export default Danny;