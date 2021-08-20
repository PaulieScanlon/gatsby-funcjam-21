import React, { Fragment, FunctionComponent } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Flex, Box, Avatar } from 'theme-ui'
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
          strokeColor="black"
          color="primary"
        />
      </Box>
      <Box
        sx={{
          mt: 1,
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
    </Flex>
  )
}

export default Header
