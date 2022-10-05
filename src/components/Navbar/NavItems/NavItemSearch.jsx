import React from 'react'

const NavItemSearch = ({open}) => {

    if(open){
        return (
            <div>Search Abierto</div>
        )
    }
    return (
        <div>search</div>
    )
}

export default NavItemSearch