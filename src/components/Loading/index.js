import React, {Component} from "react";

export const MainLoader = ({text}) => {
    return (
        <div className="col-12 text-center">
            <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"/>
            <p>{text || "Loading..."}</p>
        </div>
    );
};

export const SmallLoader = ({text}) => {
    return (
        <div className="col-12 text-center">
            <span className="fa fa-spinner fa-pulse fa-fw text-primary"/> {text || "Loading..."}
        </div>
    );
};

export const ComponentLoader = ({isLoading, children}) => {
    if (isLoading) {
        return <MainLoader />
    }

    return children;

};

export default MainLoader;
