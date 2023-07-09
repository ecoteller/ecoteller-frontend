import { Avatar, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';

function Logo({ size }) {
  let logoSize = 40; // Default size
  switch (size) {
    case 'sm':
      logoSize = 30;
      break;
    case 'md':
      logoSize = 40;
      break;
    case 'lg':
      logoSize = 50;
      break;
    default:
      logoSize = 40;
  }

  return (
    <Tooltip title="Ecoteller" placement="bottom">
      <Link to="/home">
        <Avatar
          src="assets/images/logo/ecoteller-logo.png"
          alt="Ecoteller Logo"
          sx={{ width: logoSize, height: logoSize }}
        />
      </Link>
    </Tooltip>
  );
}

export default Logo;
