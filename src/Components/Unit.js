
import {
    Menu,
    MenuItem
} from '@szhsin/react-menu';

const Unit = (props) => {

    return (
        <Menu menuButton={<img style={{ height: "100%", objectFit: "scale-down" }} src={props.image} alt={props.name} />} transition>
            <MenuItem>{props.name || "no name"}</MenuItem>
            {props.menuItems}
        </Menu>
    )
}

export default Unit;