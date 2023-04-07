import React from "react";

function Image({src, alt, className,onClick,key}) {
    return (
        <img
            className={className}
            src={src}
            alt={alt}
            onClick={onClick}
            key={key}
        />
    );
}

export default Image;