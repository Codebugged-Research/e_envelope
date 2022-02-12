import InboxIcon from '@material-ui/icons/Inbox';
import StarIcon from '@material-ui/icons/Star';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import SendIcon from '@material-ui/icons/Send';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import LabelIcon from '@material-ui/icons/Label';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

 const sidebarItems = [
    {
        icon: <InboxIcon />,
        text: 'Inbox'
    },{
        icon: <StarIcon />,
        text: 'Starred'
    },{
        icon: <WatchLaterIcon />,
        text: 'Important'
    },{
        icon: <SendIcon />,
        text: 'Sent'
    },{
        icon: <InsertDriveFileIcon />,
        text: 'Drafts'
    },
]

export default sidebarItems