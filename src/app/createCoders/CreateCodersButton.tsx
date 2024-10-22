'use client'

import { ICreateCoder } from "@/models/coders/coder.model"
import { CoderService } from "@/services/coders.service"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

function CreateCoder() {

    const useCoderService = new CoderService()
    const router = useRouter()

    const handleSubmit = async(coder: ICreateCoder, e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try {
            
            await useCoderService.create(coder)
            router.push('/')
            alert("Success")
        } catch (error) {
            alert(error)
        }
    }

    const handleClick = () => {
        router.push('/')
    }
    
    const [coder, setCoder] = useState<ICreateCoder>({
        name: '',
        avatar: ''
    });

    return (
        <form onSubmit={(e) => handleSubmit(coder,e)}>
            <input type="text" name="name" placeholder="Nombre" onChange={e => setCoder({...coder, name: e.target.value})} />
            <input type="text" name="avatar" placeholder="URL Avatar" onChange={e => setCoder({...coder, avatar: e.target.value})}/>
            <button type="submit">Crear</button>
            <button onClick={handleClick}>Cancelar</button>
        </form>
    );
};

export default CreateCoder;