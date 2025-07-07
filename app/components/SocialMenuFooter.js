import Image from "next/image";
const SocialMenuFooter = ({title, items}) => (
        <div className="flex flex-col space-y-3">
            <span className="text-white font-bold text-md font-inter">{title}</span>
            <ul className="flex space-x-3">
                {items.map((item, index) => (
                    <li key={index} className="text-sm text-white font-inter">    
                        <a href={item.url}><Image src={item.icon} alt={item.name} width={16} height={16} /></a>  
                    </li>
                ))}
            </ul>    
        </div>
    );

export default SocialMenuFooter;