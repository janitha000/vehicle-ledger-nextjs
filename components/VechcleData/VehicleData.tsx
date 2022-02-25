import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {  VechicleDispatchContext, VechicleStateContext } from '../../context/VehicleContext';
import { Vehicle } from '../../models/Vehicle';

interface VehicleDataProps {
    isOpen : boolean;
    reRender: () => void;
}
const VechicleDataC : React.FC<VehicleDataProps> = ({ isOpen, reRender }) => {
    const { state: { selectedVehicle } } = React.useContext(VechicleStateContext);
    const { dispatch } = React.useContext(VechicleDispatchContext);

    const onDelete = async () => {
        await fetch(`api/vehicles/${(selectedVehicle as Vehicle)?.id}`, { method: 'DELETE' });
        window.location.reload();
    }

    if (!isOpen || selectedVehicle == null) return (<></>)
    return (
        <Card sx={{ maxWidth: 400, minWidth: 350 }}>
            <CardMedia
                component="img"
                height="140"
                image="https://www.toyota.lk/wp-content/uploads/2017/03/hhhh_114.jpg"
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {(selectedVehicle as Vehicle)?.number}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    User name: {(selectedVehicle as Vehicle)?.name}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    Phone: {(selectedVehicle as Vehicle)?.phone}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    Model : {(selectedVehicle as Vehicle)?.model}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => onDelete()}>Delete</Button>
            </CardActions>
        </Card>

    );
}

export default VechicleDataC;