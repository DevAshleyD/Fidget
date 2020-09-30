import React from 'react'
import classes from './TabNavs.module.css'
/* eslint-disable */


class TabNavs extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentForm: '',
    }
    this.changeTab = this.changeTab.bind(this)
  }


  componentDidMount() {
    this.setState({ currentForm: this.props.currentForm })
  }

  changeTab() {
    this.props.clearErrors()
    this.props.navToOtherForm()
    let nextForm
    this.state.currentForm === 'Login' ? nextForm = 'Sign Up' : nextForm = 'Login'
    this.setState({ currentForm: nextForm })
  }

  render() {
    const loginBtnClasses = [classes.navTab]
    const signupBtnClasses = [classes.navTab]

    if (this.state.currentForm === 'Sign Up') {
      signupBtnClasses.push(classes.selected)
    } else {
      loginBtnClasses.push(classes.selected)
    }

    return (
      <ul className={classes.navContainer}>
        <li style={{ width: '45px' }} className={loginBtnClasses.join(' ')} onClick={this.changeTab}>
          <span>Log In</span>
        </li>
        <li className={signupBtnClasses.join(' ')} onClick={this.changeTab}>
          <span> Sign Up </span>
        </li>
      </ul>


    )
  }
}


export default TabNavs
