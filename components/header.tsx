interface HeaderProps{
  heading: string,
  desc: string
}

const Header: React.FC<HeaderProps> = ({
  heading,
  desc
}) => {
    return ( 
        <div className="w-[80%] flex flex-col border-b p-2">
        <h1 className="text-2xl font-semibold">{heading}</h1>
        <p className="text-gray-500">{desc}</p>
       </div>
     );
}
 
export default Header;