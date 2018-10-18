import * as React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

export interface CustomLinkProps extends NavLinkProps {
  description: string;
  identifier: string;
}

const LinkMap: CustomLinkProps[] = [
  {
    description: 'Home',
    identifier: 'HomeLink',
    to: {
      pathname: '/',
      state: { prev: false },
    },
  },
  {
    description: 'About',
    identifier: 'AboutLink',
    to: {
      pathname: '/about',
      state: { prev: true },
    },
    replace: true,
  },
  {
    description: 'Contact',
    identifier: 'ContactLink',
    to: {
      pathname: '/contact',
      state: { prev: true },
    },
    replace: true,
  },
];

export const CustomLink = (props: CustomLinkProps) => (
  <NavLink className="nav-link" activeClassName={'active'} {...props}>
    {props.description}
  </NavLink>
);

export const Nav = () => (
  <div className="nav-wrapper">
    {LinkMap.map(link => (
      <CustomLink key={link.identifier} {...link} />
    ))}
  </div>
);
