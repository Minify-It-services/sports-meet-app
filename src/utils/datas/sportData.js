// icons
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import ExtensionIcon from '@mui/icons-material/Extension';

export const sports = [
    {
        id: 1,
        typeOfSports: 'Football',
        getIcon(){
            return(
                <div>
                    <SportsSoccerIcon/>
                </div>
            )
        }
    },
    {
        id: 2,
        typeOfSports: 'Basketball',
        getIcon(){
            return(
                <div>
                    <SportsBasketballIcon />
                </div>
            )
        }
    },
    {
        id: 3,
        typeOfSports: 'Volleyball',
        getIcon(){
            return(
                <div>
                    <SportsVolleyballIcon />
                </div>
            )
        }
    },
    {
        id: 4,
        typeOfSports: 'Cricket',
        getIcon(){
            return(
                <div>
                    <SportsCricketIcon />
                </div>
            )
        }
    },
    {
        id: 5,
        typeOfSports: 'Badminton',
        getIcon(){
            return(
                <div>
                    <SportsScoreIcon />
                </div>
            )
        }
    },
    {
        id: 6,
        typeOfSports: 'Table Tennis',
        getIcon(){
            return(
                <div>
                    <SportsTennisIcon />
                </div>
            )
        }
    },
    {
        id: 7,
        typeOfSports: 'Chess',
        getIcon(){
            return(
                <div>
                    <ExtensionIcon />
                </div>
            )
        }
    },
];
