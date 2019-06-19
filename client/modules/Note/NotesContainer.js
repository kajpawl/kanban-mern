import { connect } from 'react-redux';
import Notes from './Notes';
import * as noteActions from './NoteActions';

const mapDispatchToProps = {
  ...noteActions,
};

export default connect(
  null,
  mapDispatchToProps
)(Notes);