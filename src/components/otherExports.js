import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Typography } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import VisibilityIcon from '@mui/icons-material/Visibility';

export const options = {
  // weekday: 'long',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};

export function LikeWithCount({like, children, onClick, getLike }) {
  return (
    <div onClick={onClick} className="flex" style={{ margin: "0px 10px 0 0" }}>
      {like ? ( <FavoriteIcon color="error" onClick={getLike} /> ) : (<FavoriteBorderIcon onClick={getLike} />)}
      <Typography ml={1}>{children}</Typography>
    </div>
  );
}

export function ChatBubbleWithCount({children, onClick }) {
  return (
    <div onClick={onClick} className="flex" style={{ margin: "0px 10px" }}>
      <ChatBubbleOutlineIcon />
      <Typography ml={1}>{children}</Typography>
    </div>
  );
}

export function ViewWithCount({children, onClick }) {
  return (
    <div onClick={onClick} className="flex" style={{ margin: "0px 10px" }}>
      <VisibilityIcon />
      <Typography ml={1}>{children}</Typography>
    </div>
  );
}
