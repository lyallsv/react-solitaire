import React, { Component, PropTypes } from 'react';
import Card from './Card';
import { DragSource } from 'react-dnd';

const cardSource = {
  beginDrag(props) {
    return props;
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class DraggableCard extends Component {

  render() {
    let draggingClass = this.props.isDragging ? 'dragging' : '';

    return this.props.connectDragSource(
      <div className={'draggableCard ' + draggingClass}>
        <Card card={this.props.card} isVisible={true} />
      </div>
    );
  }
}

DraggableCard.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource('card', cardSource, collect)(DraggableCard);
