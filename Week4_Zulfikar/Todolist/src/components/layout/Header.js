import React from 'react'

const Header = () => {
  return (
    <header style={headerStyle}>
      <h1>To do List</h1>
    </header>
  )
}
const headerStyle = {
  background: '#333',
  color: '#fff',
  textAlign: 'center',
  paddding: '10px'
};

export default Header;
