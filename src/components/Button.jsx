import { Loader } from './Loader';

const Button = ({
    children,
    text,
    className,
    disabled,
    loading,
    block,
    onClick,
    sm,
    ...res
}) => {
    let styleClasses = `
    ${!text && 'bg-[#C595C6]'}
    ${text && 'text-gray-400 hover:text-[#C595C6]'}
    cursor-pointer
    relative
    ${block ? 'w-full' : 'w-fit'}
    px-${sm ? '2' : '6'}
    ${loading ? '' : 'py-1'}
    text-sm
    text-white
    rounded-lg
   ${!text ? 'hover:bg-[#d2a6d3]' : 'hover:bg-gray-100'}
   ${' ' + className}
  `;
    return (
        <div
            {...res}
            onClick={!loading || !disabled ? onClick : () => {}}
            className={styleClasses}
        >
            {loading ? (
                <Loader dark={!text} />
            ) : (
                <div className={`text-center ${sm && 'text-xs'}`}>
                    {children}
                </div>
            )}
        </div>
    );
};

export default Button;
