import classNames from "classnames";

const Spinner = ({loading}:{loading: boolean}) => {
    return ( 
        <div className={classNames(`rotate-anim absolute h-4 w-4 top-1 none right-1 border bg-transparent border-t 
        border-b border-transparent border-t-white border-b-white rounded-full`,
        !loading && 'hidden')}/>
     );
}
 
export default Spinner;