import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import DraggableCard from './DraggableCard';

const cardTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem());
  },

  canDrop: function (props, monitor) {
    return (props.accepts === monitor.getItem().card);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class CompletedContainer extends Component {

  getCards() {
    let {accepts, suit} = this.props;

    if (accepts % 13 !== 1) {
      let card = accepts-1;
      return (
       <DraggableCard
          container='completed'
          card={card}
          isVisible={true}
          key={card}
          suit={suit}
        />
      )
    }
  }

  render() {
    let {suitName, connectDropTarget} = this.props;
    let overClass = this.getOverClass(this.props);

    return connectDropTarget(
      <div className={"exchange-col col7 pull-right " + overClass}>
        <div className={"exchange " + suitName}>
          {this.getCards()}
        </div>
      </div>
    )
  }

  getOverClass(props) {
    if (props.isOver) {
      return props.canDrop ? 'canDropOn' : 'cantDropOn';
    }
    return '';
  }
}

module.exports = DropTarget('card', cardTarget, collect)(CompletedContainer);
