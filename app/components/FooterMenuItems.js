const FooterMenuItems = ({title, items}) => (
        <div className="flex flex-col space-y-3">
            <span className="text-tonedblack font-bold text-md font-inter">{title}</span>
            <ul className="flex flex-col space-y-2">
                {items.map((item, index) => (
                    <li key={index} className="text-sm text-tonedblack font-inter">    
                        <a href={item.url}>{item.name}</a>  
                    </li>
                ))}
            </ul>    
        </div>
    );

export default FooterMenuItems;