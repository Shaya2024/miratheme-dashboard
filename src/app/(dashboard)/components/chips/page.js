"use client";

import React, { useState } from "react";
import styled from "@emotion/styled";
import NextLink from "next/link";

import {
  Avatar,
  CardContent,
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Chip as MuiChip,
  Divider as MuiDivider,
  Typography,
  Stack,
} from "@mui/material";
import {
  Done as DoneIcon,
  Face as FaceIcon,
  TagFaces as TagFacesIcon,
} from "@mui/icons-material";
import { spacing } from "@mui/system";

const Card = styled(MuiCard)(spacing);

const Chip = styled(MuiChip)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const DefaultChips = () => {
  const handleDelete = () => {
    alert("You clicked the delete icon.");
  };

  const handleClick = () => {
    alert("You clicked the chip.");
  };

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Default Chips
        </Typography>
        <Typography variant="body2" gutterBottom>
          Examples of Chips, using an image Avatar, SVG Icon Avatar, "Letter"
          and (string) Avatar.
        </Typography>
        <div>
          <Chip label="Basic Chip" m={1} />
          <Chip
            avatar={<Avatar>MB</Avatar>}
            label="Clickable Chip"
            onClick={handleClick}
            m={1}
          />
          <Chip
            avatar={
              <Avatar alt="Natacha" src="/static/img/avatars/avatar-1.jpg" />
            }
            label="Deletable Chip"
            onDelete={handleDelete}
            m={1}
          />
          <Chip
            avatar={
              <Avatar>
                <FaceIcon />
              </Avatar>
            }
            label="Clickable Deletable Chip"
            onClick={handleClick}
            onDelete={handleDelete}
            m={1}
          />
          <Chip
            icon={<FaceIcon />}
            label="Clickable Deletable Chip"
            onClick={handleClick}
            onDelete={handleDelete}
            m={1}
          />
          <Chip
            label="Custom delete icon Chip"
            onClick={handleClick}
            onDelete={handleDelete}
            deleteIcon={<DoneIcon />}
            m={1}
          />
          <Chip
            label="Clickable Link Chip"
            component="a"
            href="#chip"
            clickable
            m={1}
          />
          <Chip
            avatar={<Avatar>MB</Avatar>}
            label="Primary Clickable Chip"
            clickable
            color="primary"
            onDelete={handleDelete}
            deleteIcon={<DoneIcon />}
            m={1}
          />
          <Chip
            icon={<FaceIcon />}
            label="Primary Clickable Chip"
            clickable
            color="primary"
            onDelete={handleDelete}
            deleteIcon={<DoneIcon />}
            m={1}
          />
          <Chip
            label="Deletable Primary Chip"
            onDelete={handleDelete}
            color="primary"
            m={1}
          />
          <Chip
            avatar={
              <Avatar>
                <FaceIcon />
              </Avatar>
            }
            label="Deletable Secondary Chip"
            onDelete={handleDelete}
            color="secondary"
            m={1}
          />
          <Chip
            icon={<FaceIcon />}
            label="Deletable Secondary Chip"
            onDelete={handleDelete}
            color="secondary"
            m={1}
          />
        </div>
      </CardContent>
    </Card>
  );
};

const ColoredChips = () => {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Colored Chips
        </Typography>
        <Typography variant="body2" gutterBottom>
          You can use the <code>color</code> prop to define a color from theme
          palette.
        </Typography>
        <div>
          <Stack direction="row">
            <Chip label="Default" m={1} />
            <Chip label="Primary" color="primary" m={1} />
            <Chip label="Secondary" color="secondary" m={1} />
            <Chip label="Success" color="success" m={1} />
            <Chip label="Warning" color="warning" m={1} />
            <Chip label="Error" color="error" m={1} />
            <Chip label="Info" color="info" m={1} />
          </Stack>
          <Stack direction="row">
            <Chip label="Default" variant="outlined" m={1} />
            <Chip label="Primary" color="primary" variant="outlined" m={1} />
            <Chip
              label="Secondary"
              color="secondary"
              variant="outlined"
              m={1}
            />
            <Chip label="Success" color="success" variant="outlined" m={1} />
            <Chip label="Warning" color="warning" variant="outlined" m={1} />
            <Chip label="Error" color="error" variant="outlined" m={1} />
            <Chip label="Info" color="info" variant="outlined" m={1} />
          </Stack>
        </div>
      </CardContent>
    </Card>
  );
};

const OutlinedChips = () => {
  const handleDelete = () => {
    alert("You clicked the delete icon.");
  };

  const handleClick = () => {
    alert("You clicked the chip.");
  };

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Outlined Chips
        </Typography>
        <Typography variant="body2" gutterBottom>
          Outlined chips offer an alternative style.
        </Typography>
        <div>
          <Chip label="Basic Chip" m={1} />
          <Chip
            avatar={<Avatar>MB</Avatar>}
            label="Clickable Chip"
            onClick={handleClick}
            m={1}
            variant="outlined"
          />
          <Chip
            avatar={
              <Avatar alt="Natacha" src="/static/img/avatars/avatar-1.jpg" />
            }
            label="Deletable Chip"
            onDelete={handleDelete}
            m={1}
            variant="outlined"
          />
          <Chip
            avatar={
              <Avatar>
                <FaceIcon />
              </Avatar>
            }
            label="Clickable Deletable Chip"
            onClick={handleClick}
            onDelete={handleDelete}
            m={1}
            variant="outlined"
          />
          <Chip
            icon={<FaceIcon />}
            label="Clickable Deletable Chip"
            onClick={handleClick}
            onDelete={handleDelete}
            m={1}
            variant="outlined"
          />
          <Chip
            label="Custom delete icon Chip"
            onClick={handleClick}
            onDelete={handleDelete}
            deleteIcon={<DoneIcon />}
            m={1}
            variant="outlined"
          />
          <Chip
            label="Clickable Link Chip"
            component="a"
            href="#chip"
            clickable
            m={1}
            variant="outlined"
          />
          <Chip
            avatar={<Avatar>MB</Avatar>}
            label="Primary Clickable Chip"
            clickable
            color="primary"
            onDelete={handleDelete}
            deleteIcon={<DoneIcon />}
            m={1}
            variant="outlined"
          />
          <Chip
            icon={<FaceIcon />}
            label="Primary Clickable Chip"
            clickable
            color="primary"
            onDelete={handleDelete}
            deleteIcon={<DoneIcon />}
            m={1}
            variant="outlined"
          />
          <Chip
            label="Deletable Primary Chip"
            onDelete={handleDelete}
            color="primary"
            m={1}
            variant="outlined"
          />
          <Chip
            avatar={
              <Avatar>
                <FaceIcon />
              </Avatar>
            }
            label="Deletable Secondary Chip"
            onDelete={handleDelete}
            color="secondary"
            m={1}
            variant="outlined"
          />
          <Chip
            icon={<FaceIcon />}
            label="Deletable Secondary Chip"
            onDelete={handleDelete}
            color="secondary"
            m={1}
            variant="outlined"
          />
        </div>
      </CardContent>
    </Card>
  );
};

const ChipArray = () => {
  const [chipData, setChipData] = useState([
    { key: 0, label: "Angular" },
    { key: 1, label: "jQuery" },
    { key: 2, label: "Polymer" },
    { key: 3, label: "React" },
    { key: 4, label: "Vue.js" },
  ]);

  const handleDelete = (data) => () => {
    if (data.label === "React") {
      alert("Why would you want to delete React?! :)"); // eslint-disable-line no-alert
      return;
    }

    setChipData(chipData.filter((item) => item.key !== data.key));
  };

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Chip array
        </Typography>
        <Typography variant="body2" gutterBottom>
          An example of rendering multiple Chips from an array of values
        </Typography>
        <div>
          {chipData.map((data) => {
            let icon = null;

            if (data.label === "React") {
              icon = <TagFacesIcon />;
            }

            return icon ? (
              <Chip
                key={data.key}
                icon={icon}
                label={data.label}
                onDelete={handleDelete(data)}
                m={1}
              />
            ) : (
              <Chip
                key={data.key}
                label={data.label}
                onDelete={handleDelete(data)}
                m={1}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

function Chips() {
  return (
    <React.Fragment>
      <Typography variant="h3" gutterBottom display="inline">
        Chips
      </Typography>
      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NextLink} href="/">
          Dashboard
        </Link>

        <Link>Components</Link>

        <Typography>Chips</Typography>
      </Breadcrumbs>
      <Divider my={6} />
      <Grid container spacing={6}>
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <DefaultChips />
          <ChipArray />
        </Grid>
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <ColoredChips />
          <OutlinedChips />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Chips;
