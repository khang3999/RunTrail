export default function CustomButton({title,background,color,border,children,onClick,props}){
    return(
      <button onClick={onClick} {...props} className={`px-3 text-[14px] border py-2 ${border} ${background} ${color}`}>
        {children}
        <span className='mx-2'>{title}</span>
      </button>
    )
}
  