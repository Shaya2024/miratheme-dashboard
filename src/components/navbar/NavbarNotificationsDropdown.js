import React, { useRef, useState } from "react";
import Link from "next/link";
import styled from "@emotion/styled";

import {
  Avatar as MuiAvatar,
  Badge,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover as MuiPopover,
  SvgIcon,
  Tooltip,
  Typography,
} from "@mui/material";
import { Bell, Home, UserPlus, Server } from "lucide-react";

const Popover = styled(MuiPopover)`
  .MuiPaper-root {
    width: 300px;
    ${(props) => props.theme.shadows[1]};
    border: 1px solid ${(props) => props.theme.palette.divider};
  }
`;

const Indicator = styled(Badge)`
  .MuiBadge-badge {
    background: ${(props) => props.theme.header.indicator.background};
    color: ${(props) => props.theme.palette.common.white};
  }
`;

const Avatar = styled(MuiAvatar)`
  background: ${(props) => props.theme.palette.primary.main};
`;

const NotificationHeader = styled(Box)`
  text-align: center;
  border-bottom: 1px solid ${(props) => props.theme.palette.divider};
`;

function Notification({ title, description, Icon }) {
  return (
    <ListItem component={Link} href="/" divider>
      <ListItemAvatar>
        <Avatar>
          <SvgIcon fontSize="small">
            <Icon />
          </SvgIcon>
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        primaryTypographyProps={{
          variant: "subtitle2",
          color: "textPrimary",
        }}
        secondary={description}
      />
    </ListItem>
  );
}

function NavbarNotificationsDropdown() {
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Tooltip title="Notifications">
        <IconButton color="inherit" ref={ref} onClick={handleOpen} size="large">
          <Indicator badgeContent={7}>
            <Bell />
          </Indicator>
        </IconButton>
      </Tooltip>
      <Popover
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
      >
        <NotificationHeader p={2}>
          <Typography variant="subtitle2" color="textPrimary">
            7 New Notifications
          </Typography>
        </NotificationHeader>
        <React.Fragment>
          <List disablePadding>
            <Notification
              title="Update complete"
              description="Restart server to complete update."
              Icon={Server}
            />
            <Notification
              title="New connection"
              description="Anna accepted your request."
              Icon={UserPlus}
            />
            <Notification
              title="Lorem ipsum"
              description="Aliquam ex eros, imperdiet vulputate hendrerit et"
              Icon={Bell}
            />
            <Notification
              title="New login"
              description="Login from 192.186.1.1."
              Icon={Home}
            />
          </List>
          <Box p={1} display="flex" justifyContent="center">
            <Button component={Link} href="/" size="small">
              Show all notifications
            </Button>
          </Box>
        </React.Fragment>
      </Popover>
    </React.Fragment>
  );
}

export default NavbarNotificationsDropdown;
