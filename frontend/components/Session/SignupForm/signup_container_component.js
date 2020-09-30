import { connect } from 'react-redux'
import { signup, clearErrors } from '../../../actions/session_actions'
import { openModal, closeModal } from '../../../actions/modal_actions'
import SignupForm from './SignupForm'
/* eslint-disable */

const mSTP = (state) => {

  return {
    formType: 'Sign Up',
    otherForm: 'Login',
    errors: state.errors.session,
  }
}


const mDTP = (dispatch) => {

  return {
    processForm: (user) => dispatch(signup(user)),
    navToOtherForm: () => dispatch(openModal('login')),
    closeModal: () => dispatch(closeModal()),
    clearErrors: () => dispatch(clearErrors()),
  }
}


export default connect(mSTP, mDTP)(SignupForm)
