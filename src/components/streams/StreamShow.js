import React, { useEffect } from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

const StreamShow = (props) => {
  const video = React.createRef();
  const { id } = props.match.params;
  let player;
  useEffect(() => {
    props.fetchStream(id);
    player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`,
    });
    player.attachMediaElement(video.current);
    player.load();
  }, []);

  if(!props.stream) {
    return <div>Loading...</div>;
  }

  const {title, description} = props.stream;
  return (
    <div>
      <video ref={video} style={{ width: '100%' }} controls={true} />
      <h1>{title}</h1>
      <h5>{description}</h5>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
