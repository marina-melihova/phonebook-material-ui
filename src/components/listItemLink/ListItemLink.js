import React, { forwardRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemText, ListItemIcon } from '@material-ui/core';

const ListItemLink = props => {
  const { icon, primary, to } = props;

  const CustomLink = useMemo(
    () =>
      forwardRef((linkProps, ref) => <Link ref={ref} to={to} {...linkProps} />),
    [to],
  );

  return (
    <li key={primary}>
      <ListItem button component={CustomLink}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
};

export default ListItemLink;
