import React from "react";

export const MainLoader = ({text}) => {
    return (
        <div className="col-12 text-center">
            <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"/>
            <p>{text || "Loading..."}</p>
        </div>
    );
};

export default MainLoader;
