import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    variant: 'primary' | 'secondary',
    children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({variant, children, onClick, className}) => {
    return ( 
    <button onClick={onClick} className={classNames(`p-2 border test-sm text-gray-500 rounded-md transition duration-500`,
     variant == 'primary' ? 'hover:border-red-600 hover:text-red-600'
                          : 'hover:border-green-600 hover:text-green-600', className)}>
    {children}
    </button>
     );
}
 
export default Button