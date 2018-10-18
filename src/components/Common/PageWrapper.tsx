import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
const PageWrapper: React.StatelessComponent<RouteComponentProps> = ({ location, children }) => {
  const isPrev = location.state && location.state.prev;
  return <section className={isPrev ? 'page page--prev' : 'page'}>{children}</section>;
};
export default withRouter(PageWrapper);
