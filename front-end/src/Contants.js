import { PeopleAlt, HelpOutline } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';

export const sections = [
    { text: 'Home', icon: <HomeIcon />, link: '/admin' },
    { text: 'Users', icon: <PeopleAlt />, link: '/users' },
    { text: 'FAQs', icon: <HelpOutline />, link: '/faqs' },
];

export const apiUrl = 'http://127.0.0.1:8000/api';