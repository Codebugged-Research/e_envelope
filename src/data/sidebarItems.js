import InboxIcon from '@material-ui/icons/Inbox';
import StarIcon from '@material-ui/icons/Star';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import SendIcon from '@material-ui/icons/Send';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import LabelIcon from '@material-ui/icons/Label';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';
import ArchiveIcon from '@material-ui/icons/Archive';
import DraftsIcon from '@material-ui/icons/Drafts';
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
        icon: <ArchiveIcon />,
        text: 'Outbox',
        link:'/outbox'
    },{
        icon: <SendIcon />,
        text: 'Sent',
        link:'/sent'
    },{
        icon: <DraftsIcon />,
        text: 'Drafts',
        link:'/draft'
    },
    {
        icon: <DeleteIcon />,
        text: 'Trash',
        link:'/trash'
    },
    {
        icon: <ReportIcon />,
        text: 'Spam',
        link:'/spam'
    },
]

export default sidebarItems