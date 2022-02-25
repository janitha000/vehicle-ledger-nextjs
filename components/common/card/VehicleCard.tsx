import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface Props {
    header : string;
    value : string;
    unit : string;
}

const VehicleCard : React.FC<Props>= ({ header, value, unit = null }) => {
    return (
        <Card sx={{ minWidth: 275, maxWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {header}
                </Typography>
                <Typography variant="h3" color="text.secondary">
                    {value} {unit}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default React.memo(VehicleCard)