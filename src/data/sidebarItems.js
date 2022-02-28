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
        text: 'Inbox',
        link:'/inbox'
    },{
        icon: <StarIcon />,
        text: 'Starred',
        link:'/starred'
    },{
        icon: <WatchLaterIcon />,
        text: 'Outbox',
        link:'/important'
    },{
        icon: <SendIcon />,
        text: 'Sent',
        link:'/sent'
    },{
        icon: <InsertDriveFileIcon />,
        text: 'Drafts',
        link:'/draft'
    },
]

export default sidebarItems