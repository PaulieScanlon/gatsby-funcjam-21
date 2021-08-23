import React, { Fragment, FunctionComponent } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Flex, Grid, Box, Avatar, NavLink } from 'theme-ui'
import { MenuItem } from '@reach/menu-button'

import GroovyHeading from './groovy-heading'
import Dropdown from './dropdown'

const Header: FunctionComponent = () => {
  const { isAuthenticated, logout, user, isLoading } = useAuth0()

  return (
    <Flex
      as="header"
      sx={{
        variant: 'styles.header',
      }}
    >
      <Box
        sx={{
          mt: 2,
        }}
      >
        <GroovyHeading
          as="div"
          variant="heading.h5"
          text={['GA']}
          strokeColor="primary"
          color="secondary"
        />
      </Box>
      <Grid
        sx={{
          alignItems: 'center',
          gridTemplateColumns: 'auto auto auto',
          gap: [0, 2],
        }}
      >
        <NavLink
          href="https://www.gatsbyjs.com/func-jam-21/"
          target="_blank"
          rel="noopener"
        >
          FuncJam '21
        </NavLink>
        <NavLink
          href="https://github.com/PaulieScanlon/gatsby-groovy-analytics"
          target="_blank"
          rel="noopener"
        >
          GitHub
        </NavLink>
        <Box
          sx={{
            position: 'relative',
          }}
        >
          {!isLoading ? (
            <Fragment>
              {isAuthenticated ? (
                <Fragment>
                  <Dropdown trigger={<Avatar src={user.picture} />}>
                    <MenuItem
                      onSelect={() =>
                        logout({ returnTo: window.location.origin })
                      }
                    >
                      Logout
                    </MenuItem>
                  </Dropdown>
                </Fragment>
              ) : null}
            </Fragment>
          ) : null}
        </Box>
      </Grid>
    </Flex>
  )
}

export default Header
