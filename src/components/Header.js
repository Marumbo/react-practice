import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({title, onAdd, showAdd}) => {
    
    // const click = () => {
    // console.log("click click");
    // }
    
  return (

    <header className='header'>
        <h1>{title}</h1>
       <Button  color ={showAdd ? 'red' :'green'} text={!showAdd ? 'Add': 'close'} onClick={onAdd} />
    </header>
  )
}

Header.defaultProps = {

title:'Task tracker'
}

Header.propTypes={
    title: PropTypes.string.isRequired
}
export default Header