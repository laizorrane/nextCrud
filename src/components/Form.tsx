import { useState } from "react";
import Client from "../core/Client";
import Button from "./Button";
import Enter from "./Enter";

interface FormProps {
    client: Client
    clientChange?: (client: Client) => void 
    cancel?: () => void

}

export default function Form(props: FormProps){
    const id = props.client?.id ?? null
    const [name, setName] = useState(props.client?.name ?? '')
    const [age, setAge] = useState(props.client?.age ?? 0)

    return(
        <div>
            {id ? (
            <Enter 
            readonly
            text="Código" 
            value={id}
            className="mb-5"
            />
            ) : false}
            <Enter 
                text="Nome"
                value={name}
                isChange={setName}
                className="mb-5"
             />
            <Enter 
            text="Idade" 
            type='numberType' 
            value={age}
            isChange={setAge}
            />

            <div className="flex justify-end mt-7 ">
                <Button color="blue" className="mr-2" onClick={() => props.clientChange?.(new Client(name, +age, id))}>
                    {id ? 'Alterar' : 'Salvar'}
                </Button>
                <Button onClick={props.cancel}>
                    Cancelar
                </Button>
            </div>
        </div>
    )
}