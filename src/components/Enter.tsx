interface EnterProps {
    type?: 'textType' | 'numberType' 
    text: string
    value: any
    readonly?: boolean
    isChange?: (value: any) => void
    className?: string

}

export default function Enter(props: EnterProps){
    return(
        <div className={`flex flex-col ${props.className}`}>
            <label className="mb-4">
                {props.text}
            </label>
            <input 
            type={props.type ?? 'textType'}
            value={props.value}
            readOnly={props.readonly}
            onChange={e => props.isChange?.(e.target.value)}
            className={`border-purple-500 rounded-lg focus:outline-none bg-purple-100 px-4 py-2 
            ${props.readonly ? '' : 'focus:bg-white'}`}>
            </input>
        </div>
    )
}