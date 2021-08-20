import React, { FunctionComponent, ReactElement } from 'react'
import { Menu, MenuButton, MenuList } from '@reach/menu-button'
import '@reach/menu-button/styles.css'

import { Flex, ThemeUIStyleObject } from 'theme-ui'

interface IDropdownProps {
  /** Trigger element */
  trigger: ReactElement
  /** Theme UI sx prop */
  sx?: ThemeUIStyleObject
}

const Dropdown: FunctionComponent<IDropdownProps> = ({
  trigger,
  children,
  sx,
}) => {
  return (
    <Flex
      sx={{
        alignItems: 'center',
        flexDirection: 'column',
        position: 'relative',
        ...sx,
        '[data-reach-menu-button]': {
          alignItems: 'center',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          border: 'none',
          borderRadius: 0,
          display: 'inline-flex',
          ':focus': {
            outline: 'none',
            boxShadow: 'focus',
          },
        },
        '[data-reach-menu-popover]': {
          position: 'absolute',
          top: '32px',
          right: 0,
          boxShadow: 'dropdown',
          '[data-reach-menu-list]': {
            border: 'none',
            borderRadius: 0,
            boxShadow: 'surface',
            p: 2,
            '[data-reach-menu-item]': {
              variant: 'buttons.dropdownItem',
            },
          },
        },
      }}
    >
      <Menu>
        <MenuButton>{trigger}</MenuButton>
        <MenuList portal={false}>{children}</MenuList>
      </Menu>
    </Flex>
  )
}

export default Dropdown
