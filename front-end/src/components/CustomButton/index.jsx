export default function CustomButton({title,background,color,border,children,props}){
    return(
      <button {...props} className={`px-3 text-[14px] border py-2 ${border} ${background} ${color}`}>
        {children}
        <span className='mx-2'>{title}</span>
      </button>
    )
}
  