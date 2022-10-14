import React from 'react';
import { Navbar, NavbarBrand, NavbarText } from 'reactstrap'
import { AuthConsumer } from '../Auth/AuthContext'

const Header = () => {
  return (
    <AuthConsumer>
      {({ isAuth }) => {
        console.log(isAuth);
        return (
          <Navbar
            className='header'
            color='light'
            light
          >
            <NavbarBrand href='/home'>
              <h4>Jobs Tech</h4>
            </NavbarBrand>
            <NavbarText style={{
              textTransform: 'capitalize',
              color: '#000'
            }}>{isAuth?.profileObj?.name || ''}</NavbarText>
          </Navbar>
        )
      }}
    </AuthConsumer>
  )
}

export default Header
